
define(['../../log'], function(log){

	return [function(){

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

		return {
			'getReportTreeData': getReportTreeData
		};
	}];
});