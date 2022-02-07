<template>
  <div class="ball" v-bind:style="styleObject">{{ number }}</div>
</template>

<script>
const color = ["red", "blue", "green"];

export default {
  name: "LottoBall",
  props: {
    number: Number,
  },
  computed: {
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = "red";
      } else if (this.number <= 20) {
        background = "orange";
      } else if (this.number <= 30) {
        background = "yellow";
      } else if (this.number <= 40) {
        background = "green";
      } else if (this.number <= 40) {
        background = "blue";
      }
      return {
        background,
      };
    },
  },
};
</script>

<style>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>