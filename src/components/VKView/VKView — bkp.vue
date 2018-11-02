<template>
<!--   <Touch
    component="section"
    :class="viewClassNames"
    :onMoveX="onMoveXMethod"
    :onEnd="onEndMethod"
  > -->
<!--     <div class="View__header" v-if="!!header">
      <div class="View__header-scrolltop" @click="onScrollTopMethod" v-if="isIOS"></div>
      <div :class="panelHeaderClassNames">
        <div class="PanelHeader__in"
          :class="panelHeaderInClassNames[panel.data.attrs.id]" 
          v-for="panel in panels" 
          :key="panel.data.attrs.id">
          <div class="PanelHeader__bg"
            :style="calcHeaderSwipeStyles(panel.data.attrs.id).bg"
            :key="panel.data.attrs.id"
            :id="`header-bg-${panel.data.attrs.id}`">
              <portal-target slim :name="`header-bg-${panel.data.attrs.id}`"></portal-target>
            </div>
          <div class="PanelHeader__container">
            <div class="PanelHeader__left">
              <div class="PanelHeader__left-in"
                :style="calcHeaderSwipeStyles(panel.data.attrs.id).left"
                :id="`header-left-${panel.data.attrs.id}`">
                  <portal-target slim :name="`header-left-${panel.data.attrs.id}`"></portal-target>
                </div>
              <div class="PanelHeader__addon"
                :style="calcHeaderSwipeStyles(panel.data.attrs.id).icon"
                :id="`header-addon-${panel.data.attrs.id}`"
                v-if="isIOS">
                  <portal-target slim :name="`header-addon-${panel.data.attrs.id}`"></portal-target>
                </div>
            </div>
            <div
              class="PanelHeader__content"
              :style="calcHeaderSwipeStyles(panel.data.attrs.id).title"
              :id="`header-title-${panel.data.attrs.id}`">
                <portal-target slim :name="`header-title-${panel.data.attrs.id}`"></portal-target>
              </div>
            <div
              class="PanelHeader__right"
              :id="`header-right-${panel.data.attrs.id}`"
              :style="calcHeaderSwipeStyles(panel.data.attrs.id).right">
                <portal-target slim :name="`header-right-${panel.data.attrs.id}`"></portal-target>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="View__panels">
      <div class="View__panel" 
        :class="panelClassNames[panel.data.attrs.id]" 
        :style="calcPanelSwipeStyles(panel.data.attrs.id)"
        v-for="panel in panels" 
        :key="panel.data.attrs.id">
        <div class="View__panel-in">
          <vnodes :vnodes="panel"/>
        </div>
      </div>
    </div>
    <div class="View__popout" v-if="!!popout">
      <slot name="popout"></slot>
    </div> -->
    <!-- <div><vnodes :vnodes="panels"/></div> -->
    <!-- <div><slot></slot></div> -->
  <!-- </Touch> -->
  <div>
    <slot v-for="slot in panelsIds" :name="slot"></slot>
  </div>
</template>

<script>
import classnames from '../lib/classnames';
import animate from '../lib/animate';
import transitionEvents from '../lib/transitionEvents';
import getClassName from '../helpers/getClassName';
import { platform, ANDROID, IOS } from '../lib/platform';
import Touch from './Touch';
import removeObjectKeys from '../lib/removeObjectKeys';
import { baseClassNames as panelHeaderClasses } from './PanelHeader';

const osname = platform();
const baseClassNames = getClassName('View');

export const transitionStartEventName = 'VKUI:View:transition-start';
export const transitionEndEventName = 'VKUI:View:transition-end';

export default {
  // render (h) {
  //   const items = this.$slots.default.map(vnode => h('div', { class: { column: true }, vnode }))
  //   return h('div', { class: { columns: true }, items })
  //   // const items = this.$slots.default
  //   // return h('div', { items })
  // },
  data: () => ({
    state: {
      scrolls: {},
      animated: false,

      visiblePanels: [],
      activePanel: undefined,
      isBack: undefined,
      prevPanel: null,
      nextPanel: null,

      swipingBack: false,
      swipebackStartX: 0,
      swipeBackShift: 0,
      swipeBackNextPanel: null,
      swipeBackPrevPanel: null,
      swipingBackFinish: null,

      browserSwipe: false,

      refsStore: {}
    },
  }),
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    activePanel: {
      type: String
    },
    onTransition: {
      type: Function
    },
    onSwipeBack: {
      type: Function
    },
    onSwipeBackStart: {
      type: Function
    },
    history: {
      type: Array,
      default: () => []
    },

    /**
     * @ignore
     */
    isNext: {
      type: Boolean
    },
    /**
     * @ignore
     */
    isPrev: {
      type: Boolean
    },
    /**
     * @ignore
     */
    inRoot: {
      type: Boolean
    },
  },
  inject: {
    isWebView: {
      default: false,
    },
    window: {
      default: window,
    },
    document: {
      default: document,
    }
  },
  computed: {
    // header () {
    //   return this.$slots.header;
    // },
    popout () {
      console.log("ppp")
      console.log(this.$slots.popout)
      return this.$slots.popout;
    },
    viewClassNames () {
      const modifiers = {
        'View--header': !!this.header,
        'View--animated': this.state.animated,
        'View--swiping-back': this.state.swipingBack
      };
      return classnames(baseClassNames, modifiers);
    },
    panelClassNames () {
      let panelClassNames = {}
      this.panels.forEach(panel => {
        panelClassNames[panel.data.attrs.id] = classnames('View__panel', {
          'View__panel--active': panel.data.attrs.id === this.state.activePanel,
          'View__panel--prev': panel.data.attrs.id === this.state.prevPanel,
          'View__panel--next': panel.data.attrs.id === this.state.nextPanel,
          'View__panel--swipe-back-prev': panel.data.attrs.id === this.state.swipeBackPrevPanel,
          'View__panel--swipe-back-next': panel.data.attrs.id === this.state.swipeBackNextPanel,
          'View__panel--swipe-back-success': this.state.swipingBackFinish === true,
          'View__panel--swipe-back-failed': this.state.swipingBackFinish === false,
          [`View__panel--theme-${panel.componentOptions.propsData.theme}`]: true
        })
      });
      return panelClassNames;
    },
    panelHeaderClassNames () {
      return classnames(panelHeaderClasses);
    },
    panelHeaderInClassNames () {
      let panelHeaderInClassNames = {}
      this.panels.forEach(panel => {
        panelHeaderInClassNames[panel.data.attrs.id] = classnames('PanelHeader__in', {
          'PanelHeader__in--active': panel.data.attrs.id === this.state.activePanel,
          'PanelHeader__in--prev': panel.data.attrs.id === this.state.prevPanel,
          'PanelHeader__in--next': panel.data.attrs.id === this.state.nextPanel,
          'PanelHeader__in--swipe-back-prev': panel.data.attrs.id === this.state.swipeBackPrevPanel,
          'PanelHeader__in--swipe-back-next': panel.data.attrs.id === this.state.swipeBackNextPanel,
          'PanelHeader__in--swipe-back-success': this.state.swipingBackFinish === true,
          'PanelHeader__in--swipe-back-failed': this.state.swipingBackFinish === false
        })
      });
      return panelHeaderInClassNames;
    },
    isIOS () {
      return osname === IOS
    },
    isANDROID () {
      return osname === ANDROID
    },
    // panels () {
    //   return this.$slots.default
    //   // TODO ? может быть стоит отделить filter от всех (this.$slots.default) ?
    //   return [].concat(this.$slots.default).filter(panel => {
    //     return typeof panel.data != 'undefined' && typeof panel.data.attrs != 'undefined' && 
    //       (
    //       this.state.visiblePanels.indexOf(panel.data.attrs.id) > -1 ||
    //       panel.data.attrs.id === this.state.swipeBackPrevPanel ||
    //       panel.data.attrs.id === this.state.swipeBackNextPanel
    //       )
    //   }).map(panel => {
    //     panel.componentOptions.propsData.isNext = panel.data.attrs.id === this.state.nextPanel || panel.data.attrs.id === this.state.swipeBackNextPanel;
    //     panel.componentOptions.propsData.isPrev = panel.data.attrs.id === this.state.prevPanel || panel.data.attrs.id === this.state.swipeBackPrevPanel;
    //     return panel;
    //   });
    // },
    panelsIds () {
      return Object.keys(this.$slots);
    },
    stateAnimated () {
      return this.state.animated;
    },
    stateSwipingBack () {
      return this.state.swipingBack;
    },
    stateSwipingBackFinish () {
      return this.state.swipingBackFinish;
    },
  },
  watch: {
    popout: function(val, oldVal) {
      if (val && !oldVal) {
        this.blurActiveElement();
      }
    },
    activePanel: function(val, oldVal) {
      this.setPanelBg(val);
      // Нужен переход
      if (!this.state.swipingBack && !this.state.browserSwipe) {
        const firstLayer = this.panels.find(
          panel => panel.data.attrs.id === oldVal || panel.data.attrs.id === val
        );

        const isBack = firstLayer && firstLayer.data.attrs.id === val;

        this.blurActiveElement();

        this.state = Object.assign({}, this.state, {
          visiblePanels: [oldVal, val],
          prevPanel: oldVal,
          nextPanel: val,
          activePanel: null,
          animated: true,
          scrolls: Object.assign({}, this.state.scrolls, {
            [oldVal]: this.window.pageYOffset
          }),
          isBack
        });
      }
      // Закончилась анимация свайпа назад
      if (this.state.swipingBack) {
        this.state = Object.assign({}, this.state, {
          swipeBackPrevPanel: null,
          swipeBackNextPanel: null,
          swipingBack: false,
          swipingBackFinish: null,
          swipebackStartX: 0,
          swipeBackShift: 0,
          activePanel: val,
          visiblePanels: [val],
          scrolls: removeObjectKeys(this.state.scrolls, [this.state.swipeBackPrevPanel])
        });

        this.document.dispatchEvent(new this.window.CustomEvent(transitionEndEventName));
        window.scrollTo(0, this.state.scrolls[this.state.activePanel]);
        this.onTransition && this.onTransition();
      }
      
      this.$nextTick(function() {
        // Закончился Safari свайп
        if (this.state.browserSwipe) {
          this.state = Object.assign({}, this.state, {
            browserSwipe: false,
            nextPanel: null,
            prevPanel: null,
            animated: false,
            visiblePanels: [val],
            activePanel: val
          });
        }
      });
    },
    stateAnimated: function(val, oldVal) {
      const scrolls = this.state.scrolls;

      this.$nextTick(function() {
        // Начался переход
        if (!oldVal && val) {
          this.document.dispatchEvent(new this.window.CustomEvent(transitionStartEventName, { detail: { scrolls } }));
          const nextPanelElement = this.pickPanel(this.state.nextPanel);
          const prevPanelElement = this.pickPanel(this.state.prevPanel);

          prevPanelElement.scrollTop = scrolls[this.state.prevPanel];
          if (this.state.isBack) {
            nextPanelElement.scrollTop = scrolls[this.state.nextPanel];
          }
          this.waitAnimationFinish(this.pickPanel(this.state.isBack ? this.state.prevPanel : this.state.nextPanel), this.transitionEndHandler);
        }
      });
    },
    stateSwipingBack: function(val, oldVal) {
      const scrolls = this.state.scrolls;

      this.$nextTick(function() {
        // Начался свайп назад
        if (!oldVal && val) {
          this.document.dispatchEvent(new this.window.CustomEvent(transitionStartEventName, { detail: { scrolls } }));
          this.onSwipeBackStart && this.onSwipeBackStart();
          const nextPanelElement = this.pickPanel(this.state.swipeBackNextPanel);
          const prevPanelElement = this.pickPanel(this.state.swipeBackPrevPanel);

          nextPanelElement.scrollTop = scrolls[this.state.swipeBackNextPanel];
          prevPanelElement.scrollTop = scrolls[this.state.swipeBackPrevPanel];
        }
      });
    },
    stateSwipingBackFinish: function(val, oldVal) {
      const scrolls = this.state.scrolls;

      this.$nextTick(function() {
        // Началась анимация завершения свайпа назад.
        if (oldVal === null && val !== null) {
          this.waitTransitionFinish(this.pickPanel(this.state.swipeBackNextPanel), this.swipingBackTransitionEndHandler);
        }
        // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
        if (oldVal === false && val === null) {
          this.window.scrollTo(0, scrolls[this.state.activePanel]);
        }
      });
    },
  },
  components: {
    Touch,
    // TODO вынести компонент как глобальный? 
    Vnodes: {
      // functional: true,
      // render: (h, ctx) => ctx.props.vnodes
      props: ['vnodes'],
      render:function(createElement, ctx){
        var parentContent = createElement('h2',"These are the Parent's Children:")
        var myChildren = this.vnodes
                            // remove the text nodes (like the return)
                            // .filter(node => !node.text)
                            // wrap the children
                            // .map(child => createElement(`li`, [child]))
                             
        // var content = [].concat(parentContent, myChildren)             
            return createElement(
               'div',
                {},
               // this.$slots.default 
               myChildren
            )
      }
      
    },
  },
  created: function () {
    this.setPanelBg(this.activePanel);
    this.state.visiblePanels = [this.activePanel];
    this.state.activePanel = this.activePanel;
    console.log("this.$slots")
    console.log(this.$slots)

    let filteredPanelsIds = this.panelsIds.filter(id => {
      return this.state.visiblePanels.indexOf(id) > -1 ||
        id === this.state.swipeBackPrevPanel ||
        id === this.state.swipeBackNextPanel
    });
    filteredPanelsIds.map(id => {
      this.$slots[id][0].componentOptions.propsData.isNext = id === this.state.nextPanel || id === this.state.swipeBackNextPanel;
      this.$slots[id][0].componentOptions.propsData.isPrev = id === this.state.prevPanel || id === this.state.swipeBackPrevPanel;
    });
    console.log("this.$slots2")
    console.log(this.$slots)
  },
  methods: {
    waitTransitionFinish (elem, eventHandler) {
      // console.log("waitTransitionFinish")
      if (transitionEvents.supported) {
        const eventName = transitionEvents.prefix ? transitionEvents.prefix + 'TransitionEnd' : 'transitionend';

        elem.removeEventListener(eventName, eventHandler);
        elem.addEventListener(eventName, eventHandler);
      } else {
        setTimeout(eventHandler.bind(this), this.isANDROID ? 300 : 600);
      }
    },

    waitAnimationFinish (elem, eventHandler) {
      // console.log("waitAnimationFinish")
      if (transitionEvents.supported) {
        const eventName = transitionEvents.prefix ? transitionEvents.prefix + 'AnimationEnd' : 'animationend';

        elem.removeEventListener(eventName, eventHandler);
        elem.addEventListener(eventName, eventHandler);
      } else {
        setTimeout(eventHandler.bind(this), this.isANDROID ? 300 : 600);
      }
    },

    blurActiveElement () {
      // console.log("blurActiveElement")
      if (typeof this.window !== 'undefined' && this.document.activeElement) {
        this.document.activeElement.blur();
      }
    },

    setPanelBg (panelId) {
      const panel = this.panels.find(panel => panel.data.attrs.id === panelId);
      if (panel) {
        this.document.documentElement.setAttribute('theme', panel.componentOptions.propsData.theme);
      } else {
        this.document.documentElement.removeAttribute('theme');
      }
    },

    pickPanel (id) {
      // console.log("pickPanel")
      const elem = this.document.getElementById(id);
      if (!elem) {
        console.warn(`Element #${id} not found`);
      }
      return elem && elem.parentNode.parentNode; // TODO на что заменить?
    },

    transitionEndHandler (e = { manual: true }) {
      // console.log("transitionEndHandler")
      if ([
        'animation-ios-next-forward',
        'animation-ios-next-back',
        'animation-ios-prev-forward',
        'animation-ios-prev-back',
        'animation-android-next-forward',
        'animation-android-prev-back'
      ].indexOf(e.animationName) > -1 || e.manual) {
        const activePanel = this.activePanel;
        const isBack = this.state.isBack;
        const prevPanel = this.state.prevPanel;
        this.document.dispatchEvent(new this.window.CustomEvent(transitionEndEventName));
        this.state = Object.assign({}, this.state, {
          prevPanel: null,
          nextPanel: null,
          visiblePanels: [activePanel],
          activePanel: activePanel,
          animated: false,
          isBack: undefined,
          scrolls: isBack ? removeObjectKeys(this.state.scrolls, [prevPanel]) : this.state.scrolls
        });
        isBack && this.window.scrollTo(0, this.state.scrolls[activePanel]);
        this.onTransition && this.onTransition();
      }
    },

    swipingBackTransitionEndHandler (e) {
      // console.log("swipingBackTransitionEndHandler")
      // indexOf because of vendor prefixes in old browsers
      if (e.propertyName.indexOf('transform') >= 0 && e.target.classList.contains('View__panel--swipe-back-next')) {
        this.state.swipingBackFinish ? this.onSwipeBackSuccessMethod() : this.onSwipeBackCancelMethod();
      }
    },

    onSwipeBackSuccessMethod () {
      // console.log("onSwipeBackSuccessMethod")
      this.onSwipeBack && this.onSwipeBack();
    },

    onSwipeBackCancelMethod () {
      // console.log("onSwipeBackSuccessMethod")
      this.state = Object.assign({}, this.state, {
        swipeBackPrevPanel: null,
        swipeBackNextPanel: null,
        swipingBack: false,
        swipingBackFinish: null,
        swipebackStartX: 0,
        swipeBackShift: 0
      });
      this.document.dispatchEvent(new this.window.CustomEvent(transitionEndEventName));
    },

    onScrollTopMethod () {
      // console.log("onScrollTopMethod")
      const { activePanel } = this.state;

      if (activePanel) {
        const scrollTop = this.document.body.scrollTop || this.document.this.documentElement.scrollTop;

        if (scrollTop) {
          animate({
            duration: 200,
            timing: n => Math.sqrt(n),
            draw: (val) => {
              this.window.scrollTo(0, scrollTop - val * scrollTop);
            }
          });
        }
      }
    },

    onMoveXMethod (e) {
      if (this.isIOS && !this.isWebView && (e.startX <= 70 || e.startX >= this.window.innerWidth - 70) && !this.state.browserSwipe) {
        this.state.browserSwipe = true;
        // console.log("browserSwipe = true")
      }

      if (this.isIOS && this.isWebView && this.onSwipeBack) {
        if (this.state.animated && e.startX <= 70) {
          return;
        }

        if (e.startX <= 70 && !this.state.swipingBack && this.history.length > 1) {
          this.state = Object.assign({}, this.state, {
            swipingBack: true,
            swipebackStartX: e.startX,
            startT: e.startT,
            swipeBackPrevPanel: this.state.activePanel,
            swipeBackNextPanel: this.history.slice(-2)[0],
            scrolls: Object.assign({}, this.state.scrolls, {
              [this.state.activePanel]: this.window.pageYOffset
            })
          });
        }
        if (this.state.swipingBack) {
          let swipeBackShift;
          if (e.shiftX < 0) {
            swipeBackShift = 0;
          } else if (e.shiftX > this.window.innerWidth - this.state.swipebackStartX) {
            swipeBackShift = this.window.innerWidth;
          } else {
            swipeBackShift = e.shiftX;
          }
          this.state.swipeBackShift = swipeBackShift;
        }
      }
    },

    onEndMethod () {
      // console.log("onEndMethod")
      if (this.state.swipingBack) {
        const speed = this.state.swipeBackShift / (new Date() - this.state.startT) * 1000;
        if (this.state.swipeBackShift === 0) {
          this.onSwipeBackCancelMethod();
        } else if (this.state.swipeBackShift >= this.window.innerWidth) {
          this.onSwipeBackSuccessMethod();
        } else {
          this.setState({ swipingBackFinish: speed > 250 || this.state.swipebackStartX + this.state.swipeBackShift > this.window.innerWidth / 2 });
        }
      }
    },

    getRef (c) {
      // console.log("getRef")
      if (c && c.container && c.id) {
        let el = c;

        while (el.container) {
          el = el.container;
        }

        this.refsStore[c.id] = el;
      }
    },

    calcPanelSwipeStyles (panelId) {
      // console.log("calcPanelSwipeStyles")
      const isPrev = panelId === this.state.swipeBackPrevPanel;
      const isNext = panelId === this.state.swipeBackNextPanel;

      let prevPanelTranslate = `${this.state.swipeBackShift}px`;
      let nextPanelTranslate = `${-50 + (this.state.swipeBackShift * 100 / this.window.innerWidth) / 2}%`;
      let prevPanelShadow = 0.3 * (this.window.innerWidth - this.state.swipeBackShift) / this.window.innerWidth;

      if (this.state.swipingBackFinish !== null) {
        return isPrev ? { boxShadow: `-2px 0 12px rgba(0, 0, 0, ${prevPanelShadow})` } : {};
      }

      if (isNext) {
        return {
          transform: `translate3d(${nextPanelTranslate}, 0, 0)`,
          WebkitTransform: `translate3d(${nextPanelTranslate}, 0, 0)`
        };
      }
      if (isPrev) {
        return {
          transform: `translate3d(${prevPanelTranslate}, 0, 0)`,
          WebkitTransform: `translate3d(${prevPanelTranslate}, 0, 0)`,
          boxShadow: `-2px 0 12px rgba(0, 0, 0, ${prevPanelShadow})`
        };
      }

      return {};
    },

    calcHeaderSwipeStyles (panelId) {
      // console.log("calcHeaderSwipeStyles")
      const isPrev = panelId === this.state.swipeBackPrevPanel;
      const isNext = panelId === this.state.swipeBackNextPanel;

      if (!isPrev && !isNext || this.state.swipingBackFinish !== null) {
        return {
          title: {},
          bg: {},
          left: {},
          addon: {},
          right: {}
        };
      }

      let opacity = this.state.swipeBackShift / this.window.innerWidth;
      let titleTransform = this.state.swipeBackShift / this.window.innerWidth * 30;
      let leftTransform = this.state.swipeBackShift / this.window.innerWidth * 30;

      if (isNext) {
        return {
          title: {
            transform: `translate3d(${-30 + titleTransform}vw, 0, 0)`,
            WebkitTransform: `translate3d(${-30 + titleTransform}vw, 0, 0)`,
            opacity
          },
          left: { opacity },
          addon: {
            opacity: 1,
            transform: `translate3d(${-30 + leftTransform}vw, 0, 0)`,
            WebkitTransform: `translate3d(${-30 + leftTransform}vw, 0, 0)`
          },
          right: { opacity }
        };
      }
      if (isPrev) {
        return {
          title: {
            transform: `translate3d(${titleTransform}vw, 0, 0)`,
            WebkitTransform: `translate3d(${titleTransform}vw, 0, 0)`,
            opacity: 1 - opacity
          },
          bg: { opacity: 1 - opacity },
          left: { opacity: 1 - opacity },
          addon: {
            transform: `translate3d(${leftTransform}vw, 0, 0)`,
            WebkitTransform: `translate3d(${leftTransform}vw, 0, 0)`,
            opacity: 1 - opacity
          }
        };
      }
    },
  }
}
</script>

<style>
@import '../styles/constants.css';

.View {
  position: relative;
  height: 100%;
  width: 100%;
  background: #efeff4;
  word-wrap: break-word;
  }

.View--animated,
.View--swiping-back {
  overflow: hidden;
  height: 100vh;
  }

  .View__header {
    z-index: 2;
    position: fixed;
    width: 100%;
    }

  .View--animated .View__panel,
  .View--animated .View__header,
  .View--swiping-back .View__panel,
  .View--swiping-back .View__header {
    pointer-events: none;
    }

  .View__panels {
    height: 100%;
    width: 100%;
    }

  .View__panel {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 1;
    }

    .View .View__panel,
    .View .Panel__in {
      background: var(--background-blue);
      }

    .View .View__panel--theme-white,
    .View .View__panel--theme-white .Panel__in {
      background: #fff;
      }

  .View__panel-in {
    height: 100%;
    }

  .View--animated .View__panel,
  .View--swiping-back .View__panel {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    }

  .View__popout {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100vh;
    }


.View--ios {
  font-family: var(--font-ios);
  }

.View--ios.View--header .Panel__in {
  padding-top: 64px;
  padding-top: calc(44px + constant(safe-area-inset-top));
  padding-top: calc(44px + env(safe-area-inset-top));
  }

.View--ios .Panel__in {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  }

.View--ios.View--header .FixedLayout--top {
  top: 64px;
  top: calc(44px + constant(safe-area-inset-top));
  top: calc(44px + env(safe-area-inset-top));
  }

.View--ios .Panel__in {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  }

/**
 * Panel swipe back
 */

.View--ios .View__panel--swipe-back-prev {
  box-shadow: -2px 0 12px rgba(0, 0, 0, .3);
  }

.View--ios .View__panel--swipe-back-prev.View__panel--swipe-back-success {
  transition: transform .3s var(--ios-easing);
  transform: translate3d(100%, 0, 0);
  }

.View--ios .View__panel--swipe-back-next.View__panel--swipe-back-success {
  transition: transform .3s var(--ios-easing);
  transform: translate3d(0, 0, 0);
  }

.View--ios .View__panel--swipe-back-prev.View__panel--swipe-back-failed {
  transition: transform .3s var(--ios-easing);
  transform: translate3d(0, 0, 0);
  }

.View--ios .View__panel--swipe-back-next.View__panel--swipe-back-failed {
  transition: transform .3s var(--ios-easing);
  transform: translate3d(-50%, 0, 0);
  }

/**
 * Panel transition
 */
.View--ios .View__panel--prev {
  animation: animation-ios-prev-forward .6s var(--ios-easing);
  }

.View--ios .View__panel--next {
  animation: animation-ios-next-back .6s var(--ios-easing);
  }

.View--ios .View__panel--prev ~ .View__panel--next {
  animation: animation-ios-next-forward .6s var(--ios-easing);
  }

.View--ios .View__panel--next ~ .View__panel--prev {
  animation: animation-ios-prev-back .6s var(--ios-easing);
  }

.View--ios .View__panel--prev .Panel__in::before,
.View--ios .View__panel--next .Panel__in::before {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background: #000;
  content: '';
  pointer-events: none;
  }

.View--ios .View__panel--prev .Panel__in::before {
  animation: animation-ios-fade-in .6s var(--ios-easing);
  }

.View--ios .View__panel--next .Panel__in::before {
  animation: animation-ios-fade-out .6s var(--ios-easing);
  }

.View--ios .View__panel--prev ~ .View__panel--next .Panel__in::before,
.View--ios .View__panel--next ~ .View__panel--prev .Panel__in::before {
  content: none;
  display: none;
  }

/**
 * Active panel
 */
.View--ios .View__panel--active .Panel__in::before {
  content: none;
  display: none;
  }

@keyframes animation-ios-next-forward {
  from {
    transform: translate3d(100%, 0, 0);
    }

  to {
    transform: translate3d(0, 0, 0);
    }
  }

@keyframes animation-ios-next-back {
  from {
    transform: translate3d(-50%, 0, 0);
    }

  to {
    transform: translate3d(0, 0, 0);
    }
  }

@keyframes animation-ios-prev-forward {
  from {
    transform: translate3d(0, 0, 0);
    }

  to {
    transform: translate3d(-50%, 0, 0);
    }
  }

@keyframes animation-ios-prev-back {
  from {
    transform: translate3d(0, 0, 0);
    }

  to {
    transform: translate3d(100%, 0, 0);
    }
  }

@keyframes animation-ios-fade-in {
  from {
    opacity: 0;
    }

  to {
    opacity: .3;
    }
  }

@keyframes animation-ios-fade-out {
  from {
    opacity: .3;
    }

  to {
    opacity: 0;
    }
  }



.View--android {
  font-family: var(--font-android);
  }

.View--android.View--header .Panel__in {
  padding-top: 56px;
  }

.View--android.View--header .FixedLayout--top {
  top: 56px;
  }

/**
 * Panel transition
 */
.View--android .View__panel--next ~ .View__panel--prev {
  animation: animation-android-prev-back .3s var(--android-easing);
  }

.View--android .View__panel--prev ~ .View__panel--next {
  animation: animation-android-next-forward .3s var(--android-easing);
  }

/**
 * Active panel
 */
.View--android .View__panel--active::before {
  content: none;
  }

@keyframes animation-android-prev-back {
  from {
    opacity: 1;
    transform: translateY(0);
    }

  to {
    opacity: 0;
    transform: translateY(80px);
    }
  }

@keyframes animation-android-next-forward {
  from {
    opacity: 0;
    transform: translateY(80px);
    }

  to {
    opacity: 1;
    transform: translateY(0);
    }
  }

</style>