
/**
 * @description get the property in prop group
 * @param curPropGroup 
 * @param propName 
 * @returns 
 */
export const find_prop = function (curPropGroup: PropertyGroup, propName: string): PropertyGroup | Property | null {
    for (var i = 1; i <= curPropGroup.numProperties; i++) {
        var curProp = curPropGroup.property(i);
        if (curProp.matchName === propName) {
            return curProp;
        }
        if (curProp instanceof PropertyGroup) {
            var result = find_prop(curProp, propName); // 递归调用，并将返回值存储在变量中
            if (result) {
                return result; // 如果找到属性，则将其返回到调用的函数中
            }
        }
    }
    return null; // 如果没有找到属性，则返回 null
}


export const find_prop2 = function (curPropGroup: PropertyGroup, srcName: string, trgName: string) {
    for (var i = 1; i <= curPropGroup.numProperties; i++) {
        var curProp = curPropGroup.property(i);
        if (curProp.matchName === propName) {
            return curProp;
        }
        if (curProp instanceof PropertyGroup) {
            var result = find_prop(curProp, propName); // 递归调用，并将返回值存储在变量中
            if (result) {
                return result; // 如果找到属性，则将其返回到调用的函数中
            }
        }
    }
    return null; // 如果没有找到属性，则返回 null
}