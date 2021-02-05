<template>
  <div></div>
</template>

<script>
// import auth from "../../auth/auth";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://gateway.cashlink.kr/auth_api",
});
export default {
  async created() {
    let code = window.location.href.split("=");
    let formData = new FormData();
    formData.append("client_id", process.env.VUE_APP_CLIENT_ID);
    formData.append("client_secret", process.env.VUE_APP_ENCRYPT_KEY);
    formData.append("code", code[1]);
    formData.append("grant_type", process.env.VUE_APP_GRANT_TYPE);
    formData.append("redirect_uri", process.env.VUE_APP_REDIRECT_URI);
    console.log(code[1]);
    instance
      .post("/oauth/token", formData)
      .then(async (res) => {
        window.localStorage.setItem("auth", res.data.access_token);
        window.localStorage.setItem("refresh", res.data.refresh_token);
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        // alert(err);
      });
  },
  beforeMount() {},
};
</script>

<style></style>
