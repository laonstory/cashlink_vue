<template>
  <div class="w-100 h-100 PinBox">
    <div class="PinNav">
      <span>
        <button class="prevBtn" @click.prevent="prevBtn">
          <img src="../../../img/prev.png" alt="" class="prevIcon" />
        </button>
      </span>
      <span class="AlramTitle"></span>
      <span></span>
    </div>
    <div class="PinsBox">
      <div class="w-100 h-100" style="display: flex;">
        <div class="PinBox">
          <div>
            <span>{{ Pintext }}</span>
          </div>
          <div class="PinChkBox">
            <div id="1">
              <div>
                <div v-if="PinNum[0] == undefined" class="PinGray" />
                <div v-else class="PinBlue" />
              </div>
            </div>
            <div id="2">
              <div>
                <div v-if="PinNum[1] == undefined" class="PinGray" />
                <div v-else class="PinBlue" />
              </div>
            </div>
            <div id="3">
              <div>
                <div v-if="PinNum[2] == undefined" class="PinGray" />
                <div v-else class="PinBlue" />
              </div>
            </div>
            <div id="4">
              <div>
                <div v-if="PinNum[3] == undefined" class="PinGray" />
                <div v-else class="PinBlue" />
              </div>
            </div>
            <div id="5">
              <div>
                <div v-if="PinNum[4] == undefined" class="PinGray" />
                <div v-else class="PinBlue" />
              </div>
            </div>
            <div id="6">
              <div>
                <div v-if="PinNum[5] == undefined" class="PinGray" />
                <div v-else class="PinBlue" />
              </div>
            </div>
          </div>

          <div class="PinBtnBox">
            <button class="PinBtn" @click.prevent="One">1</button>
            <button class="PinBtn" @click.prevent="Two">2</button>
            <button class="PinBtn" @click.prevent="Three">3</button>
            <button class="PinBtn" @click.prevent="Four">4</button>
            <button class="PinBtn" @click.prevent="Five">5</button>
            <button class="PinBtn" @click.prevent="Six">6</button>
            <button class="PinBtn" @click.prevent="Seven">7</button>
            <button class="PinBtn" @click.prevent="Eight">8</button>
            <button class="PinBtn" @click.prevent="Nine">9</button>
            <button class="PinRemove" @click.prevent="CancelPin">취소</button>
            <button class="PinBtn" @click.prevent="Zero">0</button>
            <button class="PinRemove" @click.prevent="RemovePin">
              <img src="../../../img/prev.png" class="prevIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../../../auth/client";
export default {
  beforeMount() {},
  data() {
    return {
      PinNum: [],
      Pintext: "암호를 입력하세요.",
      check: false,
    };
  },
  watch: {
    PinNum: function() {
      if (this.PinNum.length >= 6) {
        if (this.check) {
          alert("ㅇㅇ 나도 잘 입력했음. 이제 유출의 시간만 남았다! ");
        } else {
          this.PinChk();
        }
      }
    },
  },
  methods: {
    One() {
      this.PinNum.push("1");
    },
    Two() {
      this.PinNum.push("2");
    },
    Three() {
      this.PinNum.push("3");
    },
    Four() {
      this.PinNum.push("4");
    },
    Five() {
      this.PinNum.push("5");
    },
    Six() {
      this.PinNum.push("6");
    },
    Seven() {
      this.PinNum.push("7");
    },
    Eight() {
      this.PinNum.push("8");
    },
    Nine() {
      this.PinNum.push("9");
    },
    Zero() {
      this.PinNum.push("0");
    },
    RemovePin() {
      this.PinNum.pop();
    },
    CancelPin() {
      this.PinNum.splice(0);
    },
    prevBtn() {
      this.$router.go(-1);
    },
    PinChk() {
      let PinData = this.PinNum.join("");
      const LoginData = window.localStorage.getItem("auth");
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      client
        .get("/api/users/me/pin/duplicate", {
          params: {
            password: PinData,
          },
        })
        .catch((err) => {
          if (err.response.data.resultCode == "api.error.pin_not_match") {
            alert("핀번호가 올바르지 않습니다.\n다시 입력해주십시오.");
            this.PinNum.splice(0);
          }
        })
        .then((res) => {
          if (res.data.data.duplicate) {
            this.check = true;
            this.Pintext = "새 암호를 입력하세요.";
            this.PinNum.splice(0);
          }
        });
    },
  },
};
</script>

<style>
.PinChkBox {
  width: 200px;
  display: flex;
  justify-content: space-around;
}
.PinGray {
  width: 12px;
  height: 12px;
  border-radius: 15px;
  background-color: #ddd;
}
.PinBlue {
  width: 12px;
  height: 12px;
  border-radius: 15px;
  background-color: #2233aa;
}
.PinRemove {
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: 300;
}
.PinBox {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.PinBtnBox {
  margin: 0 auto;
  width: 288px;
  height: 384px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  place-items: center;
}
.PinBtn {
  width: 64px;
  height: 64px;
  border-radius: 50px;
  background-color: transparent;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2233aa;
  font-size: 28px;
  font-weight: 400;
}
.PinNav {
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
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
.PinsBox {
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
</style>
