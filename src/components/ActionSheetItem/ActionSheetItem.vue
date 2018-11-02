<template>
  <Tappable
    v-bind="$attrs"
    :class="classNames"
    :component="theme === 'cancel' ? 'span' : 'div'"
    v-on="$listeners"
  >
    <span class="ActionSheetItem__in"><slot></slot></span>
  </Tappable>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import Tappable from '../Tappable/Tappable'

const baseClassNames = getClassName('ActionSheetItem');

export default {
  props: {
    theme: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'destructive', 'cancel'].indexOf(v) >= 0
    },
    autoclose: {
      type: Boolean,
    }
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, { [`ActionSheetItem--${this.theme}`]: true });
    },
  },
  components: {
    Tappable,
  },
}
</script>