<script>
	export let title;
	export let campaign1;
	export let campaign2;
	export let campaign3;
	export let campaign4;
</script>

<main>
	<h1>{title}</h1>
	<div class='outer'>
		<a href="{campaign1}"><div class='campaign1' id='float'></div></a>
		<a href="{campaign2}"><div class='campaign2' id='float'></div></a>
		<a href="{campaign3}"><div class='campaign3' id='float'></div></a>
		<a href="{campaign4}"><div class='campaign4' id='float'></div></a>
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
