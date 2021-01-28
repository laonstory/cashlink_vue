<template>
  <div class="modalBack2">
    <div @click.prevent="modalExit" class="clickBack" />
    <div class="modalBuy">
      <div class="p-3 h-75">
        <div class="Modaltitle">
          <p>{{ title }}</p>
        </div>
        <div class="ModalDLSell1">
          <p>판매 등록이 <br />정상적으로 완료되었습니다.</p>
        </div>
        <div class="exitBtn2">
          <div v-if="code == 'sell'" class="w-100 buyBtn">
            <button class="modalButton" @click.prevent="modalExit">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      rejectSell: "not",
      PinChkStyle: "d-none",
    };
  },
  props: [
    "title",
    "message",
    "Graystrong",
    "blackStrong",
    "code",
    "sellCount",
    "CountPerPrice",
    "price",
    "tax",
  ],
  methods: {
    modalExit() {
      this.$store.state.dealSellSuccess.class = "d-none";
      this.$router.push("/");
    },
  },
};
</script>

<style>
.ModalDLSell1 {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: #444;
}
.ModalDLSell > span:nth-child(2n) {
  text-align: right;
}
.buyBtn {
  display: flex;
  justify-content: space-evenly;
}
.modalBack2 {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13;
  left: 0;
  top: 0;
  /* transition: ease 0.5s; */
}
.clickBack {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 7;
}
.modalBuy {
  position: fixed !important;
  width: 240px;
  height: 240px;
  background-color: white;
  z-index: 8;
  border-radius: 10px;
  padding: 0.3rem;
}
.exitBtn2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 60%;
}
.modalButton {
  width: 64px;
  height: 64px;
  font-size: 14px;
  border-radius: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2233aa;
  color: white;
  border: none;
  font-size: 13px;
}
.Modaltitle {
  width: 100%;
  height: 25.3%;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #2233aa;
}
.ModalString {
  width: 100%;
  height: 43.3%;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: black;
}
.waringRepeat {
  width: 100%;
  height: 18.3%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: #888;
}
.rejectBtn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.selectModal {
  width: 100%;
  border: 1px solid #ddd;
  height: 32px;
  padding: 0px 10px;
}
.selectModal:focus {
  outline: none;
}
.grayBack {
  background-color: #888 !important;
}
</style>
