<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="background: transparent;">
        <div class="homeBody">
          <modals
            :title="$store.state.popupTitle"
            :message="$store.state.popupMsg"
            :code="$store.state.code"
            :Graystrong="$store.state.popupStrong"
            :blackStrong="$store.state.popupblackStrong"
            :class="$store.state.dealLogPopup"
          />
          <div class="homeBodyBox1">
            <div class="MNav">
              <div>
                <img src="../../img/logo.png" alt="" class="logo" />
                <!-- <span>CashLink</span> -->
              </div>
              <div>
                <img
                  src="../../img/notice-new.png"
                  alt=""
                  class="notice"
                  @click.prevent="Alrams"
                />
                <!-- <span>알림</span> -->
              </div>
            </div>
            <Swiper class="swiper" :options="swiperOption">
              <Swiper-slide
                v-for="(SlideList, index) in Slidelist"
                :key="index"
                :class="SlideList.class"
                @click="link(SlideList.link)"
              >
              </Swiper-slide>
              <div
                class="swiper-pagination swiper-pagination-white"
                slot="pagination"
              ></div>
              <div
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div>
              <div
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
            </Swiper>
            <div class="mt-3 myPointApp">
              <div class="PointBoxApp">
                <div class="PointStatusApp">
                  <small style="font-size: 14px;">내 포인트</small>
                  <span style="font-size: 20px; font-weight: 600;"
                    >{{ $store.state.UserPoint.CointPoint }}CLP</span
                  >
                </div>
                <div class="chargeBox" @click.prevent="pointCharge">
                  <span>충전하기 ></span>
                </div>
              </div>
            </div>
            <div class="mt-3 MyDl">
              <div class="MydlBox">
                <div class="DLTitle">
                  <img src="../../img/dl_point.png" class="dlCoinHomeImg" />
                  <div class="DLTitleInner">
                    <span
                      style="font-weight: 600; font-size: 14px; color: #2169FF"
                    >
                      디엘(DL)
                    </span>
                    <small style="color: #858585">{{
                      $store.state.UserPoint.DilingID
                    }}</small>
                  </div>
                </div>
                <div class="DLCoin">
                  <div class="d-flex" style="color: #2169FF;">
                    <p style="font-weight: 500; font-size: 35px;">
                      {{ $store.state.UserPoint.DilingPoint }}
                    </p>
                    <small class="DLStart ml-1">DL</small>
                  </div>
                </div>
                <div class="SendDL">
                  <div
                    class="d-flex w-100"
                    style="justify-content: space-around;"
                  >
                    <small
                      style="color: #858585; cursor: pointer;"
                      @click.prevent="DLGiveMe"
                    >
                      <img
                        src="../../img/export.png"
                        class="dlCoinHomeImgS mr-2"
                      />
                      딜링받기
                    </small>
                    <small
                      style="color: #858585; cursor: pointer;"
                      @click="DLSEND"
                    >
                      <img
                        src="../../img/import.png"
                        class="dlCoinHomeImgS mr-2"
                      />
                      딜링보내기
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 plusEtc" @click.prevent="preparingFunc">
              +
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
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "../../../node_modules/swiper/css/swiper.css";
import modals from "../popup/modal";
export default {
  components: {
    modals,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      clp: "0",
      Mhome: "Color2233 ClickPointer",
      MhomeNone: "d-none",
      MhomeColor: "MainIconSize",

      MBuyLog: "ClickPointer",
      MBuyLogNone: "MainIconSize",
      MBuyLogColor: "d-none",

      MBuy: "ClickPointer",
      MBuyNone: "MainIconSize",
      MbuyColor: "d-none",

      mMyPage: "ClickPointer",
      mMyPageNone: "MainIconSize",
      mMyPageColor: "d-none",
      Slidelist: [
        {
          class: "slide-1",
          link: "https://youtu.be/qKtI7dmsIUk",
        },
        {
          class: "slide-2",
          link: "https://youtu.be/Skzr92mw80U",
        },
        {
          class: "slide-3",
          link: "https://youtu.be/ScH-eMK8VO4",
        },
        {
          class: "slide-4",
          link: "https://youtu.be/qKtI7dmsIUk",
        },
        {
          class: "slide-5",
          link: "https://youtu.be/Skzr92mw80U",
        },
      ],
      swiperOption: {
        spaceBetween: 0,
        effect: "fade",
        loop: true,
        autoplay: {
          delay: 5000,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    DLGiveMe() {
      this.$store.state.dealLogPopup = "";
      this.$store.state.popupTitle = "딜링(DL) 주소보내기";
      this.$store.state.popupMsg = "샘플데이터입니다.";
      this.$store.state.popupStrong = this.$store.state.UserPoint.DilingID;
      this.$store.state.code = "GiveMEDL";
    },
    DLSEND() {
      this.$router.push("/DLSend");
    },
    preparingFunc() {
      alert("준비중인 기능입니다.");
    },
    changeIndex(index) {
      this.sliderValue = index;
    },
    MhomeRouter() {
      this.$router.push("/").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    MBuyLogRouter() {
      this.$router.push("/BuyLog/DealSell").catch((err) => {
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
    Alrams() {
      this.$router.push("/Alram").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          console.log("중첩");
        }
      });
    },
    pointCharge() {
      this.$router.push("/pointCharge");
    },
    link(link) {
      window.open(link);
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
.PointStatusApp {
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
.MNav {
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
.homeBodyBox1 {
  max-width: 800px;
  width: 100%;
}
.slide {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
}
.slider {
  height: 160px !important;
}
.sample2 {
  width: 100%;
  height: 100%;
  background-color: #858585;
  position: absolute;
}
.myPointApp {
  width: 100%;
  height: 80px;
  background-color: #2169ff;
  border-radius: 5px;
}
.PointBoxApp {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.MNav {
  display: none;
}
.MyDl {
  width: 100%;
  height: 164px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 20px;
  border-radius: 5px;
}
.MydlBox {
  padding: 1rem;
  height: 100%;
  margin: 0 auto;
}
.DLTitle {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
}
.DLTitleInner {
  display: flex;
  flex-direction: column;
  margin-left: 0.6rem;
  height: 100%;
  justify-content: center;
}
h4 {
  margin-bottom: 0;
}
.DLCoin {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-end;
  color: #2233aa;
}
p {
  margin-bottom: 0;
}
.DLStart {
  height: 65%;
  display: flex;
  align-items: flex-end;
}
.SendDL {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plusEtc {
  width: 100%;
  height: 120px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #aaa;
  cursor: pointer;
}
.notice {
  width: 25px;
}
.dlCoinHomeImg {
  width: 35px;
}
.dlCoinHomeImgS {
  width: 25px;
}
.swiper {
  height: 360px;
  border-radius: 5px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
}
.slide-1 {
  background: url(../../img/slide/cashcook1.png);
  background-position: 50% center;
  background-size: cover;
}
.slide-2 {
  background: url(../../img/slide/cashcook2.png);
  background-position: 50% center;
  background-size: cover;
}
.slide-3 {
  background: url(../../img/slide/cashcook3.png);
  background-position: 50% center;
  background-size: cover;
}
.slide-4 {
  background: url(../../img/slide/cashcook4.png);
  background-position: 50% center;
  background-size: cover;
}
.slide-5 {
  background: url(../../img/slide/cashcook5.png);
  background-position: 50% center;
  background-size: cover;
}
@media screen and (max-width: 900px) {
  .MNav {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .homeBodyBox1 {
    max-width: 720px;
    width: 100%;
    padding: 0px 16px;
  }
  .swiper {
    height: 275px;
  }
}
</style>
