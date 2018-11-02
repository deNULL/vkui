<script>
const IOS_PART_HEIGHT = 0.275;

export default {
  render: function(createElement) {
    let parts = this.iosStyles;

    if (!this.on) {
      parts = this.iosStyles.slice(0, Math.round(this.progress / (100 / 12)));
    }

    return createElement(
      'g',
      parts.map((item, i) => {
        const { style, ...itm } = item
        return createElement(
          'rect',
          {
            class: 'Spinner__part',
            attrs: {
              x: "46.25%",
              y: "36.25%",
              width: "7.5%",
              height: "27.5%",
              key: `spinner-part-${i}`,
              ...itm,
            },
            style,
          }
        )
      })
    );
  },
  data: () => ({
    iosStyles: [],
    c: null,
    r: null,
    ty: null,
  }),
  computed: {
    
  },
  props: {
    size: {
      type: Number,
      default: 20,
    },
    duration: {
      type: Number,
      default: 1.4,
    },
    on: {
      type: Boolean,
      default: true
    },
    progress: {
      type: Number,
      default: null,
    },
  },
  created () {
    this.c = 0.5 * this.size;
    this.r = Math.max(Math.floor(this.size * 0.075), 2);
    this.ty = Math.ceil(-0.5 * (1 - IOS_PART_HEIGHT) * this.size);

    for (let i = 0; i < 12; i++) {
      this.iosStyles.push({
        transform: `rotate(${i * 30}, ${this.c}, ${this.c}) translate(0 ${this.ty})`,
        rx: this.r,
        ry: this.r,
        style: {
          animationDelay: Math.round(this.duration / 12 * 100 * (-11 + i)) / 100 + 's'
        }
      });
    }
  }
}
</script>