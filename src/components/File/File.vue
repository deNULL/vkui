<template>
  <Button
    :align="align"
    :class="classNames"
    component="label"
    :type="type"
    :stretched="stretched"
    :level="level"
    :size="size"
  >
    <slot slot="before" name="before" v-if="!!$slots.before"></slot>
    <input v-bind="$attrs" class="File__input" type="file"/>
    <slot>Выберите файл</slot>
  </Button>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import Button from '../Button/Button';

const baseClassName = getClassName('Button');

export default {
  data: () => ({
    state: {
      value: null,
    }
  }),
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  components: {
    Button,
  },
  props: {
    level: {
      type: String,
    },
    size: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    align: {
      type: String,
      required: false,
      default: 'left',
    },
    stretched: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style>
@import './File.css';
</style>