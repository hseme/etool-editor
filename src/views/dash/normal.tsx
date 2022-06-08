// import { EToolEditor } from '@/components/etool-editor';
import { computed, defineComponent, DirectiveArguments, h, withDirectives } from 'vue';
import TouchPan from '@/directives/TouchPan.js';

export default defineComponent({
  name: 'DashNormal',

  setup () {
    //
    const sepDirective = computed(() => {
      return [
        [
          TouchPan,
          (e) => {
            console.log(e);
          },
          '',
          {
            prevent: true,
            stop: true,
            mouse: true,
            mouseAllDir: true
          }
        ]
      ] as DirectiveArguments;
    });

    return {
      sepDirective
    };
  },

  render () {
    const {
      sepDirective
    } = this;

    return (
      <>
        {/* <EToolEditor /> */}
        {
          withDirectives(h('div', {
            class: 'w-[30rem] h-[30rem]'
          }, 'asd'), sepDirective)
        }
      </>
    );
  }
});
