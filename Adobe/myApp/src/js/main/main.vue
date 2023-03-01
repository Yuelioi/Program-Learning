<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fs, os, path } from "@jslib/node";
import { sub_path, data_path, pwd_json_path } from "@jslib/pathlib"
import { createFolder } from "@jslib/os"
import {
    csi,
    evalES,
    evalFile,
    evalTS,
    openLinkInBrowser,
    subscribeBackgroundColor,
} from "../lib/utils";
import "../index.scss";
const { exec } = require('child_process');



const count = ref(2);
const backgroundColor = ref("#282c34");

let username = ref("");
let password = ref("");
let isLogin = ref(true);
const v1 = ref(0);
const v2 = ref(0);
const v3 = ref(0);
const v4 = ref(0);
let isLoading = ref(false);

const login = async () => {
    isLoading.value = true;
    // const res = await auth(username.value, password.value)
    isLoading.value = false;
    // if (res) {
    //     isLogin.value = true;
    // }
}


const jsxTest = () => {
    console.log(evalES(`openProjFolder("${csi.getApplicationID()}")`));
};

const open_sub_folder = () => {
    alert("Open");
    exec(`explorer.exe "${path.resolve(sub_path)}"`, (err: any) => {
        if (err) {
            console.error(`Failed to open folder "${sub_path}". Error:`, err);
        } else {
            console.log(`Folder "${sub_path}" opened successfully.`);
        }
    });

};

const json_2_mog = () => {
    evalES(`clipsRender("${csi.getApplicationID()}")`);

};
const open_proj_folder = () => {
    console.log(evalES(`openProjFolder("${csi.getApplicationID()}")`));
};


const clips_render = () => {
    // console.log(evalES(`clipsToRender("${csi.getApplicationID()}")`));
};

//* Demonstration of End-to-End Type-safe ExtendScript Interaction
const jsxTestTS = () => {
    evalTS("helloStr", "test").then((res) => {
        console.log(res);
    });
    evalTS("helloNum", 1000).then((res) => {
        console.log(typeof res, res);
    });
};

const nodeTest = () => {
    alert(
        `Node.js ${process.version}\nPlatform: ${os.platform
        }\nFolder: ${path.basename(window.cep_node.global.__dirname)}`
    );
};
onMounted(async () => {
    if (window.cep) {
        subscribeBackgroundColor((c: string) => (backgroundColor.value = c));
        const extRoot = csi.getSystemPath("extension");
        const jsxSrc = `${extRoot}/jsx/index.js`;
        const jsxBinSrc = `${extRoot}/jsx/index.jsxbin`;
        if (fs.existsSync(jsxSrc)) {
            console.log(jsxSrc);
            evalFile(jsxSrc);
        } else if (fs.existsSync(jsxBinSrc)) {
            console.log(jsxBinSrc);
            evalFile(jsxBinSrc);
        }

        await createFolder(sub_path)
        await createFolder(data_path)
        if (!fs.existsSync(pwd_json_path)) {
            // 如果文件不存在，则创建该文件
            fs.writeFileSync(pwd_json_path, "");
        }
    }
});
</script>

<template>
    <div class="app" :style="{ backgroundColor: backgroundColor }">
        <header class="app-header">
            <div class="button-group">
                <button @click="count++">Count is: {{ count }}</button>
                <button @click="nodeTest">
                    <img class="icon-button" src="../assets/node-js.svg" />
                </button>
                <button @click="jsxTest">
                    <img class="icon-button" src="../assets/adobe.svg" />
                </button>
                <button @click="jsxTestTS">Ts1</button>
            </div>
        </header>
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
