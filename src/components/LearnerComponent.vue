<template>
  <form class="container" @submit.prevent="checkAnswer()">
    <p>{{ qstNumber }} of {{ questions.length }} questions</p>
    <h3>{{ currentQuestion.subject }}</h3>
    <div class="row">
      <draggable
        class="row border justify-content-center"
        style="height: 250px"
        :list="list1"
        :group="{ name: 'people' }"
        item-key="value"
        @change="log"
      >
        <template #item="{ element }">
          <div class="card option m-5 centerd p-5" :class="element.class">
            {{ element.value }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="p-3">Drag correct answer(s) to bottom area</div>
    <div class="row bg-secondary" style="height: 250px">
      <!-- <div><img src="https://picsum.photos/id/237/200/300" /></div> -->
      <draggable
        class="row border justify-content-center"
        :list="list2"
        group="people"
        item-key="value"
      >
        <template #item="{ element }">
          <div
            class="card option2 m-5 centerd"
            :class="element.class"
            :style="element.image != '' ? 'width:10%' : ''"
          >
            <img v-if="element.image" :src="element.image" />
            <span v-else>{{ element.value }}</span>
          </div>
        </template>
      </draggable>
    </div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        @click="prevQuestion"
        class="btn btn-secondary m-1"
        :disabled="this.qstIndex <= 0"
      >
        Previous Question
      </button>
      <button type="submit" class="btn btn-secondary m-1">Check if correct</button>
      <button type="button" class="btn btn-secondary m-1" @click="reset()">Reset</button>
      <button
        type="button"
        @click="nextQuestion"
        class="btn btn-secondary m-1"
        :disabled="this.qstIndex >= this.questions?.length - 1"
      >
        Next Question
      </button>
    </div>
  </form>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "LearnComponent",
  components: {
    draggable,
  },
  data() {
    return {
      questions: [],
      currentQuestion: "",
      list1: [],
      list2: [],
      qstIndex: 0,
      qstNumber: 1,
    };
  },
  methods: {
    nextQuestion() {
      this.qstIndex++;
      this.qstNumber = this.qstIndex + 1;
      if (this.questions.length > this.qstIndex && this.qstIndex >= 0) {
        this.getQuestions();
      }
    },
    prevQuestion() {
      this.qstIndex--;
      this.qstNumber = this.qstIndex + 1;
      if (this.qstIndex >= 0 && this.questions.length > this.qstIndex) {
        this.getQuestions();
      }
    },
    checkAnswer() {
      var origCount = 0;
      var myCount = 0;
      this.questions = JSON.parse(localStorage.getItem("questions"));
      this.currentQuestion = this.questions[this.qstIndex];
      this.currentQuestion.options.map((vitem) => {
        if (vitem.correct == true) origCount++;
      });

      this.list2.map((vitem) => {
        if (vitem.correct == true) myCount++;
        else myCount--;
      });
      if (origCount == myCount) {
        alert("Correct!");
      } else {
        alert("Not Correct");
      }

      // this.list1 = this.list1.map((vitem) => {
      //   if (vitem.correct == true) {
      //     vitem.class = "alert alert-success";
      //   } else {
      //     vitem.class = "alert alert-danger";
      //   }
      //   return vitem;
      // });
      this.list2 = this.list2.map((vitem) => {
        if (vitem.value == "Drag correct answer(s) here") return vitem;
        if (vitem.correct == true) {
          vitem.class = "alert alert-success";
        } else {
          vitem.class = "alert alert-danger";
        }
        return vitem;
      });
    },
    getQuestions() {
      this.questions = JSON.parse(localStorage.getItem("questions")) ?? [];
      if (this.questions.length == 0) {
        this.$router.push("admin");
        return;
      }

      this.currentQuestion = this.questions[this.qstIndex] ?? 0;
      this.qstNumber = this.qstIndex + 1;
      this.list1 = this.currentQuestion.options;
      this.list2 = [
        {
          value: "Drag correct answer(s) here",
          correct: false,
          image: "/drag.jpg",
        },
      ];
    },
    log: function (evt) {
      window.console.log(evt);
      if (this.list2.length > 1) {
        this.list2 = this.list2.filter((item) => {
          if (item.value == "Drag correct answer(s) here") {
            return false;
          }
          return true;
        });
      }
    },
    reset() {
      this.getQuestions();
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
  width: 150px;
  height: 125px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.option2 {
  width: 150px;
  height: 125px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 0;
  background-color: #dbe7ff;
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
.alert-danger {
  background-color: red;
  color: #fff;
}
.alert-success {
  background-color: green;
  color: #fff;
}
.alert-warning {
  background-color: #8845f5;
  color: #fff;
}
.row {
  margin-left: 0 !important;
}
</style>
