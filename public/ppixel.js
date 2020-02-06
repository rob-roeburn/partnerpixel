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
  version: versionNumber
};

var isset = function isset(variable) {
  return typeof variable !== 'undefined' && variable !== null && variable !== '';
};

var now = function now() {
  return 1 * new Date();
};

var awsEndpoint
  = 'https://kdgif9n6ji.execute-api.eu-west-1.amazonaws.com/main';

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

var Pixel =
function () {
  function Pixel(event, timestamp, type) {
    _classCallCheck(this, Pixel);
    this.params = [];
    this.event = event;
    this.timestamp = timestamp;
    this.buildParams();
    this.sendToEndpoint(type);
  }

  _createClass(Pixel, [{
    key: "sendToEndpoint",
    value: function sendToEndpoint(type) {
//      console.log(type)
//      console.log(this)
//      let postdata={};
//  		console.log(postdata)
//  		let xhr = new XMLHttpRequest();
//  		xhr.open("POST", awsEndpoint+'/processData', true);
//      xhr.send(JSON.stringify({ payload: this }));
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
    key: "getAttribute",
    value: function getAttribute() {
      var _this = this;
      return {
        id:           function id()              { return Config.id;                                        }, // partner ID
        uid:          function uid()             { return 'uid_placeholder';                                }, // user Id
        ev:           function ev()              { return JSON.stringify(_this.event);                      }, // event being triggered
        ty:           function ty()              { return _this.type;                                       }, // event type
        v:            function v()               { return Config.version;                                   }, // openpixel.js version
        dl:           function dl()              { return window.location.href;                             }, // document location
        rl:           function rl()              { return document.referrer;                                }, // referrer location
        ts:           function ts()              { return _this.timestamp;                                  }, // timestamp when event was triggered
        de:           function de()              { return document.characterSet;                            }, // document encoding
        sr:           function sr()              { return window.screen.width + 'x' + window.screen.height; }, // screen resolution
        vp:           function vp()              { return window.innerWidth + 'x' + window.innerHeight;     }, // viewport size
        cd:           function cd()              { return window.screen.colorDepth;                         }, // color depth
        dt:           function dt()              { return document.title;                                   }, // document title
        tz:           function tz()              { return new Date().getTimezoneOffset();                   }, // timezone
        utm_source:   function utm_source(key)   { return 'utm_source';                                     }, // get the utm source
        utm_medium:   function utm_medium(key)   { return 'utm_medium';                                     }, // get the utm medium
        utm_term:     function utm_term(key)     { return 'utm_term';                                       }, // get the utm term
        utm_content:  function utm_content(key)  { return 'utm_content';                                    }, // get the utm content
        utm_campaign: function utm_campaign(key) { return 'utm_campaign';                                   }  // get the utm campaign
      };
    }
  }, {
    key: "setParam",
    value: function setParam(key, val) {
      if (isset(val)) {
        this.params.push("".concat(key, "=").concat(encodeURIComponent(val)));
      } else {
        this.params.push("".concat(key, "="));
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

// update the cookie if it exists, if it doesn't, create a new one, lasting 2 years  Cookie.set('uid', Cookie.get('uid'), 2 * 365 * 24 * 60) :
//Cookie.exists('uid') ?
//Cookie.set('uid', Cookie.get('uid'), 2 * 365 * 24 * 60) :
//Cookie.set('uid', guid()           , 2 * 365 * 24 * 60); // save any utms through as session cookies

//Cookie.setUtms(); // process the queue and future incoming commands


pixelFunc.process = function (method, value, type) {
//  console.log("Event firing")
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
  console.log("I loaded");
  if (typeof(Cookie.get('uid'))=='undefined') {
    console.log("There was no cookie for the UID value. Setting...");
  } else {
    console.log("There was a cookie for the UID value! It contained:");
    console.log(Cookie.get('uid'));
  }
  Cookie.set('uid','123', 0.05);
  console.log(Pixel.getAttribute);

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
