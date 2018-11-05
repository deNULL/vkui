<template>
  <div v-bind="$attrs" :class="classNames">
    <Touch :onStart="onStart" :onMoveX="onMoveX" :onEnd="onEnd" class="Slider__in">
      <div class="Slider__dragger" :style="{ width: this.state.percentPosition + '%' }">
        <span :class="thumbClassNames" />
      </div>
    </Touch>
  </div>
</template>

<script>
import Touch from '../Touch/Touch';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Slider');

function precisionRound (number, precision) {
  let factor = Math.pow(10, precision || 1);
  return Math.round(number * factor) / factor;
}

export default {
  data: () => ({
    state: {
      startX: 0,
      value: 0,
      percentPosition: 0,
      containerLeft: 0,
      containerWidth: 0,
      active: false,
    },
    isControlledOutside: false,
  }),
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
    thumbClassNames () {
      return classnames('Slider__thumb', 'Slider__thumb--end', {
        'Slider__thumb--active': this.state.active
      });
    }
  },
  components: {
    Touch,
  },
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
    },
    defaultValue: {
      type: Number,
    },
    step: {
      type: Number,
      default: 0,
    },
    onChange: {
      type: Function,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    value: function(val, oldVal) {
      if (this.isControlledOutside) {
        this.state.percentPosition = this.validatePercent(this.valueToPercent(val));
      }
    },
  },
  created() {
    this.isControlledOutside = typeof this.value != 'undefined';

    if (this.isControlledOutside) {
      this.state.value = this.value;
    } else if (typeof this.defaultValue != 'undefined') {
      this.state.value = this.defaultValue;
    } else {
      this.state.value = this.min;
    }
    this.state.percentPosition = this.validatePercent(this.valueToPercent(this.state.value));
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize(() => {
      this.state.percentPosition = this.validatePercent(this.valueToPercent(this.state.value));
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onStart (e) {
      const absolutePosition = this.validateAbsolute(e.startX - this.state.containerLeft);
      const percentPosition = this.absoluteToPercent(absolutePosition);

      this.onChangeMethod(this.percentToValue(percentPosition));

      if (this.isControlledOutside) {
        this.state.startX = absolutePosition;
      } else {
        this.state = Object.assign({}, this.state, {
          startX: absolutePosition,
          percentPosition
        });
      }

      this.state.active = !!e.originalEvent.target.closest('.Slider__thumb');
    },

    onMoveX (e) {
      const absolutePosition = this.validateAbsolute(this.state.startX + (e.shiftX || 0));
      const percentPosition = this.absoluteToPercent(absolutePosition);

      this.onChangeMethod(this.percentToValue(percentPosition));

      if (!this.isControlledOutside) {
        this.state.percentPosition = percentPosition;
      }

      e.originalEvent.preventDefault();
    },

    onEnd () {
      this.state.active = false;
    },

    onResize (callback) {
      this.state = Object.assign({}, this.state, {
        containerLeft: this.$el.offsetLeft,
        containerWidth: this.$el.offsetWidth
      }, () => {
        typeof callback === 'function' && callback();
      });
    },

    onChangeMethod (value) {
      this.onChange && this.onChange(value);
      this.$emit("input", value);
    },

    validateAbsolute (absolute) {
      let res = Math.max(0, Math.min(absolute, this.state.containerWidth));

      if (this.step > 0) {
        const stepCount = (this.max - this.min) / this.step;
        const absStep = this.state.containerWidth / stepCount;

        res = Math.round(res / absStep) * absStep;
      }

      return res;
    },

    validatePercent (percent) { return Math.max(0, Math.min(percent, 100)); },

    absoluteToPercent (absolute) { return absolute * 100 / this.state.containerWidth; },

    percentToValue (percent) {
      const res = percent * (this.max - this.min) / 100 + this.min;
      if (this.step > 0) {
        const stepFloatPart = `${this.step}`.split('.')[1] || '';
        return precisionRound(res, stepFloatPart.length);
      }
      return res;
    },

    valueToPercent (value) { return (value - this.min) * 100 / (this.max - this.min); },
  }
}
</script>

<style>
@import './Slider.css';
</style>