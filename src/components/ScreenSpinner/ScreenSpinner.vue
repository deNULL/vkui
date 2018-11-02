<template>
  <PopoutWrapper :class="classNames">
    <Spinner v-bind="$attrs" />
  </PopoutWrapper>
</template>

<script>
import Spinner from '../Spinner/Spinner';
import PopoutWrapper from '../PopoutWrapper/PopoutWrapper';
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('ScreenSpinner');

export default {
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  components: {
    Spinner,
    PopoutWrapper,
  },
}
</script>