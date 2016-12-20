/**
 * Created by avzal on 20.12.2016.
 */
angular.module('calendarWeek')
	.controller("totalTimeController",["$scope","TotalTimeService",function($scope,TotalTimeService){
		$scope.$watch((function(){ return this.ranges}).bind(this),(function(){
			var totalTime=0;
			for(var i=0; i<this.ranges.length; i++){
				var weekDay=this.ranges[i];
				totalTime+=weekDay.range.minutes();
			}
			this.totalTime=new TotalTimeService(totalTime);
			this.totalTimeString=this.totalTime.format();
		}).bind(this),true);
	}]);
