// rd_CameraProjectionSetup.jsx
// Copyright (c) 2008-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_CameraProjectionSetup
// Version: 1.2
// 
// Description:
// This script automates most of the steps required to set up the camera projection 
// technique in The Camera and Options chapter. The script creates a single
// "backing" plane, so you will still need to create any additional planes needed.
// Also, the content-specific procedures described in step 7 (masking, scaling, and 
// repositioning the planes) will need to be performed manually. Sorry, scripting 
// isn't THAT good. :-)
// 
// Prerequisites:
//  -- This script requires After Effects CS3 or later.
// 
// Usage:
//  1. Select the footage layer.
//  2. Run this script.
//  3. Increase the comp's Shadow Map Resolution, as needed.
//  4. Mask, scale, and reposition the backing (and other) planes to match the
//      geometry of he Slide layer.
// 
// Legal Notices:
// This script is provided "as is," without warranty of any kind, expressed or implied.
// In no event shall the script's author be held liable for any damages arising in any
// way from the use of this script.
// 
// This script is excerpted from Adobe After Effects CC Visual Effects and Compositing Studio Techniques by Mark Christiansen.
// (c) 2013. Published by Adobe Press. All rights reserved. A complete chapter on scripting
// by Jeff Almasol is included with the book. Additional scripts are available at
// http://aescripts.com/rd-studio-techniques/




(function rd_CameraProjectionSetup()
{
	// Globals
	
	// Store all constants in a global object, for consolidated organization in ExtendScript Toolkit's Data Browser
	var rd_CameraProjectionSetupData = new Object();
	rd_CameraProjectionSetupData.scriptName = "rd: Camera Projection Setup";
	rd_CameraProjectionSetupData.scriptTitle = rd_CameraProjectionSetupData.scriptName + " v1.2";
	
	// Various text strings are defined as associative arrays (dictionaries) to support localizability via rd_localize() function
	rd_CameraProjectionSetupData.strNextSteps = {en: "Use duplicates of the Plane layer to build a 3D model of your scene, masking and translating as needed.\n\nIf the quality is too low, increase the Shadow Map Resolution to at least twice the comp's size. In the Composition Settings dialog box's Advanced tab, click Options for the Advanced 3D rendering plug-in."};
	rd_CameraProjectionSetupData.strErrNoCompSel = {en: "Cannot perform operation. Please select or open a single composition in the Project panel, and try again."};
	rd_CameraProjectionSetupData.strErrNoLayerSel = {en: "Cannot perform operation. Please select a single layer, and try again."};
	rd_CameraProjectionSetupData.strMinAE80 = {en: "This script requires Adobe After Effects CS3 or later."};
	
	
	
	
	// rd_localize()
	// 
	// Description:
	// This function localizes the given string variable based on the current locale.
	// 
	// Parameters:
	//   strVar - The string variable's name.
	// 
	// Returns:
	// String.
	//
	function rd_localize(strVar)
	{
		return strVar["en"];
	}
	
	
	
	
	// rd_CameraProjectionSetup_main()
	// 
	// Description:
	// This function performs the main operation of the script.
	// 
	// Parameters:
	// None.
	// 
	// Returns:
	// Nothing.
	//
	function rd_CameraProjectionSetup_main()
	{
		// Check that a project exists
		if (app.project === null)
			return;
		
		// Get the current (active/frontmost) comp
		var comp = app.project.activeItem;
		
		if ((comp === null) || !(comp instanceof CompItem))
		{
			alert(rd_localize(rd_CameraProjectionSetupData.strErrNoCompSel), rd_CameraProjectionSetupData.scriptName);
			return;
		}
		
		// Get the selected layer
		if (comp.selectedLayers.length !== 1)
		{
			alert(rd_localize(rd_CameraProjectionSetupData.strErrNoLayerSel), rd_CameraProjectionSetupData.scriptName);
			return;
		}
		
		app.beginUndoGroup(rd_CameraProjectionSetupData.scriptName);
		
		// Step 1: Get a selected layer.
		var layer = comp.selectedLayers[0];
		
		// Step 2: Create default back wall plane below layer, enable 3D, and set Accepts Lights to Off.
		var backingLayer = comp.layers.addSolid([1,1,1], "Plane", 2000, 2000, 1.0, comp.duration);
		backingLayer.name = "backing";
		backingLayer.threeDLayer = true;
		backingLayer.position.setValue([0,0,2000]);
		backingLayer.materialOption.acceptsLights.setValue(false);
		backingLayer.moveAfter(layer);
		
		// Step 3: Add "Projection Cam" camera.
		var projCamLayer = comp.layers.addCamera("Projection Cam", [0,0]);
		projCamLayer.position.setValue([0,0,0]);
		projCamLayer.anchorPoint.setValue([0,0,1000]);
		
		// Step 4: Add "Projector Light" spot light, set its position to that of the Projection Cam, parent it to the camera, and set Casts Shadows to On.
		var projLightLayer = comp.layers.addLight("Projector Light", [0,0]);
		projLightLayer.position.setValue([0,0,0]);
		projLightLayer.anchorPoint.setValue([0,0,1000]);
		projLightLayer.lightOption.coneAngle.setValue(60);
		projLightLayer.lightOption.coneFeather.setValue(0);
		projLightLayer.lightOption.castsShadows.setValue(true);
		projLightLayer.parent = projCamLayer;
		
		// Step 5: Duplicate source layer naming it Slide, enable 3D, set Casts Shadows to Only and Light Transmission to 100%.
		var slideLayer = layer.duplicate();
		slideLayer.name = "Slide";
		slideLayer.threeDLayer = true;
		slideLayer.materialOption.castsShadows.setValue(2);	// Only
		slideLayer.materialOption.lightTransmission.setValue(100);
		slideLayer.position.setValue([0,0,100]);
		
		layer.enabled = false;
		
		// Step 6: Add Scale expression for Slide to Projection Cam's zoom, parent it to Projection Cam.
		slideLayer.scale.expression = "cam=thisComp.layer(\"Projection Cam\");\ndist = length(position[2]-cam.position[2]);\ns = dist / cam.zoom;\nscale*s";
		slideLayer.parent = projCamLayer;
		
		// Add Anim Cam - you can't repo the Proj Cam, it should be turned off and locked. The effect comes from moving the Anim Cam.
		var animCamLayer = projCamLayer.duplicate();
		projCamLayer.enabled = false;
		animCamLayer.name = "Anim Cam";
		
		// Lock the Projector Light, Projection Cam, and Slide layers
		projLightLayer.locked = true;
		projCamLayer.locked = true;
		slideLayer.locked = true;
		
		app.endUndoGroup();
		
		// Tell the user about manual steps needed.
		alert(rd_localize(rd_CameraProjectionSetupData.strNextSteps), rd_CameraProjectionSetupData.scriptName)
	}
	
	
	
	
	// main code:
	//
	
	// Prerequisite check for After Effects CS3 or later
	if (parseFloat(app.version) < 8.0)
		alert(rd_localize(rd_CameraProjectionSetupData.strMinAE80), rd_CameraProjectionSetupData.scriptName);
	else
		rd_CameraProjectionSetup_main();
})();
