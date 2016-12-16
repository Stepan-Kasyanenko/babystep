/**
 * Created by avzal on 07.12.2016.
 */
angular.module("availability",[])
	.run(["NavService",function(NavService){
		NavService.put({name:"Availability",href:"home.availability",role:"Guest",order:0});//.put({name:"About",href:"home.about",role:"Authenticate",order:0.1});
	}]);
