/**
 * Created by avzal on 20.12.2016.
 */
angular.module('intro')
	.controller('introController',["$rootScope","$state","$timeout","IntroService",function($rootScope,$state,$timeout,IntroService){
		this.getOptions=function(){
			this.introOptions=IntroService.getOptions(this.stateName);
		}
		this.isHaveIntro=function(){
			return this.introOptions?this.introOptions.steps.length>0:false;
		};

		var that=this;
		this.introExit=function(){
			IntroService.setViewd(that.stateName);
		};
		this.callIntro=function(){
			this.callMe();
		};
		function refreshIntro(state){
			this.stateName=state.name;
			this.getOptions();
			if(!IntroService.isViewd(this.stateName)){
				$timeout((function(){this.callIntro();}).bind(this),1000);
			}
		};
		refreshIntro.bind(this)($state.current);

		$rootScope.$on("$stateChangeSuccess",(function(event,toState){
			refreshIntro.bind(this)(toState);
		}).bind(this));
	}]);
