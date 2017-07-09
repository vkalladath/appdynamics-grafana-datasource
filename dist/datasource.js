"use strict";
exports.__esModule = true;
var AppDynamicsDatasource = (function () {
    function AppDynamicsDatasource(instanceSettings, $q, backendSrv, templateSrv) {
        this.$q = $q;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        // Controller settings porra
        this.username = instanceSettings.username;
        this.password = instanceSettings.password;
        this.url = instanceSettings.url;
        this.tenant = instanceSettings.tenant;
    }
    // EITA PORRA
    AppDynamicsDatasource.prototype.query = function (options) {
        var _this = this;
        console.log('OPTIONS');
        console.log(options);
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications/BDR/metric-data',
            method: 'GET',
            params: {
                'metric-path': 'Business Transaction Performance|Business Transactions|Java|/product/indoor|Calls per Minute',
                'time-range-type': 'BEFORE_NOW',
                'duration-in-mins': 60,
                'rollup': 'false',
                'output': 'json'
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log('RESPONSE:');
            console.log(response);
            return _this.convertMetricData(response);
        });
    };
    AppDynamicsDatasource.prototype.convertMetricData = function (metrics) {
        var response = { data: [] };
        response.data.push({ target: 'select metric',
            datapoints: [] });
        console.log(metrics.data);
        metrics.data[0].metricValues.forEach(function (metricValue) {
            response.data[0].datapoints.push([metricValue.current, metricValue.startTimeInMillis]);
        });
        return response;
    };
    AppDynamicsDatasource.prototype.testDatasource = function () {
        return this.backendSrv.datasourceRequest({
            url: this.url + '/api/controllerflags',
            method: 'GET'
        }).then(function (response) {
            if (response.status === 200) {
                return { status: 'success', message: 'Data source is working', title: 'Success' };
            }
            else {
                return { status: 'failure', message: 'Data source is not working', title: 'Failure' };
            }
        });
    };
    AppDynamicsDatasource.prototype.annotationQuery = function () {
        // TODO implement annotationQuery
    };
    AppDynamicsDatasource.prototype.metricFindQuery = function () {
        console.log('Fuck my life');
        return this.backendSrv.datasourceRequest({
            url: this.url + '/api/controllerflags',
            method: 'GET'
        }).then(function (response) {
            if (response.status === 200) {
                return { status: 'success', message: 'Data source is working', title: 'Success' };
            }
            else {
                return { status: 'failure', message: 'Data source is not working', title: 'Failure' };
            }
        });
    };
    return AppDynamicsDatasource;
}());
exports.AppDynamicsDatasource = AppDynamicsDatasource;
