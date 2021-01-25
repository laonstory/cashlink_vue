<template>
  <div class="mt-3">
    <div
      v-for="(SearchDataItems, index) in SampleData"
      :key="index"
      class="mt-3 SearchDataBuy"
    >
      <!-- 판매중 -->
      <div v-if="SearchDataItems.status === 'INIT'">
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 :
              {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >판매중 : {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="InitBtn">
            <button class="removeBtn" @click.prevent="modalRemoveItem">
              삭제하기
            </button>
            <button class="editBtn">수정하기</button>
          </div>
        </div>
      </div>
      <!-- 구매신청 받음 -->
      <div
        v-else-if="SearchDataItems.purchase.status === 'WAITING_FOR_APPROVAL'"
      >
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >{P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit approval">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >구매신청받음 :
              {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="ApprovalBtn">
            <button class="removeBtn" @click.prevent="BuyerInfo">
              구매자정보
            </button>
            <button class="removeBtn" @click.prevent="RejectBuy">거절</button>
            <button class="editBtn" @click.prevent="BuySure">승인</button>
          </div>
        </div>
      </div>
      <!-- 입금대기중 -->
      <div
        v-else-if="SearchDataItems.purchase.status === 'WAITING_FOR_DEPOSIT'"
      >
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit gray">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >입금대기 중 :
              {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="InitBtn">
            <button class="removeBtn" @click.prevent="modalIn">
              구매자 신고
            </button>
            <button class="editBtn">입금확인 및 판매</button>
          </div>
        </div>
      </div>
      <!-- 입금완료 -->
      <div v-else-if="SearchDataItems.purchase.status === 'DEPOSIT_COMPLETED'">
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit gray">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >입금완료 : {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
        </div>
      </div>
      <!-- 거래완료 -->
      <div v-else-if="SearchDataItems.purchase.status === 'DONE'">
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit gray">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >거래완료 : {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
        </div>
      </div>
      <!-- 기간 만료 -->
      <div v-else-if="SearchDataItems.purchase.status === 'EXPIRED'">
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit gray">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span>기간만료 : {{ SearchDataItems.UpdateDate }}</span>
          </div>
        </div>
      </div>
      <!-- 취소 -->
      <div v-else>
        <div class="SearchDataBox">
          <div class="dealLogTitleBox">
            <span class="BuyTitleSell"
              >P{{ productCode(SearchDataItems.id) }}NK</span
            >
            <small class="BuyBirth">
              등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
            </small>
          </div>
          <div class="mt-2 BuyInfo">
            <span>결제 금액</span>
            <span style="font-size: 14px; font-weight: 500;">
              {{ regexStr(SearchDataItems.quantity * SearchDataItems.price) }}
              KRW(원)
            </span>
            <span>딜링 수량</span>
            <span>{{ regexStr(SearchDataItems.quantity) }} DL(딜링)</span>
            <span>개당 가격</span>
            <span>{{ regexStr(SearchDataItems.price) }} KRW(원)</span>
          </div>
          <div class="buyStatusInit gray">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span>취소 : {{ momentDateStr(SearchDataItems.updated_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../../../auth/client";
import moment from "moment";
export default {
  beforeMount() {
    const LoginData = window.localStorage.getItem("auth");
    client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
    client
      .get("/api/markets/sell", {
        params: {
          page: this.page,
          status: "",
          duration: "",
          query: "",
        },
      })
      .then((res) => {
        this.SampleData = this.SampleData.concat(res.data.data.markets);
        console.log(this.SampleData[0]);
      });
  },
  components: {},
  data() {
    return {
      dealLogSell: "w-33Log dealLogInnerRouterBorder fontBold",
      dealLogBuy: "w-33Log fontThin",
      dealLogSend: "w-33Log fontThin",
      SearchDataSet: "All",
      SampleData: [],
      page: 0,
    };
  },
  methods: {
    regexStr(price) {
      let moneyPrice = Math.round(price);
      moneyPrice = String(moneyPrice);
      return moneyPrice.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    },
    momentDateStr(DateStr) {
      let date = moment(DateStr).format("YYYY-MM-DD HH:mm");
      return date;
    },
    productCode(id) {
      const str = "00000000000" + id.toString();
      return str.slice(-10);
    },
    modalIn() {
      this.$store.state.dealLogPopup = "";
    },
    modalRemoveItem() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "물품삭제 안내";
      this.$store.state.popupMsg = "삭제한 물품은<br>다시 복구가 불가능합니다.";
      this.$store.state.popupStrong = "삭제하시겠습니까?";
      this.$store.state.code = "remove";
    },
    BuyerInfo() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "구매자 정보";
      this.$store.state.popupMsg =
        "<span style='font-weight:bold'>HOJOGroup</span>님<br><span style='color:#2233aa;font-weight:bold;'>보안 2등급</span>";
      this.$store.state.popupStrong = "계좌따윈 뱃속에 넣어버린 사용자 입니다.";
      this.$store.state.code = "buyerInfo";
    },
    RejectBuy() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "판매거절 안내";
      this.$store.state.popupMsg =
        "판매를 거절하시려면,<br>사유를 선택해주세요.";
      this.$store.state.code = "reject";
    },
    BuySure() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "거래승인 안내";
      this.$store.state.popupMsg =
        "거래승인 이후 회원님 계좌로의<br>구매자 입금내역을 확인하세요.";
      this.$store.state.popupStrong = "승인하시겠습니까?";
      this.$store.state.code = "buySure";
    },
  },
};
</script>

<style>
.BuyTitleSell {
  font-size: 14px;
  font-weight: 700;
  color: #2233aa;
}
.BuyBirth {
  font-size: 12px !important;
}
.BuyInfo {
  font-size: 12px !important;
}
.buyStatusInit {
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
}
</style>
