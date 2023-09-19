<template>
  <form class="container" @submit.prevent="checkAnswer()">
    <b-container fluid class="bv-example-row">
      <h3>{{ currentQuestion.subject }}</h3>
      <b-row>
        <b-col class="option" v-for="(option, index) in currentQuestion.options" :key="index">
          <h3>{{ option.value }}</h3>
          </b-col>
      </b-row>
    </b-container>
    <div class="h-100 d-flex align-items-center justify-content-center">
      <b-col class="answer">Drag correct answer here</b-col>
    </div>
  </form>
</template>

<script>
export default {
  name: "LearnComponent",
  data() {
    return {
      questions:[],
      currentQuestion :''
    };
  },
  methods: {
    checkAnswer() {

    },
    getQuestions(){
      this.questions = JSON.parse(localStorage.getItem('questions'));
      this.currentQuestion = this.questions[0];
    },
  },
  mounted() {
    this.getQuestions();
  }
};
</script>
<style scoped>
.option {
  border-style: solid;
  border-color: grey;
  width: 100px;
  height: 100px;
  text-align: center;
  vertical-align: middle;
  background-color:antiquewhite;
}
.answer {
  border-style: solid;
  border-color: green;
  width: 100px;
  height: 100px;
  text-align: center;
  vertical-align: middle;
  background-color: #0dcaf0;
}
</style>