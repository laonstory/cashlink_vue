<template>
  <div>
    <div class="gridSell">
      <div
        v-for="(SearchDataItems, index) in SampleData"
        :key="index"
        class="SearchDataSend"
      >
        <div>
          <div class="SearchDataBox">
            <div class="DLInfo">
              <div class="DLpoint">
                <img
                  src="../../../img/dl_point.png"
                  alt=""
                  class="DLpointImg"
                />
                <div class="ml-3 dealLogTitleBox2">
                  <div>
                    <div>
                      <span class="BuyTitleSell black">
                        {{ SearchDataItems.title }}
                      </span>
                    </div>
                    <!-- DL마다 글씨 다르게 v-if사용 -->
                    <div
                      v-if="SearchDataItems.title == 'DL 입금'"
                      class="BuyInfo2 DLBlueColor"
                    >
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div
                      v-else-if="SearchDataItems.title == 'DL 전송'"
                      class="BuyInfo2 DLRed"
                    >
                      <span>- {{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div
                      v-else-if="SearchDataItems.title == 'DL 구매'"
                      class="BuyInfo2 DLBlueColor"
                    >
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div
                      v-else-if="SearchDataItems.title == 'DL 판매'"
                      class="BuyInfo2"
                    >
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div
                      v-else-if="SearchDataItems.title == 'DL 적립'"
                      class="BuyInfo2 DLBlueColor"
                    >
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div
                      v-else-if="SearchDataItems.title == 'DL 전환'"
                      class="BuyInfo2 DLBlueColor"
                    >
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div
                      v-else-if="SearchDataItems.title == 'DL 환불'"
                      class="BuyInfo2 DLBlueColor"
                    >
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                    <div v-else class="BuyInfo2" style="color:#888;">
                      <span>{{ regexStr(SearchDataItems.amount) }} DL</span>
                    </div>
                  </div>
                </div>
              </div>
              <small class="BuyBirth2">
                {{ momentDateStr(SearchDataItems.created_at) }}
              </small>
            </div>
            <!-- 상품 및 전송별 하단 설명 -->
            <div v-if="SearchDataItems.title == 'DL 구매'" class="mt-2">
              <small class="DLExplain">
                상품번호: P{{ productCode(SearchDataItems.id) }}NK
              </small>
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
  components: {},
  data() {
    return {
      accountID: "",
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
  async beforeMount() {
    this.$store.state.dealLogSite.dealLogSell = "w-33Log fontThin";
    this.$store.state.dealLogSite.dealLogBuy = "w-33Log fontThin";
    this.$store.state.dealLogSite.dealLogSend =
      "w-33Log dealLogInnerRouterBorder fontBold";
    const LoginData = window.localStorage.getItem("auth");
    client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
    await client
      .get("/api/users/me")
      .catch((err) => {
        console.log(err.response.data);
        if (
          err.response.data.resultCode == "api.error.credentials_is_invalid"
        ) {
          alert("로그인 세션이 만료되었습니다.\n 다시 로그인 해주십시오.");
          document.location.replace(
            `${process.env.VUE_APP_AUTH_API_BASE}/oauth/authorize?client_id=cashlink&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&response_type=code`
          );
        }
      })
      .then((res) => {
        this.$store.state.UserPoint.DilingID = res.data.data.account[0].id;
        this.$store.state.UserInfo.UserForNum = res.data.data.account[0].id;
      });
    await client
      .get(
        `/api/users/me/account/${this.$store.state.UserInfo.UserForNum}/tx`,
        {
          params: {
            page: this.page,
            status: "",
            duration: "",
          },
        }
      )
      .then((res) => {
        this.SampleData = this.SampleData.concat(res.data.data.list);
        this.limit = res.data.data.list.length;
        this.count = res.data.data.paging.count;
        this.page += 1;
      });
  },
  methods: {
    productCode(id) {
      const str = "00000000000" + id.toString();
      return str.slice(-10);
    },
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
      this.$store.state.popupMsg = `<span style='font-weight:bold'>${name}</span>님<br><span style='color:#2233aa'>보안 등급도 개발중</span>`;
      this.$store.state.popupStrong = "개발중입니다.";
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
    MoreDeal() {
      client
        .get(
          `/api/users/me/account/${this.$store.state.UserInfo.UserForNum}/tx`,
          {
            params: {
              page: this.page,
              order: "RECENT|DESC",
            },
          }
        )
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
.selectBoxDeal {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}
.SearchDataSend {
  width: 100%;
  height: auto;
  padding: 0.7rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 1px;
  border-radius: 10px;
}
.SearchDataBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dealLogTitleBox2 {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
}
.BuyInfo2 {
  width: 100%;
  height: 20px;
  grid-row-gap: 1px;
  font-weight: 600;
  font-size: 14px;
}
.MoreBtn {
  width: 100%;
  height: 40px;
  background: #2169ff;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
}
.DLBlueColor {
  color: #00aaff;
}
.black {
  color: black !important;
}
.DLpointImg {
  width: 40px;
  height: 40px;
}
.DLpoint {
  width: 68%;
  height: 50px;
  display: flex;
  align-items: center;
}
.DLInfo {
  width: 100%;
  display: flex;
}
.BuyBirth2 {
  color: #888;
  font-weight: 400;
  font-size: 12px;
  position: relative;
  z-index: 1;
  margin-top: 0.2rem;
  display: flex;
  width: 32%;
  justify-content: flex-end;
}
.DLExplain {
  color: #888;
  font-weight: 400;
  font-size: 12px;
  height: 30px;
  display: flex;
  align-items: center;
}
.DLRed {
  color: #ee3300;
}
</style>
