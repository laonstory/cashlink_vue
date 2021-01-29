<template>
  <div class="">
    <div class="gridSell">
      <div
        v-for="(SearchDataItems, index) in SampleData"
        :key="index"
        class="SearchDataBuy"
      >
        <!-- 판매중 -->
        <!-- prettier-ignore -->
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
              <span></span>
              <span
                >판매중 : {{ momentDateStr2(SearchDataItems.created_at) }}</span
              >
            </div>
            <div class="InitBtn">
              <button class="removeBtn" @click.prevent="modalRemoveItem(SearchDataItems.id)">
                삭제하기
              </button>
              <button class="editBtn" @click.prevent="PatchSell(SearchDataItems.id,SearchDataItems.quantity, SearchDataItems.price)">수정하기</button>
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
              <span>{{ SearchDataItems.seller.username }}</span>
              <span
                >구매신청받음 :
                {{ momentDateStr2(SearchDataItems.updated_at) }}</span
              >
            </div>
            <div class="ApprovalBtn">
              <button class="removeBtn" @click.prevent="BuyerInfo(SearchDataItems.purchase.buyer.username)">
                구매자정보
              </button>
              <button class="removeBtn" @click.prevent="RejectBuy(SearchDataItems.id, SearchDataItems.purchase.id)">거절</button>
              <button 
                class="editBtn" 
                @click.prevent="BuySure(SearchDataItems.id, SearchDataItems.purchase.id)"
              >
                승인
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
              <span
                >입금대기 중 :
                {{ momentDateStr2(SearchDataItems.updated_at) }}</span
              >
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
            <img src="../../../img/help.png" alt="" class="warnImg" @click.prevent="fakeDeposit">
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
              <span
                >입금완료 :
                {{ momentDateStr2(SearchDataItems.updated_at) }}</span
              >
            </div>
            <div class="InitBtn">
              <button class="removeBtn" @click.prevent="report(SearchDataItems.id, SearchDataItems.purchase.id)">
                구매자 신고
              </button>
              <button class="editBtn" @click.prevent="PurchaseDone(SearchDataItems.quantity, SearchDataItems.price, SearchDataItems.id, SearchDataItems.purchase.id)">입금확인 및 판매</button>
            </div>
          </div>
        </div>
        <!-- 거래완료 -->
        <!-- prettier-ignore -->
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
              <span>{{ SearchDataItems.seller.username }}</span>
              <span
                >거래완료 :
                {{ momentDateStr2(SearchDataItems.updated_at) }}</span
              >
            </div>
          </div>
        </div>
        <!-- 기간 만료 -->
        <!-- prettier-ignore -->
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
              <span></span>
              <span>기간만료 : {{ momentDateStr2(SearchDataItems.UpdateDate) }}</span>
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
              <span></span>
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
  beforeMount() {
    this.$store.state.dealLogSite.dealLogSell =
      "w-33Log dealLogInnerRouterBorder fontBold";
    this.$store.state.dealLogSite.dealLogBuy = "w-33Log fontThin";
    this.$store.state.dealLogSite.dealLogSend = "w-33Log fontThin";
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
        this.limit = res.data.data.markets.length;
        this.count = res.data.data.paging.count;
        this.page += 1;
      });
  },
  components: {},

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
    //판매 취소
    modalRemoveItem(id) {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "물품삭제 안내";
      this.$store.state.popupMsg = "삭제한 물품은<br>다시 복구가 불가능합니다.";
      this.$store.state.popupStrong = "삭제하시겠습니까?";
      this.$store.state.code = "remove";
      this.$store.state.RemoveDealID = id;
    },
    // 구매자 정보
    BuyerInfo(name) {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "구매자 정보";
      this.$store.state.popupMsg = `<span style='font-weight:bold'>${name}</span>님<br><span style='color:#2233aa'>보안 등급도 개발중</span>`;
      this.$store.state.popupStrong = "개발중입니다.";
      this.$store.state.code = "buyerInfo";
    },
    // 판매 거절
    RejectBuy(id, PurID) {
      this.$store.state.BuyID = id;
      this.$store.state.BuyPurID = PurID;
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "판매거절 안내";
      this.$store.state.popupMsg =
        "판매를 거절하시려면,<br>사유를 선택해주세요.";
      this.$store.state.code = "reject";
    },
    //거래 승인
    BuySure(id, PurID) {
      this.$store.state.BuyID = id;
      this.$store.state.BuyPurID = PurID;
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "거래승인 안내";
      this.$store.state.popupMsg =
        "거래승인 이후 회원님 계좌로의<br>구매자 입금내역을 확인하세요.";
      this.$store.state.popupStrong = "승인하시겠습니까?";
      this.$store.state.code = "buySure";
    },
    //거래 완료
    PurchaseDone(DL, Price, id, PurID) {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client
        .post(`/api/markets/${id}/purchases/${PurID}/done`)
        .then(() => {
          this.$store.state.dealLogPopup = "";
          this.$store.state.popupTitle = "거래 완료";
          this.$store.state.popupMsg = `
          ${this.regexStr(DL)} DL이<br> ${this.regexStr(
            Price
          )} KRW에 판매가 완료되었습니다.
          `;
          this.$store.state.popupStrong = "";
          this.$store.state.code = "SureInfo";
        })
        .catch(() => {
          alert(
            "거래 완료 도중 에러가 발생하였습니다. 관리자에게 문의해주십시오."
          );
        });
    },
    //거래 신고
    report(id, PurID) {
      this.$store.state.BuyID = id;
      this.$store.state.BuyPurID = PurID;
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "신고 안내";
      this.$store.state.popupMsg =
        "구매자를 신고하려면,<br>사유를 선택하여주세요.";
      this.$store.state.popupStrong = "";
      this.$store.state.code = "rejectReport";
    },
    MoreDeal() {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client
        .get(`/api/markets/sell`, {
          params: {
            page: this.page,
            status: "",
            duration: "",
            query: "",
          },
        })
        .then((res) => {
          this.SampleData = this.SampleData.concat(res.data.data.markets);
          this.limit += res.data.data.markets.length;
          this.page += 1;
        });
    },
    fakeDeposit() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "거래 승인 안내";
      this.$store.state.popupMsg = `거래승인 이후 회원님 계좌로의<br>구매자 입금내역을 확인하세요.`;
      this.$store.state.popupStrong = "";
      this.$store.state.code = "buyerInfo";
    },
    PatchSell(id, count, price) {
      this.$store.state.PatchSell.sellID = id;
      this.$store.state.PatchSell.count = count;
      this.$store.state.PatchSell.price = price;
      this.$router.push("/deal/patch");
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
.gridSell {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.3rem;
}
.homeBodyBoxsell {
  max-width: 800px;
  width: 100%;
  margin-bottom: 1.5rem !important;
}
@media screen and (max-width: 900px) {
  .gridSell {
    grid-template-columns: repeat(1, 1fr);
  }
  .homeBodyBoxsell {
    max-width: 800px;
    width: 100%;
    margin-bottom: 4rem !important;
  }
}
</style>
