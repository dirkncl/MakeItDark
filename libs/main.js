// Color Cycling in HTML5 Canvas
// BlendShift Technology conceived, designed and coded by Joseph Huckaby
// Copyright (c) 2001-2002, 2010 Joseph Huckaby.
// Released under the LGPL v3.0: http://www.opensource.org/licenses/lgpl-3.0.html

// Misc Tools
// Copyright (c) 2010 Joseph Huckaby.
// Released under the LGPL v3.0: http://www.opensource.org/licenses/lgpl-3.0.html
// getInnerWindowSize() was grabbed from: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow

if(!Element.prototype.addCssContent){
  Element.prototype.addCssContent = function(cssContent){
    return (this.appendChild((document.createElement('style'))).appendChild(document.createTextNode(cssContent)))
  }
}

if(!Element.prototype.hide){
  Element.prototype.hide = function(){
    this.style.display = 'none';
    return this;
  }
}

if(!Element.prototype.show){
  Element.prototype.show = function(){
    this.style.display = '';
    return this;
  }
}

if(!Element.prototype.addClass){
  Element.prototype.addClass = function(name){
			var classes = this.className.split(/\s+/);
			var idx = find_idx_in_array( classes, name );
			if (idx > -1) {
				classes.splice( idx, 1 );
				this.className = classes.join(' ');
			}
      this.className += ' ' + name;
    return this;
  }
}

if(!Element.prototype.removeClass){
  Element.prototype.removeClass = function(name){
			var classes = this.className.split(/\s+/);
			var idx = find_idx_in_array( classes, name );
			if (idx > -1) {
				classes.splice( idx, 1 );
				this.className = classes.join(' ');
			}
			return this;
    

  }
}

if(!Element.prototype.setClass){
  Element.prototype.setClass = function(name, enabled){
		var classes = this.className.split(/\s+/);
		var idx = find_idx_in_array( classes, name );
		if (idx > -1) {
			classes.splice( idx, 1 );
			this.className = classes.join(' ');
		}
    
  	if (enabled){
      this.className += ' ' + name;
      return this;
    }  
		else{
		  return this;
    }
  }
}
var param = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  param[key] = value;
});

function parseQueryString(queryString) {
	// parse query string into object
	var pair = null;
	var queryObject = new Object();
	queryString = queryString.replace(/^.*\?(.+)$/,'$1');
	
	while ((pair = queryString.match(/(\w+)=([^\&]*)\&?/)) && pair[0].length) {
		queryString = queryString.substring( pair[0].length );
		pair[2] = unescape(pair[2]);
		if (/^\-?\d+$/.test(pair[2])) pair[2] = parseInt(pair[2], 10);
		else if (/^\-?\d+\.\d+$/.test(pair[2])) pair[2] = parseFloat(pair[2]);
		queryObject[pair[1]] = pair[2];
	}
	
	return queryObject;
}

function GetTickCount() {
	// milliseconds since page load
	return Math.floor( (new Date()).getTime() - CanvasCycle.globalTimeStart );
}

function getInnerWindowSize(dom) {
	// get size of inner window
	// From: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
	if (!dom) dom = window;
	var myWidth = 0, myHeight = 0;

	if( typeof( dom.innerWidth ) == 'number' ) {
		// Non-IE
		myWidth = dom.innerWidth;
		myHeight = dom.innerHeight;
	}
	else if( dom.document.documentElement && ( dom.document.documentElement.clientWidth || dom.document.documentElement.clientHeight ) ) {
		// IE 6+ in 'standards compliant mode'
		myWidth = dom.document.documentElement.clientWidth;
		myHeight = dom.document.documentElement.clientHeight;
	}
	else if( dom.document.body && ( dom.document.body.clientWidth || dom.document.body.clientHeight ) ) {
		// IE 4 compatible
		myWidth = dom.document.body.clientWidth;
		myHeight = dom.document.body.clientHeight;
	}
	return { width: myWidth, height: myHeight };
}

function find_idx_in_array(arr, elem) {
	// return idx of elem in arr, or -1 if not found
	for (var idx = 0, len = arr.length; idx < len; idx++) {
		if (arr[idx] == elem) return idx;
	}
	return -1;
}

(function() {
	// Browser detection
	var u = navigator.userAgent;
	var webkit = !!u.match(/webkit/i);
	var chrome = !!u.match(/Chrome/);
	var safari = !!u.match(/Safari/) && !chrome;
	var ie = !!u.match(/MSIE/);
	var ie6 = ie && !!u.match(/MSIE\s+6/);
	var ie7 = ie && !!u.match(/MSIE\s+7/);
	var ie8 = ie && !!u.match(/MSIE\s+8/);
	var moz = !safari && !ie;
	var op = !!window.opera;
	var mac = !!u.match(/Mac/i);
	var ff = !!u.match(/(Firefox|Minefield)/);
	var iphone = !!u.match(/iPhone/);
	var ipad = !!u.match(/iPad/);
	var snow = !!u.match(/Mac\s+OS\s+X\s+10\D[6789]/);
	var titanium = safari && !!u.match(/Titanium/);
	var android = !!u.match(/android/i);
	
	var ver = 0;
	if (ff && u.match(/Firefox\D+(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (safari && u.match(/Version\D(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (chrome && u.match(/Chrome\D(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (ie && u.match(/MSIE\D+(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (op && u.match(/Opera\D+(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	
	window.ua = {
		webkit: webkit,
		safari: safari,
		ie: ie,
		ie8: ie8,
		ie7: ie7,
		ie6: ie6,
		moz: moz,
		op: op,
		mac: mac,
		ff: ff,
		chrome: chrome,
		iphone: iphone,
		ipad: ipad,
		snow: snow,
		titanium: titanium,
		android: android,
		mobile: iphone || ipad || android,
		ver: ver
	};
})();

//embedAsset("libs/palette.js")
//embedAsset("libs/bitmap.js")
//embedAsset("libs/tween.js")

onload = function(){
  var a = document.getElementsByTagName("a");
  for(var i=0;i<a.length;i++){
    a[i].addCssContent(`
      a {
      	color: #888;
      	text-decoration: none;
      }
      
      a:hover {
      	text-decoration: underline;
      }  
    `)
  }
}

FrameCount.visible = false;
var sec=min=60;
var d = 24;
var SecondsInAday = d*min*sec;//86400
var CanvasCycle = {
	cookie: new CookieTree(),
	query: parseQueryString( location.href ),
	ctx: null,
	imageData: null,
	clock: 0,
	inGame: false,
	bmp: null,
	globalTimeStart: (new Date()).getTime(),
	inited: false,
	optTween: null,
	winSize: null,
	globalBrightness: 1.0,
	lastBrightness: 0,
	sceneIdx: -1,
	highlightColor: -1,
	defaultMaxVolume: 0.5,
	
	TL_WIDTH: 80,
	TL_MARGIN: 15,
	OPT_WIDTH: 150,
	OPT_MARGIN: 15,
	
	settings: {
		showOptions: false,
		targetFPS: 60,
		zoomFull: false,
		blendShiftEnabled: true,
		speedAdjust: 1.0,
		sound: true
	},

	contentSize: {
		width: 640,
		optionsWidth: 0,
		height: 480 + 40,
		scale: 2.0
	},

	init: function() {
		// called when DOM is ready
		if (!this.inited) {
			this.inited = true;
			document.getElementById('container').style.display = 'block';
			document.getElementById('d_options').style.display = 'none';
			document.getElementById('d_timeline').style.display = 'none';
		
			FrameCount.init();
			this.handleResize();
		
			var pal_disp = document.getElementById('palette_display');
      pal_disp.style="width: 150px";
      
			for (var idx = 0, len = 256; idx < len; idx++) {
				var div = document.createElement('div');
				div._idx = idx;
				div.id = 'pal_' + idx;
				//div.className = 'palette_color';
        div.style=`
	        float: left;
	        width: 8px;
	        height: 8px;
	        border: 1px solid #555;
	        margin: 1px 0px 0px 1px;        
        `;
				div.onmouseover = function() { CanvasCycle.highlightColor = this._idx; };
				div.onmouseout = function() { CanvasCycle.highlightColor = -1; };
				pal_disp.appendChild( div );
			}
			var div = document.createElement('div');
			div.className = 'clear';
			pal_disp.appendChild( div );
		
			// pick starting scene
			// var initialSceneIdx = Math.floor( Math.random() * scenes.length );
			// var initialSceneIdx = 0;
			var monthIdx = (new Date()).getMonth();
			var initialSceneIdx = -1;
			for (var idx = 0, len = scenes.length; idx < len; idx++) {
				var scene = scenes[idx];
				if (scene.monthIdx == monthIdx) {
					initialSceneIdx = idx;
					idx = len;
				}
			}
			if (initialSceneIdx == -1) initialSceneIdx = 0;
			// populate scene menu
			var html = '';
			html += '<select id="fe_scene" onChange="CanvasCycle.switchScene(this)" >';
			for (var idx = 0, len = scenes.length; idx < len; idx++) {
				var scene = scenes[idx];
				html += '<option value="'+scene.name+'" '+((idx == initialSceneIdx) ? ' selected="selected"' : '')+'>'+scene.title+'</option>';
			}
			html += '</select>';
			document.getElementById('d_scene_selector').innerHTML = html;
			
			// read prefs from cookie
			var prefs = this.cookie.get('settings');
			if (!prefs) prefs = {
				showOptions: false,
				targetFPS: 60,
				zoomFull: false,
				blendShiftEnabled: true,
				speedAdjust: 1.0,
				sound: true
			};
			
			// allow query to override prefs
			for (var key in this.query) {
				prefs[key] = this.query[key];
			}
			
			if (prefs) {
				if (prefs.showOptions) this.toggleOptions();
				this.setRate( prefs.targetFPS );
				this.setZoom( prefs.zoomFull );
				this.setSpeed( prefs.speedAdjust );
				this.setBlendShift( prefs.blendShiftEnabled );
				this.setSound( prefs.sound );
			}
			
			// start synced to local time
			var now = new Date();
			this.timeOffset = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
			this.updateTimelineDisplay();
			
			// setup timeline drag
			document.getElementById('d_tl_thumb').addEventListener('mousedown', function(e) {
				CC.tl_mouseDown = true;
				CC.tl_mouseOriginY = e.pageY;
				CC.tl_timeOrigin = CC.timeOffset;
				e.preventDefault();
				e.stopPropagation();
			}, false );
			window.addEventListener('mouseup', function(e) {
				CC.tl_mouseDown = false;
			}, false );
			window.addEventListener( "mousemove", function(e) {
				if (CC.tl_mouseDown) {
					// visual thumb top range: 8px - 424px (416)
					var yDelta = e.pageY - CC.tl_mouseOriginY;
					CC.timeOffset = CC.tl_timeOrigin + Math.floor(yDelta * (SecondsInAday / 416));
					if (CC.timeOffset < 0) CC.timeOffset = 0;
					else if (CC.timeOffset >= SecondsInAday) CC.timeOffset = SecondsInAday-1;
					CC.updateTimelineDisplay();
				}
			}, false );
      var toggleSound = function() {
         var state = false;
         return function() {
           if(!state) {
               state = true;
               CC.setSound(state)
               document.title="Sound On"
               return;
           }
           state = false;
           CC.setSound(state);
           document.title="Sound Off"
         }
      }();			
			// keyboard shortcuts
			window.addEventListener('keydown', function(e) {
				if (!e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
					switch (e.keyCode) {
						case 9: // tab
							if (CC.inGame) {
								CC.stop();
								if (CC.audioTrack) {
									try { CC.audioTrack.pause(); } catch(e) {;}
								}
							}
							else {
								CC.run();
								if (CC.audioTrack && CC.settings.sound) {
									try { CC.audioTrack.play(); } catch(e) {;}
								}
							}
							break;
						case 38: // up arrow
							CC.timeOffset -= 60;
							if (CC.timeOffset < 0) CC.timeOffset += SecondsInAday;
							CC.updateTimelineDisplay();
							break;
						case 40: // down arrow
							CC.timeOffset += 60;
							if (CC.timeOffset >= SecondsInAday) CC.timeOffset -= SecondsInAday;
							CC.updateTimelineDisplay();
							break;
						case 80: // P
							CC.toggleOptions();
							break;
						case 66: // B
							CC.setBlendShift( !CC.settings.blendShiftEnabled );
							break;
						case 83: // S
							toggleSound ()  
							break;
						case 39: // -> right arrow
							CC.jumpScene(1)
							break;
						case 37: // <- left arrow
							CC.jumpScene(-1)
							break;
					}
          
					e.preventDefault();
					e.stopPropagation();
				}
			}, false );
			
			// load initial scene
			this.sceneIdx = initialSceneIdx;
			this.loadScene( initialSceneIdx );
		}
	},
	
	updateTimelineDisplay: function() {
		// sync the timeline thumb position to the current time
		document.getElementById('d_tl_thumb').style.top = '' + Math.floor(8 + (this.timeOffset / (SecondsInAday / 416))) + 'px';
		
		// also update the clocky
		var ampm = 'AM';
		var hour = Math.floor(this.timeOffset / 3600);
		if (hour >= 12) {
			ampm = 'PM';
			if (hour > 12) hour -= 12;
		}
		else if (hour == 0) hour = 12;
		if (hour < 10) hour = '0' + hour;
		
		var minute = Math.floor( (this.timeOffset / 60) % 60 );
		if (minute < 10) minute = '0' + minute;
		
		var second = Math.floor( this.timeOffset % 60 );
		if (second < 10) second = '0' + second;
		
		document.getElementById('d_tl_clock').innerHTML = '' + hour + ':' + minute + '&nbsp;' + ampm;
	},

	jumpScene: function(dir) {
		// next or prev scene
		this.sceneIdx += dir;
		if (this.sceneIdx >= scenes.length) this.sceneIdx = 0;
		else if (this.sceneIdx < 0) this.sceneIdx = scenes.length - 1;
		document.getElementById('fe_scene').selectedIndex = this.sceneIdx;
		this.switchScene( document.getElementById('fe_scene') );
	},

	switchScene: function(menu) {
		// switch to new scene (grab menu selection)
		this.stopSceneAudio();
		
		var name = menu.options[menu.selectedIndex].value;
		this.sceneIdx = menu.selectedIndex;
		
		if (ua.mobile) {
			// no transitions on mobile devices, just switch as fast as possible
			this.inGame = false;
			
			this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
			this.ctx.fillStyle = "rgb(0,0,0)";
			this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);
			
			CanvasCycle.globalBrightness = 1.0;
			CanvasCycle.loadScene( this.sceneIdx );
		}
		else {
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: this.globalBrightness, newSceneIdx: this.sceneIdx },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 0.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				onTweenComplete: function(tween) {
					CanvasCycle.loadScene( tween.target.newSceneIdx );
				},
				category: 'scenefade'
			});
		}
	},

	loadScene: function(idx) {
		// load image JSON from the server
		this.stop();
		this.showLoading();
		
		var scene = scenes[idx];
		 //scene.name
		 //scene.month
     //scene.scpt
     
		var url = 'images/'+scene.name+'_'+scene.month+'_'+scene.scpt;
    //var cont;
		//var url = scene.name+'_'+scene.month+'_'+scene.scpt;
		//var cont = saveToStorage(url);
    //console.log(cont)
    imports(url);
    /*getFile(url, function(data){
      return eval.apply(window,[data])
      
    })*/
    //eval.apply(window,[cont])
    /*
    var cnctenate;
    getFile(file, function(datafile){
      getFile(month, function(datamonth){
        getFile(scpt, function(datascpt){
          callback({
            base:datafile,
            palettes:datamonth,
            timeline:datascpt
            
          })
          
        })
      })
    })
    */
    /*
		var scr = document.createElement('SCRIPT');
		scr.type = 'text/javascript';
		scr.src = cont;
		document.getElementsByTagName('HEAD')[0].appendChild(scr);
    */
    //localStorage.removeItem(url)
    
	},
	
	showLoading: function() {
		// show spinning loading indicator
		var loading = document.getElementById('d_loading');
    loading.style=`
	    position: absolute;
	    width: 32px;
	    height: 32px;
	    left: 0px;
	    top: 0px;
	    z-index: 3;
	    background: url(images/loading.gif) no-repeat center center;    
    `;
		var kicker = this.settings.showOptions ? (this.TL_WIDTH + this.TL_MARGIN) : 0;
		loading.style.left = '' + Math.floor( kicker + (((this.contentSize.width * this.contentSize.scale) / 2) - 16) ) + 'px';
		loading.style.top = '' + Math.floor( ((this.contentSize.height * this.contentSize.scale) / 2) - 16 ) + 'px';
		loading.show();
	},
	
	hideLoading: function() {
		// hide spinning loading indicator
		document.getElementById('d_loading').hide();
	},

	initScene: function(scene) {
		// initialize, receive image data from server
		this.initPalettes( scene.palettes );
		this.initTimeline( scene.timeline );
		
		// force a full palette and pixel refresh for first frame
		this.oldTimeOffset = -1;
		
		// create an intermediate palette that will hold the time-of-day colors
		this.todPalette = new Palette( scene.base.colors, scene.base.cycles );
		
		// process base scene image
		this.bmp = new Bitmap(scene.base);
		this.bmp.optimize();
		
		var canvas = document.getElementById('mycanvas');
    
		if (!canvas.getContext) return; // no canvas support
		
		if (!this.ctx) this.ctx = canvas.getContext('2d');
		this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);
		
		if (!this.imageData) {
			if (this.ctx.createImageData) {
				this.imageData = this.ctx.createImageData( this.bmp.width, this.bmp.height );
			}
			else if (this.ctx.getImageData) {
				this.imageData = this.ctx.getImageData( 0, 0, this.bmp.width, this.bmp.height );
			}
			else return; // no canvas data support
		}
		this.bmp.clear( this.imageData );
		
		if (ua.mobile) {
			// no transition on mobile devices
			this.globalBrightness = 1.0;
		}
		else {
			this.globalBrightness = 0.0;
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: 0 },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 1.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				category: 'scenefade'
			});
		}
		
		this.startSceneAudio();
	},
	
	initPalettes: function(pals) {
		// create palette objects for each raw time-based palette
		var scene = scenes[this.sceneIdx];
		
		this.palettes = {};
		for (var key in pals) {
			var pal = pals[key];
			
			if (scene.remap) {
				for (var idx in scene.remap) {
					pal.colors[idx][0] = scene.remap[idx][0];
					pal.colors[idx][1] = scene.remap[idx][1];
					pal.colors[idx][2] = scene.remap[idx][2];
				}
			}
			
			var palette = this.palettes[key] = new Palette( pal.colors, pal.cycles );
			palette.copyColors( palette.baseColors, palette.colors );
		}
	},
	
	initTimeline: function(entries) {//entries = scene.timeline
		// create timeline with pointers to each palette
		this.timeline = {};
		for (var offset in entries) {
			var palette = this.palettes[ entries[offset] ];
			if (!palette) return alert("ERROR: Could not locate palette for timeline entry: " + entries[offset]);
			this.timeline[offset] = palette;
		}
	},
	
	run: function () {
		// start main loop
		if (!this.inGame) {
			this.inGame = true;
			this.animate();
		}
	},
	
	stop: function() {
		// stop main loop
		this.inGame = false;
	},

	animate: function() {
		// animate one frame. and schedule next
		if (this.inGame) {
			var colors = this.bmp.palette.colors;
	
			if (this.settings.showOptions) {
				for (var idx = 0, len = colors.length; idx < len; idx++) {
					var clr = colors[idx];
					var div = document.getElementById('pal_'+idx);
					div.style.backgroundColor = 'rgb(' + clr.red + ',' + clr.green + ',' + clr.blue + ')';
				}
		
				// if (this.clock % this.settings.targetFPS == 0) $('d_debug').innerHTML = 'FPS: ' + FrameCount.current;
				document.getElementById('d_debug').innerHTML = 'FPS: ' + FrameCount.current + ((this.highlightColor != -1) ? (' - Color #' + this.highlightColor) : '');
			}
			
			var optimize = true;
			var newSec = FrameCount.count();
			
			if (newSec && !this.tl_mouseDown) {
				// advance time
				this.timeOffset++;
				if (this.timeOffset >= SecondsInAday) this.timeOffset = 0;
				this.updateTimelineDisplay();
			}
			
			if (this.timeOffset != this.oldTimeOffset) {
				// calculate time-of-day base colors
				this.setTimeOfDayPalette();
				optimize = false;
			}
			if (this.lastBrightness != this.globalBrightness) optimize = false;
			if (this.highlightColor != this.lastHighlightColor) optimize = false;
			
			// cycle palette
			this.bmp.palette.cycle( this.bmp.palette.baseColors, GetTickCount(), this.settings.speedAdjust, this.settings.blendShiftEnabled );
			
			if (this.highlightColor > -1) {
				this.bmp.palette.colors[ this.highlightColor ] = new Color(0, 0, 0);
			}
			if (this.globalBrightness < 1.0) {
				// bmp.palette.fadeToColor( pureBlack, 1.0 - globalBrightness, 1.0 );
				this.bmp.palette.burnOut( 1.0 - this.globalBrightness, 1.0 );
			}
			
			// render pixels
			this.bmp.render( this.imageData, optimize );
			this.ctx.putImageData( this.imageData, 0, 0 );
			
			this.lastBrightness = this.globalBrightness;
			this.lastHighlightColor = this.highlightColor;
			this.oldTimeOffset = this.timeOffset;
			
			TweenManager.logic( this.clock );
			this.clock++;
			this.scaleAnimate();
			
			if (this.inGame) {
				// setTimeout( function() { CanvasCycle.animate(); }, 1 );
				requestAnimationFrame( function() { CanvasCycle.animate(); } );
			}
		}
	},
	
	setTimeOfDayPalette: function() {
		// fade palette to proper time-of-day
		
		// locate nearest timeline palette before, and after current time
		// auto-wrap to find nearest out-of-bounds events (i.e. tomorrow and yesterday)
		var before = {
			palette: null,
			dist: SecondsInAday,
			offset: 0
		};
		for (var offset in this.timeline) {
			if ((offset <= this.timeOffset) && ((this.timeOffset - offset) < before.dist)) {
				before.dist = this.timeOffset - offset;
				before.palette = this.timeline[offset];
				before.offset = offset;
			}
		}
		if (!before.palette) {
			// no palette found, so wrap around and grab one with highest offset
			var temp = 0;
			for (var offset in this.timeline) {
				if (offset > temp) temp = offset;
			}
			before.palette = this.timeline[temp];
			before.offset = temp - SecondsInAday; // adjust timestamp for day before
		}
		
		var after = {
			palette: null,
			dist: SecondsInAday,
			offset: 0
		};
		for (var offset in this.timeline) {
			if ((offset >= this.timeOffset) && ((offset - this.timeOffset) < after.dist)) {
				after.dist = offset - this.timeOffset;
				after.palette = this.timeline[offset];
				after.offset = offset;
			}
		}
		if (!after.palette) {
			// no palette found, so wrap around and grab one with lowest offset
			var temp = SecondsInAday;
			for (var offset in this.timeline) {
				if (offset < temp) temp = offset;
			}
			after.palette = this.timeline[temp];
			after.offset = temp + SecondsInAday; // adjust timestamp for day after
		}
		
		// copy the 'before' palette colors into our intermediate palette
		this.todPalette.copyColors( before.palette.baseColors, this.todPalette.colors );
		
		// now, fade to the 'after' palette, but calculate the correct 'tween' time
		this.todPalette.fade( after.palette, this.timeOffset - before.offset, after.offset - before.offset );
		
		// finally, copy the final colors back to the bitmap palette for cycling and rendering
		this.bmp.palette.importColors( this.todPalette.colors );
	},

	scaleAnimate: function() {
		// handle scaling image up or down
		if (this.settings.zoomFull) {
			// scale up to full size
			var totalNativeWidth = this.contentSize.width + this.contentSize.optionsWidth;
			var maxScaleX = (this.winSize.width - 30) / totalNativeWidth;
		
			var totalNativeHeight = this.contentSize.height;
			var maxScaleY = (this.winSize.height - 30) / totalNativeHeight;
		
			var maxScale = Math.min( maxScaleX, maxScaleY );
		
			if (this.contentSize.scale != maxScale) {
				this.contentSize.scale += ((maxScale - this.contentSize.scale) / 8);
				if (Math.abs(this.contentSize.scale - maxScale) < 0.001) this.contentSize.scale = maxScale; // close enough
			
				var sty = document.getElementById('mycanvas').style; 
			
				if (ua.webkit) sty.webkitTransform = 'translate3d(0px, 0px, 0px) scale('+this.contentSize.scale+')';
				else if (ua.ff) sty.MozTransform = 'scale('+this.contentSize.scale+')';
				else if (ua.op) sty.OTransform = 'scale('+this.contentSize.scale+')';
				else sty.transform = 'scale('+this.contentSize.scale+')';
				
				sty.marginRight = '' + Math.floor( (this.contentSize.width * this.contentSize.scale) - this.contentSize.width ) + 'px';
			document.getElementById('d_header').style.width = '' + Math.floor(this.contentSize.width * this.contentSize.scale) + 'px';
				this.repositionContainer();
			}
		}
		else {
			// scale back down to native
			if (this.contentSize.scale > 1.0) {
				this.contentSize.scale += ((1.0 - this.contentSize.scale) / 8);
				if (this.contentSize.scale < 1.001) this.contentSize.scale = 1.0; // close enough
			
				var sty = document.getElementById('mycanvas').style; 
			
				if (ua.webkit) sty.webkitTransform = 'translate3d(0px, 0px, 0px) scale('+this.contentSize.scale+')';
				else if (ua.ff) sty.MozTransform = 'scale('+this.contentSize.scale+')';
				else if (ua.op) sty.OTransform = 'scale('+this.contentSize.scale+')';
				else sty.transform = 'scale('+this.contentSize.scale+')';
				
				sty.marginRight = '' + Math.floor( (this.contentSize.width * this.contentSize.scale) - this.contentSize.width ) + 'px';
				document.getElementById('d_header').style.width = '' + Math.floor(this.contentSize.width * this.contentSize.scale) + 'px';
				this.repositionContainer();
			}
		}
	},
	
	repositionContainer: function() {
		// reposition container element based on inner window size
		var div = document.getElementById('container');
		if (div) {
			this.winSize = getInnerWindowSize();
			div.style.left = '' + Math.floor((this.winSize.width / 2) - (((this.contentSize.width * this.contentSize.scale) + this.contentSize.optionsWidth) / 2)) + 'px';
			div.style.top = '' + Math.floor((this.winSize.height / 2) - ((this.contentSize.height * this.contentSize.scale) / 2)) + 'px';			
		}
	},

	handleResize: function() {
		// called when window resizes
		this.repositionContainer();
		if (this.settings.zoomFull) this.scaleAnimate();
	},
	
	saveSettings: function() {
		// save settings in cookie
		this.cookie.set( 'settings', this.settings );
		this.cookie.save();
	},
	
	startSceneAudio: function() {
		// start audio for current scene, if applicable
		var scene = scenes[ this.sceneIdx ];
		if (scene.sound && this.settings.sound && window.Audio) {
			if (this.audioTrack) {
				try { this.audioTrack.pause(); } catch(e) {;}
			}
			TweenManager.removeAll({ category: 'audio' });
			
			var ext = (ua.ff || ua.op) ? 'ogg' : 'mp3';
			var track = this.audioTrack = new Audio( '../audio/' + scene.sound + '.' + ext );
			track.volume = 0;
			track.loop = true;
			track.autobuffer = false;
			track.autoplay = true;
			
			track.addEventListener('canplaythrough', function() {
				//track.play();
				TweenManager.tween({
					target: track,
					duration: Math.floor( CanvasCycle.settings.targetFPS * 2 ),
					mode: 'EaseOut',
					algo: 'Linear',
					props: { volume: scene.maxVolume || CanvasCycle.defaultMaxVolume },
					category: 'audio'
				});
				CanvasCycle.hideLoading();
				CanvasCycle.run();
			}, false);
			
			if (ua.iphone || ua.ipad) {
				// these may support audio, but just don't invoke events
				// try to force it
				setTimeout( function() {
					track.play(); 
					track.volume = 1.0;
					CanvasCycle.hideLoading();
					CanvasCycle.run();
				}, 1000 );
			}
			
			if (ua.ff || ua.mobile) {
				// loop doesn't seem to work on FF or mobile devices, so let's force it
				track.addEventListener('ended', function() {
					track.currentTime = 0;
					track.play();
				}, false);
			}
			
			track.load();
		} // sound enabled and supported
		else {
			// no sound for whatever reason, so just start main loop
			this.hideLoading();
			this.run();
		}
	},
	
	stopSceneAudio: function() {
		// fade out and stop audio for current scene
		var scene = scenes[ this.sceneIdx ];
		if (scene.sound && this.settings.sound && window.Audio && this.audioTrack) {
			var track = this.audioTrack;
			
			if (ua.iphone || ua.ipad) {
				// no transition here, so just stop sound
				track.pause();
			}
			else {
				TweenManager.removeAll({ category: 'audio' });
				TweenManager.tween({
					target: track,
					duration: Math.floor( CanvasCycle.settings.targetFPS / 2 ),
					mode: 'EaseOut',
					algo: 'Linear',
					props: { volume: 0 },
					onTweenComplete: function(tween) {
						// ff has weird delay with volume fades, so allow sound to continue
						// will be stopped when next one starts
						if (!ua.ff) track.pause();
					},
					category: 'audio'
				});
			}
		}
	},

	toggleOptions: function() {
		var startValue, endValue;
		TweenManager.removeAll({ category: 'options' });
	
		if (!this.settings.showOptions) {
			startValue = 0;
			if (this.optTween) startValue = this.optTween.target.value;
			endValue = 1.0;
			document.getElementById('d_options').style.display = '';
			document.getElementById('d_options').style.opacity = startValue;
			document.getElementById('btn_options_toggle').innerHTML = '&#x00AB; Hide Options';
			
			document.getElementById('d_timeline').style.width = '0px';
			document.getElementById('d_timeline').style.display = '';
			document.getElementById('d_timeline').style.opacity = startValue;
		}
		else {
			startValue = 1.0;
			if (this.optTween) startValue = this.optTween.target.value;
			endValue = 0;
			document.getElementById('btn_options_toggle').innerHTML = 'Show Options &#x00BB;';
		}
	
		this.optTween = TweenManager.tween({
			target: { value: startValue },
			duration: Math.floor( this.settings.targetFPS / 3 ),
			mode: 'EaseOut',
			algo: 'Quadratic',
			props: { value: endValue },
			onTweenUpdate: function(tween) {
				document.getElementById('d_options').style.opacity = tween.target.value;
				document.getElementById('btn_options_toggle').style.left = '' + Math.floor(tween.target.value * 128) + 'px';
				
				var tl_sty = document.getElementById('d_timeline').style;
				tl_sty.opacity = tween.target.value;
				tl_sty.width = '' + Math.floor(tween.target.value * CC.TL_WIDTH) + 'px';
				tl_sty.marginRight = '' + Math.floor(tween.target.value * CC.TL_MARGIN) + 'px';
				
				document.getElementById('d_header').style.marginLeft = '' + Math.floor(tween.target.value * (CC.TL_WIDTH + CC.TL_MARGIN)) + 'px';
				
				CanvasCycle.contentSize.optionsWidth = Math.floor( tween.target.value * (CC.OPT_WIDTH + CC.OPT_MARGIN + CC.TL_WIDTH + CC.TL_MARGIN) );
				CanvasCycle.handleResize();
			},
			onTweenComplete: function(tween) {
				if (tween.target.value == 0) {
					document.getElementById('d_options').style.display = 'none';
					document.getElementById('d_timeline').style.display = 'none';
				}
				CanvasCycle.optTween = null;
			},
			category: 'options'
		});
	
		this.settings.showOptions = !this.settings.showOptions;
		this.saveSettings();
	},

	setZoom: function(enabled) {
		if (enabled != this.settings.zoomFull) {
			this.settings.zoomFull = enabled;
			this.saveSettings();
			document.getElementById('btn_zoom_actual').setClass('selected', !enabled);
			document.getElementById('btn_zoom_max').setClass('selected', enabled);
		}
	},

	setSound: function(enabled) {
		document.getElementById('btn_sound_on').setClass('selected', enabled);
		document.getElementById('btn_sound_off').setClass('selected', !enabled);
		this.settings.sound = enabled;
		
		if (this.sceneIdx > -1) {
			if (enabled) {
				// enable sound
				if (this.audioTrack) this.audioTrack.play();
				else this.startSceneAudio();
			}
			else {
				// disable sound
				if (this.audioTrack) this.audioTrack.pause();
			}
		}
		
		this.saveSettings();
	},
  /////////////
	setRate: function(rate) {
		/* document.getElementById('btn_rate_30').setClass('selected', rate == 30);
		document.getElementById('btn_rate_60').setClass('selected', rate == 60);
		document.getElementById('btn_rate_90').setClass('selected', rate == 90); */
		this.settings.targetFPS = rate;
		this.saveSettings();
	},
	
	setSpeed: function(speed) {
		document.getElementById('btn_speed_025').setClass('selected', speed == 0.25);
		document.getElementById('btn_speed_05').setClass('selected', speed == 0.5);
		document.getElementById('btn_speed_1').setClass('selected', speed == 1);
		document.getElementById('btn_speed_2').setClass('selected', speed == 2);
		document.getElementById('btn_speed_4').setClass('selected', speed == 4);
		this.settings.speedAdjust = speed;
		this.saveSettings();
	},

	setBlendShift: function(enabled) {
		document.getElementById('btn_blendshift_on').setClass('selected', enabled);
		document.getElementById('btn_blendshift_off').setClass('selected', !enabled);
		this.settings.blendShiftEnabled = enabled;
		this.saveSettings();
	}

};

var CC = CanvasCycle; // shortcut
window.CC = CC
