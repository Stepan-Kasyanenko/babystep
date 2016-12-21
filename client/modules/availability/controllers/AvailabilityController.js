/**
 * Created by avzal on 06.12.2016.
 */
angular.module("availability")
	.controller('AvailabilityController',["calendarResolve","AvailabilityAPIService","TimezoneService","toaster","IntroService","TransformRangeService",function(calendarResolve,AvailabilityAPIService,TimezoneService,toaster,IntroService,TransformRangeService){
		this.timezones=TimezoneService.getList();
		this.TZ=this.timezones[0];
		this.ranges=TransformRangeService.fromAPI(calendarResolve);

		//For testing purpose adding range
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
			var result=TransformRangeService.toAPI(this.ranges);
			console.log("sendToApi",result);
			AvailabilityAPIService.save(result);
			toaster.pop('success',"Message","Success saved to localstorage");
		}
	}]);