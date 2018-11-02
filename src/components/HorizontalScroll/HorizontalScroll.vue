<template>
  <div v-bind="$attrs" :class="classNames">
    <div class="HorizontalScroll__in"><slot></slot></div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('HorizontalScroll');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
}
</script>

<style>
@import './HorizontalScroll.css';
</style>