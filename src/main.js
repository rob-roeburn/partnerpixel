import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'partnerpixel',
		campaign1: 'http://phiamplifytester.com/campaign1',
		campaign2: 'http://phiamplifytester.com/campaign2',
		campaign3: 'http://phiamplifytester.com/campaign3',
		campaign4: 'http://phiamplifytester.com/campaign4'
	}
});

export default app;
