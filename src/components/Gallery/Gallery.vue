<script>
import Touch from '../Touch/Touch';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'
import requestAnimationFrame from '../../lib/requestAnimationFrame';

const baseClassName = getClassName('Gallery');

export default {
  render: function(createElement) {
    const indent = this.state.dragging ? this.calculateDragIndent() : this.calculateIndent(this.state.current);
    return createElement(
      'div',
      {
        class: classnames(baseClassName, {
          'Gallery--dragging': this.state.dragging,
          [`Gallery--${this.align}`]: true
        }),
        attrs: this.$attrs,
        ref: 'this.getContainerRef ???'
      },
      [
        createElement(
          'Touch',
          {
            class: 'Gallery__viewport',
            style: { width: typeof this.slideWidth == 'string' ? this.slideWidth : this.slideWidth + 'px' },
            attrs: {
              onStartX: this.onStartMethod,
              onMoveX: this.onMoveXMethod,
              onEnd: this.onEndMethod,
            },
            ref: 'viewportRef'
          },
          [
            createElement(
              'div',
              {
                class: 'Gallery__layer',
                style: {
                  WebkitTransform: `translateX(${indent}px)`,
                  transform: `translateX(${indent}px)`,
                  WebkitTransition: this.state.animation ? `-webkit-transform ${this.state.duration}s cubic-bezier(.1, 0, .25, 1)` : 'none',
                  transition: this.state.animation ? `transform ${this.state.duration}s cubic-bezier(.1, 0, .25, 1)` : 'none'
                }
              },
              []
              .concat(this.$slots.default.filter(slide => typeof slide.data !== 'undefined').map((slide, index) => {
                return createElement(
                  'div',
                  {
                    class: 'Gallery__slide',
                    key: `slide-${index}`,
                    // ref: this.getSlideRef(index),
                    ref: `slide-${index}`,
                  },
                  [slide]
                )
              }))
            )
          ]
        ),
        !!this.bullets && createElement(
          'div',
          {
            class: classnames('Gallery__bullets', { [`Gallery__bullets--${this.bullets}`]: true }),
          },
          []
          .concat(this.$slots.default.filter(slide => typeof slide.data !== 'undefined').map((slide, index) => {
            return createElement(
              'div',
              {
                class: classnames('Gallery__bullet', { 'Gallery__bullet--active': index === this.state.current }),
                key: index,
              }
            )
          }))
        ),
      ]
    )
  },
  data: () => ({
    state: {
      containerWidth: 0,
      current: 0,
      deltaX: 0,
      shiftX: 0,
      startT: 0,
      slides: [],
      animation: false,
      duration: 0.24
    },
    slidesStore: {},
    isChildrenDirty: true,
    viewport: {},
  }),
  computed: {
    stateCurrent () {
      return this.state.current;
    }
  },
  components: {
    Touch,
  },
  props: {
    slideWidth: {
      type: [String, Number],
      required: false,
      default: '100%',
    },
    autoplay: {
      type: Number,
      required: false,
      default: 0,
    },
    initialSlideIndex: {
      type: Number,
      required: false,
      default: 0,
    },
    slideIndex: {
      type: Number,
    },
    onDragStart: {
      type: Function,
    },
    onDragEnd: {
      type: Function,
    },
    onChange: {
      type: Function,
    },
    onEnd: {
      type: Function,
    },
    align: {
      type: String,
      default: 'left',
      validator: (v) => ['left', 'center', 'right'].indexOf(v) >= 0
    },
    bullets: {
      type: [String, Boolean],
      default: false,
      validator: (v) => ['dark', 'light', false].indexOf(v) >= 0
    },
  },
  watch: {
    stateCurrent: function(val, oldVal) {
      if (this.onChange) {
        this.onChange(val);
      }
    },
    autoplay: function(val, oldVal) {
      if (val && !oldVal) {
        if (val) {
          this.setTimeout(val);
        }
      }
      if (!val && oldVal) {
        this.clearTimeout();
      }
    },
    slideIndex: function(val, oldVal) {
      if (typeof val === 'number') {
        this.go(val);
      }
    },
  },
  created () {
    this.state.current = typeof this.slideIndex === 'number' ? this.slideIndex : this.initialSlideIndex;
    // this.state.slides = this.getChildren(this.$slots.default); // TODO ?
    this.state.slides = this.$slots.default; // TODO ?

    this.$nextTick(function(){
      this.viewport = this.$refs.viewportRef ? this.$refs.viewportRef.$el : {}; // TODO ?! container? 

      this.$slots.default.map((slide, i) => {
        this.slidesStore[`slide-${i}`] = this.$refs[`slide-${i}`];
      })
      // console.log(this.$refs)
      // console.log(this.$refs.viewportRef)
    })
  },
  mounted () {
    this.$nextTick(function(){
      this.initializeSlides(() => {
        this.state.shiftX = this.calculateIndent(this.state.current);
      });
    })
    window.addEventListener('resize', this.onResize);

    if (this.autoplay) {
      this.setTimeout(this.autoplay);
    }

  },
  updated () {
    if (this.isChildrenDirty) {
      this.isChildrenDirty = false;
      this.initializeSlides();
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
    this.clearTimeout();
  },
  methods: {
    initializeSlides (callback = () => {}) {
      const slides = this.getSlidesCoords();
      const containerWidth = this.$el.offsetWidth;
      const viewportWidth = this.viewport.offsetWidth;
      const layerWidth = slides.reduce((val, slide) => slide.width + val, 0);
      const min = this.calcMin({ containerWidth, layerWidth, viewportWidth });
      const max = 0;

      this.state = Object.assign({}, this.state, { min, max, layerWidth, containerWidth, slides });
      callback();
    },

    calcMin ({ containerWidth, layerWidth, viewportWidth }) {
      switch (this.align) {
        case 'left':
          return containerWidth - layerWidth;
        case 'right':
          return viewportWidth - layerWidth;
        case 'center':
          return viewportWidth - (containerWidth - viewportWidth) / 2 - layerWidth;
      }
    },

    /**
     * Получает координаты и размеры каждого слайда

     * @returns {Array} Массив с объектами, описывающими габариты слайда
     */
    getSlidesCoords () {
      return [].concat(this.$slots.default).reduce((acc, item, i) => {
        if (item) {
          const elem = this.slidesStore[`slide-${i}`];
          const res = {
            coordX: elem.offsetLeft,
            width: elem.offsetWidth,
            id: item.data.attrs && item.data.attrs.id
          };

          acc.push(res);
        }

        return acc;
      }, []);
    },

    /**
     * Считает отступ слоя галереи во время драга
     *
     * @returns {Number} Значения отступа
     */
    calculateDragIndent () {
      const { shiftX, deltaX, min, max } = this.state;
      const indent = shiftX + deltaX;
      if (indent > max) {
        return max + Number((indent - max) / 3);
      } else if (indent < min) {
        return min + Number((indent - min) / 3);
      }

      return indent;
    },

    /**
     * Считает отступ слоя галереи
     *
     * @param {Number} targetIndex ID целевого слайда
     * @returns {Number} Значения отступа
     */
    calculateIndent (targetIndex) {
      const { slides } = this.state;

      if (!this.isDraggable()) {
        return 0;
      }

      const coordX = slides.length ? slides[targetIndex].coordX : 0;
      return this.validateIndent(-1 * coordX);
    },

    validateIndent (value) {
      const { min, max } = this.state;

      if (value < min) {
        return min;
      } else if (value > max) {
        return max;
      }

      return value;
    },

    isDraggable () {
      return this.state.layerWidth > this.state.containerWidth;
    },

    /**
     * Получает индекс слайда, к которому будет осуществлен переход
     *
     * @returns {Number} Индекс слайда
     */
    getTarget () {
      const { slides, current, deltaX, shiftX, startT } = this.state;
      const expectDeltaX = deltaX / (new Date() - startT) * 240 * 0.6;
      const shift = shiftX + deltaX + expectDeltaX;
      const direction = deltaX < 0 ? 1 : -1;

      // Находим ближайшую границу слайда к текущему отступу
      let targetIndex = slides.reduce((val, item, index) => {
        const previousValue = Math.abs(slides[val].coordX + shift);
        const currentValue = Math.abs(item.coordX + shift);

        return previousValue < currentValue ? val : index;
      }, current);

      if (targetIndex === current) {
        let targetSlide = current + direction;

        if (targetSlide >= 0 && targetSlide < slides.length) {
          if (Math.abs(deltaX) > slides[targetSlide].width * 0.05) {
            targetIndex = targetSlide;
          }
        }
      }

      return targetIndex;
    },

    go (targetIndex) {
      this.state = Object.assign({}, this.state, {
        animation: true,
        shiftX: this.calculateIndent(targetIndex),
        current: targetIndex
      });

      if (this.timeout) {
        this.clearTimeout();
        this.setTimeout(this.autoplay);
      }
    },

    onStartMethod (e) {
      this.state = Object.assign({}, this.state, {
        animation: false,
        startT: e.startT
      });
    },

    onMoveXMethod (e) {
      if (!this.isDraggable()) {
        return;
      }

      e.originalEvent.preventDefault();

      if (e.isSlideX) {
        this.onDragStart && this.onDragStart();
        if (this.state.deltaX !== e.shiftX || this.state.dragging !== e.isSlideX) {
          this.state = Object.assign({}, this.state, {
            deltaX: e.shiftX,
            dragging: e.isSlideX
          });
        }

        return true;
      }
    },

    onEndMethod (e) {
      const targetIndex = e.isSlide ? this.getTarget() : this.state.current;
      this.onDragEnd && this.onDragEnd();

      this.state = Object.assign({}, this.state, {
        shiftX: this.calculateIndent(targetIndex),
        deltaX: 0,
        animation: true,
        current: targetIndex,
        duration: '.24'
      });

      if (this.onEnd) {
        this.onEnd({
          targetIndex
        });
      }

      if (this.timeout) {
        this.clearTimeout();
        this.setTimeout(this.autoplay);
      }

      return true;
    },

    onResize () {
      this.initializeSlides();

      const { layerWidth } = this.state;
      const containerWidth = this.$el.offsetWidth;
      const viewportWidth = this.viewport.offsetWidth;

      this.state = Object.assign({}, this.state, {
        shiftX: this.calculateIndent(this.state.current),
        containerWidth,
        min: this.calcMin({ layerWidth, containerWidth, viewportWidth }),
        animation: false
      }, () => {
        requestAnimationFrame(() => this.state.animation = true);
      });
    },

    setTimeout (duration) {
      this.timeout = setTimeout(() => {
        const { slides, current } = this.state;
        const targetIndex = current < slides.length - 1 ? current + 1 : 0;

        this.go(targetIndex);
      }, duration);
    },

    clearTimeout () {
      clearTimeout(this.timeout);
    },

    // getChildren (children) {
    //   return [].concat(children || this.props.children).reduce(this.reduceChildren, []);
    // },

    // reduceChildren (acc, item, i) {
    //   if (item) {
    //     const ref = this.getSlideRef(i);
    //     acc.push(<div className="Gallery__slide" key={`slide-${i}`} ref={ref}>{item}</div>);
    //   }

    //   return acc;
    // },

    // getContainerRef (container) {
    //   this.container = container;
    // },

    // getViewportRef (viewport) {
    //   this.viewport = viewport ? viewport.container : {};
    // },

    // getSlideRef (id) { 
    //   return (slide) => {
    //     this.slidesStore[`slide-${id}`] = slide;
    //   }
    // },
  }
}
</script>

<style>
@import './Gallery.css';
</style>