/*!
 * speedt-mysql
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const mysql = require('mysql');

module.exports = function(opts){
  return new Method(opts);
}

var Method = function(opts){
  var self = this;
  self.opts = opts || {};
};

var pro = Method.prototype;

pro.query = function(sql, params, cb){
  this.getPool().getConnection((err, conn) => {
    if(err) return cb(err);
    conn.query(sql, params, (err, docs, fields) => {
      conn.release();
      cb(err, docs, fields);
    });
  });
};

const initPool = function(){
  if(!this.pool) this.pool = mysql.createPool(this.opts);
};

pro.getPool = function(){
  initPool.call(this);
  return this.pool;
};

pro.checkOnly = docs => (!!docs && 1 === docs.length);

pro.format = (sql, params) => mysql.format(sql, params);

pro.beginTransaction = function(){
  var self = this;
  return new Promise((resolve, reject) => {
    self.getPool().getConnection((err, trans) => {
      if(err) return reject(err);

      trans.beginTransaction(err => {
        if(err) return reject(err);
        resolve(trans);
      });
    });
  });
};

pro.commitTransaction = function(trans){
  return new Promise((resolve, reject) => {
    trans.commit(err => {
      if(err) return reject(err);
      resolve();
    });
  });
};
