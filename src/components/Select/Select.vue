<template>
  <label :class="classNames">
    <select
      @change="onChangeMethod"
      :value="value"
      ref="selectEl"
      v-bind="$attrs"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <slot></slot>
    </select>
    <div class="Select__container">
      <div class="Select__title">{{ state.title }}</div>
      <vkui-icon name="dropdown" size="24" />
    </div>
    <div v-if="isANDROID" class="Select-underline" />
  </label>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
// import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import { platform, ANDROID } from '../../lib/platform';

const osname = platform();
const baseClassName = getClassName('Select');

export default {
  data: () => ({
    state: {
      title: '',
      notSelected: false,
      value: null,
    },
    isControlledOutside: false,
  }),
  computed: {
    isANDROID () {
      return osname === ANDROID;
    },
    classNames () {
      return classnames(baseClassName, {
        [`Select--not-selected`]: this.state.notSelected,
        [`Select--align-${this.alignment}`]: this.alignment
      })
    },
  },
  props: {
    label: {
      type: String,
    },
    onChange: {
      type: Function,
    },
    name: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
    defaultValue: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    alignment: {
      type: String,
      default: 'left',
      validator: (v) => ['left', 'center', 'top'].indexOf(v) >= 0
    }
  },
  watch: {
    value: function(val, oldVal) {
      this.$refs.selectEl.value = val;
      this.setTitle();
    }
  },
  created() {
    if (typeof this.value !== 'undefined') {
      this.isControlledOutside = true;
    } else {
      this.state.value = this.defaultValue || '';
    }
  },
  mounted () {
    this.setTitle();
  },
  methods: {
    onChangeMethod (e) {
      this.setTitle();
      if (!this.isControlledOutside) {
        this.state.value = e.target.value;
      }
      if (this.onChange) {
        this.onChange(e);
      }
      this.$emit("input", e.target.value);
    },

    setTitle () {
      const selectedOption = this.$refs.selectEl.options[this.$refs.selectEl.selectedIndex];
      if(selectedOption) {
        this.state = Object.assign({}, this.state, {
          title: selectedOption.text,
          notSelected: selectedOption.value === '' && !!this.placeholder
        });
      }
    },
  }
}
</script>

<style>
@import './Select.css';
</style>