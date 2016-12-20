/**
 * Created by avzal on 20.12.2016.
 */
angular.module('timezone')
	.directive('timezone',function(){
		return {
			restrict        :"E",
			replace         :true,
			templateUrl     :"client/modules/timezone/views/index.html",
			controller      :'timezoneController',
			controllerAs    :"vm",
			bindToController:{
				TZ      :"=?"
			},
			scope           :true
		}
	});
