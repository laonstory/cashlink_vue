<template>
  <div>
    <div class="myPageSize">
      <div class="MyPageBox" style="overflow: hidden; padding: 0;">
        <div>
          <div class="InfoNav">
            <span>
              <button class="prevBtn" @click.prevent="prevBtn">
                <img src="../../img/prev.png" alt="" class="prevIcon" />
              </button>
            </span>
            <span class="AlramTitle">사업자정보</span>
            <span></span>
          </div>
          <div class="InfoComBox">
            <div class="w-100 h-100">
              <div class="BackgroundCompanyInfo"></div>
              <div class="CompanyInfoName">
                <small class="LogoName">
                  캐시링크
                </small>
                <span class="CompanyName">주식회사 캐시링크</span>
              </div>
              <div class="CompanyInfos">
                <div class="BossName">
                  <span>대표</span>
                  <span class="ml-1">장수진</span>
                </div>
                <small style="font-weight: 300; font-size: 16px; color: #888;">
                  pehnice@nate.com
                </small>
                <div>
                  <div>
                    <span class="ContactIcon">T</span>
                    <small
                      style="font-weight: 300; font-size: 16px; color: #888;"
                    >
                      070-4350-0318
                    </small>
                  </div>
                  <div>
                    <span class="ContactIcon">F</span>
                    <small
                      style="font-weight: 300; font-size: 16px; color: #888;"
                    >
                      0303-3441-0003
                    </small>
                  </div>
                  <div style="font-weight: 300; font-size: 16px; color: #888;">
                    <p>서울시 금천구 가산디지털1로 145,207호</p>
                    <p>(가산동, 에이스하이엔드3차)</p>
                  </div>
                </div>
                <div class="footerCompany mt-4">
                  <small>
                    사업자: 809-81-01929<br />
                    통신판매업 신고번호: 2020-서울금천-1513호
                  </small>
                  <img src="../../img/logo.png" alt="" class="logoInfo" />
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
export default {
  methods: {
    prevBtn() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.InfoNav {
  width: 100%;
  max-width: 720px;
  background: white;
  height: 52px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  position: absolute;
  z-index: 6;
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
.BackgroundCompanyInfo {
  width: 160%;
  height: 270px;
  background-color: #2269ff;
  transform: skewY(3deg) translateY(-70px);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 11px;
}
.LogoName {
  font-weight: 300;
  font-size: 12px;
  color: white;
}
.CompanyName {
  font-size: 23px;
  font-weight: 600;
  color: white;
}
.CompanyInfoName {
  position: absolute;
  top: 90px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.CompanyInfos {
  padding: 0px 16px;
}
.BossName > span:nth-of-type(1) {
  color: #2269ff;
  font-size: 20px;
  font-weight: 600;
}
.BossName > span:nth-of-type(2) {
  color: #2269ff;
  font-size: 28px;
  font-weight: 600;
}
.footerCompany {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 300;
  color: #ddd;
}
.logoInfo {
  width: 90px;
  object-fit: contain;
}
.ContactIcon {
  font-size: 18px;
  font-weight: 600;
  color: #2269ff;
}
</style>
