(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FormAtoms = {}, global.React));
})(this, (function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _regeneratorRuntime() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

    _regeneratorRuntime = function () {
      return exports;
    };

    var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }

    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
      return generator._invoke = function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");

          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }

          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);

            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }

            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    exports.wrap = wrap;
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if ("throw" !== record.type) {
          var result = record.arg,
              value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }

        reject(record.arg);
      }

      var previousPromise;

      this._invoke = function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

            return next.value = undefined, next.done = !0, next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }

    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (object) {
      var keys = [];

      for (var key in object) keys.push(key);

      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }

        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;

        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
              record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);

    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var createContext = React__default["default"].createContext,
      useState = React__default["default"].useState,
      useEffect = React__default["default"].useEffect,
      useRef = React__default["default"].useRef,
      createElement = React__default["default"].createElement,
      useContext$1 = React__default["default"].useContext,
      useReducer = React__default["default"].useReducer,
      useDebugValue = React__default["default"].useDebugValue,
      useCallback = React__default["default"].useCallback;
  var SUSPENSE_PROMISE = /*#__PURE__*/Symbol();

  var isSuspensePromise = function isSuspensePromise(promise) {
    return !!promise[SUSPENSE_PROMISE];
  };

  var isSuspensePromiseAlreadyCancelled = function isSuspensePromiseAlreadyCancelled(suspensePromise) {
    return !suspensePromise[SUSPENSE_PROMISE].c;
  };

  var cancelSuspensePromise = function cancelSuspensePromise(suspensePromise) {
    var _a, _b;

    (_b = (_a = suspensePromise[SUSPENSE_PROMISE]).c) == null ? void 0 : _b.call(_a);
  };

  var isEqualSuspensePromise = function isEqualSuspensePromise(oldSuspensePromise, newSuspensePromise) {
    var oldOriginalPromise = oldSuspensePromise[SUSPENSE_PROMISE].o;
    var newOriginalPromise = newSuspensePromise[SUSPENSE_PROMISE].o;
    return oldOriginalPromise === newOriginalPromise || oldSuspensePromise === newOriginalPromise || isSuspensePromise(oldOriginalPromise) && isEqualSuspensePromise(oldOriginalPromise, newSuspensePromise);
  };

  var createSuspensePromise = function createSuspensePromise(promise) {
    var objectToAttach = {
      o: promise,
      c: null
    };
    var suspensePromise = new Promise(function (resolve) {
      objectToAttach.c = function () {
        objectToAttach.c = null;
        resolve();
      };

      promise.then(objectToAttach.c, objectToAttach.c);
    });
    suspensePromise[SUSPENSE_PROMISE] = objectToAttach;
    return suspensePromise;
  };

  var hasInitialValue = function hasInitialValue(atom) {
    return "init" in atom;
  };

  var READ_ATOM = "r";
  var WRITE_ATOM = "w";
  var COMMIT_ATOM = "c";
  var SUBSCRIBE_ATOM = "s";
  var RESTORE_ATOMS$1 = "h";
  var DEV_SUBSCRIBE_STATE = "n";
  var DEV_GET_MOUNTED_ATOMS = "l";
  var DEV_GET_ATOM_STATE = "a";
  var DEV_GET_MOUNTED = "m";

  function _canUnmountAtom(atom, mounted) {
    return !mounted.l.size && (!mounted.t.size || mounted.t.size === 1 && mounted.t.has(atom));
  }

  function _isActuallyWritableAt(atom) {
    return !!atom.write;
  }

  function _ref15(listener) {
    return listener();
  }

  function _ref17(l) {
    return l();
  }

  var createStore = function createStore(initialValues) {
    var committedAtomStateMap = /* @__PURE__ */new WeakMap();
    var mountedMap = /* @__PURE__ */new WeakMap();
    var pendingMap = /* @__PURE__ */new Map();
    var stateListeners;
    var mountedAtoms;

    if ((undefined && undefined.MODE) !== "production") {
      stateListeners = /* @__PURE__ */new Set();
      mountedAtoms = /* @__PURE__ */new Set();
    }

    if (initialValues) {
      for (var _iterator = _createForOfIteratorHelperLoose(initialValues), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
            _atom2 = _step$value[0],
            value = _step$value[1];
        var atomState = {
          v: value,
          r: 0,
          y: true,
          d: /* @__PURE__ */new Map()
        };

        if ((undefined && undefined.MODE) !== "production") {
          Object.freeze(atomState);

          if (!hasInitialValue(_atom2)) {
            console.warn("Found initial value for derived atom which can cause unexpected behavior", _atom2);
          }
        }

        committedAtomStateMap.set(_atom2, atomState);
      }
    }

    var suspensePromiseCacheMap = /* @__PURE__ */new WeakMap();

    var addSuspensePromiseToCache = function addSuspensePromiseToCache(version, atom, suspensePromise) {
      var cache = suspensePromiseCacheMap.get(atom);

      if (!cache) {
        cache = /* @__PURE__ */new Map();
        suspensePromiseCacheMap.set(atom, cache);
      }

      suspensePromise.then(function () {
        if (cache.get(version) === suspensePromise) {
          cache.delete(version);

          if (!cache.size) {
            suspensePromiseCacheMap.delete(atom);
          }
        }
      });
      cache.set(version, suspensePromise);
    };

    var cancelAllSuspensePromiseInCache = function cancelAllSuspensePromiseInCache(atom) {
      var versionSet = /* @__PURE__ */new Set();
      var cache = suspensePromiseCacheMap.get(atom);

      function _ref4(suspensePromise, version) {
        cancelSuspensePromise(suspensePromise);
        versionSet.add(version);
      }

      if (cache) {
        suspensePromiseCacheMap.delete(atom);
        cache.forEach(_ref4);
      }

      return versionSet;
    };

    var versionedAtomStateMapMap = /* @__PURE__ */new WeakMap();

    var getVersionedAtomStateMap = function getVersionedAtomStateMap(version) {
      var versionedAtomStateMap = versionedAtomStateMapMap.get(version);

      if (!versionedAtomStateMap) {
        versionedAtomStateMap = /* @__PURE__ */new Map();
        versionedAtomStateMapMap.set(version, versionedAtomStateMap);
      }

      return versionedAtomStateMap;
    };

    var getAtomState = function getAtomState(version, atom) {
      if (version) {
        var versionedAtomStateMap = getVersionedAtomStateMap(version);

        var _atomState = versionedAtomStateMap.get(atom);

        if (!_atomState) {
          _atomState = getAtomState(version.p, atom);

          if (_atomState) {
            versionedAtomStateMap.set(atom, _atomState);
          }
        }

        return _atomState;
      }

      return committedAtomStateMap.get(atom);
    };

    var setAtomState = function setAtomState(version, atom, atomState) {
      if ((undefined && undefined.MODE) !== "production") {
        Object.freeze(atomState);
      }

      if (version) {
        var versionedAtomStateMap = getVersionedAtomStateMap(version);
        versionedAtomStateMap.set(atom, atomState);
      } else {
        var prevAtomState = committedAtomStateMap.get(atom);
        committedAtomStateMap.set(atom, atomState);

        if (!pendingMap.has(atom)) {
          pendingMap.set(atom, prevAtomState);
        }
      }
    };

    var createReadDependencies = function createReadDependencies(version, prevReadDependencies, dependencies) {
      if (prevReadDependencies === void 0) {
        prevReadDependencies = /* @__PURE__ */new Map();
      }

      if (!dependencies) {
        return prevReadDependencies;
      }

      var readDependencies = /* @__PURE__ */new Map();
      var changed = false;
      dependencies.forEach(function (atom) {
        var _a;

        var revision = ((_a = getAtomState(version, atom)) == null ? void 0 : _a.r) || 0;
        readDependencies.set(atom, revision);

        if (prevReadDependencies.get(atom) !== revision) {
          changed = true;
        }
      });

      if (prevReadDependencies.size === readDependencies.size && !changed) {
        return prevReadDependencies;
      }

      return readDependencies;
    };

    var setAtomValue = function setAtomValue(version, atom, value, dependencies, suspensePromise) {
      var atomState = getAtomState(version, atom);

      if (atomState) {
        if (suspensePromise && (!("p" in atomState) || !isEqualSuspensePromise(atomState.p, suspensePromise))) {
          return atomState;
        }

        if ("p" in atomState) {
          cancelSuspensePromise(atomState.p);
        }
      }

      var nextAtomState = {
        v: value,
        r: (atomState == null ? void 0 : atomState.r) || 0,
        y: true,
        d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
      };
      var changed = !(atomState == null ? void 0 : atomState.y);

      function _ref5() {
        flushPending(version);
      }

      if (!atomState || !("v" in atomState) || !Object.is(atomState.v, value)) {
        changed = true;
        ++nextAtomState.r;

        if (nextAtomState.d.has(atom)) {
          nextAtomState.d = new Map(nextAtomState.d).set(atom, nextAtomState.r);
        }
      } else if (nextAtomState.d !== atomState.d && (nextAtomState.d.size !== atomState.d.size || !Array.from(nextAtomState.d.keys()).every(function (a) {
        return atomState.d.has(a);
      }))) {
        changed = true;
        Promise.resolve().then(_ref5);
      }

      if (atomState && !changed) {
        return atomState;
      }

      setAtomState(version, atom, nextAtomState);
      return nextAtomState;
    };

    var setAtomReadError = function setAtomReadError(version, atom, error, dependencies, suspensePromise) {
      var atomState = getAtomState(version, atom);

      if (atomState) {
        if (suspensePromise && (!("p" in atomState) || !isEqualSuspensePromise(atomState.p, suspensePromise))) {
          return atomState;
        }

        if ("p" in atomState) {
          cancelSuspensePromise(atomState.p);
        }
      }

      var nextAtomState = {
        e: error,
        r: ((atomState == null ? void 0 : atomState.r) || 0) + 1,
        y: true,
        d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
      };
      setAtomState(version, atom, nextAtomState);
      return nextAtomState;
    };

    var setAtomSuspensePromise = function setAtomSuspensePromise(version, atom, suspensePromise, dependencies) {
      var atomState = getAtomState(version, atom);

      if (atomState && "p" in atomState) {
        if (isEqualSuspensePromise(atomState.p, suspensePromise)) {
          if (!atomState.y) {
            return _objectSpread2(_objectSpread2({}, atomState), {}, {
              y: true
            });
          }

          return atomState;
        }

        cancelSuspensePromise(atomState.p);
      }

      addSuspensePromiseToCache(version, atom, suspensePromise);
      var nextAtomState = {
        p: suspensePromise,
        r: ((atomState == null ? void 0 : atomState.r) || 0) + 1,
        y: true,
        d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
      };
      setAtomState(version, atom, nextAtomState);
      return nextAtomState;
    };

    var setAtomPromiseOrValue = function setAtomPromiseOrValue(version, atom, promiseOrValue, dependencies) {
      function _ref6() {
        readAtomState(version, atom, true);
      }

      if (promiseOrValue instanceof Promise) {
        var suspensePromise = createSuspensePromise(promiseOrValue.then(function (value) {
          setAtomValue(version, atom, value, dependencies, suspensePromise);
        }).catch(function (e) {
          if (e instanceof Promise) {
            if (isSuspensePromise(e)) {
              return e.then(_ref6);
            }

            return e;
          }

          setAtomReadError(version, atom, e, dependencies, suspensePromise);
        }));
        return setAtomSuspensePromise(version, atom, suspensePromise, dependencies);
      }

      return setAtomValue(version, atom, promiseOrValue, dependencies);
    };

    var setAtomInvalidated = function setAtomInvalidated(version, atom) {
      var atomState = getAtomState(version, atom);

      if (atomState) {
        var nextAtomState = _objectSpread2(_objectSpread2({}, atomState), {}, {
          y: false
        });

        setAtomState(version, atom, nextAtomState);
      } else if ((undefined && undefined.MODE) !== "production") {
        console.warn("[Bug] could not invalidate non existing atom", atom);
      }
    };

    var readAtomState = function readAtomState(version, atom, force) {
      function _ref7(_, a) {
        if (a !== atom) {
          if (!mountedMap.has(a)) {
            readAtomState(version, a);
          } else {
            var aState = getAtomState(version, a);

            if (aState && !aState.y) {
              readAtomState(version, a);
            }
          }
        }
      }

      function _ref8(_ref) {
        var a = _ref[0],
            r = _ref[1];
        var aState = getAtomState(version, a);
        return aState && !("p" in aState) && aState.r === r;
      }

      if (!force) {
        var _atomState2 = getAtomState(version, atom);

        if (_atomState2) {
          if (_atomState2.y && "p" in _atomState2 && !isSuspensePromiseAlreadyCancelled(_atomState2.p)) {
            return _atomState2;
          }

          _atomState2.d.forEach(_ref7);

          if (Array.from(_atomState2.d).every(_ref8)) {
            if (!_atomState2.y) {
              return _objectSpread2(_objectSpread2({}, _atomState2), {}, {
                y: true
              });
            }

            return _atomState2;
          }
        }
      }

      var dependencies = /* @__PURE__ */new Set();

      function _ref9(a) {
        dependencies.add(a);
        var aState = a === atom ? getAtomState(version, a) : readAtomState(version, a);

        if (aState) {
          if ("e" in aState) {
            throw aState.e;
          }

          if ("p" in aState) {
            throw aState.p;
          }

          return aState.v;
        }

        if (hasInitialValue(a)) {
          return a.init;
        }

        throw new Error("no atom init");
      }

      try {
        var promiseOrValue = atom.read(_ref9);
        return setAtomPromiseOrValue(version, atom, promiseOrValue, dependencies);
      } catch (errorOrPromise) {
        if (errorOrPromise instanceof Promise) {
          var suspensePromise = createSuspensePromise(errorOrPromise);
          return setAtomSuspensePromise(version, atom, suspensePromise, dependencies);
        }

        return setAtomReadError(version, atom, errorOrPromise, dependencies);
      }
    };

    var readAtom = function readAtom(readingAtom, version) {
      var atomState = readAtomState(version, readingAtom);
      return atomState;
    };

    var addAtom = function addAtom(version, addingAtom) {
      var mounted = mountedMap.get(addingAtom);

      if (!mounted) {
        mounted = mountAtom(version, addingAtom);
      }

      return mounted;
    };

    var canUnmountAtom = _canUnmountAtom;

    var delAtom = function delAtom(version, deletingAtom) {
      var mounted = mountedMap.get(deletingAtom);

      if (mounted && canUnmountAtom(deletingAtom, mounted)) {
        unmountAtom(version, deletingAtom);
      }
    };

    var invalidateDependents = function invalidateDependents(version, atom) {
      var mounted = mountedMap.get(atom);
      mounted == null ? void 0 : mounted.t.forEach(function (dependent) {
        if (dependent !== atom) {
          setAtomInvalidated(version, dependent);
          invalidateDependents(version, dependent);
        }
      });
    };

    var writeAtomState = function writeAtomState(version, atom, update) {
      var isSync = true;

      var writeGetter = function writeGetter(a, options) {
        var aState = readAtomState(version, a);

        if ("e" in aState) {
          throw aState.e;
        }

        function _ref10() {
          return writeGetter(a, options);
        }

        if ("p" in aState) {
          if (options == null ? void 0 : options.unstable_promise) {
            return aState.p.then(_ref10);
          }

          if ((undefined && undefined.MODE) !== "production") {
            console.info("Reading pending atom state in write operation. We throw a promise for now.", a);
          }

          throw aState.p;
        }

        if ("v" in aState) {
          return aState.v;
        }

        if ((undefined && undefined.MODE) !== "production") {
          console.warn("[Bug] no value found while reading atom in write operation. This is probably a bug.", a);
        }

        throw new Error("no value found");
      };

      var setter = function setter(a, v) {
        var promiseOrVoid2;

        function _ref11(cancelledVersion) {
          if (cancelledVersion !== version) {
            setAtomPromiseOrValue(cancelledVersion, a, v);
          }
        }

        if (a === atom) {
          if (!hasInitialValue(a)) {
            throw new Error("atom not writable");
          }

          var versionSet = cancelAllSuspensePromiseInCache(a);
          versionSet.forEach(_ref11);
          var prevAtomState = getAtomState(version, a);
          var nextAtomState = setAtomPromiseOrValue(version, a, v);

          if (prevAtomState !== nextAtomState) {
            invalidateDependents(version, a);
          }
        } else {
          promiseOrVoid2 = writeAtomState(version, a, v);
        }

        if (!isSync) {
          flushPending(version);
        }

        return promiseOrVoid2;
      };

      var promiseOrVoid = atom.write(writeGetter, setter, update);
      isSync = false;
      return promiseOrVoid;
    };

    var writeAtom = function writeAtom(writingAtom, update, version) {
      var promiseOrVoid = writeAtomState(version, writingAtom, update);
      flushPending(version);
      return promiseOrVoid;
    };

    var isActuallyWritableAtom = _isActuallyWritableAt;

    var mountAtom = function mountAtom(version, atom, initialDependent) {
      var mounted = {
        t: new Set(initialDependent && [initialDependent]),
        l: /* @__PURE__ */new Set()
      };
      mountedMap.set(atom, mounted);

      if ((undefined && undefined.MODE) !== "production") {
        mountedAtoms.add(atom);
      }

      var atomState = readAtomState(void 0, atom);
      atomState.d.forEach(function (_, a) {
        var aMounted = mountedMap.get(a);

        if (aMounted) {
          aMounted.t.add(atom);
        } else {
          if (a !== atom) {
            mountAtom(version, a, atom);
          }
        }
      });

      function _setAtom(update) {
        return writeAtom(atom, update, version);
      }

      if (isActuallyWritableAtom(atom) && atom.onMount) {
        var setAtom = _setAtom;
        var onUnmount = atom.onMount(setAtom);
        version = void 0;

        if (onUnmount) {
          mounted.u = onUnmount;
        }
      }

      return mounted;
    };

    var unmountAtom = function unmountAtom(version, atom) {
      var _a;

      var onUnmount = (_a = mountedMap.get(atom)) == null ? void 0 : _a.u;

      if (onUnmount) {
        onUnmount();
      }

      mountedMap.delete(atom);

      if ((undefined && undefined.MODE) !== "production") {
        mountedAtoms.delete(atom);
      }

      var atomState = getAtomState(version, atom);

      function _ref12(_, a) {
        if (a !== atom) {
          var mounted = mountedMap.get(a);

          if (mounted) {
            mounted.t.delete(atom);

            if (canUnmountAtom(a, mounted)) {
              unmountAtom(version, a);
            }
          }
        }
      }

      if (atomState) {
        atomState.d.forEach(_ref12);
      } else if ((undefined && undefined.MODE) !== "production") {
        console.warn("[Bug] could not find atom state to unmount", atom);
      }
    };

    var mountDependencies = function mountDependencies(version, atom, atomState, prevReadDependencies) {
      var dependencies = new Set(atomState.d.keys());
      prevReadDependencies == null ? void 0 : prevReadDependencies.forEach(function (_, a) {
        if (dependencies.has(a)) {
          dependencies.delete(a);
          return;
        }

        var mounted = mountedMap.get(a);

        if (mounted) {
          mounted.t.delete(atom);

          if (canUnmountAtom(a, mounted)) {
            unmountAtom(version, a);
          }
        }
      });
      dependencies.forEach(function (a) {
        var mounted = mountedMap.get(a);

        if (mounted) {
          mounted.t.add(atom);
        } else if (mountedMap.has(atom)) {
          mountAtom(version, a, atom);
        }
      });
    };

    function _ref16(_ref2) {
      var atom = _ref2[0],
          prevAtomState = _ref2[1];
      var atomState = getAtomState(void 0, atom);

      if (atomState && atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
        mountDependencies(void 0, atom, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
      }

      if (prevAtomState && !prevAtomState.y && (atomState == null ? void 0 : atomState.y)) {
        return;
      }

      var mounted = mountedMap.get(atom);
      mounted == null ? void 0 : mounted.l.forEach(_ref15);
    }

    var flushPending = function flushPending(version) {
      function _ref13(listener) {
        return listener(version);
      }

      function _ref14(atomState, atom) {
        var committedAtomState = committedAtomStateMap.get(atom);

        if (atomState !== committedAtomState) {
          var mounted = mountedMap.get(atom);
          mounted == null ? void 0 : mounted.l.forEach(_ref13);
        }
      }

      if (version) {
        var versionedAtomStateMap = getVersionedAtomStateMap(version);
        versionedAtomStateMap.forEach(_ref14);
        return;
      }

      while (pendingMap.size) {
        var pending = Array.from(pendingMap);
        pendingMap.clear();
        pending.forEach(_ref16);
      }

      if ((undefined && undefined.MODE) !== "production") {
        stateListeners.forEach(_ref17);
      }
    };

    var commitVersionedAtomStateMap = function commitVersionedAtomStateMap(version) {
      var versionedAtomStateMap = getVersionedAtomStateMap(version);
      versionedAtomStateMap.forEach(function (atomState, atom) {
        var prevAtomState = committedAtomStateMap.get(atom);

        if (!prevAtomState || atomState.r > prevAtomState.r || atomState.y !== prevAtomState.y || atomState.r === prevAtomState.r && atomState.d !== prevAtomState.d) {
          committedAtomStateMap.set(atom, atomState);

          if (atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
            mountDependencies(version, atom, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
          }
        }
      });
    };

    var commitAtom = function commitAtom(_atom, version) {
      if (version) {
        commitVersionedAtomStateMap(version);
      }

      flushPending(void 0);
    };

    var subscribeAtom = function subscribeAtom(atom, callback, version) {
      var mounted = addAtom(version, atom);
      var listeners = mounted.l;
      listeners.add(callback);
      return function () {
        listeners.delete(callback);
        delAtom(version, atom);
      };
    };

    var restoreAtoms = function restoreAtoms(values, version) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(values), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
            _atom3 = _step2$value[0],
            _value = _step2$value[1];

        if (hasInitialValue(_atom3)) {
          setAtomPromiseOrValue(version, _atom3, _value);
          invalidateDependents(version, _atom3);
        }
      }

      flushPending(version);
    };

    function _ref18(l) {
      stateListeners.add(l);
      return function () {
        stateListeners.delete(l);
      };
    }

    function _ref19() {
      return mountedAtoms.values();
    }

    function _ref20(a) {
      return committedAtomStateMap.get(a);
    }

    function _ref21(a) {
      return mountedMap.get(a);
    }

    if ((undefined && undefined.MODE) !== "production") {
      return {
        [READ_ATOM]: readAtom,
        [WRITE_ATOM]: writeAtom,
        [COMMIT_ATOM]: commitAtom,
        [SUBSCRIBE_ATOM]: subscribeAtom,
        [RESTORE_ATOMS$1]: restoreAtoms,
        [DEV_SUBSCRIBE_STATE]: _ref18,
        [DEV_GET_MOUNTED_ATOMS]: _ref19,
        [DEV_GET_ATOM_STATE]: _ref20,
        [DEV_GET_MOUNTED]: _ref21
      };
    }

    return {
      [READ_ATOM]: readAtom,
      [WRITE_ATOM]: writeAtom,
      [COMMIT_ATOM]: commitAtom,
      [SUBSCRIBE_ATOM]: subscribeAtom,
      [RESTORE_ATOMS$1]: restoreAtoms
    };
  };

  var createScopeContainer = function createScopeContainer(initialValues, unstable_createStore) {
    var store = unstable_createStore ? unstable_createStore(initialValues).SECRET_INTERNAL_store : createStore(initialValues);
    return {
      s: store
    };
  };

  var ScopeContextMap = /* @__PURE__ */new Map();

  var getScopeContext = function getScopeContext(scope) {
    if (!ScopeContextMap.has(scope)) {
      ScopeContextMap.set(scope, createContext(createScopeContainer()));
    }

    return ScopeContextMap.get(scope);
  };

  var Provider = function Provider(_ref3) {
    var children = _ref3.children,
        initialValues = _ref3.initialValues,
        scope = _ref3.scope,
        unstable_createStore = _ref3.unstable_createStore,
        unstable_enableVersionedWrite = _ref3.unstable_enableVersionedWrite;

    var _useState = useState({}),
        version = _useState[0],
        setVersion = _useState[1];

    useEffect(function () {
      var scopeContainer = scopeContainerRef.current;

      if (scopeContainer.w) {
        scopeContainer.s[COMMIT_ATOM](null, version);
        delete version.p;
        scopeContainer.v = version;
      }
    }, [version]);
    var scopeContainerRef = useRef();

    if (!scopeContainerRef.current) {
      var scopeContainer = createScopeContainer(initialValues, unstable_createStore);

      if (unstable_enableVersionedWrite) {
        var retrying = 0;

        scopeContainer.w = function (write) {
          setVersion(function (parentVersion) {
            var nextVersion = retrying ? parentVersion : {
              p: parentVersion
            };
            write(nextVersion);
            return nextVersion;
          });
        };

        scopeContainer.v = version;

        scopeContainer.r = function (fn) {
          ++retrying;
          fn();
          --retrying;
        };
      }

      scopeContainerRef.current = scopeContainer;
    }

    var ScopeContainerContext = getScopeContext(scope);
    return createElement(ScopeContainerContext.Provider, {
      value: scopeContainerRef.current
    }, children);
  };

  var keyCount = 0;

  function atom(read, write) {
    var key = "atom" + ++keyCount;
    var config = {
      toString: function toString() {
        return key;
      }
    };

    function _ref23(get) {
      return get(config);
    }

    function _ref24(get, set, update) {
      return set(config, typeof update === "function" ? update(get(config)) : update);
    }

    if (typeof read === "function") {
      config.read = read;
    } else {
      config.init = read;
      config.read = _ref23;
      config.write = _ref24;
    }

    if (write) {
      config.write = write;
    }

    return config;
  }

  function useAtomValue(atom, scope) {
    var ScopeContext = getScopeContext(scope);
    var scopeContainer = useContext$1(ScopeContext);
    var store = scopeContainer.s,
        versionFromProvider = scopeContainer.v;

    var getAtomValue = function getAtomValue(version2) {
      var atomState = store[READ_ATOM](atom, version2);

      if ((undefined && undefined.MODE) !== "production" && !atomState.y) {
        throw new Error("should not be invalidated");
      }

      if ("e" in atomState) {
        throw atomState.e;
      }

      if ("p" in atomState) {
        throw atomState.p;
      }

      if ("v" in atomState) {
        return atomState.v;
      }

      throw new Error("no atom value");
    };

    var _useReducer = useReducer(function (prev, nextVersion) {
      var nextValue = getAtomValue(nextVersion);

      if (Object.is(prev[1], nextValue) && prev[2] === atom) {
        return prev;
      }

      return [nextVersion, nextValue, atom];
    }, versionFromProvider, function (initialVersion) {
      var initialValue = getAtomValue(initialVersion);
      return [initialVersion, initialValue, atom];
    }),
        _useReducer$ = _useReducer[0],
        version = _useReducer$[0],
        valueFromReducer = _useReducer$[1],
        atomFromReducer = _useReducer$[2],
        rerenderIfChanged = _useReducer[1];

    var value = valueFromReducer;

    if (atomFromReducer !== atom) {
      rerenderIfChanged(version);
      value = getAtomValue(version);
    }

    useEffect(function () {
      var versionFromProvider2 = scopeContainer.v;

      if (versionFromProvider2) {
        store[COMMIT_ATOM](atom, versionFromProvider2);
      }

      var unsubscribe = store[SUBSCRIBE_ATOM](atom, rerenderIfChanged, versionFromProvider2);
      rerenderIfChanged(versionFromProvider2);
      return unsubscribe;
    }, [store, atom, scopeContainer]);
    useEffect(function () {
      store[COMMIT_ATOM](atom, version);
    });
    useDebugValue(value);
    return value;
  }

  function useSetAtom(atom, scope) {
    var ScopeContext = getScopeContext(scope);

    var _useContext = useContext$1(ScopeContext),
        store = _useContext.s,
        versionedWrite = _useContext.w;

    var setAtom = useCallback(function (update) {
      if ((undefined && undefined.MODE) !== "production" && !("write" in atom)) {
        throw new Error("not writable atom");
      }

      var write = function write(version) {
        return store[WRITE_ATOM](atom, update, version);
      };

      return versionedWrite ? versionedWrite(write) : write();
    }, [store, versionedWrite, atom]);
    return setAtom;
  }

  function useAtom(atom, scope) {
    if ("scope" in atom) {
      console.warn("atom.scope is deprecated. Please do useAtom(atom, scope) instead.");
      scope = atom.scope;
    }

    return [useAtomValue(atom, scope), useSetAtom(atom, scope)];
  }

  var useContext = React__default["default"].useContext;
  var RESET = /*#__PURE__*/Symbol();

  function atomWithReset(initialValue) {
    var anAtom = atom(initialValue, function (get, set, update) {
      if (update === RESET) {
        set(anAtom, initialValue);
      } else {
        set(anAtom, typeof update === "function" ? update(get(anAtom)) : update);
      }
    });
    return anAtom;
  }
  var RESTORE_ATOMS = "h";

  var hydratedMap = /* @__PURE__ */new WeakMap();

  function useHydrateAtoms(values, scope) {
    var ScopeContext = getScopeContext(scope);
    var scopeContainer = useContext(ScopeContext);
    var store = scopeContainer.s;
    var hydratedSet = getHydratedSet(scopeContainer);
    var tuplesToRestore = [];

    for (var _iterator5 = _createForOfIteratorHelperLoose(values), _step5; !(_step5 = _iterator5()).done;) {
      var tuple = _step5.value;
      var _atom = tuple[0];

      if (!hydratedSet.has(_atom)) {
        hydratedSet.add(_atom);
        tuplesToRestore.push(tuple);
      }
    }

    if (tuplesToRestore.length) {
      store[RESTORE_ATOMS](tuplesToRestore);
    }
  }

  function getHydratedSet(scopeContainer) {
    var hydratedSet = hydratedMap.get(scopeContainer);

    if (!hydratedSet) {
      hydratedSet = /* @__PURE__ */new WeakSet();
      hydratedMap.set(scopeContainer, hydratedSet);
    }

    return hydratedSet;
  }

  function setPath(target, paths, value) {
    if (paths.length === 1) {
      target[paths[0]] = value;
      return target;
    }

    var next = target;

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];

      if (i === paths.length - 1) {
        next[path] = value;
      } else {
        var current = next[path];
        next = next[path] = current !== null && current !== void 0 ? current : isNaN(paths[i + 1]) ? {} : [];
      }
    }
  }

  var _excluded = ["scope"];
  var __reactCreateElement__ = React__namespace.createElement;
  // Components
  //

  /**
   * A React component that renders form atoms and their fields in an isolated
   * scope using a Jotai Provider.
   *
   * @param {FormProps<Fields>} props - Component props
   */

  function Form(props) {
    var scope = props.scope,
        atomProps = _objectWithoutPropertiesLoose(props, _excluded);

    return /*#__PURE__*/__reactCreateElement__(Provider, {
      scope: scope
    }, /*#__PURE__*/__reactCreateElement__(FormAtom, atomProps));
  }

  function FormAtom(props) {
    var form = useFormAtom(props.atom);

    if ("render" in props) {
      return props.render(form);
    }

    return /*#__PURE__*/__reactCreateElement__(props.component, form);
  }
  /**
   * A React component that renders field atoms with initial values. This is
   * most useful for fields that are rendered as native HTML elements because
   * the props can unpack directly into the underlying component.
   *
   * @param {FieldProps<Value>} props - Component props
   */


  function InputField(props) {
    var fieldAtom = useFieldAtom(props.atom, props.scope);
    useFieldAtomInitialValue(props.atom, props.initialValue, props.scope);

    if ("render" in props) {
      return props.render(fieldAtom.props, fieldAtom.state, fieldAtom.actions);
    }

    return __reactCreateElement__(props.component, fieldAtom.props);
  }
  /**
   * A React component that renders field atoms with initial values. This is
   * most useful for fields that aren't rendered as native HTML elements.
   *
   * @param {FieldProps<Value>} props - Component props
   */

  function Field(props) {
    var fieldAtomState = useFieldAtomState(props.atom, props.scope);
    var fieldAtomStateActions = useFieldAtomActions(props.atom, props.scope);
    useFieldAtomInitialValue(props.atom, props.initialValue, props.scope);

    if ("render" in props) {
      return props.render(fieldAtomState, fieldAtomStateActions);
    }

    return /*#__PURE__*/__reactCreateElement__(props.component, {
      state: fieldAtomState,
      actions: fieldAtomStateActions
    });
  } //
  // Forms
  //

  /**
   * An atom that derives its state fields atoms and allows you to submit,
   * validate, and reset your form.
   *
   * @param {FormAtomFields} fields - An object containing field atoms to
   *   be included in the form. Field atoms can be deeply nested in
   *   objects and arrays.
   * @returns The `formAtom` function returns a Jotai `Atom`
   *   comprised of other atoms for managing the state of the form.
   */

  function _ref2(count) {
    return ++count;
  }

  function _ref3(current) {
    return ++current;
  }

  function formAtom(fields) {
    var fieldsAtom = atomWithReset(fields);
    var valuesAtom = atom(function (get) {
      var fields = get(fieldsAtom);
      var values = {};
      walkFields(fields, function (field, path) {
        var fieldAtom = get(field);
        setPath(values, path, get(fieldAtom.value));
      });
      return values;
    });

    function validateFields(_x, _x2, _x3) {
      return _validateFields.apply(this, arguments);
    }

    function _callee6(get, set, event) {
      var fields, promises;

      function _callee5(field) {
        var _fieldAtom$_validateC;

        var fieldAtom, value, dirty, ptr, maybePromise, errors, _yield$maybePromise;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fieldAtom = get(field);
                value = get(fieldAtom.value);
                dirty = get(fieldAtom.dirty); // This pointer prevents a stale validation result from being
                // set after the most recent validation has been performed.

                ptr = get(fieldAtom._validateCount) + 1;
                set(fieldAtom._validateCount, ptr);

                if (event === "user" || event === "submit") {
                  set(fieldAtom.touched, true);
                }

                maybePromise = (_fieldAtom$_validateC = fieldAtom._validateCallback) === null || _fieldAtom$_validateC === void 0 ? void 0 : _fieldAtom$_validateC.call(fieldAtom, {
                  get: get,
                  value: value,
                  dirty: dirty,
                  touched: get(fieldAtom.touched),
                  event: event
                });

                if (!isPromise(maybePromise)) {
                  _context2.next = 23;
                  break;
                }

                set(fieldAtom.validateStatus, "validating");
                _context2.next = 11;
                return maybePromise;

              case 11:
                _context2.t1 = _yield$maybePromise = _context2.sent;
                _context2.t0 = _context2.t1 !== null;

                if (!_context2.t0) {
                  _context2.next = 15;
                  break;
                }

                _context2.t0 = _yield$maybePromise !== void 0;

              case 15:
                if (!_context2.t0) {
                  _context2.next = 19;
                  break;
                }

                _context2.t2 = _yield$maybePromise;
                _context2.next = 20;
                break;

              case 19:
                _context2.t2 = get(fieldAtom.errors);

              case 20:
                errors = _context2.t2;
                _context2.next = 24;
                break;

              case 23:
                errors = maybePromise !== null && maybePromise !== void 0 ? maybePromise : get(fieldAtom.errors);

              case 24:
                if (ptr === get(fieldAtom._validateCount)) {
                  set(fieldAtom.errors, errors);
                  set(fieldAtom.validateStatus, errors.length > 0 ? "invalid" : "valid");
                }

                if (!(errors && errors.length)) {
                  _context2.next = 27;
                  break;
                }

                return _context2.abrupt("return", false);

              case 27:
                return _context2.abrupt("return", true);

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee5);
      }

      function _ref(nextField) {
        function validate(_x4) {
          return _validate.apply(this, arguments);
        }

        function _validate() {
          _validate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(_callee5));
          return _validate.apply(this, arguments);
        }

        promises.push(validate(nextField));
      }

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              fields = get(fieldsAtom);
              promises = [];
              walkFields(fields, _ref);
              _context3.next = 5;
              return Promise.all(promises);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee6);
    }

    function _validateFields() {
      _validateFields = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(_callee6));
      return _validateFields.apply(this, arguments);
    }

    var validateResultAtom = atom(function (get) {
      var fields = get(fieldsAtom);
      var status = "valid";
      walkFields(fields, function (field) {
        var fieldAtom = get(field);
        var fieldStatus = get(fieldAtom.validateStatus);

        if (fieldStatus === "validating") {
          status = "validating";
          return false;
        } else if (fieldStatus === "invalid") {
          status = "invalid";
          return false;
        }
      });
      return status;
    });
    var validateAtom = atom(null, function (get, set, event) {
      if (event === void 0) {
        event = "user";
      }

      event && validateFields(get, set, event);
    });
    var errorsAtom = atom(function (get) {
      var fields = get(fieldsAtom);
      var errors = {};
      walkFields(fields, function (field, path) {
        var fieldAtom = get(field);
        setPath(errors, path, get(fieldAtom.errors));
      });
      return errors;
    });
    var submitCountAtom = atom(0);
    var submitStatusCountAtom = atom(0);
    var submitResultAtom = atom("idle");
    var submitAtom = atom(null, function (get, set, onSubmit) {
      function resolveSubmit() {
        return _resolveSubmit.apply(this, arguments);
      }

      function _callee7() {
        var ptr, validateStatus, submission;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // This pointer prevents a stale validation result from being
                // set after the most recent validation has been performed.
                ptr = get(submitStatusCountAtom) + 1;
                set(submitStatusCountAtom, ptr);
                set(submitCountAtom, _ref2);
                _context.next = 5;
                return validateFields(get, set, "submit");

              case 5:
                validateStatus = get(validateResultAtom);

                if (!(validateStatus === "invalid")) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", ptr === get(submitStatusCountAtom) && set(submitResultAtom, "idle"));

              case 8:
                submission = onSubmit(get(valuesAtom));
                _context.prev = 9;

                if (!isPromise(submission)) {
                  _context.next = 14;
                  break;
                }

                ptr === get(submitStatusCountAtom) && set(submitResultAtom, "submitting");
                _context.next = 14;
                return submission;

              case 14:
                _context.next = 18;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](9);

              case 18:
                _context.prev = 18;

                if (ptr === get(submitStatusCountAtom)) {
                  set(submitResultAtom, "submitted");
                }

                return _context.finish(18);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee7, null, [[9, 16, 18, 21]]);
      }

      function _resolveSubmit() {
        _resolveSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(_callee7));
        return _resolveSubmit.apply(this, arguments);
      }

      resolveSubmit();
    });
    var dirtyAtom = atom(function (get) {
      var fields = get(fieldsAtom);
      var dirty = false;
      walkFields(fields, function (field) {
        var fieldAtom = get(field);
        dirty = get(fieldAtom.dirty);
        if (dirty) return false;
      });
      return dirty;
    });
    var touchedFieldsAtom = atom(function (get) {
      var fields = get(fieldsAtom);
      var touchedFields = {};
      walkFields(fields, function (field, path) {
        var fieldAtom = get(field);
        setPath(touchedFields, path, get(fieldAtom.touched));
      });
      return touchedFields;
    });
    var resetAtom = atom(null, function (get, set) {
      var fields = get(fieldsAtom);
      walkFields(fields, function (field) {
        var fieldAtom = get(field);
        set(fieldAtom.reset);
      });
      set(submitStatusCountAtom, _ref3);
      set(submitResultAtom, "idle");
    });
    return atom({
      fields: fieldsAtom,
      values: valuesAtom,
      errors: errorsAtom,
      dirty: dirtyAtom,
      touchedFields: touchedFieldsAtom,
      validate: validateAtom,
      validateStatus: validateResultAtom,
      submit: submitAtom,
      submitStatus: submitResultAtom,
      submitCount: submitCountAtom,
      reset: resetAtom
    });
  }
  /**
   * A hook that returns an object that contains the `fieldAtoms` and actions to
   * validate, submit, and reset the form.
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns A set of functions that can be used to interact
   *   with the form.
   */

  function _ref4(_validate2) {
    function validate() {
      return _validate2.apply(this, arguments);
    }

    validate.toString = function () {
      return _validate2.toString();
    };

    return validate;
  }

  function useFormAtom(formAtom, scope) {
    var form = useAtomValue(formAtom, scope);
    var fieldAtoms = useAtomValue(form.fields, scope);
    var reset = useSetAtom(form.reset, scope);
    var validate = useSetAtom(form.validate, scope);
    var handleSubmit = useSetAtom(form.submit, scope);

    var _useTransition = useTransition(),
        startTransition = _useTransition[1];

    function _ref5() {
      validate("user");
    }

    function _ref6() {
      startTransition(_ref5);
    }

    function _submit(onSubmit) {
      function _ref7() {
        handleSubmit(onSubmit);
      }

      return function (e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        startTransition(_ref7);
      };
    }

    return React__namespace.useMemo(function () {
      return {
        fieldAtoms: fieldAtoms,
        validate: _ref4(_ref6),
        reset: reset,
        submit: _submit
      };
    }, [fieldAtoms, validate, reset, handleSubmit]);
  }
  /**
   * A hook that returns the primary state of the form atom including values, errors,
   * submit and validation status, as well as the `fieldAtoms`. Note that this
   * hook will cuase its parent component to re-render any time those states
   * change, so it can be useful to use more targeted state hooks like
   * `useFormAtomStatus`.
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   */

  function useFormAtomState(formAtom, scope) {
    var form = useAtomValue(formAtom, scope);
    var fieldAtoms = useAtomValue(form.fields, scope);
    var submitCount = useAtomValue(form.submitCount, scope);
    var submitStatus = useAtomValue(form.submitStatus, scope);
    var validateStatus = useAtomValue(form.validateStatus, scope);
    var values = useAtomValue(form.values, scope);
    var errors = useAtomValue(form.errors, scope);
    var dirty = useAtomValue(form.dirty, scope);
    var touchedFields = useAtomValue(form.touchedFields, scope);
    return React__namespace.useMemo(function () {
      return {
        fieldAtoms: fieldAtoms,
        values: values,
        errors: errors,
        dirty: dirty,
        touchedFields: touchedFields,
        submitCount: submitCount,
        submitStatus: submitStatus,
        validateStatus: validateStatus
      };
    }, [fieldAtoms, values, errors, dirty, touchedFields, submitCount, submitStatus, validateStatus]);
  }
  /**
   * A hook that returns a set of actions that can be used to update the state
   * of the form atom. This includes updating fields, submitting, resetting,
   * and validating the form.
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   */

  function _ref8(_validate3) {
    function validate() {
      return _validate3.apply(this, arguments);
    }

    validate.toString = function () {
      return _validate3.toString();
    };

    return validate;
  }

  function useFormAtomActions(formAtom, scope) {
    var form = useAtomValue(formAtom, scope);
    var updateFields = useSetAtom(form.fields, scope);
    var reset = useSetAtom(form.reset, scope);
    var validate = useSetAtom(form.validate, scope);
    var handleSubmit = useSetAtom(form.submit, scope);
    var submit = React__namespace.useCallback(function (values) {
      return function (e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        handleSubmit(values);
      };
    }, [handleSubmit]);

    var _useTransition2 = useTransition(),
        startTransition = _useTransition2[1];

    function _ref9() {
      validate("user");
    }

    function _ref10() {
      startTransition(_ref9);
    }

    return React__namespace.useMemo(function () {
      return {
        updateFields: updateFields,
        reset: reset,
        validate: _ref8(_ref10),
        submit: submit
      };
    }, [updateFields, reset, validate, submit]);
  }
  /**
   * A hook that returns the errors of the form atom.
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form data.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns The errors of the form.
   */

  function useFormAtomErrors(formAtom, scope) {
    var form = useAtomValue(formAtom, scope);
    return useAtomValue(form.errors, scope);
  }
  /**
   * A hook that returns the values of the form atom
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns The values of the form.
   */

  function useFormAtomValues(formAtom, scope) {
    var form = useAtomValue(formAtom, scope);
    return useAtomValue(form.values, scope);
  }
  /**
   * A hook that returns the `submitStatus` and `validateStatus` of
   * the form atom.
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns An object containing the `submitStatus` and
   *   `validateStatus` of the form
   */

  function useFormAtomStatus(formAtom, scope) {
    var form = useAtomValue(formAtom);
    var submitStatus = useAtomValue(form.submitStatus, scope);
    var validateStatus = useAtomValue(form.validateStatus, scope);
    return React__namespace.useMemo(function () {
      return {
        submitStatus: submitStatus,
        validateStatus: validateStatus
      };
    }, [submitStatus, validateStatus]);
  }
  /**
   * A hook that returns a callback for handling form submission.
   *
   * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns A callback for handling form submission. The callback
   *   takes the form values as an argument and returs an additional callback
   *   that invokes `event.preventDefault()` if it receives an event as its argument.
   */

  function useFormAtomSubmit(formAtom, scope) {
    var _useTransition3 = useTransition(),
        startTransition = _useTransition3[1];

    var form = useAtomValue(formAtom, scope);
    var handleSubmit = useSetAtom(form.submit, scope);
    return React__namespace.useCallback(function (values) {
      function _ref11() {
        handleSubmit(values);
      }

      return function (e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        startTransition(_ref11);
      };
    }, [handleSubmit]);
  } //
  // Fields
  //

  /**
   * An atom that represents a field in a form. It manages state for the field,
   * including the name, value, errors, dirty, validation, and touched state.
   *
   * @param {FieldAtomConfig<Value>} config - The initial state and configuration of the field.
   * @returns A FieldAtom.
   */

  function _ref12(count) {
    return ++count;
  }

  function fieldAtom(config) {
    var _config$touched;

    var nameAtom = atomWithReset(config.name);
    var valueAtom = atomWithReset(config.value);
    var touchedAtom = atomWithReset((_config$touched = config.touched) !== null && _config$touched !== void 0 ? _config$touched : false);
    var dirtyAtom = atom(function (get) {
      return get(valueAtom) !== config.value;
    });
    var errorsAtom = atom([]);
    var validateCountAtom = atom(0);
    var validateResultAtom = atom("valid");
    var validateAtom = atom(null, function (get, set, event) {
      if (event === void 0) {
        event = "user";
      }

      function resolveErrors() {
        return _resolveErrors.apply(this, arguments);
      }

      function _callee8() {
        var _config$validate;

        var ptr, dirty, value, errors, maybeValidatePromise, _yield$maybeValidateP;

        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (event) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                // This pointer prevents a stale validation result from being
                // set to state after the most recent invocation of validate.
                ptr = get(validateCountAtom) + 1;
                set(validateCountAtom, ptr);
                dirty = get(dirtyAtom);
                value = get(valueAtom);

                if (event === "user" || event === "submit") {
                  set(touchedAtom, true);
                }

                errors = [];
                maybeValidatePromise = (_config$validate = config.validate) === null || _config$validate === void 0 ? void 0 : _config$validate.call(config, {
                  get: get,
                  dirty: dirty,
                  touched: get(touchedAtom),
                  value: value,
                  event: event
                });

                if (!isPromise(maybeValidatePromise)) {
                  _context4.next = 25;
                  break;
                }

                ptr === get(validateCountAtom) && set(validateResultAtom, "validating");
                _context4.next = 13;
                return maybeValidatePromise;

              case 13:
                _context4.t1 = _yield$maybeValidateP = _context4.sent;
                _context4.t0 = _context4.t1 !== null;

                if (!_context4.t0) {
                  _context4.next = 17;
                  break;
                }

                _context4.t0 = _yield$maybeValidateP !== void 0;

              case 17:
                if (!_context4.t0) {
                  _context4.next = 21;
                  break;
                }

                _context4.t2 = _yield$maybeValidateP;
                _context4.next = 22;
                break;

              case 21:
                _context4.t2 = get(errorsAtom);

              case 22:
                errors = _context4.t2;
                _context4.next = 26;
                break;

              case 25:
                errors = maybeValidatePromise !== null && maybeValidatePromise !== void 0 ? maybeValidatePromise : get(errorsAtom);

              case 26:
                if (ptr === get(validateCountAtom)) {
                  set(errorsAtom, errors);
                  set(validateResultAtom, errors.length > 0 ? "invalid" : "valid");
                }

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee8);
      }

      function _resolveErrors() {
        _resolveErrors = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(_callee8));
        return _resolveErrors.apply(this, arguments);
      }

      resolveErrors();
    });
    var refAtom = atom(null);
    var resetAtom = atom(null, function (get, set) {
      set(errorsAtom, []);
      set(touchedAtom, RESET);
      set(valueAtom, RESET); // Need to set a new pointer to prevent stale validation results
      // from being set to state after this invocation.

      set(validateCountAtom, _ref12);
      set(validateResultAtom, "valid");
    });
    return atom({
      name: nameAtom,
      value: valueAtom,
      touched: touchedAtom,
      dirty: dirtyAtom,
      validate: validateAtom,
      validateStatus: validateResultAtom,
      errors: errorsAtom,
      reset: resetAtom,
      ref: refAtom,
      _validateCallback: config.validate,
      _validateCount: validateCountAtom
    });
  }
  /**
   * A hook that returns a set of actions that can be used to interact with the
   * field atom state.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns A set of actions that can be used to interact with the field atom.
   */

  function _ref13(_validate4) {
    function validate() {
      return _validate4.apply(this, arguments);
    }

    validate.toString = function () {
      return _validate4.toString();
    };

    return validate;
  }

  function _ref16(_setValue) {
    function setValue(_x5) {
      return _setValue.apply(this, arguments);
    }

    setValue.toString = function () {
      return _setValue.toString();
    };

    return setValue;
  }

  function _ref19(_setTouched) {
    function setTouched(_x6) {
      return _setTouched.apply(this, arguments);
    }

    setTouched.toString = function () {
      return _setTouched.toString();
    };

    return setTouched;
  }

  function useFieldAtomActions(fieldAtom, scope) {
    var field = useAtomValue(fieldAtom, scope);
    var setValue = useSetAtom(field.value, scope);
    var setTouched = useSetAtom(field.touched, scope);
    var setErrors = useSetAtom(field.errors, scope);
    var validate = useSetAtom(field.validate, scope);
    var reset = useSetAtom(field.reset, scope);
    var ref = useAtomValue(field.ref, scope);

    var _useTransition4 = useTransition(),
        startTransition = _useTransition4[1];

    function _ref14() {
      validate("user");
    }

    function _ref15() {
      startTransition(_ref14);
    }

    function _ref17() {
      validate("change");
    }

    function _ref18(value) {
      setValue(value);
      startTransition(_ref17);
    }

    function _ref20() {
      validate("touch");
    }

    function _ref21(touched) {
      setTouched(touched);

      if (touched) {
        startTransition(_ref20);
      }
    }

    function _focus() {
      ref === null || ref === void 0 ? void 0 : ref.focus();
    }

    return React__namespace.useMemo(function () {
      return {
        validate: _ref13(_ref15),
        setValue: _ref16(_ref18),
        setTouched: _ref19(_ref21),
        setErrors: setErrors,
        focus: _focus,
        reset: reset
      };
    }, [setErrors, reset, validate, setValue, setTouched, ref]);
  }
  /**
   * A hook that returns a set of props that can be destructured
   * directly into an `<input>`, `<select>`, or `<textarea>` element.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns A set of props that can be destructured directly into an `<input>`,
   *   `<select>`, or `<textarea>` element.
   */

  function useFieldAtomProps(fieldAtom, scope) {
    var field = useAtomValue(fieldAtom, scope);
    var name = useAtomValue(field.name, scope);

    var _useAtom = useAtom(field.value, scope),
        value = _useAtom[0],
        setValue = _useAtom[1];

    var setTouched = useSetAtom(field.touched, scope);
    var validateStatus = useAtomValue(field.validateStatus, scope);
    var validate = useSetAtom(field.validate, scope);
    var ref = useSetAtom(field.ref, scope);

    var _useTransition5 = useTransition(),
        startTransition = _useTransition5[1];

    function _ref22() {
      validate("blur");
    }

    function _onBlur() {
      setTouched(true);
      startTransition(_ref22);
    }

    function _ref23() {
      validate("change");
    }

    function _onChange(event) {
      // @ts-expect-error
      setValue(event.target.value);
      startTransition(_ref23);
    }

    return React__namespace.useMemo(function () {
      return {
        name: name,
        value: value,
        "aria-invalid": validateStatus === "invalid",
        ref: ref,
        onBlur: _onBlur,
        onChange: _onChange
      };
    }, [name, value, validateStatus, ref, setTouched, validate, setValue]);
  }
  /**
   * A hook that returns the state of a field atom. This includes the field's
   * value, whether it has been touched, whether it is dirty, the validation status,
   * and any errors.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns The state of the field atom.
   */

  function useFieldAtomState(fieldAtom, scope) {
    var field = useAtomValue(fieldAtom, scope);
    var value = useAtomValue(field.value, scope);
    var touched = useAtomValue(field.touched, scope);
    var dirty = useAtomValue(field.dirty, scope);
    var validateStatus = useAtomValue(field.validateStatus, scope);
    var errors = useAtomValue(field.errors, scope);
    return React__namespace.useMemo(function () {
      return {
        value: value,
        touched: touched,
        dirty: dirty,
        validateStatus: validateStatus,
        errors: errors
      };
    }, [value, touched, dirty, validateStatus, errors]);
  }
  /**
   * A hook that returns the value of a field atom.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns The value of the field atom.
   */

  function useFieldAtomValue(fieldAtom, scope) {
    var field = useAtomValue(fieldAtom, scope);
    return useAtomValue(field.value, scope);
  }
  /**
   * A hook that returns the errors of a field atom.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns The errors of the field atom.
   */

  function useFieldAtomErrors(fieldAtom, scope) {
    var field = useAtomValue(fieldAtom, scope);
    return useAtomValue(field.errors, scope);
  }
  /**
   * Sets the initial value of a field atom. Initial values can only be set once
   * per scope. Therefore, if the initial value used is changed during rerenders,
   * it won't update the atom value.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that you want to use to store the value.
   * @param {Value} initialValue - The initial value of the field.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   */

  function useFieldAtomInitialValue(fieldAtom, initialValue, scope) {
    var field = useAtomValue(fieldAtom, scope);
    useHydrateAtoms(initialValue === undefined ? [] : [[field.value, initialValue]], scope);
  }
  /**
   * A hook that returns `props`, `state`, and `actions` of a field atom from
   * `useFieldAtomProps`, `useFieldAtomState`, and `useFieldAtomActions`.
   *
   * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
   * @param {Scope} scope - When using atoms with a scope, the provider with
   *   the same scope will be used. The recommendation for the scope value is
   *   a unique symbol. The primary use case of scope is for library usage.
   * @returns The errors of the field atom.
   */

  function useFieldAtom(fieldAtom, scope) {
    var props = useFieldAtomProps(fieldAtom, scope);
    var actions = useFieldAtomActions(fieldAtom, scope);
    var state = useFieldAtomState(fieldAtom, scope);
    return React__namespace.useMemo(function () {
      return {
        props: props,
        actions: actions,
        state: state
      };
    }, [props, actions, state]);
  }

  function _ref24(fn) {
    return fn();
  }

  var useTransition = typeof React__namespace.useTransition === "function" ? React__namespace.useTransition : function () {
    return [false, _ref24];
  };

  function isPromise(value) {
    return typeof value === "object" && typeof value.then === "function";
  }

  function isAtom(maybeAtom) {
    return maybeAtom !== null && typeof maybeAtom === "object" && (typeof maybeAtom.read === "function" || typeof maybeAtom.write === "function");
  }
  /**
   * A function that walks through an object containing nested field atoms
   * and calls a visitor function for each atom it finds.
   *
   * @param {FormAtomFields} fields - An object containing nested field atoms
   * @param visitor - A function that will be called for each field atom. You can
   *  exit early by returning `false` from the function.
   * @param path - The base path of the field atom.
   */


  function walkFields(fields, visitor, path) {
    if (path === void 0) {
      path = [];
    }

    for (var _key in fields) {
      path.push(_key);
      var _field = fields[_key];

      if (isAtom(_field)) {
        if (visitor(_field, path) === false) return;
      } else if (Array.isArray(_field)) {
        for (var _key2 in _field) {
          path.push(_key2);
          var subField = _field[_key2];

          if (isAtom(subField)) {
            if (visitor(subField, path) === false) return;
          } else {
            walkFields(subField, visitor, path);
          }

          path.pop();
        }
      } else if (typeof _field === "object") {
        walkFields(_field, visitor, path);
      }

      path.pop();
    }
  }

  exports.Field = Field;
  exports.Form = Form;
  exports.InputField = InputField;
  exports.Provider = Provider;
  exports.fieldAtom = fieldAtom;
  exports.formAtom = formAtom;
  exports.useFieldAtom = useFieldAtom;
  exports.useFieldAtomActions = useFieldAtomActions;
  exports.useFieldAtomErrors = useFieldAtomErrors;
  exports.useFieldAtomInitialValue = useFieldAtomInitialValue;
  exports.useFieldAtomProps = useFieldAtomProps;
  exports.useFieldAtomState = useFieldAtomState;
  exports.useFieldAtomValue = useFieldAtomValue;
  exports.useFormAtom = useFormAtom;
  exports.useFormAtomActions = useFormAtomActions;
  exports.useFormAtomErrors = useFormAtomErrors;
  exports.useFormAtomState = useFormAtomState;
  exports.useFormAtomStatus = useFormAtomStatus;
  exports.useFormAtomSubmit = useFormAtomSubmit;
  exports.useFormAtomValues = useFormAtomValues;
  exports.walkFields = walkFields;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=form-atoms.dev.js.map
