<template>
  <div :class="classNames" :style="{ paddingBottom: this.insets && this.insets.bottom + 'px' || null }">
    <slot></slot>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Tabbar');

export default {
  inject: {
    insets: {
      type: Object,
      default: {}
    }
  },
  computed: {
    classNames () {
      return classnames(baseClassName, {
        'Tabbar--shadow': this.shadow
      })
    },
  },
  props: {
    /**
     * флаг для показа/скрытия верхней тени (Android) или границы (iOS)
     */
    shadow: {
      type: Boolean,
      required: false,
      default: true
    },
  },
}
</script>

<style>
@import './Tabbar.css';
</style>