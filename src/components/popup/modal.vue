<template>
  <div class="modalBack">
    <div @click.prevent="modalExit" class="clickBack" />
    <div class="modalBuy">
      <div class="p-3 h-75">
        <div class="Modaltitle">
          <p>{{ title }}</p>
        </div>
        <div class="ModalString">
          <p v-html="message"></p>
        </div>
        <div v-if="$store.state.code == 'reject'">
          <select v-model="rejectSell" class="selectModal">
            <option value="not">사유 선택</option>
            <option value="lackProtect">구매자 인증 미비</option>
            <option value="ohterBuyer">다른 구매자에게 판매</option>
            <option value="stopOrRemove">판매중지 / 상품 삭제 예정</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div v-else class="waringRepeat">
          <p>{{ Graystrong }}</p>
          <p>{{ blackStrong }}</p>
        </div>
      </div>
      <div class="exitBtn">
        <div v-if="$store.state.code == 'remove'" class="w-100 centerBtn">
          <button class="modalButton" @click.prevent="modalRemoveSuccess">
            확인
          </button>
        </div>
        <div
          v-if="$store.state.code == 'removeSuccess'"
          class="w-100 centerBtn"
        >
          <button class="modalButton" @click.prevent="modalExit">
            확인
          </button>
        </div>
        <div v-if="$store.state.code == 'buyerInfo'" class="w-100 centerBtn">
          <button class="modalButton" @click.prevent="modalExit">
            확인
          </button>
        </div>
        <div v-if="$store.state.code == 'reject'" class="w-100 rejectBtn">
          <button class="modalButton grayBack" @click.prevent="modalExit">
            취소
          </button>
          <button class="modalButton" @click.prevent="modalRejectSuccess">
            판매거절
          </button>
        </div>
        <div
          v-if="$store.state.code == 'rejectSuccess'"
          class="w-100 centerBtn"
        >
          <button class="modalButton" @click.prevent="modalExit">
            확인
          </button>
        </div>
        <div v-if="$store.state.code == 'buySure'" class="w-100 centerBtn">
          <button class="modalButton" @click.prevent="modalSureSuccess">
            확인
          </button>
        </div>
        <div v-if="$store.state.code == 'SureSuccess'" class="w-100 centerBtn">
          <button class="modalButton" @click.prevent="modalSureInfomation">
            확인
          </button>
        </div>
        <div v-if="$store.state.code == 'SureInfo'" class="w-100 centerBtn">
          <button class="modalButton" @click.prevent="modalExit">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rejectSell: "not",
    };
  },
  props: ["title", "message", "Graystrong", "blackStrong", "code"],
  methods: {
    modalExit() {
      this.$store.state.dealLogPopup = "d-none";
    },
    modalRemoveSuccess() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "삭제 완료";
      this.$store.state.popupMsg = "정상적으로 삭제되었습니다.";
      this.$store.state.popupStrong = "";
      this.$store.state.code = "removeSuccess";
    },
    modalRejectSuccess() {
      if (this.rejectSell == "not") {
        alert("사유를 선택해주세요.");
      } else {
        this.$store.state.dealLogPopup = "";
        this.$store.state.popupTitle = "거절 완료";
        this.$store.state.popupMsg = "판매거절이<br>정삭적으로 처리되었습니다.";
        this.$store.state.popupStrong = "";
        this.$store.state.code = "rejectSuccess";
        this.rejectSell = "not";
      }
    },
    modalSureSuccess() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "승인 완료";
      this.$store.state.popupMsg = "거래승인이<br>정삭적으로 처리되었습니다.";
      this.$store.state.popupStrong = "";
      this.$store.state.code = "SureSuccess";
    },
    modalSureInfomation() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "안내";
      this.$store.state.popupMsg =
        "입금완료 알림 후 3시간 이내에<br>확인이 이루어지지 않으면 구매자에게<br>회원님의 연락처가 공개됩니다.";
      this.$store.state.popupStrong = "";
      this.$store.state.code = "SureInfo";
    },
  },
};
</script>

<style>
.centerBtn {
  display: flex;
  justify-content: center;
}
.modalBack {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
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
  height: 200px;
  background-color: white;
  z-index: 8;
  border-radius: 10px;
}
.exitBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 20%;
}
.modalButton {
  width: 54px;
  height: 54px;
  font-size: 14px;
  border-radius: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2233aa;
  color: white;
  border: none;
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
