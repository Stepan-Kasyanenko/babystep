(function(){
	'use strict';
	angular.module("myDirective")
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
						newTooltip.myScope=tooltip.myScope;
						newTooltip.myScope.newTooltip=newTooltip;
						newTooltips.push(newTooltip);
						(function(newTooltip){
							newTooltip.myScope.$watch(function(){
								return newTooltip.myScope.show;
							},function(n){
								console.log("show",n);
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
					tooltip.myScope=scope;
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
						tooltip.myScope=scope;
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
		}])
})();