import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

import './styles/app.scss';

export default defineComponent({
  name: 'App',

  setup () {
    //
  },

  render () {
    return (
      <RouterView />
    );
  }
});
