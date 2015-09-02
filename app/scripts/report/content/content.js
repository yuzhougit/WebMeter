
define(['angular', './../../../log', './../../../config'], function(angular, log, config){

	var moduleName = config.id + '.report.content';
	var controllerName = config.id + '.reportContentCtrl';
	var module = angular.module(moduleName)
	.controller(controllerName, ['$scope', function($scope){

	}]);

	return module;
});