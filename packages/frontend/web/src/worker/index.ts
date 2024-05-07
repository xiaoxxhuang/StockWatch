self.onmessage = (event: any) => {
	console.log("Received message from the main thread:", event.data);

	const result = event.data * 2;

	postMessage(result + "|" + Math.random());
	postMessage(result + "|" + Math.random());
	postMessage(result + "|" + Math.random());
};

export {};
