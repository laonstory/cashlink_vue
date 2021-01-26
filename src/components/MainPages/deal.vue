<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="background: transparent;">
        <router-view></router-view>
        <div class="homeBody">
          <div class="MNavDeal">
            <div>
              <span>거래하기</span>
            </div>
          </div>

          <div class="homeBodyBoxDeal">
            <div class="myPoint">
              <div class="PointBox">
                <div class="PointStatus">
                  <img src="../../img/deal.png" alt="" class="pointBoxImg" />
                  <div class="h-75 ml-4">
                    <small>금일 딜링 (DL) 평균시세</small>
                    <h5 style="margin-bottom: 4px; color: #2169FF;">70 KRW</h5>
                    <div class="CoinInfo">
                      <small>최소가 40KRW</small>
                      <small>최고가 80KRW</small>
                    </div>
                  </div>
                </div>
                <div class="chargeBox" @click.prevent="dealApply">
                  <span>판매 등록하기 ></span>
                </div>
              </div>
            </div>
            <form class="formDeal">
              <div class="mt-3 SearchBox">
                <select v-model="searchSet" class="searchSet">
                  <option value="ID">아이디</option>
                  <option value="Phone">전화번호</option>
                </select>
                <input
                  type="text"
                  class="SearchInput"
                  placeholder="검색하세요"
                />
                <button type="submit" class="SearchIconOut">
                  <img
                    src="../../img/search.png"
                    alt=""
                    class="SearchIconInner"
                  />
                </button>
              </div>
            </form>
            <div class="SearchDataTitleBox" style="background: white;">
              <span style="font-size: 14px;">전체결과</span>
              <select v-model="SearchDataSet" class="SearchDataSet">
                <option value="All">전체</option>
                <option value="Interest">관심상품</option>
              </select>
            </div>
            <div class="SearchDataDeal" style="background: white;">
              <div v-for="(SearchDataItems, index) in searchData" :key="index">
                <div
                  v-if="SearchDataItems.status === 'ON_SALE'"
                  class="DealClickNot"
                >
                  <div class="SearchDataListBoxNot DealClickNot">
                    <div class="SearchDataFirst">
                      <div class="SearchDataFirstInner">
                        <span
                          >{{
                            priceToString(Math.round(SearchDataItems.price))
                          }}KRW
                        </span>
                        /
                        <span>1DL</span>
                      </div>
                      <span>
                        <div v-if="SearchDataItems.isLike">
                          <img
                            src="../../img/heart-color.png"
                            class="HeartIcon"
                            @click.prevent="likeYour(SearchDataItems.id, index)"
                          />
                        </div>
                        <div v-else>
                          <img
                            src="../../img/heart.png"
                            class="HeartIcon"
                            @click.prevent="likeYour(SearchDataItems.id, index)"
                          />
                        </div>
                      </span>
                    </div>
                    <div class="SearchDataSecond">
                      <div class="dlBox">
                        <img
                          src="../../img/dl-coin.png"
                          alt=""
                          class="dlcoinImg"
                        />
                        <div class="DLBuy ml-2">
                          <span>
                            {{
                              priceToString(
                                Math.round(SearchDataItems.quantity)
                              )
                            }}
                            DL
                          </span>
                        </div>
                        <div class="DLBuy ml-3">
                          <img
                            src="../../img/won_point.png"
                            alt=""
                            class="dlcoinImg"
                          />
                          <span class="DLBuy ml-2">
                            {{
                              priceToString(
                                Math.round(SearchDataItems.price) *
                                  Math.round(SearchDataItems.quantity)
                              )
                            }}
                            KRW
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="SearchDataThird">
                      <span>{{ SearchDataItems.seller.username }}</span>
                    </div>
                  </div>
                </div>
                <!-- prettier-ignore -->
                <div
              v-if="SearchDataItems.status === 'INIT'"
              class="DealClick"
              
            >
              <div class="SearchDataListBox DealClick">
                <div class="SearchDataFirst">
                  <div class="SearchDataFirstInner">
                    <span>{{ priceToString(Math.round(SearchDataItems.price)) }}KRW </span>
                      /
                    <span>1DL</span>
                  </div>
                  <span>
                    <div v-if="SearchDataItems.isLike">
                      <img src="../../img/heart-color.png" class="HeartIcon" @click.prevent="likeYour(SearchDataItems.id, index)">
                    </div>
                    <div v-else>
                      <img src="../../img/heart.png" class="HeartIcon" @click.prevent="likeYour(SearchDataItems.id, index)">
                    </div>
                  </span> 
                </div>
                <div class="SearchDataSecond"
                  @click.prevent="
                    BuyDLFunc(
                      1,
                      Math.round(SearchDataItems.price),
                      Math.round(SearchDataItems.price) *
                      Math.round(SearchDataItems.quantity)
                    )"
                >
                  <div class="d-flex">
                    <div class="DLBuy">
                      <img
                        src="../../img/dl-coin.png"
                        alt=""
                        class="dlcoinImg"
                      />
                      <span class="DLBuy ml-2">
                        {{  priceToString(Math.round(SearchDataItems.quantity)) }} DL
                      </span>
                    </div>
                    <div class="DLBuy ml-3">
                      <img
                        src="../../img/won_point.png"
                        alt=""
                        class="dlcoinImg"
                      />
                      <span class="DLBuy ml-2">
                        {{ priceToString(
                            Math.round(SearchDataItems.price) *
                              Math.round(SearchDataItems.quantity)
                          ) }} KRW
                      </span>
                    </div>
                  </div>
                </div>
                <div class="SearchDataThird">
                  <span>{{ SearchDataItems.seller.username }}</span>
                </div>
              </div>
            </div>
                <!-- prettier-ignore -->
                <div
              v-if="SearchDataItems.status === 'DONE'"
              class="DealClick"
              
            >
              <div class="SearchDataListBox DealClick">
                <div class="SearchDataFirst">
                  <div class="SearchDataFirstInner">
                    <span>{{ priceToString(Math.round(SearchDataItems.price)) }}KRW </span>
                      /
                    <span>1DL</span>
                  </div>
                  <span>
                    <div v-if="SearchDataItems.isLike">
                      <img src="../../img/heart-color.png" class="HeartIcon" @click.prevent="likeYour(SearchDataItems.id, index)">
                    </div>
                    <div v-else>
                      <img src="../../img/heart.png" class="HeartIcon" @click.prevent="likeYour(SearchDataItems.id, index)">
                    </div>
                  </span> 
                </div>
                <div class="SearchDataSecond" 
                  @click.prevent="
                    BuyDLFunc(
                      1,
                      Math.round(SearchDataItems.price),
                      Math.round(SearchDataItems.price) *
                      Math.round(SearchDataItems.quantity)
                    )"
                >
                  <div class="d-flex">
                    <div class="DLBuy">
                      <img
                        src="../../img/dl-coin.png"
                        alt=""
                        class="dlcoinImg"
                      />
                      <span class="DLBuy ml-2">
                        1DL
                      </span>
                    </div>
                    <div class="DLBuy ml-3">
                      <img
                        src="../../img/won_point.png"
                        alt=""
                        class="dlcoinImg"
                      />
                      <span class="DLBuy ml-2">
                        {{ priceToString(
                            Math.round(SearchDataItems.price) *
                              Math.round(SearchDataItems.quantity)
                          ) }} KRW
                      </span>
                    </div>
                  </div>
                </div>
                <div class="SearchDataThird">
                  <span>{{ SearchDataItems.seller.username }}</span>
                </div>
              </div>
            </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="navBoxS">
          <div class="navBarM">
            <div class="mobileMenu">
              <span :class="Mhome" @click.prevent="MhomeRouter">
                <img src="../../img/home.png" alt="" :class="MhomeNone" />
                <img
                  src="../../img/home-color.png"
                  alt=""
                  :class="MhomeColor"
                />
                홈
              </span>
              <span :class="MBuy" @click.prevent="MBuyRouter">
                <img src="../../img/deal.png" alt="" :class="MBuyNone" />
                <img src="../../img/deal-color.png" alt="" :class="MbuyColor" />
                거래하기
              </span>
              <span :class="MBuyLog" @click.prevent="MBuyLogRouter">
                <img src="../../img/list.png" alt="" :class="MBuyLogNone" />
                <img
                  src="../../img/list-color.png"
                  alt=""
                  :class="MBuyLogColor"
                />
                거래내역
              </span>
              <span :class="mMyPage" @click.prevent="mMyPageRouter">
                <img src="../../img/mypage.png" alt="" :class="mMyPageNone" />
                <img
                  src="../../img/mypage-color.png"
                  alt=""
                  :class="mMyPageColor"
                />
                마이페이지
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../../auth/client";

export default {
  beforeMount() {
    client
      .get("/api/markets", {
        params: {
          page: this.page,
          order: "RECENT|DESC",
        },
      })
      .then((res) => {
        this.searchData = this.searchData.concat(res.data.data.content);
      });
  },
  data() {
    return {
      page: 0,
      clp: "0",
      searchSet: "ID",
      SearchDataSet: "All",
      searchData: [],
      Mhome: "ClickPointer",
      MhomeNone: "MainIconSize",
      MhomeColor: "d-none",

      MBuyLog: "ClickPointer",
      MBuyLogNone: "MainIconSize",
      MBuyLogColor: "d-none",

      MBuy: "Color2233 ClickPointer",
      MBuyNone: "d-none",
      MbuyColor: "MainIconSize",

      mMyPage: "ClickPointer",
      mMyPageNone: "MainIconSize",
      mMyPageColor: "d-none",
    };
  },
  methods: {
    likeYour(id, index) {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client.post(`/api/markets/${id}/like`).then(() => {
        this.searchData[index].isLike = !this.searchData[index].isLike;
      });
    },
    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    BuyDLFunc(DLBuyCount, DLCountPer, Price) {
      this.$store.state.dealPopUp.BuyDLExplain.DLBuyCount = DLBuyCount;
      this.$store.state.dealPopUp.BuyDLExplain.DLCountPer = DLCountPer;
      this.$store.state.dealPopUp.BuyDLExplain.Price = Price;
      this.$store.state.dealPopUp.BuyWaring = "BuyWaring";
      this.$store.state.dealPopUp.BuyWaringBox = "BuyWaringBox";
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
    dealApply() {
      this.$router.push("/deal/apply");
    },
  },
};
</script>

<style>
.CoinInfo {
  width: 170px;
  display: flex;
  justify-content: space-between;
}
.chargeBox {
  color: white;
  opacity: 0.6;
  font-size: 14px;
  cursor: pointer;
}
.PointStatus {
  height: 100%;
  align-items: center;
  color: white;
  display: flex;
  flex-direction: row !important;
  font-weight: 350;
}
.slideList {
  width: 100%;
  height: 100%;
  list-style: none;
  margin-bottom: 0;
}
.MNavDeal {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.homeBody {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.homeBodyBoxDeal {
  max-width: 800px;
  width: 100%;
}

.myPoint {
  width: 100%;
  max-width: 800px;
  height: 104px !important;
  background-color: #00aaff;
  border-radius: 10px !important;
  position: relative;
  top: 0px;
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
.SearchInput {
  width: 80%;
  height: 100%;
  border: 1px solid #ddd;
  border-left: none;
  text-align: right;
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
  padding: 10px 20px;
  background: white;
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
  display: flex;
  justify-content: space-between;
}
.HeartIcon {
  width: 25px;
  height: 25px;
  cursor: pointer;
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
  height: 45px;
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
.BuyWaring {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.BuyWaringBox {
  width: 280px;
  height: 390px;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
}
.DLBuyGuide {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.DLBuyExplain {
  width: 100%;
  height: 20%;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: #444;
}
.DLBuyAllow {
  width: 100%;
  height: 25%;
  justify-content: center;
  align-items: center;
}
.DLBuyAllow > input {
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  border-radius: 1px;
}
.DLBuyAllowTitle {
  font-size: 12px;
  color: #888;
}
.DLBuyInfo {
  width: 100%;
  height: 20%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 17px;
  color: #666;
}
.DLBuyInfoNumber {
  text-align: right;
}
.DLBuyBtn {
  width: 100%;
  height: 27%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}
.DLBuyCancel {
  width: 64px;
  height: 64px;
  border-radius: 70px;
  border: 1px solid #ddd;
  color: #666;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.DLBuyAllowBtn {
  width: 64px;
  height: 64px;
  border-radius: 70px;
  border: 1px solid #ddd;
  background-color: #2469ff;
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.DLBuySuccess {
  width: 280px;
  height: 232px;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
}
.DLBuySuccessTitle {
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: #666;
}
.DLBuySuccessExplain {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  color: #333;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.DLBuySuccessExplain small:nth-of-type(1) {
  font-weight: 400;
  font-size: 12px;
  color: #444 !important;
}
.DLBuySuccessExplain small:nth-of-type(2) {
  font-weight: 300;
  font-size: 12px;
  color: #888 !important;
}
.SearchDataDeal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 20px 20px;
  background: white;
  border-radius: 0px 0px 10px 10px;
}
.homeBodyBox {
  top: 0 !important;
}
.formDeal {
  margin-top: 2rem;
  padding: 20px 20px;
  background: white;
  border-radius: 10px 10px 0px 0px;
}
@media screen and (max-width: 900px) {
  .SearchDataDeal {
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
  .SearchDataTitleBox {
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
  .formDeal {
    margin-top: 0;
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
  .myPoint {
    width: 100%;
    height: 104px !important;
    background-color: #00aaff;
    border-radius: 10px !important;
    position: relative;
  }
  .homeBodyBoxDeal {
    position: relative;
    top: 52px !important;
    padding: 16px 16px !important;
    margin-bottom: 3rem;
  }
  .SearchDataDeal {
    grid-template-columns: repeat(1, 1fr);
  }
  .MNavDeal {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
  .homeBodyBoxDeal {
    max-width: 720px;
    width: 100%;
    padding: 0px 16px;
  }
}
</style>
