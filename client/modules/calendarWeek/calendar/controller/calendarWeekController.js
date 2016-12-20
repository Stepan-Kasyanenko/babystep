/**
 * Created by avzal on 20.12.2016.
 */
angular.module('calendarWeek')
	.controller('calendarWeekController',["$timeout","$scope","CalendarWeekService",function($timeout,$scope,CalendarWeekService){

		this.defineData=function(weekDay){
			weekDay.ranges=CalendarWeekService.createRanges(weekDay.selectedDays,"30 minute");
			modifyTable(weekDay);
			this.ranges=createOutRange(this.weekDays);
			var _this=this;
			$timeout(function(){
				onRangeChange(_this.rangesChange,_this.ranges);
			});
		};
		var startDate=null;

		function initDays(ranges){
			var newDay = (ranges && ranges[0])?ranges[0].range.startDate:new Date()
			if(startDate!==newDay){
				startDate=newDay;
				this.headerDays=CalendarWeekService.getRangeByDay(startDate,"60 minute");
				this.weekDays=CalendarWeekService.getWeekDays(startDate);
				for(var i=0; i<this.weekDays.length; i++){
					var weekDay=this.weekDays[i];
					weekDay.days=CalendarWeekService.getRangeByDay(weekDay.date,"30 minute");
				}
			}
		}

		this.loadData=function(n,o){
			initDays.bind(this)(n);
			var ranges=n;
			for(var i=0; i<this.weekDays.length; i++){
				var weekDay=this.weekDays[i];
				for(var j=0; j<ranges.length; j++){
					var range=ranges[j];
					var hoursInRange=CalendarWeekService.getHoursInRanges(weekDay.days,range.range);
					if(hoursInRange.length>0){
						if(hoursInRange.length>1)
							hoursInRange.pop();
						var isPush=true;
						for(var k=0; k<weekDay.ranges.length; k++){
							var oldRange=weekDay.ranges[k];
							if(oldRange.range.intersect(range.range).isValid()){
								var newRange=oldRange.range.union(range.range);
								weekDay.ranges[k]={range:newRange};
								weekDay.selectedDays=CalendarWeekService.unionDays(weekDay.selectedDays,hoursInRange);
								CalendarWeekService.createRanges(weekDay.selectedDays,"30 minute");
								weekDay.selectedDays.forEach(function(day){
									var isFirstDay=weekDay.ranges.filter(function(f){return f.range.start.is(day.date)})[0];
									if(isFirstDay){
										day.colspan=isFirstDay.range.every("30 minute").length-1;
										day.range=isFirstDay.range;
									}else{
										day.isHide=true;
									}
								})
								isPush=false;
								break;
							}
						}
						if(isPush){
							weekDay.selectedDays=weekDay.selectedDays.concat(hoursInRange);
							weekDay.ranges.push(range);
							var isFirstDay=hoursInRange[0];
							isFirstDay.colspan=range.range.every("30 minute").length-1;
							isFirstDay.range=range.range;
							hoursInRange.slice(1).forEach(function(f){f.isHide=true;});
						}
					}
				}
			}
		}
		function addWatch(){
			var _this=this;
			$scope.$watch(function(){return _this.ranges},_this.loadData.bind(_this),true);
		}

		addWatch.bind(this)();

		this.getTitle=function(hour){
			if(!hour.range)
				return null;
			return hour.range.start.format('{h}:{mm} {TT}')+" - "+hour.range.end.format('{h}:{mm} {TT}');
		};

		function onRangeChange(rangesChange,ranges){
			if(rangesChange instanceof Function)
				rangesChange({ranges:ranges});
		};

		function createOutRange(weekDays){
			var ranges=[];
			for(var i=0; i<weekDays.length; i++){
				var weekDay=weekDays[i];
				ranges=ranges.concat(weekDay.ranges);
			}
			return ranges;
		}

		function modifyTable(weekDay){
			var allDays=weekDay.days;
			var selectedDays=weekDay.selectedDays;
			allDays.forEach(function(item){
				delete item.isHide;
				delete item.colspan;
				delete item.range;
			});
			selectedDays.forEach(function(day){
				var isFirstDay=weekDay.ranges.filter(function(f){return f.range.start.is(day.date)})[0];
				if(isFirstDay){
					day.colspan=isFirstDay.range.every("30 minute").length-1;
					day.range=isFirstDay.range;
				}else{
					day.isHide=true;
				}
			});
		}
	}]);
