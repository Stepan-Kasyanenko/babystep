/**
 * Created by avzal on 06.12.2016.
 */
angular.module("availability")
	.config(["$stateProvider",function($stateProvider){
		$stateProvider
			// nested list with custom controller
			.state('home.availability',{
				url         :'availability',
				templateUrl :'client/modules/availability/views/availability.html',
				controller  :"AvailabilityController",
				controllerAs:"vm",
				resolve     :{
					calendarResolve:["AvailabilityAPIService",function(AvailabilityAPIService){
						return AvailabilityAPIService.load();
					}]
				}
			});
	}]);
