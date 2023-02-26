import {
    helloError,
    helloArrayStr,
    helloObj,
} from "../utils/samples";

import { clipsRender } from "./batch"

export { helloError, helloArrayStr, helloObj, helloNum, clipsRender };

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


export const openProjFolder = () => {
    alert("Open Folder")
    Folder(File(app.project.path).parent.fsName).execute();
};





