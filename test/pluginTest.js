var assert = require("assert");

describe('[thing-it] ecobee Plugin', function () {
    var testDriver;

    before(function () {
        testDriver = require("thing-it-test").createTestDriver({logLevel: "error"});

        testDriver.registerDevicePlugin(__dirname + "/../gasMeter");
    });
    describe('Start Configuration', function () {
        this.timeout(5000);

        it('should complete without error', function () {
            return testDriver.start({
                configuration: require("../examples/configuration.js"),
                heartbeat: 10
            });
        });
    });
    describe('State Change', function () {
        this.timeout(5000);

        before(function () {
            testDriver.removeAllListeners();
        });
        it('should produce Device State Change message', function (done) {
            testDriver.addListener({
                publishDeviceStateChange: function (device, state) {
                    if (device.id === "gasMeter" && state.consumption === 0) {
                        done();
                    }
                    else {
                        done('Unexpected Device State Change message');
                    }
                }
            });
        });
    });
});





