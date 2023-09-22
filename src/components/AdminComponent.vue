<template>
  <form class="container" @submit.prevent="saveQuestions()">
    <div
      class="text-center col-12 h-100 d-flex align-items-center justify-content-center"
    >
      <div class="col-9 text-center p-3" style="background-color: #f8f9fa">
        <h3>Questions</h3>
        <table>
          <tr>
            <td align="left">
              <label for="no_of_elements" class="label">No Of Questions</label>
              <input
                type="number"
                id="no_of_elements"
                required
                class="form-control"
                v-model="no_of_elements"
                @keyup="addQuestion(no_of_elements)"
                @change="addQuestion(no_of_elements)"
              />
            </td>
          </tr>
        </table>
        <table
          v-for="(control, index) in form_controls"
          :key="index"
          width="100%"
          class="mt-2 mb-5 bg-gray"
          style="background-color: aliceblue"
        >
          <tr>
            <td>
              <div class="p-3 border">
                <table width="100%">
                  <tr>
                    <td align="left">
                      <label :for="`qst${index}`" class="label"
                        >Question #{{ index + 1 }}</label
                      >
                      <input
                        :id="`qst${index}`"
                        required
                        type="text"
                        class="form-control"
                        v-model="control.subject"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="left">
                      <label :for="`noofoptions${index}`" class="label"
                        >Number Of Options (1-10)</label
                      >
                      <input
                        type="number"
                        required
                        :id="`noofoptions${index}`"
                        class="form-control"
                        maxLength="10"
                        v-model="control.option_count"
                        @keyup="addOptions(control)"
                      />
                    </td>
                  </tr>
                  <tr v-if="control.options.length">
                    <td>
                      <div class="p-3">
                        <table>
                          <tr>
                            <!-- <td class="label">Options</td> -->
                            <td></td>
                            <td class="label">Correct Answer</td>
                          </tr>
                          <tr v-for="(option, vindex) in control.options" :key="vindex">
                            <td align="left">
                              <label :for="`options${index}${vindex}`" class="label"
                                >Option {{ vindex + 1 }}</label
                              >
                              <input
                                required
                                :id="`options${index}${vindex}`"
                                type="text"
                                class="form-control"
                                v-model="option.value"
                              />
                            </td>
                            <td><input type="checkbox" v-model="option.correct" /></td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
        <table width="100%">
          <tr>
            <td align="right">
              <button type="button" class="btn btn-secondary m-1" @click="resetForm">
                Reset
              </button>
              <button type="submit" class="btn btn-primary m-1">Save</button>
              <br />
              <small v-if="saved" class="m-1">Saved successfully</small>
              <br /><br /><br /><br /><br />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AdminComponent",
  data() {
    return {
      no_of_elements: 1,
      form_controls: [
        {
          id: 1,
          option_count: 1,
          subject: "",
          options: [
            {
              value: "",
              correct: false,
              class: "alert alert-warning",
            },
          ],
        },
      ],
      saved: false,
    };
  },
  methods: {
    addOptions(control) {
      if (control.option_count > 10) {
        control.option_count = 10;
      }
      if (control.option_count < 0) {
        control.option_count = 1;
      }
      control.options = [];
      for (var i = 1; i <= control.option_count; i++) {
        control.options.push({
          value: "",
          correct: false,
          class: "alert alert-warning",
        });
      }
    },
    addQuestion(no_of_elements) {
      //this.form_controls = [];
      no_of_elements = no_of_elements - this.form_controls.length;
      i = 1;
      if (no_of_elements > 0) {
        for (var i = 1; i <= no_of_elements; i++) {
          this.form_controls.push({
            id: i,
            option_count: 1,
            subject: "",
            options: [
              {
                value: "",
                correct: false,
                class: "alert alert-warning",
              },
            ],
          });
        }
      } else {
        no_of_elements = Math.abs(no_of_elements);

        for (i = no_of_elements; i >= 1; i--) {
          this.form_controls.splice(i, 1);
        }
      }
    },
    saveQuestions() {
      localStorage.setItem("questions", JSON.stringify(this.form_controls));
      localStorage.setItem("no_of_elements", JSON.stringify(this.no_of_elements));
      this.saved = true;
    },
    resetForm() {
      this.no_of_elements = 1;
      this.form_controls = [];
      this.form_controls.push({
        id: 0,
        option_count: 3,
        subject: "",
        options: [
          {
            value: "",
            correct: false,
            class: "alert alert-warning",
          },
          {
            value: "",
            correct: false,
            class: "alert alert-warning",
          },
          {
            value: "",
            correct: false,
            class: "alert alert-warning",
          },
        ],
      });
    },
  },
  mounted() {
    this.form_controls = JSON.parse(localStorage.getItem("questions")) ?? [];
    this.no_of_elements = JSON.parse(localStorage.getItem("no_of_elements"));
  },
};
</script>

<style scoped>
.label {
  font-size: 0.8em;
  text-align: left;
}
</style>
