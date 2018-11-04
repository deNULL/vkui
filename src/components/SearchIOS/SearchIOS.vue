<template>
  <div :class="classNames">
    <div class="Search__in">
      <div class="Search__width" />
        <div class="Search__control">
          <input
            :id="`search-${searchId}`"
            v-bind="inputProps"
            ref="inputEl"
            type="text"
            class="Search__input"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="onFocus"
            @blur="onBlur"
          />
          <div class="Search__after-width" v-if="$scopedSlots.after">
            <slot name="after"></slot>
          </div>
          <div class="Search__after-width" v-else>
            Отменить
          </div>
          <label class="Search__placeholder" :for="`search-${searchId}`">
            <div class="Search__placeholder-in">
              <vkui-icon name="search" size="16" />
              <div class="Search__placeholder-text">
                {{ placeholder }}
              </div>
            </div>
          </label>
        </div>
        <div class="Search__after" @click="cancel">
          <div class="Search__after-in" v-if="$scopedSlots.after">
            <slot name="after"></slot>
          </div>
          <div class="Search__after-in" v-else>
            Отменить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Search');
let searchId = 0;

export default {
  props: {
    className: String,
    value: String,
    placeholder: {
      type: String,
      default: 'Поиск',
    },
    theme: {
      validator: function (value) {
        return ['header', 'default'].indexOf(value) !== -1
      },
      default: 'default',
    },
  },
  data: function() {
    return {
      isFocused: false,
      isControlledOutside: false,
    }
  },
  computed: {
    classNames() {
      return classnames(baseClassNames, {
        [`Search--${this.theme}`]: true,
        'Search--focused': this.isFocused,
        'Search--has-value': this.value,
        'Search--has-after': this.$scopedSlots.after
      }, this.className);
    },
    searchId() {
      return searchId;
    },
    inputProps() {
      const {
        className,
        theme,
        value,
        placeholder,
        after,
        ...inputProps
      } = this.$attrs;
      return inputProps;
    }
  },
  methods: {
    cancel() {
      this.$emit('input', '')
    },
    onFocus(event) {
      this.isFocused = true
      this.$emit('focus', event.target.value)
    },
    onBlur() {
      this.isFocused = false
      this.$emit('blur', event.target.value)
    }
  },
  created() {
    searchId++;
  }
}
</script>

<style>
@import './SearchIOS.css'
</style>