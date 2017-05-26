(function(){
    angular
    .module('myApp',['base64','ngStorage']);
    //Registering Angular Controller
    angular.module('myApp')
    .controller('mainController',mainController);    
    //Registering Angular Service
    angular.module('myApp')
    .service('authService',authService);


    authService.$inject = ['$http'];
    mainController.$inject = ['$scope','$localStorage','$base64','authService'];
    
    function mainController($scope,$localStorage,$base64,authService){
        var vm = $scope;
        $scope.title = authService.getService();
    }//end:mainController

    function authService($http){
        return{
            getService:getService
        };
        function getService(){
            return 'Angular GitHub API Authentication';
        }//end:getService
    }
}());//iife