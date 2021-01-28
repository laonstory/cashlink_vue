<template>
  <div>
    <div class="mt-3 gridSell">
      <div
        v-for="(SearchDataItems, index) in SampleData"
        :key="index"
        class="mt-3 SearchDataBuy"
      >
        <!-- prettier-ignore -->
        <div
        v-if="SearchDataItems.status == 'INIT' && SearchDataItems.purchase.status === 'DENY'"
      >
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
              >판매거절 : {{ momentDateStr2(SearchDataItems.updated_at) }}</span
            >
          </div>
        </div>
      </div>
        <!-- 구매신청 받음 -->
        <!-- prettier-ignore -->
        <div
        v-else-if="SearchDataItems.status == 'ON_SALE' && SearchDataItems.purchase.status === 'WAITING_FOR_APPROVAL'"
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
          <div class="buyStatusInit approval">
            <span>{{ SearchDataItems.purchase.buyer.username }}</span>
            <span
              >구매신청(승인대기 중) :
              {{ momentDateStr2(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="ApprovalBtn2">
            <button class="removeBtn" @click.prevent="RejectBuy(SearchDataItems.id, SearchDataItems.purchase.id)">
              신청 취소
            </button>
          </div>
        </div>
      </div>
        <!-- 입금대기중 -->
        <!-- prettier-ignore -->
        <div
        v-else-if="SearchDataItems.status == 'ON_SALE' && SearchDataItems.purchase.status === 'WAITING_FOR_DEPOSIT'"
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
              승인완료 : {{ momentDateStr2(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="InitBtn">
            <button class="removeBtn" @click.prevent="sellerInfo(SearchDataItems.seller.username)">
              판매자 정보
            </button>
            <button class="editBtn" @click.prevent="PurchaseDeposit(SearchDataItems.id, SearchDataItems.purchase.id)">입금완료</button>
          </div>
        </div>
      </div>
        <!-- 입금완료 -->
        <!-- prettier-ignore -->
        <div
        v-else-if="SearchDataItems.status == 'ON_SALE' && SearchDataItems.purchase.status === 'DEPOSIT_COMPLETED'"
      >
        <div class="SearchDataBox">
          <div class="dealLogTitleSize">
            <div class="dealLogTitleBox">
              <span class="BuyTitleSell">
                P{{ productCode(SearchDataItems.id) }}NK
              </span>
              <small class="BuyBirth">
                등록일 : {{ momentDateStr(SearchDataItems.created_at) }}
              </small>
            </div>
            <img src="../../../img/warn.png" alt="" class="warnImg" @click.prevent="fakeDeposit">
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
              {{ momentDateStr2(SearchDataItems.updated_at) }}</span
            >
          </div>
          <div class="InitBtn">
            <button class="removeBtn" @click.prevent="report(SearchDataItems.id, SearchDataItems.purchase.id)">
              판매자 신고
            </button>
          </div>
        </div>
      </div>
        <!-- 거래완료 -->
        <div v-else-if="SearchDataItems.status === 'DONE'">
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
                >거래완료 :
                {{ momentDateStr2(SearchDataItems.updated_at) }}</span
              >
            </div>
          </div>
        </div>
        <!-- 기간 만료 -->
        <div v-else-if="SearchDataItems.status === 'EXPIRED'">
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
                >기간만료 :
                {{ momentDateStr2(SearchDataItems.UpdateDate) }}</span
              >
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
              <span
                >취소 : {{ momentDateStr2(SearchDataItems.updated_at) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="limit < count" class="mt-5">
      <button @click.prevent="MoreDeal" class="MoreBtn">더보기</button>
    </div>
    <div v-else class="mt-5 centerTextMore">
      <p>더 이상 없습니다.</p>
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
        this.limit = res.data.data.list.length;
        this.count = res.data.data.paging.count;
        this.page += 1;
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
      count: 0,
      limit: 0,
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
    momentDateStr2(DateStr) {
      let date = moment(DateStr).format("MM.DD HH:mm");
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
    sellerInfo(name) {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "판매자 정보";
      this.$store.state.popupMsg = `<span style='font-weight:bold'>${name}</span>님<br><span style='color:#2233aa'>보안 2등급</span>`;
      this.$store.state.popupStrong = "계좌따윈 뱃속에 넣어버린 사용자 입니다.";
      this.$store.state.code = "buyerInfo";
    },
    fakeDeposit() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "허위 알림 안내";
      this.$store.state.popupMsg = `허위로 입금완료를<br>하는 경우, 패널티가 부가되며,<br>거래는 자동 취소됩니다.`;
      this.$store.state.popupStrong = "";
      this.$store.state.code = "buyerInfo";
    },
    report(id, PurID) {
      this.$store.state.BuyID = id;
      this.$store.state.BuyPurID = PurID;
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "신고 안내";
      this.$store.state.popupMsg =
        "판매자를 신고하려면,<br>사유를 선택하여주세요.";
      this.$store.state.popupStrong = "";
      this.$store.state.code = "rejectReport";
    },
    PurchaseDeposit(id, PurID) {
      this.$store.state.BuyID = id;
      this.$store.state.BuyPurID = PurID;
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "입금 완료 안내";
      this.$store.state.popupMsg =
        "허위로 입금완료를<br>하는 경우, 패널티가 부과되며,<br>거래는 자동 취소됩니다.";
      this.$store.state.code = "PurchaseDeposit";
    },
    RejectBuy(id, PurID) {
      this.$store.state.BuyID = id;
      this.$store.state.BuyPurID = PurID;
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "신청취소 안내";
      this.$store.state.popupMsg =
        "구매신청취소는<br>1일 1회만 가능하며, 이후에는<br>신청취소가 불가합니다.";
      this.$store.state.popupStrong = "취소하시겠습니까?";
      this.$store.state.code = "RejectBuy";
    },
    MoreDeal() {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client
        .get(`/api/markets/purchases`, {
          params: {
            page: this.page,
            order: "RECENT|DESC",
          },
        })
        .then((res) => {
          this.SampleData = this.SampleData.concat(res.data.data.list);
          this.limit += res.data.data.list.length;
          this.page += 1;
        });
    },
  },
};
</script>

<style>
.dealLogTitleSize {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.warnImg {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.ApprovalBtn2 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  height: 48px;
  align-items: center;
}
</style>
