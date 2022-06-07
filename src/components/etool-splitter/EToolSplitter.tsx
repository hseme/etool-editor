import { computed, defineComponent, DirectiveArguments, h, ref, withDirectives } from 'vue';

import './style.scss';
import { TouchDirective } from './touch.js';

export const etoolSplitterProps = {
  // modelValue: {
  //   type: Number,
  //   required: true
  // },
  reverse: Boolean,
  unit: {
    type: String,
    default: '%',
    validator: (v: string) => ['%', 'px'].includes(v)
  },
  horizontal: Boolean,
  disable: Boolean
};

export default defineComponent({
  name: 'EToolSplitter',

  props: etoolSplitterProps,

  setup (props) {
    const rootRef = ref(null);
    const sideRefs = {
      before: ref(null),
      after: ref(null)
    };

    const classes = computed(() => ([
      'etool-splitter',
      props.horizontal === true ? 'etool-splitter__horizontal column' : 'etool-splitter--vertical row',
      `etool-splitter--${props.disable === true ? 'disabled' : 'workable'}`
    ]));

    const sepDirective = computed(() => {
      return [[
        TouchDirective,
        (e) => { console.log(e); },
        '',
        {
          [props.horizontal === true ? 'vertical' : 'horizontal']: true,
          prevent: true,
          stop: true,
          mouse: true,
          mouseAllDir: true
        }
      ]] as DirectiveArguments;
    });

    return {
      rootRef,
      classes,
      sideRefs,
      sepDirective
    };
  },

  render () {
    const {
      classes,
      sepDirective,
      $slots
    } = this;

    return (
      <div
        class={classes}
        ref="rootRef"
      >
        <div
          class={[
            'etool-splitter__panel etool-splitter__before'
          ]}
          ref={this.sideRefs.before}
        >
          {$slots.before && $slots.before()}
        </div>

        <div
          class={[
            'etool-splitter__separator'
          ]}
        >
          {
            withDirectives(
              h('div', {
                class: [
                  'etool-splitter__separator-area'
                ]
              }, [
                $slots.separator && $slots.separator()
              ]),
              sepDirective
            )
          }
        </div>

        <div
          class={[
            'ettol-splitter__panel etool-splitter__after'
          ]}
          ref={this.sideRefs.after}
        >
          {$slots.after && $slots.after()}
        </div>
      </div>
    );
  }
});
