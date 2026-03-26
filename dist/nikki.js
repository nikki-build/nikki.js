"use strict";
var nikki = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    nikkiServiceBase: () => nikkiServiceBase
  });

  // src/nikkiDef.ts
  var wsStatusMsg = class {
    constructor() {
      this.type = "NotSet" /* NotSet */;
      this.data = {};
    }
  };
  var wsMessageBase = class {
    constructor() {
      this.action = "sendMessage";
      this.msgTime = Date.now();
      this.id = crypto.randomUUID();
      this.msgType = "NotSet" /* NotSet */;
      this.data = void 0;
      this.servType = "external" /* external */;
    }
  };
  var wsServiceSendDataMsg = class extends wsMessageBase {
    constructor() {
      super();
      this.GuID = "";
      this.sessionID = "";
      this.secrete = "";
      this.servID = "";
      this.instID = "";
      this.name = "";
      this.dispName = "";
      this.msgType = "ServiceData" /* ServiceData */;
      this.servType = "external" /* external */;
    }
  };
  var serviceTokenDef = class {
    constructor() {
      this.sessionID = "";
      this.secrete = "";
      this.wsAddr = "";
      this.isPro = false;
      this.rateLimit = 2;
      this.isDash = false;
      this.startTime = "";
      this.desc = "";
      this.name = "";
    }
  };
  var wsConnectUrlDef = class {
    constructor() {
      this.servDef = void 0;
      this.token = void 0;
    }
  };
  var wsServiceConnectDef = class extends wsConnectUrlDef {
    constructor() {
      super(...arguments);
      this.wsAddr = void 0;
    }
  };
  var serviceBasePath = "resc/playground/services";
  var queryStringTokenKey = "token";
  var queryStringWsAddrKey = "wsAddr";
  var queryStringSrvNameKey = "name";
  var queryStringKey = "token";
  var outDataSizeMaxLimit = 3e3;
  var outDataSizeSegmentMaxLimit = 500;
  var reconnectIntervalInMilli = 6e6;

  // node_modules/tslib/tslib.es6.mjs
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }

  // node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = (function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = (function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    })();
    return Subscription2;
  })();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop() {
  }

  // node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = (function() {
    return createNotification("C", void 0, void 0);
  })();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = (function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  })(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = (function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  })();
  var SafeSubscriber = (function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  })(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };

  // node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = (function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  })();

  // node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity(x) {
    return x;
  }

  // node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = (function() {
    function Observable3(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable3.prototype.lift = function(operator) {
      var observable2 = new Observable3();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable3.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable3.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable3.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable3.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable3.prototype[observable] = function() {
      return this;
    };
    Observable3.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable3.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable3.create = function(subscribe) {
      return new Observable3(subscribe);
    };
    return Observable3;
  })();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = (function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  })(Observable);
  var AnonymousSubject = (function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  })(Subject);

  // src/jsWebSocketImpl.ts
  var wsHandlerImpl = class {
    constructor() {
      this.wsDataMsgSubject = new Subject();
      this.connectionStatSubject = new Subject();
      this.wsHandl = void 0;
      this.serverUrl = "";
      this.reconnectInterval = reconnectIntervalInMilli;
      this.shouldReconnect = true;
      this.reconnectTimeout = void 0;
      this.wsHandl = void 0;
      this.shouldReconnect = true;
      this.reconnectTimeout = null;
    }
    getConnectionStatus() {
      let status = false;
      try {
        if (this.wsHandl) {
          status = this.wsHandl.readyState === WebSocket.OPEN;
        }
      } catch (e) {
        console.error("Exception while getConnectionStatus:", e.message);
      }
      return status;
    }
    getWsStatusSubject() {
      return this.connectionStatSubject;
    }
    getWsDataSubject() {
      return this.wsDataMsgSubject;
    }
    onWsMessage(msg) {
      try {
        if (msg && msg.data) {
          const jevent = JSON.parse(msg.data);
          this.wsDataMsgSubject.next(jevent);
        }
      } catch (e) {
        console.error("Exception while onWsMessage:", e.message);
      }
    }
    wsOnConnect() {
      try {
        console.info("WebSocket connected.");
        const wstat = new wsStatusMsg();
        wstat.type = "Connected" /* Connected */;
        this.connectionStatSubject.next(wstat);
      } catch (e) {
        console.error("Exception while wsOnConnect:", e.message);
      }
    }
    wsOnError(err) {
      try {
        console.info("WebSocket error:", err);
        const wstat = new wsStatusMsg();
        wstat.type = "Error" /* Error */;
        wstat.data = err;
        this.connectionStatSubject.next(wstat);
      } catch (e) {
        console.error("Exception while wsOnError:", e.message);
      }
    }
    wsOnClose() {
      try {
        console.info("WebSocket closed.");
        const wstat = new wsStatusMsg();
        wstat.type = "DisConnected" /* DisConnected */;
        this.connectionStatSubject.next(wstat);
      } catch (e) {
        console.error("Exception while wsOnClose:", e.message);
      }
    }
    disconnect() {
      try {
        this.shouldReconnect = false;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
          this.wsHandl.close(1e3, "Client initiated close");
        }
      } catch (e) {
        console.error("Exception while disconnect:", e.message);
      }
    }
    connect(wsConnectAddr) {
      try {
        this.serverUrl = wsConnectAddr;
        if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
          return;
        }
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        this.wsHandl = new WebSocket(this.serverUrl);
        this.wsHandl.onopen = () => this.wsOnConnect();
        this.wsHandl.onmessage = (event) => this.onWsMessage(event);
        this.wsHandl.onclose = () => {
          this.wsOnClose();
          if (this.shouldReconnect && this.wsHandl) {
            this.reconnectTimeout = setTimeout(() => {
              console.info("Trying to reconnect.");
              const wstat = new wsStatusMsg();
              wstat.type = "Reconnecting" /* Reconnecting */;
              this.connectionStatSubject.next(wstat);
            }, this.reconnectInterval);
          }
        };
        this.wsHandl.onerror = (error) => this.wsOnError(error);
      } catch (e) {
        console.error("Exception while connect:", e.message);
      }
    }
    sendMessage(msg) {
      try {
        if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
          this.wsHandl.send(JSON.stringify(msg));
        } else {
          console.error("WebSocket is not connected.");
          const wstat = new wsStatusMsg();
          wstat.type = "sendingDataWhileDisconnected" /* sendingDataWhileDisconnected */;
          wstat.data = void 0;
          this.connectionStatSubject.next(wstat);
        }
      } catch (e) {
        console.error("Exception while sendMessage:", e.message);
      }
    }
  };

  // src/playServiceUtils.ts
  var serviceUtils = class _serviceUtils extends serviceTokenDef {
    static getServiceLaunchUrl(token, serv) {
      let url = void 0;
      try {
        const conntDef = new wsConnectUrlDef();
        conntDef.servDef = serv;
        conntDef.token = token;
        const jsonString = JSON.stringify(conntDef);
        const eName = encodeURIComponent(serv.dispName);
        const eWsAddr = encodeURIComponent(token.wsAddr);
        const encodedData = encodeURIComponent(jsonString);
        url = `${window.location.origin}/${serviceBasePath}/${serv.name}/index.html?${queryStringTokenKey}=${encodedData}&${queryStringWsAddrKey}=${eWsAddr}&${queryStringSrvNameKey}=${eName}`;
        console.info("service connect address", url);
      } catch (e) {
        console.error("Exception while getServiceLaunchUrl:", e.message);
      }
      return url;
    }
    static decodeToken(token) {
      let share = void 0;
      try {
        if (token) {
          const decodeUrl = decodeURIComponent(token);
          share = JSON.parse(decodeUrl.toString());
          console.info("decoded decodeToken:", share);
        } else {
          console.error("Not a valid token URL:", token);
        }
      } catch (e) {
        console.error("Exception while decodeToken:", e.message);
      }
      return share;
    }
    static decodeUrlInformation() {
      let share = void 0;
      try {
        const params = new URLSearchParams(window.location.search);
        const tokenDec = params.get(queryStringTokenKey);
        const encodedWsAddr = params.get(queryStringWsAddrKey);
        if (tokenDec && encodedWsAddr) {
          share = new wsServiceConnectDef();
          const wsAddr = decodeURIComponent(encodedWsAddr);
          const token = encodeURIComponent(tokenDec);
          share.wsAddr = `${wsAddr}?${queryStringKey}=${token}`;
          const dec = _serviceUtils.decodeToken(token);
          if (dec && dec.servDef && dec.token) {
            share.servDef = dec.servDef;
            share.token = dec.token;
          } else {
            share.servDef = void 0;
            share.token = void 0;
          }
        } else {
          share = void 0;
        }
      } catch (e) {
        console.error("Exception while decodeUrlInformation:", e.message);
      }
      console.info("URL information:", share);
      return share;
    }
    static getWsConnectUrl(serv, token) {
      let fullURL = void 0;
      try {
        const def = new wsConnectUrlDef();
        def.token = token;
        def.servDef = serv;
        const strData = JSON.stringify(def);
        const enComp = encodeURIComponent(strData);
        fullURL = `${token.wsAddr}?${queryStringKey}=${enComp}`;
      } catch (e) {
        console.error("Exception while getWsConnectUrl:", e.message);
      }
      return fullURL;
    }
  };

  // src/nikkiJsServiceBase.ts
  var nikkiServiceBaseImpl = class {
    constructor() {
      this.lastMsgTime = 0;
      this.LOG_PREFIX = "[nikki.build]";
      this.wsConnectionStatus = "Inactive" /* Inactive */;
      this.ws = new wsHandlerImpl();
      this.wsDataSubscription = this.ws.getWsDataSubject().subscribe({ next: this.onWsDataMsg.bind(this) });
      this.wsStatusSubscription = this.ws.getWsStatusSubject().subscribe({ next: this.onstatusChanged.bind(this) });
    }
    onstatusChanged(status) {
      if (status.type == "Connected" /* Connected */) {
        this.onConnect();
      }
      if (status.type == "DisConnected" /* DisConnected */) {
        this.onDisconnect();
      }
      if (status.type == "Error" /* Error */) {
        this.onError(status.data);
      }
    }
    onWsDataMsg(data) {
      try {
        this.wsConnectionStatus = "Active" /* Active */;
        if (data) {
          this.recentData = data;
          this.onData(data);
        }
      } catch (e) {
        console.error("Exception while onWsDataMsg:", e.message);
      }
    }
    getRecentMsg() {
      return this.recentData;
    }
    getConnectAddress(srvDef, token) {
      return serviceUtils.getWsConnectUrl(srvDef, token);
    }
    loadFromUrl() {
      let status = false;
      try {
        const devkeys = serviceUtils.decodeUrlInformation();
        if (devkeys && devkeys.servDef && devkeys.token) {
          this.servDef = devkeys.servDef;
          this.connectAddr = devkeys.wsAddr;
          this.token = devkeys.token;
          status = true;
        } else {
          console.error("Invalid URL.");
        }
      } catch (e) {
        console.error("Exception while loadFromUrl:", e.message);
      }
      return status;
    }
    async loadDefinitionsFromServer() {
      try {
        const defResponse = await fetch("/serviceDef.json");
        if (!defResponse.ok) throw new Error("serviceDef.json not found");
        const serviceDef = await defResponse.json();
        const tokenResponse = await fetch("/serviceToken.json");
        if (!tokenResponse.ok) throw new Error("serviceToken.json not found");
        const serviceToken = await tokenResponse.json();
        if (serviceDef && serviceDef.GuID && serviceDef.servID && serviceDef.name && serviceToken && serviceToken.secrete && serviceToken.sessionID && serviceToken.wsAddr) {
          this.servDef = serviceDef;
          this.token = serviceToken;
          console.info("loaded service definition.", this.servDef, this.token);
        } else {
          console.error("Invalid service definition or service token information. Please check the files");
        }
      } catch (err) {
        console.error("Error loading Nikki service files:", err);
        return null;
      }
    }
    async setServiceDef(serviceDef) {
      try {
        if (serviceDef && serviceDef.GuID && serviceDef.servID && serviceDef.name) {
          this.servDef = serviceDef;
          console.info("loaded service definition.");
        } else {
          console.error("Invalid service definition . Please check the files");
        }
      } catch (err) {
        console.error("Error loading Nikki service files:", err);
        return null;
      }
    }
    async setTokenDef(serviceToken) {
      try {
        if (serviceToken && serviceToken.secrete && serviceToken.sessionID && serviceToken.wsAddr) {
          this.token = serviceToken;
          console.info("loaded service token .");
        } else {
          console.error("Invalid service definition or service token information. Please check the files");
        }
      } catch (err) {
        console.error("Error loading Nikki service files:", err);
        return null;
      }
    }
    loadServiceDefFile(event) {
      try {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            this.servDef = JSON.parse(e.target.result);
            console.log("Loaded serviceDef file");
          } catch (err) {
            console.error("Invalid JSON file:", err);
          }
        };
        reader.readAsText(file);
      } catch (e) {
        console.error("exception while, loadServiceDefFile ", e.message);
      }
    }
    // todo add name checks
    loadServiceTokenFile(event) {
      try {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            this.token = JSON.parse(e.target.result);
            console.log("Loaded token file");
          } catch (err) {
            console.error("Invalid JSON file:", err);
          }
        };
        reader.readAsText(file);
      } catch (e) {
        console.error("exception while, loadServiceTokenFile ", e.message);
      }
    }
    async start() {
      if (this.servDef && this.token) {
        this.connectAddr = this.getConnectAddress(this.servDef, this.token);
        this.startWithDef(this.servDef, this.token);
      } else {
        console.error("Session is not set properly. Please set the service definition and service token");
      }
    }
    async startWithDef(srv, token) {
      let optStatus = false;
      try {
        console.info("Starting connection.");
        this.servDef = srv;
        this.token = token;
        if (this.servDef && this.token && this.connectAddr && this.connectAddr.length > 0) {
          if (this.ws === void 0) {
            this.ws = new wsHandlerImpl();
          }
          this.ws.connect(this.connectAddr);
          optStatus = true;
        } else {
          console.error("Failed to load service and token definition file.");
          alert("Session is not initialized!");
        }
      } catch (e) {
        console.error("Exception while startWithDef:", e.message);
      }
      return optStatus;
    }
    stop() {
      try {
        if (this.ws) {
          this.ws.disconnect();
          this.wsConnectionStatus = "Inactive" /* Inactive */;
        }
      } catch (e) {
        console.error("Exception while stop:", e.message);
      }
    }
    getNodedata(data = {}) {
      let nData = void 0;
      let dtStr = "";
      if (data) {
        try {
          dtStr = JSON.stringify(data);
        } catch (e) {
          console.error("Exception while getNodedata:", e.message);
        }
        if (dtStr.length > outDataSizeSegmentMaxLimit) {
          console.error(`Input data size is ${dtStr.length}, sending data limit exceeded, it should be less than ${outDataSizeSegmentMaxLimit}`);
          return void 0;
        }
      } else {
        console.error("Invalid input: send some valid data");
        return void 0;
      }
      if (this.servDef && this.token && data) {
        nData = new wsServiceSendDataMsg();
        nData.GuID = this.servDef.GuID;
        nData.dispName = this.servDef.dispName;
        nData.servID = this.servDef.servID;
        nData.name = this.servDef.name;
        nData.instID = this.servDef.instID;
        nData.secrete = this.token.secrete;
        nData.sessionID = this.token.sessionID;
        nData.data = data;
      }
      return nData;
    }
    sendData(message) {
      let status = false;
      try {
        if (!message) {
          console.error("Trying to send invalid data.");
          return false;
        }
        if (this.ws && this.token && this.ws.getConnectionStatus() && this.servDef) {
          const timeDiff = Date.now() - this.lastMsgTime;
          if (timeDiff > this.token.rateLimit * 1e3) {
            const srvData = this.getNodedata(message);
            if (srvData) {
              const strMsg = JSON.stringify(srvData);
              if (outDataSizeMaxLimit > strMsg.length) {
                this.ws.sendMessage(strMsg);
                this.lastMsgTime = Date.now();
                status = true;
              } else {
                console.error(`Exceeded outgoing data size, it should be less than ${outDataSizeMaxLimit} bytes`);
              }
            }
          } else {
            console.error(`Exceeding sending rate limits: allowed ${this.token.rateLimit} msgs / second`);
          }
        } else {
          console.error("WebSocket is not connected.");
        }
      } catch (e) {
        console.error("Exception while sendMessage:", e.message);
      }
      return status;
    }
    isConnected() {
      const status = this.ws.getConnectionStatus();
      console.debug(`${this.LOG_PREFIX} Connection status:`, status);
      return status;
    }
    onConnect() {
      console.info(`${this.LOG_PREFIX} Connection established.`);
    }
    onDisconnect() {
      console.warn(`${this.LOG_PREFIX} Connection closed.`);
    }
    onError(error) {
      console.error(`${this.LOG_PREFIX} Connection error:`, error);
    }
    onData(data) {
      console.debug(`${this.LOG_PREFIX} Data received:`, data);
    }
  };

  // src/index.ts
  var nikkiServiceBase = class extends nikkiServiceBaseImpl {
  };
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=nikki.js.map