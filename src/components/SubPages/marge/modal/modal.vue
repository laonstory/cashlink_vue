<template>
  <div class="modalBack1">
    <PinChk :class="PinChkStyle" :amount="sellCount" :price="CountPerPrice" />
    <div @click.prevent="modalExit" class="clickBack" />
    <div class="modalBuy">
      <div class="p-3 h-75">
        <div class="Modaltitle">
          <p>{{ title }}</p>
        </div>
        <div class="ModalDLSell">
          <span>판매수량</span>
          <span>{{ sellCount }} DL</span>
          <span>개당가격</span>
          <span>{{ CountPerPrice }} KRW</span>
          <span>판매가</span>
          <span>{{ price }} KRW</span>
          <span>전송 수수료</span>
          <span>{{ tax }} CLP</span>
        </div>
      </div>
      <div class="exitBtn">
        <div v-if="code == 'sell'" class="w-100 buyBtn">
          <button class="modalButton grayBack" @click.prevent="modalExit">
            취소
          </button>
          <button class="modalButton" @click.prevent="modalSure">
            등록하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PinChk from "../pin/6pinChk";
export default {
  components: {
    PinChk,
  },
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
      this.$store.state.dealSell.class = "d-none";
    },
    modalSure() {
      this.PinChkStyle = "";
    },
  },
};
</script>

<style>
.ModalDLSell {
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 12px;
  color: #888;
}
.ModalDLSell > span:nth-child(2n) {
  text-align: right;
}
.buyBtn {
  display: flex;
  justify-content: space-evenly;
}
.modalBack1 {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
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
.exitBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 20%;
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
