'use strict';

angular.module('nav').controller('NavController',['$rootScope','menuResolver',function($rootScope,menuResolver){
	this.menus=menuResolver;
	var _this = this;

	$rootScope.$on("$stateChangeStart",function(event,toState,toStateParams){
		_this.currentMenu = toState.name;
	});
}]);
