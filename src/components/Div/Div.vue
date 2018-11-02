<template>
  <div v-bind="$attrs" ref="getRootRef" :class="classNames">
    <slot></slot>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Div');

export default {
  props: {
    getRootRef: {
      type: Function,
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassNames);
    }
  }
}
</script>

<style>
@import './Div.css'
</style>