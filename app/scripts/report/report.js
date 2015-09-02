define(['angular', './../../log', './../../config', './controllers/reportCtrl'], function(angular, log, config, reportCtrl){

	log.debug('Enter into define function of report.js');

	var ctrlName = config.id + '.reportCtrl';
	var reportModule = angular.module(config.id + '.report');

	reportModule.controller(ctrlName, reportCtrl);

	return reportModule;
});