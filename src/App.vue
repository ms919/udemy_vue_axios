<template>
	<div id="app">
		<header>
			<template v-if="isAuthenticate">
				<router-link to="/" class="header-item">掲示板</router-link>
				<span class="header-item" @click="logout">ログアウト</span>
			</template>
			<template v-else>
				<router-link to="/login" class="header-item">Login</router-link>
				<router-link to="/register" class="header-item">SignUp</router-link>
			</template>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	computed: {
		isAuthenticate() {
			return this.$store.getters.idToken !== null;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch("logout");
		},
	},
};
</script>

<style scoped>
#app {
	text-align: center;
	color: black;
	margin-top: 60px;
}
.header-item {
	padding: 10px;
	cursor: pointer;
}
</style>
