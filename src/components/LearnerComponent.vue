<template>
  <form class="container" @submit.prevent="checkAnswer()">
    <h3>{{ currentQuestion.subject }}</h3>x
    <div class="row">
      <draggable
        class="dragArea col-sm-12 card widget-flat"
        :list="list1"
        :group="{ name: 'people' }"
        item-key="value"
        @change="log"
      >
        <template #item="{ element }">
          <div class="card-body option" :class="element.class">
            {{ element.value }}
          </div>
        </template>
      </draggable>
    </div>

    <div class="row">
      <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          item-key="value"
        >
          <template #item="{ element }">
            <div class="card-body option" :class="element.class">
              {{ element.value }}
            </div>
          </template>
        </draggable>
    </div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" @click="PrevQuestion" class="btn btn-secondary" :disabled="this.qstIndex <= 0">Previous Question</button>
      <button type="submit">Check if correct</button>
      <button type="button" @click="nextQuestion" class="btn btn-secondary" :disabled="this.qstIndex >= this.questions.length -1 ">Next Question</button>
    </div>
  </form>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "LearnComponent",
  components: {
    draggable
  },
  data() {
    return {
      questions:[],
      currentQuestion :'',
      list1 : [],
      list2 : [],
      qstIndex : 0
    };
  },
  methods: {
    nextQuestion() {
      this.qstIndex++;
      if(this.questions.length > this.qstIndex && this.qstIndex>=0) 
      {
        this.getQuestions();
      }
    },
    PrevQuestion() {
      this.qstIndex--;
      
      if(this.qstIndex >= 0 && this.questions.length > this.qstIndex) 
      {
        this.getQuestions();
      }
    },
    checkAnswer() {
      var origCount= 0 ;
      var myCount = 0;
      this.questions = JSON.parse(localStorage.getItem('questions'));
      this.currentQuestion = this.questions[this.qstIndex];
      this.currentQuestion.options.map((vitem) => {
        if(vitem.correct == true) origCount++;
      });

      this.list2.map((vitem) => {
        if(vitem.correct == true) myCount++;
        else myCount--;
      });
      if(origCount == myCount) {
        alert('correct!');
      }
      else {
        alert('Not Correct')
      }

      this.list1 = this.list1.map((vitem) => {
        if(vitem.correct == true) 
        {
          vitem.class = "alert alert-primary"
        }else {
          vitem.class = "alert alert-danger"
        }
        return vitem;
      });
      this.list2 =this.list2.map((vitem) => {
        if(vitem.correct == true) 
        {
          vitem.class = "alert alert-primary"
        }else {
          vitem.class = "alert alert-danger"
        }
        return vitem;
      });
    },
    getQuestions(){
      this.questions = JSON.parse(localStorage.getItem('questions'));
      this.currentQuestion = this.questions[this.qstIndex];
      this.list1 = this.currentQuestion.options;
      this.list2 = [{
        'value' :'Drag correct answer here',
        'correct' : false
      }];
    },
    log: function(evt) {
      window.console.log(evt);
      if(this.list2.length>1) {

        this.list2 = this.list2.filter((item) => {
          if(item.value == 'Drag correct answer here') {
            return false;
          }
          return true;
        });
      }
    },
  },
  mounted() {
    this.getQuestions();
  },
};
</script>
<style scoped>
.option {
  border-style: solid;
  border-width: thin;
  border-color: grey;
  width: 100px;
  height: 100px;
  text-align: center;
  vertical-align: middle;
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