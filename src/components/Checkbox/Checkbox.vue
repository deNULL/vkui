<template>
  <Tappable
    component="label"
    :class="classNames" 
    :disabled="$attrs.disabled"
    :activeEffectDelay="isIOS ? 100 : ACTIVE_EFFECT_DELAY"
  >
    <input v-bind="$attrs" :checked="value" @change="changeHandler" type="checkbox" class="Checkbox__input" />
    <div class="Checkbox__container">
      <div class="Checkbox__icon"><vkui-icon name="done" size="16" /></div>
      <div class="Checkbox__content"><slot></slot></div>
    </div>
  </Tappable>
</template>

<script>
import Tappable, { ACTIVE_EFFECT_DELAY } from '../Tappable/Tappable';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import {platform, IOS} from '../../lib/platform';
// import Icon16Done from '@urapywka/vkui-icons/dist/16/done'; // TODO разделить иконки на отдельные компоненты

const osname = platform();
const baseClassName = getClassName('Checkbox');

export default {
  props: ["value"],
  computed: {
    isIOS () {
      return osname === IOS;
    },
    classNames () {
      return classnames(baseClassName);
    },
    ACTIVE_EFFECT_DELAY () {
      return ACTIVE_EFFECT_DELAY
    }
  },
  components: {
    Tappable,
  },
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style>
@import './Checkbox.css';
</style>