<template>
  <div :class="classNames" v-bind="$attrs">
    <div class="Panel__in" :style="panelInStyles">
      <div class="Panel__in-before"></div>
        <slot></slot>
      <div class="Panel__in-after"></div>
      <div class="PanelTooltipOutlet" style="position: absolute"></div>
    </div>
  </div>
</template>

<script>
import classnames from '../../lib/classnames';
import getClassName from '../../helpers/getClassName';
import { tabbarHeight } from '../../appearance/constants';

const baseClassNames = getClassName('Panel');

export default {
  provide () {
    return {
      panel: this.$attrs.id,
    }
  },
  inject: {
    insets: {
      type: Object,
      default: {}
    },
    hasTabbar: {
      type: Boolean,
      default: false,
    }
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: 'gray',
      validator: (v) => ['white', 'gray'].indexOf(v) >= 0
    },
    // TODO нужно ли? Во VUE не нужно..
    optimized: {
      type: Boolean,
      default: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    /**
     * @ignore
     */
    isPrev: {
      type: Boolean,
    },
    /**
     * @ignore
     */
    isNext: {
      type: Boolean,
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, {
        'Panel--centered': this.centered,
        [`Panel--tm-${this.theme}`]: this.theme
      })
    },
    panelInStyles () {
      const tabbarPadding = this.hasTabbar ? tabbarHeight : 0;
      return {
        paddingBottom: this.insets && this.insets.bottom ? this.insets.bottom + tabbarPadding : null,
        // paddingTop: this.insets.top + 'px' || null
      }

    }
  },
}
</script>

<style>
@import './Panel.css'
</style>