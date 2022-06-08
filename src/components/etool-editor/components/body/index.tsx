import { defineComponent, ref } from 'vue';
import EToolManager from '../manager';
import { EToolSplitter } from '../../../etool-splitter';

import './style.scss';

export default defineComponent({
  name: 'EToolBody',

  setup () {
    return {
      splitterModel: ref(280),
      splitterHModel: ref(300)
    };
  },

  render () {
    return (
      <div class='etool-body'>
        <div class='w-full h-full relative'>
          <EToolSplitter v-model={this.splitterModel} limits={[280, 560]} unit='px' style={{ height: '100%' }}>
            {{
              before: () => {
                return (
                  <div>
                    left sider
                  </div>
                );
              },
              after: () => {
                return (
                  <EToolSplitter horizontal v-model={this.splitterHModel} unit='px' limits={[300, Infinity]} reverse style={{ height: '100%' }}>
                    {{
                      before: () => {
                        return (
                          <div>
                            editor
                          </div>
                        );
                      },
                      after: () => {
                        return (
                          <div>
                            queries
                          </div>
                        );
                      }
                    }}
                  </EToolSplitter>
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
