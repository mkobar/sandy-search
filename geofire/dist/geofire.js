!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.geofire={})}(this,function(e){"use strict";var t=function(){function e(e){if(this._cancelCallback=e,"[object Function]"!==Object.prototype.toString.call(this._cancelCallback))throw new Error("callback must be a function")}return e.prototype.cancel=function(){void 0!==this._cancelCallback&&(this._cancelCallback(),this._cancelCallback=void 0)},e}(),l=10,f="0123456789bcdefghjkmnpqrstuvwxyz",h=40007860,_=110574,y=5,u=22*y,i=6378137,a=.00669447819799,o=1e-12;function s(e){var t;if("string"!=typeof e?t="key must be a string":0===e.length?t="key cannot be the empty string":755<1+l+e.length?t="key is too long to be stored in Firebase":/[\[\].#$\/\u0000-\u001F\u007F]/.test(e)&&(t="key cannot contain any of the following characters: . # $ ] [ /"),void 0!==t)throw new Error("Invalid GeoFire key '"+e+"': "+t)}function v(e){var t;if(Array.isArray(e))if(2!==e.length)t="expected array of length 2, got length "+e.length;else{var r=e[0],n=e[1];"number"!=typeof r||isNaN(r)?t="latitude must be a number":r<-90||90<r?t="latitude must be within the range [-90, 90]":"number"!=typeof n||isNaN(n)?t="longitude must be a number":(n<-180||180<n)&&(t="longitude must be within the range [-180, 180]")}else t="location must be an array";if(void 0!==t)throw new Error("Invalid GeoFire location '"+e+"': "+t)}function b(e){var t;if("string"!=typeof e)t="geohash must be a string";else if(0===e.length)t="geohash cannot be the empty string";else for(var r=0,n=e;r<n.length;r++){var i=n[r];-1===f.indexOf(i)&&(t="geohash cannot contain '"+i+"'")}if(void 0!==t)throw new Error("Invalid GeoFire geohash '"+e+"': "+t)}function c(e,t){if(void 0===t&&(t=!1),"object"!=typeof e)throw new Error("query criteria must be an object");if(void 0===e.center&&void 0===e.radius)throw new Error("radius and/or center must be specified");if(t&&(void 0===e.center||void 0===e.radius))throw new Error("query criteria for a new query must contain both a center and a radius");for(var r=0,n=Object.keys(e);r<n.length;r++){var i=n[r];if("center"!==i&&"radius"!==i)throw new Error("Unexpected attribute '"+i+"' found in query criteria")}if(void 0!==e.center&&v(e.center),void 0!==e.radius){if("number"!=typeof e.radius||isNaN(e.radius))throw new Error("radius must be a number");if(e.radius<0)throw new Error("radius must be greater than or equal to 0")}}function d(e){if("number"!=typeof e||isNaN(e))throw new Error("Error: degrees must be a number");return e*Math.PI/180}function p(e,t){if(void 0===t&&(t=l),v(e),void 0!==t){if("number"!=typeof t||isNaN(t))throw new Error("precision must be a number");if(t<=0)throw new Error("precision must be greater than 0");if(22<t)throw new Error("precision cannot be greater than 22");if(Math.round(t)!==t)throw new Error("precision must be an integer")}for(var r={min:-90,max:90},n={min:-180,max:180},i="",a=0,o=0,s=1;i.length<t;){var c=s?e[1]:e[0],h=s?n:r,u=(h.min+h.max)/2;u<c?(a=1+(a<<1),h.min=u):(a=0+(a<<1),h.max=u),s=!s,o<4?o++:(o=0,i+=f[a],a=0)}return i}function g(e,t){var r=d(t),n=Math.cos(r)*i*Math.PI/180*(1/Math.sqrt(1-a*Math.sin(r)*Math.sin(r)));return n<o?0<e?360:0:Math.min(360,e/n)}function k(e,t){var r=g(e,t);return 1e-6<Math.abs(r)?Math.max(1,Math.log2(360/r)):1}function m(e){if(e<=180&&-180<=e)return e;var t=e+180;return 0<t?t%360-180:180- -t%360}function w(e,t){var r,n=t/_,i=Math.min(90,e[0]+n),a=Math.max(-90,e[0]-n),o=2*Math.floor((r=t,Math.min(Math.log2(h/2/r),u))),s=2*Math.floor(k(t,i))-1,c=2*Math.floor(k(t,a))-1;return Math.min(o,s,c,u)}function n(e,t){v(e);var r,n,i,a,o,s,c,h,u=Math.max(1,w(e,t)),l=Math.ceil(u/y),d=(r=e,i=(n=t)/_,a=Math.min(90,r[0]+i),o=Math.max(-90,r[0]-i),s=g(n,a),c=g(n,o),h=Math.max(s,c),[[r[0],r[1]],[r[0],m(r[1]-h)],[r[0],m(r[1]+h)],[a,r[1]],[a,m(r[1]-h)],[a,m(r[1]+h)],[o,r[1]],[o,m(r[1]-h)],[o,m(r[1]+h)]]).map(function(e){return function(e,t){b(e);var r=Math.ceil(t/y);if(e.length<r)return[e,e+"~"];var n=(e=e.substring(0,r)).substring(0,e.length-1),i=f.indexOf(e.charAt(e.length-1)),a=t-n.length*y,o=y-a,s=i>>o<<o,c=s+(1<<o);return 31<c?[n+f[s],n+"~"]:[n+f[s],n+f[c]]}(p(e,l),u)});return d.filter(function(r,n){return!d.some(function(e,t){return t<n&&r[0]===e[0]&&r[1]===e[1]})})}function C(e){if(e&&"l"in e&&Array.isArray(e.l)&&2===e.l.length)return e.l;throw new Error("Unexpected location object encountered: "+JSON.stringify(e))}function r(e){return"string"==typeof e.key||null===e.key?e.key:"function"==typeof e.key?e.key():e.name()}function Q(e,t){v(e),v(t);var r=d(t[0]-e[0]),n=d(t[1]-e[1]),i=Math.sin(r/2)*Math.sin(r/2)+Math.cos(d(e[0]))*Math.cos(d(t[0]))*Math.sin(n/2)*Math.sin(n/2);return 6371*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))}Math.log2=Math.log2||function(e){return Math.log(e)/Math.log(2)};var E=function(){function e(e,t){var r=this;if(this._firebaseRef=e,this._callbacks={ready:[],key_entered:[],key_exited:[],key_moved:[]},this._cancelled=!1,this._currentGeohashesQueried={},this._locationsTracked={},this._valueEventFired=!1,this._geohashCleanupScheduled=!1,this._cleanUpCurrentGeohashesQueriedTimeout=null,"[object Object]"!==Object.prototype.toString.call(this._firebaseRef))throw new Error("firebaseRef must be an instance of Firebase");this._cleanUpCurrentGeohashesQueriedInterval=setInterval(function(){!1===r._geohashCleanupScheduled&&r._cleanUpCurrentGeohashesQueried()},1e4),c(t,!0),this._center=t.center,this._radius=t.radius,this._listenForNewGeohashes()}return e.prototype.cancel=function(){var r=this;this._cancelled=!0,this._callbacks={ready:[],key_entered:[],key_exited:[],key_moved:[]},Object.keys(this._currentGeohashesQueried).forEach(function(e){var t=r._stringToQuery(e);r._cancelGeohashQuery(t,r._currentGeohashesQueried[e]),delete r._currentGeohashesQueried[e]}),this._locationsTracked={},clearInterval(this._cleanUpCurrentGeohashesQueriedInterval)},e.prototype.center=function(){return this._center},e.prototype.on=function(e,r){var n=this;if(-1===["ready","key_entered","key_exited","key_moved"].indexOf(e))throw new Error("event type must be 'ready', 'key_entered', 'key_exited', or 'key_moved'");if("function"!=typeof r)throw new Error("callback must be a function");(this._callbacks[e].push(r),"key_entered"===e)&&Object.keys(this._locationsTracked).forEach(function(e){var t=n._locationsTracked[e];void 0!==t&&t.isInQuery&&r(e,t.location,t.distanceFromCenter)});return"ready"===e&&this._valueEventFired&&r(),new t(function(){n._callbacks[e].splice(n._callbacks[e].indexOf(r),1)})},e.prototype.radius=function(){return this._radius},e.prototype.updateCriteria=function(e){c(e),this._center=e.center||this._center,this._radius=e.radius||this._radius;for(var t=0,r=Object.keys(this._locationsTracked);t<r.length;t++){var n=r[t];if(!0===this._cancelled)break;var i=this._locationsTracked[n],a=i.isInQuery;i.distanceFromCenter=Q(i.location,this._center),i.isInQuery=i.distanceFromCenter<=this._radius,a&&!i.isInQuery?this._fireCallbacksForKey("key_exited",n,i.location,i.distanceFromCenter):!a&&i.isInQuery&&this._fireCallbacksForKey("key_entered",n,i.location,i.distanceFromCenter)}this._valueEventFired=!1,this._listenForNewGeohashes()},e.prototype._cancelGeohashQuery=function(e,t){var r=this._firebaseRef.orderByChild("g").startAt(e[0]).endAt(e[1]);r.off("child_added",t.childAddedCallback),r.off("child_removed",t.childRemovedCallback),r.off("child_changed",t.childChangedCallback),r.off("value",t.valueCallback)},e.prototype._childAddedCallback=function(e){this._updateLocation(r(e),C(e.val()))},e.prototype._childChangedCallback=function(e){this._updateLocation(r(e),C(e.val()))},e.prototype._childRemovedCallback=function(e){var n=this,i=r(e);i in this._locationsTracked&&this._firebaseRef.child(i).once("value",function(e){var t=null===e.val()?null:C(e.val()),r=null!==t?p(t):null;n._geohashInSomeQuery(r)||n._removeLocation(i,t)})},e.prototype._cleanUpCurrentGeohashesQueried=function(){var n=this,e=Object.keys(this._currentGeohashesQueried);e.forEach(function(e){var t=n._currentGeohashesQueried[e];if(!1===t.active){var r=n._stringToQuery(e);n._cancelGeohashQuery(r,t),delete n._currentGeohashesQueried[e]}}),(e=Object.keys(this._locationsTracked)).forEach(function(e){if(!n._geohashInSomeQuery(n._locationsTracked[e].geohash)){if(n._locationsTracked[e].isInQuery)throw new Error("Internal State error, trying to remove location that is still in query");delete n._locationsTracked[e]}}),this._geohashCleanupScheduled=!1,null!==this._cleanUpCurrentGeohashesQueriedTimeout&&(clearTimeout(this._cleanUpCurrentGeohashesQueriedTimeout),this._cleanUpCurrentGeohashesQueriedTimeout=null)},e.prototype._fireCallbacksForKey=function(e,t,r,n){this._callbacks[e].forEach(function(e){null==r?e(t,null,null):e(t,r,n)})},e.prototype._fireReadyEventCallbacks=function(){this._callbacks.ready.forEach(function(e){e()})},e.prototype._geohashInSomeQuery=function(e){for(var t=0,r=Object.keys(this._currentGeohashesQueried);t<r.length;t++){var n=r[t];if(n in this._currentGeohashesQueried){var i=this._stringToQuery(n);if(e>=i[0]&&e<=i[1])return!0}}return!1},e.prototype._geohashQueryReadyCallback=function(e){var t=this._outstandingGeohashReadyEvents.indexOf(e);-1<t&&this._outstandingGeohashReadyEvents.splice(t,1),this._valueEventFired=0===this._outstandingGeohashReadyEvents.length,this._valueEventFired&&this._fireReadyEventCallbacks()},e.prototype._listenForNewGeohashes=function(){var s=this,r=n(this._center,1e3*this._radius).map(this._queryToString);r=r.filter(function(e,t){return r.indexOf(e)===t}),Object.keys(this._currentGeohashesQueried).forEach(function(e){var t=r.indexOf(e);-1===t?s._currentGeohashesQueried[e].active=!1:(s._currentGeohashesQueried[e].active=!0,r.splice(t,1))}),!1===this._geohashCleanupScheduled&&25<Object.keys(this._currentGeohashesQueried).length&&(this._geohashCleanupScheduled=!0,this._cleanUpCurrentGeohashesQueriedTimeout=setTimeout(this._cleanUpCurrentGeohashesQueried,10)),this._outstandingGeohashReadyEvents=r.slice(),r.forEach(function(e){var t=s._stringToQuery(e),r=s._firebaseRef.orderByChild("g").startAt(t[0]).endAt(t[1]),n=r.on("child_added",function(e){return s._childAddedCallback(e)}),i=r.on("child_removed",function(e){return s._childRemovedCallback(e)}),a=r.on("child_changed",function(e){return s._childChangedCallback(e)}),o=r.on("value",function(){r.off("value",o),s._geohashQueryReadyCallback(e)});s._currentGeohashesQueried[e]={active:!0,childAddedCallback:n,childRemovedCallback:i,childChangedCallback:a,valueCallback:o}}),0===r.length&&this._geohashQueryReadyCallback()},e.prototype._queryToString=function(e){if(2!==e.length)throw new Error("Not a valid geohash query: "+e);return e[0]+":"+e[1]},e.prototype._removeLocation=function(e,t){var r=this._locationsTracked[e];if(delete this._locationsTracked[e],void 0!==r&&r.isInQuery){var n=t?Q(t,this._center):null;this._fireCallbacksForKey("key_exited",e,t,n)}},e.prototype._stringToQuery=function(e){var t=e.split(":");if(2!==t.length)throw new Error("Invalid internal state! Not a valid geohash query: "+e);return t},e.prototype._updateLocation=function(e,t){var r,n;v(t);var i=e in this._locationsTracked&&this._locationsTracked[e].isInQuery,a=e in this._locationsTracked?this._locationsTracked[e].location:null;n=(r=Q(t,this._center))<=this._radius,this._locationsTracked[e]={location:t,distanceFromCenter:r,isInQuery:n,geohash:p(t)},n&&!i?this._fireCallbacksForKey("key_entered",e,t,r):!n||null===a||t[0]===a[0]&&t[1]===a[1]?!n&&i&&this._fireCallbacksForKey("key_exited",e,t,r):this._fireCallbacksForKey("key_moved",e,t,r)},e}(),G=function(){function e(e){if(this._firebaseRef=e,"[object Object]"!==Object.prototype.toString.call(this._firebaseRef))throw new Error("firebaseRef must be an instance of Firebase")}return e.prototype.get=function(e){return s(e),this._firebaseRef.child(e).once("value").then(function(e){var t=e.val();return null===t?null:C(t)})},e.prototype.ref=function(){return this._firebaseRef},e.prototype.remove=function(e){return this.set(e,null)},e.prototype.set=function(e,t){var a;if("string"==typeof e&&0!==e.length)(a={})[e]=t;else{if("object"!=typeof e)throw new Error("keyOrLocations must be a string or a mapping of key - location pairs.");if(void 0!==t)throw new Error("The location argument should not be used if you pass an object to set().");a=e}var o={};return Object.keys(a).forEach(function(e){s(e);var t,r,n=a[e];if(null===n)o[e]=null;else{v(n);var i=p(n);o[e]=(r=i,v(t=n),b(r),{".priority":r,g:r,l:t})}}),this._firebaseRef.update(o)},e.prototype.query=function(e){return new E(this._firebaseRef,e)},e.distance=function(e,t){return Q(e,t)},e}();e.GeoCallbackRegistration=t,e.GeoFire=G,e.GeoQuery=E,Object.defineProperty(e,"__esModule",{value:!0})});
