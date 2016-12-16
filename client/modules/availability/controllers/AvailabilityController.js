/**
 * Created by avzal on 06.12.2016.
 */
angular.module("availability")
	.controller('AvailabilityController',["calendarResolve","AvailabilityAPIService","TimezoneService",function(calendarResolve,AvailabilityAPIService,TimezoneService){
		var calendar=new CalendarWeekClass();
		this.timezones = TimezoneService.getList();
		this.TZ = this.timezones[0];
		this.headerDays=calendar.getRangeByDay(null,"60 minute").map(function(item){return {date:item}});
		var week=calendar.getWeekDays().map(function(item){return {date:item,days:null,selectedDays:[],ranges:[]}});
		for(var i=0; i<week.length; i++){
			var weekDay=week[i];
			weekDay.days=calendar.getRangeByDay(weekDay.date,"30 minute").map(function(item){return {date:item}});
		}
		this.weekDays=week;
		this.definData=function(selectedDays,allDays,weekDay){
			allDays.forEach(function(item){
				delete item.isHide;
				delete item.colspan;
				delete item.range;
			});
			weekDay.ranges=calendar.createRanges(selectedDays,"30 minute");
			selectedDays.forEach(function(day){
				var isFirstDay=weekDay.ranges.filter(function(f){return f.range.start.is(day.date)})[0];
				if(isFirstDay){
					day.colspan=isFirstDay.range.every("30 minute").length-1;
					day.range=isFirstDay.range;
				}else{
					day.isHide=true;
				}
			})
			this.getTotalTime();
		};

		this.addRange=function(){
			calendarResolve=[
				{
					"id"      :"VkGV", // текстовый идентификатор одного слота
					"start_at":"2016-12-15T15:00:00+0200",
					"end_at"  :"2016-12-15T16:00:00+0200"
				},
				{
					"id"      :"VkGV", // текстовый идентификатор одного слота
					"start_at":"2016-12-14T11:00:00+0200",
					"end_at"  :"2016-12-14T16:00:00+0200"
				},
				{
					"id"      :"VkGV", // текстовый идентификатор одного слота
					"start_at":"2016-12-14T04:00:00+0200",
					"end_at"  :"2016-12-14T06:00:00+0200"
				},
				{
					"id"      :"VkGV", // текстовый идентификатор одного слота
					"start_at":"2016-12-13T11:00:00+0200",
					"end_at"  :"2016-12-13T11:30:00+0200"
				}];
			this.loadData();
		};

		this.totalTime=new totalTimeClass(0);

		this.getTotalTime=function(){
			var totalTime=0;
			for(var i=0; i<this.weekDays.length; i++){
				var weekDay=this.weekDays[i];
				for(var j=0; j<weekDay.ranges.length; j++){
					var range=weekDay.ranges[j];
					totalTime+=range.range.minutes();
				}
			}
			this.totalTime=new totalTimeClass(totalTime);
		}

		this.loadData=function(){
			var transformer=new TransformRangeClass();
			var ranges=transformer.fromAPI(calendarResolve);
			for(var i=0; i<this.weekDays.length; i++){
				var weekDay=this.weekDays[i];
				for(var j=0; j<ranges.length; j++){
					var range=ranges[j];
					var hoursInRange=calendar.getHoursInRanges(weekDay.days,range.range);
					if(hoursInRange.length>0){
						if(hoursInRange.length>1)
							hoursInRange.pop();
						var isPush=true;
						for(var k=0; k<weekDay.ranges.length; k++){
							var oldRange=weekDay.ranges[k];
							if(oldRange.range.intersect(range.range).isValid()){
								var newRange=oldRange.range.union(range.range);
								weekDay.ranges[k]={range:newRange};
								weekDay.selectedDays=calendar.unionDays(weekDay.selectedDays,hoursInRange);
								calendar.createRanges(weekDay.selectedDays,"30 minute");
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
			this.getTotalTime();
		}
		this.loadData();
		this.getTitle=function(hour){
			if(!hour.range)
				return null;
			return hour.range.start.format('{h}:{mm} {TT}')+" - "+hour.range.end.format('{h}:{mm} {TT}');
		};

		this.sendToApi=function(){
			var transformer=new TransformRangeClass();
			var result=[];
			for(var i=0; i<this.weekDays.length; i++){
				var week=this.weekDays[i];
				result=result.concat(transformer.toAPI(week.ranges));
			}
			AvailabilityAPIService.save(result);
			alert("saved to localstorage")
		}

	}])
	.directive("bsShowTooltip",["$tooltip","$timeout","$window",function($tooltip,$timeout,$window){
		var tooltips=[];
		var resizeTimeOut=null;
		angular.element($window).on("resize",function(){
			if(resizeTimeOut){
				$timeout.cancel(resizeTimeOut);
			}
			resizeTimeOut=$timeout(function(){
				var newTooltips=[];
				for(var i=0; i<tooltips.length; i++){
					var tooltip=tooltips[i];
					tooltip.destroy();
					var newTooltip=$tooltip(tooltip.el,tooltip.$options);
					newTooltip.el=tooltip.el;
					newTooltip.myScope = tooltip.myScope;
					newTooltip.myScope.newTooltip = newTooltip;
					newTooltips.push(newTooltip);
					(function(newTooltip){

						//console.log( newTooltip.myScope );
						newTooltip.myScope.$watch( function(){
							return newTooltip.myScope.show;
						},function(n){
							$timeout(function(){
								if(n)
									newTooltip.show();
								else
									newTooltip.hide();
							},0);
						});
					})(newTooltip);
				}
				tooltips=newTooltips;
			},50);
		});
		return {
			scope:{
				title    :"@",
				container:"@",
				show     :"="
			},
			link :function(scope,elem){
				var trigger="hover focus";
				if(scope.show!==undefined)
					trigger="manual";
				var tooltip=$tooltip(elem,{title:scope.title,container:scope.container,trigger:trigger});
				tooltip.el=elem;
				tooltip.myScope = scope;
				tooltips.push(tooltip);
				function showHide(n,o){
					if(n===o)
						return;
					$timeout(function(){
						if(n){
							tooltip.show();
						}
						else
							tooltip.hide();
					},0);
				}

				showHide(scope.show);
				scope.$watch("show",showHide);
				scope.$watch("title",function(){
					if(tooltip)
						tooltip.destroy();
					tooltips.splice(tooltips.indexOf(tooltip),1);
					tooltip=$tooltip(elem,{title:scope.title,container:scope.container,trigger:trigger});
					tooltip.el=elem;
					tooltip.myScope = scope;
					tooltips.push(tooltip);
				});
				scope.$on("$destroy",function(){
					if(tooltip)
						tooltip.destroy();
					if(scope.newTooltip)
						scope.newTooltip.destroy();
				})
			}
		}
	}]);