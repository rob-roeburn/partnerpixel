;(function(window, document, pixelFunc, pixelFuncName, pixelEndpoint, versionNumber) {
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
     _typeof = function _typeof(obj) {
        return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

var Config = {
  id: '',
  version: versionNumber,
  author: 'Rob PHI'
};

var awsEndpoint
  = 'https://g6z1iqwte3.execute-api.us-east-1.amazonaws.com/main';

var isset = function isset(variable) {
  return typeof variable !== 'undefined' && variable !== null && variable !== '';
};

var now = function now() {
  return 1 * new Date();
};

var Cookie = {
  prefix: function prefix() {
    return '__' + pixelFuncName + '_';
  },
  set: function set(name, value, minutes) {
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "/";
    var expires = "";

    if (isset(minutes)) {
      var date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = this.prefix() + name + "=" + value + expires + "; path=" + path + "; SameSite=Lax";
  },
  get: function get(name) {
    var name = this.prefix() + name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }

    return;
  },
  "delete": function _delete(name) {
    this.set(name, "", -100);
  },
  exists: function exists(name) {
    return isset(this.get(name));
  },
  setUtms: function setUtms() {
    var utmArray = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign'];
    var exists = false;

    for (var i = 0, l = utmArray.length; i < l; i++) {
      if (isset(Url.getParameterByName(utmArray[i]))) {
        exists = true;
        break;
      }
    }

    if (exists) {
      var val,
          save = {};

      for (var i = 0, l = utmArray.length; i < l; i++) {
        val = Url.getParameterByName(utmArray[i]);

        if (isset(val)) {
          save[utmArray[i]] = val;
        }
      }

      this.set('utm', JSON.stringify(save));
    }
  },
  getUtm: function getUtm(name) {
    if (this.exists('utm')) {
      var utms = JSON.parse(this.get('utm'));
      return name in utms ? utms[name] : "";
    }
  }
};

var Url = {
  getParameterByName: function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  externalHost: function externalHost(link) {
    return link.hostname != location.hostname && link.protocol.indexOf('http') === 0;
  }
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var Pixel =
function () {
  function Pixel(event, timestamp, type) {

    _classCallCheck(this, Pixel);
    this.params = [];
    this.event = event;
    this.timestamp = timestamp;
    this.buildParams();
    this.processEvent(event);
    this.urlParams = new URLSearchParams(window.location.search);
    let cookie_id="";
    if (typeof(Cookie.get('hap_sys'))=='undefined') {
      let cookie_id=uuidv4();
      Cookie.set('hap_sys', cookie_id, 60*24*365*2); // 2-year cookie expiry
      this.sendToEndpoint(event,type,cookie_id);
    } else {
      let cookie_id=Cookie.get('hap_sys');
      this.sendToEndpoint(event,type,cookie_id);
    }
  }

  _createClass(Pixel, [{
    key: "sendToEndpoint",
    value: function sendToEndpoint(event,type,cookie_id) {

      let hap_initial_origin, hap_conv_origin, pagename, action, paramname1, paramvalue1, paramname2, paramvalue2, paramname3, paramvalue3=" ";

      if(event=='pageload'){
        if (typeof(Cookie.get('hap_initial_origin'))=='undefined' || Cookie.get('hap_initial_origin')=='null' ) {
          //console.log("There was no cookie for the initial ETC value. Printing it and setting it to hap_initial_origin...");
          let urlParams = new URLSearchParams(window.location.search);
          hap_initial_origin=urlParams.get('origin');
        } else {
          //console.log("There was a cookie for the initial ETC value! It contained:");
          hap_initial_origin=Cookie.get('hap_initial_origin');
        }
        hap_conv_origin=" ";
        pagename=" ";
        action=" ";
        paramname1=" ";
        paramvalue1=" ";
        paramname2=" ";
        paramvalue2=" ";
        paramname3=" ";
        paramvalue3=" ";
      } else {
        if (typeof(Cookie.get('hap_initial_origin'))=='undefined') {
          //console.log("There was no cookie for the initial ETC value. Printing it but NOT setting it...");
          let urlParams = new URLSearchParams(window.location.search);
          hap_initial_origin=urlParams.get('origin');
        } else {
          //console.log("There was a cookie for the initial ETC value! It contained:");
          hap_initial_origin=Cookie.get('hap_initial_origin');
        }
        if (typeof(event)=='string') {
          if (event.toUpperCase()=='ADD_TO_CART') {
            pagename=event.PageName;
            action="Add to Cart Simple Action";
          }
          if (event.toUpperCase()=='COMPLETE_REGISTRATION') {
            pagename=event.PageName;
            action="Complete Registration Simple Action";
          }
          if (event.toUpperCase()=='LEAD') {
            pagename=event.PageName;
            action="Lead Simple Action";
          }
          if (event.toUpperCase()=='PURCHASE') {
            pagename=event.PageName;
            action="Purchase Simple Action";
          }
          if (event.toUpperCase()=='SCHEDULE') {
            pagename=event.PageName;
            action="Schedule Simple Action";
          }
          if (event.toUpperCase()=='SUBSCRIBE') {
            pagename=event.PageName;
            action="Subscribe Simple Action";
          }
          if (event.toUpperCase()=='VIEW_CONTENT') {
            pagename=event.PageName;
            action="View content Simple Action";
          }
        } else if(typeof(event)=='object') {
          if (event.Action != null) {
            action=event.Action
          } else if (event.CustomEvent != null) {
            action=event.CustomEvent
          }
          hap_conv_origin=event.hap_origin_con;
          pagename=event.PageName;
          paramname1=event.ParamName1;
          paramvalue1=event.ParamValue1;
          paramname2=event.ParamName2;
          paramvalue2=event.ParamValue2;
          paramname3=event.ParamName3;
          paramvalue3=event.ParamValue3;
        }
      }
      let postdata={};
      postdata.type=type;
      postdata.part_id=Config.id;                 // Partner ID:
      postdata.hap_origin_ini=hap_initial_origin; // Check cookie contains an initial ETC, grab it and send
      postdata.hap_origin_con=hap_conv_origin;    // Check cookie contains a conversion ETC, grab it and send
      postdata.hap_sys=cookie_id;                 // Check cookie contains a cookie UUID, grab it and send
      postdata.PageName=pagename;
      postdata.Action=action;
      postdata.ParamName1=paramname1;
      postdata.ParamValue1=paramvalue1;
      postdata.ParamName2=paramname2;
      postdata.ParamValue2=paramvalue2;
      postdata.ParamName3=paramname3;
      postdata.ParamValue3=paramvalue3;
      let pprex = /dar_pregnancy/g;
      let bprex = /dar_baby/g;
      if (postdata.hap_origin_ini==null || typeof(postdata.hap_origin_ini)=='undefined') {
        postdata.hap_origin_ini=''
      }
      if (postdata.hap_origin_con==null || typeof(postdata.hap_origin_con)=='undefined') {
        postdata.hap_origin_con=''
      }
      if (postdata.PageName==(null||' ') || typeof(postdata.PageName)=='undefined') {
        postdata.PageName=window.location.origin+window.location.pathname
      }
      if (
        postdata.hap_origin_ini.match(pprex) ||
        postdata.hap_origin_con.match(pprex) ||
        postdata.hap_origin_ini.match(bprex) ||
        postdata.hap_origin_con.match(bprex)
      ) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", awsEndpoint+'/ppix', true);
        xhr.send(JSON.stringify({ payload: postdata }));
      }
    }
  }, {
    key: "buildParams",
    value: function buildParams() {
      var attr = this.getAttribute();
      for (var index in attr) {
        if (attr.hasOwnProperty(index)) {
          this.setParam(index, attr[index](index));
        }
      }
    }
  }, {
    key: "processEvent",
    value: function processEvent(eventData) {
      Config.etc=eventData;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute() {
      var _this = this;
      return {
        id:           function id()              { return Config.id;                                        },  // partner ID
        uid:          function uid()             { return 'uid_placeholder';                                },  // user Id
        ev:           function ev()              { return JSON.stringify(_this.event);                      },  // event being triggered
        ty:           function ty()              { return _this.type;                                       },  // event type
        v:            function v()               { return Config.version;                                   },  // openpixel.js version
        dl:           function dl()              { return window.location.href;                             },  // document location
        rl:           function rl()              { return document.referrer;                                },  // referrer location
        ts:           function ts()              { return _this.timestamp;                                  },  // timestamp when event was triggered
        de:           function de()              { return document.characterSet;                            },  // document encoding
        sr:           function sr()              { return window.screen.width + 'x' + window.screen.height; },  // screen resolution
        vp:           function vp()              { return window.innerWidth + 'x' + window.innerHeight;     },  // viewport size
        cd:           function cd()              { return window.screen.colorDepth;                         },  // color depth
        dt:           function dt()              { return document.title;                                   },  // document title
        tz:           function tz()              { return new Date().getTimezoneOffset();                   },  // timezone
        utm_source:   function utm_source(key)   { return 'utm_source';                                     },  // get the utm source
        utm_medium:   function utm_medium(key)   { return 'utm_medium';                                     },  // get the utm medium
        utm_term:     function utm_term(key)     { return 'utm_term';                                       },  // get the utm term
        utm_content:  function utm_content(key)  { return 'utm_content';                                    },  // get the utm content
        utm_campaign: function utm_campaign(key) { return 'utm_campaign';                                   }   // get the utm campaign
      };
    }
  }, {
    key: "setParam",
    value: function setParam(key, val) {
      if (isset(val)) {
        this.params[key]=encodeURIComponent(val);
      } else {
        this.params[key]=encodeURIComponent(val);
      }
    }
  }, {
    key: "getSourceUrl",
    value: function getSourceUrl() {
      return "".concat(pixelEndpoint, "?").concat(this.params.join('&'));
    }
  }]);

  return Pixel;
}();


pixelFunc.process = function (method, value, type) {
  if (method == 'init') {
    Config.id = value;
  } else if (method == 'event') {
    if (value == 'pageload' && !Config.pageLoadOnce) {
      Config.pageLoadOnce = true;
      new Pixel(value, pixelFunc.t, value);
    } else if (value != 'pageload' && value != 'pageclose') {
      new Pixel(value, now(), method);
    }
  }
};

for (var i = 0, l = pixelFunc.queue.length; i < l; i++) {
  pixelFunc.process.apply(pixelFunc, pixelFunc.queue[i]);
}

window.addEventListener('unload', function () {
  if (!Config.pageCloseOnce) {
    Config.pageCloseOnce = true;

    new Pixel('pageclose', now(), function () {
      if (isset(Config.externalHost) && now() - Config.externalHost.time < 5 * 1000) {
        return Config.externalHost.link;
      }
    });
  }
});

window.onload = function () {

  if (typeof(Cookie.get('part_id'))=='undefined') {
    //console.log("There was no cookie for the partner ID value. Setting...");
    Cookie.set('part_id', Config.id, 60*24*365*2); // 2-year cookie expiry
  } else {
    //console.log("There was a cookie for the partner ID value! It contained:");
    //console.log(Cookie.get('part_id'));
  }

  if (typeof(Cookie.get('hap_initial_origin'))=='undefined' || Cookie.get('hap_initial_origin')=='null' ) {
    //console.log("There was no cookie for the initial ETC value. Setting...");
    let urlParams = new URLSearchParams(window.location.search);
    Cookie.set('hap_initial_origin', urlParams.get('origin'), 60*24*365*2); // 2-year cookie expiry
  } else {
    //console.log("There was a cookie for the initial ETC value! It contained:");
    //console.log(Cookie.get('hap_initial_origin'));
  }

  var aTags = document.getElementsByTagName('a');

  for (var i = 0, l = aTags.length; i < l; i++) {
    aTags[i].addEventListener('click', function (e) {
      if (Url.externalHost(this)) {
        Config.externalHost = {
          link: this.href,
          time: now()
        };
      }
    }.bind(aTags[i]));
  }
};
}(window, document, window["ppix"], "ppix", "ppixel.gif", 1));
