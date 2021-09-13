<template>
	<div id="app">
		<h3></h3>
		<label for="name">ユーザー名</label>
		<input id="name" type="text" v-model="name" />
		<br /><br />
		<label for="comment">コメント</label>
		<textarea id="comment" v-model="comment" cols="30" rows="10"></textarea>
		<h2>掲示板</h2>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			comment: "",
		};
	},
};
</script>

<style scoped>
#app {
	text-align: center;
	color: black;
	margin-top: 60px;
}
</style>
