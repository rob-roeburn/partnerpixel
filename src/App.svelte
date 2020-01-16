<script>

  import {onMount} from 'svelte';

	export let title;
	export let rbrnTarget;
	export let hanpTarget;

	function handleClick(req) {
		let postdata={};
		// The code below shows how to retrieve from a selected element in the page
		postdata.Campaign=req.srcElement.classList[0];

		// The code below shows how to retrieve from the query string
		let queryString = req.path[5].location.href.split('?');
		let qsElements = queryString[1].split('&');
		for (let i = 0; i < qsElements.length; i++) {
			let pair = qsElements[i].split('=');
			postdata[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]);
		}

		// Print results to console ahead of XHR
		console.log(postdata)

		// Create XHR and open with API URL
		let xhr = new XMLHttpRequest();
		xhr.open("POST", rbrnTarget+'/processData', true);
		// The code below allows the setting of request headers
		//xhr.setRequestHeader(
		//	'Access-Control-Allow-Origin', '*',
		//	'Access-Control-Allow-Methods', '*',
		//	'Access-Control-Allow-Credentials', 'true',
		//	'Access-Control-Allow-Headers', 'Content-Type, Authorization',
		//	'Content-Type', 'application/json',
		//);

		// Execute XHR
    xhr.send(JSON.stringify({
			payload: postdata
		}));
	}

</script>

<main>
	<h1>{title}</h1>
	<div class='outer'>
		<div class='campaign1' id='float' on:click={handleClick}></div>
		<div class='campaign2' id='float' on:click={handleClick}></div>
		<div class='campaign3' id='float' on:click={handleClick}></div>
		<div class='campaign4' id='float' on:click={handleClick}></div>
	</div>
</main>

<style>
	main {
		align: center;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	div.outer {
		width:604px;
		height:204px;
 		margin:0 auto;
	}

	div.campaign1 {
		width:300px;
		height:100px;
		border:1px solid white;
		background-color:#D4A656;
	}

	div.campaign2 {
		width:300px;
		height:100px;
		border:1px solid white;
		background-color:#E16E79;
	}

	div.campaign3 {
		width:300px;
		height:100px;
		border:1px solid white;
		background-color:#364EB9;
	}

	div.campaign4 {
		width:300px;
		height:100px;
		border:1px solid white;
		background-color:#228FCF;
	}

	#float {
		float:left;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
