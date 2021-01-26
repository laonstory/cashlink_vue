<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox">
        <div class="w-100 h-100">
          <div class="AlramNav">
            <span>
              <button class="prevBtn" @click.prevent="prevBtn">
                <img src="../../img/prev.png" alt="" class="prevIcon" />
              </button>
            </span>
            <span class="AlramTitle">서비스 문의</span>
            <span></span>
          </div>
          <div class="mt-3 alramsBox">
            <span class="alramsBoxTitle">서비스 문의</span>
            <div class="w-100 h-100">
              <div v-if="!UserFAQ" class="notingAlrams">
                <span>내역이 없습니다.</span>
              </div>
              <div v-else>
                <div
                  v-for="(UserFAQ, index) in UserFAQ"
                  :key="index"
                  class="UserFAQList mt-3"
                  @click.prevent="openFAQ(index)"
                >
                  <div>
                    <span>{{ UserFAQ.title }}</span>
                    <p>
                      <small style="color: #888;">
                        {{ momentDateStr(UserFAQ.created_at) }}
                      </small>
                    </p>
                  </div>
                  <hr />
                  <div v-if="UserFAQ.visible">
                    <div class="UserFaq">
                      <div class="questionBlank">
                        <img src="../../img/q.png" class="questionIco" />
                        <span>{{ UserFAQ.title }}</span>
                      </div>
                      <div class="questionInnerBlank">
                        <img src="../../img/a.png" class="questionIco" />
                        <span>{{ UserFAQ.contents }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button class="WriteFAQ" @click.prevent="closeFAQWrite">
                  작성하기
                </button>
              </div>
            </div>
          </div>
          <div v-if="FaqWrite" class="WriteFAQPost">
            <div class="AlramNav">
              <span>
                <button class="prevBtn" @click.prevent="closeFAQWrite">
                  <img src="../../img/close.png" alt="" class="prevIcon" />
                </button>
              </span>
              <span class="AlramTitle">작성하기</span>
              <span></span>
            </div>
            <div class="mt-3 alramsBox">
              <div class="FAQwriteTitle">
                <small>제목</small>
                <input type="text" class="titleUserFaq" v-model="sendTitle" />
              </div>
              <div class="mt-3 FAQwriteTitle">
                <small>내용</small>
                <textarea
                  cols="30"
                  rows="10"
                  class="textUserFaq"
                  v-model="sendTextarea"
                >
                </textarea>
              </div>
              <div class="mt-3">
                <button class="WriteFAQ" @click.prevent="sendFaq">
                  보내기
                </button>
              </div>
            </div>
          </div>
          <div v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../../auth/client";
import moment from "moment";
export default {
  data() {
    return {
      FaqWrite: false,
      UserFAQ: [],
      sendTitle: "",
      sendTextarea: "",
    };
  },
  beforeMount() {
    const LoginData = window.localStorage.getItem("auth");
    client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
    client.get("/api/inquiries").then((res) => {
      //   this.UserFAQ = this.UserFAQ.concat(res.data.data.list);
      res.data.data.list.forEach((Element) => {
        this.UserFAQ.push({ ...Element, visible: false });
        console.log(this.UserFAQ);
      });
    });
  },
  methods: {
    reloadUsersFAQ() {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client.get("/api/inquiries").then((res) => {
        console.log(res.data);
        this.UserFAQ = this.UserFAQ.concat(res.data.data.list);
      });
    },
    momentDateStr(DateStr) {
      let date = moment(DateStr).format("YYYY-MM-DD");
      return date;
    },
    prevBtn() {
      this.$router.go(-1);
    },
    closeFAQWrite() {
      this.FaqWrite = !this.FaqWrite;
    },
    openFAQ(id) {
      this.UserFAQ[id].visible = !this.UserFAQ[id].visible;
    },
    sendFaq() {
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      if (this.sendTitle == "") {
        alert("제목이 비어 있습니다.");
      } else if (this.sendTextarea == "") {
        alert("내용이 비어 있습니다.");
      } else {
        client
          .post("/api/inquiries", {
            title: this.sendTitle,
            contents: this.sendTextarea,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.result == 1) {
              alert("문의내용을 등록하였습니다.");
              this.sendTitle = "";
              this.sendTextarea = "";
              this.reloadUsersFAQ();
              this.closeFAQWrite();
            }
          });
      }
    },
  },
};
</script>

<style>
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
  color: #2269ff !important;
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
.WriteFAQ {
  width: 100%;
  height: 50px;
  background-color: #2269ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
}
.WriteFAQPost {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 6;
  top: 0;
  background-color: white;
}
.UserFAQList {
  width: 95%;
  margin: 0 auto;
  font-size: 13px;
}
.FAQwriteTitle {
  display: flex;
  flex-direction: column;
}
.FAQwriteTitle > small {
  font-size: 12px;
  color: #888;
}
.titleUserFaq {
  border: 1px solid #ddd;
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  font-size: 14px;
}
.titleUserFaq:focus {
  outline: none;
}
.textUserFaq {
  border: 1px solid #ddd;
  width: 100%;
  height: 160px;
  padding: 10px 10px;
  font-size: 14px;
}
.textUserFaq:focus {
  outline: none;
}
.UserFaq {
  width: 100%;
  height: auto;
  background-color: #eee;
}
.questionIco {
  width: 25px;
}
.questionBlank {
  padding: 20px 20px;
}
.questionInnerBlank {
  padding: 20px 20px;
}
</style>
