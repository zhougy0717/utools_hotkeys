const chai = require('chai');
const expect = chai.expect;

// 被测试的函数
function add(a, b) {
    return a + b;
}

// Mocha 测试套件
describe('Add Function', () => {
    it('should return 5 when adding 2 and 3', () => {
        const result = add(2, 3);
        expect(result).to.equal(5);
    });

    it('should return 0 when adding -2 and 2', () => {
        const result = add(-2, 2);
        expect(result).to.equal(0);
    });

    it('should return -5 when adding -2 and -3', () => {
        const result = add(-2, -3);
        expect(result).to.equal(-5);
    });
});