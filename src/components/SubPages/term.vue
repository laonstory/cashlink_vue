<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="border-radius: 10px;">
        <router-view></router-view>
        <div :class="$store.state.Terms.termsHome">
          <span>
            <button class="prevBtn" @click.prevent="prevBtn">
              <img src="../../img/prev.png" alt="" class="prevIcon" />
            </button>
          </span>
          <span class="AlramTitle">약관 및 정책</span>
          <span></span>
        </div>
        <div :class="$store.state.Terms.termsHomeMenu">
          <div class="w-100 h-100">
            <div class="noticeMy" @click.prevent="serviceTerms">
              <span>서비스 이용약관</span>
              <span>
                <img
                  src="../../img/small-arrow.png"
                  alt=""
                  class="right-Arrow"
                />
              </span>
            </div>
            <div class="noticeMy mt-3" @click.prevent="moneyTerms">
              <span>전자금융거래 이용약관</span>
              <span>
                <img
                  src="../../img/small-arrow.png"
                  alt=""
                  class="right-Arrow"
                />
              </span>
            </div>
            <div class="noticeMy mt-3" @click.prevent="myInfoLaw">
              <span>개인정보 취급방침</span>
              <span>
                <img
                  src="../../img/small-arrow.png"
                  alt=""
                  class="right-Arrow"
                />
              </span>
            </div>
            <div class="noticeMy mt-3" @click.prevent="putUserInfoLaw">
              <span>개인정보 수집 및 이용동의</span>
              <span>
                <img
                  src="../../img/small-arrow.png"
                  alt=""
                  class="right-Arrow"
                />
              </span>
            </div>
            <div class="noticeMy mt-3" @click.prevent="samJa">
              <span>개인정보 제 3자 제공 및 위탁동의</span>
              <span>
                <img
                  src="../../img/small-arrow.png"
                  alt=""
                  class="right-Arrow"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      termsHome: "AlramNav",
      termsHomeMenu: "mt-3 alramsBox",
    };
  },
  methods: {
    prevBtn() {
      this.$router.go(-1);
    },
    serviceTerms() {
      this.$router.push("/terms/ServiceTerms");
      this.$store.state.Terms.termsHome = "d-none";
      this.$store.state.Terms.termsHomeMenu = "d-none";
    },
    moneyTerms() {
      this.$router.push("/terms/moneyTerms");
      this.$store.state.Terms.termsHome = "d-none";
      this.$store.state.Terms.termsHomeMenu = "d-none";
    },
    myInfoLaw() {
      this.$router.push("/terms/UserInfoLaw");
      this.$store.state.Terms.termsHome = "d-none";
      this.$store.state.Terms.termsHomeMenu = "d-none";
    },
    putUserInfoLaw() {
      this.$router.push("/terms/UserInfoPut");
      this.$store.state.Terms.termsHome = "d-none";
      this.$store.state.Terms.termsHomeMenu = "d-none";
    },
    samJa() {
      this.$router.push("/terms/samja");
      this.$store.state.Terms.termsHome = "d-none";
      this.$store.state.Terms.termsHomeMenu = "d-none";
    },
  },
};
</script>

<style>
.AlramNav {
  width: 100% !important;
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
    position: absolute;
  }
}
</style>
