<template>
  <div v-bind="$attrs" :class="classNames">
    <div class="Progress__bg" />
    <div class="Progress__in" :style="{ width: `${value > 100 ? 100 : value}%` }" />
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Progress');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style>
@import './Progress.css';
</style>