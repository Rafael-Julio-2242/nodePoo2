"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var ImageSchema = new Schema({
    name: String,
    path: String,
});
exports.ImageSchema = ImageSchema;
