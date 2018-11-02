<template>
  <component :is="componentName" :class="classNames" v-bind="setProps" v-on="$listeners">
    <span class="Tappable__waves" v-if="isANDROID">
      <span class="Tappable__wave" v-for="(click, k) in state.clicks" :style="{ top: click.y + 'px', left: click.x + 'px' }" :key="k" />
    </span>
    <slot></slot>
  </component>
</template>

<script>
import Touch from '../Touch/Touch';
import classnames from '../../lib/classnames';
import getClassName from '../../helpers/getClassName';
import { platform, ANDROID } from '../../lib/platform';
import { getOffsetRect } from '../../lib/offset';
import { coordX, coordY } from '../../lib/touch';

const ts = () => +Date.now();
const baseClassNames = getClassName('Tappable');
const osname = platform();

const ACTIVE_DELAY = 70;
export const ACTIVE_EFFECT_DELAY = 600;

let storage = {};

/**
 * Очищает таймауты и хранилище для всех экземпляров компонента, кроме переданного
 *
 * @param {String} exclude ID экземпляра-исключения
 * @returns {void}
 */
function deactivateOtherInstances (exclude) {
  Object.keys(storage).filter(id => id !== exclude).forEach(id => {
    clearTimeout(storage[id].activeTimeout);
    clearTimeout(storage[id].timeout);
    storage[id].stop();

    delete storage[id];
  });
}

export default {
  data: () => ({
    id: Math.round(Math.random() * 1e8).toString(16),
    state: {
      clicks: {},
      active: false,
      ts: null
    },
    isSlide: false,
    componentName: 'div',
    setProps: {},
  }),
  computed: {
    isANDROID () {
      return osname === ANDROID
    },
    classNames () {
      return classnames(baseClassNames, {
        'Tappable--active': this.state.active,
        'Tappable--inactive': !this.state.active
      })
    },
    // listeners: function () {
    //   var vm = this
    //   return Object.assign({},
    //     // Мы добавляем все слушатели из родителя
    //     this.$listeners,
    //     // Затем мы можем добавить собственные слушатели или
    //     // перезаписать поведение некоторых существующих.
    //     {
    //       start: onStartMethod,
    //       move: onMoveMethod,
    //       end: onEndMethod,
    //     }
    //   )
    // },
  },
  components: {
    Touch
  },
  props: {
    component: {
      type: String,
      required: false,
      default: 'div'
    },
    // onClickCallback: {
    //   type: Function,
    // },
    role: {
      type: String,
      default: 'button',
    },
    activeEffectDelay: {
      type: Number,
      default: ACTIVE_EFFECT_DELAY,
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    getRootRef: {
      type: Function,
    }
  },
  created: function () {
    this.componentName = !this.disabled ? 'Touch' : this.component;

    let props = Object.assign({} ,this.$attrs);

    if (!this.disabled) {
      props.component = this.component;
      props.onStart = this.onStartMethod;
      props.onMove = this.onMoveMethod;
      props.onEnd = this.onEndMethod;
    }

    if (this.componentName !== 'Touch') {
      props.ref = this.getRef;
    } else {
      props.getRootRef = this.getRef;
    }

    this.setProps = props;

  },
  beforeDestroy: function() {
    if (storage[this.id]) {
      clearTimeout(storage[this.id].timeout);
      clearTimeout(storage[this.id].activeTimeout);

      delete storage[this.id];
    }

    clearTimeout(this.wavesTimeout);
  },

  methods: {

    /**
     * Обрабатывает событие touchstart
     *
     * @returns {void}
     */
    onStartMethod ({ originalEvent }) {
      // console.log("Tappable.onStartMethod");
      this.stopPropagation && originalEvent.stopPropagation();
      if (originalEvent.touches && originalEvent.touches.length > 1) {
        return deactivateOtherInstances();
      }

      if (this.isANDROID) {
        this.onDownMethod(originalEvent);
      }

      storage[this.id] = {};
      this.getStorage().stop = this.stop;
      this.getStorage().activeTimeout = setTimeout(this.start, ACTIVE_DELAY);
    },

    /**
     * Обрабатывает событие touchmove
     *
     * @returns {void}
     */
    onMoveMethod ({ originalEvent, shiftXAbs, shiftYAbs }) {
      // console.log("Tappable.onMoveMethod");
      this.stopPropagation && originalEvent.stopPropagation();
      if (shiftXAbs > 20 || shiftYAbs > 20) {
        this.isSlide = true;
        this.stop();
      }
    },

    /**
     * Обрабатывает событие touchend
     *
     * @returns {void}
     */
    onEndMethod ({ originalEvent }) {
      // console.log("Tappable.onEndMethod");
      this.stopPropagation && originalEvent.stopPropagation();
      const now = ts();

      if (originalEvent.touches && originalEvent.touches.length > 0) {
        this.isSlide = false;
        return;
      }

      if (this.state.active) {
        if (now - this.state.ts >= 100) {
          // Долгий тап, выключаем подсветку
          this.stop();
        } else {
          // Короткий тап, оставляем подсветку
          const timeout = setTimeout(this.stop, this.activeEffectDelay - now + this.state.ts);
          const store = this.getStorage();

          if (store) {
            store.timeout = timeout;
          }
        }
      } else if (!this.isSlide) {
        // Очень короткий тап, включаем подсветку
        this.start();

        const timeout = setTimeout(this.stop, this.activeEffectDelay);

        if (this.getStorage()) {
          clearTimeout(this.getStorage().activeTimeout);
          this.getStorage().timeout = timeout;
        } else {
          this.timeout = timeout;
        }
      }

      this.isSlide = false;
    },

    /**
     * Реализует эффект при тапе для Андроида
     *
     * @returns {void}
     */
    onDownMethod (e) {
      // console.log("Tappable.onDownMethod");
      if (this.isANDROID) {
        const { top, left } = getOffsetRect(this.$el);
        const x = coordX(e);
        const y = coordY(e);
        const key = 'wave' + Date.now().toString();

        this.state.clicks = Object.assign({}, this.state.clicks, {
          [key]: {
            x: Math.round(x - left + window.pageXOffset),
            y: Math.round(y - top + window.pageYOffset),
          }
        })

        let self = this;
        this.wavesTimeout = setTimeout(() => {
          let clicks = Object.assign({}, self.state.clicks);
          delete clicks[key];
          self.state.clicks = clicks;
        }, 225);
      }
    },

    /**
     * Устанавливает активное выделение
     *
     * @returns {void}
     */
    start () {
      if (!this.state.active) {
        this.state.active = true
        this.state.ts = ts()
      }
      deactivateOtherInstances(this.id);
    },

    /**
     * Снимает активное выделение
     *
     * @returns {void}
     */
    stop () {
      if (this.state.active) {
        this.state.active = false
        this.state.ts = null
      }
      if (this.getStorage()) {
        clearTimeout(this.getStorage().activeTimeout);
        delete storage[this.id];
      }
    },

    /**
     * Возвращает хранилище для экземпляра компонента
     *
     * @returns {Object} Хранилище для текущего экземпляра компонента
     */
    getStorage () {
      return storage[this.id];
    },

    /**
     * Берет ref на DOM-ноду из экземпляра Touch
     *
     * @param {React.Component} container Touch component instance
     */
    getRef (container) {
      this.container = container;
      this.getRootRef && this.getRootRef(container);
    },

  }
}
</script>

<style>
@import './Tappable.css';
</style>