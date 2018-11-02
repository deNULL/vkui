<template>
  <div
    v-bind="$attrs"
    :class="classNames"
    :style="{ position: state.position, top: state.top, paddingBottom }"
  >
    <div class="FixedLayout__in"><slot></slot></div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import { transitionEndEventName, transitionStartEventName } from '../VKView/VKView';
import { tabbarHeight } from '../../appearance/constants';

const baseClassName = getClassName('FixedLayout');

export default {
  data: () => ({
    state: {
      position: null,
      top: null
    },
    paddingBottom: null,
  }),
  inject: {
    hasTabbar: {
      type: Boolean,
      default: false,
    },
    insets: {
      type: Object,
      default: () => {[]}
    },
    document: {
      default: document,
    },
    panel: {
      type: String,
      default: '',
    }
  },
  computed: {
    classNames () {
      return classnames(baseClassName, {
        [`FixedLayout--${this.vertical}`]: this.vertical
      })
    },
  },
  props: {
    vertical: {
      type: String,
      required: false,
      default: 'top',
      validator: (v) => ['top', 'bottom'].indexOf(v) >= 0
    },
  },
  created () {
    const tabbarPadding = this.hasTabbar ? this.tabbarHeight : 0;
    this.paddingBottom = this.vertical === 'bottom' && this.insets && this.insets.bottom
      ? this.insets.bottom + tabbarPadding
      : null;
  },
  mounted () {
    this.document.addEventListener(transitionStartEventName, this.onViewTransitionStart);
    this.document.addEventListener(transitionEndEventName, this.onViewTransitionEnd);
  },
  beforeDestroy () {
    this.document.removeEventListener(transitionStartEventName, this.onViewTransitionStart);
    this.document.removeEventListener(transitionEndEventName, this.onViewTransitionEnd);
  },
  methods: {
    onViewTransitionStart (e) {
      let panelScroll = e.detail.scrolls[this.panel] || 0;
      this.state = Object.assign({}, this.state, {
        position: 'absolute',
        top: this.$el.offsetTop + panelScroll
      });
    },
    onViewTransitionEnd () {
      this.state = Object.assign({}, this.state, {
        position: null,
        top: null
      });
    },
  }
}
</script>

<style>
@import './FixedLayout.css';
</style>