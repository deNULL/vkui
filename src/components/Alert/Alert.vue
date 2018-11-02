<template>
  <PopoutWrapper>
    <div v-bind="$attrs" :class="classNames">
      <div class="Alert__content"><slot></slot></div>
      <footer class="Alert__footer">
        <Tappable v-for="(button, i) in actions"
          component="button"
          :class="actionsClassNames[i]"
          @click="onItemClickMethod(button)"
          :key="`alert-action-${i}`"
        >
          <span>{{ button.title }}</span>
        </Tappable>
      </footer>
    </div>
  </PopoutWrapper>
</template>

<script>
import Tappable from '../Tappable/Tappable';
import PopoutWrapper from '../PopoutWrapper/PopoutWrapper';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('Alert');

export default {
  data: () => ({
    
  }),
  props: {
    actionsLayout: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['vertical', 'horizontal'].indexOf(v) >= 0
    },
    actions: {
      type: Array,
      default: [], // title, action, style ['primary', 'cancel', 'destructive', 'default']
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    classNames () {
      return classnames(baseClassNames, {
        'Alert--v': this.actionsLayout === 'vertical',
        'Alert--h': this.actionsLayout === 'horizontal'
      });
    },
    actionsClassNames () {
      let classes = [];
      this.actions.map((action, i) => {
        classes[i] = classnames('Alert__btn', { [`Alert__btn--${action.style}`]: true });
      });
      return classes;
    },
  },
  components: {
    Tappable,
    PopoutWrapper,
  },
  methods: {
    onItemClickMethod (item) {
      // return () => {
        item.autoclose && this.onClose();
        // this.onClose && this.onClose();
        item.action && item.action();
      // }
    },
  }
}
</script>

<style>
@import './Alert.css';
</style>