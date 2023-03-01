// 原名：00_resizeCompositionFromSelectLayers
// 选择一个图层，将合成改为相同大小。
//不支持3D层。
(function (){
	//制作空对象的原型
	LayerCollection.prototype.addNull = function(){
		var color = [1,1,1];
		var  name = "Null 1";
		var n = this.addSolid(color,name,100,100,1,1);
		var comp = n.containingComp;
		n.outPoint = comp.duration;
		n.nullLayer = true;
		n.source.width = comp.width;
		n.source.height = comp.height;
		n.source.pixelAspect = comp.pixelAspect;
		return n;
		}

	//扩展数组对象
	Array.prototype.min = function(){
		return Math.min.apply(null,this)
	}
	Array.prototype.max = function(){
		return Math.max.apply(null,this)
	}

	function length(point1 ,point2) {
		var n = Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)); 
		return n;
	}

	//计算图层的左上角和右下角的函数

	//获得编译器中明显的左上角和右下角的点，即使图层是倒置的。
	//返回一个数组[x1,y1,x2,y2]。
	//变换属性使用的matchName，防止跨语言报错
	//也把未使用的属性作为如何取舍转化属性的参考。
	//计算该层的长宽比，以及该层所在的组件的长宽比。
	function get4RectanglePoint(target){
		if(target instanceof AVLayer){
			var layer_pixelAspect = target.source.pixelAspect;
			var comp_pixelAspect = target.containingComp.pixelAspect;
			
			var anchorX = target.property("ADBE Transform Group").property("ADBE Anchor Point").value[0];
			var anchorY = target.property("ADBE Transform Group").property("ADBE Anchor Point").value[1];
			var anchorZ = target.property("ADBE Transform Group").property("ADBE Anchor Point").value[2];

			var posX = target.property("ADBE Transform Group").property("ADBE Position").value[0];
			var posY = target.property("ADBE Transform Group").property("ADBE Position").value[1];
			var posZ = target.property("ADBE Transform Group").property("ADBE Position").value[2];

			var scaleX = target.property("ADBE Transform Group").property("ADBE Scale").value[0];
			var scaleY = target.property("ADBE Transform Group").property("ADBE Scale").value[1];
			var scaleZ = target.property("ADBE Transform Group").property("ADBE Scale").value[2];

			var rotX = target.property("ADBE Transform Group").property("ADBE Rotate X").value;
			var rotY = target.property("ADBE Transform Group").property("ADBE Rotate Y").value;
			var rotZ = target.property("ADBE Transform Group").property("ADBE Rotate Z").value;
			
			var r = (rotZ+180)*Math.PI/180*-1;
			scaleX = scaleX * layer_pixelAspect;
			
			var p = [];
			var x = [];
			var y = [];
			var n = [];
			
			p[0] = [anchorX/100*scaleX, anchorY/100*scaleY];
			p[1] = [anchorX/100*scaleX - target.width/100*scaleX, anchorY/100*scaleY];
			p[2] = [anchorX/100*scaleX - target.width/100*scaleX, anchorY/100*scaleY - target.height/100*scaleY];
			p[3] = [anchorX/100*scaleX, anchorY/100*scaleY - target.height/100*scaleY];
			
			for(var i=0;i<p.length;i++){
				var dist = length(p[i], [0,0]);
				var rr = Math.atan2(p[i][0], p[i][1])+r;
				n[n.length] = [Math.sin(rr)*dist/comp_pixelAspect+posX, Math.cos(rr)*dist+posY];
				}
			return n;
			}
		}

	function get2RectanglePoint(layer){
		var m = get4RectanglePoint(layer);
		var x = [],y=[];
		var min = [],max = [];
		var n = [];
		for(var i=0;i<m.length;i++){
			x[x.length] = m[i][0];
			y[y.length] = m[i][1];
			}
		for(var i=0;i<x.length;i++){
			if(min!=""){
				min[0] = (min[0]>x[i]) ? x[i] : min[0];
				min[1] = (min[1]>y[i]) ? y[i] : min[1];
				max[0] = (max[0]<x[i]) ? x[i] : max[0];
				max[1] = (max[1]<y[i]) ? y[i] : max[1];
				}else{
					min[0]= x[i];
					min[1]= y[i];
					max[0]= x[i];
					max[1]= y[i];
					}
			}
		n = [min[0], min[1], max[0], max[1]];
		return n;
		}
	
	// 主函数
	var comp = app.project.activeItem;
	var newRectanglePoints = [];
	var parentList = [];
	var lockList = [];
    
	app.beginUndoGroup("create layer")
	if(comp){
		var lay = comp.selectedLayers;
		if(lay != ""){
		
		// 保存并删除父子关系和锁定状态
		for(var i=1;i<=comp.numLayers;i++){
			parentList[parentList.length] = comp.layer(i).parent;
			lockList[lockList.length] = comp.layer(i).locked;
			comp.layer(i).locked = false;
			comp.layer(i).parent = null;
			}

		// 找到所选层的总矩形
		for(var i=0;i<lay.length;i++){
			var n = get2RectanglePoint(lay[i]);
			if(n){
				if(newRectanglePoints != ""){
					newRectanglePoints[0] = (newRectanglePoints[0]>n[0]) ? n[0] : newRectanglePoints[0];
					newRectanglePoints[1] = (newRectanglePoints[1]>n[1]) ? n[1] : newRectanglePoints[1];
					newRectanglePoints[2] = (newRectanglePoints[2]<n[2]) ? n[2] : newRectanglePoints[2];
					newRectanglePoints[3] = (newRectanglePoints[3]<n[3]) ? n[3] : newRectanglePoints[3];
				}else{
					newRectanglePoints[0] = n[0];
					newRectanglePoints[1] = n[1];
					newRectanglePoints[2] = n[2];
					newRectanglePoints[3] = n[3];
					}
				}
			}

		// 添加一个空对象，并将其置于总矩形的左上方
		var nu = comp.layers.addNull();
		nu.property("ADBE Transform Group").property("ADBE Position").setValue([newRectanglePoints[0], newRectanglePoints[1]]);

		// 设置新编译器的大小。
		comp.width = Math.floor(Math.abs(newRectanglePoints[2] - newRectanglePoints[0]));
		comp.height = Math.floor(Math.abs(newRectanglePoints[3] - newRectanglePoints[1]));

		//把所有的东西都附加到null上，把null移到新编译器的左上角（0,0），移动后删除null。
		for(var i=2;i<=comp.numLayers;i++){
			comp.layer(i).parent = nu;
			}
		nu.property("ADBE Transform Group").property("ADBE Position").setValue([0,0]);
		nu.source.remove();

		//恢复父子关系和锁定状态
		for(var i=1;i<=comp.numLayers;i++){
			comp.layer(i).parent = parentList[i-1] ;
			comp.layer(i).locked = lockList[i-1] ;
			}
		
		}
		app.endUndoGroup()
	}
})();

