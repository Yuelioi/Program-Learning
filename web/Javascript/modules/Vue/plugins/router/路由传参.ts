const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Login",
        component: () => import("../components/login.vue"),
    },
    {
        //动态路由参数
        path: "/reg/:id",
        name: "Reg",
        component: () => import("../components/reg.vue"),
    },
];
