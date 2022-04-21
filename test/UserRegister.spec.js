import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

describe("Simple mocha test suite: ", () => {
  it("should add 2 + 2 together", () => {
    const result = 2 + 2;
    expect(result).to.equal(4);
  });

  it("Example of SPY: console.log() should still be called", function () {
    let consoleLogSpy = sinon.spy(console, "log");
    let message = "You will see this line of output in the test report";
    console.log(message);
    expect(consoleLogSpy.calledWith(message)).to.be.true;
    consoleLogSpy.restore();
  });

  it("Example of STUB: console.log() is replaced", () => {
    let consoleLogStub = sinon.stub(console, "log");
    let message = "You wil NOT see this line of output in the test report";
    console.log(message);
    consoleLogStub.restore();
    expect(consoleLogStub.calledWith(message)).to.be.true;
  });
});
