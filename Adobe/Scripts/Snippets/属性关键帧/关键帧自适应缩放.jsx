var panelGlobal = this;
var main = (function () {

  /*
  Code for Import https://scriptui.joonas.me — (Triple click to select): 
  {"activeId":4,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"main","windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"关键帧缩放","preferredSize":[0,0],"margins":16,"orientation":"row","spacing":10,"alignChildren":["center","top"]}},"item-4":{"id":4,"type":"Image","parentId":0,"style":{"enabled":true,"varName":"right","image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAANtJREFUSIljYCARTF66+T8p6plItUBVU5ck9SRbQCqguQUs5GqcvnJH2N8/vyf/Z2AQo4kFnFxcE0TEpcRYWPAbQXYQiYhJShIynCILWFhZiVJH+1Q0Zfm2s9NW7fKjmQXSsvJG7GysG2llERMnFzeDtJwiA60sgscBrSzCiGRqW4QzFcEskpCU/kV2bmTAk5P/MzAcZWRgbAhx0N9DgfmYFsAM9jSSp8hgDAuobTDcAkYGhoN/Gf7XexkpHqSmwXAL3I0UHGhhMAwM/RqNEgue0NSC/4wM6cRYAgA84kEu25qjpQAAAABJRU5ErkJggg=="],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Image","parentId":0,"style":{"enabled":true,"varName":"left","image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA70lEQVRIiWMgBUxeuvk/SRoYGBiYSFGsqqlLqvmkWUAOoLkFLITClZGB4RUzC2tuZrjHKrIsIBSuf/78EXvz8tkEBgYGsiwgGEQsLCwMImKSkuQYTpQFYEtYWck1nw6RTCuDp63a5ffv7596qlsAM5idjdVISESaej5AN5iTixssTrEFuAyGAbItIGQwxRaANApJSv/i4ePHq47sZJoW5rYpxEHfkoGB0fU/A8NRqlsAAx5G8ns8jRRscFlEtYyGyyKq52SYRf8Y/jswMjAcpFlO9jJSPMjAwOAw9Gs0Yi14QksLnvxnZEgny3QGBgYAjclJRQu5OksAAAAASUVORK5CYII="],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-7":{"id":7,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-8":{"id":8,"type":"Image","parentId":0,"style":{"enabled":true,"varName":"mid","image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAABoklEQVRIiWMYBcMdMIL8N3np5v/4/MnIwPCKmYU1NzPcY9WOcw/+uxvKM5ITLjvPP/x///YNkN6wv39+T/7PwCCGT31utC8jC4ihqqmL1+A/f/6IvXn5bAIDA8MqSiOMk4sLRE0QEZcSY2FhIaiesAqQIhYWBhExSUlKHQcCImJgYySJcRwDsQ4EK2RlpcBZ5JvDRBVbaQgGvQOJjmJ0wMiIPSNPW7Wr5d/fPzVMzCwM//7+YUCmlVTU6OdALA7z+/f3Tz07G6vR9+9/PBkYGBoZGBg2UWouxQ5EdpiQiDQDJxc3w/dvX43evXm18fv3P+codSjZDsTmMBgAsaXlFLE5lH4OBGkUkpT+xcPHj1MNzKFfPn389e7VS7LsITsXp4W5bQpx0LdkYGB0/c/AcBSbGog4oysDA4MludFMcTHjYSS/x9NIwQbZoUgOs2FgYNhDiflUy8Ugh4Ics+PcwzIGhv9d1DKXbAf+/4+zAYTFcXJgcuf5hyTbM1rVUQqGlQOfUNFeos0i1oFP/jMypJPvHgT4zwjGILOo6eEBAgwMDAAVvIU4KZv6awAAAABJRU5ErkJggg=="],"alignment":null,"helpTip":null}}},"order":[0,5,6,8,7,4],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":true,"itemReferenceList":"None"}}
  */ 

  // MAIN
  // ====
  var main = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette"); 
      if ( !(panelGlobal instanceof Panel) ) main.text = "关键帧缩放"; 
      main.orientation = "row"; 
      main.alignChildren = ["center","top"]; 
      main.spacing = 10; 
      main.margins = 16; 

  var left_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%C3%A0w%3D%C3%B8%00%00%00%C3%AFIDATH%C2%89c%20%05L%5E%C2%BA%C3%B9%3FI%1A%18%18%18%C2%98HQ%C2%AC%C2%AA%C2%A9K%C2%AA%C3%B9%C2%A4Y%40%0E%C2%A0%C2%B9%05%2C%C2%84%C3%82%C2%95%C2%91%C2%81%C3%A1%153%0Bknf%C2%B8%C3%87*%C2%B2%2C%20%14%C2%AE%7F%C3%BE%C3%BC%11%7B%C3%B3%C3%B2%C3%99%04%06%06%06%C2%B2%2C%20%18D%2C%2C%2C%0C%22b%C2%92%C2%92%C3%A4%18N%C2%94%05%60KXY%C3%895%C2%9F%0E%C2%91L%2B%C2%83%C2%A7%C2%AD%C3%9A%C3%A5%C3%B7%C3%AF%C3%AF%C2%9Fz%C2%AA%5B%003%C2%98%C2%9D%C2%8D%C3%95HHD%C2%9Az%3E%407%C2%98%C2%93%C2%8B%1B%2CN%C2%B1%05%C2%B8%0C%C2%86%01%C2%B2-%20d0%C3%85%16%C2%804%0AIJ%C3%BF%C3%A2%C3%A1%C3%A3%C3%87%C2%AB%C2%8E%C3%ACd%C2%9A%16%C3%A6%C2%B6)%C3%84A%C3%9F%C2%92%C2%81%C2%81%C3%91%C3%B5%3F%03%C3%83Q%C2%AA%5B%00%03%1EF%C3%B2%7B%3C%C2%8D%14lpYD%C2%B5%C2%8C%C2%86%C3%8B%22%C2%AA%C3%A7d%C2%98E%C3%BF%18%C3%BE%3B020%1C%C2%A4YN%C3%B62R%3C%C3%88%C3%80%C3%80%C3%A00%C3%B4k4b-xBK%0B%C2%9E%C3%BCgdH'%C3%8Bt%06%06%06%00%C2%8D%C3%89IE%0B%C2%B9%3AK%00%00%00%00IEND%C2%AEB%60%C2%82"; 
  var left = main.add("image", undefined, File.decode(left_imgString), {name: "left"}); 
  left.addEventListener("click",aa,false)

  var divider1 = main.add("panel", undefined, undefined, {name: "divider1"}); 
      divider1.alignment = "fill"; 

  var mid_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00(%00%00%00%18%08%06%00%00%00%C2%88%C2%84%C2%BF%C3%80%00%00%01%C2%A2IDATH%C2%89c%18%05%C3%83%1D0%C2%82%C3%BC7y%C3%A9%C3%A6%C3%BF%C3%B8%C3%BC%C3%89%C3%88%C3%80%C3%B0%C2%8A%C2%99%C2%85573%C3%9Cc%C3%95%C2%8Es%0F%C3%BE%C2%BB%1B%C3%8A3%C2%92%13.%3B%C3%8F%3F%C3%BC%7F%C3%BF%C3%B6%0D%C2%90%C3%9E%C2%B0%C2%BF%7F~O%C3%BE%C3%8F%C3%80%20%C2%86O%7Dn%C2%B4%2F%23%0B%C2%88%C2%A1%C2%AA%C2%A9%C2%8B%C3%97%C3%A0%3F%7F%C3%BE%C2%88%C2%BDy%C3%B9l%02%03%03%C3%83*J%23%C2%8C%C2%93%C2%8B%0BDM%10%11%C2%97%12caa!%C2%A8%C2%9E%C2%B0%0A%C2%90%22%16%16%06%111IIJ%1D%07%02%22b%60c%24%C2%89q%1C%03%C2%B1%0E%04%2Bde%C2%A5%C3%80Y%C3%A4%C2%9B%C3%83D%15%5Bi%08%06%C2%BD%03%C2%89%C2%8Ebt%C3%80%C3%88%C2%88%3D%23O%5B%C2%B5%C2%AB%C3%A5%C3%9F%C3%9F%3F5L%C3%8C%2C%0C%C3%BF%C3%BE%C3%BEa%40%C2%A6%C2%95T%C3%94%C3%A8%C3%A7%40%2C%0E%C3%B3%C3%BB%C3%B7%C3%B7O%3D%3B%1B%C2%AB%C3%91%C3%B7%C3%AF%7F%3C%19%18%18%1A%19%18%186Qj.%C3%85%0EDv%C2%98%C2%90%C2%884%03'%177%C3%83%C3%B7o_%C2%8D%C3%9E%C2%BDy%C2%B5%C3%B1%C3%BB%C3%B7%3F%C3%A7(u(%C3%99%0E%C3%84%C3%A60%18%00%C2%B1%C2%A5%C3%A5%14%C2%B19%C2%94~%0E%04i%14%C2%92%C2%94%C3%BE%C3%85%C3%83%C3%87%C2%8FS%0D%C3%8C%C2%A1_%3E%7D%C3%BC%C3%B5%C3%AE%C3%95K%C2%B2%C3%AC!%3B%17%C2%A7%C2%85%C2%B9m%0Aq%C3%90%C2%B7d%60%60t%C3%BD%C3%8F%C3%80p%14%C2%9B%1A%C2%888%C2%A3%2B%03%03%C2%83%25%C2%B9%C3%91Lq1%C3%A3a%24%C2%BF%C3%87%C3%93H%C3%81%06%C3%99%C2%A1H%0E%C2%B3a%60%60%C3%98C%C2%89%C3%B9T%C3%8B%C3%85%20%C2%87%C2%82%1C%C2%B3%C3%A3%C3%9C%C3%832%06%C2%86%C3%BF%5D%C3%942%C2%97l%07%C3%BE%C3%BF%C2%8F%C2%B3%01%C2%84%C3%85qr%60r%C3%A7%C3%B9%C2%87%24%C3%9B3Z%C3%95Q%0A%C2%86%C2%95%03%C2%9FP%C3%91%5E%C2%A2%C3%8D%22%C3%96%C2%81O%C3%BE32%C2%A4%C2%93%C3%AF%1E%04%C3%B8%C3%8F%08%C3%86%20%C2%B3%C2%A8%C3%A9%C3%A1%01%02%0C%0C%0C%00%15%C2%BC%C2%858)%C2%9B%C3%BAk%00%00%00%00IEND%C2%AEB%60%C2%82"; 
  var mid = main.add("image", undefined, File.decode(mid_imgString), {name: "mid"}); 

  var divider2 = main.add("panel", undefined, undefined, {name: "divider2"}); 
      divider2.alignment = "fill"; 

  var right_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%C3%A0w%3D%C3%B8%00%00%00%09pHYs%00%00%0E%C3%83%00%00%0E%C3%83%01%C3%87o%C2%A8d%00%00%00%19tEXtSoftware%00www.inkscape.org%C2%9B%C3%AE%3C%1A%00%00%00%C3%9BIDATH%C2%89c%60%20%11L%5E%C2%BA%C3%B9%3F)%C3%AA%C2%99H%C2%B5%40US%C2%97%24%C3%B5%24%5B%40*%C2%A0%C2%B9%05%2C%C3%A4j%C2%9C%C2%BErG%C3%98%C3%9F%3F%C2%BF'%C3%BFg%60%10%C2%A3%C2%89%05%C2%9C%5C%5C%13D%C3%84%C2%A5%C3%84XX%C3%B0%1BAv%10%C2%89%C2%88IJ%122%C2%9C%22%0BXXY%C2%89RG%C3%BBT4e%C3%B9%C2%B6%C2%B3%C3%93V%C3%AD%C3%B2%C2%A3%C2%99%05%C3%92%C2%B2%C3%B2F%C3%ACl%C2%AC%1Bie%11%13'%177%C2%83%C2%B4%C2%9C%22%03%C2%AD%2C%C2%82%C3%87%01%C2%AD%2C%C3%82%C2%88dj%5B%C2%843%15%C3%81%2C%C2%92%C2%90%C2%94%C3%BEEvnd%C3%80%C2%93%C2%93%C3%BF30%1Ced%60l%08q%C3%90%C3%9FC%C2%81%C3%B9%C2%98%16%C3%80%0C%C3%B64%C2%92%C2%A7%C3%88%60%0C%0B%C2%A8m0%C3%9C%02F%06%C2%86%C2%83%7F%19%C3%BE%C3%97%7B%19)%1E%C2%A4%C2%A6%C3%81p%0B%C3%9C%C2%8D%14%1Cha0%0C%0C%C3%BD%1A%C2%8D%12%0B%C2%9E%C3%90%C3%94%C2%82%C3%BF%C2%8C%0C%C3%A9%C3%84X%02%00%3C%C3%A2A.%C3%9B%C2%9A%C2%A3%C2%A5%00%00%00%00IEND%C2%AEB%60%C2%82"; 
  var right = main.add("image", undefined, File.decode(right_imgString), {name: "right"}); 

    function aa (){
        alert("111")
    }


  main.layout.layout(true);
  main.layout.resize();
  main.onResizing = main.onResize = function () { this.layout.resize(); }

  if ( main instanceof Window ) main.show();

  return main;

}());