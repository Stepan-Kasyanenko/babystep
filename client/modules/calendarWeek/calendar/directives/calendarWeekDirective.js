/**
 * Created by avzal on 20.12.2016.
 */
angular.module('calendarWeek')
	.directive('calendarWeek',function(){
		return {
			restrict        :"E",
			replace         :true,
			templateUrl     :"client/modules/calendarWeek/calendar/views/index.html",
			controller      :'calendarWeekController',
			controllerAs    :"vm",
			bindToController:{
				ranges      :"=",
				rangesChange:"&"
			},
			scope           :true
		}
	});
