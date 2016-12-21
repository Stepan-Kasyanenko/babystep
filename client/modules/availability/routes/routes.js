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
			}).state('home.about',{
				url     :'about',
				template:'<h2>This is about Stepan Kasyanenko page</h2>Email me at <a id="email" href="mailto:stepan.kasyanenko@gmail.com" target="_blank">stepan.kasyanenko@gmail.com</a>'
			})
	}]);
