<template>
  <div :class="classNames">
    <div class="Avatar__in">
      <component :is="component"
        v-bind="$attrs"
        class="Avatar__img"
        :src="src"
        :style="{ maxWidth: size + 'px', width: size + 'px', height: size + 'px', borderRadius }"
      ></component>
      <div v-if="!!$slots.default" class="Avatar__children" :style="{ width: size + 'px', height: size + 'px', borderRadius }"><slot></slot></div>
    </div>
  </div>
</template>

<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Avatar');

export default {
  data: () => ({
    component: 'div',
    borderRadius: '50%',
  }),
  props: {
    size: {
      type: Number,
      default: 48,
      validator: (v) => [80, 72, 64, 56, 48, 40, 36, 32, 28].indexOf(v) >= 0
    },
    type: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'image', 'app'].indexOf(v) >= 0
    },
    src: {
      type: String,
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, {
        [`Avatar--type-${this.type}`]: true
      });
    },
  },
  created () {
    this.component = this.src ? 'img' : 'div';
    switch (this.type) {
      case 'default':
        this.borderRadius = '50%';
        break;
      case 'image':
        this.borderRadius = 4 + 'px';
        break;
      case 'app':
        this.borderRadius = Math.floor(this.size * 10 / 48) + 'px';
        break;
    }
  }
}
</script>

<style>
@import './Avatar.css';
</style>