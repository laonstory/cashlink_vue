<template>
  <div>
    <div class="myPageSize">
      <router-view></router-view>
      <div class="MyPageBox" style="padding: 20px 20px; border-radius: 10px;">
        <div v-if="$store.state.UserInfo.isLoginIn">
          <div class="MyNameBox" @click.prevent="MyPageSet">
            <div>
              <div class="d-flex MyTitle">
                <span class="MyName">
                  {{ $store.state.UserInfo.Name }}
                </span>
                <span>님</span>
              </div>
              <div>
                <span>반갑습니다.</span>
              </div>
            </div>
            <div>
              <img src="../../img/next.png" class="nextPng" />
            </div>
          </div>
          <div class="SecurityLe">
            <span>보안 {{ $store.state.UserInfo.SecurityLevel }} 등급</span>
          </div>
          <div>
            <span class="myCert">본인인증 X</span>
            <span class="myCert">계좌인증 X</span>
          </div>
          <div class="mt-3 myAct">
            <div class="myActTitle">
              <span>나의 활동</span>
            </div>
            <div class="myActingBox">
              <div class="myActing">
                <span>{{ this.sell }}</span>
                <span>판매중</span>
              </div>
              <div class="longStick" />
              <div class="myActing">
                <span>{{ this.buy }}</span>
                <span>구매중</span>
              </div>
              <div class="longStick" />
              <div class="myActing">
                <span>{{ this.like }}</span>
                <span>관심상품</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="MyTitle">
            <span class="MyName">
              로그인
            </span>
            <span>을 해주세요.</span>
          </div>
          <div class="mt-5 LoginBtn">
            <button class="UserLoginBtn">로그인</button>
            <button class="UserLoginBtn">회원가입</button>
          </div>
        </div>
        <div class="SameMenuBox mt-5">
          <div class="noticeMy" @click.prevent="noticeBtn">
            <div>
              <img src="../../img/cashlink-icon.png" class="cashlinkFavico" />
              <span class="ml-2">캐시링크 소개</span>
            </div>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="noticeMy" @click.prevent="noticeBtn">
            <div>
              <img src="../../img/cashlink-icon.png" class="cashlinkFavico" />
              <span class="ml-2">캐시쿡 바로가기</span>
            </div>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="CLPMy" @click.prevent="noticeBtn">
            <div>
              <img src="../../img/cl_point.png" class="clplogo" />
              <span class="ml-2">CLP관리</span>
            </div>

            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="CustomerNum mt-3" @click.prevent="tellher">
            <span style="color: #888">고객센터</span>
            <span class="ml-3">1500-1500</span>
          </div>
          <div class="noticeMy" @click.prevent="noticeBtn">
            <span>공지사항</span>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="faqMy" @click.prevent="faqBtn">
            <span>FAQ</span>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="serviceMy" @click.prevent="ServiceContact">
            <span>서비스 문의</span>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="userLawMy" @click.prevent="termsInfo">
            <span>약관 및 정책</span>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
          <div class="userLawMy" @click.prevent="companyInfo">
            <span>사업자정보 보러가기</span>
            <span>
              <img src="../../img/small-arrow.png" alt="" class="right-Arrow" />
            </span>
          </div>
        </div>
      </div>
      <div class="navBoxS">
        <div class="navBarM">
          <div class="mobileMenu">
            <span :class="Mhome" @click.prevent="MhomeRouter">
              <img src="../../img/home.png" alt="" :class="MhomeNone" />
              <img src="../../img/home-color.png" alt="" :class="MhomeColor" />
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
</template>

<script>
import client from "../../auth/client";
export default {
  beforeMount() {
    const LoginData = window.localStorage.getItem("auth");
    client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
    client.get("/api/users/me/market").then((res) => {
      this.buy = res.data.data.buy;
      this.like = res.data.data.like;
      this.sell = res.data.data.sell;
    });
  },
  data() {
    return {
      buy: "",
      like: "",
      sell: "",
      Mhome: "ClickPointer",
      MhomeNone: "MainIconSize",
      MhomeColor: "d-none",

      MBuyLog: "ClickPointer",
      MBuyLogNone: "MainIconSize",
      MBuyLogColor: "d-none",

      MBuy: "ClickPointer",
      MBuyNone: "MainIconSize",
      MbuyColor: "d-none",

      mMyPage: "Color2233 ClickPointer",
      mMyPageNone: "d-none",
      mMyPageColor: "MainIconSize",
    };
  },
  methods: {
    faqBtn() {
      this.$router.push("/faq");
    },
    noticeBtn() {
      this.$router.push("/notice");
    },
    tellher() {
      document.location.href = "tel:1500-1500";
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
    MyPageSet() {
      this.$router.push("/myPage/MyInfoChange");
    },
    companyInfo() {
      this.$router.push("/InfoCompany");
    },
    ServiceContact() {
      this.$router.push("/CenterService");
    },
    termsInfo() {
      this.$router.push("/terms");
    },
  },
};
</script>

<style>
.myPageSize {
  min-height: calc(100vh - 53px);
  padding: 27px 18px 0px;
}
.MyNameBox {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.MyPageBox {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 25px;
  background: white;
}
.MyName {
  color: #2169ff;
  font-weight: 600;
}
.MyTitle {
  font-size: 20px;
  font-weight: 600;
}
.LoginBtn {
  width: 43%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}
.UserLoginBtn {
  width: 100%;
  height: 30px;
  background-color: #eee;
  color: #444;
  font-size: 14px;
  border: none;
  border-radius: 5px;
}
.SameMenuBox {
  font-size: 15px;
}
.CustomerNum {
  width: 100%;
  height: 38px;
  display: flex;
  font-weight: 600;
  cursor: pointer;
}
.right-Arrow {
  width: 24px;
  height: 24px;
}
.CustomerNum > span:nth-of-type(2) {
  color: #2169ff;
}
.noticeMy {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #888;
  font-weight: 400;
  font-size: 14px;
}
.CLPMy {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #2269ff;
  font-weight: 500;
  font-size: 16px;
}
.faqMy {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #888;
  font-weight: 400;
  font-size: 14px;
}
.serviceMy {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #888;
  font-weight: 400;
  font-size: 14px;
}
.userLawMy {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #888;
  font-weight: 400;
  font-size: 14px;
}
.myAct {
  width: 100%;
  height: 101px;
  border-radius: 5px;
  background-color: #2233aa;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 6px;
  padding: 0.6rem;
}
.myActTitle {
  width: 100%;
  height: 20%;
  font-size: 14px;
  font-weight: 400;
  color: white;
}
.longStick {
  width: 1px;
  height: 32px;
  background: white;
  opacity: 0.4;
}
.myActing {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
.myActing > span:nth-of-type(1) {
  font-size: 28px;
  font-weight: 500;
}
.myActing > span:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
}
.myActingBox {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.SecurityLe {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #2233aa;
  font-weight: 500;
  margin-top: 15px;
}
.nextPng {
  width: 18px;
}
.myCert {
  margin-right: 12px;
  font-size: 12px;
  color: #888;
  line-height: 16px;
}
.cashlinkFavico {
  width: 30px;
  height: 30px;
}
.clplogo {
  width: 45px;
  height: 45px;
}

@media screen and (max-width: 900px) {
  .MyPageBox {
    width: 100%;
    margin-top: 1.5rem;
    margin: 0 auto;
    padding: 0px 0px;
    background: white;
  }
  .myPageSize {
    min-height: calc(100vh - 53px);
    padding: 0px 0px 0px;
  }
  .routerViewSize {
    background: white;
  }
}
</style>
