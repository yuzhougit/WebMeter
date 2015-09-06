
define(['angular', '../../log'], function(angular, log){

	return ['$q', 'Restangular', 'InfluxDbUrl', function($q, Restangular, InfluxDbUrl){

		var getReportTreeData = function() {
			var data = [];

			data.push({
                'id' : 'tp1',
                'parent' : "#",
                'children': [],
                'text' : 'GS_Platfrom_All',
                'icon' : "fa fa-folder-o"
            });

            data.push({
                'id' : 'gaas20',
                'parent' : 'tp1',
                'children': false,
                'text' : 'gaas20(1.5.3)',
                'icon' : "fa fa-file-o"
            });

            data.push({
                'id' : 'gaas51',
                'parent' : 'tp1',
                'children': false,
                'text' : 'gaas51(1.5.3)',
                'icon' : "fa fa-file-o"
            });

            data.push({
                'id' : 'gaas100',
                'parent' : 'tp1',
                'children': false,
                'text' : 'gaas100(1.5.3)',
                'icon' : "fa fa-file-o"
            });

            data.push({
                'id' : 'tp2',
                'parent' : "#",
                'children': [],
                'text' : 'Other',
                'icon' : "fa fa-folder-o"
            });
           
            for(var i=10; i<20; i++) {
            	data.push({
	                'id' : 'tp' + i,
	                'parent' : "tp1",
	                'text' : 'Run_' + i,
	                'icon' : "fa fa-file-o"
	            });
            }

			return data;
		};

        var queryUrl = InfluxDbUrl + '/query';
        var countData = {};

        var getResponseTimeCountData = function(measure) {

            if(countData[measure]) { // count data has been existed
                return $q(function(resolve) {
                    resolve(countData[measure]);
                });
            } else {

                var countAll = Restangular.oneUrl('queryCount', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'select count(elapsed) from ' + measure
                }).then(function(data){
                    //log.debug('Get count all for ' + measure);
                    return {'total': data['results'][0]['series'][0]['values'][0][1]};
                });

                var count2s = Restangular.oneUrl('queryCount', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'select count(elapsed) from ' + measure + ' where elapsed <= 2000'
                }).then(function(data){
                    //log.debug('Get count not more than 2s for ' + measure);
                    return {'count2s': data['results'][0]['series'][0]['values'][0][1]};
                });

                var count2_5s = Restangular.oneUrl('queryCount', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'select count(elapsed) from ' + measure + ' where elapsed <= 5000 and elapsed > 2000'
                }).then(function(data){
                    //log.debug('Get count not more than 2s for ' + measure);
                    return {'count2_5s': data['results'][0]['series'][0]['values'][0][1]};
                });

                var count5_10s = Restangular.oneUrl('queryCount', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'select count(elapsed) from ' + measure + ' where elapsed <= 10000 and elapsed > 5000'
                }).then(function(data){
                    //log.debug('Get count not more than 2s for ' + measure);
                    return {'count5_10s': data['results'][0]['series'][0]['values'][0][1]};
                });

                var count10_s = Restangular.oneUrl('queryCount', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'select count(elapsed) from ' + measure + ' where  elapsed > 10000'
                }).then(function(data){
                    //log.debug('Get count not more than 2s for ' + measure);
                    return {'count10_s': data['results'][0]['series'][0]['values'][0][1]};
                });

                return $q.all([count2s, count2_5s, count5_10s, count10_s]).then(function(results){
                    log.debug('Get all results for combinded requests');
                    countData[measure] = angular.extend.apply(this, results);
                    //log.dir(countData);
                    return countData[measure];
                });
            }
        };

        var stats = {};
        var getUserList = function(measure) {
            if(stats[measure] && stats[measure]['users']) {
                return $q(function(resolve) {
                    resolve(stats[measure]['users']);
                });
            } else {
                return Restangular.oneUrl('userList', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'SHOW TAG VALUES FROM ' + measure + ' WITH KEY = threadName'
                }).then(function(data){
                    //log.debug('Get count all for ' + measure);
                    if(!stats[measure]) {
                        stats[measure] = {};
                    }

                    stats[measure]['userList'] = data['results'][0]['series'][0]['values'];
                    return stats[measure]['userList'];
                });
            }
        };

        var getMeanResponseTime = function(measure) {
            if(stats[measure] && stats[measure]['meanResponse']) {
                return $q(function(resolve) {
                    resolve(stats[measure]['meanResponse']);
                });
            } else {
                return Restangular.oneUrl('meanResponse', queryUrl).get({
                    'db' : 'mydb',
                    'q': 'SELECT mean(elapsed) from ' + measure
                }).then(function(data){
                    if(!stats[measure]) {
                        stats[measure] = {};
                    }

                    stats[measure]['meanResponse'] = data['results'][0]['series'][0]['values'][0][1];
                    return stats[measure]['meanResponse'];
                });
            }
        };

        var getPercentile = function(measure, percent) {
            var valname = 'percentileResponse' + percent;
            if(stats[measure] && stats[measure][valname]) {
                return $q(function(resolve) {
                    resolve(stats[measure][valname]);
                });
            } else {
                return Restangular.oneUrl(valname, queryUrl).get({
                    'db' : 'mydb',
                    'q': 'SELECT percentile(elapsed, ' + percent + ') from ' + measure
                }).then(function(data){
                    if(!stats[measure]) {
                        stats[measure] = {};
                    }

                    stats[measure][valname] = data['results'][0]['series'][0]['values'][0][1];
                    return stats[measure][valname];
                });
            }
        }

		return {
			'getReportTreeData': getReportTreeData,
            'getResponseTimeCountData': getResponseTimeCountData,
            'getUserList': getUserList,
            'getMeanResponseTime': getMeanResponseTime,
            'getPercentile': getPercentile
		};
	}];
});