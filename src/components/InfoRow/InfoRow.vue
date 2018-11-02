<template>
  <div v-bind="$attrs" :class="classNames">
    <div v-if="title" class="InfoRow__title">{{ title }}</div>
    <div v-else-if="!!$slots.title" class="InfoRow__title"><slot name="title"></slot></div>
    <div v-if="!!$slots.default"><slot></slot></div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('InfoRow');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName);
    },
  },
  props: {
    title: {
      type: String,
    },
  },
}
</script>

<style>
@import './InfoRow.css';
</style>