"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const Evaluator_1 = require("./Evaluator");
const axios = require('axios');
class CustomLogic extends homey_1.default.App {
    constructor() {
        super(...arguments);
        this._imageSet = false;
    }
    // -------------------- INIT ----------------------
    async onInit() {
        this.sendNotifications();
    }
    // -------------------- Notification updates ----------------------
    async sendNotifications() {
        try {
            //const ntfy2023100401 = `It's time to set up a **party**!`;
            //await this.homey.notifications.createNotification({
            //excerpt: ntfy2023100401
            //});
        }
        catch (error) {
            this.log('sendNotifications - error', error);
        }
        let evaluator = new Evaluator_1.Evaluator();
        // -------------------- Trigger cards ----------------------
        // this.homey.flow.getTriggerCard('number_above_threshold')
        //  .registerRunListener(async (args, state) => {
        //     const { number1, number2 } = args;
        //     return parseInt(number1) > parseInt(number2);
        // });
        // this.homey.flow.getTriggerCard('number_below_threshold')
        //     .registerRunListener(async (args, state) => {
        //         const { number1, number2 } = args;
        //         return parseInt(number1) < parseInt(number2);
        // });
        // -------------------- Condition cards ----------------------
        this.homey.flow.getConditionCard('number_greater_than')
            .registerRunListener(async (args, state) => {
            const { number, number2 } = args;
            const isGreaterThan = number > number2;
            return Promise.resolve(isGreaterThan);
        });
        this.homey.flow.getConditionCard('number_less_than')
            .registerRunListener(async (args, state) => {
            const { number, number2 } = args;
            const isSmallerThan = number < number2;
            return Promise.resolve(isSmallerThan);
        });
        this.homey.flow.getConditionCard('text_has_value')
            .registerRunListener(async (args, state) => {
            const { text, waarde } = args;
            const hasValue = text.includes(waarde);
            return Promise.resolve(hasValue);
        });
        this.homey.flow.getConditionCard('text_has_exactly')
            .registerRunListener(async (args, state) => {
            const { text, waarde } = args;
            const isExactValue = text === waarde;
            return Promise.resolve(isExactValue);
        });
        this.homey.flow.getConditionCard('boolean_is_exactly')
            .registerRunListener(async (args, state) => {
            const { boolean } = args;
            const isExact = boolean === true;
            return Promise.resolve(isExact);
        });
        // -------------------- Action cards ----------------------  
        this.homey.flow.getActionCard('calculate-float').registerRunListener((args, state) => {
            let resultCalc = evaluator.evaluate(args.formula.replace(",", "."));
            if (resultCalc == Evaluator_1.Evaluator.INVALID_NUMBER) {
                this.error(args.formula + " is not a mathematical expression");
                throw new Error(args.formula + " is not a mathematical expression");
            }
            return {
                result: resultCalc
            };
        });
        this.homey.flow.getActionCard('calculate-int').registerRunListener((args, state) => {
            let resultCalc = evaluator.evaluate(args.formula.replace(",", "."), true);
            if (resultCalc == Evaluator_1.Evaluator.INVALID_NUMBER) {
                this.error(args.formula + " is not a mathematical expression");
                throw new Error(args.formula + " is not a mathematical expression");
            }
            return {
                result: resultCalc
            };
        });
        this.homey.flow.getActionCard('generate-random-number').registerRunListener((args, state) => {
            const { min, max } = args;
            if (min < max) {
                const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
                return {
                    result: randomValue
                };
            }
            else {
                this.error("Invalid range parameters");
                throw new Error("Invalid range parameters");
            }
        });
        this.homey.flow.getActionCard('calculate-bmi').registerRunListener((args, state) => {
            const { weight, height } = args;
            const heightMeters = height / 100;
            const bmi = weight / (heightMeters * heightMeters);
            const roundedBMI = parseFloat(bmi.toFixed(2));
            return {
                result: roundedBMI
            };
        });
        this.homey.flow.getActionCard('calculate').registerRunListener((args, state) => {
            const { number1, text, number2 } = args;
            let result;
            switch (text) {
                case '+':
                    result = number1 + number2;
                    break;
                case '-':
                    result = number1 - number2;
                    break;
                case '*':
                    result = number1 * number2;
                    break;
                case '/':
                    if (number2 === 0) {
                        this.error('Division by zero is not allowed.');
                        throw new Error('Division by zero');
                    }
                    result = number1 / number2;
                    break;
                default:
                    this.error('Invalid operator entered. Please use +, -, *, or /.');
                    throw new Error('Invalid operator');
            }
            return {
                result: result
            };
        });
        this.homey.flow.getActionCard('calculate-days-between-dates').registerRunListener((args, state) => {
            const { date1, date2 } = args;
            const date1Parts = date1.split('-');
            const date2Parts = date2.split('-');
            const date1Obj = new Date(parseInt(date1Parts[2], 10), parseInt(date1Parts[1], 10) - 1, parseInt(date1Parts[0], 10));
            const date2Obj = new Date(parseInt(date2Parts[2], 10), parseInt(date2Parts[1], 10) - 1, parseInt(date2Parts[0], 10));
            if (date1Obj < date2Obj) {
                const timeDiff = date2Obj.getTime() - date1Obj.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return {
                    result: daysDiff
                };
            }
            else {
                return {
                    result: 0
                };
            }
        });
        this.homey.flow.getActionCard('temporary-number').registerRunListener((args, state) => {
            return {
                result: args.number
            };
        });
        this.homey.flow.getActionCard('temporary-string').registerRunListener((args, state) => {
            return {
                result: args.string
            };
        });
        this.homey.flow.getActionCard('temporary-url').registerRunListener((args, state) => {
            return {
                result: args.string
            };
        });
        this.homey.flow.getActionCard('temporary-image').registerRunListener(async (args, state) => {
            const { imageUrl } = args;
            try {
                if (!this._image) {
                    this._imageSet = false;
                }
                this._image = await this.homey.images.createImage();
                await this._image.setStream(async (stream) => {
                    const response = await axios.get(imageUrl, { responseType: 'stream' });
                    if (response.status !== 200) {
                        this.error('Error fetching image:', response.statusText);
                        throw new Error('Error fetching image');
                    }
                    response.data.pipe(stream);
                });
                const tokens = {
                    image: this._image
                };
                return tokens;
            }
            catch (error) {
                this.error('Error setting image:', error);
                throw new Error('Error setting image');
            }
        });
        this.log('Custom Logic has been initialized');
    }
}
module.exports = CustomLogic;
