<template>
  <div>
    <div class="loadingMake">
      <RingLoader :color="color" :size="size" />
    </div>
    <div class="loading">
      <span class="loadingFont">로딩중입니다.</span>
    </div>
  </div>
</template>

<script>
import RingLoader from "vue-spinner/src/RingLoader";
export default {
  components: {
    RingLoader,
  },
  data() {
    return {
      color: "#00AAFF",
      size: "300px",
    };
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.loadingMake {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.loadingFont {
  font-size: 25px;
  color: #2169ff;
  font-weight: 600;
}
</style>
