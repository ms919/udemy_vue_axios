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
import axios from "../axios-auth";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		register() {
			axios
				.post("/accounts:signUp?key=AIzaSyAnn8Uciz1-w_Uyc2xl9d5gAX6zLp9GheQ", {
					email: this.email,
					password: this.password,
					returnSecureToken: true,
				})
				.then((response) => {
					console.log(response);
          this.email = "";
          this.password = "";
				}).catch((error) => {
          console.log(error);
          confirm(error);
        });
		},
	},
};
</script>
