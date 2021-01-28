import Vue from "vue";
import Router from "vue-router";
// import bus from "../utils/bus";
// import { store } from "../store/store";
import home from "@/components/MainPages/home.vue";
import deal from "@/components/MainPages/deal.vue";
import dealLog from "@/components/MainPages/dealLog/dealLog.vue";
import Alram from "@/components/SubPages/Alram.vue";
import MyPage from "@/components/MainPages/myPage.vue";
import Notice from "@/components/SubPages/notice.vue";
import faq from "@/components/SubPages/faq.vue";
import callback from "@/components/UsersContainer/callback";
import Dlsend from "@/components/SubPages/DLsend";
import MyInfoChange from "@/components/MainPages/changeMyInfo";
import MyPinChange from "@/components/SubPages/pin/6pin";
import MyPinMake from "@/components/SubPages/pin/6pinMake";
import dealApply from "@/components/SubPages/deal/dealApply";
import companyInfo from "@/components/SubPages/companyInfo";
import serviceFaq from "@/components/SubPages/serviceFaq";
import terms from "@/components/SubPages/term";
import ServiceTerms from "@/components/SubPages/terms/serviceTerms";
import moneyTerms from "@/components/SubPages/terms/moneyTerms";
import samja from "@/components/SubPages/terms/samja";
import UserInfoLaw from "@/components/SubPages/terms/UserInfoLaw";
import UserInfoPut from "@/components/SubPages/terms/UserInfoPut";
import PointCharge from "@/components/SubPages/pointCharge";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        title: "CashLink Home",
      },
      // beforeEnter: (to, from, next) => {
      //   bus.$emit("start:spinner");
      //   store
      //     .dispatch("FETCH_LIST", to.name)
      //     .then(() => next())
      //     .catch((err) => console.log(err));
      // },
    },
    {
      path: "/deal",
      name: "deal",
      component: deal,
      meta: {
        title: "CashLink Deal",
      },
      children: [
        {
          path: "apply",
          component: dealApply,
          meta: {
            title: "CashLink Deal Apply",
          },
        },
      ],
    },
    {
      path: "/BuyLog",
      name: "BuyLog",
      component: dealLog,
      meta: {
        title: "CashLink DealLog",
      },
    },
    {
      path: "/Alram",
      name: "Alram",
      component: Alram,
      meta: {
        title: "CashLink Alrams",
      },
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPage,
      meta: {
        title: "CashLink MyPage",
      },
    },
    {
      path: "/MyInfoChange",
      component: MyInfoChange,
      meta: {
        title: "CashLink Info Change",
      },
    },
    {
      path: "/6pin",
      component: MyPinChange,
      meta: {
        title: "CashLink Pin Change",
      },
    },
    {
      path: "/6pinMake",
      component: MyPinMake,
      meta: {
        title: "CashLink Pin",
      },
    },
    {
      path: "/notice",
      name: "notice",
      component: Notice,
      meta: {
        title: "CashLink Notice",
      },
    },
    {
      path: "/faq",
      name: "faq",
      component: faq,
      meta: {
        title: "CashLink Notice",
      },
    },
    {
      path: "/callback",
      name: "callback",
      component: callback,
      meta: {
        title: "CashLink Login",
      },
    },
    {
      path: "/DLSend",
      name: "DLSend",
      component: Dlsend,
      meta: {
        title: "CashLink SendDL",
      },
    },
    {
      path: "/InfoCompany",
      name: "InfoCompany",
      component: companyInfo,
      meta: {
        title: "CashLink Company Info",
      },
    },
    {
      path: "/CenterService",
      name: "CenterService",
      component: serviceFaq,
      meta: {
        title: "CashLink Service Contact",
      },
    },
    {
      path: "/terms",
      name: "terms",
      component: terms,
      meta: {
        title: "CashLink Terms",
      },
      children: [
        {
          path: "ServiceTerms",
          component: ServiceTerms,
          meta: {
            title: "CashLink ServiceTerms",
          },
        },
        {
          path: "moneyTerms",
          component: moneyTerms,
          meta: {
            title: "CashLink moneyTerms",
          },
        },
        {
          path: "samja",
          component: samja,
          meta: {
            title: "CashLink UserInfoLaw",
          },
        },
        {
          path: "UserInfoLaw",
          component: UserInfoLaw,
          meta: {
            title: "CashLink UserInfoLaw",
          },
        },
        {
          path: "UserInfoPut",
          component: UserInfoPut,
          meta: {
            title: "CashLink UserInfoLaw",
          },
        },
      ],
    },
    {
      path: "/pointCharge",
      name: "/pointCharge",
      component: PointCharge,
      meta: {
        title: "CashLink PointCharge",
      },
    },
  ],
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
