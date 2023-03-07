// import mod  假设该mod没有type申明
// 解决方案
declare module "mod"; // 默认是any
declare module "mod" {
    export default Array;
}
