'use strict';

var BaseTypes = require('../../data-types')
  , util = require('util');

var STRING = function() {
  if (!(this instanceof STRING)) return new STRING();
  BaseTypes.STRING.apply(this, arguments);
};
util.inherits(STRING, BaseTypes.STRING);

STRING.key = 'STRING';
STRING.prototype.toSql = function() {
  if (!this._binary) {
    return 'NVARCHAR(' + this._length + ')';
  } else{
    return 'BINARY(' + this._length + ')';
  }
};

var BOOLEAN = function() {
  if (!(this instanceof BOOLEAN)) return new BOOLEAN();
  BaseTypes.BOOLEAN.apply(this, arguments);
};
util.inherits(BOOLEAN, BaseTypes.BOOLEAN);

BOOLEAN.key = 'BOOLEAN';
BOOLEAN.prototype.toSql = function() {
  return 'BIT';
};

var BLOB = function() {
  if (!(this instanceof BLOB)) return new BLOB();
  BaseTypes.BLOB.apply(this, arguments);
};
util.inherits(BLOB, BaseTypes.BLOB);

BLOB.key = 'BLOB';
BLOB.prototype.toSql = function() {
  return 'VARBINARY(MAX)';
};

var UUID = function() {
  if (!(this instanceof UUID)) return new UUID();
  BaseTypes.UUID.apply(this, arguments);
};
util.inherits(UUID, BaseTypes.UUID);

UUID.key = 'UUID';
UUID.prototype.toSql = function() {
  return 'CHAR(36)';
};

var NOW = function() {
  if (!(this instanceof NOW)) return new NOW();
  BaseTypes.NOW.apply(this, arguments);
};
util.inherits(NOW, BaseTypes.NOW);

NOW.key = 'NOW';
NOW.prototype.toSql = function() {
  return 'GETDATE()';
};

[STRING, BOOLEAN, BLOB, UUID].forEach(function (dataType) {
  if (!dataType.extend) {
    dataType.extend = function(oldType) {
      return new dataType(oldType.options);
    };
  }
})

module.exports = {
  BOOLEAN: BOOLEAN,
  STRING: STRING,
  BLOB: BLOB,
  UUID: UUID,
  NOW: NOW
};