function getFile(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if(xhr.readyState === 4) {
      if(xhr.status === 200 || xhr.status == 0) {
       callback(xhr.responseText)
      }
    }
  }
  xhr.send(null);    
}
function imports(url){
  getFile(url, function(data){
    return eval.apply(window,[data])  
  })
}
function embedAsset(url){
  var type;
  var ext = url.split(".").pop().toLowerCase();
  ext=ext||"js"
  if(ext=="js")type = "text/javascript";
  if(ext=="css")type = "text/css";
  getFile(url, function(data){
    var blob = new Blob([data],{type:type})
    var urlsrc = URL.createObjectURL(blob)
    if(ext==="js"){
      //var script = document.createElement(script)
      (document.head.appendChild(document.createElement("script"))).src = urlsrc
    }
    if(ext==="css"){
      var linkcss = document.createElement("link");
      linkcss.rel="stylesheet";
      linkcss.type=type;
      linkcss.href = urlsrc;
      document.head.appendChild(linkcss)
    }
  })
}
