<template>
  <g
    :style="{
      width: size + 'px',
      height: size + 'px',
      transformOrigin: (0.5 * size) + 'px ' + (0.5 * size) + 'px',
      transform: transform
    }"
  >
    <v-style>{{ animation }}</v-style>
    <circle
      class="Spinner__path"
      fill="none"
      :strokeDasharray="offset"
      :strokeDashoffset="dashoffset"
      :strokeWidth="strokeWidth"
      :style="{
        animationName: on ? 'dash' + id : 'none',
        animationTimingFunction: 'ease-in-out',
        animationDuration: duration + 's',
        animationIterationCount: 'infinite'
      }"
      :cx="0.5 * size"
      :cy="0.5 * size"
      :r="0.5 * size - 0.5 * strokeWidth"
    />
  </g>
</template>

<script>
import keyframes from '../../lib/keyframes';

export default {
  components: {
    'v-style': {
      render: function (createElement) {
        return createElement('style', this.$slots.default)
      }
    }
  },
  data: () => ({
    dashoffset: null,
    transform: null,
  }),
  computed: {
    c () {
      return 0.5 * this.size
    },
    id () {
      return Math.round(Math.random() * 1e6).toString(16)
    },
    offset () {
      return Math.round(Math.PI * this.size)
    },
    animation () {
      return keyframes('dash' + this.id, {
        '0%': {
          'stroke-dashoffset': this.offset
        },
        '50%': {
          'stroke-dashoffset': Math.round(0.25 * this.offset),
          'transform': 'rotate(135deg)'
        },
        '100%': {
          'stroke-dashoffset': this.offset,
          'transform': 'rotate(360deg)'
        }
      })
    },
  },
  props: {
    size: {
      type: Number,
      default: 38,
    },
    strokeWidth: {
      type: Number,
      default: 4,
    },
    duration: {
      type: Number,
      default: 1.4,
    },
    on: {
      type: Boolean,
      default: true
    },
    progress: {
      type: Number,
      default: null,
    },
  },
  created () {
    this.dashoffset = this.offset;
    this.transform = '';

    if (!this.on) {
      this.dashoffset = Math.abs(0.02 * (this.progress - 50) * 0.75 * this.offset) + 0.25 * this.offset;

      if (this.progress <= 50) {
        this.transform = `rotate(${Math.round(this.progress * 135 / 50)}deg)`;
      } else {
        this.transform = `rotate(${135 + Math.round((this.progress - 50) * 360 / 50)}deg)`;
      }
    }
  }
}
</script>