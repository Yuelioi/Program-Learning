/**
 * 名称：关键帧倍增
 * 功能：选择关键帧，可以基于整数倍扩散，并且关键帧类型不变
 * 版本：V1.0
 * 源码：https://www.yuelili.com/?p=18038
 */


 var panelGlobal = this;
 var main = (function () {
 
     // MAIN
     // ====
     var main = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
     if (!(panelGlobal instanceof Panel)) main.text = "关键帧倍增";
     main.orientation = "row";
     main.alignChildren = ["center", "top"];
     main.spacing = 10;
     main.margins = 16;
 
     var num = main.add('edittext {properties: {name: "num"}}');
     num.text = "2";
     num.preferredSize.width = 30;
 
     var tm_btn = main.add("button", undefined, undefined, { name: "tm_btn" });
     tm_btn.helpTip = "选择你的关键帧们，然后单击";
     tm_btn.text = "倍增";
     tm_btn.preferredSize.width = 35;
     tm_btn.onClick = key_it
 
     // 主函数
     function key_it() {
         app.beginUndoGroup("keyframe mu");
 
         var selLayers = app.project.activeItem.selectedLayers
         var propGroup
         var num_times = parseFloat(num.text) - 1
         if (selLayers.length > 0 && num_times>0) {
    
             if (selLayers.length == 1) {
                 propGroup = selLayers[0].selectedProperties
             } else {
                 propGroup = app.project.activeItem.selectedProperties
             }
             
             // 记住选择关键帧的属性
             res = rem_prop_group(propGroup, num_times)
 
             for (var i = 0; i < res[0].length; i++) {
                 rd_Scooter_scootAllPropGroupKeys(res[0][i], res[1][i], res[2][i])
             }
 
         } else {
             alert("请选择一个合成,并且倍数大于1")
         }
 
         app.endUndoGroup();
     }
 
     function rd_Scooter_shiftKeyToNewTime(prop, keyToCopy, offset, keyToRemove) {
 
         // Remember the key's settings before creating the new setting, just in case creating the new key affects keyToCopy's settings
         // 记住旧关键帧的设置，然后基于该设置，创建新关键帧
 
         var inInterp = prop.keyInInterpolationType(keyToCopy);    // 入点插值类型
         var outInterp = prop.keyOutInterpolationType(keyToCopy);  //出点插值类型
         var keyToCopyValue = prop.keyValue(keyToCopy);            // 关键帧值
 
 
         // 判断贝塞尔
         if ((inInterp === KeyframeInterpolationType.BEZIER) && (outInterp === KeyframeInterpolationType.BEZIER)) {
             var tempAutoBezier = prop.keyTemporalAutoBezier(keyToCopy);
             var tempContBezier = prop.keyTemporalContinuous(keyToCopy);
         }
         if (outInterp !== KeyframeInterpolationType.HOLD) {
             var inTempEase = prop.keyInTemporalEase(keyToCopy);
             var outTempEase = prop.keyOutTemporalEase(keyToCopy);
         }
         if ((prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) || (prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL)) {
             var spatAutoBezier = prop.keySpatialAutoBezier(keyToCopy);
             var spatContBezier = prop.keySpatialContinuous(keyToCopy);
             var inSpatTangent = prop.keyInSpatialTangent(keyToCopy);
             var outSpatTangent = prop.keyOutSpatialTangent(keyToCopy);
             var roving = prop.keyRoving(keyToCopy);
         }
 
         // Create the new keyframe
         // 创建新关键帧
 
         var newTime = prop.keyTime(keyToCopy) + offset;
         var newKeyIndex = prop.addKey(newTime);
         prop.setValueAtKey(newKeyIndex, keyToCopyValue);
 
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
         prop.removeKey(keyToRemove);
     }
 
     // 记住属性的关键帧与倍增时间
     function get_key_time(prop, num) {
         
         var selKeyList = prop.selectedKeys
         var k_list = []
         var t_list = [0]
         var t_sum = 0
 
         if (selKeyList.length > 0) {
 
             // 获取时间差列表 
             for (var j = 0; j < selKeyList.length - 1; j++) {
                 var k = selKeyList[j]
                 t_sum += (prop.keyTime(k + 1) - prop.keyTime(k)) * num
                 t_list.push(t_sum)
                 k_list.push(k)
             }
             k_list.push(selKeyList[selKeyList.length - 1])
         }
 
         var get_key_time_list = [k_list, t_list]
         return get_key_time_list
     }
 
     // 记住属性
     function rem_prop_group(propGroup, num) {
         var rem_prop_group_res = [[], [], []]
         for (var i = 0; i < propGroup.length; i++) {
 
             // 如果属性没变化 直接跳过
             if (!propGroup[i].isTimeVarying)							
                 continue;
             rem_prop_group_res[0].push(propGroup[i])
 
             var list_cache = get_key_time(propGroup[i], num)
 
             rem_prop_group_res[1].push(list_cache[0])
             rem_prop_group_res[2].push(list_cache[1])
         }
         return rem_prop_group_res
     }
 
     // 循环属性组
     function rd_Scooter_scootAllPropGroupKeys(prop, key_list, time_list) {
 
         // 倒增
         for (var j = key_list.length - 1; j >= 0; j--) {
             if (time_list[j] == 0) {
                 continue;
             }
             var k = key_list[j]
             rd_Scooter_shiftKeyToNewTime(prop, k, time_list[j], k);
         }
 
     }
 
 
     main.layout.layout(true);
     main.layout.resize();
     main.onResizing = main.onResize = function () { this.layout.resize(); }
 
     if (main instanceof Window) main.show();
 
     return main;
 
 }());
 