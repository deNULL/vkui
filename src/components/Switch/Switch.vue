<template>
  <label :class="classNames">
    <input v-bind="$attrs" :checked="value" @change="changeHandler" type="checkbox" class="Switch__self" ref="getRef" />
    <span class="Switch__pseudo" />
  </label>
</template>

<script>
// TODO добавить поддержку массивов чекбоксов.
// Подсмотреть можно тут: https://www.smashingmagazine.com/2017/08/creating-custom-inputs-vue-js/

import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Switch');

export default {
	props: ["value"],
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  methods: {
  	changeHandler () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style>
@import './Switch.css';
</style>