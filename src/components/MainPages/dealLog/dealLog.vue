<template>
  <div>
    <div class="homeBody">
      <modals
        :title="$store.state.popupTitle"
        :message="$store.state.popupMsg"
        :code="$store.state.code"
        :Graystrong="$store.state.popupStrong"
        :blackStrong="$store.state.popupblackStrong"
        :class="$store.state.dealLogPopup"
      />
      <div class="MNavDeal">
        <div>
          <span>{{ dealLogTitle }}</span>
        </div>
      </div>

      <div class="homeBodyBoxsell">
        <div>
          <div>
            <div class="dealLogInnerRouter">
              <div :class="dealLogSell" @click.prevent="deallogRouterSell">
                <span>판매내역</span>
              </div>
              <div :class="dealLogBuy" @click.prevent="deallogRouterBuy">
                <span>구매내역</span>
              </div>
              <div :class="dealLogSend" @click.prevent="deallogRouterSend">
                <span>전송내역</span>
              </div>
            </div>
            <hr />
          </div>
          <div class="LogGrid">
            <select class="selectBoxDeal">
              <option value="All">전체(기간)</option>
              <option value="today">오늘</option>
              <option value="1week">1주일</option>
              <option value="1month">1개월</option>
              <option value="3month">3개월</option>
              <option value="6month">6개월</option>
              <option value="1year">1년</option>
            </select>
            <select class="selectBoxDeal">
              <option value="All">전체(상태)</option>
              <option value="wait">거래중</option>
              <option value="Succes">거래완료</option>
              <option value="finishOver">기간만료</option>
            </select>
          </div>
          <form>
            <div class="mt-2 SearchBox">
              <input
                type="text"
                class="SearchInput2"
                placeholder="물품번호 검색"
              />
              <button type="submit" class="SearchIconOut">
                <img
                  src="../../../img/search.png"
                  alt=""
                  class="SearchIconInner"
                />
              </button>
            </div>
          </form>
          <div class="SearchDataTitleBox">
            <span style="font-size: 14px;">전체결과</span>
            <select v-model="SearchDataSet" class="SearchDataSet">
              <option value="All">최신순</option>
            </select>
          </div>
          <sell :class="dealSell" />
          <buy :class="dealBuy" />
          <send :class="dealSend" />
        </div>
      </div>
    </div>
    <div class="navBoxS">
      <div class="navBarM">
        <div class="mobileMenu">
          <span :class="Mhome" @click.prevent="MhomeRouter">
            <img src="../../../img/home.png" alt="" :class="MhomeNone" />
            <img src="../../../img/home-color.png" alt="" :class="MhomeColor" />
            홈
          </span>
          <span :class="MBuy" @click.prevent="MBuyRouter">
            <img src="../../../img/deal.png" alt="" :class="MBuyNone" />
            <img src="../../../img/deal-color.png" alt="" :class="MbuyColor" />
            거래하기
          </span>
          <span :class="MBuyLog" @click.prevent="MBuyLogRouter">
            <img src="../../../img/list.png" alt="" :class="MBuyLogNone" />
            <img
              src="../../../img/list-color.png"
              alt=""
              :class="MBuyLogColor"
            />
            거래내역
          </span>
          <span :class="mMyPage" @click.prevent="mMyPageRouter">
            <img src="../../../img/mypage.png" alt="" :class="mMyPageNone" />
            <img
              src="../../../img/mypage-color.png"
              alt=""
              :class="mMyPageColor"
            />
            마이페이지
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modals from "../../popup/modal";
import sell from "../dealLog/sell";
import buy from "../dealLog/buy";
import Send from "./send.vue";
export default {
  components: {
    modals,
    sell,
    buy,
    Send,
  },

  data() {
    return {
      dealLogTitle: "거래내역",
      dealLogSell: "w-33Log dealLogInnerRouterBorder fontBold",
      dealLogBuy: "w-33Log fontThin",
      dealLogSend: "w-33Log fontThin",
      SearchDataSet: "All",
      popupTitle: "신청취소 안내",
      // prettier-ignore
      popupMsg:"구매신청취소는<br>1일 1회만 가능하며, 이후에는<br>신청취소가 불가합니다.",
      popupStrong: "취소하시겠습니까?",
      popupblackStrong: "",
      code: "",
      dealSell: "",
      dealBuy: "d-none",
      dealSend: "d-none",
      Mhome: "ClickPointer",
      MhomeNone: "MainIconSize",
      MhomeColor: "d-none",

      MBuyLog: "Color2233 ClickPointer",
      MBuyLogNone: "d-none",
      MBuyLogColor: "MainIconSize",

      MBuy: "ClickPointer",
      MBuyNone: "MainIconSize",
      MbuyColor: "d-none",

      mMyPage: "ClickPointer",
      mMyPageNone: "MainIconSize",
      mMyPageColor: "d-none",
    };
  },
  methods: {
    deallogRouterSell() {
      this.dealSell = "";
      this.dealBuy = "d-none";
      this.dealSend = "d-none";
      this.dealLogSell = "w-33Log dealLogInnerRouterBorder fontBold";
      this.dealLogBuy = "w-33Log fontThin";
      this.dealLogSend = "w-33Log fontThin";
    },
    deallogRouterBuy() {
      this.dealSell = "d-none";
      this.dealBuy = "";
      this.dealSend = "d-none";
      this.dealLogSell = "w-33Log fontThin";
      this.dealLogBuy = "w-33Log dealLogInnerRouterBorder fontBold";
      this.dealLogSend = "w-33Log fontThin";
    },
    deallogRouterSend() {
      this.dealSell = "d-none";
      this.dealBuy = "d-none";
      this.dealSend = "";
      this.dealLogSell = "w-33Log fontThin";
      this.dealLogBuy = "w-33Log fontThin";
      this.dealLogSend = "w-33Log dealLogInnerRouterBorder fontBold";
    },
    modalIn() {
      this.$store.state.dealLogPopup = "";
    },
    modalRemoveItem() {
      this.$store.state.dealLogPopup = "";
      this.popupTitle = "물품삭제 안내";
      this.popupMsg = "삭제한 물품은<br>다시 복구가 불가능합니다.";
      this.popupStrong = "삭제하시겠습니까?";
      this.code = "remove";
    },
    MhomeRouter() {
      this.$router.push("/").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    MBuyLogRouter() {
      this.$router.push("/BuyLog").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    MBuyRouter() {
      this.$router.push("/deal").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    mMyPageRouter() {
      this.$router.push("/myPage").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
  },
};
</script>

<style>
.chargeBox {
  color: white;
  opacity: 0.6;
  font-size: 14px;
}
.PointStatus {
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 350;
}
.slideList {
  width: 100%;
  height: 100%;
  list-style: none;
  margin-bottom: 0;
}
.homeBody {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.homeBodyBoxsell {
  max-width: 800px;
  width: 100%;
  margin-bottom: 4rem;
}

.myPoint {
  width: 100%;
  height: 80px;
  background-color: #00aaff;
  border-radius: 5px;
}
.PointBox {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.MNavDeal {
  display: none;
}
.SearchBox {
  width: 100%;
  height: 40px;
}
.searchSet {
  width: 20%;
  height: 100%;
  border: 1px solid #ddd;
  font-size: 14px;
  padding: 3px;
  color: #555;
  background-color: white;
}
.SearchInput2 {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  padding-left: 5px;
  padding-right: 40px;
  font-size: 14px;
  font-weight: 400;
}
.searchSet:focus {
  outline: none;
}
.SearchInput:focus {
  outline: none;
}
.SearchDataTitleBox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
}
.SearchDataSet {
  width: 20%;
  height: 100%;
  border: none;
  color: #555;
  font-size: 14px;
  background-color: white;
}
.SearchDataSet:focus {
  outline: none;
}
.SearchDataListBox {
  width: 100%;
  height: 113px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px;
  border-radius: 5px;
  padding: 0.7rem;
}
.SearchDataListBoxNot {
  width: 100%;
  height: 113px;
  background: #e3e3e3;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px;
  border-radius: 5px;
  padding: 0.7rem;
}
.NotSelected {
  background: #aaa;
}
.SearchDataFirst {
  width: 100%;
  height: 20%;
  color: #aaa;
  font-size: 12px;
}
.SearchDataSecond {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
}
.DLBuy {
  height: 100%;
  display: flex;
  align-items: center;
  color: #2233aa;
}
.DLBuy2 {
  height: 100%;
  display: flex;
  color: #2233aa;
}
.SearchDataThird {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 12px;
}
.pointBoxImg {
  width: 45px;
  opacity: 0.3;
}

.dlcoinImg {
  width: 30px;
  height: 30px;
}
.dlBox {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
}
.DealClick {
  cursor: pointer;
}
/* .DealClickNot {
  pointer-events: none;
  cursor: not-allowed;
} */
.SearchIconOut {
  position: relative;
  border: none;
  background-color: transparent;
}
.SearchIconInner {
  position: absolute;
  top: -20px;
  right: 8px;
  width: 30px;
}
.dealLogInnerRouter {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: #111;
}
.fontBold {
  font-weight: 600;
}
.fontThin {
  font-weight: 300;
}
.w-33Log {
  width: 33.3%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dealLogInnerRouterBorder {
  border-bottom: 2px solid #2233aa;
}
hr {
  margin-top: 0;
  margin-bottom: 0;
}
.LogGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 32px;
  grid-gap: 1rem;
  margin-top: 0.5rem;
}
.selectBoxDeal {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}
.SearchDataBuy {
  width: 100%;
  height: auto;
  padding: 0.7rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px 2px;
  border-radius: 10px;
}
.BuyTitle {
  font-size: 17px;
  font-weight: 700;
  color: #2233aa;
}
.SearchDataBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.BuyBirth {
  font-size: 14px;
  color: #888;
  font-weight: 400;
}
.BuyInfo {
  width: 100%;
  height: 75px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 1px;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 0px;
}
.BuyInfo span:nth-child(2n) {
  text-align: right;
}
.buyStatusInit {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  color: #ee0033;
}
.gray {
  color: #888 !important;
}
.approval {
  color: #00aaff !important;
}
.InitBtn {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  height: 48px;
  align-items: center;
}
.ApprovalBtn {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  height: 48px;
  align-items: center;
}
.removeBtn {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #888;
  color: white;
  font-size: 14px;
  font-weight: 400;
}
.editBtn {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #2233aa;
  color: white;
  font-size: 14px;
  font-weight: 400;
}
.dealLogTitleBox {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 900px) {
  .MNavDeal {
    /* width: -webkit-calc(100% - 32px);
    /* width: -moz-calc(100% - 32px); */
    /* max-width: 688px; */
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #666;
    position: fixed;
    background-color: white;
    border-bottom: 1px solid rgb(229, 229, 229);
    padding: 0px 16px;
    z-index: 4;
  }
  .homeBodyBoxsell {
    max-width: 720px;
    width: 100%;
    padding: 0px 16px;
    position: relative;
    top: 52px;
  }
}
</style>
