<template>
  <div v-bind="$attrs" :class="classNames">
    <Touch :onStart="onStart" :onMoveX="onMoveX" :onEnd="onEnd" class="Slider__in">
      <div class="Slider__dragger" :style="{ width: (state.percentEnd - state.percentStart) + '%', left: state.percentStart + '%' }">
        <span :class="getThumbClass('start')" ref="start" />
        <span :class="getThumbClass('end')" ref="end" />
      </div>
    </Touch>
  </div>
</template>

<script>
import Slider from '../Slider/Slider';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Slider');

export default {
  extends: Slider,
  props: {
    value: {
      type: Array,
    },
    defaultValue: {
      type: Array,
    },
  },
  watch: {
    value: function(val, oldVal) {
      if (this.isControlledOutside) {
        this.state = Object.assign({}, this.state, this.validatePercentRange(this.valueToPercentRange(val)));
      }
    },
  },
  methods: {
    getThumbClass(kind) {
      return classnames('Slider__thumb', 'Slider__thumb--' + kind, {
        'Slider__thumb--active': this.state.active === kind
      });
    },
    onStart (e) {
      const absolutePosition = this.validateAbsolute(e.startX - this.state.containerLeft);
      const percentPosition = this.absoluteToPercent(absolutePosition);
      const percentRange = this.calcPercentRange(percentPosition);

      this.onChangeMethod(this.percentRangeToValue(percentRange));

      if (this.isControlledOutside) {
        this.state.startX = absolutePosition;
      } else {
        this.state = Object.assign({}, this.state, {
          startX: absolutePosition,
          ...percentRange
        });
      }

      const thumb = e.originalEvent.target.closest('.Slider__thumb');
      if (thumb === this.$refs.start) {
        this.state.active = 'start';
      } else if (thumb === this.$refs.end) {
        this.state.active = 'end';
      }
    },

    onMoveX (e) {
      const absolutePosition = this.validateAbsolute(this.state.startX + (e.shiftX || 0));
      const percentPosition = this.absoluteToPercent(absolutePosition);
      const percentRange = this.calcPercentRange(percentPosition);

      this.onChangeMethod(this.percentRangeToValue(percentRange));

      if (!this.isControlledOutside) {
        this.state = Object.assign({}, this.state, {
          ...percentRange
        });
      }

      e.originalEvent.preventDefault();
    },

    calcPercentRange (percent) {
      const {percentStart, percentEnd} = this.state;

      if (percentStart === 100) {
        return {percentStart: percent, percentEnd};
      } else if (percentEnd === 0) {
        return {percentEnd: percent, percentStart};
      } else if (Math.abs(percentStart - percent) <= Math.abs(percentEnd - percent)) {
        return {percentStart: percent, percentEnd};
      } else {
        return {percentEnd: percent, percentStart};
      }
    },

    validatePercentRange ({ percentStart, percentEnd }) {
      return {
        percentStart: this.validatePercent(percentStart),
        percentEnd: this.validatePercent(percentEnd)
      };
    },

    percentRangeToValue ({ percentStart, percentEnd }) {
      return [this.percentToValue(percentStart), this.percentToValue(percentEnd)];
    },

    valueToPercentRange ([valueStart, valueEnd]) {
      return {
        percentStart: this.valueToPercent(valueStart),
        percentEnd: this.valueToPercent(valueEnd)
      };
    },


  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize(() => {
      this.state = Object.assign({}, this.state, this.validatePercentRange(this.valueToPercentRange(this.state.value)));
    });
  },
  created() {
    this.isControlledOutside = typeof this.value != 'undefined';

    if (this.isControlledOutside) {
      this.state.value = this.value;
    } else if (typeof this.defaultValue != 'undefined') {
      this.state.value = this.defaultValue;
    } else {
      this.state.value = [this.min, this.max];
    }
    this.state = Object.assign({}, this.state, this.validatePercentRange(this.valueToPercentRange(this.state.value)));
  },
}
</script>