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
    
      $scope.regions = [
        'Abruzzo','Basilicata','Calabria','Campania','Emilia-Romagna','Friuli-Venezia Giulia','Lazio','Liguria','Lombardia','Marche','Molise','Piemonte','Puglia','Sardegna','Sicilia','Toscana','Trentino-Alto Adige','Umbria','Valle d\'Aosta','Veneto'
      ];
    
    $scope.conditions = [
        {icon: 'day-cloudy', label: 'Parzialmente Nuvoloso', tMod: 0, class: 'partcloudy', weight: '775668'},
        {icon: 'cloudy', label: 'Nuvoloso', tMod: -3, class: 'cloudy',weight:'885379'},
        {icon: 'snow', label: 'Neve', tMod:0, tMax: 2, tMin: -4, class: 'snowy', weight:'520004'},
        {icon: 'hot', label: 'Caldo afoso', tMod: 5, class: 'hot', weight: '004920'},
        {icon: 'day-rain', label: 'Variabile', tMod: 0, class: 'variable', weight: '795375'},
        {icon: 'fog', label: 'Nebbia', tMod:-5, class: 'foggy', weight: '530047'},
        {icon: 'day-sunny', label: 'Sereno', tMod: 3, class: 'sunny', weight: '579974'},
        {icon: 'rain', label: 'Pioggia', tMod: -2, class: 'rainy', weight: '663367'},
        {icon: 'thunderstorm', label: 'Temporali', tMod:-4, class: 'thunder', weight: '235532'},
        
        {icon: 'meteor', label: 'Pioggia di meteore', tMod: 30, class: 'meteor', weight: '111111'},
        {icon: 'alien', label: 'Atterraggio alieni', tMod: 0, class: 'alien', weight: '111111'},
        {icon: 'tornado', label: 'Tornado', tMod: 0, class: 'tornado', weight: '111111'},
        {icon: 'dust', label: 'Scie chimiche', tMod: 0, class: 'chemicals', weight: '111111'},
    ];
    $scope.baseT = [5,15,23,27,20,10];
      
    $scope.randomDays = function(){
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
            var t = $scope.baseT[b-1] - 5 + Math.floor(Math.random()*6) + Math.floor(Math.random()*5) + c.tMod;
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
        $scope.days = days;
    };
    $scope.randomDays();
    
    $scope.geo = function(){
        if($window.navigator && $window.navigator.geolocation) {
        // make the request for the user's position
        $window.navigator.geolocation.getCurrentPosition(function(position){
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            // set up the Geocoder object
            var geocoder = new google.maps.Geocoder();

            // turn coordinates into an object
            var yourLocation = new google.maps.LatLng(latitude, longitude);

            // find out info about our location
            geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
              if(results[0]) {
                  $scope.city = '';
                for (var y = 0, length_2 = results[0].address_components.length; y < length_2; y++){
                      var type = results[0].address_components[y].types[0];
                        if (type === "locality"){
                          $scope.city = results[0].address_components[y].long_name;
                            $scope.randomDays();
                            $scope.selR = 'city';
                            $scope.$apply();
                          break;
                        }
                    }
                
              } else {
                
              }
            } else {
              
            }
          });

        });
    }
    };  
    
  }]);



 