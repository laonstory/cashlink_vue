<template>
  <div class="mt-3">
    <div
      v-for="(SearchDataItems, index) in SampleData"
      :key="index"
      class="mt-3 SearchDataBuy"
    >
      <!-- 판매중 -->
      <div v-if="SearchDataItems.purchase.status === 'DENY'">
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
          <div class="buyStatusInit gray">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >판매거절 : {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
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
              >구매신청(승인대기 중) :
              {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="ApprovalBtn">
            <button class="removeBtn" @click.prevent="RejectBuy">
              신청 취소
            </button>
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
            <span>{{ SearchDataItems.seller.username }}</span>
            <span style="color: #2169FF">
              승인완료 : {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="InitBtn">
            <button class="removeBtn" @click.prevent="modalIn">
              판매자 정보
            </button>
            <button class="editBtn">입금완료</button>
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
              >입금 확인 중 :
              {{ momentDateStr(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="InitBtn">
            <button class="removeBtn" @click.prevent="modalIn">
              판매자 신고
            </button>
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
      .get("/api/markets/purchases", {
        params: {
          page: this.page,
          status: "",
          duration: "",
          query: "",
        },
      })
      .then((res) => {
        this.SampleData = this.SampleData.concat(res.data.data.list);
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
        "<span style='font-weight:bold'>HOJOGroup</span>님<br><span style='color:#2233aa'>보안 2등급</span>";
      this.$store.state.popupStrong = "계좌따윈 뱃속에 넣어버린 사용자 입니다.";
      this.$store.state.code = "buyerInfo";
    },
  },
};
</script>

<style></style>
