<template>
  <div :class="classNames" v-bind="$attrs"><slot></slot></div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('FormLayoutGroup');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
}
</script>

<style>
@import './FormLayoutGroup.css';
</style>