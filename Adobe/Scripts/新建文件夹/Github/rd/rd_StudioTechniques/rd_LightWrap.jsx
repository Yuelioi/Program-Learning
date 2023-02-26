// rd_LightWrap.jsx
// Copyright (c) 2008-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_LightWrap
// Version: 1.2
// 
// Description:
// This script creates the light wrap effect using the technique described in
// the Light chapter of the book. In addition, it adds a Contamination and 
// Wrap Offset controls to the precomp layer for easier adjustment, and 
// ties the position, scale, and rotation properties from the foreground and 
// background layers to those in the precomp to synchronize any 
// transformations you decide to do.
// 
// Prerequisites:
//  -- This script requires After Effects CS4 or later.
// 
// Usage:
//  1. Select a layer (foreground) that has at least one layer below it (background).
//       Note: Both layers must be 2D and not have their Position properties separated.
//  2. Run this script.
//  3. Use the Contamination and Wrap Offset effect controls that are created on the 
//       Light Wrap precomp layer to adjust the light wrap effect.
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




(function rd_LightWrap()
{
	// Globals
	
	// Store all constants in a global object, for consolidated organization in ExtendScript Toolkit's Data Browser
	var rd_LightWrapData = new Object();
	rd_LightWrapData.scriptName = "rd: Light Wrap";
	rd_LightWrapData.scriptTitle = rd_LightWrapData.scriptName + " v1.2";
	
	// Various text strings are defined as associative arrays (dictionaries) to support localizability via rd_localize() function
	rd_LightWrapData.strLightWrapCompNamePrefix = {en: "Light Wrap: "};
	rd_LightWrapData.strAdjLayerName = {en: "Adjustment Layer"};
	rd_LightWrapData.strContamination = {en: "Contamination"};
	rd_LightWrapData.strWrapOffset = {en: "Wrap Offset"};
	rd_LightWrapData.strMarkerText = {en: "Adjust Contamination and Wrap Offset to change the light wrap"};
	rd_LightWrapData.strErrNoCompSel = {en: "Cannot perform operation. Please select or open a single composition in the Project panel, and try again."};
	rd_LightWrapData.strErrMoreThan1Selection = {en: "Select only one layer as the foreground, make sure there is a background layer below it, and try again."};
	rd_LightWrapData.strErrNeed2DLayers = {en: "Make sure both the foreground and background layers are 2D, and do not have separated Position properties."};
	rd_LightWrapData.strMinAE90 = {en: "This script requires Adobe After Effects CS4 or later."};
	
	
	
	
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
	
	
	
	
	// rd_LightWrap_main()
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
	function rd_LightWrap_main()
	{
		// Check that a project exists
		if (app.project === null)
			return;
		
		// Get the current (active/frontmost) comp
		var comp = app.project.activeItem;
		if ((comp === null) || !(comp instanceof CompItem))
		{
			alert(rd_localize(rd_LightWrapData.strErrNoCompSel), rd_LightWrapData.scriptName);
			return;
		}
		
		// Make sure only one layer is selected, and there is at least one layer below it
		if ((comp.selectedLayers.length !== 1) || (comp.selectedLayers[0].index >= comp.numLayers))
		{
			alert(rd_localize(rd_LightWrapData.strErrMoreThan1Selection), rd_LightWrapData.scriptName);
			return;
		}
		var fgLayer = comp.selectedLayers[0];
		var bgLayer = comp.layer(comp.selectedLayers[0].index+1);	// .layer() is 1-based, selectedLayers is 0-based, so need to do +1 to get next layer
		
		// Do a pre-flight check to make sure both layers are 2D and their Position properties are not separated
		// (to make it easier to deal with expressions later on).
		if (fgLayer.threeDLayer || bgLayer.threeDLayer || fgLayer.position.dimensionsSeparated || bgLayer.position.dimensionsSeparated)
		{
			alert(rd_localize(rd_LightWrapData.strErrNeed2DLayers), rd_LightWrapData.scriptName);
			return;
		}
		
		app.beginUndoGroup(rd_LightWrapData.scriptName);
		
		// Step 1: Create a new composition that contains the background and foreground layers.
		var lightWrapComp = app.project.items.addComp(rd_localize(rd_LightWrapData.strLightWrapCompNamePrefix) + fgLayer.name, comp.width, comp.height, comp.pixelAspect, comp.duration, comp.frameRate);
		bgLayer.copyToComp(lightWrapComp);
		fgLayer.copyToComp(lightWrapComp);
		
		var lWfgLayer = lightWrapComp.layer(1);
		var lWbgLayer = lightWrapComp.layer(2);
		
		// Step 2: Set Silhouette Alpha blending mode for the foreground layer.
		lWfgLayer.blendingMode = BlendingMode.SILHOUETE_ALPHA;	// yes, it's spelled incorrectly :-/
		
		// Step 3: Add an adjustment layer at the top, and apply Fast Blur.
		var adjLayer = lightWrapComp.layers.addSolid([1,1,1], rd_localize(rd_LightWrapData.strAdjLayerName), lightWrapComp.width, lightWrapComp.height, lightWrapComp.pixelAspect, lightWrapComp.duration);
		adjLayer.adjustmentLayer = true;
		adjLayer.moveBefore(lWfgLayer);
		
		var fastBlurFX = adjLayer.property("ADBE Effect Parade").addProperty("ADBE Fast Blur");
		
		// Step 4: In Fast Blur, check the Repeat Edge Pixels toggle on and crank up the blurriness.
		fastBlurFX.property("ADBE Fast Blur-0003").setValue(true);
		fastBlurFX.property("ADBE Fast Blur-0001").setValue(50);
		
		// Step 5: Duplicate the foreground layer, move the copy to the top, and set its blending mode
		// to Stencil Alpha.
		var stencilAlphaLayer = lWfgLayer.duplicate();
		stencilAlphaLayer.moveToBeginning();
		stencilAlphaLayer.blendingMode = BlendingMode.STENCIL_ALPHA;
		
		// Step 6: Place the resulting comp in the master comp (above the original foreground layer), and set blending mode to Add.
		var lightWrapPrecompLayer = comp.layers.add(lightWrapComp);
		lightWrapPrecompLayer.moveBefore(fgLayer);
		lightWrapPrecompLayer.startTime = 0;
		lightWrapPrecompLayer.blendingMode = BlendingMode.ADD;
		
		// Bonus Step: Add some expression sliders to the precomp to expose the Fast Blur effect's Blurriness, 
		// a Wrap Offset for the silhouette alpha layer, and basic transforms for the foreground and background 
		// layers. Add a layer marker to the prcomp layer 
		// as a reminder.
		var slider = lightWrapPrecompLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
		slider.name = rd_localize(rd_LightWrapData.strContamination);
		slider.property("ADBE Slider Control-0001").setValue(50);
		adjLayer.property("ADBE Effect Parade").property("ADBE Fast Blur").property("ADBE Fast Blur-0001").expression = "comp(\"" + comp.name + "\").layer(\"" + lightWrapPrecompLayer.name + "\").effect(\"" + rd_localize(rd_LightWrapData.strContamination) + "\")(\"ADBE Slider Control-0001\");";
		
		var offset = lightWrapPrecompLayer.property("ADBE Effect Parade").addProperty("ADBE Point Control");
		offset.name = rd_localize(rd_LightWrapData.strWrapOffset);
		offset.property("ADBE Point Control-0001").setValue([0,0]);
		
		stencilAlphaLayer.position.expression = "comp(\"" + comp.name + "\").layer(\"" + fgLayer.name + "\").transform.position;";
		lWfgLayer.position.expression = "comp(\"" + comp.name + "\").layer(\"" + fgLayer.name + "\").transform.position + comp(\"" + comp.name + "\").layer(\"" + lightWrapPrecompLayer.name + "\").effect(\"" + rd_localize(rd_LightWrapData.strWrapOffset) + "\")(\"ADBE Point Control-0001\");";
		stencilAlphaLayer.scale.expression = lWfgLayer.scale.expression = "comp(\"" + comp.name + "\").layer(\"" + fgLayer.name + "\").transform.scale;";
		stencilAlphaLayer.rotation.expression = lWfgLayer.rotation.expression = "comp(\"" + comp.name + "\").layer(\"" + fgLayer.name + "\").transform.rotation;";
		
		lWbgLayer.position.expression = "comp(\"" + comp.name + "\").layer(\"" + bgLayer.name + "\").transform.position;";
		lWbgLayer.scale.expression = "comp(\"" + comp.name + "\").layer(\"" + bgLayer.name + "\").transform.scale;";
		lWbgLayer.rotation.expression = "comp(\"" + comp.name + "\").layer(\"" + bgLayer.name + "\").transform.rotation;";
		
		lightWrapPrecompLayer.property("Marker").setValueAtTime(lightWrapPrecompLayer.inPoint, new MarkerValue(rd_localize(rd_LightWrapData.strMarkerText)));
		
		app.endUndoGroup();
	}
	
	
	
	
	// main code:
	//
	
	// Prerequisite check for After Effects CS4 or later
	if (parseFloat(app.version) < 9.0)
		alert(rd_localize(rd_LightWrapData.strMinAE90), rd_LightWrapData.scriptName);
	else
		rd_LightWrap_main();
})();
