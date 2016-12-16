/**
 * Created by avzal on 14.12.2016.
 */
angular.module("sugarFilter",[])
	.filter("sugarFormat",function(){
		return function(input,format){
			return new Date(input).format(format);
		}
	})