<template>
    <form class="container" @submit.prevent="saveQuestions()">
        <tr><td><input type="number" class="form-control" placeholder="No.of Questions" v-model="no_of_elements" @keyup="addQuestion(no_of_elements)"/></td></tr>
        <table v-for="(control, index) in form_controls" :key="index">
          <tr><td>
            <div class="p-3">
              <table>
                <tr><td><input type="text" class="form-control" placeholder="Subject" v-model="control.subject"/></td></tr>
                <tr><td><input type="number" class="form-control"  placeholder="Options count" v-model="control.option_count" @keyup="addOptions(control)"/></td></tr>
                <tr v-if="control.options.length"><td>
                  <div class="p-3">
                    <table>
                      <tr v-for="(option,vindex) in control.options" :key="vindex">
                        <td>
                          <input type="text" class="form-control"  placeholder="Options" v-model="option.value"/>
                        </td>
                        <td><input type="checkbox" v-model="option.correct"/></td>
                      </tr>
                    </table>
                  </div>
                </td></tr>
              </table>
              
            </div>
          </td></tr>
          
        </table>
        <tr><td><button type="submit">Save</button></td></tr>
    </form>
</template>

<script>
export default {
  name: 'AdminComponent',
  data() {
    return {
      no_of_elements: 1,
      form_controls: [
        {
          id : 1,
          option_count: 1,
          subject: '',
          options: [
            {
              'value' : '',
              'correct' : false,
              'class' :'warning'
            }
          ]
        }
      ]
    }
  },
  methods : {
    addOptions(control) 
    {
      
      control.options= [];
      for(var i=1; i<=control.option_count;i++) {
        control.options.push({
          'value' : '',
          'correct' : false,
          'class' :'warning'
        });
      }
      
    },
    addQuestion(no_of_elements) {
      this.form_controls = [];
      for(var i=1; i<=no_of_elements;i++) {
        this.form_controls.push({
          id : i,
          option_count: 1,
          subject: '',
          options: [
            {
              'value' : 'test',
              'correct' : false,
              'class' :'warning'
            }
          ]
        });
      }
    },
    saveQuestions()
    {
      localStorage.setItem('questions', JSON.stringify(this.form_controls));
    }
  },
  mounted() {
    this.form_controls = JSON.parse(localStorage.getItem('questions'));
  }
}

</script>
