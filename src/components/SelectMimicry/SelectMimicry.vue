<template>
  <div :class="classNames" v-bind="$attrs">
    <div class="Select__container">
      <div class="Select__title" v-if="!!$slots.default"><slot></slot></div>
      <div class="Select__title" v-else>{{ placeholder }}</div>
      <vkui-icon name="dropdown" size="24" />
    </div>
    <div class="Select-underline" v-if="isANDROID" />
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
import { platform, ANDROID } from '../../lib/platform';

const osname = platform();
const baseClassName = getClassName('Select');

export default {
  data: () => ({
    
  }),
  computed: {
    isANDROID () {
      return osname === ANDROID;
    },
    classNames () {
      return classnames(baseClassName, {
        'Select--not-selected': !this.$slots.default,
        'Select--mimicry': true,
        [`Select--align-${this.alignment}`]: this.alignment
      })
    },
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
    },
    alignment: {
      type: String,
      required: false,
      default: 'left',
      validator: (v) => ['left', 'center', 'top'].indexOf(v) >= 0
    },
  },
}
</script>