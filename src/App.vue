<template>
  <div class="mainSize">
    <div :class="$store.state.dealPopUp.BuyWaring">
      <div :class="$store.state.dealPopUp.BuyWaringBox">
        <div class="DLBuyGuide">
          <span>상품구매 안내</span>
        </div>
        <div class="DLBuyExplain">
          <p>해당 상품을 구매하시려면</p>
          <p>개인정보 제 3자 제공 및 위탁에</p>
          <p>동의하셔야 합니다.</p>
        </div>
        <div class="d-flex DLBuyAllow">
          <input
            type="checkbox"
            v-model="$store.state.dealPopUp.BuyDLExplain.UserLaw"
          />
          <small class="ml-2 DLBuyAllowTitle">
            개인정보 제3자 제공 및 위탁 동의
          </small>
        </div>
        <div class="DLBuyInfo">
          <small>판매수량</small>
          <small class="DLBuyInfoNumber">
            {{ $store.state.dealPopUp.BuyDLExplain.DLBuyCount }} DL
          </small>
          <small>개당가격</small>
          <small class="DLBuyInfoNumber">
            {{ $store.state.dealPopUp.BuyDLExplain.DLCountPer }} KRW
          </small>
          <small>판매가</small>
          <small class="DLBuyInfoNumber">
            {{ $store.state.dealPopUp.BuyDLExplain.Price }} KRW
          </small>
          <small>전송 수수료</small>
          <small class="DLBuyInfoNumber">
            {{ $store.state.dealPopUp.BuyDLExplain.tax }} CP
          </small>
        </div>
        <div class="DLBuyBtn">
          <div class="DLBuyCancel" @click.prevent="BuyDLFuncCancel">
            <span>나중에</span>
          </div>
          <div class="DLBuyAllowBtn" @click.prevent="BuyDLFuncAllow">
            <span>구매하기</span>
          </div>
        </div>
      </div>
      <div :class="$store.state.dealPopUp.DLBuySuccess">
        <div class="DLBuySuccessTitle">
          <p>접수완료 안내</p>
        </div>
        <div class="DLBuySuccessExplain">
          <small>구매신청이 접수되었습니다.</small>
          <small class="mt-2">
            접수된 상품은 구매내역에서 <br />
            확인 가능합니다.
          </small>
        </div>
        <div class="DLBuyBtn mt-4">
          <div class="DLBuyCancel" @click.prevent="BuyDLFuncCancel">
            <span>나중에</span>
          </div>
          <div class="DLBuyAllowBtn" @click.prevent="BuyDLFuncAllowNotify">
            <span>확인</span>
          </div>
        </div>
      </div>
    </div>
    <div class="navBox">
      <div class="navSize">
        <nav class="navi">
          <div class="navLogo">
            <img
              src="./img/logo.png"
              alt=""
              class="logo"
              @click.prevent="MhomeRouter"
              style="cursor: pointer;"
            />
            <!-- <span>CashLink</span> -->
          </div>
          <div class="navRouter">
            <span :class="MBuy" @click.prevent="MBuyRouter">거래하기</span>
            <span :class="MBuyLog" @click.prevent="MBuyLogRouter"
              >거래내역</span
            >
            <span :class="mMyPage" @click.prevent="mMyPageRouter"
              >마이페이지</span
            >
          </div>
          <div class="navNotify">
            <img
              src="./img/notice-new.png"
              alt=""
              class="notice"
              @click.prevent="Alrams"
            />
          </div>
        </nav>
      </div>
    </div>

    <router-view class="routerViewSize"></router-view>
  </div>
</template>

<script>
import client from "./auth/client";
import auth from "./auth/auth";
export default {
  name: "App",
  components: {
    // Loading,
  },
  beforeMount() {
    setTimeout(() => {
      if (window.localStorage.getItem("auth")) {
        const LoginData = window.localStorage.getItem("auth");
        client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
        client
          .get("/api/users/me")
          .then((res) => {
            this.$store.state.UserInfo.Name = res.data.data.user.name;
            this.$store.state.UserInfo.UserForNum = res.data.data.user.id;
            this.$store.state.UserPoint.DilingID = res.data.data.account[0].id;
            this.$store.state.UserInfo.UserForNum = res.data.data.account[0].id;
            this.$store.state.UserInfo.checkPin = res.data.data.other.check_pin;
            this.$store.state.UserInfo.SecurityLevel =
              res.data.data.user.security_level;

            let DilingPoint = res.data.data.account[0].quantity;
            this.$store.state.UserPoint.DilingPoint = this.priceToString(
              Math.round(DilingPoint)
            );
            this.$store.state.UserPoint.OriginalPoint = Math.round(DilingPoint);
            this.$store.state.UserPoint.CoinPointID =
              res.data.data.account[1].id;
            let CointPoint = res.data.data.account[1].quantity;
            this.$store.state.UserPoint.CointPoint = this.priceToString(
              Math.round(CointPoint)
            );
            this.$store.state.UserPoint.OriginalCoinPoint = Math.round(
              CointPoint
            );
            this.$store.state.UserInfo.isLoginIn = true;
          })
          .catch((err) => {
            console.log(err.response.data);
            if (
              err.response.data.resultCode == "api.error.credentials_is_invalid"
            ) {
              this.$store.state.UserInfo.refresh = true;
              if (this.$store.state.UserInfo.refresh) {
                const LoginData = window.localStorage.getItem("auth");
                auth.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${LoginData}`;
                let authData = new FormData();
                authData.append("client_id", process.env.VUE_APP_CLIENT_ID);
                authData.append(
                  "client_secret",
                  process.env.VUE_APP_ENCRYPT_KEY
                );
                authData.append(
                  "grant_type",
                  process.env.VUE_APP_REFRESH_GRANT_TYPE
                );
                authData.append(
                  "refresh_token",
                  window.localStorage.getItem("refresh")
                );
                authData.append("scope", "read write");
                auth
                  .post("/oauth/token", authData)
                  .then((res) => {
                    window.localStorage.setItem("auth", res.data.access_token);
                    window.localStorage.setItem(
                      "refresh",
                      res.data.refresh_token
                    );
                    setTimeout(() => {
                      location.reload();
                    }, 1000);
                  })
                  .catch((err) => {
                    if (err.response.data.error == "invalid_token") {
                      alert("세션이 만료되었습니다. 다시 로그인 해주십시오.");
                      document.location.replace(
                        `${process.env.VUE_APP_AUTH_API_BASE}/oauth/authorize?client_id=cashlink&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&response_type=code`
                      );
                    }
                  });
              }
            }
          });
      } else {
        const auth = window.localStorage.getItem("auth");
        if (auth) {
          const LoginData = auth;
          client.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${LoginData}`;
          client
            .get("/api/users/me")
            .catch((err) => {
              console.log(err.response.data);
              if (
                err.response.data.resultCode ==
                "api.error.credentials_is_invalid"
              ) {
                alert("인증이 유효하지 않습니다.");
                document.location.replace(
                  `${process.env.VUE_APP_AUTH_API_BASE}/oauth/authorize?client_id=cashlink&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&response_type=code`
                );
              }
            })
            .then((res) => {
              this.$store.state.UserInfo.Name = res.data.data.user.name;
              this.$store.state.UserInfo.UserForNum = res.data.data.user.id;
              this.$store.state.UserPoint.DilingID =
                res.data.data.account[0].id;
              this.$store.state.UserInfo.UserForNum =
                res.data.data.account[0].id;
              this.$store.state.UserInfo.checkPin =
                res.data.data.other.check_pin;
              this.$store.state.UserInfo.SecurityLevel =
                res.data.data.user.security_level;

              let DilingPoint = res.data.data.account[0].quantity;
              this.$store.state.UserPoint.DilingPoint = this.priceToString(
                Math.round(DilingPoint)
              );
              this.$store.state.UserPoint.OriginalPoint = Math.round(
                DilingPoint
              );
              this.$store.state.UserPoint.CoinPointID =
                res.data.data.account[1].id;
              let CointPoint = res.data.data.account[1].quantity;
              this.$store.state.UserPoint.CointPoint = this.priceToString(
                Math.round(CointPoint)
              );
              this.$store.state.UserPoint.OriginalCoinPoint = Math.round(
                CointPoint
              );
              this.$store.state.UserInfo.isLoginIn = true;
            });
        } else {
          document.location.replace(
            `${process.env.VUE_APP_AUTH_API_BASE}/oauth/authorize?client_id=cashlink&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&response_type=code`
          );
        }
      }
    }, 1000);

    // ================
    // ===  브라우저 검증
    // ================
    const agent = navigator.userAgent.toLowerCase();
    if (
      (navigator.appName === "Netscape" &&
        navigator.userAgent.search("Trident") !== -1) ||
      agent.indexOf("msie") !== -1
    ) {
      alert(
        "Microsoft Internet Explore를 지원하지 않습니다.\nChrome, Edge, Safari, Firefox 등의 브라우저를 이용해주세요."
      );
    }
    // bus.$on("start:spinner", this.startSpinner);
    // bus.$on("end:spinner", this.endSpinner);
  },
  data() {
    return {
      Mhome: "Color2233 ClickPointer",
      MBuyLog: "ClickPointer",
      MBuy: "ClickPointer",
      mMyPage: "ClickPointer",
      LoadingStatus: false,
    };
  },
  methods: {
    Alrams() {
      this.$router.push("/Alram").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    startSpinner() {
      this.LoadingStatus = true;
    },
    endSpinner() {
      this.LoadingStatus = false;
    },
    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    MhomeRouter() {
      this.Mhome = "Color2233 ClickPointer";
      this.MBuyLog = "ClickPointer";
      this.MBuy = " ClickPointer";
      this.mMyPage = " ClickPointer";
      this.$router.push("/").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    MBuyLogRouter() {
      this.Mhome = " ClickPointer";
      this.MBuyLog = "Color2233 ClickPointer";
      this.MBuy = " ClickPointer";
      this.mMyPage = " ClickPointer";
      this.$router.push("/BuyLog/DealSell").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    MBuyRouter() {
      this.Mhome = " ClickPointer";
      this.MBuyLog = " ClickPointer";
      this.MBuy = "Color2233 ClickPointer";
      this.mMyPage = " ClickPointer";
      this.$router.push("/deal").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    mMyPageRouter() {
      this.Mhome = " ClickPointer";
      this.MBuyLog = " ClickPointer";
      this.MBuy = " ClickPointer";
      this.mMyPage = "Color2233 ClickPointer";
      this.$router.push("/myPage").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    BuyDLFuncCancel() {
      this.$store.state.dealPopUp.BuyWaring = "d-none";
      this.$store.state.dealPopUp.BuyDLExplain.DLBuyCount = "";
      this.$store.state.dealPopUp.BuyDLExplain.DLCountPer = "";
      this.$store.state.dealPopUp.BuyDLExplain.Price = "";
      this.$store.state.dealPopUp.BuyDLExplain.UserLaw = false;
    },
    BuyDLFuncAllow() {
      if (!this.$store.state.dealPopUp.BuyDLExplain.UserLaw) {
        alert("개인정보 제 3자 제공 및 위탁 동의에 동의해주십시오.");
      } else {
        client
          .post(`/api/markets/${this.$store.state.dealPopUp.BuyID}/buy`)
          .then(() => {
            this.$store.state.dealPopUp.DLBuySuccess = "DLBuySuccess";
            this.$store.state.dealPopUp.BuyWaringBox = "d-none";
          })
          .catch((err) => {
            if (
              err.response.data.resultCode === "api.error.already_paid_item"
            ) {
              this.$store.state.dealPopUp.DLBuySuccess = "d-none";
              alert(
                "이미 판매가 완료된 상품입니다.\n다른 상품을 선택해주십시오."
              );
              this.$store.state.dealPopUp.BuyWaring = "d-none";
            } else if (
              err.response.data.resultCode === "api.error.cannot_be_purchase"
            ) {
              alert(err.response.data.resultMsg);
              this.$store.state.dealPopUp.BuyWaring = "d-none";
              this.$store.state.dealPopUp.DLBuySuccess = "d-none";
            } else if (
              err.response.data.resultCode === "api.error.already_in_progress"
            ) {
              alert(err.response.data.resultMsg);
              this.$store.state.dealPopUp.BuyWaring = "d-none";
              this.$store.state.dealPopUp.DLBuySuccess = "d-none";
            }
          });
      }
    },
    BuyDLFuncAllowNotify() {
      this.$store.state.dealPopUp.BuyWaring = "d-none";
      this.$store.state.dealPopUp.DLBuySuccess = "d-none";
      this.$store.state.dealPopUp.BuyDLExplain.DLBuyCount = "";
      this.$store.state.dealPopUp.BuyDLExplain.DLCountPer = "";
      this.$store.state.dealPopUp.BuyDLExplain.Price = "";
      this.$store.state.dealPopUp.BuyDLExplain.UserLaw = false;
      location.reload();
    },
  },
};
</script>

<style>
body {
  min-width: 375px;
}
* {
  font-family: "Noto Sans KR", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: ease 0.5s;
}
input:focus {
  outline: none;
}
select {
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  background: url("./img/mini-open.png") 98% center / 12px no-repeat;
  font-size: 14px;
  padding-left: 10px !important;
}
select:focus {
  outline: none;
}
.mainSize {
  width: 100%;
  height: 100%;
}
.navBox {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: white;
  position: fixed;
  z-index: 2;
}
.navSize {
  width: 800px;
  height: 70px;
  position: fixed;
  background-color: white;
}
.navi {
  height: 100%;
  display: flex;
  align-items: center;
}
.navLogo {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
}
.navRouter {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #aaa;
  font-weight: 400;
}
.navNotify {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.navBoxS {
  display: none;
}
.mobileMenu {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 10px;
  font-weight: 400;
  color: #888;
}
.sample {
  width: 100%;
  height: 2000px;
  background-color: #858585;
}
.Color2233 {
  color: #2233aa !important;
}
.ClickPointer {
  width: 25%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 100px;
}
.MainIconSize {
  width: 25px;
}
.routerViewSize {
  position: relative;
  top: 70px;
  margin-bottom: 1rem;
  background: #eee;
  min-height: 100%;
}
.o-none {
  opacity: 0;
}
.o-yes {
  opacity: 1;
}
button:focus {
  outline: none;
}
.myPage {
  z-index: 0 !important;
}
@media screen and (max-width: 900px) {
  .AlramNav {
    width: 100%;
    height: 52px;
    padding: 14px 16px;
    display: flex !important;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  }
  .sample {
    width: 100%;
    height: 2000px;
    background-color: white;
  }
  .routerViewSize {
    position: relative;
    top: 0px;
  }
  .navBox {
    display: none;
  }
  .navBoxS {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: flex-end;
    position: relative;
  }
  .navBarM {
    width: 100%;
    height: 52px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 4px;
    position: fixed;
    z-index: 3;
    bottom: 0;
    left: 0;
  }
}
</style>
