<template>
  <div v-bind="$attrs" :class="classNames"><slot></slot></div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Tabs');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName, {
        [`Tabs--${this.theme}`]: true,
        [`Tabs--${this.type}`]: true
      })
    },
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: 'light',
      validator: (v) => ['light', 'header'].indexOf(v) >= 0
    },
    type: {
      type: String,
      required: false,
      default: 'default',
      validator: (v) => ['default', 'buttons'].indexOf(v) >= 0
    },
  },
}
</script>

<style>
@import './Tabs.css';
</style>