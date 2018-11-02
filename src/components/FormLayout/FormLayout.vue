<script>
import getClassName from '../../helpers/getClassName';
import classnames from '../../lib/classnames'

const baseClassName = getClassName('FormLayout');

export default {
  render: function (createElement) {
    return createElement(
      this.TagName,
      {
        class: this.classNames,
        attrs: this.$attrs,
        on: {
          submit: this.onSubmitMethod
        }
      },
      [
        createElement(
          'div',
          {
            class: 'FormLayout__container',
          },
          []
          .concat(
            this.$slots.default.map((field, i) => {
              return field && field.data ? createElement(
                'div',
                {
                  class: 'FormLayout__row'
                },
                [
                  field.data.attrs && field.data.attrs.top && createElement(
                    'div',
                    {
                      class: 'FormLayout__row-top',
                    },
                    field.data.attrs.top
                  ),
                  createElement(
                    'div',
                    {
                      class: 'FormLayout__field',
                    },
                    [field]
                  ),
                  field.data.attrs && field.data.attrs.bottom && createElement(
                    'div',
                    {
                      class: 'FormLayout__row-bottom',
                    },
                    field.data.attrs.bottom
                  ),
                ]
              ) : null
            })
          )
          .concat(
            this.TagName === 'form' && createElement(
              'input',
              {
                attrs: {
                  type: 'submit'
                },
                class: 'FormLayout__submit'
              }
            )
          )
        )
      ]
    )
  },
  computed: {
    classNames () {
      return classnames(baseClassName)
    },
  },
  props: {
    TagName: {
      type: String,
      required: false,
      default: 'form',
    },
    // onSubmit: {
    //   type: Function
    // }
  },
  methods: {
    onSubmitMethod (e) {
      // this.onSubmit ? this.onSubmit(e) : e.preventDefault();
      this.$emit('submit', e);
    }
  }
}
</script>

<style>
@import './FormLayout.css';
</style>