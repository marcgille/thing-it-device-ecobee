module.exports = {
    metadata: {
        family: "electricMeter",
        plugin: "electricMeter",
        label: "ecobee © Smart Electric Meter",
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
        return new ElectricMeter();
    },
    discovery: function (options) {
        var discovery = new ElectricMeterDiscovery();

        discovery.options = options;

        return discovery;
    }
};

var q = require('q');

function ElectricMeterDiscovery() {
    /**
     *
     * @param options
     */
    ElectricMeterDiscovery.prototype.start = function () {
        if (this.node.isSimulated()) {
        } else {
        }
    };

    /**
     *
     * @param options
     */
    ElectricMeterDiscovery.prototype.stop = function () {
    };
}

/**
 *
 */
function ElectricMeter() {
    /**
     *
     */
    ElectricMeter.prototype.start = function () {
        var deferred = q.defer();

        this.operationalState = {
            status: 'PENDING',
            message: 'Waiting for initialization...'
        };
        this.publishOperationalStateChange();

        this.state = {consumption: 0};

        if (this.isSimulated()) {
            setInterval(function () {
                this.state.consumption = Math.floor((Math.random() * 1000));
                this.state.batteryLevel = 100 - 20 * Math.floor((Math.random() * 6));

                this.publishStateChange();
            }.bind(this), 10000);

            this.operationalState = {
                status: 'OK',
                message: 'Smart Electric Meter successfully initialized'
            }
            this.publishOperationalStateChange();

            deferred.resolve();
        } else {
            this.operationalState = {
                status: 'OK',
                message: 'Smart Electric Meter successfully initialized'
            }
            this.publishOperationalStateChange();

            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    ElectricMeter.prototype.setState = function (state) {
        this.state = state;

        this.publishStateChange();
    };

    /**
     *
     */
    ElectricMeter.prototype.getState = function () {
        return this.state;
    };
}
