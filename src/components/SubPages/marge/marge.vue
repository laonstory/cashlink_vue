<template>
  <div>
    <Modal
      title="수정안내"
      :sellCount="DLCount"
      :CountPerPrice="DLPrice"
      :price="DLCount * DLPrice"
      :tax="DLCount * DLPrice * 0.005"
      code="sell"
      :class="$store.state.dealSell.class"
    />
    <div class="myPageSizeDealApply">
      <div
        class="MyPageBox2"
        style="
        border-radius: 10px;
      "
      >
        <div class="myPage">
          <div class="AlramNav">
            <span>
              <button class="prevBtn" @click.prevent="prevBtn">
                <img src="../../../img/prev.png" alt="" class="prevIcon" />
              </button>
            </span>
            <span class="dealTitle">판매수정</span>
            <span></span>
          </div>
          <div class="mt-3 alramsBox">
            <span class="dealBoxTitle">DL(딜링)</span>
            <div class="DLline" />
            <div class="myDealPoint">
              <span>보유수량</span>
              <span
                style="
                width: 80%;
                text-align: right;
              "
              >
                {{ priceToString($store.state.UserPoint.DilingPoint) }}
                DL
              </span>
            </div>
            <div>
              <div class="myDealPoint">
                <span style="width: 20%">판매수량</span>
                <input type="number" class="sellPoint" v-model="DLCount" />
                <div style="position: relative;">
                  <span class="sellPointDL">DL</span>
                </div>
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
                <span style="width: 20%">개당가격</span>
                <input
                  type="number"
                  class="KRWsellPoint"
                  v-model="DLPrice"
                  readonly
                />
                <div style="position: relative;">
                  <div class="sellPointKRW">
                    <span style="font-size: 20px; color: #444;">KRW</span>
                    <button @click.prevent="minusBtn">-</button>
                    <button @click.prevent="plusBtn">+</button>
                  </div>
                </div>
              </div>
              <div class="mt-2 mb-2 FlexEndBox">
                <div class="KRWBox">
                  <div class="d-flex">
                    <small>하한가: 70KRW</small>
                    <img src="../../../img/min.png" alt="" class="maxMIN" />
                  </div>
                  <div class=" ml-2 d-flex">
                    <small>상한가: 90KRW</small>
                    <img src="../../../img/max.png" alt="" class="maxMIN" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="mt-3 myDealPoint">
                <span>판매가</span>
                <div>
                  <span
                    style="font-size: 28px; color: #2269ff; font-weight: 700;"
                  >
                    {{ priceToString(DLCount * DLPrice) }}
                  </span>
                  <span style="font-size: 14px; color: #2269ff;">
                    KRW
                  </span>
                </div>
              </div>
              <div class=" mb-2 FlexEndBox">
                <div style="text-align: right; color: #888; font-weight: 300;">
                  <p>판매 수수료 : {{ DLCount * DLPrice * 0.005 }} CLP</p>
                  <div v-if="$store.state.UserPoint.OriginalCoinPoint < 10">
                    <p>CLP가 부족합니다. CLP를 충전해주세요.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="mt-3 myDeal">
                <button class="reset" @click.prevent="reset">초기화</button>
                <button class="next" @click.prevent="sellMyDL">다음</button>
              </div>
            </div>
          </div>
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
      DLCount: "",
      DLPrice: "",
      modalClass: "d-none",
    };
  },
  beforeMount() {
    if (this.$store.state.PatchSell.sellID == "") {
      alert("잘못된 접근입니다.");
      this.$router.push("/");
    } else {
      this.DLCount = Math.round(this.$store.state.PatchSell.count);
      this.DLPrice = Math.round(this.$store.state.PatchSell.price);
    }
  },
  methods: {
    prevBtn() {
      this.$router.go(-1);
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
      if (this.DLPrice >= 90) {
        this.DLPrice = 90;
      } else {
        this.DLPrice += 10;
      }
    },
    minusBtn() {
      if (this.DLPrice <= 70) {
        this.DLPrice = 70;
      } else {
        this.DLPrice -= 10;
      }
    },
    reset() {
      this.DLCount = 100;
      this.DLPrice = 70;
    },
    sellMyDL() {
      this.$store.state.dealSell.class = "";
    },
  },
};
</script>

<style>
.MyPageBox2 {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 25px;
  background: white;
  margin-top: 1.5rem;
}
.maxMIN {
  width: 13px;
  height: 13px;
}
.DLline {
  width: 100%;
  height: 2px;
  background-color: #2269ff;
}
.myPage {
  position: inherit !important;
  background: white;
  z-index: 0;
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
.myDealPoint > span {
  /* width: 20%; */
  font-size: 15px;
  color: #444;
}
.sellPoint {
  width: 80%;
  height: 100%;
  border: 1px solid #ddd;
  padding: 0px 45px 0px 10px;
  text-align: right;
  font-size: 20px;
  color: #444;
}
.KRWsellPoint {
  width: 80% !important;
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
  right: 18px;
  bottom: -13px;
  font-size: 16px;
}
.sellPointKRW {
  width: 110px;
  position: absolute;
  right: 6px !important;
  bottom: -16px;
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
.KRWBox {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  color: #888;
  font-weight: 300;
  font-size: 14px;
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
.myPageSizeDealApply {
  padding: 0px 18px 0px;
  height: 100%;
  width: 670px !important;
  position: fixed;
  z-index: 6;
  background-color: #eee;
  top: 73px;
}
@media screen and (max-width: 900px) {
  .myPage {
    position: fixed;
    background: white;
    z-index: 5;
    top: 0;
  }
  .myPageSizeDealApply {
    min-height: calc(100vh - 53px);
    padding: 0px 0px 0px;
    height: 100%;
    width: 100% !important;
    position: fixed;
    z-index: 6;
    background-color: white;
    top: 0;
    left: 0;
  }
  .MyPageBox2 {
    width: 100%;
    margin-top: 1.5rem;
    margin: 0 auto;
    padding: 0px 0px;
    background: white;
  }
}
</style>
