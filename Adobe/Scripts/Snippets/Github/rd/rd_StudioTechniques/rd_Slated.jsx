// rd_Slated.jsx
// Copyright (c) 2008-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_Slated
// Version: 1.2
// 
// Description:
// This script renders slates, single-frame images of a specific template composition 
// whose data is fed by the information in a text file exported from a spreadsheet.
// 
// Prerequisites:
//  -- This script requires After Effects CS4 or later.
// 
// Usage:
//  1. Run this script.
//  2. Select the project containing the template composition named "comp"
//     to use for the slates.
//  3. Select the tab-delimited data file whose columnar data values match 
//      the layer names in the "comp" template.
//  4. Select the output folder into which the slates will be rendered.
// 
// The slates will be rendered in Photoshop format.
// 
// Notes:
//  -- The machine on which you run the script should have an output module 
//  template named "Photoshop", which should be available in the default set 
// of templates.
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




(function rd_Slated()
{
	// Globals
	
	// Store all constants in a global object, for consolidated organization in ExtendScript Toolkit's Data Browser
	var rd_SlatedData = new Object();
	rd_SlatedData.scriptName = "rd: Slated";
	rd_SlatedData.scriptTitle = rd_SlatedData.scriptName + " v1.2";
	
	// Various text strings are defined as associative arrays (dictionaries) to support localizability via rd_localize() function
	rd_SlatedData.strTplCompName = {en: "template"};
	rd_SlatedData.strSelTplProj = {en: "Select the template project"};
	rd_SlatedData.strSelDataFile = {en: "Select the text file containing slate data"};
	rd_SlatedData.strSelOutFolder = {en: "Select the output folder for rendered slates"};
	rd_SlatedData.strSlatesFolderSuffix = {en: " Slates"};
	rd_SlatedData.strErrOpenProj = {en: "Could not open the template project."};
	rd_SlatedData.strErrNoTplComp = {en: "Could not find a comp named 'template'."};
	rd_SlatedData.strErrCreateOutFolder = {en: "Could not create the output folder."};
	rd_SlatedData.strMinAE90 = {en: "This script requires Adobe After Effects CS4 or later."};
	
	
	
	
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
	
	
	
	
	// rd_Slated_main()
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
	function rd_Slated_main()
	{
		// Select/open the template project
		var projFile = File.openDialog(rd_localize(rd_SlatedData.strSelTplProj));
		if ((projFile === null) || !projFile.exists)
			return;
		
		var proj = app.open(projFile);
		if (proj === null)
			return;
		
		// Check that the template comp exists
		var comp = null;
		for (var i=1; i<=proj.numItems; i++)
		{
			if ((proj.item(i) instanceof CompItem) && (proj.item(i).name === rd_localize(rd_SlatedData.strTplCompName)))
			{
				comp = proj.item(i);
				break;
			}
		}
		// If comp is still null, the comp doesn't exist in the project
		if (comp === null)
		{
			alert(rd_localize(rd_SlatedData.strErrNoTplComp), rd_SlatedData.scriptName);
			return;
		}
		
		// Select the data file
		var dataFile = File.openDialog(rd_localize(rd_SlatedData.strSelDataFile));
		if ((dataFile === null) || !dataFile.exists)
			return;
		
		// Select the folder where the slates will be rendered
		var outFolder = Folder.selectDialog(rd_localize(rd_SlatedData.strSelOutFolder));
		if (outFolder === null)
			return;
		// If the folder doesn't exist, create it
		if (!outFolder.exists)
		{
			if (!outFolder.create())
			{
				alert(rd_localize(rd_SlatedData.strErrCreateOutFolder), rd_SlatedData.scriptName);
				return;
			}
		}
		
		// Build a catalog of layer names for text and footage layers, the types of layers that can be replaced
		var layerCat = new Array();
		for (var i=1; i<=comp.numLayers; i++)
		{
			// Look for text (TextLayer) and footage (AVLayer) layers only
			var layer = comp.layer(i);
			if ((layer instanceof TextLayer) || (layer instanceof AVLayer))
			{
				var layerName = layer.name;
				
				// Check if the layer's name was previously stored; this allows multiple layers
				// to be updated
				if (layerCat[layerName] === undefined)
				{
					// Layer name wasn't previously encountered, so create a new array to store layer indices
					layerCat[layerName] = new Array();
				}
				// Append the current layer's index to the newly created or existing (if same layer name was previously encountered)
				layerCat[layerName].push(i);
			}
		}
		
		// Create a subfolder to place the slate comps and any footage needed for each
		// Subfolder name will be based on the data file name
		var slatesFolder = app.project.items.addFolder(dataFile.name + rd_localize(rd_SlatedData.strSlatesFolderSuffix));
		
		// Process the lines of text from the data file
		// First line should be the field names, tab-separated, with subsequent lines the data
		
		// Open the data file for reading
		dataFile.open("r");
		
		// Read the first line, which are the field names
		var fields = dataFile.readln();
		if (!dataFile.eof)
		{
			// Split the field string at tab characters
			var fieldNames = fields.split("\t");
			
			// Read the rest of the lines, and create slate comps for each
			
			var dataLine, dataValues, layersToUpdate, layerData, currLayer;
			while (!dataFile.eof)
			{
				dataLine = dataFile.readln();
				dataValues = dataLine.split("\t");
				
				// Make sure the data line contains the same number of values as there are fields
				if (dataValues.length !== fieldNames.length)
					continue;
				
				// Duplicate the comp for the current line of data, and move it into the slates folder
				var slateComp = comp.duplicate();
				slateComp.parentFolder = slatesFolder;
				
				// Name the comp based on the first field's value (hopefully, it's unique)
				if (fieldNames.length > 0)
					slateComp.name = dataValues[0];
				
				// Loop through the fields and match up the data to the layers
				for (var f=0; f<fieldNames.length; f++)
				{
					// Get the set of layers matching the current field's name
					layersToUpdate = layerCat[fieldNames[f]];
					// Get the data to use for the field
					layerData = dataValues[f];
					
					// Loop through all matching layers, and update their content using the data to use
					for (var l=0; l<layersToUpdate.length; l++)
					{
						currLayer = slateComp.layer(layersToUpdate[l]);
						
						// Depending on the layer type, update as appropriate
						if (currLayer instanceof TextLayer)
						{
							// For a text layer, use the data value as the source text
							currLayer.sourceText.setValue(new TextDocument(layerData));
						}
						else if (currLayer instanceof AVLayer)
						{
							// For a footage layer, import the data value (hopefully is the footage's file name) and replace the source for the layer
							if (File(layerData).exists)
							{
								var fItem = proj.importFile(new ImportOptions(File(layerData)));
								if (fItem !== null)
								{
									// Move footage to the slates folder, then replace the footage layer
									fItem.parentFolder = slatesFolder;
									currLayer.replaceSource(fItem, false);
								}
							}
						}
					}
				}
				
				// Trim the comp to the first frame of the work area
				slateComp.workAreaDuration = slateComp.frameDuration;
				
				// Add the comp to the render queue; use Photoshop output module template
				var rqItem = proj.renderQueue.items.add(slateComp);
				rqItem.outputModule(1).applyTemplate("Photoshop");
				rqItem.outputModule(1).file = new File(outFolder.fsName + "/" + slateComp.name + "_[#####].psd");
			}
		}
		
		// Close the data file when done
		dataFile.close();
		
		// Start the render
		proj.renderQueue.render();
		
		// Select only the slates folder
		for (var i=1; i<=proj.numItems; i++)
			proj.item(i).selected = false;
		slatesFolder.selected = true;
	}
	
	
	
	
	// main code:
	//
	
	// Prerequisite check for After Effects CS4 or later
	if (parseFloat(app.version) < 9.0)
		alert(rd_localize(rd_SlatedData.strMinAE90), rd_SlatedData.scriptName);
	else
		rd_Slated_main();
})();
