<template>
  <form class="container" @submit.prevent="saveQuestions()">
    <tr>
      <td>
        <input
          type="number"
          class="form-control"
          placeholder="Number of elements"
          v-model="no_of_elements"
          @keyup="addQuestion(no_of_elements)"
          @change="addQuestion(no_of_elements)"
        />
      </td>
    </tr>
    <table v-for="(control, index) in form_controls" :key="index" width="100%">
      <tr>
        <td>
          <div class="p-3 border">
            <table width="100%">
              <tr>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    :id="control.id"
                    placeholder="Subject"
                    v-model="control.subject"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Number of element (1-10) "
                    v-model="control.option_count"
                    @keyup="addOptions(control)"
                  />
                </td>
              </tr>
              <tr v-if="control.options.length">
                <td>
                  <div class="p-3">
                    <table>
                      <tr><td>Options</td><td>Correct?</td></tr>
                      <tr v-for="(option, vindex) in control.options" :key="vindex">
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Option"
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
    <tr>
      <td><button type="submit" class="btn btn-primary m-1">Save</button>
      <small v-if="saved" class="m-1">Saved successfully</small>
      <br><br><br><br><br></td>
    </tr>
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
      saved: false
    };
  },
  methods: {
    addOptions(control) {
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
      this.form_controls = [];
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
    },
    saveQuestions() {
      localStorage.setItem("questions", JSON.stringify(this.form_controls));
      localStorage.setItem("no_of_elements", JSON.stringify(this.no_of_elements));
      this.saved = true;
    },
  },
  mounted() {
    this.form_controls = JSON.parse(localStorage.getItem("questions"));
    this.no_of_elements = JSON.parse(localStorage.getItem("no_of_elements"));
  },
};
</script>
