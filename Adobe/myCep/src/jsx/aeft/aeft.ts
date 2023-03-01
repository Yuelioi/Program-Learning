import {
    helloError,
    helloStr,
    helloNum,
    helloArrayStr,
    helloObj,
} from "../utils/samples";
export { helloError, helloStr, helloNum, helloArrayStr, helloObj };

export const helloWorld = () => {
    alert("Hello from After Effe2");
    const activeComp = app.project.activeItem;
    alert(activeComp ? (activeComp as CompItem).name : '没有活动项目');
};
