import { computed, defineComponent, DirectiveArguments, h, ref, withDirectives } from 'vue';
import EToolManager from '../manager';
import { EToolSplitter } from '../../../etool-splitter';
import TouchPan from '@/directives/TouchPan.js';

import './style.scss';

export default defineComponent({
  name: 'EToolBody',

  setup () {
    //

    function pan ({ evt, ...info }: any) {
      console.log(evt, info);
    }

    const sepDirective = computed<DirectiveArguments>(() => {
      return [[
        TouchPan,
        pan,
        '',
        {
          prevent: true,
          stop: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });

    return {
      sepDirective,
      splitterModel: ref(50)
    };
  },

  render () {
    const {
      sepDirective
    } = this;

    return (
      <div class='etool-body'>
        <div class='w-full h-full relative'>
          <EToolSplitter horizontal v-model={this.splitterModel} limits={[50, 100]} style={{ height: '500px' }}>
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

          {
            withDirectives(
              h('div', {
                class: 'w-[30rem] h-[30rem]'
              }),
              sepDirective
            )
          }
        </div>
        <EToolManager />
      </div>
    );
  }
});
