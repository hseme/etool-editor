import { defineComponent } from 'vue';
import EToolManager from '../manager';
import { EToolSplitter } from '../../../etool-splitter';

import './style.scss';

export default defineComponent({
  name: 'EToolBody',

  setup () {
    //
  },

  render () {
    return (
      <div class='etool-body'>
        <div class='w-full h-full relative'>
          <EToolSplitter>
            {{
              before: () => {
                return (
                  <div>
                    before
                  </div>
                );
              },
              after: () => {
                return (
                  <div>
                    after
                  </div>
                );
              }
            }}
          </EToolSplitter>
        </div>
        <EToolManager />
      </div>
    );
  }
});
