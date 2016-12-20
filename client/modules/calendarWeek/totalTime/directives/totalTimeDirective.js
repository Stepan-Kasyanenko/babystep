/**
 * Created by avzal on 20.12.2016.
 */
angular.module('calendarWeek')
	.directive('totalTime',function(){
		return {
			restrict        :"E",
			replace         :true,
			templateUrl     :"client/modules/calendarWeek/totalTime/views/index.html",
			controller      :'totalTimeController',
			controllerAs    :"vm",
			bindToController:{
				ranges         :"=",
				totalTime      :"=?",
				totalTimeString:"=?"
			},
			scope           :true
		}
	});
