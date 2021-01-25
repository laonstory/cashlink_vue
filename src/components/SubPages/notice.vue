<template>
  <div class="w-100 h-100">
    <div class="AlramNav">
      <span>
        <button class="prevBtn" @click.prevent="prevBtn">
          <img src="../../img/prev.png" alt="" class="prevIcon" />
        </button>
      </span>
      <span class="AlramTitle">공지사항</span>
      <span></span>
    </div>
    <div class="mt-3 alramsBox">
      <span class="alramsBoxTitle">공지사항</span>
      <div class="w-100 h-100">
        <div v-if="!noticeItems" class="notingAlrams">
          <span>내역이 없습니다.</span>
        </div>
        <div v-else class="NoticeAlrams">
          <div
            v-for="(NoticeItems, index) in noticeItems"
            :key="index"
            class="NoticeAlramsList"
          >
            <span>{{ NoticeItems.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeItems: [
        { text: "당신만의 세계는 어디엔가 있겠죠?" },
        { text: "헤이 아저씨 메튜" },
        { text: "히즈마이 넘버" },
        { text: "겟아웃 마이 베이비" },
      ],
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
.NoticeAlrams {
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #888;
}
.NoticeAlramsList {
  width: 95%;
  height: 52px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0px 16px;
}
</style>
