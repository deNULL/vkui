<template>
    <component :is="component" v-bind="$attrs" v-on="$listeners" :class="classNames"><slot></slot></component>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Link');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  props: {
    component: {
      type: String,
      default: 'a',
    },
  },
}
</script>

<style>
@import './Link.css';
</style>