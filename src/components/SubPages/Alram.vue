<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="border-radius: 10px;">
        <div class="AlramNav">
          <span>
            <button class="prevBtn" @click.prevent="prevBtn">
              <img src="../../img/prev.png" alt="" class="prevIcon" />
            </button>
          </span>
          <span class="AlramTitle">알람</span>
          <span></span>
        </div>
        <div class="mt-3 alramsBox">
          <span class="alramsBoxTitle">알람</span>
          <div class="w-100 h-100">
            <div v-if="!alramsItems" class="notingAlrams">
              <span>내역이 없습니다.</span>
            </div>
            <div v-else>
              <div>
                <div
                  v-for="(AlramList, index) in SampleData"
                  :key="index"
                ></div>
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
      .get("api/users/me/noti", {
        page: this.page,
      })
      .then((res) => {
        this.SampleData = this.SampleData.concat(res.data.data.markets);
        this.limit = res.data.data.markets.length;
        this.count = res.data.data.paging.count;
        this.page += 1;
        console.log(this.SampleData);
      });
  },
  data() {
    return {
      SampleData: [],
      limit: "",
      count: "",
      page: 0,
    };
  },
  methods: {
    prevBtn() {
      this.$router.go(-1);
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
