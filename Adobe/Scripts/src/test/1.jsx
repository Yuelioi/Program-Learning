var activeLayer = app.project.activeItem.selectedLayers[0];
var color = [1, 0, 0, 0];
if (activeLayer && activeLayer.matchName === "ADBE Text Layer") {
    color = activeLayer.property("Source Text").value.fillColor;
}
else if (activeLayer && activeLayer.matchName === "ADBE Vector Layer") {
    color = activeLayer
        .property("ADBE Root Vectors Group")
        .property("ADBE Vector Group")
        .property("ADBE Vectors Group")
        .property("ADBE Vector Graphic - Fill")
        .property("ADBE Vector Fill Color").value;
}
var fillEffect = activeLayer.property("ADBE Effect Parade").addProperty("ADBE Fill");
var colorProperty = fillEffect.property("ADBE Fill-0002");
var frameRate = activeLayer.containingComp.frameRate;
var frameDuration = 1 / frameRate;
colorProperty.setValueAtTime(app.project.activeItem.time, color);
colorProperty.setValueAtTime(app.project.activeItem.time + frameDuration * 7, color);
colorProperty.setValueAtTime(app.project.activeItem.time + frameDuration * 7 + frameDuration * 50, color);
colorProperty.setValueAtTime(app.project.activeItem.time + frameDuration * 7 + frameDuration * 50 + frameDuration * 7, color);
app.endUndoGroup();