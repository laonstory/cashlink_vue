<template>
  <div class="TermsSize">
    <div class="AlramNav">
      <span>
        <button class="prevBtn" @click.prevent="prevBtn">
          <img src="../../../img/prev.png" alt="" class="prevIcon" />
        </button>
      </span>
      <span class="AlramTitle">개인정보 취급방침</span>
      <span></span>
    </div>
    <div class="mt-3 alramsBox">
      <div class="w-100 h-100">
        <p>서비스 이용약관의 기본 틀은 이것입니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    prevBtn() {
      this.$router.go(-1);
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
.AlramNav {
  width: 100%;
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
</style>
