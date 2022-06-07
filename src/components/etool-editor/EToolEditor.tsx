import { defineComponent } from 'vue';
import EToolHeader from './components/header';
import EToolBody from './components/body';

import './style.scss';

export default defineComponent({
  name: 'EToolEditor',

  setup () {
    //
  },

  render () {
    return (
      <div class='etool-editor'>
        <div class='h-full'>
          <EToolHeader />
          <EToolBody />
        </div>
      </div>
    );
  }
});
