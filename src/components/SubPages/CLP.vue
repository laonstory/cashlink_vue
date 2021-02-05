<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="border-radius: 10px;">
        <div class="homeBody">
          <div class="AlramNav">
            <span>
              <button class="prevBtn" @click.prevent="prevBtn">
                <img src="../../img/prev.png" alt="" class="prevIcon" />
              </button>
            </span>
            <span class="AlramTitle">CLP관리</span>
            <span></span>
          </div>

          <div class="homeBodyBoxsell2">
            <div class="CLPBox" @click.prevent="ClpRouter">
              <img src="../../img/clp_point.png" alt="" class="clpIco" />
              <span class="ml-3">충전하기</span>
            </div>
            <div>
              <div class="LogGrid2">
                <select class="selectBoxDeal">
                  <option value="All">전체(기간)</option>
                  <option value="today">오늘</option>
                  <option value="1week">1주일</option>
                  <option value="1month">1개월</option>
                  <option value="3month">3개월</option>
                  <option value="6month">6개월</option>
                  <option value="1year">1년</option>
                </select>
              </div>
              <div class="SearchDataTitleBox2">
                <span style="font-size: 14px;">전체결과</span>
              </div>
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
                              src="../../img/clp_point.png"
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
                                <div class="BuyInfo2" style="color:#888;">
                                  <span
                                    >{{
                                      regexStr(SearchDataItems.amount)
                                    }}
                                    CLP</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <small class="BuyBirth2">
                            {{ momentDateStr2(SearchDataItems.created_at) }}
                          </small>
                        </div>
                        <!-- 상품 및 전송별 하단 설명 -->
                        <div class="mt-2">
                          <small class="DLExplain">
                            {{ SearchDataItems.description }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="limit < count" class="mt-5">
                  <button @click.prevent="MoreDeal" class="MoreBtn">
                    더보기
                  </button>
                </div>
                <div v-else class="mt-5 centerTextMore">
                  <p>더 이상 없습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../../auth/client";
import moment from "moment";
export default {
  async beforeMount() {
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
      .get(`/api/users/me/account/${this.$store.state.UserPoint.DilingID}/tx`, {
        params: {
          page: this.page,
          duration: "",
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
      SampleData: [],
      page: 0,
      count: 0,
      limit: 0,
    };
  },
  methods: {
    ClpRouter() {
      this.$router.push("/pointCharge");
    },
    prevBtn() {
      this.$router.push("/myPage");
    },
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
      let date = moment(DateStr).format("YYYY.MM.DD HH:mm");
      return date;
    },
    MoreDeal() {
      client
        .get(
          `/api/users/me/account/${this.$store.state.UserPoint.DilingID}/tx`,
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
.CLPBox {
  width: 100%;
  height: 70px;
  cursor: pointer;
}
.CLPBox span {
  color: #444;
  font-size: 14px;
}
.clpIco {
  width: 50px;
  height: 50px;
}
.LogGrid2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 32px;
  grid-gap: 1rem;
  margin-top: 0.5rem;
}
.homeBodyBoxsell2 {
  max-width: 800px;
  width: 100%;
  margin-bottom: 1.5rem !important;
  margin-top: 2rem;
}
@media screen and (max-width: 900px) {
  .homeBodyBoxsell2 {
    max-width: 800px;
    width: 100%;
    margin-bottom: 4rem !important;
    padding: 0px 16px;
    position: relative;
    top: 25px;
    margin-top: 0;
  }
}
</style>
