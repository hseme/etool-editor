import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'LayoutBase',

  setup () {
    //
  },

  render () {
    return (
      <RouterView />
    );
  }
});
