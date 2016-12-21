/**
 * Created by avzal on 20.12.2016.
 */
angular.module('intro')
	.directive('introButton',function(){
		return {
			restrict        :"E",
			templateUrl     :"client/modules/intro/views/index.html",
			controller      :'introController',
			controllerAs    :"vm",
			scope           :true
		}
	});
