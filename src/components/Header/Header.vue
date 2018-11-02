<template>
  <div ref="getRootRef" :class="classNames">
    <div class="Header__in">
      <div class="Header__content"><slot></slot></div>
      <div class="Header__aside" v-if="!!$slots.aside"><slot name='aside'></slot></div>
    </div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Header');

export default {
  props: {
    level: {
      type: String,
      required: false,
      default: '1',
      validator: (v) => ['1', '2'].indexOf(v) >= 0
    },
    getRootRef: {
      type: Function,
      required: false,
      default: undefined
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassName, {
        [`Header--level-${this.level}`]: this.level,
      });
    }
  }
}
</script>

<style>
@import './Header.css';
</style>