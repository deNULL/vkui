<template>
  <div :class="classNames">
    <div class="Search__container">
      <div class="Search__before">
        <vkui-icon name="search" size="24" v-if="theme === 'default'"/>
        <HeaderButton @click="$emit('close')" v-else-if="theme === 'header'">
          <vkui-icon name="back" size="24"/>
        </HeaderButton>
      </div>

      <div class="Search__control">
        <input
          class="Search__input"
          v-bind="inputProps"
          ref="inputEl"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
      </div>

      <div class="Search__after" v-if="value">
        <vkui-icon name="cancel" size="24" @click="cancel" v-if="theme === 'default'"/>
        <HeaderButton @click="cancel" v-else-if="theme === 'header'">
          <vkui-icon name="cancel" size="24"/>
        </HeaderButton>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderButton from '../HeaderButton/HeaderButton';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Search');
let searchId = 0;

export default {
  components: {
    HeaderButton
  },
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
        'Search--has-value': this.value
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
        ...inputProps
      } = this.$attrs;
      return inputProps;
    }
  },
  methods: {
    cancel() {
      this.$emit('input', '')
    },
  },
  created() {
    searchId++;
  },
  mounted() {
    if (this.theme === 'header' && this.$refs.inputEl) {
      this.$refs.inputEl.focus();
    }
  }
}
</script>

<style>
@import './SearchAndroid.css'
</style>