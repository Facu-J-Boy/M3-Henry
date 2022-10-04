'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
// class $Promise {
//   constructor(executor) {
//     this._state = "pending";
//   }
// }

// del lado del test viene var executor = function () {};
function $Promise(executor) {
  // function $Promise(executor=function () {})
  if (typeof executor !== "function") {
    throw new TypeError("Executor not function");
  }
  this._state = "pending";
  this._value = undefined; // ["hola promise init"]
  this._handlerGroups = [];

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}
// ["hola promise init"]
$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = value; // ["hola promise init"]
    this._callHandlers();
  }
};
$Promise.prototype._internalReject = function (value) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = value;
    this._callHandlers();
  }
};
// .then((sh)=> return sh+ 'hola', false)
$Promise.prototype.then = function (successCb, errorCb) {
  // if (successCb === null) --> return el value de la promise original
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  const downstreamPromise = new $Promise(() => {});
  this._handlerGroups.push({
    successCb, // successCb: successCb, --> successCb: (sh)=> return sh+ 'hola'
    errorCb, // errorCb: errorCb,                    this._value = Originalvalue;
    downstreamPromise,
  });
  if (this._state !== "pending") {
    this._callHandlers();
  }
  return downstreamPromise;
};
// .then((v)v.push("1°.then") return v)
// .then((v)v.push("1°.then") return newPromise)
$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    let cb = this._handlerGroups.shift(); //{successCb,errorCb,newPromise} <--[X,{sh,eh},{sh,eh}]
    if (this._state === "fulfilled") {
      if (cb.successCb) {
        //     ["hola promise init"]
        //const result = cb.successCb(this._value);// --> ["hola promise init","1°.then"]
        try {
          const result = cb.successCb(this._value);
          if (result instanceof $Promise) {
            return result.then(
              (value) => cb.downstreamPromise._internalResolve(value),
              (err) => cb.downstreamPromise._internalReject(err)
            );
          } else {
            cb.downstreamPromise._internalResolve(result);
            //_internalResolve(["hola promise init","1°.then"])
            // this.value: ["hola promise init","1°.then"]
          }
        } catch (error) {
          cb.downstreamPromise._internalReject(error);
        }
      } else { // si es null (no hay sh)
        return cb.downstreamPromise._internalResolve(this._value);
      }
    } else if (this._state === "rejected") {
      if (cb.errorCb) {
        try {
          const result = cb.errorCb(this._value);
          if (result instanceof $Promise){
            return result.then(
              (value) => cb.downstreamPromise._internalResolve(value),
              (err) => cb.downstreamPromise._internalReject(err)
            )

          } else{
            cb.downstreamPromise._internalResolve(result)
          }
        } catch (error) {
          cb.downstreamPromise._internalReject(error)
        }
        
      }else { // si es null (no hay eh)
        return cb.downstreamPromise._internalReject(this._value);
      }
    }
  }
};

// .then(null,(eh)=>{})
$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
