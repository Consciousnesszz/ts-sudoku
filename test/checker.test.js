const checker = require('../src/ts/core/checker.js');
const expect = require('chai').expect;

describe('checker checkArr 方法测试', () => {
    it('数组中有 0 应该返回 false', () => {
        expect(checker.checkArr([0,1,2])).to.be.equal([false, true, true]);
    })
    it('数组中有重复元素应该返回 false', () => {
        expect(checker.checkArr([1, 1, 2])).to.be.equal([false, false, true]);
    })
    it('数组中没有 0 和重复元素应该返回 true', () => {
        expect(checker.checkArr([1, 2, 3])).to.be.equal([true, true, true]);
    })
})
