"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = void 0;
class Evaluator {
    constructor() {
        this.str = "";
        this.pos = -1;
        this.ch = "";
    }
    evaluate(expression, resultIsInteger = false) {
        this.str = expression;
        this.pos = -1;
        const outcome = this.parse();
        if (resultIsInteger) {
            return Math.round(outcome);
        }
        return outcome;
    }
    nextChar() {
        this.ch = (++this.pos < this.str.length) ? this.str.charAt(this.pos) : "";
    }
    eat(charToEat) {
        while (this.ch === ' ') {
            this.nextChar();
        }
        if (this.ch === charToEat) {
            this.nextChar();
            return true;
        }
        return false;
    }
    parse() {
        this.nextChar();
        const x = this.parseExpression();
        if (this.pos < this.str.length) {
            return Evaluator.INVALID_NUMBER;
        }
        return x;
    }
    parseExpression() {
        let x = this.parseTerm();
        for (;;) {
            if (this.eat('+')) {
                x += this.parseTerm();
            }
            else if (this.eat('-')) {
                x -= this.parseTerm();
            }
            else {
                return x;
            }
        }
    }
    parseTerm() {
        let x = this.parseFactor();
        for (;;) {
            if (this.eat('*')) {
                x *= this.parseFactor();
            }
            else if (this.eat('/')) {
                x /= this.parseFactor();
            }
            else {
                return x;
            }
        }
    }
    parseFactor() {
        if (this.eat('+')) {
            return this.parseFactor();
        }
        if (this.eat('-')) {
            return -this.parseFactor();
        }
        let x;
        const startPos = this.pos;
        if (this.eat('(')) {
            x = this.parseExpression();
            this.eat(')');
        }
        else if ((this.ch >= '0' && this.ch <= '9') || this.ch === '.') {
            while ((this.ch >= '0' && this.ch <= '9') || this.ch === '.') {
                this.nextChar();
            }
            x = parseFloat(this.str.substring(startPos, this.pos));
        }
        else if (this.ch >= 'a' && this.ch <= 'z') {
            while (this.ch >= 'a' && this.ch <= 'z') {
                this.nextChar();
            }
            const func = this.str.substring(startPos, this.pos);
            x = this.parseFactor();
            if (func === 'sqrt') {
                x = Math.sqrt(x);
            }
            else if (func === 'sin') {
                x = Math.sin(this.degreesToRadians(x));
            }
            else if (func === 'cos') {
                x = Math.cos(this.degreesToRadians(x));
            }
            else if (func === 'tan') {
                x = Math.tan(this.degreesToRadians(x));
            }
            else {
                return Evaluator.INVALID_NUMBER;
            }
        }
        else {
            return Evaluator.INVALID_NUMBER;
        }
        if (this.eat('^')) { // exponentiation
            x = Math.pow(x, this.parseFactor());
        }
        return x;
    }
    degreesToRadians(degrees) {
        const pi = Math.PI;
        return degrees * (pi / 180);
    }
}
exports.Evaluator = Evaluator;
Evaluator.INVALID_NUMBER = -1234567.654;
