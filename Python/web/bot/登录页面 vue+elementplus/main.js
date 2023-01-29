const App = {
  setup() {
    Vue.onMounted(() => {
      let token = localStorage.getItem("bot_jwt_token");
      if (token) {
        parse_token(token).then(data => {
          if (Boolean(data.status) == true) {
            console.log("登录成功");
          } else {
            console.log("登录失败");
          }
        });
      }
    });
  },
  data() {
    return {
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
            min: 3,
            message: "密码至少3位",
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
      // await this.simulateLogin();
      this.loading = false;

      // 如果登录成功了 服务器端返回token,如果本地有token 那么在服务器端验证一下

      let that = this;
      verify_password(this.model.username, this.model.password).then(data => {
        if (data.status == 200) {
          that.$message.success("登录成功");
          localStorage.setItem("bot_jwt_token", data.token);
        } else {
          that.$message.error("用户名或密码错误");
        }
      });
    },
  },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

async function verify_password(username, password) {
  const response = await axios.get("https://bot.yuelili.com/api/auth", {
    params: {
      username: username,
      password: password,
    },
  });
  return response.data;
}

async function parse_token(token) {
  const response = await axios.get("https://bot.yuelili.com/api/parse_token", {
    params: {
      token: token,
    },
  });
  return response.data;
}

app.mount("#app");
