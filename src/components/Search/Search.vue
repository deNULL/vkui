<script>
import SearchIOS from '../SearchIOS/SearchIOS';
import SearchAndroid from '../SearchAndroid/SearchAndroid';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames';
import { platform, IOS } from '../../lib/platform'

const baseClassNames = getClassName('Search');
const osname = platform();

export default {
  components: {
    SearchIOS, SearchAndroid
  },
  props: {
    value: String,
  },
  computed: {
    isIOS() {
      return osname === IOS;
    },
    classNames () {
      return classnames(baseClassNames);
    }
  },
  render(createElement) {
    return createElement(this.isIOS ? 'SearchIOS' : 'SearchAndroid', {
      props: Object.assign({}, this.$attrs, {
        value: this.value
      }),
      on: Object.assign({}, this.$listeners, {
        input: (value) => this.$emit('input', value)
      }),
      scopedSlots: {
        after: props => this.$slots.after
      },
    })
  }
}
</script>