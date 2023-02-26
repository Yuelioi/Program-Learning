
function 进阶() {
    // Array.indexOf()
    if (!Array.prototype.indexOf) { Array.prototype.indexOf = (function (Object, max, min) { return function indexOf(member, fromIndex) { if (this === null || this === undefined) { throw TypeError("Array.prototype.indexOf called on null or undefined") } var that = Object(this), Len = that.length >>> 0, i = min(fromIndex | 0, Len); if (i < 0) { i = max(0, Len + i) } else { if (i >= Len) { return -1 } } if (member === void 0) { for (; i !== Len; ++i) { if (that[i] === void 0 && i in that) { return i } } } else { if (member !== member) { return -1 } else { for (; i !== Len; ++i) { if (that[i] === member) { return i } } } } return -1 } })(Object, Math.max, Math.min) };

    // JSON.parse  JSON.stringify
    "object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();

    //对象原型修改 .prototype
    Project.prototype.addComp = function (name, width, height, duration, pixelaspect, framerate) {
        var n = app.project.items.addComp(name, width, height, 1, pixelaspect, framerate);
        n.duration = duration;
        return n;
    }

    /**
 * @description：判断目标是否在数组内
 * @param {*} arr ：数组
 *  * @param {*} layer ：判断值
 */
    function is_in_array(arr, v) {
        for (var i = 0; i < arr.length; i++) {
            if (v === arr[i]) {
                return true;
            }
        }
        return false;
    }


}


function 必用变量() {
    // 变量篇
    var comp = app.project.activeItem;  // 激活的合成
    var itms = app.project.selection // 项目面板的选择列表
    var selLayers = app.project.activeItem.selectedLayers  // 当前合成的图层选择列表
    var layerSelProps = layer.selectedProperties  // 当前图层/合成的属性选择列表。合成要用合成.selectedProperties
    var propSelKeys = prop.selectedKeys


    // 数量
    length
    project.numItems  // project.item(i)
    comp.numLayers    // comp.layer(i)
    propGroup.numProperties

    // 创建合成与图层
    var newComp = project.items.addComp("Import Mask", 1920, 1080, 1, 10, 30);
    var importLayer = newComp.layers.addSolid([1, 1, 1], "Mask Layer", 1920, 1080, 1, 10);

    // 撤销组
    app.beginUndoGroup("My Undo Group 01");
    app.endUndoGroup();


    // 打开新面板
    cs.requestOpenExtension(id)
}

function 判断() {

    // //判断图层
    // 文字图层[object TextLayer]
    // 纯色图层[object AVLayer]
    // 灯光图层[object LightLayer]
    // 摄像机图层[object CameraLayer]
    // 空对象[object AVLayer]
    // 形状图层[object ShapeLayer]
    // 调整图层[object AVLayer]
    // PhotoShop[object AVLayer]

    // // 判断对象
    // PropertyGroup
    // CompItem
    // ShapeLayer
    // Folder

    // PropertyType.PROPERTY
    /**
 * @description：判断图层类型
 * @param {*} layer ：图层
 */
    function type_of_layer(layer) {
        if (layer instanceof AVLayer) {
            if (layer.source instanceof CompItem) {
                alert("合成");
            } else if (layer.source instanceof FootageItem) {
                if (layer.nullLayer) {
                    alert("空对象");
                } else if (layer.source.mainSource instanceof SolidSource) {
                    if (layer.adjustmentLayer == true) {
                        alert("调整图层");

                    } else if (layer.frameBlendingType) {
                        alert("纯色图层");
                    } else {
                        alert("空对象");
                    }
                } else {
                    alert("素材");
                }
            }
        } else {
            alert("不是 AV");
        }
    }
}
function 遍历() {
    // 遍历属性/属性组
    function property_recursive(propertyGroup) {
        for (var i = 1; i <= propertyGroup.numProperties; i++) {
            var property = propertyGroup.property(i);

            // 判断当前属性是否为属性组，如果是，则继续遍历
            if (property instanceof PropertyGroup) {
                property_recursive(property);
                //对每个属性组逐个操作
                property.XXX
                continue;
            }

            // 对每个属性逐个操作
            property.XXX
        }
    }


    function comp_recursive(mainComp) {

        function comp_recursive(comp) {
            // 循环合成内的图层与子合成
            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);
                // 检查图层是否有源 并且类型为合成
                if (layer.source && layer.source instanceof CompItem) {
                    // 检查是否遍历过该合成
                    check = checkPreviousComps(layer.source.id);
                    if (check == null) {
                        // 存储原合成id 用于校对
                        var sourceID = layer.source.id;

                        // 再次遍历
                        comp_recursive(layer.source)
                        // 存储新合成id 用于校正
                        var destID = layer.source.id;
                        // 添加校正id到数组
                        previousComps[sourceID] = destID;
                    } else {
                    }
                }
            }
            // 为了递归，返回复制后的合成
            return comp;
        }

        // 检查以前的复制，确保一个合成不会复制两次
        function checkPreviousComps(checkID) {
            if (previousComps[checkID]) {
                return getItemWithID(previousComps[checkID]);
            }
            return null;
        }

        // 返回具有指定 ID 的项目
        function getItemWithID(id) {
            for (x = 1; x <= app.project.numItems; x++) {
                if (app.project.item(x).id == id) {
                    return app.project.item(x);
                }
            }
            return null;
        }
    }


    // 遍历项目面板的文件与文件夹
    // 文件夹遍历加判断
    function folder_recursive(folderGroup) {
        for (var i = 1; i <= folderGroup.numItems; i++) {
            var items = folderGroup.item(i);

            // 判断当前属性是否为文件夹，如果是，则继续遍历
            if (items instanceof FolderItem) {
                //对每个文件夹逐个操作 比如判断名称
                if (items.name == "footage") {
                    XXX
                }
                folder_recursive(items);
                continue;
            }

            // 对每个文件逐个操作
            // 
        }
    }

    /**
     * @description：获取图层的所有子图层
     * @param comp ：所在合成
     * @param layer ：图层
     */
    function get_layer_childrens(comp, layer) {
        var children_layers = []
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).parent == layer) {
                children_layers.push(comp.layer(i))
            }
        }
        return children_layers
    }
}









function 合成与图层() {

    /**
     * @description：获取合成工作区入点和出点
     * @param comp ：合成
     * @returns ：时间列表
     */
    function get_comp_time(comp) {
        return [comp.workAreaStart, comp.workAreaStart + comp.workAreaDuration]
    }

    /**
     * @description：获取合成标记时间列表
     * @param comp ：合成
     * @returns ：标记时间列表/false
     * @type ：合成与图层
     */
    function get_comp_marker_time(comp) {
        var marker_time = []
        var comp_mark = comp.markerProperty

        if (comp_mark.numKeys > 0) {
            for (var i = 1; i <= comp_mark.numKeys; i++) {
                marker_time.push(comp_mark.keyTime(i))
            }
            return marker_time
        } else {
            return false
        }
    }

    /**
     * @description：基于时间列表设置合成标记
     * @param comp ：合成
     * @param marker_time ：时间列表
     * @type ：合成与图层
     */

    function set_comp_marker_time(comp, marker_time) {
        var comp_mark = comp.markerProperty

        for (var i = 0; i < marker_time.length; i++) {
            var compMarker = new MarkerValue(i + 1);
            comp_mark.setValueAtTime(marker_time[i], compMarker)
        }
    }


    /**
     * @description：获取图层标记时间列表
     * @param layer ：图层
     * @returns ：标记时间列表/false
     * @type ：合成与图层
     */
    function get_layer_marker_time(layer) {
        var marker_time = []
        var layer_mark = layer.property("Marker")

        if (layer_mark.numKeys > 0) {
            for (var i = 1; i <= layer_mark.numKeys; i++) {
                marker_time.push(layer_mark.keyTime(i))
            }
            return marker_time
        } else {
            return false
        }
    }

    /**
     * @description：基于时间列表设置图层标记
     * @param comp ：图层
     * @param marker_time ：时间列表
     * @type ：合成与图层
     */

    function set_layer_marker_time(layer, marker_time) {
        var layer_mark = layer.property("Marker")

        for (var i = 0; i < marker_time.length; i++) {
            var layerMarker = new MarkerValue(i + 1);
            layer_mark.setValueAtTime(marker_time[i], layerMarker)
        }
    }

    /**
 * @description：基于时间列表设置图层标记
 * @param comp ：图层
 * @param marker_time ：时间列表
 * @type ：合成与图层
 */

    function set_layer_marker_time(layer, marker_time) {
        var layer_mark = layer.property("Marker")

        for (var i = 0; i < marker_time.length; i++) {
            var layerMarker = new MarkerValue(i + 1);
            layer_mark.setValueAtTime(marker_time[i], layerMarker)
        }
    }
}


function 属性_关键帧_表达式_效果() {

    /**
     * @description：获取一个属性关键帧值列表
     * @param prop ：属性
     * @returns ：关键帧时间列表
     * @other：(带表达式就改成true)
     */
    function get_key_value(prop) {
        var key_value = []

        for (var i = 1; i <= prop.numKeys; i++) {
            key_value.push(prop.valueAtTime(prop.keyTime(i), false))
        }
        return key_value
    }

    /**
     * @description：获取第一个选择关键帧的属性
     * @param {*} comp 
     * @returns 第一个属性 / false
     */
    function check_sel_key(comp) {
        var sel_props = comp.selectedProperties
        var prop = false
        if (sel_props.length > 0) {
            for (var i = 0; i < sel_props.length; i++) {
                if (sel_props[i].propertyType == PropertyType.PROPERTY && sel_props[i].selectedKeys.length > 0) {
                    prop = sel_props[i]
                    return prop
                }
            }
        }
    }

    /**
     * @description：获取合成所有选择的  普通属性
     * @param {*} comp 
     * @returns 属性列表 / false
     */
    function get_sel_props(comp) {
        var sel_props = comp.selectedProperties
        var prop_list = []
        if (sel_props.length > 0) {
            for (var i = 0; i < sel_props.length; i++) {
                if (sel_props[i].propertyType == PropertyType.PROPERTY) {
                    prop_list.push(sel_props[i])
                }
            }
        }
        if (prop_list.length > 0) {
            return prop_list
        } else {
            return false
        }
    }

    /**
     * @description：移除合成关键帧选择状态
     * @param comp ：合成
     */
    function remove_key_selected(comp) {
        var layer = comp.layers.addNull(1);
        var prop = layer.property("ADBE Transform Group").property("ADBE Position");
        prop.addKey(1);
        prop.removeKey(1)
        layer.remove()
    }



    /**
     * @description：获取一个属性关键帧时间列表
     * @param prop ：属性
     * @returns ：关键帧时间列表
     * @other：选择关键帧 .numKeys → .selectedKeys.length
     */
    function get_key_time(prop) {
        var key_time = []

        for (var i = 1; i <= prop.numKeys; i++) {
            key_time.push(prop.keyTime(i))
        }

        return key_time
    }




    /**
     * @description：基于始末时间获取每个单帧时间
     * @param {*} comp ：合成
     * @param {*} start_time ：起始时间
     * @param {*} end_time ：结束时间
     * @returns 
     */
    function get_every_frame_time_by_time(comp, start_time, end_time) {
        var fd = comp.frameDuration
        var time_list = []

        for (var i = start_time; i <= end_time; i += fd) {
            time_list.push(i)
        }

        return time_list
    }


    /**
     * @description：基于时间、值列表 设置一个属性的关键帧值
     * @param {*} prop :属性
     * @param {*} key_time ：时间列表
     * @param {*} key_value ：值列表
     */
    function set_key_value(prop, key_time, key_value) {
        prop.setValuesAtTimes(key_time, key_value)
    }

    /**
     * @description：转为整数帧时间
     * @param {*} comp ：合成
     * @param {*} input_time ：数值（秒）
     * @returns ：整数帧时间
     */
    function get_key_int_index_time(comp, input_time) {
        var fd = comp.frameDuration
        var md = input_time % fd // 取余

        if (md == 0) {
            return input_time
        } else if (md < fd / 2) {
            return input_time - md
        } else {
            return input_time + fd - md
        }
    }

    /**
     * @description：设置图层效果
     * @param layer ：图层
     * @param effectName：效果名称
     */
    function set_effect(layer, effectName) {
        var effects = layer.property('ADBE Effect Parade');
        if (effects.canAddProperty(effectName)) {
            effects.addProperty(effectName);
        } else {
            throw new Error('Can not add effect "' + effectName + '" to this layer');
        }
    }




    /**
     * @description：设置/移除一个属性的表达式
     * @param prop ：属性
     * @param exp_content：表达式内容
     * @other：移除只要把内容改成 "" 就行
     */
    function set_expression(prop, exp_content) {
        switch (prop.propertyType) {
            case PropertyType.PROPERTY:
                if (prop.canSetExpression)
                    prop.expression = exp_content;
                break;
            case PropertyType.INDEXED_GROUP:
                break;
            case PropertyType.NAMED_GROUP:
                break;
            default:
                break;
        }
    }


    /**
     * @description：基于关键帧信息，创建一个关键帧
     * @param {*} key_info :关键帧信息，使用save_key_info(prop,index)获得
     * @param {*} newTime ：新关键帧的时间：数值（秒）
     */
    function create_new_key(key_info, newTime, del) {

        var prop = key_info["prop"]
        var newKeyIndex = prop.addKey(newTime);
        prop.setValueAtKey(newKeyIndex, key_info.value);  // 设置关键帧的值


        if ((key_info["key_hold"])) {
            prop.setTemporalEaseAtKey(newKeyIndex, key_info["inTempEase"], key_info["outTempEase"]);  // 设置指定关键帧的入点出点时间缓动
        }
        prop.setInterpolationTypeAtKey(newKeyIndex, key_info["inInterp"], key_info["outInterp"]);  // 设置入点出点插值类型

        if ((key_info["both_bezier"]) && key_info["tempContBezier"]) {
            prop.setTemporalContinuousAtKey(newKeyIndex, tempContBezier);  // 设置时间连续性
            prop.setTemporalAutoBezierAtKey(newKeyIndex, tempAutoBezier);  // 设置时间自动贝塞尔
        }

        if (key_info["key_space"]) {
            prop.setSpatialContinuousAtKey(newKeyIndex, key_info["spatContBezier"]);  // 设置空间连续性
            prop.setSpatialAutoBezierAtKey(newKeyIndex, key_info["spatAutoBezier"]);  // 设置空间自动贝塞尔

            prop.setSpatialTangentsAtKey(newKeyIndex, key_info["inSpatTangent"], key_info["outSpatTangent"]);  // 设置入点出点切线向量
            prop.setRovingAtKey(newKeyIndex, key_info["roving"]);  // 设置关键帧漂浮
        }
    }


    /**
     * @description：保存一个关键帧所有信息
     * @param {*} prop :属性
     * @param {*} key_index ：关键帧索引
     * @returns ：关键帧所有信息
     */

    function save_key_info(prop, key_index) {

        var inInterp = prop.keyInInterpolationType(key_index);    // 入点插值类型(线性、贝塞尔、定格)
        var outInterp = prop.keyOutInterpolationType(key_index);  //出点插值类型(线性、贝塞尔、定格)

        key_info = {
            "prop": prop,  // 关键帧所在属性
            "index": key_index,  // 关键帧索引
            "time": prop.keyTime(key_index), // 关键帧时间
            "value": prop.keyValue(key_index), // 关键帧值
            "inInterp": inInterp,
            "outInterp": outInterp,
            "both_bezier": (inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER), // 判断入点/出点贝塞尔  如果都是的话 先存一下
            "key_hold": outInterp !== KeyframeInterpolationType.HOLD,  // 判断出点是不是 非定格
            "key_space": (prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) || (prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL),  // 判断是不是空间值
        }


        // 判断入点/出点贝塞尔  如果是的话 先存一下
        if ((key_info["both_bezier"])) {
            key_info["tempAutoBezier"] = prop.keyTemporalAutoBezier(key_index); // 时间自动贝塞尔 → 布尔
            key_info["tempContBezier"] = prop.keyTemporalContinuous(key_index); // 时间连续性 → 布尔
        }

        // 判断出点是不是 非定格
        if ((key_info["key_hold"])) {
            key_info["inTempEase"] = prop.keyInTemporalEase(key_index);  // 入点关键帧缓入（1/2/3个对象）
            key_info["outTempEase"] = prop.keyOutTemporalEase(key_index);  // 出点关键帧缓入（1/2/3个对象）
        }

        // 2D空间值 与 3D空间值：锚点、位置之类
        if ((key_info["key_space"])) {
            key_info["spatAutoBezier"] = prop.keySpatialAutoBezier(key_index);  // 空间自动贝塞尔 → 布尔
            key_info["spatContBezier"] = prop.keySpatialContinuous(key_index); // 空间连续性 → 布尔

            key_info["inSpatTangent"] = prop.keyInSpatialTangent(key_index);  // 入点空间线性 → 浮点值数组(2/3)
            key_info["outSpatTangent"] = prop.keyOutSpatialTangent(key_index); // 出点空间线性 → 浮点值数组(2/3)
            key_info["roving"] = prop.keyRoving(key_index);
        }
        return key_info

    }


    /**
 * @description：保存一个合成中，所有属性的所有选择的关键帧所有信息
 * @description：需要前置 get_sel_props 函数与 save_key_info 函数
 * @param {*} comp 
 * @returns props_key_info:合成中选择的属性、属性中选择的关键帧信息
 */
    function save_comp_sel_key_info(comp) {
        var props = false
        props_key_info = []

        if (props = get_sel_props(comp)) {
            for (var i = 0; i < props.length; i++) {
                var key_info = []
                var prop = props[i]
                var key_index_list = prop.selectedKeys
                for (var j = 0; j < key_index_list.length; j++) {
                    key_info.push(save_key_info(prop, key_index_list[j]))
                }
                props_key_info.push(key_info)
            }
            return props_key_info
        }
    }


    function shift_key_to_new_time(prop, key_input_index, offset, key_output_index) {

        // Remember the key's settings before creating the new setting, just in case creating the new key affects key_input_index's settings
        // 记住旧关键帧的设置，然后基于该设置，创建新关键帧

        var inInterp = prop.keyInInterpolationType(key_input_index);    // 入点插值类型(线性、贝塞尔、定格)
        var outInterp = prop.keyOutInterpolationType(key_input_index);  //出点插值类型(线性、贝塞尔、定格)
        var key_input_index_Value = prop.keyValue(key_input_index);            // 关键帧值 值




        // 判断入点/出点贝塞尔  如果是的话 先存一下
        if ((inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER)) {
            var tempAutoBezier = prop.keyTemporalAutoBezier(key_input_index); // 时间自动贝塞尔 → 布尔
            var tempContBezier = prop.keyTemporalContinuous(key_input_index); // 时间连续性 → 布尔
        }

        // 判断出点是不是定格
        if (outInterp !== KeyframeInterpolationType.HOLD) {
            var inTempEase = prop.keyInTemporalEase(key_input_index);  // 入点关键帧缓入（1/2/3个对象）
            var outTempEase = prop.keyOutTemporalEase(key_input_index);  // 出点关键帧缓入（1/2/3个对象）
        }

        // 2D空间值 与 3D空间值：锚点、位置之类
        if ((prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) || (prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL)) {
            var spatAutoBezier = prop.keySpatialAutoBezier(key_input_index);  // 空间自动贝塞尔 → 布尔
            var spatContBezier = prop.keySpatialContinuous(key_input_index); // 空间连续性 → 布尔

            var inSpatTangent = prop.keyInSpatialTangent(key_input_index);  // 入点空间线性 → 浮点值数组(2/3)
            var outSpatTangent = prop.keyOutSpatialTangent(key_input_index); // 出点空间线性 → 浮点值数组(2/3)
            var roving = prop.keyRoving(key_input_index);
        }

        // Create the new keyframe
        // 创建新关键帧

        var newTime = prop.keyTime(key_input_index) + offset;
        var newKeyIndex = prop.addKey(newTime);
        prop.setValueAtKey(newKeyIndex, key_input_index_Value);

        if (outInterp !== KeyframeInterpolationType.HOLD) {
            prop.setTemporalEaseAtKey(newKeyIndex, inTempEase, outTempEase);
        }

        // Copy over the keyframe settings

        prop.setInterpolationTypeAtKey(newKeyIndex, inInterp, outInterp);

        if ((inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER) && tempContBezier) {
            prop.setTemporalContinuousAtKey(newKeyIndex, tempContBezier);
            prop.setTemporalAutoBezierAtKey(newKeyIndex, tempAutoBezier);		// Implies Continuous, so do after it
        }

        if ((prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) || (prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL)) {
            prop.setSpatialContinuousAtKey(newKeyIndex, spatContBezier);
            prop.setSpatialAutoBezierAtKey(newKeyIndex, spatAutoBezier);		// Implies Continuous, so do after it

            prop.setSpatialTangentsAtKey(newKeyIndex, inSpatTangent, outSpatTangent);

            prop.setRovingAtKey(newKeyIndex, roving);
        }

        // Remove the old keyframe
        // 移除旧关键帧
        prop.removeKey(key_output_index);
    }


    /**
     * @description：重置图层变换，可以有关键帧
     * @param {*} comp :合成
     * @param {*} layer ：图层
     */
    function reset_transform(comp, layer) {
        var TRANSFORM = layer.property("ADBE Transform Group")

        // 锚点
        try {
            TRANSFORM.property("ADBE Anchor Point").setValue([comp.width / 2, comp.height / 2]);
        } catch (e) {
            TRANSFORM.property("ADBE Anchor Point").setValueAtTime(comp.time, [comp.width / 2, comp.height / 2]);
        }

        // 位置：要判断是否分离尺寸
        if (TRANSFORM.property("ADBE Position").dimensionsSeparated) {
            try {
                TRANSFORM.property("ADBE Position_0").setValue(comp.width / 2);  // X
                TRANSFORM.property("ADBE Position_1").setValue(comp.height / 2);  // Y
                TRANSFORM.property("ADBE Position_2").setValue(0);  // Y

            } catch (e) {
                TRANSFORM.property("ADBE Position_0").setValueAtTime(comp.time, comp.width / 2);  // X
                TRANSFORM.property("ADBE Position_1").setValueAtTime(comp.time, comp.height / 2);  // Y
                TRANSFORM.property("ADBE Position_2").setValueAtTime(comp.time, 0);  // Y

            }
        } else {
            try {
                TRANSFORM.property("ADBE Position").setValue([comp.width / 2, comp.height / 2]);
            } catch (e) {
                TRANSFORM.property("ADBE Position").setValueAtTime(comp.time, [comp.width / 2, comp.height / 2]);
            }
        }

        // 缩放 ADBE Scale
        try {
            TRANSFORM.property("ADBE Scale").setValue([100, 100, 100]);
        } catch (e) {
            TRANSFORM.property("ADBE Scale").setValueAtTime(comp.time, [100, 100, 100]);
        }

        // 旋转
        if (layer.threeDLayer) {
            try {
                TRANSFORM.property("ADBE Rotate X").setValue(0);  // X
                TRANSFORM.property("ADBE Rotate Y").setValue(0);  // Y
                TRANSFORM.property("ADBE Rotate Z").setValue(0);  // Z
            } catch (e) {
                TRANSFORM.property("ADBE Rotate X").setValueAtTime(comp.time, 0);  // X
                TRANSFORM.property("ADBE Rotate Y").setValueAtTime(comp.time, 0);  // Y
                TRANSFORM.property("ADBE Rotate Z").setValueAtTime(comp.time, 0);  // Z
            }
        } else {
            try {
                TRANSFORM.property("ADBE Rotate Z").setValue(0);
            } catch (e) {
                TRANSFORM.property("ADBE Rotate Z").setValueAtTime(comp.time, 0);
            }
        }

        // 方向
        if (layer.threeDLayer) {
            try {
                TRANSFORM.property("ADBE Orientation").setValue([0, 0, 0]);

            } catch (e) {
                TRANSFORM.property("ADBE Orientation").setValueAtTime(comp.time, [0, 0, 0]);
            }
        }

        // 不透明度
        try {
            TRANSFORM.property("ADBE Opacity").setValue(100);
        } catch (e) {
            TRANSFORM.property("ADBE Opacity").setValueAtTime(comp.time, 100);
        }
    }


}

function 本机交互与文件读写() {
    /**
     * @description：发送到剪切板
     * @param {*} info 
     */
    function send_to_clipboard(info) {
        var cmd, isWindows;

        // 判断是不是字符串
        info = (typeof info === 'string') ? info : info.toString();
        isWindows = $.os.indexOf('Windows') !== -1;

        //OS的命令
        cmd = 'echo "' + info + '" | pbcopy';
        //windows的cmd命令
        if (isWindows) {
            cmd = 'cmd.exe /c cmd.exe /c "echo ' + info + ' | clip"';
        }

        system.callSystem(cmd);
    }
    /**
     * @description：本地文件读写
     * @param {*} file ：本地文件对象
     */

    function read_file(jsonFile) {
        jsonFile.open("r")
        data = jsonFile.read()
        jsonFile.close()
        // data = JSON.parse(data) // 需要JSON的Polyfill
        return data
    }

    function write_file(jsonFile, data) {
        jsonFile.open('w', undefined, undefined);
        write_file.encoding = "UTF-8";
        jsonFile.write(data)
        jsonFile.close()
    }


    /**
     * @description：获取键盘状态
     */
    function get_key_status() {

        var window = new Window("palette", "", undefined);
        window.center();
        window.show();
        var inUI = true;
        function inside() {
            inUI = true;
        }
        function outside() {
            inUI = false;
        }

        window.addEventListener('mouseover', inside);
        window.addEventListener('mouseout', outside);
        window.addEventListener('keydown', alertKey);



        function alertKey() {
            var myKeyState = ScriptUI.environment.keyboardState;
            var pressedString = myKeyState.keyName;

            if (myKeyState.altKey) {
                pressedString = "Alt + " + pressedString;
            }

            if (myKeyState.ctrlKey) {
                pressedString = "Ctrl + " + pressedString;
            }

            if (myKeyState.shiftKey) {
                pressedString = "Shift + " + pressedString;
            }

            if (myKeyState.keyName == "F" && myKeyState.shiftKey == true) {
                return ("Shift + F");
            }

            if (myKeyState.keyName) {
                return ("You pressed " + pressedString);
            }

        }
        alert(get_key_status())

    }
    function get_path() {
        // 当前脚本位置
        var thisScript = new File($.fileName);
        var containingFolder = new Folder(thisScript.parent.absoluteURI);
        alert("脚本安装在" + containingFolder.absoluteURI);


        var appFolder = new Folder(Folder.appPackage.parent.absoluteURI);
        alert("AE软件安装在" + Folder.decode(appFolder.absoluteURI));
    }

    function get_all_effects() {
        "object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();

        var effects = app.effects;
        var effects_info = []

        for (i = 0; i < app.effects.length; i++) {
            effects_info.push({
                "name": effects[i].displayName,
                "en_name": effects[i].displayName,
                "match_name": effects[i].matchName,
                "category": effects[i].category,
                "type": "aex",

            })
        }

        var jsonFile = File('effects.json')
        jsonFile.open("w")
        jsonFile.write(JSON.stringify(effects_info, null, "\t"));
        jsonFile.close()

    }
    function folder_create(FF) {
        if (!FF.exists) {
            FF.create()
        }
    }

    function get_all_presets() {
        "object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();

        var appFolder = new Folder(Folder.appPackage.parent.absoluteURI);

        var FF = new Folder(appFolder.absoluteURI + Folder.decode("/Support Files/Presets"))
        var presets_info = []
        folder_recursive(FF, presets_info)
        // alert(FF.getFiles().toString())
        // 文件夹遍历加判断


        // alert(FF.getFiles().length)
        function folder_recursive(folderGroup, presets_info) {


            var files = folderGroup.getFiles()

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // 判断当前属性是否为文件夹，如果是，则继续遍历
                if (file instanceof Folder) {
                    //对每个文件夹逐个操作
                    folder_recursive(file, presets_info);
                    continue;
                }

                presets_info.push({
                    "name": File.decode(file.name),
                    "type": "ffx",
                    "path": file.fsName,

                })
            }
        }

        var jsonFile = File('presets.json')
        jsonFile.open("w")
        jsonFile.write(JSON.stringify(presets_info, null, "\t"));
        jsonFile.close()
    }

    function get_all_script() {
        "object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (indent = gap = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();

        var appFolder = new Folder(Folder.appPackage.parent.absoluteURI);

        var FF = new Folder(appFolder.absoluteURI + Folder.decode("/Support Files/Scripts"))
        var script_info = []
        folder_recursive(FF, script_info)
        // alert(FF.getFiles().toString())
        // 文件夹遍历加判断


        // alert(FF.getFiles().length)
        function folder_recursive(folderGroup, script_info) {

            var files = folderGroup.getFiles()
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // 判断当前属性是否为文件夹，如果是，则继续遍历
                if (file instanceof Folder) {
                    //对每个文件夹逐个操作
                    folder_recursive(file, script_info);
                    continue;
                }
                if (file.name.endWith("jsx") || file.name.endWith("jsxbin"))
                    script_info.push({
                        "name": File.decode(file.name),
                        "type": "jsx",
                        "path": file.fsName,

                    })
            }
        }

        var jsonFile = File('SCRIPT.json')
        jsonFile.open("w")
        jsonFile.write(JSON.stringify(script_info, null, "\t"));
        jsonFile.close()
    }

}
function UI_构建() {

    // 创建 UI 函数
    function createUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "My Tools", [100, 100, 300, 300]);
        // 我将按钮放在一个名为 myButton 的变量中以使其更易于使用。
        myPanel.myButton = myPanel.add("button", [10, 10, 100, 30], "Tool #1");
        return myPanel;
    }

    var myToolsPanel = createUI(this);

    // 如果下面没有说明，在窗口的情况下不会出现在屏幕上，所以写下来。
    if (myToolsPanel instanceof Window) {
        myToolsPanel.center();
        myToolsPanel.show();
    }

    // 您可以在此处编写单击时的处理。
    myToolsPanel.myButton.onClick = function () {
        alert("OK");
    }

}
function 待处理() {
    /*---------------------------------------------------------------陷阱 待修复---------------------------------------------------------------*/

    // https://sites.google.com/view/youuu4/programming/aescripts?authuser=0#h.p_51jZWuxo7UtH

    /*
    
    文本文档的奥秘
    即使我使用 textLayer.sourceText.value 从文本层获取 textDocument，重写内容并使用 setValue 重置它，它也不会应用。不知道是不是只有CS6。出于某种原因，如果我将 textDocument.text 设为空字符串或连续运行 setValue 两次，它会起作用。我不知道。
    target.sourceText.setValue(texDoc);
    target.sourceText.setValue (texDoc); // 如果你让文本为空或者 setValue 两次，它会因为某种原因被正确应用。
    
    对于空字符串文本图层
    [TextDocument].sourceText.setValue( textDocument )
    如果设置了，则不会正确反映。可以在字符面板上进行的设置不会被反映。字体、填充、描边、字体大小等。文字内容、左对齐等段落关系没有问题。
    “因为我后面设置填充的时候会一起设置文本...”，当我在脚本中创建文本图层的时候把空字符串做为dummy，“哦？没有体现出来，为什么！？” . 如果你在一个字符中放一些东西，它会被正确反映，所以你可以放“ a”或“ dummy”。
    ↑中，“如果你做两次就OK”是指在第一次应用时只应用文本内容，在第二次应用时它不是空字符串，所以填充等设置也有体现。..
    
    
    无法在脚本中设置文本对齐。
    如果文本图层中有换行符，即使重新设置对齐也会被忽略。一次，插入没有换行符的虚拟文本，然后使用 [TextLayer] .sourceText.value 获取 textDocument。设置 textDocument 的文本和对齐方式并执行 textLayer.sourceText.setValue()。
    
    
    -AddEventListener ("enterKey") 不能使用。改用 onEnterKey
    
    - 但是，onEnterKey 被调用了两次。
    在 CS6 中，方向键没有反应，所以我现在可以做到
    滚动条变得如此时尚，以至于两端的箭头按钮都不见了。我想知道我是否不能通过点击一步一步滚动。鼠标滚轮现在响应。下拉菜单也会做出反应。我最近没做过。
    
    如果inPoint改变时CC改变了是不是bug？out变了，时长变了……什么样的东西……
    在 CS6，out 改变了，但持续时间没有改变，所以我们先保存
    
    
    如果编辑（删除？）下拉控件效果设置为essential属性的下拉项，AE会掉落。
    要为下拉控制效果项目指定分隔符，请为项目名称指定“（-”）。
    
    */
}





// 测试区

var comp = app.project.activeItem
var layer = app.project.activeItem.layer(1)
// var prop = layer.selectedProperties[0]
var key_time = get_every_frame_time_by_time(comp, get_comp_time(comp)[0], get_comp_time(comp)[1])
var key_value = get_prop_value(prop, key_time)








