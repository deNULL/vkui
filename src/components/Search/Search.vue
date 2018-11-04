<template>
  <component :is="isIOS ? 'SearchIOS' : 'SearchAndroid'" v-bind="$attrs" v-on="$listeners"></component>
</template>

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
    className: String,
    getRootRef: Function,
    autoComplete: String,
  },
  computed: {
    isIOS() {
      return osname === IOS;
    },
    classNames () {
      return classnames(baseClassNames);
    }
  }
}
</script>