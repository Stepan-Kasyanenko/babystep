/**
 * Created by avzal on 14.12.2016.
 */
(function(window){
	function TransformRangeClass(){
	}

	TransformRangeClass.prototype.toAPI=function(pRanges){
		var result=[];
		pRanges.forEach((function(item){
			var apiRange=this.toAPISingle(item);
			result.push(apiRange);
		}).bind(this));
		return result;
	};
	TransformRangeClass.prototype.toAPISingle=function(pRange){
		var apiRange={};
		apiRange.id=pRange.id;
		apiRange.start_at=pRange.range.start.toString();
		apiRange.end_at=pRange.range.end.toString();
		return apiRange;
	};
	TransformRangeClass.prototype.fromAPI=function(pRangesApi){
		var result=[];

		pRangesApi.forEach((function(item){
			var range=this.fromAPISingle(item);
			result.push(range);
		}).bind(this));
		return result;
	};
	TransformRangeClass.prototype.fromAPISingle=function(pRangeApi){
		var range={};
		range.id=pRangeApi.id;
		range.range=Date.range(Date.create(pRangeApi.start_at),Date.create(pRangeApi.end_at));
		return range;
	};
	window.TransformRangeClass=TransformRangeClass;
})(window);