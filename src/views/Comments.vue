<template>
	<div>
		<h3>掲示板・投稿ページ</h3>
		<label for="name">ユーザー名</label>
		<input id="name" type="text" v-model="name" />
		<br /><br />
		<label for="comment">コメント</label>
		<textarea id="comment" v-model="comment" cols="30" rows="10"></textarea>
		<br /><br />
		<button @click="createComment">データ送信</button>
		<h2>掲示板</h2>
		<div v-for="post in posts" :key="post.name">
			<p>名前：{{ post.fields.name.stringValue}}</p>
			<p>コメント：{{ post.fields.comment.stringValue}}</p>
			<br>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			name: "",
			comment: "",
			posts: []
		};
	},
	created() {
		axios
			.get(
				"/comments"
			)
			.then((response) => {
				console.log(response);
				this.posts = response.data.documents;
			})
			.catch((error) => {
				console.lgo(error);
			});
	},
	methods: {
		createComment() {
			// データ送信
			axios
				.post(
					"/comments",
					{
						fields: {
							name: {
								stringValue: this.name,
							},
							comment: {
								stringValue: this.comment,
							},
						},
					}
					// 成功時
				)
				.then((response) => {
					console.log(response);
					this.name = "";
					this.comment = "";
					// 失敗時
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

