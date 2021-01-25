<template>
  <div></div>
</template>

<script>
import axios from "axios";
const instance = axios.create({
  baseURL: "http://gateway.cashlink.kr/auth_api",
});
export default {
  beforeMount() {
    let code = window.location.href.split("=");
    let formData = new FormData();
    formData.append("client_id", "cashlink");
    formData.append("client_secret", process.env.VUE_APP_ENCRYPT_KEY);
    formData.append("redirect_uri", "http://127.0.0.1:3000/callback");
    formData.append("grant_type", process.env.VUE_APP_GRANT_TYPE);
    formData.append("code", code[1]);
    instance.post("/oauth/token", formData).then((res) => {
      window.localStorage.setItem("auth", res.data.access_token);
      window.localStorage.setItem("refresh", res.data.refresh_token);
      this.$router.push("/");
    });
  },
};
</script>

<style></style>
