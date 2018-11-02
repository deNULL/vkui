<template>
  <Div v-bind="$attrs" :class="classNames"><slot></slot></Div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import Div from '../Div/Div';

const baseClassName = getClassName('Footer');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  components: {
    Div,
  },
}
</script>

<style>
@import './Footer.css';
</style>