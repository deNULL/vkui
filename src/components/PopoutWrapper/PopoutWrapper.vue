<template>
  <div v-bind="$attrs" :class="classNames" @click="onClickMethod">
    <div class="PopoutWrapper__mask" v-if="hasMask"></div>
    <div class="PopoutWrapper__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import { platform, ANDROID } from '../../lib/platform';
import transitionEvents from '../../lib/transitionEvents';

const osname = platform();

const baseClassNames = getClassName('PopoutWrapper');

export default {
  data: () => ({
    animationFinishTimeout: null,
    state: {
      opened: false
    },
  }),
  props: {
    hasMask: {
      type: Boolean,
      default: true,
    },
    closing: {
      type: Boolean,
      default: false,
    },
    v: {
      type: String,
      default: 'center',
      validator: (v) => ['top', 'center', 'bottom'].indexOf(v) >= 0
    },
    h: {
      type: String,
      default: 'center',
      validator: (v) => ['left', 'center', 'right'].indexOf(v) >= 0
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, {
        [`PopoutWrapper--v-${this.v}`]: this.v,
        [`PopoutWrapper--h-${this.h}`]: this.h,
        'PopoutWrapper--closing': this.closing
      });
    },
    isANDROID () {
      return osname === ANDROID;
    },
  },
  mounted () {
    window.addEventListener('touchmove', this.preventTouch, { passive: false });
    this.waitAnimationFinish(this.$el, this.onFadeInEnd);
  },
  beforeDestroy() {
    window.removeEventListener('touchmove', this.preventTouch, { passive: false });
    clearTimeout(this.animationFinishTimeout);
  },
  methods: {
    waitAnimationFinish (elem, eventHandler) {
      if (transitionEvents.supported) {
        const eventName = transitionEvents.prefix ? transitionEvents.prefix + 'AnimationEnd' : 'animationend';
        elem.removeEventListener(eventName, eventHandler);
        elem.addEventListener(eventName, eventHandler);
      } else {
        this.animationFinishTimeout = setTimeout(eventHandler.bind(this), this.isANDROID ? 300 : 600);
      }
    },

    onFadeInEnd (e = { manual: true }) {
      if (e.animationName === 'animation-full-fade-in' || e.manual) {
        this.state = Object.assign({}, this.state, { opened: true });
      }
    },

    preventTouch (e) {
      e.preventDefault();
    },

    onClickMethod (e) {
      this.state.opened && this.$emit('click', e);
    },
    // Тут не нужно?
    // getRef (el) {
    //   this.$el = el;
    // }
  }
}
</script>

<style>
@import './PopoutWrapper.css';
</style>