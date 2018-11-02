<template>
  <Tappable
    v-bind="$attrs"
    v-on="$listeners"
    :class="classNames"
    :activeEffectDelay="isIOS ? 0 : ACTIVE_EFFECT_DELAY"
  >
    <span class="TabsItem__in"><slot></slot></span>
  </Tappable>
</template>

<script>
import Tappable, {ACTIVE_EFFECT_DELAY} from '../Tappable/Tappable';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import {IOS, platform} from '../../lib/platform';

const osname = platform();
const baseClassName = getClassName('TabsItem');

export default {
  computed: {
    ACTIVE_EFFECT_DELAY () {
      return ACTIVE_EFFECT_DELAY
    },
    isIOS () {
      return osname === IOS;
    },
    classNames () {
      return classnames(baseClassName, {
        'TabsItem--selected': this.selected
      })
    },
  },
  components: {
    Tappable,
  },
  props: {
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
  },
}
</script>

<style>
@import './TabsItem.css';
</style>