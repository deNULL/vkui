<!--  TODO: Если component будет !== 'div' — нужно будет переделать @click на @click.native  -->

<template>
  <component :is="component" @dragstart="onDragStartMethod" @click="onClickMethod" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
import { getSupportedEvents, coordX, coordY, touchEnabled } from '../../lib/touch';

const events = getSupportedEvents();

export default {
  data: () => ({
    cancelClick: false,
    gesture: {},
    // container: null,
  }),
  props: {
    component: {
      type: String,
      required: false,
      default: 'div'
    },
    onStart: {
      type: Function,
    },
    onStartX: {
      type: Function,
    },
    onStartY: {
      type: Function,
    },
    onMove: {
      type: Function,
    },
    onMoveX: {
      type: Function,
    },
    onMoveY: {
      type: Function,
    },
    onEnd: {
      type: Function,
    },
    onEndX: {
      type: Function,
    },
    onEndY: {
      type: Function,
    },
    // onClickCallback: {
    //   type: [Function, String],
    // },
    useCapture: {
      type: Boolean,
      default: false,
    },
    getRootRef: {
      type: Function,
    },
  },
  computed: {
    document () {
      // return this.context.document || document ??
      return document
    }
  },
  created: function() {
    
  },
  mounted: function() {
    // this.container = this.$el;

    this.$el.addEventListener(events[0], this.onStartMethod, { capture: this.useCapture, passive: false });
    touchEnabled && this.subscribe(this.$el);
  },
  beforeDestroy: function() {
    this.$el.removeEventListener(events[0], this.onStartMethod, { capture: this.useCapture, passive: false });
    touchEnabled && this.unsubscribe(this.$el);
  },

  methods: {

    /**
     * Обработчик событий touchstart
     *
     * @param {Object} e Браузерное событие
     * @returns {void}
     */
    onStartMethod (e) {
      // console.log("Touch.onStartMethod");
      this.gesture = {
        startX: coordX(e),
        startY: coordY(e),
        startT: new Date(),
        isPressed: true
      };

      // Вызываем нужные колбеки из props
      const outputEvent = Object.assign({}, this.gesture, {
        originalEvent: e
      });

      if (this.onStart) {
        this.onStart(outputEvent);
      }

      if (this.onStartX) {
        this.onStartX(outputEvent);
      }

      if (this.onStartY) {
        this.onStartY(outputEvent);
      }

      !touchEnabled && this.subscribe(this.document);
    },

    /**
     * Обработчик событий touchmove
     *
     * @param {Object} e Браузерное событие
     * @returns {void}
     */
    onMoveMethod (e) {
      // console.log("Touch.onMoveMethod");
      const { isPressed, isX, isY, startX, startY } = this.gesture;

      if (isPressed) {
        // смещения
        const shiftX = coordX(e) - startX;
        const shiftY = coordY(e) - startY;

        // абсолютные значения смещений
        const shiftXAbs = Math.abs(shiftX);
        const shiftYAbs = Math.abs(shiftY);

        // Если определяем мультитач, то прерываем жест
        if (!!e.touches && e.touches.length > 1) {
          return this.onEndMethod(e);
        }

        // если мы ещё не определились
        if (!isX && !isY) {
          let willBeX = shiftXAbs >= 5 && shiftXAbs > shiftYAbs;
          let willBeY = shiftYAbs >= 5 && shiftYAbs > shiftXAbs;
          let willBeSlidedX = (willBeX && !!this.onMoveX) || !!this.onMove;
          let willBeSlidedY = (willBeY && !!this.onMoveY) || !!this.onMove;

          this.gesture.isY = willBeY;
          this.gesture.isX = willBeX;
          this.gesture.isSlideX = willBeSlidedX;
          this.gesture.isSlideY = willBeSlidedY;
          this.gesture.isSlide = willBeSlidedX || willBeSlidedY;
        }

        if (this.gesture.isSlide) {
          this.gesture.shiftX = shiftX;
          this.gesture.shiftY = shiftY;
          this.gesture.shiftXAbs = shiftXAbs;
          this.gesture.shiftYAbs = shiftYAbs;

          // Вызываем нужные колбеки из props
          const outputEvent = Object.assign({}, this.gesture, {
            originalEvent: e
          });

          if (this.onMove) {
            this.onMove(outputEvent);
          }

          if (this.gesture.isSlideX && this.onMoveX) {
            this.onMoveX(outputEvent);
          }

          if (this.gesture.isSlideY && this.onMoveY) {
            this.onMoveY(outputEvent);
          }
        }
      }
    },

    /**
     * Обработчик событий touchend, touchcancel
     *
     * @param {Object} e Браузерное событие
     * @returns {void}
     */
    onEndMethod (e) {
      // console.log("Touch.onEndMethod");
      const { isPressed, isSlide, isSlideX, isSlideY } = this.gesture;

      if (isPressed) {
        // Вызываем нужные колбеки из props
        const outputEvent = Object.assign({}, this.gesture, {
          originalEvent: e
        });

        if (this.onEnd) {
          this.onEnd(outputEvent);
        }

        if (isSlideY && this.onEndY) {
          this.onEndY(outputEvent);
        }

        if (isSlideX && this.onEndX) {
          this.onEndX(outputEvent);
        }
      }

      // Если закончили жест на ссылке, выставляем флаг для отмены перехода
      this.cancelClick = e.target.tagName === 'A' && isSlide;
      this.gesture = {};

      !touchEnabled && this.unsubscribe(this.document);
    },

    /**
     * Обработчик событий dragstart
     * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
     *
     * @param {Object} e Браузерное событие
     * @returns {void}
     */
    onDragStartMethod (e) {
      // console.log("Touch.onDragStartMethod");
      if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    },

    /**
     * Обработчик клика по компоненту
     * Отменяет переход по вложенной ссылке, если был зафиксирован свайп
     *
     * @param {Object} e Браузерное событие
     * @returns {void}
     */
    onClickMethod (e) {
      // console.log("Touch.onClickMethod");
      if (this.cancelClick) {
        this.cancelClick = false;
        e.preventDefault();
      }
      // this.onClickCallback && this.onClickCallback(e);
      this.$emit('click', e);
    },

    // getRef (container) {
    //   this.container = container;
    //   this.getRootRef && this.getRootRef(container);
    // },

    subscribe (element) {
      element.addEventListener(events[1], this.onMoveMethod, { capture: this.useCapture, passive: false });
      element.addEventListener(events[2], this.onEndMethod, { capture: this.useCapture, passive: false });
      element.addEventListener(events[3], this.onEndMethod, { capture: this.useCapture, passive: false });
    },

    unsubscribe (element) {
      element.removeEventListener(events[1], this.onMoveMethod, { capture: this.useCapture, passive: false });
      element.removeEventListener(events[2], this.onEndMethod, { capture: this.useCapture, passive: false });
      element.removeEventListener(events[3], this.onEndMethod, { capture: this.useCapture, passive: false });
    },
  }
}
</script>