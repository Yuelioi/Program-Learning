import {
    helloError,
    helloArrayStr,
    helloObj,
} from "../utils/samples";

import { clipsRender } from "./batch"


export const qeDomFunction = () => {
    if (typeof qe === "undefined") {
        app.enableQE();
    }
    if (qe) {
        qe.name;
        qe.project.getVideoEffectByName("test");
    }
};

export const helloWorld = () => {
    alert("Hello from Premiere Pro.");
};
const helloNum = (num: number) => {
    alert("Hello from Premiere Pro." + num);
};


const openProjFolder = (num: number) => {
    alert(num.toString())
    Folder(File(app.project.path).parent.fsName).execute();
};
const myFuncObj = (obj: { height: number, width: number }) => {
    alert(obj.height.toString())
    return {
        y: obj.height,
        x: obj.width,
    };
};
export const myFunc = (num: number, word: string) => {
    alert(num.toString())
    return { num, word };
}




export { helloError, helloArrayStr, helloObj, helloNum, clipsRender, openProjFolder, myFuncObj };




