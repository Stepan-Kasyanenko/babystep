/**
 * Created by avzal on 06.12.2016.
 */
angular.module("crossover-video",["dependency","myDependency","modules"])
	.config(["$urlRouterProvider",function($urlRouterProvider){
		$urlRouterProvider.otherwise('/availability');
	}])
	.config([function(){
		Sugar.extend();
		Date.setLocale('en');
	}]);
angular.module("dependency",['ui.router','ngStorage','mgcrea.ngStrap','mgcrea.ngStrap.tooltip']);
angular.module("myDependency",['sugarFilter','myDirective']);
angular.module("modules",["availability","nav","timezone"]);

