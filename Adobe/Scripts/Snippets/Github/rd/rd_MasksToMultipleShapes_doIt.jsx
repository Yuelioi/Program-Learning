// rd_MasksToShapes.jsx
// Copyright (c) 2007 redefinery (Jeffrey R. Almasol). All rights reserved.
// check it: www.redefinery.com
// 
// Name: rd_MasksToShapes
// Version: 0.7
// 
// Description:
// This script creates a shape layer with paths for each mask on the 
// selected layer.

// edited by fabiantheblind for creating multiple shape layers

function rd_MasksToShapes_doIt()
{
var comp = app.project.activeItem;
var masksLayer = comp.selectedLayers[0];
var masksGroup = masksLayer.property("ADBE Mask Parade");

app.beginUndoGroup(rd_MasksToShapesData.scriptName);

// Create an empty shape lay

// Get the mask layer's pixel aspect; if layer has no source, use comp's pixel aspect
var pixelAspect = (masksLayer.source != null) ? masksLayer.source.pixelAspect : 1.0; //copixelAspect;

// Iterate over the masks layer's masks, converting their paths to shape paths
var mask, maskPath, vertices;
            
for (var m=1; m<=masksGroup.numProperties; m++)
	{
    var suffix = " Shapes";
	var shapeLayer = comp.layers.addShape();
	shapeLayer.name =  masksLayer.name.substr(0,31-suffix.length) + suffix;
	shapeLayer.moveBefore(masksLayer);
	
	var shapeLayerContents = shapeLayer.property("ADBE Root Vectors Group");
	var shapeGroup = shapeLayerContents; //.addProperty("ADBE Vector Group");
	//shapeGroup.name = "Masks";
	var shapePathGroup, shapePath, shapePathData;
	// Get mask info
	mask = masksGroup.property(m);
	maskPath = mask.property("ADBE Mask Shape");
	
	// Create new shape path using mask info
	shapePathGroup = shapeGroup.addProperty("ADBE Vector Shape - Group");
	shapePathGroup.name = mask.name;
	shapePath = shapePathGroup.property("ADBE Vector Shape");
	
	shapePathData = new Shape();
	
	// ...adjust mask vertices (x axis) by pixel aspect
	vertices = new Array();
	for (var v=0; v<maskPath.value.vertices.length; v++){
		vertices[vertices.length] = [maskPath.value.vertices[v][0] * pixelAspect, maskPath.value.vertices[v][1]];
    	}				
    shapePathData.vertices = vertices;
	shapePathData.inTangents = maskPath.value.inTangents;
	shapePathData.outTangents = maskPath.value.outTangents;
	shapePathData.closed = maskPath.value.closed;
	shapePath.setValue(shapePathData);
    shapeLayer.transform.anchorPoint.setValue(masksLayer.transform.anchorPoint.value);
	shapeLayer.transform.position.setValue(masksLayer.transform.position.value);
	shapeLayer.transform.scale.setValue(masksLayer.transform.scale.value);
	if (masksLayer.threeDLayer)
	{
		shapeLayer.threeDLayer = true;
		shapeLayer.transform.xRotation.setValue(masksLayer.transform.xRotation.value);
		shapeLayer.transform.yRotation.setValue(masksLayer.transform.yRotation.value);
		shapeLayer.transform.zRotation.setValue(masksLayer.transform.zRotation.value);
		shapeLayer.transform.orientation.setValue(masksLayer.transform.orientation.value);
	}
	else
	{
		shapeLayer.transform.rotation.setValue(masksLayer.transform.rotation.value);
	}
	shapeLayer.transform.opacity.setValue(masksLayer.transform.opacity.value);
}

// Match the mask layer's transfor

// Mute the mask layer
masksLayer.enabled = false;

app.endUndoGroup();
}