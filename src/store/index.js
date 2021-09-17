import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios-auth";
import axios_refresh from "../axios-refresh-auth";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: { idToken: null, refreshToken: null },
	getters: {
		idToken: (state) => state.idToken,
	},
	mutations: {
		updateIdToken(state, idToken) {
			state.idToken = idToken;
		}
	},
	actions: {
		async autoLogin({ commit, dispatch }) {
			const idToken = localStorage.getItem("idToken");
			if (!idToken) return;

			const expiryTimeMs = localStorage.getItem("expiryTimeMs");
			const now = new Date();
			const isExpired = now.getTime() >= expiryTimeMs;

			if (isExpired) {
				// 有効期限が切れてた場合
				await dispatch("refreshIdToken", localStorage.getItem("refreshToken"));
			} else {
				// 有効期限が切れていない場合。
				// 残り時間はきっかり1時間ではないはずなので、残り時間がきたらリフレッシュする処理も入れておく
				const expiryInMs = expiryTimeMs - now.getTime();
				commit("updateIdToken", idToken);
				setTimeout(() => {
					dispatch("refreshIdToken", localStorage.getItem("refreshToken"));
				}, expiryInMs);
			}
		},
		login({ dispatch }, authData) {
			axios
				.post(
					"/accounts:signInWithPassword?key=AIzaSyAnn8Uciz1-w_Uyc2xl9d5gAX6zLp9GheQ",
					{
						email: authData.email,
						password: authData.password,
						returnSecureToken: true,
					}
				)
				.then((response) => {
					dispatch("setAuth", response.data);
					confirm("Successfully login!!");
				})
				.catch((error) => {
					console.log(error);
					confirm(error);
				});
		},
		register({ dispatch }, authData) {
			axios
				.post("/accounts:signUp?key=AIzaSyAnn8Uciz1-w_Uyc2xl9d5gAX6zLp9GheQ", {
					email: authData.email,
					password: authData.password,
					returnSecureToken: true,
				})
				.then((response) => {
					dispatch("setAuth", response.data);
					confirm("Successfully regster!!");
				})
				.catch((error) => {
					console.log(error);
					confirm(error);
				});
		},
		logout({ commit }) {
			commit("updateIdToken", null);
			localStorage.removeItem("idToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("expiryTimeMs");
			router.replace('/logout');
		},
		async refreshIdToken({ commit, dispatch }, refresh_token) {
			await axios_refresh
				.post("/token?key=AIzaSyAnn8Uciz1-w_Uyc2xl9d5gAX6zLp9GheQ", {
					grant_type: "refresh_token",
					refresh_token: refresh_token,
				})
				.then((response) => {
					commit("updateIdToken", response.data.id_token);
					setTimeout(() => {
						dispatch("refreshIdToken", response.data.refresh_token);
					}, response.data.expires_in * 1000);
				});
		},
		setAuth({ commit, dispatch }, authData) {
			const now = new Date();
			// 現在時刻のUNIX時間 + token有効期限 = token有効期限のUNIX時間
			const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
			commit("updateIdToken", authData.idToken);
			setTimeout(() => {
				dispatch("refreshIdToken", authData.refreshToken);
			}, authData.expiresIn * 1000);
			localStorage.setItem("idToken", authData.idToken);
			localStorage.setItem("refreshToken", authData.refreshToken);
			localStorage.setItem("expiryTimeMs", expiryTimeMs);
			router.push("/");
		},
	},
});
