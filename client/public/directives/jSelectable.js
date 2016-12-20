(function(){
	'use strict';
	angular.module("myDirective")
		.directive("selectable",function(){
			return {
				scope:{
					selectableOut    :"=?",
					selectableList   :"=",
					selectableOptions:"=",
					selectableStop	 :"&"
				},
				link :function(scope,element,attr){
					var options=scope.selectableOptions || {};
					if(!options.filter)
						options.filter='*';
					var oldSelected=[];
					var isFromStop=false;
					if(scope.selectableOut){
						options.stop = stopOut;
					}
					else{
						options.stop = stopModify;
					}
					function stopOut(){
						oldSelected=[];
						scope.$apply(function(){
							element.find('.ui-selected').map(function(){
								var modelSelected=scope.selectableList[$(this).scope().$index];
								oldSelected.push(modelSelected);
							});
							isFromStop=true;
							scope.selectableOut=oldSelected;
						});
						scope.$apply(scope.selectableStop);
					};
					function stopModify(){
						scope.selectableList.forEach(function(item){ delete item.selected});
						scope.$apply(function(){
							isFromStop=true;
							element.find('.ui-selected').map(function(){
								var modelSelected=scope.selectableList[$(this).scope().$index];
								modelSelected.selected=true;
							});
						});
						scope.$applyAsync(scope.selectableStop);
					};
					scope.$watch("selectableOut",function(value,old){
						if(isFromStop){
							isFromStop=false;
							return;
						}
						old.forEach(function(item){
							angular.element(element.find(options.filter)[scope.selectableList.indexOf(item)]).removeClass("ui-selected");
						});
						value.forEach(function(item){
							angular.element(element.find(options.filter)[scope.selectableList.indexOf(item)]).addClass("ui-selected");
						});
					},true);

					scope.$watch("selectableList",function(value,old){
						if(value===old)
							return;
						if(isFromStop){
							isFromStop=false;
							return;
						}
						old.filter(function(item){return item.selected;}).forEach(function(item){
							angular.element(element.find(options.filter)[scope.selectableList.indexOf(item)]).removeClass("ui-selected");
						});
						value.filter(function(item){return item.selected;}).forEach(function(item){
							angular.element(element.find(options.filter)[scope.selectableList.indexOf(item)]).addClass("ui-selected");
						});
					},true);

					scope.$watch(attr.selectable,function(value,old){
						if(value || value===undefined){
							return element.selectable(options);
						}
						if(!value && old){
							element.selectable("destroy");
							element.find('.ui-selected').removeClass('ui-selected');
							if(scope.selectableOut){
								scope.selectableOut=[];
							}
						}
					})
				}
			}
		})
		.directive("selectableEvents",['$parse',function($parse){
			return function(scope,element,attr){
				var selectableEvents=scope.$eval(attr.selectableEvents) || {};

				$.map(selectableEvents,function(callback,eventName){
					console.log( callback,eventName );
					element.bind("selectable"+eventName,function(e,ui){
						if(e.preventDefault) e.preventDefault();

						var selectableList=scope.$eval(attr.selectableList);
						var selected=!selectableList?[]:element.find('.ui-selected').map(function(){
							return selectableList[$(this).index()];
						}).get();

						var fn=$parse(callback);
						scope.$apply(function(){
							fn(scope,{
								$ui      :ui,
								$event   :e,
								$list    :scope.$eval(attr.selectableList),
								$selected:selected
							});
						});
					});
				});
			}
		}]);
})();
