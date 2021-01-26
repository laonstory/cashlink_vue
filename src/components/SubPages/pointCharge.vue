<template>
  <div class="w-100 h-100 myPage">
    <div :class="modalClass"></div>
    <div class="AlramNav">
      <span>
        <button class="prevBtn" @click.prevent="prevBtn">
          <img src="../../img/prev.png" alt="" class="prevIcon" />
        </button>
      </span>
      <span class="dealTitle">포인트 충전</span>
      <span></span>
    </div>
    <div class="mt-3 alramsBox">
      <span class="dealBoxTitle">CLP 포인트 충전</span>
      <div class="DLline" />
      <div class="myDealPoint">
        <span>보유수량</span>
        <span
          >{{
            priceToString($store.state.UserPoint.OriginalCoinPoint)
          }}
          CLP</span
        >
      </div>
      <div>
        <div class="myDealPoint">
          <span>충전수량</span>
          <input type="number" class="ChargePoint" v-model="CLPCount" />
        </div>
        <div v-if="CLPTooLow" class="CLPTooLow">
          <span>{{ CLPTooLow }}</span>
        </div>
      </div>
      <div>
        <div class="mt-3 myDealPoint">
          <span>충전결과</span>
          <div>
            <span style="font-size: 28px; color: #2269ff; font-weight: 700;">
              {{
                priceToString(
                  parseInt(CLPCount) +
                    parseInt($store.state.UserPoint.OriginalCoinPoint)
                )
              }}
            </span>
            <span style="font-size: 14px; color: #2269ff;">
              CLP
            </span>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <span class="dealBoxTitle">CLP 포인트 충전</span>
        <div class="DLline" />
        <div>
          <div class="mt-3 myDeal">
            <button :class="credit" @click.prevent="creditPur">신용카드</button>
            <button :class="bank" @click.prevent="bankPur">무통장입금</button>
          </div>
          <div v-if="bankPurchase" class="mt-3 bankPurChase">
            <label>입금계좌</label>
            <select class="bankWoori">
              <option value="Woori">
                우리은행 / (주)트라이아트 / 00
              </option>
            </select>
          </div>
          <div class="mt-3">
            <div class="SamjaChk">
              <input type="checkbox" v-model="SamjaChk" @change="SamjaChkBox" />
              <small class="ml-2 SmajaChkBox">
                개인정보 제 3자 제공 및 위탁 동의
              </small>
            </div>
            <div class="mt-3">
              <button :class="purChase" @click.prevent="iamPort">
                결제하기
              </button>
            </div>
            <div class="mt-4 CautionPointCharge">
              <p>(오픈 전 내용 검토 필요)</p>
              <ul style="list-style: none;">
                <li>
                  -충전된 CLP의 유효기간은 충전 후 1년입니다.(기한만료 설정은
                  관리자에서 할 수 있도록 개발필요)
                </li>
                <li>
                  -1CLP는 1원 입니다.
                </li>
                <li>
                  -사용되지 않은 캐시에 대해서는 7일 이내 청약철회가 가능합니다.
                </li>
                <li>
                  -미사용된 이용권에 대해서는 환불이 가능하며, 환불 시
                  환불수수료(10% 또는 1,000원 중 큰 금액)를 제외한 나머지 금액이
                  환불됩니다.
                </li>
                <li>
                  -자세한 내용은 캐시링크 이용약관에서 확인할 수 있습니다.
                </li>
              </ul>
            </div>
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
      CLPCount: 30000,
      DLPrice: 40,
      modalClass: "d-none",
      CLPTooLow: "",
      credit: "credit",
      bank: "bank grayBox",
      PurchaseOption: "",
      SamjaChk: false,
      purChase: "purChase eventNone",
      bankPurchase: false,
    };
  },
  watch: {
    CLPCount: function() {
      if (this.CLPCount < 30000) {
        this.CLPTooLow = "최소충전금액 : 30,000CLP";
      } else {
        this.CLPTooLow = "";
      }
    },
  },
  methods: {
    prevBtn() {
      this.$router.push("/");
    },
    priceToString(price) {
      if (!price) {
        // const OriginalCoinPoint = this.$store.state.UserPoint.OriginalPoint;
        return 0;
      } else {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    creditPur() {
      this.credit = "credit";
      this.bank = "bank grayBox";
      this.PurchaseOption = "card";
      this.bankPurchase = false;
    },
    bankPur() {
      this.credit = "credit grayBox";
      this.bank = "bank";
      this.PurchaseOption = "bank";
      this.bankPurchase = true;
    },
    SamjaChkBox() {
      if (this.SamjaChk == false) {
        this.purChase = "purChase eventNone";
      } else {
        this.purChase = "purChase background2269";
      }
    },
    iamPort() {
      if (!this.CLPCount) {
        alert("충전할 CLP포인트를 입력해주세요.");
      } else if (this.CLPCount < 30000) {
        alert("30000CLP부터 충전이 가능합니다.");
      } else if (this.SamjaChk == false) {
        alert("개인정보를 제 3자에게 제공하는 것에 동의하셔야 합니다.");
      } else if (this.PurchaseOption == "card") {
        let IMP = window.IMP;
        IMP.init("imp05615202");
        IMP.request_pay(
          {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: "merchant_" + new Date().getTime(),
            name: "CLP 포인트 충전",
            amount: this.CLPCount,
            buyer_tel: "000-0000-0000",
          },
          function(rsp) {
            //콜백 함수
            if (rsp.success) {
              //결제 성공
              alert("결제 성공");
            } else {
              //결제 실패
              alert(
                "결제에 실패하였습니다.\n문제가 있다면 고객센터로 문의해주세요."
              );
            }
          }
        );
      } else {
        alert("무통장 입금 기능은 준비중입니다. 잠시만 기다려주세요.");
      }
    },
  },
};
</script>

<style>
label {
  margin-bottom: 0;
}
.bankPurChase {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #444;
}
.bankWoori {
  padding: 0px 10px;
  background: url(../../img/mini-open.png) 98% center / 12px no-repeat;
  width: 85%;
  height: 40px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #444;
}
.eventNone {
  pointer-events: none;
}
.background2269 {
  background-color: #2269ff !important;
  cursor: pointer;
}
.purChase {
  width: 100%;
  height: 40px;
  color: white;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 14px;
}
.SmajaChkBox {
  font-size: 12px;
  font-weight: 300;
  color: #888;
}
.SamjaChk {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
}
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
  max-width: 720px;
  margin: 0 auto;
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
.ChargePoint {
  width: 75%;
  height: 100%;
  border: 1px solid #ddd;
  padding: 0px 50px 0px 10px;
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
.ChargePointDL {
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
.bank {
  width: 50%;
  height: 40px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #2269ff;
  color: #2269ff;
  margin-left: 8px;
}
.credit {
  width: 50%;
  height: 40px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #2269ff;
  color: #2269ff;
}
.grayBox {
  border: 1px solid #ddd;
  color: #888;
}
.myDeal {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.CLPTooLow {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #888;
  font-size: 12px;
  font-weight: 300;
}
.CautionPointCharge {
  font-size: 12px;
  font-weight: 300;
  color: #444;
}
</style>
