'use strict';

angular.module('nav')
	.controller('NavController',['menuResolver',function(menuResolver){
		this.menus=menuResolver;
	}]);
