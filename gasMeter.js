module.exports = {
    metadata: {
        family: "gasMeter",
        plugin: "gasMeter",
        label: "ecobee © Smart Gas Meter",
        tangible: true,
        discoverable: true,
        state: [{
            id: "consumption",
            label: "Consumption",
            type: {
                id: "number"
            }
        }],
        actorTypes: [],
        sensorTypes: [],
        services: [],
        configuration: []
    },
    create: function () {
        return new GasMeter();
    },
    discovery: function (options) {
        var discovery = new GasMeterDiscovery();

        discovery.options = options;

        return discovery;
    }
};

var q = require('q');

function GasMeterDiscovery() {
    /**
     *
     * @param options
     */
    GasMeterDiscovery.prototype.start = function () {
        if (this.node.isSimulated()) {
        } else {
        }
    };

    /**
     *
     * @param options
     */
    GasMeterDiscovery.prototype.stop = function () {
    };
}

/**
 *
 */
function GasMeter() {
    /**
     *
     */
    GasMeter.prototype.start = function () {
        var deferred = q.defer();

        this.state = {consumption: 0};

        if (this.isSimulated()) {
            setInterval(function () {
                this.state.consumption = Math.floor((Math.random() * 1000));
                this.state.batteryLevel = 100 - 20 * Math.floor((Math.random() * 6));

                this.publishStateChange();
            }.bind(this), 10000);
            deferred.resolve();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    GasMeter.prototype.setState = function (state) {
        this.state = state;

        this.publishStateChange();
    };

    /**
     *
     */
    GasMeter.prototype.getState = function () {
        return this.state;
    };
}
