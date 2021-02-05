<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="border-radius: 10px;">
        <div class="myPage">
          <router-view></router-view>
          <div class="AlramNav">
            <span>
              <button class="prevBtn" @click.prevent="prevBtn">
                <img src="../../img/prev.png" alt="" class="prevIcon" />
              </button>
            </span>
            <span class="AlramTitle">회원정보 수정</span>
            <span></span>
          </div>
          <div class="mt-3 alramsBox">
            <div class="w-100 h-100">
              <div class="MyNameBox">
                <div>
                  <div class="d-flex MyTitle">
                    <span class="MyName">
                      {{ $store.state.UserInfo.Name }}
                    </span>
                    <span>님</span>
                  </div>
                  <div>
                    <span style="font-size: 14px; color: #2169ff;"
                      >보안등급
                      {{ $store.state.UserInfo.SecurityLevel }} 등급</span
                    >
                  </div>
                </div>
                <div>
                  <button class="logout" @click.prevent="logOut">
                    로그아웃
                  </button>
                </div>
              </div>
              <div class="MyNameBox mt-4" @click.prevent="passwordChange">
                <div>
                  <div class="d-flex MyTitleS">
                    <span>비밀번호 수정</span>
                  </div>
                </div>
                <div>
                  <img src="../../img/next.png" class="nextPng" />
                </div>
              </div>
              <div
                class="MyNameBox mt-4"
                v-if="!$store.state.UserInfo.checkPin"
                @click.prevent="MakePin"
              >
                <div>
                  <div class="d-flex MyTitleS">
                    <span>핀 암호 생성</span>
                  </div>
                </div>
                <div>
                  <img src="../../img/next.png" class="nextPng" />
                </div>
              </div>
              <div
                class="MyNameBox mt-4"
                v-else-if="$store.state.UserInfo.checkPin"
                @click.prevent="Pin"
              >
                <div>
                  <div class="d-flex MyTitleS">
                    <span>핀 암호 수정</span>
                  </div>
                </div>
                <div>
                  <img src="../../img/next.png" class="nextPng" />
                </div>
              </div>
              <div class="MyNameBox mt-4" @click.prevent="meProof">
                <div class="w-100">
                  <div class="d-flex MyTitle">
                    <small style="font-size: 12px; color: #2233aa">
                      본인인증
                    </small>
                  </div>
                  <div
                    class="w-100 d-flex"
                    style="justify-content: space-between;"
                  >
                    <span style="font-size: 16px; font-weight: 400;">
                      인증이 필요합니다.
                    </span>
                    <div>
                      <button class="logout">인증하기</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="MyNameBox mt-4" @click.prevent="bankProof">
                <div class="w-100">
                  <div class="d-flex MyTitle">
                    <small style="font-size: 12px; color: #2233aa">
                      계좌인증
                    </small>
                  </div>
                  <div
                    class="w-100 d-flex"
                    style="justify-content: space-between;"
                  >
                    <span style="font-size: 16px; font-weight: 400;">
                      인증이 필요합니다.
                    </span>
                    <div>
                      <button class="logout">인증하기</button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="AccountRemove mt-4"
                @click.prevent="accountRemoveRouter"
              >
                <div class="w-100">
                  <div class="accountRemoveBtn">
                    <span>회원을 탈퇴하시겠습니까?</span>
                  </div>
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
export default {
  beforeMount() {
    const LoginData = window.localStorage.getItem("auth");
    client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
    client
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
        this.$store.state.UserInfo.checkPin = res.data.data.other.check_pin;
      });
  },
  data() {
    return {
      PinChk: false,
    };
  },
  methods: {
    prevBtn() {
      this.$router.push("/myPage");
    },
    logOut() {
      let res = confirm("로그아웃 하시겠어요?");
      if (res) {
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("refresh");
        this.$router.push("/");
        window.location.href = `${process.env.VUE_APP_AUTH_LOGOUT_BASE}`;
      }
    },
    Pin() {
      this.$router.push("/6pin");
    },
    MakePin() {
      this.$router.push("/6pinMake");
    },
    passwordChange() {
      alert("준비중인 기능입니다.");
    },
    meProof() {
      alert("준비중인 기능입니다.");
    },
    bankProof() {
      alert("준비중인 기능입니다.");
    },
    accountRemoveRouter() {
      alert("준비중인 기능입니다.");
    },
  },
};
</script>

<style>
.myPage {
  position: fixed;
  background: white;
  z-index: 5;
  top: 0;
}
.MyTitleS {
  font-size: 16px;
  font-weight: 600;
}
.logout {
  padding: 5px;
  border: none;
  background-color: #ddd;
  color: #444;
  font-size: 12px;
  border-radius: 5px;
}
.AlramNav {
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.prevIcon {
  width: 24px;
}
.AlramTitle {
  margin-right: 20px;
  color: rgb(51, 51, 51);
}
.prevBtn {
  border: none;
  background-color: transparent;
}
.alramsBox {
  padding: 14px 16px;
}
.alramsBoxTitle {
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #2233aa;
}
.notingAlrams {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-weight: 400;
}
.accountRemoveBtn {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 300;
  color: #888;
  cursor: pointer;
}
</style>
