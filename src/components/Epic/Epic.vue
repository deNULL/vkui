<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('Epic');

export default {
  render: function(createElement) {
    return createElement(
      'div',
      {
        class: this.classNames,
        attrs: this.$attrs,
      },
      [
        this.$slots.default.find(item => typeof item.data !== 'undefined' && item.data.attrs.id === this.activeStory),
        this.$slots.tabbar
      ]
    )
  },
  provide: {
    hasTabbar: {
      type: Boolean,
    }
  },
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  props: {
    activeStory: {
      type: String,
      required: true,
    },
  },
  created () {
    this.hasTabbar = !!this.$slots.tabbar
  }
}
</script>

<style>
@import './Epic.css';
</style>