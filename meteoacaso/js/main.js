moment.lang('it',{
    calendar : {
        lastDay : '[Ieri]',
        sameDay : '[Oggi]',
        nextDay : '[Domani]',
        lastWeek : 'dddd [scorso]',
        nextWeek : 'dddd, DD MMMM',
        sameElse : 'L'
    }
});
angular.module('App', [])
  .controller('AppController', ['$scope', '$window', function($scope, $window) {
      
    $scope.conditions = [
        {icon: 'day-cloudy', label: 'Parzialmente Nuvoloso', tMod: 0, class: 'sunny'},
        {icon: 'cloudy', label: 'Nuvoloso', tMod: -3},
        {icon: 'snow', label: 'Neve', tMax: 2, tMin: -4}
    ];
      
    $scope.days = function(){
        var days = [];
        var randomDay = function(delta){
            var c = $scope.conditions[Math.floor(Math.random()*$scope.conditions.length)];
            var t = Math.floor(Math.random()*30);
            var day = {
                date: $window.moment(new Date().getTime() + 86400*1000*delta).calendar(),
                condition: c,
                temperature: t
            };
            return day;
        };
        for(var i=0;i<7;i++){
            days.push(randomDay(i));
        }
        return days;
    }();
 
    
  }]);
