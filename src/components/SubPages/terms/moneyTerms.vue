<template>
  <div class="TermsSize">
    <div class="MyPageSize">
      <div class="AlramNav">
        <span>
          <button class="prevBtn" @click.prevent="prevBtn">
            <img src="../../../img/prev.png" alt="" class="prevIcon" />
          </button>
        </span>
        <span class="AlramTitle">전자금융거래 이용약관</span>
        <span></span>
      </div>
      <div class="mt-3 alramsBox">
        <div class="w-100 h-100">
          <div v-for="(MoneyTerms, index) in splitString(Text)" :key="index">
            <p>{{ MoneyTerms }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../../../auth/client";
export default {
  beforeMount() {
    this.$store.state.Terms.termsHome = "d-none";
    this.$store.state.Terms.termsHomeMenu = "d-none";
    const LoginData = window.localStorage.getItem("auth");
    client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
    client.get("/api/infos/terms/e-financial").then((res) => {
      this.Text = res.data.data.data;
    });
  },
  data() {
    return {
      Text: "",
    };
  },
  methods: {
    prevBtn() {
      this.$router.go(-1);
      this.$store.state.Terms.termsHome = "AlramNav";
      this.$store.state.Terms.termsHomeMenu = "mt-3 alramsBox";
    },
    splitString(text) {
      return text.split("\n");
    },
    serviceTerms() {},
    moneyTerms() {},
    myInfoLaw() {},
    putUserInfoLaw() {},
    samJa() {},
  },
};
</script>

<style>
.TermsSize {
  background: white;
  width: 100%;
  max-width: 659px;
  height: 50% !important;
}
.AlramNav {
  width: 60%;
  margin: 0 auto;
  height: 52px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.prevIcon {
  width: 24px;
}
.AlramTitle {
  margin-right: 20px;
  color: rgb(51, 51, 51);
}
.prevBtn {
  border: none;
  background-color: transparent;
}
.alramsBox {
  padding: 14px 16px;
}
.alramsBoxTitle {
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #2233aa;
}
.notingAlrams {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-weight: 400;
}
@media screen and (max-width: 900px) {
  .TermsSize {
    background: white;
    width: 100%;
    max-width: 695px;
    height: 100%;
    min-height: calc(100vh - 53px);
    position: absolute;
  }
}
</style>
