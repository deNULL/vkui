<template>
  <FixedLayout v-bind="$attrs" :class="classNames" vertical="top">
    <div class="HeaderContext__in" ref="getRef">
      <slot v-if="opened || state.closing"></slot>
    </div>
    <div @click="onClose" v-if="opened || state.closing" class="HeaderContext__fade"></div>
  </FixedLayout>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
import FixedLayout from '../FixedLayout/FixedLayout';
import transitionEvents from '../../lib/transitionEvents';

const baseClassName = getClassName('HeaderContext');

export default {
  data: () => ({
    state: {
      closing: false,
    },
    el: null,
    closeAnimationTimeiout: null,
  }),
  computed: {
    classNames () {
      return classnames(baseClassName, {
        'HeaderContext--opened': this.opened,
        'HeaderContext--closing': this.state.closing
      })
    },
  },
  components: {
    FixedLayout,
  },
  props: {
    onClose: {
      type: Function,
      required: true,
    },
    opened: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  watch: {
    opened: function(val, oldVal) {
      if (val === false) {
        this.state.closing = true;
        this.waitAnimationFinish(this.onAnimationFinish);
      } else {
        clearTimeout(this.closeAnimationTimeiout);
      }
    }
  },
  created () {
    this.$nextTick(function(){
      this.el = this.$refs.getRef;
    });
  },
  beforeDestroy () {
    clearTimeout(this.closeAnimationTimeiout);
  },
  methods: {
    waitAnimationFinish (eventHandler) {
      if (transitionEvents.supported) {
        const eventName = transitionEvents.prefix ? transitionEvents.prefix + 'AnimationEnd' : 'animationend';
        this.el.removeEventListener(eventName, eventHandler);
        this.el.addEventListener(eventName, eventHandler);
      } else {
        this.closeAnimationTimeiout = setTimeout(eventHandler.bind(this), 200);
      }
    },
    onAnimationFinish () {
      this.state.closing = false;
    },
  }
}
</script>

<style>
@import './HeaderContext.css';
</style>