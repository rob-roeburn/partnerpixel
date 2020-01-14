import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'partnerpixel',
		campaign1: 'http://amplifytester.com/campaign1',
		campaign2: 'http://amplifytester.com/campaign2',
		campaign3: 'http://amplifytester.com/campaign3',
		campaign4: 'http://amplifytester.com/campaign4'
	}
});

export default app;
