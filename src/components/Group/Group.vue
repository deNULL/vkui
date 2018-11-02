<template>
  <div ref="getRootRef" :class="classNames">
    <Header level="2" v-if="!!title">
      {{ title }}
    </Header>
    <div class="Group__content"><slot></slot></div>
    <div class="Group__description" v-if="!!description">{{ description }}</div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import Header from '../Header/Header';

const baseClassName = getClassName('Group');

export default {
  components: {
    Header
  },
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    description: {
      type: String,
      required: false,
      default: null
    },
    getRootRef: {
      type: Function,
      required: false,
      default: undefined
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassName);
    }
  }
}
</script>

<style>
@import './Group.css';
</style>