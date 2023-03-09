var activeLayers = (app.project.activeItem as CompItem).selectedLayers;

for (var i = 0; i < activeLayers.length; i++) {
    alert(activeLayers[i].name);
}
