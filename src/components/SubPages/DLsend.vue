<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="border-radius: 10px;">
        <div class="w-100 h-100">
          <div class="AlramNav">
            <span>
              <button class="prevBtn" @click.prevent="prevBtn">
                <img src="../../img/prev.png" alt="" class="prevIcon" />
              </button>
            </span>
            <span class="AlramTitle">전송하기</span>
            <span></span>
          </div>
          <div class="mt-3 alramsBox">
            <div>
              <span class="alramsBoxTitle1">받는사람</span>
              <div class="DlsendLine mt-1" />
              <div>
                <div class="mt-2">
                  <select
                    v-model="searchUser"
                    class="DLSendSel mr-2"
                    @change.prevent="checkSel"
                  >
                    <option value="PHONE">연락처</option>
                    <option value="USERNAME">ID</option>
                    <option value="custom">직접입력</option>
                  </select>
                  <input
                    type="text"
                    :class="SearchInputDL"
                    v-model="SearchData"
                    :readOnly="readOnlyText1"
                  />
                  <button type="submit" class="SearchIconOut">
                    <img
                      src="../../img/search.png"
                      alt=""
                      class="SearchIconInner"
                      @click.prevent="SearchUser"
                    />
                  </button>
                </div>
                <form>
                  <input
                    type="text"
                    v-model="SearchModel"
                    :class="SearchDatainput"
                    :readOnly="readOnlyText2"
                  />
                </form>
              </div>
            </div>
            <div class="mt-4">
              <span class="alramsBoxTitle1">디엘(DL)</span>
              <div class="DlsendLine mt-1" />
              <div>
                <form>
                  <div class="mt-2 DLSendPoint">
                    <span>보유 수량</span>
                    <span>{{ $store.state.UserPoint.DilingPoint }} DL</span>
                    <span>전송 수량</span>
                    <input type="text" v-model="DLsendCount" />
                  </div>
                  <div class="DLsendBtnBox mt-3">
                    <button class="DLsendBtn BackGroundGray" type="reset">
                      초기화
                    </button>
                    <button class="DLsendBtn BackGroundBlue" type="submit">
                      다음
                    </button>
                  </div>
                </form>
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
    this.checkSel();
  },
  data() {
    return {
      searchUser: "PHONE",
      SearchData: "",
      SearchModel: "",
      SearchInputDL: "SearchInputDL",
      SearchDatainput: "SearchDataInput mt-2",
      readOnlyText1: false,
      readOnlyText2: true,
      DLsendCount: "",
    };
  },
  methods: {
    checkSel() {
      if (this.searchUser == "custom") {
        this.SearchInputDL = "SearchInputDL backGroundEEE";
        this.SearchDatainput = "SearchDataInput mt-2";
        this.readOnlyText1 = true;
        this.readOnlyText2 = false;
      } else {
        this.SearchDatainput = "SearchDataInput mt-2 backGroundEEE";
        this.SearchInputDL = "SearchInputDL";
        this.readOnlyText1 = false;
        this.readOnlyText2 = true;
      }
    },
    prevBtn() {
      this.$router.go(-1);
    },
    SearchUser() {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client
        .get(`/api/users/search`, {
          params: {
            type: this.searchUser,
            query: this.SearchData,
          },
        })
        .catch((err) => {
          if (err.response.data.resultCode == "api.error.user_not_found") {
            alert("해당 유저를 찾을 수 없습니다.\n다시 검색해주십시오.");
            this.SearchModel = "";
          }
        })
        .then((res) => {
          this.SearchModel = res.data.data.list[0].id;
        });
    },
    sendDL() {},
  },
};
</script>

<style>
.DLsendBtn {
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 400;
}
.BackGroundGray {
  background-color: #999;
}
.BackGroundBlue {
  background-color: #2169ff;
}
.DLsendBtnBox {
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
}
.DLSendPoint {
  width: 100%;
  height: 90px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.3em;
}
.DLSendPoint > span:nth-child(1n) {
  font-size: 14px;
  color: #444;
  font-weight: 400;
}
.DLSendPoint > span:nth-of-type(2) {
  font-size: 20px;
  font-weight: 600;
  color: #444;
  display: flex;
  justify-content: flex-end;
}
.DLSendPoint > input {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  color: #444;
}
.SearchDataInput {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  padding-left: 10px;
  font-size: 14px;
  color: #444;
}
.SearchDataInputDis:read-only {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  padding-left: 10px;
  font-size: 14px;
  color: #444;
}
.SearchInputDL {
  width: 78%;
  height: 40px;
  border: 1px solid #ddd;
  text-align: right;
  padding-right: 40px;
  font-size: 14px;
  font-weight: 400;
}
.backGroundEEE {
  background-color: #eee !important;
}
.DLSendSel {
  width: 20%;
  height: 40px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #444;
}
.DlsendLine {
  width: 100%;
  height: 2px;
  background-color: #2169ff;
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
.alramsBoxTitle1 {
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #2169ff;
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
</style>
