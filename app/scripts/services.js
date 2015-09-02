
define(['angular', '../config', './service/dataHelper'], function(angular, config, dataHelper){

	var serviceModuleName = config.id + '.services';

	var serviceModule = angular.module(serviceModuleName, []);

	serviceModule
	.constant("InfluxDbUrl", "http://10.158.164.58:8086")
	.factory(config.id + '.dataHelper', dataHelper);

	return serviceModule;
});