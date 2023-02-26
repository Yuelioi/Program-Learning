<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fs, path } from "../lib/node";


import { csi, evalES, evalFile, subscribeBackgroundColor } from "../lib/utils";
import { Yl_Tools, auth, initLogin, createFolder } from "../lib/config";
import "../index.scss";
// Prepare




let username = ref("");
let password = ref("");
let isLogin = ref(false);
const v1 = ref(0);
const v2 = ref(0);
const v3 = ref(0);
const v4 = ref(0);
const backgroundColor = ref("#282c34");
let yl_tools: Yl_Tools;

const login = async () => {
    const res = await auth(username.value, password.value)
    if (res) {
        isLogin.value = true;
    }
}

const open_proj_folder = () => {
    evalES(`openProjFolder()`);
};
const open_sub_folder = () => {
    yl_tools.open_sub_folder();
};

const json_2_mog = () => {
    evalES(`helloWorld("${csi.getApplicationID()}")`);
};
const clips_render = () => {
    evalES(`clipsRender("${v1.value}","${v2.value}","${v3.value}","${v3.value}")`);
};

onMounted(async () => {
    if (window.cep) {
        subscribeBackgroundColor((c: string) => (backgroundColor.value = c));
        const extRoot = csi.getSystemPath("extension");
        const jsxSrc = `${extRoot}/jsx/index.js`;
        const jsxBinSrc = `${extRoot}/jsx/index.jsxbin`;
        if (fs.existsSync(jsxSrc)) {
            evalFile(jsxSrc);
        } else if (fs.existsSync(jsxBinSrc)) {
            evalFile(jsxBinSrc);
        }
    }
    yl_tools = new Yl_Tools();
    createFolder(yl_tools.sub_path)
    createFolder(yl_tools.data_path)
    const res = await initLogin()
    console.log(res)
    if (res) {
        username.value = res["username"];
        password.value = res["password"];
    }
});
</script>

<template>
    <div class="app" :style="{ backgroundColor: backgroundColor }">
        <header class="app-header">
            <div id="login-bar" class="login-bar" v-show="!isLogin">
                <div class="login-box">
                    <img class="login-photo" src="@public/resources/img/profile.jpg" alt="" />
                </div>
                <p class="sign" align="center">欢迎</p>
                <input id="user" class="form-control-login" type="text" align="center" v-model="username"
                    placeholder="Username" />
                <input id="password" type="password" align="center" class="form-control-login" v-model="password"
                    placeholder="Password" />
                <div class="container"><button id="btn-login"> Sign in </button></div>
            </div>
            <div id="tools" v-show="isLogin">
                <div class="button-group">
                    <p class="des">参数组</p>
                    <div class="input">
                        <input type="text" placeholder="参数1" name="" class="params" v-model="v1" />
                        <input type="text" placeholder="参数2" name="" class="params" v-model="v2" />
                        <input type="text" placeholder="参数3" name="" class="params" v-model="v3" />
                        <input type="text" placeholder="参数4" name="" class="params" v-model="v4" />
                    </div>
                    <p class="des">导入导出</p>
                    <div class="buttons">
                        <button class="btn" @click="json_2_mog" title="单击选择指定文件">
                            剪映字幕转基本图形
                        </button>

                        <button class="btn" @click="clips_render" title="参数1：参考轨道&#10;参数2：是否选择&#10;参数3：是否连续&#10;参数4：自定义名称">
                            批量添加到AME渲染
                        </button>
                    </div>

                    <p class="des">其他</p>
                    <div class="buttons">
                        <button class="btn" @click="open_proj_folder">
                            打开工程所在文件夹
                        </button>
                        <button class="btn" @click="open_sub_folder">
                            打开字幕所在文件夹
                        </button>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style>
.yll-login-box {
    position: relative;
    background: inherit;
}

.sign {
    color: #2cccff;
    font-family: "Ubuntu", sans-serif;
    font-weight: bold;
    font-size: 23px;
}

.form-control-login {
    width: 76%;
    color: rgb(214, 214, 214);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    margin: 20px 46px;
    text-align: center;
    font-family: "Ubuntu", sans-serif;
}

form.form1 {
    padding-top: 40px;
}

.un:focus,
.pass:focus {
    border: 2px solid rgba(0, 0, 0, 0.18) !important;
}

.login-box {
    text-align: center;
    padding: 20px;
}

img.login-photo {
    height: 50px;
    width: 50px;
    margin: 10px auto;
}

#btn-login {
    cursor: pointer;
    border-radius: 5em;
    color: #fff;
    background: linear-gradient(to right, #f13fba, #4aabe4d1);
    border: 0;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 13px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

.forgot {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #e1bee7;
    padding-top: 15px;
}

a {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #e1bee7;
    text-decoration: none;
}

p.des {
    color: #43f5ff;
    margin: 10px 6px 6px 6px;
}

#tools {
    min-height: 100vh;
}

.input {
    padding: 6px;
}


input.params {
    margin: 5px 0;
}

.params {
    height: 25px;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0 10px 0 10px;
    font-size: 14px;
}

body {
    background: rgb(35, 35, 35);
    font-family: 'Ubuntu', sans-serif;
}

.container {
    text-align: center;
}

.disable {
    display: none
}

button {
    margin: 5px;
}

button.btn {
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    font-size: 14px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}



@media screen and (max-width: 880px) {
    input.params {
        width: calc(25% - 23.99px);
    }

    button.btn {
        width: calc(33.3% - 12.999px);
    }
}

@media screen and (max-width: 709px) {
    input.params {
        width: calc(25% - 23.99px);
    }

    button.btn {
        width: calc(33.3% - 12.999px);
    }
}

@media screen and (max-width: 575px) {
    input.params {
        width: calc(25% - 23.99px);
    }

    button.btn {
        width: calc(50% - 13.999px);
    }
}

@media screen and (max-width: 360px) {
    input.params {
        width: calc(50% - 23.99px);
    }

    button.btn {
        width: calc(100% - 12.99px);
    }
}

@media screen and (max-width: 300px) {
    input.params {
        width: calc(100% - 23.99px);
    }

}

@media (max-width: 400px) {
    .main {
        border-radius: 0px;
        width: 100%;
    }
}
</style>
