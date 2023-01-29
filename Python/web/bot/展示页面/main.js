const App = {
  data() {
    return {
      search: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "John",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  computed: {
    filterTableData() {
      return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
