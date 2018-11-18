<template>
  <div :class="classNames">
    <input
      v-bind="$attrs"
      class="Input__el"
      ref="input"
      :placeholder="customPlaceholder ? null : placeholder"
      :value="value"
      :type="type"
      @input="changeHandler"
      @focus="focusHandler"
    />
    <div class="Input-underline" v-if="isANDROID"></div>
    <div class="Input__placeholder" v-if="customPlaceholder && !value">{{ placeholder }}</div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
import {platform, ANDROID} from '../../lib/platform';

const osname = platform();
const baseClassName = getClassName('Input');

export default {
  data: () => ({

  }),
  inject: {
    isWebView: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    isANDROID () {
      return osname === ANDROID
    },
    classNames () {
      const modifiers = {
        'Input--left': this.alignment === 'left',
        'Input--center': this.alignment === 'center',
        'Input--right': this.alignment === 'right',
        [`Input--s-${this.status}`]: true
      };
      return classnames(baseClassName, modifiers)
    },
    customPlaceholder () {
      return ['date', 'datetime-local', 'time', 'month'].indexOf(this.type) > -1 && this.isWebView ? this.placeholder : null;
    }
  },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      required: false,
      default: 'text',
      validator: (v) => [
        'text', 'password',
        'date', 'datetime-local', 'time', 'month',
        'email', 'number', 'tel', 'url'
      ].indexOf(v) >= 0
    },
    alignment: {
      type: String,
      required: false,
      default: 'left',
      validator: (v) => ['left', 'center', 'right'].indexOf(v) >= 0
    },
    placeholder: {
      type: String,
    },
    status: {
      type: String,
      required: false,
      default: 'default',
      validator: (v) => ['default', 'error', 'verified'].indexOf(v) >= 0
    },
  },
  methods: {
    changeHandler () {
      this.$emit('input', this.$refs.input.value)
    },
    focusHandler (e) {
      this.$emit('focus', e)
    }
  }
}
</script>

<style>
@import './Input.css';
</style>
