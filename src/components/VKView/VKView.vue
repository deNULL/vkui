<script>
import classnames from '../../lib/classnames';
import animate from '../../lib/animate';
import transitionEvents from '../../lib/transitionEvents';
import getClassName from '../../helpers/getClassName';
import { platform, ANDROID, IOS } from '../../lib/platform';
import Touch from '../Touch/Touch';
import removeObjectKeys from '../../lib/removeObjectKeys';
import { baseClassNames as panelHeaderClasses } from '../PanelHeader/PanelHeader';

const osname = platform();
const baseClassNames = getClassName('View');

export const transitionStartEventName = 'VKUI:View:transition-start';
export const transitionEndEventName = 'VKUI:View:transition-end';

export default {
  render: function(createElement) {
    let panels = this.$slots.default.filter(panel => {
      if(typeof panel.data === 'undefined') {
        return false
      } else {
        return this.state.visiblePanels.indexOf(panel.data.attrs.id) > -1 ||
          panel.data.attrs.id === this.state.swipeBackPrevPanel ||
          panel.data.attrs.id === this.state.swipeBackNextPanel;
      }
    });
    return createElement(
      'Touch',
      {
        class: this.viewClassNames,
        props: {
          component: 'section',
          onMoveX: this.onMoveXMethod,
          onEnd: this.onEndMethod,
        }
      },
      [
        !!this.header && createElement(
          'div',
          {
            class: 'View__header',
          },
          [
            this.isIOS && createElement(
              'div',
              {
                class: 'View__header-scrolltop',
                on: {
                  click: this.onScrollTopMethod,
                }
              }
            ),
            createElement(
              'div',
              {
                class: this.panelHeaderClassNames,
              },
              []
              .concat(panels.map(panel => {
                return createElement(
                  'div',
                  {
                    class: classnames('PanelHeader__in', {
                      'PanelHeader__in--active': panel.data.attrs.id === this.state.activePanel,
                      'PanelHeader__in--prev': panel.data.attrs.id === this.state.prevPanel,
                      'PanelHeader__in--next': panel.data.attrs.id === this.state.nextPanel,
                      'PanelHeader__in--swipe-back-prev': panel.data.attrs.id === this.state.swipeBackPrevPanel,
                      'PanelHeader__in--swipe-back-next': panel.data.attrs.id === this.state.swipeBackNextPanel,
                      'PanelHeader__in--swipe-back-success': this.state.swipingBackFinish === true,
                      'PanelHeader__in--swipe-back-failed': this.state.swipingBackFinish === false
                    }),
                    key: panel.data.attrs.id
                  },
                  [
                    createElement(
                      'div',
                      {
                        class: 'PanelHeader__bg',
                        key: panel.data.attrs.id,
                        attrs: {
                          id: `header-bg-${panel.data.attrs.id}`,
                        },
                        style: this.calcHeaderSwipeStyles(panel.data.attrs.id).bg,
                      },
                      [
                        createElement(
                          'portal-target',
                          {
                            attrs: {
                              name: `header-bg-${panel.data.attrs.id}`,
                              slim: true,
                            }
                          }
                        )
                      ]
                    ),
                    createElement(
                      'div',
                      {
                        class: 'PanelHeader__container',
                      },
                      [
                        createElement(
                          'div',
                          {
                            class: 'PanelHeader__left',
                          },
                          [
                            createElement(
                              'div',
                              {
                                class: 'PanelHeader__left-in',
                                style: this.calcHeaderSwipeStyles(panel.data.attrs.id).left,
                                attrs: {
                                  id: `header-left-${panel.data.attrs.id}`
                                }
                              },
                              [
                                createElement(
                                  'portal-target',
                                  {
                                    attrs: {
                                      name: `header-left-${panel.data.attrs.id}`,
                                      slim: true,
                                    }
                                  }
                                )
                              ]
                            ),
                            this.isIOS && createElement(
                              'div',
                              {
                                class: 'PanelHeader__addon',
                                style: this.calcHeaderSwipeStyles(panel.data.attrs.id).addon,
                                attrs: {
                                  id: `header-addon-${panel.data.attrs.id}`
                                }
                              },
                              [
                                createElement(
                                  'portal-target',
                                  {
                                    attrs: {
                                      name: `header-addon-${panel.data.attrs.id}`,
                                      slim: true,
                                    }
                                  }
                                )
                              ]
                            ),    
                          ]
                        ),
                        createElement(
                          'div',
                          {
                            class: 'PanelHeader__content',
                            style: this.calcHeaderSwipeStyles(panel.data.attrs.id).title,
                            attrs: {
                              id: `header-title-${panel.data.attrs.id}`
                            }
                          },
                          [
                            createElement(
                              'portal-target',
                              {
                                attrs: {
                                  name: `header-title-${panel.data.attrs.id}`,
                                  slim: true,
                                }
                              }
                            )
                          ]
                        ),
                        createElement(
                          'div',
                          {
                            class: 'PanelHeader__right',
                            style: this.calcHeaderSwipeStyles(panel.data.attrs.id).right,
                            attrs: {
                              id: `header-right-${panel.data.attrs.id}`
                            }
                          },
                          [
                            createElement(
                              'portal-target',
                              {
                                attrs: {
                                  name: `header-right-${panel.data.attrs.id}`,
                                  slim: true,
                                }
                              }
                            )
                          ]
                        ),
                      ]
                    )
                  ]
                )
              }))
            )
          ]
        ),
        createElement(
          'div',
          {
            class: 'View__panels',
          },
          []
          .concat(panels.map(panel => {
            panel.componentOptions.propsData.isNext = panel.data.attrs.id === this.state.nextPanel || panel.data.attrs.id === this.state.swipeBackNextPanel;
            panel.componentOptions.propsData.isPrev = panel.data.attrs.id === this.state.prevPanel || panel.data.attrs.id === this.state.swipeBackPrevPanel;
            return createElement(
              'div',
              {
                class: classnames('View__panel', {
                  'View__panel--active': panel.data.attrs.id === this.state.activePanel,
                  'View__panel--prev': panel.data.attrs.id === this.state.prevPanel,
                  'View__panel--next': panel.data.attrs.id === this.state.nextPanel,
                  'View__panel--swipe-back-prev': panel.data.attrs.id === this.state.swipeBackPrevPanel,
                  'View__panel--swipe-back-next': panel.data.attrs.id === this.state.swipeBackNextPanel,
                  'View__panel--swipe-back-success': this.state.swipingBackFinish === true,
                  'View__panel--swipe-back-failed': this.state.swipingBackFinish === false
                }), 
                style: this.calcPanelSwipeStyles(panel.data.attrs.id),
                key: panel.data.attrs.id
              },
              [
                createElement(
                  'div',
                  {
                    class: 'View__panel-in',
                  },
                  [panel]
                )
              ]
            )
          }))
        ),
        !!this.$slots.popout && createElement(
          'div',
          {
            class: 'View__popout',
          },
          [this.$slots.popout]
        )
      ]
    )
  },
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
    // TODO вроде бы эта байда нереактивная, и в watch бесполезно следить ?
    popout () {
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
    panelHeaderClassNames () {
      return classnames(panelHeaderClasses);
    },
    isIOS () {
      return osname === IOS
    },
    isANDROID () {
      return osname === ANDROID
    },
    panelsIds () {
      return this.$slots.default.filter(panel => typeof panel.data !== 'undefined').map(panel => {
        return panel.data.attrs.id
      })
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
    // TODO ? есть ли смысл ?
    popout: function(val, oldVal) {
      if (val && !oldVal) {
        this.blurActiveElement();
      }
    },
    activePanel: function(val, oldVal) {
      this.setPanelBg(val);
      // Нужен переход
      if (!this.state.swipingBack && !this.state.browserSwipe) {
        const firstLayerId = this.panelsIds.find(
          id => id === oldVal || id === val
        );

        const firstLayer = [].concat(this.$slots.default.filter(panel => typeof panel.data !== 'undefined' && panel.data.attrs.id === firstLayerId))[0];

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
        } else {
          // We need to reset scroll once again because changing 'animated' triggers class changes,
          // which in turn resets scroll
          const activePanelElement = this.pickPanel(this.state.activePanel);
          this.window.scrollTo(0, scrolls[this.state.activePanel]);
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
  },
  created: function () {
    this.setPanelBg(this.activePanel);
    this.state.visiblePanels = [this.activePanel];
    this.state.activePanel = this.activePanel;
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
      const panel = [].concat(this.$slots.default.filter(panel => typeof panel.data !== 'undefined' && panel.data.attrs.id == panelId))[0];
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
          this.state = Object.assign({}, this.state, { swipingBackFinish: speed > 250 || this.state.swipebackStartX + this.state.swipeBackShift > this.window.innerWidth / 2 });
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

      if (!isPrev && !isNext || this.state.swipingBackFinish !== null) {
        return {};
      }
      
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
  },
}
</script>

<style>
@import './View.css';
</style>