<template>
  <Tappable :class="classNames" :stopPropagation="true" v-bind="$attrs" v-on="$listeners">
    <div class="CellButton__in">
      <div class="CellButton__before" v-if="!!$slots.before"><slot name="before"></slot></div>
      <div class="CellButton__content" v-if="!!$slots.default"><slot></slot></div>
    </div>
  </Tappable>
</template>

<script>
import Tappable from '../Tappable/Tappable';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('CellButton');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName, {
        [`CellButton--lvl-${this.level}`]: this.level,
        [`CellButton--aln-${this.align}`]: this.align
      })
    },
  },
  components: {
    Tappable,
  },
  props: {
    level: {
      type: String,
      required: false,
      default: 'primary',
      validator: (v) => ['primary', 'danger'].indexOf(v) >= 0
    },
    align: {
      type: String,
      required: false,
      default: 'left',
      validator: (v) => ['left', 'center', 'right'].indexOf(v) >= 0
    },
  },
}
</script>

<style>
@import './CellButton.css';
</style>