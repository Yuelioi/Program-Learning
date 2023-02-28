import {
    helloError,
    helloStr,
    helloNum,
    helloArrayStr,
    helloObj,
} from "../utils/samples";

// import { clipsRender } from "./batch"
// import { clipsRender } from "./test"

export const qeDomFunction = () => {
    if (typeof qe === "undefined") {
        app.enableQE();
    }
    if (qe) {
        qe.name;
        qe.project.getVideoEffectByName("test");
    }
};


export const openProjFolder = (num: number) => {
    alert("Hello from Premiere Pro.1345");
    Folder(File(app.project.path).parent.fsName).execute();
};

export const helloWorld = () => {
    alert("Hello from Premiere Pro.12");
};


export function clipsRender() {
    // const sequence = app.project.activeSequence || false;
    // alert(sequence.name)
}
export function test() {
    // const sequence = app.project.activeSequence || false;
    // alert(sequence.name)
}

export { helloError, helloStr, helloNum, helloArrayStr, helloObj };
