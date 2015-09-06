
define(['angular', './../../../log', './../../../config'], function(angular, log, config){

	log.debug('Enter into define function of reportCtrl.js');

	var dataHelperName = config.id + '.dataHelper';

	return ['$scope', '$state', '$stateParams', dataHelperName, function($scope, $state, $stateParams, dataHelper){
		log.debug("Enter into scope function of reportCtrl");

        // define a object to record current report infomation

        $scope.currentReport = {
        	'id': null,
        	'responseTimePieChartConfig' : null // TODO: it does not work when this is set to {}, not sure the casue
        };

        $scope.responseTimePieChartReady = function(chart) {

        	log.debug('The response Time\'s pie chart is ready');


        };

		$scope.reportTreeConfig = {
			"core" : {
                "animation" : 0,
                "check_callback" : true,
                "themes" : { "stripes" : true },
                'worker' : false,
                'multiple' : false,
                'data' : dataHelper.getReportTreeData()
            },
            'state' : {
                "key" : "webmeter_report_tree"
            },
            'search' : {
                show_only_matches: false
            },
            'plugins': ['wholerow', 'search', 'state']
		};

		var reportTree = null;
		$scope.onInitTree = function(tree){
			log.debug("On init report tree");
			reportTree = tree;
			log.dir(reportTree);
		};

		$scope.onSelectTreeNode = function(event, data) {
			if(data.action == "select_node"){
	            var node = data.node.original;
                log.debug('node ' + node.id + ' is clicked');
	            if(node.id != $scope.currentReport['id']){

                    $state.go(config.id + "Content", {
                        "rid" : node.id
                    });
	            }
	        }
		};

		var refreshSize = function(){
			var scale = $scope.$contentScale();
			var treeHeader = angular.element('.webmeter-wrap .tree-header');
			var treeWrap = angular.element('.webmeter-wrap .tree-body > div');
			var treeSerach = treeWrap.find('> div');
			var treeDiv = treeWrap.find('.jstree');


			var contentHeader = angular.element('.webmeter-wrap .wm-workspace');
			var contentBody = angular.element('.webmeter-wrap .wm-content');

			//log.dir(treeWrap.height());
			//log.dir(treeSerach.height());
			//log.dir(treeDiv.height());
			treeDiv.css('height', (scale.height - treeHeader.height() - treeSerach.height() -5) +'px');
			contentBody.css('height', (scale.height - contentHeader.height()) + 'px');
		}

		$scope.$on('updateSize', function(){
			log.info('update related size when window size changed');
			refreshSize();
		});

		// TODO: call it when tree is ready
		refreshSize();

	}];
});