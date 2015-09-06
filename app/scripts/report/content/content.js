
define(['angular', './../../../log', './../../../config'], function(angular, log, config){

    log.info('Enter into define function of content.js');

    var dataHelperName = config.id + '.dataHelper';

	var moduleName = config.id + '.report.content';
	var controllerName = config.id + '.reportContentCtrl';
	var module = angular.module(moduleName)
	.controller(controllerName, ['$scope', '$state', '$stateParams', dataHelperName, function($scope, $state, $stateParams, dataHelper){

        log.info('Enter into the function of controller: ' + controllerName);
        
        var configResponseTimePieChart = function() {
            var measure = $scope.currentReport['id'];

            return dataHelper.getResponseTimeCountData(measure).then(function(data){

                log.debug('get all response time count data');
                
                var chartData = [];

                angular.forEach(data, function(v,k){
                    if(v) {
                        chartData.push({
                            name: k,
                            y: v,
                            sliced: true,
                            selected: true
                        });
                    }
                });

                $scope.currentReport['responseTimePieChartConfig'] =  {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "Coverage Percentage",
                        colorByPoint: true,
                        data: chartData
                    }]
                };
            });
        };

        var updateMaxUsers = function(){
            var measure = $scope.currentReport['id'];
            return dataHelper.getUserList(measure).then(function(data){

                $scope.currentReport['maxUsers'] = data.length;
            });
        }

        var updateMeanResponse = function(){
            var measure = $scope.currentReport['id'];
            return dataHelper.getMeanResponseTime(measure).then(function(data){

                $scope.currentReport['meanResponse'] = Math.round(data*100)/100;
            });
        }

        var updatePercentile= function(percent){
            var measure = $scope.currentReport['id'];
            return dataHelper.getPercentile(measure, percent).then(function(data){

                $scope.currentReport['percentileResponse' + percent] = Math.round(data*100)/100;
            });
        }

        //show data for an specific report, improve the logic
        if(($scope.currentReport['id'] = $stateParams.rid) === '') {
            $state.go(config.id + 'Content', {
                rid: 'gaas20'
            });
            return;
        } else {
            log.info("Current report id: " + $scope.currentReport['id']);
            configResponseTimePieChart();
            updateMaxUsers();
            updateMeanResponse();
            updatePercentile(90);
        }

	}]);

	return module;
});