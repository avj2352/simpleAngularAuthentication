(function(){
    angular
    .module('myApp',['base64','ngStorage']);
    //Registering Angular Controller
    angular.module('myApp')
    .controller('mainController',mainController);    
    //Registering Angular Service
    angular.module('myApp')
    .service('authService',authService);


    authService.$inject = ['$http','$base64'];
    mainController.$inject = ['$scope','$base64','$localStorage','authService'];
    
    function mainController($scope,$base64,$localStorage,authService){
        var vm = $scope;
        $scope.title = authService.getService();
        vm.loginForm = {
            userName:'',
            password:''
        };

        vm.resetForm = function(loginFormObj){
            loginFormObj.userName = '';
            loginFormObj.password = '';
        };//end:resetForm

        vm.submitForm = function(loginFormObj){
            
        };//end:submitForm
    }//end:mainController

    function authService($http, $base64){
        return{
            getService:getService
        };
        function getService(){
            return 'Angular GitHub API Authentication';
        }//end:getService
    }
}());//iife