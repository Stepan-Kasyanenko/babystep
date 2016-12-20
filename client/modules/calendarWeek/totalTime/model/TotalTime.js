(function(window){
	function TotalTimeClass(time){
		this.hour=Math.floor(time/60);
		this.minutes=time%60;
	}

	TotalTimeClass.prototype.format=function(){

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
	window.TotalTimeClass=TotalTimeClass;
})(window);