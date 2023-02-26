// 获取属性的表达式的数字层级
function mGetDotSyntaxForExp(aProp) {
    var mProp = aProp;
    var mAdrs = [];
    // 按照从上到下的顺序处理父属性。
    for (var i = mProp.propertyDepth; i >= 1; i--) {
        var mPropTmp = mProp.propertyGroup(i);
        if (i === mProp.propertyDepth) {
            mAdrs.push(mPropTmp.index);
        } else {
            mAdrs.push(mPropTmp.propertyIndex);
        }
    }
    //自身处理。
    mAdrs.push(mProp.propertyIndex);
    //生成字符串
    var mAdrsStr = mAdrs.join(')(');
    mRstAdrsStr = 'thisComp.layer(' + mAdrsStr + ');'
    //是否外部引用合成
    /*
    var mSl = mProp.propertyGroup(mProp.propertyDepth);
    var mAi = mSl.containingComp;
    var mAiName = mAi.name;
    mRstAdrsStr = 'comp("' + mAiName + '").layer(' + mAdrsStr + ');'
    */
    return mRstAdrsStr;
}
// 获取属性的表达式的名称层级
function mGetDotSyntaxForExpName(aProp) {
    var mProp = aProp;
    var mAdrs = [];
    // 按照从上到下的顺序处理父属性。
    for (var i = mProp.propertyDepth; i >= 1; i--) {
        var mPropTmp = mProp.propertyGroup(i);
        mAdrs.push('"' + mPropTmp.matchName + '"');
    }
    //自身处理。
    mAdrs.push('"' + mProp.matchName + '"');
    //生成字符串
    var mAdrsStr = mAdrs.join(')(');
    mRstAdrsStr = 'thisComp.layer(' + mAdrsStr + ');'
    //是否外部引用合成
   
    var mSl = mProp.propertyGroup(mProp.propertyDepth);
    var mAi = mSl.containingComp;
    var mAiName = mAi.name;
    mRstAdrsStr = 'comp("' + mAiName + '").layer(' + mAdrsStr + ');'
   
    return mRstAdrsStr;
}

var selLayer = app.project.activeItem.selectedLayers[0]
var selProp = mGetDotSyntaxForExp(selLayer.selectedProperties[0]) //thisComp.layer(2)(5)(6); 
var selProp = mGetDotSyntaxForExpName(selLayer.selectedProperties[0]) // thisComp.layer("111")("变换")("缩放"); 
cmd = 'cmd.exe /c cmd.exe /c "echo ' + selProp + ' | clip"';
system.callSystem(cmd);
