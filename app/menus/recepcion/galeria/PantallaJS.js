appExpled.lazyController('pantalla', function ($scope, $rootScope, $http, $interval) {
$scope.ip = '127.0.0.0';
$scope.pantalla= 'Pantalla1';

    $http({
        method: 'POST',
        url: IPSERVER+'JSON_CONFIG_LINEA.aspx',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        timeout:500000 
    }).success(function(data){
        console.log(data);
    })
});