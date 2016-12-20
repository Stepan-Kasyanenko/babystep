/**
 * Created by avzal on 06.12.2016.
 */
angular.module("availability")
	.controller('AvailabilityController',["calendarResolve","AvailabilityAPIService","TimezoneService",function(calendarResolve,AvailabilityAPIService,TimezoneService){
		this.timezones=TimezoneService.getList();
		this.TZ=this.timezones[0];
		var transformer=new TransformRangeClass();
		this.ranges=transformer.fromAPI(calendarResolve);

		//this.addRange=function(){
		//	var transformer=new TransformRangeClass();
		//	this.ranges.push(
		//		transformer.fromAPISingle({
		//			"start_at":"Wed Dec 21 2016 10:30:00 GMT+0500 (Западная Азия (зима))",
		//			"end_at"  :"Wed Dec 21 2016 12:30:00 GMT+0500 (Западная Азия (зима))"
		//		})
		//	);
		//}

		this.sendToApi=function(){
			var transformer=new TransformRangeClass();
			var result=transformer.toAPI(this.ranges);
			console.log("sendToApi",result);
			AvailabilityAPIService.save(result);
			alert("saved to localstorage")
		}
	}]);