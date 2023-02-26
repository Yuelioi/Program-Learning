// rd_Duplink.jsx
// Copyright (c) 2006-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_Duplink
// Version: 3.2
// 
// Description:
// This script displays a palette with controls for creating linked instances of a
// selected layer's properties. These links are made via pick-whipped expressions, so 
// only those properties that can use expressions can be linked. Use this script to
// create duplicates or "instances" of a layer, which allow you to change the main layer
// and have its instance layers update as well.
// 
// Prerequisites:
//  -- This script requires After Effects CS4 or later.
//  -- Make sure the "Enable JavaScript Debugger" option (in the General Preferences
//     dialog box) is not selected. Otherwise, the script might stop with an 'After
//     Effects error: Can not “set expression” with this property, because the property
//     or a parent property is hidden.' error message.
// 
// Usage:
//  1. Select a layer.
//  2. Specify the layer properties to link (Link list), and if the Position transform
//     property should be linked. Don't link Position if you want to reposition the
//     linked instances immediately after creating them.
//  3. Specify the number of instances to create, and if they should be selected
//     immediately (and original layer deselected).
//  4. Click the Create Linked Instances button.
// 
// The specified number of instances are created and linked to the original layer.
// 
// Notes:
//  -- Properties that cannot use expressions, custom effect settings, cannot be
//     linked.
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




(function rd_Duplink(thisObj)
{
	// Globals
	
	// Store all constants in a global object, for consolidated organization in ExtendScript Toolkit's Data Browser
	var rd_DuplinkData = new Object();
	rd_DuplinkData.scriptName = "rd: Duplink";
	rd_DuplinkData.scriptTitle = rd_DuplinkData.scriptName + " v3.2";
	
	// Various text strings are defined as associative arrays (dictionaries) to support localizability via rd_localize() function
	rd_DuplinkData.strFeature = {en: "Link:"};
	rd_DuplinkData.strFeatureOpts = {en: '["Layer - All Linkable Properties", "Layer - Transform", "Layer - Material Options", "Layer - Masks", "Layer - Effects"]'};
	rd_DuplinkData.strLinkPosTransform = {en: "Link Position transform property"};
	rd_DuplinkData.strCopies = {en: "Instances:"};
	rd_DuplinkData.strSelectInstances = {en: "Select instances, deselect original"};
	rd_DuplinkData.strLink = {en: "Create Linked Instances"};
	rd_DuplinkData.strHelp = {en: "?"}
	rd_DuplinkData.strErrNoCompSel = {en: "Cannot perform operation. Please select or open a single composition in the Project panel, and try again."};
	rd_DuplinkData.strErrNoLayerSel = {en: "Cannot perform operation. Please select at least one layer, and try again."};
	rd_DuplinkData.strErrMoreThan1Selection = {en: "To create layer instances, select only one layer, and try again."};
	rd_DuplinkData.strMinAE90 = {en: "This script requires Adobe After Effects CS4 or later."};
	rd_DuplinkData.strHelpText = 
	{
		en: "Copyright (c) 2006-2013 Jeffrey R. Almasol. All rights reserved.\n" +
		"portfolio: www.redefinery.com\n\n" +
		
		"Description:\n" +
		"This script displays a palette with controls for creating linked instances of a selected layer's properties. These links are made via pick-whipped expressions, so only those properties that can use expressions can be linked. Use this script to create duplicates or \"instances\" of a layer, which allow you to change the main layer and have its instance layers update as well.\n\n" +
		
		"Prerequisites:\n" +
		" -- This script requires After Effects CS4 or later.\n" +
		" -- Make sure the \"Enable JavaScript Debugger\" option (in the General Preferences dialog box) is not selected. Otherwise, the script might stop with an 'After Effects error: Can not “set expression” with this property, because the property or a parent property is hidden.' error message.\n\n" +
		
		"Usage:\n" +
		" 1. Select a layer.\n" +
		" 2. Specify the layer properties to link (Link list), and if the Position transform property should be linked. Don't link Position if you want to reposition the linked instances immediately after creating them.\n" +
		" 3. Specify the number of instances to create, and if they should be selected immediately (and original layer deselected).\n" +
		" 4. Click the Create Linked Instances button.\n\n" +
		
		"The specified number of instances are created and linked to the original layer.\n\n" +
		
		"Notes:\n" +
		" -- Properties that cannot use expressions, such as custom effect settings, cannot be linked.\n\n" +
		
		"Legal Notices:\n" +
		"This script is provided \"as is,\" without warranty of any kind, expressed or implied. In no event shall the script's author be held liable for any damages arising in any way from the use of this script.\n\n" +
		
		"This script is excerpted from Adobe After Effects CS6 Visual Effects and Compositing Studio Techniques by Mark Christiansen. (c) 2013. Published by Adobe Press. All rights reserved. Additional scripts and a complete chapter on scripting by Jeff Almasol are included in the book, available at http://www.peachpit.com/store/adobe-after-effects-cs6-visual-effects-and-compositing-9780321834591"
	};
	
	
	
	
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
	
	
	
	
	// rd_Duplink_buildUI()
	// 
	// Description:
	// This function builds the user interface. Coordinates of various controls are relative
	// to others so that they can adapt if spacing is adjusted.
	// 
	// Parameters:
	// thisObj - Panel object (if using a dockable panel) or Window object (if using a traditional palette). 
	// 
	// Returns:
	// Panel or Window object representing the built user interface.
	//
	function rd_Duplink_buildUI(thisObj)
	{
		var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", rd_DuplinkData.scriptName, undefined, {resizeable:true});
		
		if (pal !== null)
		{
			var res = 
			"""group { 
				orientation:'column', alignment:['fill','top'], alignChildren:['fill','top'], 
				header: Group { 
					alignment:['fill','top'], margins:[0,0,0,5], 
					title: StaticText { text:'""" + rd_DuplinkData.scriptName + """' }, 
				}, 
				link1: Group { 
					feature: StaticText { text:'""" + rd_localize(rd_DuplinkData.strFeature) + """' }, 
					featureOpts: DropDownList { preferredSize:[-1,20] }, 
				}, 
				link2: Group { 
					alignment:['left','top'], 
					linkPos: Checkbox { text:'""" + rd_localize(rd_DuplinkData.strLinkPosTransform) + """', value:true }, 
				}, 
				inst1: Group { 
					copiesLbl: StaticText { text:'""" + rd_localize(rd_DuplinkData.strCopies) + """' }, 
					copies: EditText { text:'1', characters:5, preferredSize:[-1,20] }, 
				}, 
				inst2: Group { 
					alignment:['left','top'], 
					selInstances: Checkbox { text:'""" + rd_localize(rd_DuplinkData.strSelectInstances) + """', value:true }, 
				}, 
				footer: Group { 
					alignment:['fill','top'], margins:[0,5,0,0], 
					helpBtn: Button { text:'""" + rd_localize(rd_DuplinkData.strHelp) + """', alignment:['left','top'], maximumSize:[30,20] }, 
					linkBtn: Button { text:'""" + rd_localize(rd_DuplinkData.strLink) + """', alignment:['right','top'], preferredSize:[-1,20] }, 
				}, 
			}""";
			pal.grp = pal.add(res);
							
			var items = eval(rd_localize(rd_DuplinkData.strFeatureOpts));
			for (var i=0; i<items.length; i++)
				pal.grp.link1.featureOpts.add("item", items[i]);
			pal.grp.link1.featureOpts.selection = 0;
			pal.grp.link1.featureOpts.onChange = function ()			// Call this function when an item is selected from the Link list menu
			{
				var featureOpts = this.selection.index;
				
				// Enable checkbox only if Link = Layer - All Linkable Properties or Layer - Transform
				this.parent.parent.link2.linkPos.enabled = ((featureOpts === 0) || (featureOpts === 1));
			}
			pal.grp.link2.margins.top = -5;
			
			pal.grp.inst1.copies.onChange = function ()					// Call this function when an item is selected from the Instances list menu
			{
				// Make sure the Copies value is at least 1; no artificial max limit
				// Also, ensure always an integer in case user entered a fractional value
				var value = parseInt(this.text);
				
				if (isNaN(value) || (value < 1))
					this.text = "1";
				else
					this.text = value.toString();
			}
			pal.grp.inst2.margins.top = -5;
			
			pal.grp.link1.feature.preferredSize.width = pal.grp.inst1.copiesLbl.preferredSize.width;
			pal.grp.link2.indent = pal.grp.link1.feature.preferredSize.width + pal.grp.link1.spacing;
			pal.grp.inst2.indent = pal.grp.inst1.copiesLbl.preferredSize.width + pal.grp.inst1.spacing;
			
			pal.grp.footer.linkBtn.onClick = rd_Duplink_doDuplink;				// Call the rd_Duplink_doDuplink function when the Create Linked Instances button is clicked
			pal.grp.footer.helpBtn.onClick = function ()					// Call this function to display the About box and help
			{
				alert(rd_DuplinkData.scriptTitle + "\n" + rd_localize(rd_DuplinkData.strHelpText), rd_DuplinkData.scriptName);
			}
			
			pal.layout.layout(true);
			pal.grp.minimumSize = pal.grp.size;
			pal.layout.resize();
			pal.onResizing = pal.onResize = function () {this.layout.resize();}
		}
		
		return pal;
	}
	
	
	
	
	// rd_Duplink_linkPropChildren()
	// 
	// Description:
	// This function iterates over the "leader" and "follower" properties' corresponding
	// children properties, setting the appropriate expression to link the follower 
	// property to that on the leader.
	// 
	// Parameters:
	//   leaderProp - Property object for the "leader".
	//   followerProp - Property object for the "follower".
	//   propChainExpr - String of the current expression from the layer reference up to
	//     the current leaderProp.
	//   linkPos - Boolean controlling if the Position property is linked.
	// 
	// Returns:
	// Nothing.
	//
	function rd_Duplink_linkPropChildren(leaderProp, followerProp, propChainExpr, linkPos)
	{
		var lProp, fProp, indexCount = 1;
		
		// Loop through all properties in the current property group
		for (var i=1; i<=leaderProp.numProperties; i++)
		{
			lProp = leaderProp.property(i);
			fProp = followerProp.property(i);
			
			// Process properties, recursively scan indexed and named property groups
			switch (lProp.propertyType)
			{
				case PropertyType.PROPERTY:
					// Skip Position property, if requested
					if ((lProp.matchName === "ADBE Position") && !linkPos)
						continue;
					
					// Link properties via expression
					if (fProp.canSetExpression && lProp.canSetExpression)
					{
						try				// If within indexed group, reference property by index number; otherwise, by name
						{
							//$.writeln(fProp.name + " - setting expr: " + (propChainExpr + "(" + ((leaderProp.propertyType === PropertyType.INDEXED_GROUP) ? indexCount : ("\"" + lProp.name + "\"")) + ")"));
							fProp.expression = propChainExpr + "(" + ((leaderProp.propertyType === PropertyType.INDEXED_GROUP) ? indexCount : ("\"" + lProp.matchName + "\"")) + ")";
						}
						catch (e)		// Catch any expression assignments that can be done, but might cause errors
						{}
					}
					break;
				case PropertyType.INDEXED_GROUP:
				case PropertyType.NAMED_GROUP:
					// Recusively call this function, appending the current property name to the property chain expression
					rd_Duplink_linkPropChildren(lProp, fProp, (propChainExpr + "(\"" + lProp.name + "\")"), linkPos);
					break;
				default:
					break;
			}
		}
	}
	
	
	
	
	// rd_Duplink_doDuplink()
	// 
	// Description:
	// This function handles the creation of linked instances.
	// 
	// Parameters:
	// None.
	// 
	// Returns:
	// Nothing.
	//
	function rd_Duplink_doDuplink()
	{
		var feature = this.parent.parent.link1.featureOpts.selection.index;
		var linkPos = eval(this.parent.parent.link2.linkPos.value);
		var copies = parseInt(this.parent.parent.inst1.copies.text);
		var selInstances = eval(this.parent.parent.inst2.selInstances.value);
		
		// Check that a project exists
		if (app.project === null)
			return;
		
		// Get the current (active/frontmost) comp
		var comp = app.project.activeItem;
		if ((comp === null) || !(comp instanceof CompItem))
		{
			alert(rd_localize(rd_DuplinkData.strErrNoCompSel), rd_DuplinkData.scriptName);
			return;
		}
		
		// Make sure only one layer is selected
		var sources = comp.selectedLayers						// Retrieve the selected layers
		if (sources.length !== 1)								// Make sure only 1 is selected
		{
			alert(rd_localize(rd_DuplinkData.strErrMoreThan1Selection), rd_DuplinkData.scriptName);
			return;
		}
			
		var leader = sources[0];								// Primary layer or effect
		var followers = new Array();							// Secondary layers or effects that will be linked to the primary one
		var newLayer, dupLayer;
		
		// Set up the instances
		app.beginUndoGroup(rd_DuplinkData.scriptName);
		
		// Create the first linked instance
		newLayer = leader.duplicate();
		newLayer.name = leader.name + " Instance 1";
		newLayer.moveAfter(leader);
		
		if (feature === 0)											// Layer - All Linkable Properties
			rd_Duplink_linkPropChildren(leader, newLayer, "thisComp.layer(\""+leader.name+"\")", linkPos);
		else if (feature === 1)									// Layer - Transform
			rd_Duplink_linkPropChildren(leader("ADBE Transform Group"), newLayer("ADBE Transform Group"), "thisComp.layer(\""+leader.name+"\")(\"ADBE Transform Group\")", linkPos);
		else if (feature === 2)									// Layer - Material Options
			rd_Duplink_linkPropChildren(leader("ADBE Material Options Group"), newLayer("ADBE Material Options Group"), "thisComp.layer(\""+leader.name+"\")(\"ADBE Material Options Group\")", true);
		else if (feature === 3)									// Layer - Masks
			rd_Duplink_linkPropChildren(leader("ADBE Mask Parade"), newLayer("ADBE Mask Parade"), "thisComp.layer(\""+leader.name+"\")(\"ADBE Mask Parade\")", true);
		else if (feature === 4)									// Layer - Effects
			rd_Duplink_linkPropChildren(leader("ADBE Effect Parade"), newLayer("ADBE Effect Parade"), "thisComp.layer(\""+leader.name+"\")(\"ADBE Effect Parade\")", true);
		
		followers[0] = newLayer;
		
		// Now duplicate the linked instance (if Instances > 1)
		for (var i=2; i<=copies; i++)
		{
			newLayer = followers[0].duplicate();
			newLayer.moveAfter(followers[followers.length-1]);
			newLayer.name = leader.name + " Instance " + i;
			followers[followers.length] = newLayer;
		}
		
		// Set selection to the instance layers, if requested
		if (selInstances)
		{
			leader.selected = false;
			for (var i=0; i<followers.length; i++)
				followers[i].selected = true;
		}
		
		// End of undo event
		app.endUndoGroup();
	}
	
	
	
	
	// main code:
	//
	
	// Prerequisite check for After Effects CS4 or later
	if (parseFloat(app.version) < 9.0)
		alert(rd_localize(rd_DuplinkData.strMinAE90), rd_DuplinkData.scriptName);
	else
	{
		// Build and show the floating palette
		var palette = rd_Duplink_buildUI(thisObj);
		if (palette !== null)
		{
			// Update UI values, if saved in the settings
			if (app.settings.haveSetting("redefinery", "rd_Duplink_featureOpts"))
				palette.grp.link1.featureOpts.selection = parseInt(app.settings.getSetting("redefinery", "rd_Duplink_featureOpts"));
			if (app.settings.haveSetting("redefinery", "rd_Duplink_linkPos"))
				palette.grp.link2.linkPos.value = eval(app.settings.getSetting("redefinery", "rd_Duplink_linkPos"));
			if (app.settings.haveSetting("redefinery", "rd_Duplink_copies"))
				palette.grp.inst1.copies.text = parseInt(app.settings.getSetting("redefinery", "rd_Duplink_copies"));
			if (app.settings.haveSetting("redefinery", "rd_Duplink_selInstances"))
				palette.grp.inst2.selInstances.value = eval(app.settings.getSetting("redefinery", "rd_Duplink_selInstances"));
			
			// Save current UI settings upon closing the palette
			palette.onClose = function ()
			{
				app.settings.saveSetting("redefinery", "rd_Duplink_featureOpts", palette.grp.link1.featureOpts.selection.index);
				app.settings.saveSetting("redefinery", "rd_Duplink_linkPos", palette.grp.link2.linkPos.value);
				app.settings.saveSetting("redefinery", "rd_Duplink_copies", palette.grp.inst1.copies.text);
				app.settings.saveSetting("redefinery", "rd_Duplink_selInstances", palette.grp.inst2.selInstances.value);
			}
			
			if (palette instanceof Window)
			{
				// Show the palette
				palette.center();
				palette.show();
			}
			else
				palette.layout.layout(true);
		}
	}
})(this);
