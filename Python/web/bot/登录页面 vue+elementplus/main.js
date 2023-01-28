const App = {
  data() {
    return {
      validCredentials: {
        username: "admin",
        password: "admin",
      },
      model: {
        username: "",
        password: "",
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "未填写用户名",
            trigger: "blur",
          },
          {
            min: 4,
            message: "用户名长度低于4位",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "需要填写密码", trigger: "blur" },
          {
            min: 4,
            message: "密码至少4位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;

      if (this.model.username === this.validCredentials.username && this.model.password === this.validCredentials.password) {
        this.$message.success("登录成功");
      } else {
        this.$message.error("用户名或密码错误");
      }
    },
  },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
