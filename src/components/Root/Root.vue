<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import transitionEvents from '../../lib/transitionEvents';
import { ANDROID, platform } from '../../lib/platform';

const osname = platform();
const baseClassName = getClassName('Root');

export default {
  render: function(createElement) {
    return createElement(
      'div',
      {
        class: this.classNames,
      },
      []
      .concat(this.$slots.default.filter(View => typeof View.data !== 'undefined' && this.state.visibleViews.indexOf(View.data.attrs.id) >= 0).map(View => {
        View.componentOptions.propsData.inRoot = true;
        View.componentOptions.propsData.isNext = View.data.attrs.id === this.state.nextView;
        View.componentOptions.propsData.isPrev = View.data.attrs.id === this.state.prevView;
        return createElement(
          'div',
          {
            class: this.rootViewClassNames[View.data.attrs.id],
            attrs: {
              key: View.data.attrs.id,
              id: `view-${View.data.attrs.id}`
            }
          },
          [View]
        )
      }))
      .concat(
        !!this.popout && createElement(
          'div',
          {
            class: 'Root__popout',
          },
          this.popout
        )
      )
    );
  },
  data: () => ({
    state: {
      activeView: null,
      prevView: null,
      nextView: null,
      visibleViews: [],
      isBack: undefined,
      scrolls: {},
      transition: null,
    }
  }),
  inject: {
    window: {
      default: window
    },
    document: {
      default: document
    }
  },
  computed: {
    isANDROID () {
      return osname === ANDROID;
    },
    classNames () {
      return classnames(baseClassName, {
        'Root--transition': this.stateTransition
      })
    },
    rootViewClassNames () {
      let classNames = []
      this.$slots.default.filter(View => typeof View.data !== 'undefined').map(View => {
        classNames[View.data.attrs.id] = classnames('Root__view', {
          'Root__view--hide-back': View.data.attrs.id === this.state.prevView && this.state.isBack,
          'Root__view--hide-forward': View.data.attrs.id === this.state.prevView && !this.state.isBack,
          'Root__view--show-back': View.data.attrs.id === this.state.nextView && this.state.isBack,
          'Root__view--show-forward': View.data.attrs.id === this.state.nextView && !this.state.isBack,
          'Root__view--active': View.data.attrs.id === this.state.activeView
        })
      })
      return classNames;
    },
    popout () {
      return this.$slots.popout;
    },
    stateTransition () {
      return this.state.transition;
    },
  },
  props: {
    activeView: {
      type: String,
      required: true,
    },
    onTransition: {
      type: Function,
    },
  },
  watch: {
    popout: function(val, oldVal) {
      if (val && !oldVal) {
        this.blurActiveElement();
      }
    },
    activeView: function(val, oldVal) {
      let pageYOffset = this.window.pageYOffset;
      const firstLayerId = this.$slots.default.filter(View => typeof View.data !== 'undefined').find(view => {
        return view.data.attrs.id === oldVal || view.data.attrs.id === val;
      }).data.attrs.id;
      const isBack = firstLayerId === val;

      this.blurActiveElement();

      const nextView = val;
      const prevView = oldVal;

      this.state = Object.assign({}, this.state, {
        scrolls: Object.assign({}, this.state.scrolls, {
          [oldVal]: pageYOffset
        }),
        transition: true,
        activeView: null,
        nextView,
        prevView,
        visibleViews: [nextView, prevView],
        isBack
      });
    },
    stateTransition: function(val, oldVal) {
      this.$nextTick(function(){
        if (!oldVal && val) {
          const prevViewElement = this.document.getElementById(`view-${this.state.prevView}`);
          const nextViewElement = this.document.getElementById(`view-${this.state.nextView}`);

          prevViewElement.querySelector('.View__panel').scrollTop = this.state.scrolls[this.state.prevView];

          if (this.state.isBack) {
            nextViewElement.querySelector('.View__panel').scrollTop = this.state.scrolls[this.state.nextView];
          }
          this.waitAnimationFinish(this.state.isBack ? prevViewElement : nextViewElement, this.onAnimationEnd);
        } else {
          this.window.scrollTo(0, this.state.scrolls[this.state.activeView]);
        }
      })
    },
  },
  created () {
    this.state.activeView = this.activeView;
    this.state.visibleViews = [this.activeView];
  },
  methods: {
    waitAnimationFinish (elem, eventHandler) {
      // console.log("waitAnimationFinish")
      if (transitionEvents.supported) {
        const eventName = transitionEvents.prefix ? transitionEvents.prefix + 'AnimationEnd' : 'animationend';

        elem && elem.removeEventListener(eventName, eventHandler);
        elem && elem.addEventListener(eventName, eventHandler);
      } else {
        setTimeout(eventHandler.bind(this), this.isANDROID ? 300 : 600);
      }
    },

    onAnimationEnd (e = { manual: true }) {
      // console.log("onAnimationEnd")
      if ([
        'root-android-animation-hide-back',
        'root-android-animation-show-forward',
        'root-ios-animation-hide-back',
        'root-ios-animation-show-forward'
      ].indexOf(e.animationName) > -1 || e.manual) {
        const isBack = this.state.isBack;
        this.state = Object.assign({}, this.state, {
          activeView: this.state.nextView,
          prevView: null,
          nextView: null,
          visibleViews: [this.state.nextView],
          transition: false,
          isBack: undefined
        }, () => {
          isBack ? this.window.scrollTo(0, this.state.scrolls[this.state.activeView]) : this.window.scrollTo(0, 0);
          this.onTransition && this.onTransition(this.state.isBack);
        });
      }
    },

    blurActiveElement () {
      if (typeof this.window !== 'undefined' && this.document.activeElement) {
        this.document.activeElement.blur();
      }
    }
  }
}
</script>

<style>
@import './Root.css';
</style>