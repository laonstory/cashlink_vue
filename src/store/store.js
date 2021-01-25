import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    UserInfo: {
      UserForNum: "2Z4BM1QNR",
      Name: "",
      UserID: "",
      access_token: "",
      token_type: "",
      refresh_token: "",
      expires_in: Number,
      scope: "",
      jti: "",
      isLoginIn: false,
      SecurityLevel: 0,
      checkPin: false,
    },
    UserPoint: {
      DilingID: "",
      DilingPoint: "",
      OriginalPoint: "",
      CoinPointID: "",
      CoinPoint: "",
      OriginalCoinPoint: "",
    },
    location: {
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
    },
    dealPopUp: {
      BuyWaring: "d-none",
      BuyWaringBox: "BuyWaringBox",
      DLBuySuccess: "d-none",
      BuyDLExplain: {
        DLBuyCount: "",
        DLCountPer: "",
        Price: "",
        tax: "10",
        UserLaw: false,
      },
    },
    dealLogPopup: "d-none",
    popupTitle: "신청취소 안내",
    // prettier-ignore
    popupMsg:"구매신청취소는<br>1일 1회만 가능하며, 이후에는<br>신청취소가 불가합니다.",
    popupStrong: "취소하시겠습니까?",
    popupblackStrong: "",
    code: "",
  },
  mutations: {
    GetUserToken(state, payload) {
      state.access_token = "cashlink";
      state.token_type = payload;
      state.refresh_token = payload;
      state.expires_in = payload;
      state.scope = payload;
      state.jti = payload;
    },
  },
});
