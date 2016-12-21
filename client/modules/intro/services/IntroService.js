/**
 * Created by avzal on 15.12.2016.
 */
angular.module("intro")
	.service("IntroService",["$localStorage",function($localStorage){
		var steps=[
			{
				element:"#stepTimezone",
				intro  :"It displays your local time zone.",
				module :"home.availability"
			},
			{
				element:"#stepTotalTime",
				intro  :"It displays the total time that you will be available this week.",
				module :"home.availability"
			},
			{
				element:"#stepCalendar",
				intro  :"You can select the available time in the week. To select different ranges in a single day, press and hold the Ctrl softkey.",
				module :"home.availability"
			},
			{
				element:".weekDay",
				intro  :"To clear the availability of the day, click on the name day of the week.",
				module :"home.availability"
			},
			{
				element:"#stepCalendarCall",
				intro  :"To save the results, press the button.",
				module :"home.availability"
			},
			{
				element:"#email",
				intro  :"Click here to email me.",
				module :"home.about"
			}
		];
		return {
			getOptions:function(name){
				return {steps:steps.filter(function(f){return f.module==name})};
			},
			setViewd  :function(name){
				$localStorage["intro"+name]=true;
			},
			getViewd  :function(name){
				return $localStorage["intro"+name];
			},
			isViewd   :function(name){
				return !!$localStorage["intro"+name];
			},
			resetViewd:function(name){
				delete $localStorage["intro"+name];
			}
		}
	}]);