export default {
    template: `
    <button @click="handle_click">
      <strong>{{title}}: {{value}}</strong>
    </button>`,
    data() {
        return {
            value: 1,
        };
    },
    methods: {
        handle_click() {
            this.value += 1;
            this.$emit("change", this.value);
        },
        reset() {
            this.value = 1;
        },
    },
    props: {
        title: String,
    },
};