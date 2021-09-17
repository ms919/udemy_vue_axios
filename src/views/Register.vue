<template>
	<div>
		<h3>SignUp</h3>
		<label for="email">Email</label>
		<input id="email" type="email" v-model="email" />
		<br /><br />
		<label for="password">Password</label>
		<input id="password" type="password" v-model="password" />
		<br /><br />
		<button @click="register">SignUp</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		register() {
			this.$store.dispatch("register", {
				email: this.email,
				password: this.password,
			});
			this.email = "";
			this.password = "";
		},
	},
};
</script>
