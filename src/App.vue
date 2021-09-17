<template>
	<div id="app">
		<header>
			<router-link to="/" class="header-item">掲示板</router-link>
			<router-link to="/login" class="header-item">Login</router-link>
			<router-link to="/register" class="header-item">SignUp</router-link>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>

</script>

<style scoped>
#app {
	text-align: center;
	color: black;
	margin-top: 60px;
}
.header-item {
	padding: 10px;
}
</style>
