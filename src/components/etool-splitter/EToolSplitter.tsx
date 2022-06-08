import { computed, defineComponent, DirectiveArguments, h, ref, withDirectives } from 'vue';
import TouchPan from '@/directives/TouchPan.js';

import './style.scss';

export const etoolSplitterProps = {
  modelValue: {
    type: Number,
    required: true
  },
  reverse: Boolean,
  unit: {
    type: String,
    default: '%',
    validator: (v: string) => ['%', 'px'].includes(v)
  },

  limits: {
    type: Array,
    validator: (v: any[]) => {
      if (v.length !== 2) return false;
      if (typeof v[0] !== 'number' || typeof v[1] !== 'number') return false;
      return v[0] >= 0 && v[0] <= v[1];
    }
  },

  emitImmediately: Boolean,

  horizontal: Boolean,
  disable: Boolean

  // beforeClass: [Array, String, Object],
  // afterClass: [Array, String, Object],

  // separatorClass: [Array, String, Object],
  // separatorStyle: [Array, String, Object]
};

export default defineComponent({
  name: 'EToolSplitter',

  props: etoolSplitterProps,

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null);
    const sideRefs = {
      before: ref<HTMLElement | null>(null),
      after: ref<HTMLElement | null>(null)
    };

    const classes = computed(() => ([
      'etool-splitter',
      'flex',
      'flex-nowrap',
      props.horizontal === true ? 'etool-splitter--horizontal flex-col' : 'etool-splitter--vertical flex-row',
      `etool-splitter--${props.disable === true ? 'disabled' : 'workable'}`
    ]));

    const propName = computed(() => (props.horizontal === true ? 'height' : 'width'));
    const side = computed(() => (props.reverse !== true ? 'before' : 'after'));

    const computedLimits = computed((): any[] => (
      props.limits !== void 0
        ? props.limits
        : (props.unit === '%' ? [10, 90] : [50, Infinity])
    ));

    function getCSSValue (value: number) {
      return (props.unit === '%' ? value : Math.round(value)) + props.unit;
    }

    const styles = computed(() => ({
      [side.value]: {
        [propName.value]: getCSSValue(props.modelValue as number)
      }
    }));

    let __dir: string, __maxValue: number, __value: number, __multiplier: number, __normalized: number;

    function pan (evt: any) {
      if (evt.isFirst === true) {
        const size = rootRef.value!.getBoundingClientRect()[propName.value];

        __dir = props.horizontal === true ? 'up' : 'left';
        __maxValue = props.unit === '%' ? 100 : size;
        __value = Math.min(__maxValue, computedLimits.value[1], Math.max(computedLimits.value[0], props.modelValue as number));
        __multiplier = (props.reverse !== true ? 1 : -1) * (props.unit === '%' ? (size === 0 ? 0 : 100 / size) : 1);

        rootRef.value!.classList.add('q-splitter--active');
        return;
      }

      if (evt.isFinal === true) {
        if (__normalized !== props.modelValue) {
          emit('update:modelValue', __normalized);
        }

        rootRef.value!.classList.remove('q-splitter--active');
        return;
      }

      const val = __value +
        __multiplier *
        (evt.direction === __dir ? -1 : 1) *
        evt.distance[props.horizontal === true ? 'y' : 'x'];

      __normalized = Math.min(__maxValue, computedLimits.value[1], Math.max(computedLimits.value[0], val));

      sideRefs[side.value].value!.style[propName.value] = getCSSValue(__normalized);

      if (props.emitImmediately === true && props.modelValue !== __normalized) {
        emit('update:modelValue', __normalized);
      }
    }

    const sepDirective = computed<DirectiveArguments>(() => {
      return [[
        TouchPan,
        pan,
        '',
        {
          [props.horizontal === true ? 'vertical' : 'horizontal']: true,
          prevent: true,
          stop: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });

    return {
      rootRef,
      classes,
      sideRefs,
      sepDirective,
      styles
    };
  },

  render () {
    const {
      classes,
      sepDirective,
      horizontal,
      disable,
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
          style= {this.styles.before}
        >
          {$slots.before && $slots.before()}
        </div>

        <div
          class={[
            'etool-splitter__separator'
          ]}
          {...{
            'aria-disabled': disable === true ? 'true' : void 0
          }}
        >
          {
            disable
              ? h('div', {
                class: [
                  'etool-splitter__separator-area absolute'
                ]
              }, [
                $slots.separator && $slots.separator()
              ])
              : withDirectives(
                h('div', {
                  class: [
                    'etool-splitter__separator-area absolute'
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
            'ettol-splitter__panel etool-splitter__after',
            'flex-1',
            horizontal === true ? 'h-auto min-h-0 max-h-full' : 'w-auto min-w-0 max-w-full'
          ]}
          ref={this.sideRefs.after}
          style= {this.styles.after}
        >
          {$slots.after && $slots.after()}
        </div>
      </div>
    );
  }
});
