<template>
  <div class="w-100 h-100 myPage">
    <div :class="modalClass">
      <Modal title="" message="" />
    </div>
    <div class="AlramNav">
      <span>
        <button class="prevBtn" @click.prevent="prevBtn">
          <img src="../../../img/prev.png" alt="" class="prevIcon" />
        </button>
      </span>
      <span class="dealTitle">판매등록</span>
      <span></span>
    </div>
    <div class="mt-3 alramsBox">
      <span class="dealBoxTitle">DL(딜링)</span>
      <div class="DLline" />
      <div class="myDealPoint">
        <span>보유수량</span>
        <span>{{ priceToString($store.state.UserPoint.DilingPoint) }} DL</span>
      </div>
      <div>
        <div class="myDealPoint">
          <span>판매수량</span>
          <input type="number" class="sellPoint" v-model="DLCount" />
          <span class="sellPointDL">DL</span>
        </div>
        <div class="mt-2 mb-2 FlexEndBox">
          <div class="DLplusBox">
            <button @click.prevent="AllBtn">All</button>
            <button @click.prevent="TenTh">+1만개</button>
            <button @click.prevent="FiveTh">+5천개</button>
            <button @click.prevent="OneTh">+1천개</button>
          </div>
        </div>
      </div>

      <div>
        <div class="mt-3 myDealPoint">
          <span>개당가격</span>
          <input
            type="number"
            class="KRWsellPoint"
            v-model="DLPrice"
            readonly
          />
          <div class="sellPointKRW">
            <span style="font-size: 20px; color: #444;">KRW</span>
            <button @click.prevent="minusBtn">-</button>
            <button @click.prevent="plusBtn">+</button>
          </div>
        </div>
      </div>
      <div>
        <div class="mt-3 myDealPoint">
          <span>판매가</span>
          <div>
            <span style="font-size: 28px; color: #2269ff; font-weight: 700;">
              {{ priceToString(DLCount * DLPrice) }}
            </span>
            <span style="font-size: 14px; color: #2269ff;">
              KRW
            </span>
          </div>
        </div>
        <div class=" mb-2 FlexEndBox">
          <div style="text-align: right; color: #888; font-weight: 300;">
            <p>판매 수수료 : 10CLP</p>
            <div v-if="$store.state.UserPoint.OriginalCoinPoint < 10">
              <p>CLP가 부족합니다. CLP를 충전해주세요.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="mt-3 myDeal">
          <button class="reset" @click.prevent="reset">초기화</button>
          <button class="next">다음</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./modal/modal";
export default {
  components: {
    Modal,
  },

  data() {
    return {
      DLCount: 100,
      DLPrice: 40,
      modalClass: "d-none",
    };
  },
  methods: {
    prevBtn() {
      this.$router.push("/deal");
    },
    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    AllBtn() {
      let myDL = parseInt(this.$store.state.UserPoint.OriginalPoint);
      this.DLCount = myDL;
    },
    TenTh() {
      this.DLCount += 10000;
    },
    FiveTh() {
      this.DLCount += 5000;
    },
    OneTh() {
      this.DLCount += 1000;
    },
    plusBtn() {
      if (this.DLPrice == 100) {
        this.DLPrice = 100;
      } else {
        this.DLPrice += 10;
      }
    },
    minusBtn() {
      if (this.DLPrice == 40) {
        this.DLPrice = 40;
      } else {
        this.DLPrice -= 10;
      }
    },
    reset() {
      this.DLCount = 100;
      this.DLPrice = 40;
    },
  },
};
</script>

<style>
.DLline {
  width: 100%;
  height: 2px;
  background-color: #2269ff;
}
.myPage {
  position: fixed;
  background: white;
  z-index: 5;
  top: 0;
}
.MyTitleS {
  font-size: 16px;
  font-weight: 600;
}
.logout {
  padding: 5px;
  border: none;
  background-color: #ddd;
  color: #444;
  font-size: 12px;
  border-radius: 5px;
}
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
.dealTitle {
  margin-right: 20px;
  color: #666;
  font-size: 14px;
}
.prevBtn {
  border: none;
  background-color: transparent;
}
.alramsBox {
  padding: 14px 20px;
}
.dealBoxTitle {
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #2269ff;
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
.myDealPoint {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.myDealPoint > span:nth-of-type(1) {
  font-size: 15px;
  color: #444;
}
.myDealPoint > span:nth-of-type(2) {
  font-size: 20px;
  color: #444;
  font-weight: 600;
}
.sellPoint {
  width: 75%;
  height: 100%;
  border: 1px solid #ddd;
  padding: 0px 45px 0px 10px;
  text-align: right;
  font-size: 20px;
  color: #444;
}
.KRWsellPoint {
  width: 75%;
  height: 100%;
  border: 1px solid #ddd;
  padding: 0px 120px 0px 10px;
  text-align: right;
  font-size: 20px;
  color: #444;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.sellPointDL {
  position: absolute;
  right: 35px;
  font-weight: 400 !important;
  font-size: 16px;
}
.sellPointKRW {
  width: 110px;
  position: absolute;
  right: 30px;
  display: flex;
  justify-content: space-around;
}
.sellPointKRW > button {
  width: 24px;
  height: 24px;
  border: none;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
}
.DLplusBox {
  width: 50%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
}
.FlexEndBox {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.DLplusBox > button {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #444;
  border: none;
  background-color: #eee;
  cursor: pointer;
}
.reset {
  width: 48%;
  height: 50px;
  font-size: 14px;
  background-color: #888;
  border: none;
  color: white;
}
.next {
  width: 48%;
  height: 50px;
  font-size: 14px;
  background-color: #2269ff;
  border: none;
  color: white;
}
.myDeal {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
