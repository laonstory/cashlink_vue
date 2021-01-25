import Vue from "vue";
import Router from "vue-router";
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
      children: [
        {
          path: "MyInfoChange",
          component: MyInfoChange,
          meta: {
            title: "CashLink Info Change",
          },
          children: [
            {
              path: "6pin",
              component: MyPinChange,
              meta: {
                title: "CashLink Pin Change",
              },
            },
            {
              path: "6pinMake",
              component: MyPinMake,
              meta: {
                title: "CashLink Pin",
              },
            },
          ],
        },
      ],
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