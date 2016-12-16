/**
 * Created by avzal on 07.12.2016.
 */
angular.module("nav")
	.service("NavService",[function(){
		var menus=[];

		function removeByKey(array,object,key){
			var i=0;
			for(; i<array.length; i++){
				var obj=array[i];
				if(obj[key]===object[key])
					break;
			}
			return array.slice(i,1);
		}

		return {
			put     :function(object){
				menus.push(object);
				return this;
			},
			remove  :function(object){
				removeByKey(menus,object,"href");
				return this;
			},
			getMenus:function(){
				return menus;
			}
		}
	}]);