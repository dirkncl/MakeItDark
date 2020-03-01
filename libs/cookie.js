/***
 * cookie.js
 * A simple cookie library supporting hash trees
 * Requires Joe Tools for merge_objects() and serialize().
 * 
 * var tree = new CookieTree();
 * tree.set( "foo", "bar" );
 * tree.set( "complex", { hello: "there", array: [1,2,3] } );
 * tree.save();
 * 
 * Copyright (c) 2007 Joseph Huckaby.
 * Released under the LGPL v3.0: http://www.opensource.org/licenses/lgpl-3.0.html
 */

/* if (!window.merge_objects || !window.serialize)
	alert("ERROR: cookie.js requires tools.js."); */
function isa_hash(arg) {
	// determine if arg is a hash
	return( !!arg && (typeof(arg) == 'object') && (typeof(arg.length) == 'undefined') );
}

function isa_array(arg) {
	// determine if arg is an array or is array-like
	if (typeof(arg) == 'array') return true;
	return( !!arg && (typeof(arg) == 'object') && (typeof(arg.length) != 'undefined') );
}
/*
function merge_objects(a, b) {
	// merge keys from a and b into c and return c
	// b has precedence over a
	if (!a) a = {};
	if (!b) b = {};
	var c = {};

	// also handle serialized objects for a and b
	if (typeof(a) != 'object') eval( "a = " + a );
	if (typeof(b) != 'object') eval( "b = " + b );

	for (var key in a) c[key] = a[key];
	for (var key in b) c[key] = b[key];

	return c;
}
*/
function serialize(thingy, glue) {
	// serialize anything into json
	// or perl object notation (just set glue to '=>')
	if (!glue) glue = ':'; // default to json
	var stream = '';
	
	if (typeof(thingy) == 'boolean') {
		stream += (thingy ? 'true' : 'false');
	}
	else if (typeof(thingy) == 'number') {
		stream += thingy;
	}
	else if (typeof(thingy) == 'string') {
		stream += '"' + thingy.replace(/([\"\\])/g, '\\$1').replace(/\r/g, "\\r").replace(/\n/g, "\\n") + '"';
	}
	else if (isa_hash(thingy)) {
		var num = 0;
		var buffer = [];
		for (var key in thingy) {
			buffer[num] = (key.match(/^[A-Za-z]\w*$/) ? key : ('"'+key+'"')) + glue + serialize(thingy[key], glue);
			num++;
		}
		stream += '{' + buffer.join(',') + '}';
	}
	else if (isa_array(thingy)) {
		var buffer = [];
		for (var idx = 0, len = thingy.length; idx < len; idx++) {
			buffer[idx] = serialize(thingy[idx], glue);
		}
		stream += '[' + buffer.join(',') + ']';
	}
	else {
		// unknown type, just return 0
		stream += '0';
	}
	
	return stream;
}

//////////////////////////////////////////////////////
class CookieTree {
  constructor(args) {
	  // class constructor
	  if (args) {
	  	for (var key in args) this[key] = args[key];
	  }
	  
	  if (!this.expires) {
	  	var now = new Date();
	  	now.setFullYear( now.getFullYear() + 10 ); // 10 years from now
	  	this.expires = now.toGMTString();
	  }
	  
	  this.parse();
  }

  domain = location.hostname
  path = location.pathname
  
  parse () {
  	// parse document.cookie into hash tree
  	this.tree = {};
  	var cookies = document.cookie.split(/\;\s*/);
  	for (var idx = 0, len = cookies.length; idx < len; idx++) {
  		var cookie_raw = cookies[idx];
  		if (cookie_raw.match(/^CookieTree=(.+)$/)) {
  			var cookie = null;
  			var cookie_raw = unescape( RegExp.$1 );
  			// Debug.trace("Cookie", "Parsing cookie: " + cookie_raw);
  			try {
  				eval( "cookie = " + cookie_raw + ";" );
  			}
  			catch (e) {
  				// Debug.trace("Cookie", "Failed to parse cookie.");
  				cookie = {}; 
  			}
  			
  			//this.tree = merge_objects( this.tree, cookie );
  			this.tree = Object.assign( this.tree, cookie );
  			idx = len;
  		}
  	}
  }
  
  get (key) {
  	// get tree branch given value (top level)
  	return this.tree[key];
  }
  
  set (key, value) {
  	// set tree branch to given value (top level)
  	this.tree[key] = value;
  }
  
  save () {
  	// serializeserialize tree and save back into document.cookie
  	var cookie_raw = 'CookieTree=' + escape(serialize(this.tree));
  	
  	if (!this.path.match(/\/$/)) {
  		this.path = this.path.replace(/\/[^\/]+$/, "") + '/';
  	}
  	
  	cookie_raw += '; expires=' + this.expires;
  	cookie_raw += '; domain=' + this.domain;
  	cookie_raw += '; path=' + this.path;
  	
  	// Debug.trace("Cookie", "Saving cookie: " + cookie_raw);
  	
  	document.cookie = cookie_raw;
  }
  
  remove = function() {
  	// remove cookie from document
  	var cookie_raw = 'CookieTree={}';
  	
  	if (!this.path.match(/\/$/)) {
  		this.path = this.path.replace(/\/[^\/]+$/, "") + '/';
  	}
  	
  	var now = new Date();
  	now.setFullYear( now.getFullYear() - 1 ); // last year
  	cookie_raw += '; expires=' + now.toGMTString();
  	
  	cookie_raw += '; domain=' + this.domain;
  	cookie_raw += '; path=' + this.path;
  	
  	document.cookie = cookie_raw;
  }
}
