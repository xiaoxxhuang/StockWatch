import { FC, PropsWithChildren, useState, useEffect } from "react";

export const HomePage: FC<PropsWithChildren> = ({ children }) => {
  const [result, setResult] = useState<any>(null);
  const [worker, setWorker] = useState<any>(null);
  const [allResult, setAllResult] = useState<any[]>([]);

  useEffect(() => {
    const myWorker = new Worker(new URL("../worker/index.ts", import.meta.url));
    console.log(import.meta.url)
    console.log("url", new URL("../worker/index.ts", import.meta.url))

    myWorker.onmessage = function (event) {
      console.log('Received result from worker:', event.data);
      setResult(event.data);
    };

    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if(result){setAllResult((current) => {
      return [...current, result]
    })}
  },[result])

  const handleClick = () => {
    if (worker) {
      worker.postMessage(5);
    }
  };

  return (
    <div>
      <p>Result from the worker: {result}</p>
      <button onClick={handleClick}>Calculate in Web Worker</button>
      {children}
      <p>{JSON.stringify(allResult)}</p>
    </div>
  );
};
