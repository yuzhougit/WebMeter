// app.js: create angular module for WebMeter App
define(['angular', './log', 'text!./config.json','css!./styles/themes/css/' + $theme + '/app', 'common/components/treeView', './scripts/services'], function(angular, log, config, css, treeViewModule, services){

	var config = JSON.parse(config);

	log.debug("Enter into define function of app.js");
	window.document.title = config.name;

	// create the webmeter app module
	var moduleName = config.id;
	var appModule = angular.module(moduleName, [treeViewModule.name, services.name], function(){
		log.debug('Enter into default config function of ' + moduleName + ' module');
	});

	// add a drag bar directive in app module
	appModule.directive('dragbar', ['$document', function($document) {
	    return {
	        restrict: 'AC',
	        link: function(scope, element, attrs) {
	        	log.debug('Enter into the link function of dragbar directive');
	        	
	        	element.on('mousedown', function(e) {
					// Prevent default dragging of selected content
					event.preventDefault();

					log.debug('mouse down on drag bar: ' + e.pageX);

					//make sure the old ghost bar is removed
					angular.element('#ghostbar').remove();

					var splitBox = element.parent().parent();
					//log.dir(splitBox);
					splitBox.append(angular.element('<div>',{
						'id': 'ghostbar',
						'css': {
							'left': e.pageX
						}
					}));

					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
		        });

		        function mousemove(e) {
		        	log.debug('mousemove: ' + e.pageX);
		        	angular.element('#ghostbar').css('left', e.pageX);
		        }

		        function mouseup(e) {
		        	log.debug('mouseup: ' + e.pageX);
		        	$document.off('mousemove', mousemove);
	          		$document.off('mouseup', mouseup);
	          		angular.element('#ghostbar').remove();
	          		element.parent().css('width', e.pageX);
	          		element.parent().next().css('left', e.pageX);
			    }
	        }
	    }
	}]);

	// add the root controller of app
	var controllerName = moduleName + 'Ctrl';
	appModule.controller(controllerName, ['$scope', '$state', function($scope, $state){
		log.debug('Enter into constructor function of ' + controllerName);

		console.dir($state);

		// state changed 
		$scope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            console.error('State changed to ' + toState.name + ' fail');
            console.dir(error);
        });

        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            log.debug('State changed to ' + toState.name + ' start');
        });
        
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            log.debug(moduleName + '\'s state changed to :' + toState.name);
            switch(toState.name) {
                default:
                    $scope.$toggleSelectedItem(toState.name);
                    break;
            }
        });

	}]);

	return appModule;
});