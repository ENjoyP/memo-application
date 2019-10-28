'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Memo = new Schema({
    writer: String,
    contents: String,
    starred: [String],
    isEdited: { type: Boolean, default: false },
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    }
});

exports.default = _mongoose2.default.model('memo', Memo);