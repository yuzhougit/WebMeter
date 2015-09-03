
define(['angular', './../../../log', './../../../config'], function(angular, log, config){

    log.info('Enter into define function of content.js');

	var moduleName = config.id + '.report.content';
	var controllerName = config.id + '.reportContentCtrl';
	var module = angular.module(moduleName)
	.controller(controllerName, ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){

        log.info('Enter into the function of controller: ' + controllerName);
        

        //show data for an specific report, improve the logic
        if(($scope.currentReport['id'] = $stateParams.rid) === '') {
            $state.go(config.id + 'Content', {
                rid: 'gaas20'
            });
            return;
        } else {
            log.info("Current report id: " + $scope.reportId);
        }

	}]);

	return module;
});