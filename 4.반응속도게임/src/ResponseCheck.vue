<template>
  <div>
    <div id="screen" v-bind:class="state" v-on:click="onClickScreen">
      {{ message }}
    </div>
    <!-- v-show는 태그로 들어감 style="displaye: none;" -->
    <!-- v-if는 태그가 없음 -->
    <div v-show="result.length">
      <div>결과: {{ currentResult }}ms</div>
      <div v-if="result.length !== 0">평균시간: {{ average }}ms</div>
      <button v-on:click="onReset">리셋</button>
    </div>

    <!--
      감싸주는 태그를 없애고 싶으면 template사용
      <template v-show="result.length">
        <div>결과: {{ currentResult }}ms</div>
        <div v-if="result.length !== 0">평균시간: {{ average }}ms</div>
        <button v-on:click="onReset">리셋</button>
      </template>
    -->
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
  data() {
    return {
      currentResult: 0,
      result: [],
      state: "waiting", // 클래스를 나타내는 데이터
      message: "클릭해서 시작하세요.",
    };
  },
  computed: {
    // data를 가공할 때 사용 -> 캐싱되어서 다른 데이터가 바뀔때 computed된 것은 캐싱된 데이터를 가져온다
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length;
    },
  },
  methods: {
    onReset() {
      this.result = [];
      this.currentResult = 0;
    },
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요.";

        timeout = setTimeout(() => {
          this.state = "now";
          this.message = "지금 클릭!";
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000);
      } else if (this.state === "ready") {
        clearTimeout(timeout);
        this.state = "waiting";
        this.message = "너무 성급하시네요. 초록색이 된 후에 클릭하세요";
      } else if (this.state === "now") {
        endTime = new Date();
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime);
        this.currentResult = this.result[this.result.length - 1];
      }
    },
  },
};
</script>

<style scoped>
/* scoped : 해당컴포넌트에서만 적용 */
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: greenyellow;
}
</style>
