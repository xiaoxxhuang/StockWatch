import { FC, PropsWithChildren, useState, useEffect } from "react";

export const HomePage: FC<PropsWithChildren> = ({ children }) => {
	const [worker, setWorker] = useState<any>(null);
	const [allResult, setAllResult] = useState<any[]>([]);

	useEffect(() => {
		const myWorker = new Worker(
			new URL("../worker/index.ts", import.meta.url),
		);

		myWorker.onmessage = function (event) {
			console.log("Received result from worker:", event.data);
			setAllResult((prevResults: any) => [...prevResults, event.data]);
		};

		setWorker(myWorker);

		return () => {
			myWorker.terminate();
		};
	}, []);

	const handleClick = () => {
		if (worker) {
			worker.postMessage(5);
		}
	};

	return (
		<div>
			<p>Result from the worker: {allResult}</p>
			<button onClick={handleClick}>Calculate in Web Worker</button>
			{children}
		</div>
	);
};
