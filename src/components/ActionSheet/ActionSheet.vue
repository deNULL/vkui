<template>
  <PopoutWrapper
    :closing="state.closing"
    :v="isIOS ? 'bottom' : 'center'"
    h="center"
    @click="onCloseMethod"
  >
    <div v-bind="$attrs" ref="getRef" @click="stopPropagation" :class="classNames">
      <header class="ActionSheet__header" v-if="isIOS">
        <div class="ActionSheet__title" v-if="!!$slots.title"><slot name="title"></slot></div>
        <div class="ActionSheet__text" v-if="!!$slots.text"><slot name="text"></slot></div>
      </header>
      <slot></slot>
    </div>
  </PopoutWrapper>
</template>

<script>
import PopoutWrapper from '../PopoutWrapper/PopoutWrapper';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import { platform, ANDROID, IOS } from '../../lib/platform';
import transitionEvents from '../../lib/transitionEvents';

const osname = platform();

const baseClassNames = getClassName('ActionSheet');

export default {
  data: () => ({
    state: {
      closing: false
    },
    el: null,
  }),
  props: {
    onClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, {
        'ActionSheet--closing': this.state.closing
      });
    },
    isIOS () {
      return osname === IOS;
    },
    isANDROID () {
      return osname === ANDROID;
    },
  },
  components: {
    PopoutWrapper,
  },
  created () {
    this.$slots.default.map((child, i) => {
      // onClick: this.onItemClick(Child.props.onClick, Child.props.autoclose)
      this.$slots.default[i].componentOptions.listeners.click = this.onItemClickMethod(child.componentOptions.listeners.click, child.componentOptions.propsData.autoclose);
    });
  },
  mounted() {
    this.el = this.$refs.getRef;
  },
  methods: {
    onCloseMethod () {
      this.state = Object.assign({}, this.state, { closing: true });
      this.waitTransitionFinish(this.onClose);
    },
    onItemClickMethod (action, autoclose) {
      return () => {
        if (autoclose) {
          this.state = Object.assign({}, this.state, { closing: true });
          this.waitTransitionFinish(() => {
            // autoclose && this.onClose();
            this.onClose && this.onClose();
            action && action();
          });
        } else {
          action && action();
        }
      }
    },
    stopPropagation: e => e.stopPropagation(),
    waitTransitionFinish (eventHandler) {
      if (transitionEvents.supported) {
        const eventName = transitionEvents.prefix ? transitionEvents.prefix + 'TransitionEnd' : 'transitionend';

        this.el.removeEventListener(eventName, eventHandler);
        this.el.addEventListener(eventName, eventHandler);
      } else {
        setTimeout(eventHandler.bind(this), this.isANDROID ? 200 : 300);
      }
    }
  }
}
</script>

<style>
@import './ActionSheet.css';
</style>