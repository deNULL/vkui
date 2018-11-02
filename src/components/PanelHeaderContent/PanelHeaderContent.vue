<template>
  <div :class="classNames" v-bind="rootProps">
    <div class="PanelHeaderContent__before" v-if="isANDROID && !!$slots.before">
      <slot name="before"></slot>
    </div>
    <component :is="inComponent" v-bind="inProps" class="PanelHeaderContent__in" @click="onClickMethod">
      <div class="PanelHeaderContent__status" v-if="!!$slots.status">
        <slot name="status"></slot>
      </div>
      <div class="PanelHeaderContent__children">
        <span><slot></slot></span>
        <div class="PanelHeaderContent__aside" v-if="!!$slots.aside">
          <slot name="aside"></slot>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import classnames from '../../lib/classnames';
import getClassName from '../../helpers/getClassName';
import { platform, ANDROID } from '../../lib/platform';
import Tappable from '../Tappable/Tappable';

const osname = platform();
const baseClassNames = getClassName('PanelHeaderContent');

export default {
  components: {
    Tappable,
  },
  computed: {
    isANDROID () {
      return osname === ANDROID;
    },
    classNames () {
      return classnames(baseClassNames);
    },
    inComponent () {
      return this.$listeners.click ? 'Tappable' : 'div';
    },
    rootProps () {
      return this.$listeners.click ? {} : this.$attrs;
    },
    inProps () {
      return this.$listeners.click ? Object.assign({}, this.$attrs, {activeEffectDelay: 200}) : {};
    },
  },
  methods: {
    onClickMethod (e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style>
@import './PanelHeaderContent.css'
</style>