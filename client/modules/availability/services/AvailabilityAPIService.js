/**
 * Created by avzal on 15.12.2016.
 */
angular.module("availability")
	.service("AvailabilityAPIService",["$localStorage",function($localStorage){
		return {
			save:function(data){
				$localStorage.savedRanges =data;
			},
			load:function(){
				return $localStorage.savedRanges || [];
			}
		}
	}]);