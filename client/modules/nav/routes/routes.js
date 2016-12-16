/**
 * Created by avzal on 06.12.2016.
 */
angular.module("nav")
	.config(["$stateProvider",function($stateProvider){
		$stateProvider
			.state('home',{
				url         :'/',
				templateUrl :'client/modules/nav/views/index.html',
				controller  :"NavController",
				controllerAs:"vm",
				resolve     :{
					menuResolver:["NavService",function(NavService){
						return NavService.getMenus();
					}]
				}
			})
	}]);