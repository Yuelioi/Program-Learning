/**
 * 名称：关键帧时间复刻（或叫关键帧复刻）
 * 功能：选择一个带关键帧的属性，单击抓手拾取时间。选择新的属性们，单击应用，会基于时间生成线性关键帧
 * V1.2 : 忘了每次拾取的时候，把时间列表先清空了 >_<
 * V1.1 ：忘了加撤销组，补上
 * V1.0 
 * 源码：https://www.yuelili.com/?p=18058
 */

var panelGlobal = this;
var main = (function () {

    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select): 
    {"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"main","windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"提醒保存小助手","preferredSize":[0,0],"margins":16,"orientation":"row","spacing":10,"alignChildren":["center","top"]}},"item-3":{"id":3,"type":"Image","parentId":0,"style":{"enabled":true,"varName":"catch_img","image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACS0lEQVRIieWWTYhOURjH/6/NlGZYSZMFpcRM5CMki9mILCilxIyYhGQ1WShKKTWl2WiYbLBBPsdi8jmLaUqU2FjZTSYlJh8ZNSNeP536vzneeee991zLeerpnOe5z//+3nPuuc97NeOsVFkwkLL2+ZJ6JU1K6pL0Ka+wVCr9mwjgBH/IX7uWop1iCeKjRrYBOz3fnQqeVeBstXgclvTE82aPg2ENksYkrah3kyzwYkkjvtkF535E1395/CapR9ImSd2SypKGci1jmq35CnwEbntLDwNdnofrDZ6fA74D/c63O99a5BlvrBK/BN4CfRG45PmIx23OX3E8rwh4ucWdjg85HvVOVOrGnR+PcsEGPN8KLE091cEeed4ETDr3Iar54twNxxscXwReR69dd9ihvOD+aFuDX68BflG1zb2Oy8AE0AIcce5MXvA+C9Y6Xu34alSzAFgfxe+iVa50bp3jS3nBTRb05GwQayLo9ig/6tzmvODgb4D3OcGNwGNgf5Q7ZWhHass8YeGihLZa8WZrX2Wd6mXAmIuHgDnAQsd7CoDvWttaD7zF3eezX6GKDXi8kwhts+5sVgO55cJVLpoN3Ix+wHAieNC6xizwMRdervGcTgNLEqBzoyaiLHDwkxbcK/A8Y++oev8zwcGPWzT4H+D7VR0vFzj4QQufFgQT/UUmgYPv8g2eJUIr3auzKDiGp6z8fK3TnAqW21+wBznB5Xq7lAIOfoA0a88Cp3zQ75C0V9KEpJ/+AAz+O6ppkPRcUt90N5nyQT8zTNIfh/Zbfkki7F0AAAAASUVORK5CYII="],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Image","parentId":0,"style":{"enabled":true,"varName":"apply_img","image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABz0lEQVRIie2WyyvFQRTHP9c7JNkoZUHyKI9sbC1kwcZKSbbIRkphY+NfsCO2ZOORndW1sWF7S1IWEqXIKxJHP82vpuk385vxWvnWNOfeOXc+c2buOTP866+U0TkiEpuzQJPnGt6BXWArzTGTySQPiEiRiKzI19QTLdzVrBKR+S9CIz2ISL4vuMBYRKtmbwBZ8zjMTQKmgXqgDKgAbtK2PAn8pNnrwKbHHH0KLL7QJLC+HzXGWDvQoXxivzegUfMZBR61XSoEjoGDNLBNa8BQik8EW7KMRUc2ApzHX+R5QNs8oGnqBuZ0Hx9w1zehsapCwS8/BH4OBTsynx1gDLgNXYUL/G70SYrObRnoBO6+A87X7Hiie8fva1V/pmr7oy/YTKdizV4AJoBydWm8GVUssnPa50uV53tAne8CPiUiA5Y67Cz+Rhu2zLHqingb6AcWVRlEldFBFbGpfeDa2LGZoGhVxHqrVG3ccSP1av4FInLi8HVGrCtOkSuHz4XqS4EjoME3SJ88LnOMRTncAhwCzb5QX7DrPp5U/+yWEKgvuCR0UouKQsE5Dx8fvVp9HLmZDXh7JelURNp0lu15a6oamFJ9qO7UAyFnfd7+69cEfACTHfD/B8fzSAAAAABJRU5ErkJggg=="],"alignment":null,"helpTip":null}}},"order":[0,3,4],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":true,"itemReferenceList":"None"}}
    */

    // MAIN
    // ====
    var main = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) main.text = "关键帧时间复刻";
    main.orientation = "row";
    main.alignChildren = ["center", "top"];
    main.spacing = 10;
    main.margins = 16;

    var catch_img_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%02KIDATH%C2%89%C3%A5%C2%96M%C2%88NQ%18%C3%87%C3%BF%C2%AF%C3%8D%C2%94fXI%C2%93%05%C2%A5%C3%84L%C3%A4%23%24%C2%8B%C3%99%C2%88%2C(%C2%A5%C3%84%C2%8C%C2%98%C2%84d5Y(J)5%C2%A5%C3%99h%C2%98l%C2%B0A%3E%C3%87b%C3%B29%C2%8BiJ%C2%94%C3%98X%C3%99M%26%25%26%1F%195%23%5E%3F%C2%9D%C3%BA%C2%BF9%C3%9Ey%C3%A7%C2%BD%C3%B7%5C%C3%8By%C3%AA%C3%A9%C2%9C%C3%A7%C2%B9%C3%8F%C3%BF%C3%BE%C3%9Es%C3%AE%C2%B9%C3%8F%7B5%C3%A3%C2%ACTY0%C2%90%C2%B2%C3%B6%C3%B9%C2%92z%25MJ%C3%AA%C2%92%C3%B4)%C2%AF%C2%B0T*%C3%BD%C2%9B%08%C3%A0%04%7F%C3%88_%C2%BB%C2%96%C2%A2%C2%9Db%09%C3%A2%C2%A3F%C2%B6%01%3B%3D%C3%9F%C2%9D%0A%C2%9EU%C3%A0l%C2%B5x%1C%C2%96%C3%B4%C3%84%C3%B3f%C2%8F%C2%83a%0D%C2%92%C3%86%24%C2%AD%C2%A8w%C2%93%2C%C3%B0bI%23%C2%BE%C3%99%05%C3%A7~D%C3%97%7Fy%C3%BC%26%C2%A9G%C3%92%26I%C3%9D%C2%92%C3%8A%C2%92%C2%86r-c%C2%9A%C2%AD%C3%B9%0A%7C%04n%7BK%0F%03%5D%C2%9E%C2%87%C3%AB%0D%C2%9E%C2%9F%03%C2%BE%03%C3%BD%C3%8E%C2%B7%3B%C3%9FZ%C3%A4%19o%C2%AC%12%C2%BF%04%C3%9E%02%7D%11%C2%B8%C3%A4%C3%B9%C2%88%C3%87m%C3%8E_q%3C%C2%AF%08x%C2%B9%C3%85%C2%9D%C2%8E%0F9%1E%C3%B5NT%C3%AA%C3%86%C2%9D%1F%C2%8Fr%C3%81%06%3C%C3%9F%0A%2CM%3D%C3%95%C3%81%1Ey%C3%9E%04L%3A%C3%B7!%C2%AA%C3%B9%C3%A2%C3%9C%0D%C3%87%1B%1C_%04%5EG%C2%AF%5Dw%C3%98%C2%A1%C2%BC%C3%A0%C3%BEh%5B%C2%83_%C2%AF%01~Q%C2%B5%C3%8D%C2%BD%C2%8E%C3%8B%C3%80%04%C3%90%02%1Cq%C3%AEL%5E%C3%B0%3E%0B%C3%96%3A%5E%C3%AD%C3%B8jT%C2%B3%00X%1F%C3%85%C3%AF%C2%A2U%C2%AEtn%C2%9D%C3%A3Ky%C3%81M%16%C3%B4%C3%A4l%10k%22%C3%A8%C3%B6(%3F%C3%AA%C3%9C%C3%A6%C2%BC%C3%A0%C3%A0o%C2%80%C3%B79%C3%81%C2%8D%C3%80c%60%7F%C2%94%3BehGj%C3%8B%3Ca%C3%A1%C2%A2%C2%84%C2%B6Z%C3%B1fk_e%C2%9D%C3%AAe%C3%80%C2%98%C2%8B%C2%87%C2%809%C3%80B%C3%87%7B%0A%C2%80%C3%AFZ%C3%9BZ%0F%C2%BC%C3%85%C3%9D%C3%A7%C2%B3_%C2%A1%C2%8A%0Dx%C2%BC%C2%93%08m%C2%B3%C3%AElV%03%C2%B9%C3%A5%C3%82U.%C2%9A%0D%C3%9C%C2%8C~%C3%80p%22x%C3%90%C2%BA%C3%86%2C%C3%B01%17%5E%C2%AE%C3%B1%C2%9CN%03K%12%C2%A0s%C2%A3%26%C2%A2%2Cp%C3%B0%C2%93%16%C3%9C%2B%C3%B0%3Cc%C3%AF%C2%A8z%C3%BF3%C3%81%C3%81%C2%8F%5B4%C3%B8%1F%C3%A0%C3%BBU%1D%2F%178%C3%B8A%0B%C2%9F%16%04%13%C3%BDE%26%C2%81%C2%83%C3%AF%C3%B2%0D%C2%9E%25B%2B%C3%9D%C2%AB%C2%B3(8%C2%86%C2%A7%C2%AC%C3%BC%7C%C2%AD%C3%93%C2%9C%0A%C2%96%C3%9B_%C2%B0%079%C3%81%C3%A5z%C2%BB%C2%94%02%0E~%C2%804k%C3%8F%02%C2%A7%7C%C3%90%C3%AF%C2%90%C2%B4W%C3%92%C2%84%C2%A4%C2%9F%C3%BE%00%0C%C3%BE%3B%C2%AAi%C2%90%C3%B4%5CR%C3%9Ft7%C2%99%C3%B2A%3F3L%C3%92%1F%C2%87%C3%B6%5B~I%22%C3%AC%5D%00%00%00%00IEND%C2%AEB%60%C2%82";
    var catch_img = main.add("image", undefined, File.decode(catch_img_imgString), { name: "catch_img" });
    catch_img.addEventListener("click", catch_it, false)



    var apply_img_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%01%C3%8FIDATH%C2%89%C3%AD%C2%96%C3%8B%2B%C3%85A%14%C3%87%3F%C3%97%3B%24%C3%99(eA%C3%B2(%C2%8Fll-d%C3%81%C3%86JI%C2%B6%C3%88FJac%C3%A3_%C2%B0%23%C2%B6d%C3%A3%C2%91%C2%9D%C3%95%C2%B5%C2%B1a%7BKR%16%12%C2%A5%C3%88%2B%12G%3F%C3%8D%C2%AF%C2%A6%C3%A97%C3%B3%C2%9B%C3%B1Z%C3%B9%C3%964%C3%A7%C3%9E9w%3Esf%C3%AE93%C3%BC%C3%AB%C2%AF%C2%94%C3%919%22%12%C2%9B%C2%B3%40%C2%93%C3%A7%1A%C3%9E%C2%81%5D%60%2B%C3%8D1%C2%93%C3%89%24%0F%C2%88H%C2%91%C2%88%C2%AC%C3%88%C3%97%C3%94%13-%C3%9C%C3%95%C2%AC%12%C2%91%C3%B9%2FB%23%3D%C2%88H%C2%BE%2F%C2%B8%C3%80XD%C2%ABfo%00Y%C3%B38%C3%8CM%02%C2%A6%C2%81z%C2%A0%0C%C2%A8%00n%C3%92%C2%B6%3C%09%C3%BC%C2%A4%C3%99%C3%AB%C3%80%C2%A6%C3%87%1C%7D%0A%2C%C2%BE%C3%90%24%C2%B0%C2%BE%1F5%C3%86X%3B%C3%90%C2%A1%7Cb%C2%BF7%C2%A0Q%C3%B3%19%05%1E%C2%B5%5D*%04%C2%8E%C2%81%C2%834%C2%B0Mk%C3%80P%C2%8AO%04%5B%C2%B2%C2%8CEG6%02%C2%9C%C3%87_%C3%A4y%40%C3%9B%3C%C2%A0i%C3%AA%06%C3%A6t%1F%1Fp%C3%977%C2%A1%C2%B1%C2%AAB%C3%81%2F%3F%04~%0E%05%3B2%C2%9F%1D%60%0C%C2%B8%0D%5D%C2%85%0B%C3%BCn%C3%B4I%C2%8A%C3%8Em%19%C3%A8%04%C3%AE%C2%BE%03%C3%8E%C3%97%C3%ACx%C2%A2%7B%C3%87%C3%AFkU%7F%C2%A6j%C3%BB%C2%A3%2F%C3%98L%C2%A7b%C3%8D%5E%00%26%C2%80rui%C2%BC%19U%2C%C2%B2s%C3%9A%C3%A7K%C2%95%C3%A7%7B%40%C2%9D%C3%AF%02%3E%25%22%03%C2%96%3A%C3%AC%2C%C3%BEF%1B%C2%B6%C3%8C%C2%B1%C3%AA%C2%8Ax%1B%C3%A8%07%16U%19D%C2%95%C3%91A%15%C2%B1%C2%A9%7D%C3%A0%C3%9A%C3%98%C2%B1%C2%99%C2%A0hU%C3%84z%C2%ABTm%C3%9Cq%23%C3%B5j%C3%BE%05%22r%C3%A2%C3%B0uF%C2%AC%2BN%C2%91%2B%C2%87%C3%8F%C2%85%C3%AAK%C2%81%23%C2%A0%C3%817H%C2%9F%3C.s%C2%8CE9%C3%9C%02%1C%02%C3%8D%C2%BEP_%C2%B0%C3%AB%3E%C2%9ET%C3%BF%C3%AC%C2%96%10%C2%A8%2F%C2%B8%24tR%C2%8B%C2%8AB%C3%819%0F%1F%1F%C2%BDZ%7D%1C%C2%B9%C2%99%0Dx%7B%25%C3%A9TD%C3%9At%C2%96%C3%ADyk%C2%AA%1A%C2%98R%7D%C2%A8%C3%AE%C3%94%03!g%7D%C3%9E%C3%BE%C3%AB%C3%97%04%7C%00%C2%93%1D%C3%B0%C3%BF%07%C3%87%C3%B3H%00%00%00%00IEND%C2%AEB%60%C2%82";
    var apply_img = main.add("image", undefined, File.decode(apply_img_imgString), { name: "apply_img" });
    apply_img.addEventListener("click", apply_it, false)

    // 全局变量
    var time_list = []

    // 记住属性的关键帧时间
    function get_key_time(prop) {
        time_list = []
        var selKeyList = prop.selectedKeys
        if (selKeyList.length > 0) {

            for (var j = 0; j < selKeyList.length; j++) {
                var k = prop.keyTime(selKeyList[j])
                time_list.push(k)
            }

        }

        return time_list
    }
    function apply_key(propGroup, time_list) {
        for (var i = 0; i < propGroup.length; i++) {
            prp = propGroup[i]

            for (var j = 0; j < time_list.length; j++) {
                prp.setValueAtTime(time_list[j], prp.valueAtTime(time_list[j], true))
            }
        }

    }
    // prp.setValueAtTime(time, newValue)



    // 记住属性
    function rem_prop_group(propGroup) {
        var rem_prop_group_res = []
        for (var i = 0; i < propGroup.length; i++) {
            if (propGroup[i].propertyType === PropertyType.PROPERTY) {
                rem_prop_group_res.push(propGroup[i])
            }
        }
        return rem_prop_group_res
    }

    function catch_it() {
        app.beginUndoGroup("catch_it");
        var selLayers = app.project.activeItem.selectedLayers
        if (selLayers.length >= 1) {
            propGroup = selLayers[0].selectedProperties
            var prop

            for (var i = 0; i < propGroup.length; i++) {
                if (propGroup[i].propertyType === PropertyType.PROPERTY) {
                    prop = propGroup[i]
                    break
                }
            }

            if (prop) {
                time_list = get_key_time(prop)
            } else {
                alert("请选择一个有效属性")
            }

        } else {
            alert("请至少选择一个图层")
        }

        app.endUndoGroup();
    }

    function apply_it() {
        app.beginUndoGroup("apply_it");
        if (time_list) {
            var selLayers = app.project.activeItem.selectedLayers
            var propGroup

            if (selLayers.length > 0) {
                if (selLayers.length == 1) {
                    propGroup = selLayers[0].selectedProperties
                } else {
                    propGroup = app.project.activeItem.selectedProperties
                }

                rem_propGroup = rem_prop_group(propGroup, time_list)
                apply_key(rem_propGroup, time_list)
                // 记住选择关键帧的属性

            } else {
                "请选择要赋值的属性"
            }

        } else {
            alert("请先选择参考关键帧")
        }
        app.endUndoGroup();
    }
    main.layout.layout(true);
    main.layout.resize();
    main.onResizing = main.onResize = function () { this.layout.resize(); }

    if (main instanceof Window) main.show();

    return main;

}());