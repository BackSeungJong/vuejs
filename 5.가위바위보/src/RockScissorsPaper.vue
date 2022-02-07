<template>
  <div>
    <div id="computer" v-bind:style="computedStyleObject"></div>
    <div>
      <button v-on:click="onClickButton('바위')">바위</button>
      <button v-on:click="onClickButton('가위')">가위</button>
      <button v-on:click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재: {{ score }}</div>
  </div>
</template>

<script>
const rspCoord = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

let interval = null;

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoord).find(function (v) {
    return v[1] === imgCoord; // value
  })[0]; // key
};

export default {
  data() {
    return {
      imgCoord: rspCoord.바위,
      result: "",
      score: 0,
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      };
    },
  },
  methods: {
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;

      if (diff === 0) {
        this.result = "비겼습니다.";
      } else if ([-1, 2].includes(diff)) {
        this.result = "이겼습니다.";
        this.score += 1;
      } else {
        this.result = "졌습니다.";
        this.score -= 1;
      }
      setTimeout(() => {
        this.changeHandle();
      }, 1000);
    },

    changeHandle() {
      if (interval !== null) {
        interval = null;
      }
      interval = setInterval(() => {
        if (this.imgCoord === rspCoord.바위) {
          this.imgCoord = rspCoord.가위;
        } else if (this.imgCoord === rspCoord.가위) {
          this.imgCoord = rspCoord.보;
        } else if (this.imgCoord === rspCoord.보) {
          this.imgCoord = rspCoord.바위;
        }
      }, 100);
    },
  },

  beforeCreate() {
    console.log("before created");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("before mounted");
  },
  mounted() {
    console.log("mounted");
    this.changeHandle();
  },
  beforeUpdate() {
    console.log("before update");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("before destroy");
    clearInterval(interval);
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<style scoped>
#computer {
  width: 200px;
  height: 200px;
}
</style>
