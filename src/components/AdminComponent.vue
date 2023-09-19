<template>
    <div class="container">
        <table v-for="(control, index) in form_controls" :key="index">
          <tr><td><input type="number" class="form-control" placeholder="No.of Questions" v-model="control.no_of_elements"/></td></tr>
          <tr><td><input type="text" class="form-control" placeholder="Subject" v-model="control.subject"/></td></tr>
          <tr><td><input type="number" class="form-control"  placeholder="Options count" v-model="control.option_count" @keyup="addOptions(control)"/></td></tr>
          <tr v-if="control.options.length"><td>
            <div class="p-3">
              <table>
                <tr v-for="(option,index) in control.options" :key="index"><td>
                  <table>
                    <tr v-for="(index, option) in option" :key="index">
                      <td>
                      <input type="text" class="form-control"  placeholder="Options" v-model="option.value"/>
                      </td>
                    </tr>
                  </table>
                </td></tr>
              </table>
            </div>
          </td></tr>
        </table>
    </div>
</template>

<script>
export default {
  name: 'AdminComponent',
  data() {
    return {
      form_controls: [
        {
          id : 1,
          no_of_elements: 1,
          option_count: 1,
          subject: '',
          options: [
            {
              'value' : 'test'
            }
          ]
        }
      ]
    }
  },
  methods : {
    addOptions(control) 
    {
      for(var i=1; i<control.option_count;i++) {
        control.options.push({
        'value' : 'test'
      });
      }
      
    }
  }
}

</script>
