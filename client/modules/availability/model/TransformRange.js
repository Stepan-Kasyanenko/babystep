/**
 * Created by avzal on 14.12.2016.
 */
(function(window){
	function TransformRangeClass(){
	}

	TransformRangeClass.prototype.toAPI=function(pRanges){
		var result=[];
		pRanges.forEach(function(item){
			var apiRange={};
			apiRange.id=item.id;
			apiRange.start_at=item.range.start.toString();
			apiRange.end_at=item.range.end.toString();
			result.push(apiRange);
		});
		return result;
	};
	TransformRangeClass.prototype.fromAPI=function(pRangesApi){
		var result=[];
		pRangesApi.forEach(function(item){
			var range={};
			range.id=item.id;
			range.range=Date.range(Date.create(item.start_at),Date.create(item.end_at));
			result.push(range);
		});
		return result;
	};
	window.TransformRangeClass=TransformRangeClass;
})(window);