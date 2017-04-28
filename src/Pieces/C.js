"use strict";
let Piece = require("./Piece.js");
class C extends Piece{
    constructor (name,x,y) {
        super(name,x,y);
    }
}
module.exports = C;