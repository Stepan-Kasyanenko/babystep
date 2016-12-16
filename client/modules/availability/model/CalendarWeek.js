/**
 * Created by avzal on 14.12.2016.
 */
(function(window){
	function CalendarWeekClass(){
		Sugar.extend();
		Date.setLocale('en');
	}

	CalendarWeekClass.prototype.getRangeByDay=function(pDay,pPeriod){
		var date=Date.create(pDay || new Date());
		var range=Date.range(date.beginningOfDay(),date.clone().endOfDay());
		return range.every(pPeriod);
	};

	CalendarWeekClass.prototype.getWeekDays=function(pStartDate){
		var date=Date.create(pStartDate || new Date());
		var range=Date.range(date.beginningOfWeek(),date.clone().endOfWeek());
		return range.every("1 day");
	};
	CalendarWeekClass.prototype.createRanges=function(pDays,pPeriod){
		var result=[];
		if(pDays.length==0)
			return result;
		if(pDays.length==1){
			result.push({range:Date.range(pDays[0].date,pDays[0].date.clone().addMinutes(30))});
			return result;
		}
		for(var i=0; i<pDays.length; i++){
			var initDay=pDays[i];
			var startDay=pDays[i];
			var endDay=null;
			for(var j=i+1; j<pDays.length; j++){
				endDay=pDays[j];
				if(Date.range(startDay.date,endDay.date).every(pPeriod).length==2){
					i++;
					startDay=pDays[i];
				}
				else{
					var newRange={range:Date.range(initDay.date,startDay.date.clone().addMinutes(30))};
					result.push(newRange);
					break;
				}
			}
			if(i==pDays.length-1){
				var newRange={range:Date.range(initDay.date,startDay.date.clone().addMinutes(30))};
				result.push(newRange);
			}
		}
		return result;
	};
	CalendarWeekClass.prototype.getHoursInRanges=function(pDays,pRange){
		var result=[];
		pDays.forEach(function(item){
			if(pRange.contains(item.date))
				result.push(item);
		});
		return result;
	};

	CalendarWeekClass.prototype.unionDays=function(pDays,pDays2){
		var result=[].concat(pDays);

		function hasInResilt(d){
			return !!result.filter(function(f){return f.date.is(d.date);})[0];
		}
		for(var i=0; i<pDays2.length; i++){
			var day2=pDays2[i];
			if(day2){
				if(!hasInResilt(day2))
					result.push(day2);
			}
		}
		return result;
	};

	function totalTimeClass(time){
		this.hour=Math.floor(time/60);
		this.minutes=time%60;
	}

	totalTimeClass.prototype.format=function(){

		var hourStr=" hour";
		if(this.hour>1)
			hourStr+="s";
		if(this.hour>0)
			hourStr=this.hour+hourStr;
		else
			hourStr=null;

		var minuteStr=" minute";
		if(this.minutes>1)
			minuteStr+="s";
		if(this.minutes>0)
			minuteStr=this.minutes+minuteStr;
		else
			minuteStr=null;

		var result="0 hour";
		if(minuteStr && hourStr)
			result=hourStr+" and "+minuteStr;
		else if(!minuteStr && hourStr)
			result=hourStr;
		else if(!hourStr && minuteStr)
			result=minuteStr;
		return result;
	}
	window.CalendarWeekClass=CalendarWeekClass;
	window.totalTimeClass=totalTimeClass;
})(window);