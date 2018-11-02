<template>
  <div :class="classNames">
    <svg
      class="Spinner__self"
      :style="{ width: size + 'px', height: size + 'px' }"
      :viewBox="`0 0 ${size} ${size}`"
      xmlns="http://www.w3.org/2000/svg"
    >
      <component :is="component" v-bind="Object.assign({}, $attrs, $props)" />
    </svg>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
import { platform, ANDROID, IOS } from '../../lib/platform';
import AndroidSpinner from './AndroidSpinner';
import IosSpinner from './IosSpinner';

const osname = platform();
const baseClassName = getClassName('Spinner');

export default {
  computed: {
    isIOS () {
      return osname === IOS
    },
    isANDROID () {
      return osname === ANDROID
    },
    classNames () {
      const modifiers = {
        'Spinner--on': this.isAnimated
      };
      return classnames(baseClassName, modifiers)
    },
    isAnimated () {
      return this.on && this.progress === null;
    },
    component () {
      return this.isIOS ? 'IosSpinner' : 'AndroidSpinner';
    },
  },
  components: {
    AndroidSpinner,
    IosSpinner,
  },
  props: {
    size: {
      type: Number,
      default: function() { return this.isANDROID ? 38 : 20 },
    },
    androidStrokeWidth: {
      type: Number,
      default: 4,
    },
    on: {
      type: Boolean,
      default: true,
    },
    progress: {
      type: Number,
      default: null
    },
  },
}
</script>

<style>
@import './Spinner.css';
</style>