/**
 * 名称：CopyCatCam .jsx
 * 功能：选择相机。运行脚本。将出现另一个实时模仿原始相机的相机。每个方面都完全模仿原始相机，无论父母、自动定向、景深等。
 * 角度由方向表达式处理，旋转由表达式“保护”（不可更改）。“ccc”相机（山寨相机）可以在任何合成中工作，因此您可以复制或剪切相机层并将其粘贴到任何合成中。
 * Ccc 相机将模仿原始相机的位置、角度、变焦、景深、焦距、光圈和模糊级别。
 * 
 * 油管：http://www.crgreen.com/aescripts/
 * 日期：
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：http://www.crgreen.com/aescripts/actual_scripts/Randomly_Enable_Selected_Layers.jsx
 * 其他：
 */


/*
CopyCatCam.jsx
version 1.6
(v1.2 adds depth of field link)
(v1.4 adds 'protected rotation' expression to ccc as default)
(v1.5 adds comp name to ccc layer name)
 (1.6 corrects deprecated 'radians_to_degrees' to camel-caps version
by Christopher Green (the guy who runs crgreen.com)
with tons of help from "urbanspaceman" at www.motion-graphics-exchange.com
and, of course, Dan Ebberts (www.motionscript.com).
*/

makeCopyCatCam();

function makeCopyCatCam() {
    var versionNum = "1.5";
    var activeItem = app.project.activeItem;
    if (activeItem == null || !(activeItem instanceof CompItem)) {
        alert("You need to select one (camera) layer.");
    } else {
        var selectedLayers = activeItem.selectedLayers;
        var selNum = activeItem.selectedLayers.length;
        if (!(selNum == 1)) {
            if (selNum == 0) { selNum = "No" }
            alert(selNum + " layers selected. You need to select one (camera) layer.");
        } else {
            if (selectedLayers[0].constructor.name == "CameraLayer") {

                compName = activeItem.name;
                theCam = selectedLayers[0];
                camName = theCam.name;

                app.beginUndoGroup("CopyCatCam (\"" + camName + "\"/\"" + compName + "\")");
                activeItem.layers.addCamera((camName + " (" + compName + ") [ccc]"), [0, 0]).startTime = 0;
                ccc = activeItem.layer(1);
                ccc.depthOfField.setValue(1);// so, for slave camera, dof is always on,
                //////                       // but if dof is off for master camera, settings are set to infinite focus (as if dof is off)
                ///////camera settings expressions///////
                ccc.zoom.expression = "comp(\"" + compName + "\").layer(" + "\'" + camName + "\'" + ").zoom;";
                ccc.focusDistance.expression = "comp(\"" + compName + "\").layer(" + "\'" + camName + "\'" + ").focusDistance;";
                ccc.aperture.expression = "v = 0;\rif (comp(\"" + compName + "\").layer(\"" + camName +
                    "\").depthOfField == 1) {\rv = comp(\"" + compName + "\").layer(\"" + camName + "\").aperture;\r}\rv;";

                ccc.blurLevel.expression = "v = 0;\rif (comp(\"" + compName + "\").layer(\"" + camName +
                    "\").depthOfField == 1) {\rv = comp(\"" + compName + "\").layer(\"" + camName + "\").blurLevel;\r}\rv;";

                /////////////////////////////////////////

                ///////camera transformations////////////
                ccc.position.expression = "C=comp(\"" + compName + "\").layer(\"" + camName + "\");\rC.toWorld([0,0,0]);";
                ccc.pointOfInterest.expression = "position;";
                ccc.orientation.expression = "C = comp(\"" + compName + "\").layer(" + "\'" + camName + "\'" + ");\ru = C.toWorldVec([1,0,0]);\rv = C.toWorldVec([0,1,0]);\rw = C.toWorldVec([0,0,1]);"
                    + "sinb = clamp(w[0],-1,1);\rb = Math.asin(sinb/thisComp.pixelAspect);\rcosb = Math.cos(b);\rif (Math.abs(cosb) > .0005) {\rc = -Math.atan2(v[0],u[0]);\r"
                    + "a = -Math.atan2(w[1],w[2]);\r} else {\ra = Math.atan2(u[1],v[1]);\rc = 0;\r}\r[radiansToDegrees(a),radiansToDegrees(b),radiansToDegrees(c)];";

                ccc.rotationX.expression = "0;";
                ccc.rotationY.expression = "0;";
                ccc.rotationZ.expression = "0;";
                /////////////////////////////////////////

                ccc.autoOrient = AutoOrientType.NO_AUTO_ORIENT;

                alert("Version " + versionNum + "\rYou may now copy and paste the \"ccc\" camera into any comp, and it should do what the original camera (\"" +
                    camName + "\" in \"" + compName + "\") does.");
                app.endUndoGroup();
            } else {
                alert("That is not a camera layer.");
            }

        }
    }

}