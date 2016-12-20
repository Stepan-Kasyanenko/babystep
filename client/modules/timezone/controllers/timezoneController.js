/**
 * Created by avzal on 06.12.2016.
 */
angular.module("timezone")
	.controller('timezoneController',["TimezoneService",function(TimezoneService){
		this.timezones=TimezoneService.getList();
		this.TZ=this.timezones[0];
	}]);