<template>
  <div>
    <portal :to="'header-bg-' + panel" v-if="state.ready">
      <div :class="panelHeaderBgClassNames"></div>
    </portal>
    <portal :to="'header-left-' + panel" v-if="state.ready">
      <div :class="panelHeaderLeftClassNames"><slot name="left"></slot></div>
    </portal>
    <portal :to="'header-addon-' + panel" v-if="state.ready && isIOS">
      <div :class="panelHeaderAddonClassNames"><slot name="addon"></slot></div>
    </portal>
    <portal :to="'header-title-' + panel" v-if="state.ready">
      <div :class="panelHeaderContentClassNames">
        <span v-if="isPrimitive && !!$slots.children"><slot name="children"></slot></span>
        <span v-else-if="isPrimitive"><slot></slot></span>
        <slot v-else-if="!!$slots.children"><slot name="children"></slot></slot>
        <slot v-else></slot>
      </div>
    </portal>
    <portal :to="'header-right-' + panel" v-if="state.ready && webviewType === 'internal'">
      <div :class="panelHeaderRightClassNames"><slot name="right"></slot></div>
    </portal>
  </div>
</template>

<script>
import classnames from '../../lib/classnames';
import getClassName from '../../helpers/getClassName';
import { platform, IOS } from '../../lib/platform';

const osname = platform();

export const baseClassNames = getClassName('PanelHeader');

export default {
  inject: {
    panel: {
      type: String,
      default: '',
    },
    document: {
      default: document,
    },
    webviewType: {
      default: 'vkapps'
    }
  },
  data: () => ({
    state: {
      ready: false,
      rightWidth: null,
      leftWidth: null
    }
  }),
  props: {
    theme: {
      type: String,
      required: false,
      default: 'brand',
      validator: (v) => ['alternate', 'brand'].indexOf(v) >= 0
    },
    noShadow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isIOS () {
      return osname === IOS;
    },
    isPrimitive () {
      // return typeof this.$slots.default[0]["text"] !== 'undefined' || typeof this.$slots.children[0]["text"] !== 'undefined';
      return typeof this.$slots.default[0]["text"] !== 'undefined';
    },
    panelHeaderBgClassNames () {
      return classnames('PanelHeader-bg', {
        [`PanelHeader-bg--${this.theme}`]: true,
        [`PanelHeader-bg--no-shadow`]: this.noShadow
      });
    },
    panelHeaderLeftClassNames () {
      return classnames('PanelHeader-left-in', {
        [`PanelHeader-left-in--${this.theme}`]: true
      });
    },
    panelHeaderAddonClassNames () {
      return classnames('PanelHeader-addon', {
        [`PanelHeader-addon--${this.theme}`]: true
      });
    },
    panelHeaderContentClassNames () {
      return classnames('PanelHeader-content', {
        [`PanelHeader-content--${this.theme}`]: true
      });
    },
    panelHeaderRightClassNames () {
      return classnames('PanelHeader-right', {
        [`PanelHeader-right--${this.theme}`]: true,
        'PanelHeader-right--vkapps': this.webviewType === 'vkapps'
      });
    },
  },
  created() {
    // console.log(this.$slots.default)
  },
  mounted () {
    this.state.ready = true;
  },
}
</script>

<style>
@import './PanelHeader.css';
@import './PanelHeaderTransitions.css';
</style>