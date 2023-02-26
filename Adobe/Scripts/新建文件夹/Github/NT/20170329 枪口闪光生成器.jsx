/**
 * 名称：
 * 功能：
 * 油管：
 * 日期：
 * 源码（中文）：https://www.yuelili.com/
 * 源码（英文）：https://pastebin.com/Mc3TbMBM
 */
app.beginUndoGroup("Create Muzzle Flash");

var randomShape = new Shape();

var flashShape = new Shape();
flashShape.vertices = [[.3136, .3618], [.2914, .3763], [.2766, .4076], [.2746, .441], [.2645, .4972], [.2697, .531], [.2725, .5635], [.2857, .5624], [.299, .5906], [.3145, .6074], [.3316, .6125], [.3512, .6021], [.3588, .5781], [.3738, .5733], [.3834, .5681], [.4, .5622], [.4125, .5622], [.4186, .5686], [.427, .5549], [.4357, .5476], [.4496, .5563], [.4615, .5646], [.4731, .5622], [.4885, .5452], [.5072, .5288], [.525, .5358], [.5428, .532], [.5537, .5177], [.5705, .5227], [.5717, .5125], [.5783, .5035], [.5875, .4646], [.5729, .4385], [.542, .4309], [.5355, .449], [.515, .4497], [.4984, .4389], [.485, .4358], [.4645, .4226], [.4516, .4052], [.4424, .409], [.4348, .4035], [.4168, .4021], [.3949, .4146], [.3828, .405], [.3637, .4062], [.3543, .3979], [.3375, .391], [.3281, .3792]];
flashShape.inTangents = [[10, -.5], [4.5, -4.5], [3, -5.5], [2, -6.999], [0, -8], [-.25, -2.5], [-5.25, -3], [-3, -1.5], [-2, -1.25], [-3, -.5], [-11.5, -.4999], [-4, 4.999], [-3.75, 1.5], [-6.75, .25], [-2.75, .4999], [-5, .25], [-3, -1.749], [-2.5, .75], [-2, 1.5], [-4, -.25], [-2.5, 0], [-2.75, -.7499], [-3.5, 1.75], [-2.75, 2.999], [-9, .4999], [-5.5, -.7498], [-2, 1.75], [-3.25, .5], [-2.25, 1.499], [.25, .7502], [-3, 2.5], [.5, 6.75], [3.5, 1.999], [2.25, .25], [3, -2], [3.5, .7498], [5, 1], [3.5, .75], [3.5, 2.5], [2.75, 1.25], [2.5, -.25], [4, 2], [3.5, 0], [7.5, 0], [4, 0], [8.5, 0], [4.5, 1.5], [4, 1], [1.5, 5]];
flashShape.outTangents = [[-10, .5], [-4.5, 4.5], [-3, 5.5], [-2, 6.999], [0, 8], [.25, 2.5], [5.25, 3], [3, 1.5], [2, 1.25], [3, .5], [11.5, .4999], [4, -4.999], [3.75, -1.5], [6.75, -.25], [2.75, -.4999], [5, -.25], [3, 1.749], [2.5, -.75], [2, -1.5], [4, .25], [2.5, 0], [2.75, .7499], [3.5, -1.75], [2.75, -2.999], [9, -.4999], [5.5, .7498], [2, -1.75], [3.25, -.5], [2.25, -1.499], [-.25, -.7502], [3, -2.5], [-.5, -6.75], [-3.5, -1.999], [-2.25, -.25], [-3, 2], [-3.5, -.7498], [-5, -1], [-3.5, -.75], [-3.5, -2.5], [-2.75, -1.25], [-2.5, .25], [-4, -2], [-3.5, 0], [-7.5, 0], [-4, 0], [-8.5, 0], [-4.5, -1.5], [-4, -1], [-1.5, -5]];

var tempVertices = new Array();
var tempInTangents = new Array();
var tempOutTangents = new Array();
for (var i = 0; i < flashShape.vertices.length; i++) {
    tempVertices.push([1920 * flashShape.vertices[i][0] * (Math.random() * (1.05 - .99) + .99), 1080 * flashShape.vertices[i][1] * (Math.random() * (1.05 - .99) + .99)]);
    tempInTangents.push([flashShape.inTangents[i][0], flashShape.inTangents[i][1]]);
    tempOutTangents.push([flashShape.outTangents[i][0], flashShape.outTangents[i][1]]);
}

randomShape.vertices = tempVertices;
randomShape.inTangents = tempInTangents;
randomShape.outTangents = tempOutTangents;

var project = app.project;
var comp = project.items.addComp("Muzzle flash comp", 1920, 1080, 1, 1, 30);
var flashBottom = comp.layers.addSolid([.455, .455, .455], "Muzzle Flash Bottom", 1920, 1080, 1, 1);
flashBottom.outPoint = .03;
var flashMiddle = comp.layers.addSolid([.659, .659, .659], "Muzzle Flash Middle", 1920, 1080, 1, 1);
flashMiddle.outPoint = .03;
var flashTop = comp.layers.addSolid([1, 1, 1], "Muzzle Flash Top", 1920, 1080, 1, 1);
flashTop.outPoint = .03;

var bottomMask = flashBottom.Masks.addProperty("Mask");
bottomMask.property("maskShape").setValue(randomShape);
var middleMask = flashMiddle.Masks.addProperty("Mask");
middleMask.property("maskShape").setValue(randomShape);
middleMask.property("ADBE Mask Offset").setValue(-20);
var topMask = flashTop.Masks.addProperty("Mask");
topMask.property("maskShape").setValue(randomShape);
topMask.property("ADBE Mask Offset").setValue(-32);

var adjustmentLayer = comp.layers.addSolid([1, 1, 1], "Adjustments", 1920, 1080, 1, 1);
adjustmentLayer.adjustmentLayer = true;
adjustmentLayer.outPoint = .03;

var tritone = adjustmentLayer.Effects.addProperty("ADBE Tritone");
var tritoneHighlights = adjustmentLayer("Effects")("Tritone")("Highlights");
var tritoneMidtones = adjustmentLayer("Effects")("Tritone")("Midtones");
var tritoneShadows = adjustmentLayer("Effects")("Tritone")("Shadows");
tritoneHighlights.setValue([.9882, .9804, .8741]);
tritoneMidtones.setValue([.7372, .4745, .1686]);
tritoneShadows.setValue([.1843, .0706, 0]);
var glow = adjustmentLayer.Effects.addProperty("ADBE Glo2");
var glowRadius = adjustmentLayer("Effects")("Glow")("Glow Radius");
var glowIntensity = adjustmentLayer("Effects")("Glow")("Glow Intensity");
glowRadius.setValue((Math.random() * (25 - 15) + 15));
glowIntensity.setValue((Math.random() * (.8 - .5) + .5));
var radial = adjustmentLayer.Effects.addProperty("ADBE Radial Blur");
var radialAmount = adjustmentLayer("Effects")("Radial Blur")("Amount");
var radialCenter = adjustmentLayer("Effects")("Radial Blur")("Center");
var radialType = adjustmentLayer("Effects")("Radial Blur")("Type");
radialAmount.setValue((Math.random() * (60 - 40) + 40));
radialCenter.setValue([655, 545]);
radialType.setValue(2);

comp.openInViewer();

app.endUndoGroup();