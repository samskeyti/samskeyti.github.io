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
        {icon: 'day-cloudy', label: 'Parzialmente Nuvoloso', tMod: 0, class: 'partcloudy', weight: '553446'},
        {icon: 'cloudy', label: 'Nuvoloso', tMod: -3, class: 'cloudy',weight:'663157'},
        {icon: 'snow', label: 'Neve', tMod:0, tMax: 2, tMin: -4, class: 'snowy', weight:'310002'},
        {icon: 'hot', label: 'Caldo afoso', tMod: 7, class: 'hot', weight: '002710'},
        {icon: 'day-rain', label: 'Variabile', tMod: 0, class: 'variable', weight: '684264'},
        {icon: 'fog', label: 'Nebbia', tMod:-5, class: 'foggy', weight: '310025'},
        {icon: 'day-sunny', label: 'Sereno', tMod: 3, class: 'sunny', weight: '468963'},
        {icon: 'rain', label: 'Pioggia', tMod: -2, class: 'rainy', weight: '552256'},
        {icon: 'thunderstorm', label: 'Temporali', tMod:-4, class: 'thunder', weight: '123321'},
        
        {icon: 'meteor', label: 'Pioggia di meteore', tMod: 30, class: 'meteor', weight: '000100'}
    ];
    $scope.baseT = [5,15,23,27,20,10];
      
    $scope.days = function(){
        var days = [];
        var randomDay = function(delta){
            var b = Math.ceil(parseInt($window.moment().format('M'))/2);
            var conditions = function(){
                var arr = [];
                for(var j=0; j<$scope.conditions.length; j++){
                    var freq = parseInt($scope.conditions[j].weight[b-1]);
                    for(var k=0; k<freq; k++)
                        arr.push($scope.conditions[j]);
                }
                return arr;
            }();
            var d = new Date().getTime() + 86400*1000*delta;
            var c = conditions[Math.floor(Math.random()*conditions.length)];
            var t = $scope.baseT[b-1] - 5 + Math.floor(Math.random()*11) + c.tMod;
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
