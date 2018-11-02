<template>
  <div :class="classNames"><slot></slot></div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassName = getClassName('List');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName);
    }
  }
}
</script>

<style>
@import './List.css';
</style>