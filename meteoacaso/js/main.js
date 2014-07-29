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
    
    $scope.baseT = {sp: 20, su: 30, au: 15, wi: 5};
    $scope.conditions = [
        {icon: 'day-cloudy', label: 'Parzialmente Nuvoloso', tMod: 0, class: 'sunny', weight: {sp: 0, su: 0, au: 0, wi: 0}},
        {icon: 'cloudy', label: 'Nuvoloso', tMod: -3},
        {icon: 'snow', label: 'Neve', tMax: 2, tMin: -4}
    ];
      
    $scope.days = function(){
        var days = [];
        var randomDay = function(delta){
            var d = new Date().getTime() + 86400*1000*delta;
            var c = $scope.conditions[Math.floor(Math.random()*$scope.conditions.length)];
            var t = Math.floor(Math.random()*30);
            var day = {
                date: $window.moment(d).calendar(),
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
