// rd_MergeProjects.jsx
// Copyright (c) 2006-2013 Jeffrey R. Almasol. All rights reserved.
// portfolio: www.redefinery.com
// 
// Name: rd_MergeProjects
// Version: 3.2
// 
// Description:
// This script displays a palette with controls for merging a selected project folder's
// contents up to the root of the Project panel. Use this script when you have imported
// a project into another, and want to merge subfolders and their contents with existing
// same-named subfolders at the root-level of the project, keeping your Project panel 
// more organized.
// 
// Prerequisites:
//  -- This script requires After Effects CS4 or later.
// 
// Usage:
//  1. (Optional) Select a top-level folder (representing an imported project) in the 
//     Project panel.
//  2. Select if you want to consolidate all footage/folder items (equivalent to the
//     File > Consolidate All Footage menu command) and remove unused footage/folder
//     items (File > Remove Unused Footage) before folder are merged.
//  3. Click the Merge Project button.
// 
// If you did not select a folder in step 1, you are asked to select the project file to
// import (equivalent to File > Import > File). In either case, the project folder's
// contents are merged.
// 
// Notes:
//  -- Subfolder hierarchies are retained when "merged up", even if the contents include
//     a folder with the same name as that of a root-level folder. However, if the
//     source folder contains multiple subfolders of the same name, they will be
//     combined in the target folder.
//  -- Identical or identically named compositions are not merged or renumbered.
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




(function rd_MergeProjects(thisObj)
{
	// Globals
	
	// Store all constants in a global object, for consolidated organization in ExtendScript Toolkit's Data Browser
	var rd_MergeProjectsData = new Object();
	rd_MergeProjectsData.scriptName = "rd: Merge Projects";
	rd_MergeProjectsData.scriptTitle = rd_MergeProjectsData.scriptName + " v3.2";
	
	// Various text strings are defined as associative arrays (dictionaries) to support localizability via rd_localize() function
	rd_MergeProjectsData.strConsolidateFootage = {en: "Consolidate all footage and folder items"};
	rd_MergeProjectsData.strRemoveUnusedFootage = {en: "Remove unused footage and folder items"};
	rd_MergeProjectsData.strMergeOK = {en: "Selected project folder \"%s\" merged successfully."};
	rd_MergeProjectsData.strMergeFail = {en: "Selected project folder \"%s\" could not be merged completely."};
	rd_MergeProjectsData.strConsolidatedResult = {en: "%d footage or folder items were consolidated."};
	rd_MergeProjectsData.strRemovedResult = {en: "%d footage or folder items were removed."};
	rd_MergeProjectsData.strMerge = {en: "Merge Project"};
	rd_MergeProjectsData.strHelp = {en: "?"}
	rd_MergeProjectsData.strErrNoTopFolderSel = {en: "Cannot perform operation. Please select a single top-level folder in the Project panel, and try again."};
	rd_MergeProjectsData.strMinAE90 = {en: "This script requires Adobe After Effects CS4 or later."};
	rd_MergeProjectsData.strHelpText = 
	{
		en: "Copyright (c) 2006-2013 Jeffrey R. Almasol. All rights reserved.\n" +
		"portfolio: www.redefinery.com\n\n" +
		
		"Description:\n" +
		"This script displays a palette with controls for merging a selected project folder's contents up to the root of the Project panel. Use this script when you have imported a project into another, and want to merge subfolders and their contents with existing same-named subfolders at the root-level of the project, keeping your Project panel more organized.\n\n" +
		
		"Prerequisites:\n" +
		" -- This script requires After Effects CS4 or later.\n\n" +
		
		"Usage:\n" +
		" 1. (Optional) Select a top-level folder (representing an imported project) in the Project panel.\n" +
		" 2. Select if you want to consolidate all footage/folder items (equivalent to the File > Consolidate All Footage menu command) and remove unused footage/folder items (File > Remove Unused Footage) before folder are merged.\n" +
		" 3. Click the Merge Project button.\n\n" +
		
		"If you did not select a folder in step 1, you are asked to select the project file to import (equivalent to File > Import > File). In either case, the project folder's contents are merged.\n\n" +
		
		"Notes:\n" +
		" -- Subfolder hierarchies are retained when \"merged up\", even if the contents include a folder with the same name as that of a root-level folder. However, if the source folder contains multiple subfolders of the same name, they will be combined in the target folder.\n" +
		" -- Identical or identically named compositions are not merged or renumbered.\n\n" +
		
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
	
	
	
	
	// rd_MergeProjects_buildUI()
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
	function rd_MergeProjects_buildUI(thisObj)
	{
		var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", rd_MergeProjectsData.scriptName, undefined, {resizeable:true});
		
		if (pal !== null)
		{
			var res = 
			"""group { 
				orientation:'column', alignment:['fill','top'], alignChildren:['fill','top'], 
				header: Group { 
					alignment:['fill','top'], margins:[0,0,0,5], 
					title: StaticText { text:'""" + rd_MergeProjectsData.scriptName + """' }, 
				}, 
				consolidateFootage: Checkbox { text:'""" + rd_localize(rd_MergeProjectsData.strConsolidateFootage) + """', value:false }, 
				removeFootage: Checkbox { text:'""" + rd_localize(rd_MergeProjectsData.strRemoveUnusedFootage) + """', value:false }, 
				footer: Group { 
					alignment:['fill','top'], margins:[0,5,0,0], 
					helpBtn: Button { text:'""" + rd_localize(rd_MergeProjectsData.strHelp) + """', alignment:['left','top'], maximumSize:[30,20] }, 
					mergeBtn: Button { text:'""" + rd_localize(rd_MergeProjectsData.strMerge) + """', alignment:['right','top'], preferredSize:[-1,20] }, 
				}, 
			}""";
			pal.grp = pal.add(res);
			
			pal.grp.footer.mergeBtn.onClick = rd_MergeProjects_doMergeFolders;			// Call the rd_MergeProjects_doMergeFolders function when the Merge Project button is clicked
			pal.grp.footer.helpBtn.onClick = function ()					// Call this function to display the About box and help
			{
				alert(rd_MergeProjectsData.scriptTitle + "\n" + rd_localize(rd_MergeProjectsData.strHelpText), rd_MergeProjectsData.scriptName);
			}
			
			pal.layout.layout(true);
			pal.grp.minimumSize = pal.grp.size;
			pal.layout.resize();
			pal.onResizing = pal.onResize = function () {this.layout.resize();}
		}
		
		return pal;
	}
	
	
	
	
	// rd_MergeProjects_mergeFolderContents()
	// 
	// Description:
	// This function merges the source folder's hierarchy with that of the target folder's.
	// 
	// Parameters:
	//   srcFolder - FolderItem object whose contents will be merged.
	//   targetFolder - FolderItem object where merged contents will be placed.
	// 
	// Returns:
	// Nothing.
	//
	function rd_MergeProjects_mergeFolderContents(srcFolder, targetFolder)
	{
		var item;
		
		// Loop through srcFolder.items in reverse (so that any removal of folders doesn't mess up the looping)
		for (var i=srcFolder.numItems; i>=1; i--)
		{
			item = srcFolder.item(i);
			
			if (!(item instanceof FolderItem))			// Move non-folder items to srcFolder
				item.parentFolder = targetFolder;
			else											// For folders, check for matching named folder in targetFolder and merge if exists
			{
				// Look for first matching named subfolder in targetFolder
				matchingSubFolder = null;
				for (j=1; j<=targetFolder.numItems; j++)
				{
					targetSubItem = targetFolder.item(j);
					if ((targetSubItem instanceof FolderItem) && (targetSubItem.name === item.name))
					{
						matchingSubFolder = targetSubItem;
						break;
					}
				}
				
				// If found a matching subfolder, merge recursively, else merge up directly
				if (matchingSubFolder !== null)
				{
					// Merge subfolder recursively
					rd_MergeProjects_mergeFolderContents(item, matchingSubFolder);
					
					// Remove folder (which should be empty, but just checking)
					if (item.numItems === 0)
						item.remove();
				}
				else
					item.parentFolder = targetFolder;
			}
		}
	}
	
	
	
	
	// rd_MergeProjects_doMergeFolders()
	// 
	// Description:
	// This function handles the merge operation.
	// 
	// Parameters:
	// None.
	// 
	// Returns:
	// Nothing.
	//
	function rd_MergeProjects_doMergeFolders()
	{
		// Check that a project exists
		if (app.project === null)
			return;
		
		// Perform operation as a single undoable event
		app.beginUndoGroup(rd_MergeProjectsData.scriptName);
		
		// Check that only one top-level folder is selected; if not, ask user for project to import
		var masterFolder = app.project.activeItem;
		
		if (masterFolder === null)
		{
			// Ask user for project file to import
			app.project.importFileWithDialog();
			masterFolder = app.project.activeItem;
			if (masterFolder === null)
				return;
		}
		
		if (!(masterFolder instanceof FolderItem) || (masterFolder.parentFolder !== app.project.rootFolder))
		{
			alert(rd_localize(rd_MergeProjectsData.strErrNoTopFolderSel), rd_MergeProjectsData.scriptName);
			return;
		}
		
		// Do any pre-merge operations
		
		// If removing unused items, check if selected folder is empty;
		// if so, have this script delete the empty folder instead of removeUnusedFootage() to avoid deleting the selected folder
		var removedItems = -1;						// Assume not removing any unused items
		var consolidatedItems = -1;					// Assume not consolidating any items
		
		if (eval(this.parent.parent.removeFootage.value) && (masterFolder.numItems !== 0))
			removedItems = app.project.removeUnusedFootage();
		
		// Check if wanting to consolidate items beforehand
		if (eval(this.parent.parent.consolidateFootage.value))
			consolidatedItems = app.project.consolidateFootage();
		
		// Merge the master folder's contents with that of the project's root folder
		rd_MergeProjects_mergeFolderContents(masterFolder, app.project.rootFolder);
		
		// Build additional status info, if selected to do any pre-merge operations
		var msg = "";
		
		if (consolidatedItems !== -1)				// Identify the number of items consolidated
			msg = msg + " " + rd_localize(rd_MergeProjectsData.strConsolidatedResult).replace("%d", consolidatedItems);
		if (removedItems !== -1)						// Identify the number of unused items removed
			msg = msg + " " + rd_localize(rd_MergeProjectsData.strRemovedResult).replace("%d", removedItems);
		
		// Delete the master folder (which should be empty, but just checking)
		if (masterFolder.numItems === 0)
		{
			var statusMsg = rd_localize(rd_MergeProjectsData.strMergeOK).replace("%s", masterFolder.name);
			
			masterFolder.remove();
			alert(statusMsg + msg, rd_MergeProjectsData.scriptName);
		}
		else
			alert(rd_localize(rd_MergeProjectsData.strMergeFail).replace("%s", masterFolder.name) + msg, rd_MergeProjectsData.scriptName);
		
		// End of undo event
		app.endUndoGroup();
	}
	
	
	
	
	// main code:
	//
	
	// Prerequisite check for After Effects CS4 or later
	if (parseFloat(app.version) < 9.0)
		alert(rd_localize(rd_MergeProjectsData.strMinAE90), rd_MergeProjectsData.scriptName);
	else
	{
		// Build and show the floating palette
		var palette = rd_MergeProjects_buildUI(thisObj);
		if (palette !== null)
		{
			// Update UI values, if saved in the settings
			if (app.settings.haveSetting("redefinery", "rd_MergeProjects_consolidateFootage"))
				palette.grp.consolidateFootage.value = eval(app.settings.getSetting("redefinery", "rd_MergeProjects_consolidateFootage"));
			if (app.settings.haveSetting("redefinery", "rd_MergeProjects_removeFootage"))
				palette.grp.removeFootage.value = eval(app.settings.getSetting("redefinery", "rd_MergeProjects_removeFootage"));
			
			// Save current UI settings upon closing the palette
			palette.onClose = function ()
			{
				app.settings.saveSetting("redefinery", "rd_MergeProjects_consolidateFootage", palette.grp.consolidateFootage.value);
				app.settings.saveSetting("redefinery", "rd_MergeProjects_removeFootage", palette.grp.removeFootage.value);
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
