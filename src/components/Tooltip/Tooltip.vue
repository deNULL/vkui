<template>
  <div>
    <slot/>
    <portal :target-el="portalTarget" targetClass="PopulatedTooltipOutlet">
      <div :class="classNames">
        <div class="Tooltip__container" :style="{ left: x + 'px', top: y + 'px' }">
          <div class="Tooltip__corner" :style="{ [alignX]: (20 + cornerOffset) + 'px' }"/>
          <div class="Tooltip__content">
            <div class="Tooltip__title" v-if="title">{{ title }}</div>
            <div class="Tooltip__text" v-if="text">{{ text }}</div>
          </div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Tooltip');

export default {
  props: {
    text: String,
    title: String,
    alignX: {
      validator: function (value) {
        return ['left', 'right'].indexOf(value) !== -1
      },
      default: 'left',
    },
    alignY: {
      validator: function (value) {
        return ['top', 'bottom'].indexOf(value) !== -1
      },
      default: 'bottom',
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 15,
    },
    cornerOffset: {
      type: Number,
      default: 0,
    },
    isShown: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      fixedPortal: false,
      portalTarget: null,
      coords: null,
    }
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, {
        [`Tooltip--x-${this.alignX}`]: true,
        [`Tooltip--y-${this.alignY}`]: true,
        'Tooltip--fixed': this.fixedPortal
      }, this.className);
    },
    x() {
      if (!this.portalTarget) {
        return 0
      }
      return this.coords.x + this.offsetX + (this.alignX === 'right' ? this.coords.width - this.$el.offsetWidth : 0);
    },
    y() {
      if (!this.portalTarget) {
        return 0
      }
      return this.coords.y + (this.alignY === 'top' ? -this.$el.offsetHeight - this.offsetY : this.coords.height + this.offsetY);
    }
  },
  methods: {
    getPortalTarget() {
      const closestFixed = this.$el.closest('.FixedLayout');
      const closestHeader = this.$el.closest('.PanelHeader');

      if (closestFixed || closestHeader) {
        this.fixedPortal = true;
      }

      const closestPanel = this.$el.closest('.Panel');

      if (closestFixed && closestFixed.getElementsByClassName('FixedLayoutTooltipOutlet').length) {
        return closestFixed.getElementsByClassName('FixedLayoutTooltipOutlet')[0];
      }

      if (closestHeader && closestHeader.getElementsByClassName('PanelHeaderTooltipOutlet').length) {
        return closestHeader.getElementsByClassName('PanelHeaderTooltipOutlet')[0];
      }

      if (closestPanel && closestPanel.getElementsByClassName('PanelTooltipOutlet').length) {
        return closestPanel.getElementsByClassName('PanelTooltipOutlet')[0];
      }
    },
    getBoundingTargetRect () {
      const target = this.$el.childNodes[0];
      const targetBounds = target.getBoundingClientRect();
      const portalBounds = this.portalTarget.getBoundingClientRect();
      console.log(targetBounds, portalBounds);

      return {
        width: targetBounds.width,
        height: targetBounds.height,
        x: targetBounds.x - portalBounds.x,
        y: targetBounds.y - portalBounds.y
      };
    }
  },
  mounted() {
    this.portalTarget = this.getPortalTarget();
    this.coords = this.getBoundingTargetRect();

    this.$nextTick(() => {
      this.coords = this.getBoundingTargetRect();
    })

    /*this.timer = setInterval(() => {
      this.coords = this.getBoundingTargetRect();
    }, 200);*/
  },/*
  beforeDestroy() {
    clearInterval(this.timer);
  },*/
  updated() {
    /*this.$nextTick(() => {
      this.coords = this.getBoundingTargetRect();
    })*/
  }
}
</script>

<style>
@import './Tooltip.css'
</style>