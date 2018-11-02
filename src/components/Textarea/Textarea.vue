<template>
  <div :class="classNames">
    <textarea
      v-bind="$attrs"
      :value="value"
      @change="onChangeMethod"
      @focus="$emit('focus')"
      ref="getRef"
      :style="{ height: height + 'px' }"
    />
    <div v-if="isANDROID" class="Textarea-underline" />
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
import {platform, ANDROID} from '../../lib/platform';
import requestAnimationFrame from '../../lib/requestAnimationFrame';

const osname = platform();
const baseClassName = getClassName('Textarea');

export default {
  data: () => ({
    element: null,
  }),
  computed: {
    isANDROID () {
      return osname === ANDROID
    },
    classNames () {
      return classnames(baseClassName)
    },
  },
  props: {
    value: {
      type: String,
    },
    defaultValue: {
      type: String,
      default: '',
    },
    grow: {
      type: Boolean,
      default: true,
    },
    onChange: {
      type: Function,
    },
    onResize: {
      type: Function,
      default: () => {}
    },
  },
  mounted () {
    if (this.grow) {
      this.resize();
    }
  },
  methods: {
    resize () {
      const el = this.element;

      if (el) {
        const { offsetHeight, scrollHeight } = el;
        const style = window.getComputedStyle(el);
        const paddingTop = parseInt(style.paddingTop);
        const paddingBottom = parseInt(style.paddingBottom);

        let diff = paddingTop + paddingBottom;

        if (scrollHeight + diff <= offsetHeight) {
          diff = 0;
        }

        if (el.value) {
          this.state.height = scrollHeight - diff;
        }

        this.setState({ height: 0 }, () => {
          const height = el.scrollHeight - diff;

          this.setState({ height });

          this.props.onResize(el);
        });
      }
    },
  }
}
</script>

<style>
@import './Textarea.css';
</style>