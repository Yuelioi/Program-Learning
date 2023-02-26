// rd_TrimToZeroOpacityKeys.jsx
// Copyright (c) 2008-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_TrimToZeroOpacityKeys
// Version: 1.2
// 
// Description:
// This script trims the transparent ends of the selected layers 
// by trimming to the first and last Opacity keyframes with zero value.
// 
// Usage:
//  1. Select one or more layers.
//  2. Run this script.
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




(function rd_TrimToZeroOpacityKeys()
{
	// Get the current or active composition
	var comp = app.project.activeItem;
	if ((comp !== null) && (comp instanceof CompItem))
	{
		// Loop through all selected layers
		for (var i=0; i<comp.selectedLayers.length; i++)
		{
			// Make sure the layer has an Opacity property with at least 2 keyframes
			var layer = comp.selectedLayers[i];
			var opac = layer.opacity;	// layer.property("ADBE Opacity") no longer works
			if ((opac === null) || (opac.numKeys < 2))
				continue;
			
			// Check the first and last keyframe for a zero value, and trim to it if so
			if (opac.keyValue(1) === 0)
				layer.inPoint = opac.keyTime(1);
			if (opac.keyValue(opac.numKeys) === 0)
				layer.outPoint = opac.keyTime(opac.numKeys);
		}
	}
})();
