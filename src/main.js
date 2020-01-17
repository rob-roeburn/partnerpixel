import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'partnerpixel',
		rbrnTarget: 'https://kdgif9n6ji.execute-api.eu-west-1.amazonaws.com/main'
		//hanpTarget: 'https://g6z1iqwte3.execute-api.us-east-1.amazonaws.com/main'
	}
});

export default app;
