'use strict';

var BaseTypes = require('../../data-types')
  , util = require('util');

var UUID = function() {
  if (!(this instanceof UUID)) return new UUID();
  BaseTypes.UUID.apply(this, arguments);
};
util.inherits(UUID, BaseTypes.UUID);

UUID.key = 'UUID';
UUID.prototype.toSql = function() {
  return 'CHAR(36) BINARY';
};

[UUID].forEach(function (DataType) {
  if (!DataType.extend) {
    DataType.extend = function(oldType) {
      return new DataType(oldType.options);
    };
  }
});

module.exports = {
  UUID: UUID
};