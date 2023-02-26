/*
 CreateGear.jsx
 version: 1.0
 author: Charles Bordenave (www.motionboutique.com)
 date: 31 Aug 2013
 credit: thanks to Jongware who wrote the original version of this script for AI (see http://forums.adobe.com/thread/738063)
download：https://www.motionboutique.com/gear-script/
*/


function CreateGear() {
	var createGear = this;

	var utils = new CreateGearUtils();

	// infos
	this.scriptName = "CreateGear";
	this.scriptVersion = "1.0";
	this.scriptTitle = "Create Gear";
	this.scriptCopyright = "Copyright (c) 2013 Motion Boutique";
	this.scriptHomepage = "http://www.motionboutique.com";
	this.scriptDescription = { en: "This script creates a gear with a shape layer.", fr: "Ce script crée une roue dentée avec un calque de forme." };
	this.scriptAbout = {
		en: this.scriptName + ", v" + this.scriptVersion + "\\r" + this.scriptCopyright + "\\r" + this.scriptHomepage + "\\r\\r" + utils.loc(this.scriptDescription),
		fr: this.scriptName + ", v" + this.scriptVersion + "\\r" + this.scriptCopyright + "\\r" + this.scriptHomepage + "\\r\\r" + utils.loc(this.scriptDescription)
	};
	this.scriptUsage = {
		en: "\u25BA Activate a composition \\r" +
			"\u25BA Specify gear settings \\r" +
			"\u25BA Click on Create",
		fr: "\u25BA Activez une composition \\r" +
			"\u25BA Spécifiez les paramètres de la roue dentée \\r" +
			"\u25BA Cliquez sur Créer"
	};


	// UI strings and default values
	this.aboutBtnName = "?";
	this.gearSizeStName = { en: "Gear Size:", fr: "Taille de la roue:" };
	this.numberOfTeethStName = { en: "Number of Teeth:", fr: "Nombre de dents:" };
	this.toothDepthStName = { en: "Tooth Depth:", fr: "Profondeur des dents" };
	this.toothTaperStName = { en: "Tooth Taper (%):", fr: "Dent en pointe (%):" };
	this.addHoleCbName = { en: "Add Hole", fr: "Ajouter un trou" };
	this.holeSizeStName = { en: "Size:", fr: "Taille:" };
	this.runBtnName = { en: "Create", fr: "Créer" };

	this.gearSizeDflt = 400;
	this.numberOfTeethDflt = 16;
	this.toothDepthDflt = 40;
	this.toothTaperDflt = 50;
	this.addHoleDflt = true;
	this.holeSizeDflt = 100;

	// internals
	this.gearSize = this.gearSizeDflt;
	this.numberOfTeeth = this.numberOfTeethDflt;
	this.toothDepth = this.toothDepthDflt;
	this.toothTaper = this.toothTaperDflt;
	this.addHoleB = this.addHoleDflt;
	this.holeSize = this.holeSizeDflt;

	// errors
	this.selErr = { en: "Please activate a comp first.", fr: "Veuillez activer une composition." };
	this.resErr = {
		en: "An error occurred while loading a resource file. Make sure the '(" + this.scriptName + "_Resources)' folder is located next to the script file.",
		fr: "Une erreur s'est produite lors de l'import d'un fichier de ressource. Veuillez vous assurer que le dossier '(" + this.scriptName + "_Resources)' est situé à côté du fichier du script."
	};

	// misc
	this.gearLayerName = { en: "Gear", fr: "Roue dentée" };
	this.gearPathName = { en: "Gear Path", fr: "Tracé roue dentée" };
	this.holePathName = { en: "Hole Path", fr: "Tracé trou" };


	this.buildUI = function (thisObj) {
		// dockable panel or palette
		var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", this.scriptTitle, undefined, { resizeable: false });

		// resource specifications
		var res =
			"group { orientation:'column', alignment:['left','top'], alignChildren:['right','top'], \
			gr0: Group { alignment:['fill','fill'], \
				header: Image { } \
			}, \
			gr1: Group { \
				aboutBtn: Button { text:'" + this.aboutBtnName + "', preferredSize:[25,20] } \
			}, \
			gr2: Group { orientation:'row', \
				gearSizeSt: StaticText { text:'" + utils.loc(this.gearSizeStName) + "' }, \
				gearSizeEt: EditText { text:" + this.gearSizeDflt + ", characters:6 } \
			}, \
			gr3: Group { orientation:'row', \
				numberOfTeethSt: StaticText { text:'" + utils.loc(this.numberOfTeethStName) + "' }, \
				numberOfTeethEt: EditText { text:" + this.numberOfTeethDflt + ", characters:6 } \
			}, \
			gr4: Group { orientation:'row', \
				toothDepthSt: StaticText { text:'" + utils.loc(this.toothDepthStName) + "' }, \
				toothDepthEt: EditText { text:" + this.toothDepthDflt + ", characters:6 } \
			}, \
			gr5: Group { orientation:'row', \
				toothTaperSt: StaticText { text:'" + utils.loc(this.toothTaperStName) + "' }, \
				toothTaperEt: EditText { text:" + this.toothTaperDflt + ", characters:6 } \
			}, \
			gr6: Group { orientation:'row', \
				addHoleCb: Checkbox { text:'" + utils.loc(this.addHoleCbName) + "', value:" + this.addHoleDflt + " }, \
				holeSizeSt: StaticText { text:'" + utils.loc(this.holeSizeStName) + "', enabled:" + this.addHoleDflt + " }, \
				holeSizeEt: EditText { text:" + this.holeSizeDflt + ", enabled:" + this.addHoleDflt + ", characters:6 } \
			}, \
			gr7: Group { orientation:'row', alignment:['fill','top'], \
				runBtn: Button { text:'" + utils.loc(this.runBtnName) + "', alignment:['fill','center'] } \
			} \
		}";
		pal.gr = pal.add(res);

		// set header image
		this.headerImgFile = File("(" + this.scriptName + "_Resources)/header.png");
	
		var err = this.resErr;
		try {
			pal.gr.gr0.header.image = this.headerImgFile;
		}
		catch (e) {
			utils.throwErr(err);
		}

		// event callbacks
		pal.gr.gr1.aboutBtn.onClick = function () {
			utils.createAboutDlg(createGear.scriptAbout, createGear.scriptUsage);
		};

		pal.gr.gr2.gearSizeEt.onChange = function () {
			if (isNaN(this.text) || parseFloat(this.text) <= 0) {
				this.text = createGear.gearSize;
			}
			else {
				createGear.gearSize = parseFloat(this.text);
			}
		};

		pal.gr.gr3.numberOfTeethEt.onChange = function () {
			if (isNaN(this.text) || parseInt(this.text) <= 1) {
				this.text = createGear.numberOfTeeth;
			}
			else {
				if (parseInt(this.text) != parseFloat(this.text)) {
					this.text = Math.round(this.text);
				}
				createGear.numberOfTeeth = parseInt(this.text);
			}
		};

		pal.gr.gr4.toothDepthEt.onChange = function () {
			if (isNaN(this.text) || parseFloat(this.text) <= 0) {
				this.text = createGear.toothDepth;
			}
			else {
				createGear.toothDepth = parseFloat(this.text);
			}
		};

		pal.gr.gr5.toothTaperEt.onChange = function () {
			if (isNaN(this.text) || parseFloat(this.text) < 0 || parseFloat(this.text) > 100) {
				this.text = createGear.toothTaper;
			}
			else {
				createGear.toothTaper = parseFloat(this.text);
			}
		};

		pal.gr.gr6.addHoleCb.onClick = function () {
			pal.gr.gr6.holeSizeSt.enabled = this.value;
			pal.gr.gr6.holeSizeEt.enabled = this.value;
			createGear.addHoleB = this.value;
		};

		pal.gr.gr6.holeSizeEt.onChange = function () {
			if (isNaN(this.text) || parseFloat(this.text) <= 0) {
				this.text = createGear.holeSize;
			}
			else {
				createGear.holeSize = parseFloat(this.text);
			}
		};

		pal.gr.gr7.runBtn.onClick = function () {
			createGear.create();
		};

		// show user interface
		if (pal instanceof Window) {
			pal.center();
			pal.show();
		}
		else {
			pal.layout.layout(true);
		}
	};

	this.create = function () {
		var comp = app.project.activeItem;
		if (!(comp instanceof CompItem)) {
			utils.throwErr(this.selErr);
			return;
		}

		// compute gear shape
		var gearShape = new Shape();

		var radius = this.gearSize / 2 - this.toothDepth;
		var toothSize = this.toothDepth;
		var toothDist = 2 * Math.PI / this.numberOfTeeth;
		var taperSize = this.toothTaper / 200;
		var slantSize = 0.5 - taperSize;

		var verts = [];
		for (var i = 0; i < this.numberOfTeeth; i++) {
			verts.push([radius * Math.sin(i * toothDist), radius * Math.cos(i * toothDist)]);
			verts.push([(radius + toothSize / 2) * Math.sin((i + slantSize / 2) * toothDist), (radius + toothSize / 2) * Math.cos((i + slantSize / 2) * toothDist)]);
			verts.push([(radius + toothSize) * Math.sin((i + slantSize) * toothDist), (radius + toothSize) * Math.cos((i + slantSize) * toothDist)]);
			verts.push([(radius + toothSize) * Math.sin((i + taperSize + slantSize) * toothDist), (radius + toothSize) * Math.cos((i + taperSize + slantSize) * toothDist)]);
			verts.push([(radius + toothSize / 2) * Math.sin((i + taperSize + 1.5 * slantSize) * toothDist), (radius + toothSize / 2) * Math.cos((i + taperSize + 1.5 * slantSize) * toothDist)]);
			verts.push([radius * Math.sin((i + taperSize + 2 * slantSize) * toothDist), radius * Math.cos((i + taperSize + 2 * slantSize) * toothDist)]);
		}
		gearShape.vertices = verts;

		app.beginUndoGroup(this.scriptTitle);

		// create shape layer
		var shapeLayer = comp.layers.addShape();
		shapeLayer.name = utils.loc(this.gearLayerName);

		// add gear shape
		var rootVectorsGroup = shapeLayer.property("ADBE Root Vectors Group");
		var gearPath = rootVectorsGroup.addProperty("ADBE Vector Shape - Group");
		gearPath.name = utils.loc(this.gearPathName);
		var gearShapeProp = gearPath.property("ADBE Vector Shape");
		gearShapeProp.setValue(gearShape);

		// add hole
		if (this.addHoleB) {
			var holePath = rootVectorsGroup.addProperty("ADBE Vector Shape - Ellipse");
			holePath.name = utils.loc(this.holePathName);
			var holeSizeProp = holePath.property("ADBE Vector Ellipse Size");
			holeSizeProp.setValue([this.holeSize, this.holeSize]);
		}

		// add stroke
		var stroke = rootVectorsGroup.addProperty("ADBE Vector Graphic - Stroke");
		var strokeColorProp = stroke.property("ADBE Vector Stroke Color");
		strokeColorProp.setValue([1, 1, 1]);
		var strokeWidthProp = stroke.property("ADBE Vector Stroke Width");
		strokeWidthProp.setValue(4);

		// add gradient fill
		var gFill = rootVectorsGroup.addProperty("ADBE Vector Graphic - G-Fill");
		var gFillTypeProp = gFill.property("ADBE Vector Grad Type");
		gFillTypeProp.setValue(2); // radial;
		var gFillEndPtProp = gFill.property("ADBE Vector Grad End Pt");
		gFillEndPtProp.setValue([0.75 * this.gearSize, 0]);

		app.endUndoGroup();
	};

	this.run = function (thisObj) {
		this.buildUI(thisObj);
	};
}


// Utilities
function CreateGearUtils() {
	var utils = this;

	this.loc = function (str) {
		var lang = parseFloat(app.version) < 9 ? $.locale : app.isoLanguage;
		return lang.toLowerCase().match("fr") ? str.fr : str.en;
	};

	this.throwErr = function (err) {
		var title = $.fileName.substring($.fileName.lastIndexOf("/") + 1, $.fileName.lastIndexOf("."));
		alert(this.loc(err), title, true);
	};

	this.createAboutDlg = function (aboutStr, usageStr) {
		eval(unescape('%09%09%76%61%72%20%64%6C%67%20%3D%20%6E%65%77%20%57%69%6E%64%6F%77%28%22%64%69%61%6C%6F%67%22%2C%20%22%41%62%6F%75%74%22%29%3B%0A%09%20%20%20%20%20%20%09%20%20%20%20%20%20%20%09%0A%09%20%20%20%20%76%61%72%20%72%65%73%20%3D%0A%09%09%22%67%72%6F%75%70%20%7B%20%6F%72%69%65%6E%74%61%74%69%6F%6E%3A%27%63%6F%6C%75%6D%6E%27%2C%20%61%6C%69%67%6E%6D%65%6E%74%3A%5B%27%66%69%6C%6C%27%2C%27%66%69%6C%6C%27%5D%2C%20%61%6C%69%67%6E%43%68%69%6C%64%72%65%6E%3A%5B%27%66%69%6C%6C%27%2C%27%66%69%6C%6C%27%5D%2C%20%5C%0A%09%09%09%70%6E%6C%3A%20%50%61%6E%65%6C%20%7B%20%74%79%70%65%3A%27%74%61%62%62%65%64%70%61%6E%65%6C%27%2C%20%5C%0A%09%09%09%09%61%62%6F%75%74%54%61%62%3A%20%50%61%6E%65%6C%20%7B%20%74%79%70%65%3A%27%74%61%62%27%2C%20%74%65%78%74%3A%27%44%65%73%63%72%69%70%74%69%6F%6E%27%2C%20%5C%0A%09%09%09%09%09%61%62%6F%75%74%45%74%3A%20%45%64%69%74%54%65%78%74%20%7B%20%74%65%78%74%3A%27%22%20%2B%20%74%68%69%73%2E%6C%6F%63%28%61%62%6F%75%74%53%74%72%29%20%2B%20%22%27%2C%20%70%72%65%66%65%72%72%65%64%53%69%7A%65%3A%5B%33%36%30%2C%32%30%30%5D%2C%20%70%72%6F%70%65%72%74%69%65%73%3A%7B%6D%75%6C%74%69%6C%69%6E%65%3A%74%72%75%65%7D%20%7D%20%5C%0A%09%09%09%09%7D%2C%20%5C%0A%09%09%09%09%75%73%61%67%65%54%61%62%3A%20%50%61%6E%65%6C%20%7B%20%74%79%70%65%3A%27%74%61%62%27%2C%20%74%65%78%74%3A%27%55%73%61%67%65%27%2C%20%5C%0A%09%09%09%09%09%75%73%61%67%65%45%74%3A%20%45%64%69%74%54%65%78%74%20%7B%20%74%65%78%74%3A%27%22%20%2B%20%74%68%69%73%2E%6C%6F%63%28%75%73%61%67%65%53%74%72%29%20%2B%20%22%27%2C%20%70%72%65%66%65%72%72%65%64%53%69%7A%65%3A%5B%33%36%30%2C%32%30%30%5D%2C%20%70%72%6F%70%65%72%74%69%65%73%3A%7B%6D%75%6C%74%69%6C%69%6E%65%3A%74%72%75%65%7D%20%7D%20%5C%0A%09%09%09%09%7D%20%5C%0A%09%09%09%7D%2C%20%5C%0A%09%09%09%62%74%6E%73%3A%20%47%72%6F%75%70%20%7B%20%6F%72%69%65%6E%74%61%74%69%6F%6E%3A%27%72%6F%77%27%2C%20%61%6C%69%67%6E%6D%65%6E%74%3A%5B%27%66%69%6C%6C%27%2C%27%62%6F%74%74%6F%6D%27%5D%2C%20%5C%0A%09%09%09%09%6F%74%68%65%72%53%63%72%69%70%74%73%42%74%6E%3A%20%42%75%74%74%6F%6E%20%7B%20%74%65%78%74%3A%27%4F%74%68%65%72%20%53%63%72%69%70%74%73%2E%2E%2E%27%2C%20%61%6C%69%67%6E%6D%65%6E%74%3A%5B%27%6C%65%66%74%27%2C%27%63%65%6E%74%65%72%27%5D%20%7D%2C%20%5C%0A%09%09%09%09%6F%6B%42%74%6E%3A%20%42%75%74%74%6F%6E%20%7B%20%74%65%78%74%3A%27%4F%6B%27%2C%20%61%6C%69%67%6E%6D%65%6E%74%3A%5B%27%72%69%67%68%74%27%2C%27%63%65%6E%74%65%72%27%5D%20%7D%20%5C%0A%09%09%09%7D%20%5C%0A%09%09%7D%22%3B%20%0A%09%09%64%6C%67%2E%67%72%20%3D%20%64%6C%67%2E%61%64%64%28%72%65%73%29%3B%0A%09%09%0A%09%09%64%6C%67%2E%67%72%2E%70%6E%6C%2E%61%62%6F%75%74%54%61%62%2E%61%62%6F%75%74%45%74%2E%6F%6E%43%68%61%6E%67%65%20%3D%20%64%6C%67%2E%67%72%2E%70%6E%6C%2E%61%62%6F%75%74%54%61%62%2E%61%62%6F%75%74%45%74%2E%6F%6E%43%68%61%6E%67%69%6E%67%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%0A%09%09%7B%0A%09%09%09%74%68%69%73%2E%74%65%78%74%20%3D%20%75%74%69%6C%73%2E%6C%6F%63%28%61%62%6F%75%74%53%74%72%29%2E%72%65%70%6C%61%63%65%28%2F%5C%5C%72%2F%67%2C%20%27%5C%72%27%29%3B%0A%09%09%7D%3B%0A%09%09%0A%09%09%64%6C%67%2E%67%72%2E%70%6E%6C%2E%75%73%61%67%65%54%61%62%2E%75%73%61%67%65%45%74%2E%6F%6E%43%68%61%6E%67%65%20%3D%20%64%6C%67%2E%67%72%2E%70%6E%6C%2E%75%73%61%67%65%54%61%62%2E%75%73%61%67%65%45%74%2E%6F%6E%43%68%61%6E%67%69%6E%67%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%0A%09%09%7B%0A%09%09%09%74%68%69%73%2E%74%65%78%74%20%3D%20%75%74%69%6C%73%2E%6C%6F%63%28%75%73%61%67%65%53%74%72%29%2E%72%65%70%6C%61%63%65%28%2F%5C%5C%72%2F%67%2C%20%27%5C%72%27%29%2E%72%65%70%6C%61%63%65%28%2F%5C%5C%27%2F%67%2C%20%22%27%22%29%3B%0A%09%09%7D%3B%0A%09%09%09%0A%09%09%64%6C%67%2E%67%72%2E%62%74%6E%73%2E%6F%74%68%65%72%53%63%72%69%70%74%73%42%74%6E%2E%6F%6E%43%6C%69%63%6B%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%0A%09%09%7B%0A%09%09%09%76%61%72%20%63%6D%64%20%3D%20%22%22%3B%0A%09%09%09%76%61%72%20%75%72%6C%20%3D%20%22%68%74%74%70%3A%2F%2F%77%77%77%2E%6D%6F%74%69%6F%6E%62%6F%75%74%69%71%75%65%2E%63%6F%6D%22%3B%0A%09%0A%09%09%09%69%66%20%28%24%2E%6F%73%2E%69%6E%64%65%78%4F%66%28%22%57%69%6E%22%29%20%21%3D%20%2D%31%29%0A%09%09%09%7B%0A%09%20%20%20%20%20%20%20%20%09%69%66%20%28%46%69%6C%65%28%22%43%3A%2F%50%72%6F%67%72%61%6D%20%46%69%6C%65%73%2F%4D%6F%7A%69%6C%6C%61%20%46%69%72%65%66%6F%78%2F%66%69%72%65%66%6F%78%2E%65%78%65%22%29%2E%65%78%69%73%74%73%29%0A%09%09%09%09%09%63%6D%64%20%2B%3D%20%22%43%3A%2F%50%72%6F%67%72%61%6D%20%46%69%6C%65%73%2F%4D%6F%7A%69%6C%6C%61%20%46%69%72%65%66%6F%78%2F%66%69%72%65%66%6F%78%2E%65%78%65%20%22%20%2B%20%75%72%6C%3B%0A%09%09%09%09%65%6C%73%65%20%69%66%20%28%46%69%6C%65%28%22%43%3A%2F%50%72%6F%67%72%61%6D%20%46%69%6C%65%73%20%28%78%38%36%29%2F%4D%6F%7A%69%6C%6C%61%20%46%69%72%65%66%6F%78%2F%66%69%72%65%66%6F%78%2E%65%78%65%22%29%2E%65%78%69%73%74%73%29%0A%09%09%09%09%09%63%6D%64%20%2B%3D%20%22%43%3A%2F%50%72%6F%67%72%61%6D%20%46%69%6C%65%73%20%28%78%38%36%29%2F%4D%6F%7A%69%6C%6C%61%20%46%69%72%65%66%6F%78%2F%66%69%72%65%66%6F%78%2E%65%78%65%20%22%20%2B%20%75%72%6C%3B%0A%09%09%09%09%65%6C%73%65%0A%09%09%09%09%09%63%6D%64%20%2B%3D%20%22%43%3A%2F%50%72%6F%67%72%61%6D%20%46%69%6C%65%73%2F%49%6E%74%65%72%6E%65%74%20%45%78%70%6C%6F%72%65%72%2F%69%65%78%70%6C%6F%72%65%2E%65%78%65%20%22%20%2B%20%75%72%6C%3B%0A%09%09%09%7D%0A%09%09%09%65%6C%73%65%0A%09%09%09%09%63%6D%64%20%2B%3D%20%22%6F%70%65%6E%20%5C%22%22%20%2B%20%75%72%6C%20%2B%20%22%5C%22%22%3B%20%20%20%20%20%20%20%20%20%0A%09%09%09%74%72%79%0A%09%09%09%7B%0A%09%09%09%09%73%79%73%74%65%6D%2E%63%61%6C%6C%53%79%73%74%65%6D%28%63%6D%64%29%3B%0A%09%09%09%7D%0A%09%09%09%63%61%74%63%68%28%65%29%0A%09%09%09%7B%0A%09%09%09%09%61%6C%65%72%74%28%65%29%3B%0A%09%09%09%7D%0A%09%09%7D%3B%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%09%09%64%6C%67%2E%67%72%2E%62%74%6E%73%2E%6F%6B%42%74%6E%2E%6F%6E%43%6C%69%63%6B%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%0A%09%09%7B%0A%09%09%09%64%6C%67%2E%63%6C%6F%73%65%28%29%3B%20%0A%09%09%7D%3B%0A%09%20%20%20%20%20%20%20%0A%09%09%64%6C%67%2E%63%65%6E%74%65%72%28%29%3B%0A%09%09%64%6C%67%2E%73%68%6F%77%28%29%3B'));
	};
}


// Creates an instance of the main class and run it
new CreateGear().run(this);
