// rd_TrimZeroOpacity.jsx
// Copyright (c) 2008-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_TrimZeroOpacity
// Version: 1.2
// 
// Description:
// This script trims the transparent ends of the selected layers by 
// trimming to the first and last frame that doesn't have a zero value 
// for Opacity. Unlike the rd_TrimToZeroOpacityKeys.jsx script, 
// this one will evaluate expression values and also trim as much 
// as possible (if multiple adjacent frames have the same zero value).
// Because multiple frames can be evaluated per layer, this script 
// might take a little longer to process lots of layers.
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




(function rd_TrimZeroOpacity()
{
	// Get the current or active composition
	var comp = app.project.activeItem;
	if ((comp !== null) && (comp instanceof CompItem))
	{
		// Treat as a single undoable event
		app.beginUndoGroup("Trim Zero Opacity");
		
		// Loop through all selected layers
		for (var i=0; i<comp.selectedLayers.length; i++)
		{
			// Make sure the layer has an Opacity property with at least 2 keyframes
			var layer = comp.selectedLayers[i];
			var opac = layer.property("Opacity");
			if (opac === null)
				continue;
			
			// Start examining interior frames from the current In and Out points
			// but reverse direction if using a negatively stretched layer
			if (layer.stretch > 0)
			{
				var headFrame = layer.inPoint;
				var tailFrame = layer.outPoint;
			}
			else
			{
				var headFrame = layer.outPoint;
				var tailFrame = layer.inPoint;
			}
			var frameIncrement = comp.frameDuration;
			
			// Loop through the head frames until we get a non-zero value
			while ((headFrame < tailFrame) && (opac.valueAtTime(headFrame, false) === 0))
				headFrame += frameIncrement;
			// Loop through the tail frames until we get a non-zero value
			while ((tailFrame > headFrame) && (opac.valueAtTime(tailFrame, false) === 0))
				tailFrame -= frameIncrement;
			
			// Trim the layer to the new head/tail frames
			if (layer.stretch > 0)
			{
				if (layer.inPoint !== headFrame)
					layer.inPoint = headFrame;
				if (layer.outPoint !== tailFrame)
					layer.outPoint = tailFrame;
			}
			else
			{
				if (layer.inPoint !== tailFrame)
					layer.inPoint = tailFrame;
				if (layer.outPoint !== headFrame)
					layer.outPoint = headFrame;
			}
		}
		
		// End of the actions that make the single undoable event
		app.endUndoGroup()
	}
})();
