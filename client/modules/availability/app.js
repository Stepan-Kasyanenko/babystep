/**
 * Created by avzal on 07.12.2016.
 */
angular.module("availability",['calendarWeek'])
	.run(["NavService",function(NavService){
		NavService.put({name:"Availability",state:"home.availability",role:"Guest",order:0}).put({name:"About",state:"home.about",role:"Authenticate",order:0.1});
	}]);
