import { Calculator } from "./Calculator";

class DecCalculator extends Calculator{
    constructor(settings) {
        super(settings);
        console.log( this.getName() );
    }

    changeNumber(root) {
        let activeElement = root.find('.active');
        activeElement.attr("contenteditable", true);
        activeElement.trigger("focus");
    }

    initEvents() {
        this.$calculatorDOMElement.find(".display-number").on('click', (event) => {
            const parentLabel = $(event.target).parent(".display-number");
            this.changeNumber(parentLabel);
        });
        this.$calculatorDOMElement.find(".operator-bar").first().on('click', (event) => {
            this.checkNumber();
            this.updateResult();
        });
    }

    add(numberX, numberY) {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = numberX.length - 1; i >= 0; i--) {
            let carryBit = numberX[i] + numberY[i] + result[i];
            if (carryBit > 9) {
                //carryBit.toString(...)
                result[i] = carryBit - 10;
                result[i - 1] = 1;
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    updateResult() {
       let root =  this.$calculatorDOMElement;
       root.find(".group-number .result-bit span").get().reverse().forEach((element, index) =>
          $(element).text(this.resultNumberArray[index])
    )}


}


export {DecCalculator};
