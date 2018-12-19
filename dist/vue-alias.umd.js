(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueAlias = {})));
}(this, (function (exports) { 'use strict';

  var changeObjectKeys = function (object, replaces, remove) {
    if ( remove === void 0 ) remove = [];

    return Object.keys(object)
    .filter(function (key) { return !remove.includes(key); })
    .reduce(function (newObject, currentKey) {
      var obj;

      return (Object.assign({}, newObject,
      ( obj = {}, obj[replaces[currentKey] || currentKey] = object[currentKey], obj )));
    }, {});
  };

  var VueAlias = function VueAlias () {
    this._aliases = {};
  };

  VueAlias.prototype.component = function component (name, component$1) {
    this._aliases[name] = typeof component$1 === 'string' ? { component: component$1 } : component$1;
  };

  VueAlias.prototype.components = function components (components$1) {
    for (var name in components$1) {
      var component = components$1[name];
      this.component(name, component);
    }
  };

  VueAlias.prototype.getAlias = function getAlias (component) {
    return typeof component === 'string' && this._aliases[component]
  };

  VueAlias.prototype.process = function process (name, options) {
    var alias = this.getAlias(name);
    console.log(alias, name);
    if (alias) {
      name = alias.component;
      if (alias.replaces) {
        var props = options.props;
        props = changeObjectKeys(props, alias.replaces, ['component']);
        if (alias.props) {
          props = Object.assign({}, alias.props, props);
        }
        options.props = props;
      }
    }
    return name
  };

  VueAlias.prototype.wrapHandler = function wrapHandler (handler) {
      var this$1 = this;

    return function (name, options, children) {
      name = this$1.process(name, options);
      console.log(name, options);
      return handler(name, options, children)
    }
  };

  var defaultAliaser = null;

  var ensureAliaser = function () {
    if (!defaultAliaser) {
      defaultAliaser = new VueAlias();
    }
  };

  var alias = function (name, component) {
    ensureAliaser();
    defaultAlias.component(name, component);
  };

  var aliases = function (components) {
    ensureAliaser();
    defaultAliaser.components(components);
  };

  var wrapHandler = function (handler) {
    ensureAliaser();
    return defaultAliaser.wrapHandler(handler)
  };

  exports.default = VueAlias;
  exports.alias = alias;
  exports.aliases = aliases;
  exports.wrapHandler = wrapHandler;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
