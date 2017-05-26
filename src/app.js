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
            //Base 64 encoding            
            var githubAuthenticateService = authService.githubAuthenticate(loginFormObj);
            githubAuthenticateService.then(function(response){
                console.log('Response is: ', response);
            });
        };//end:submitForm
    }//end:mainController

    function authService($http){
        return{
            getService:getService,
            githubAuthenticate:githubAuthenticate
        };
        function getService(){
            return 'Angular GitHub API Authentication';
        }//end:getService

        function githubAuthenticate(loginFormObj){
            // loginFormObj.userName = $base64.encode(loginFormObj.userName);
            // loginFormObj.password = $base64.encode(loginFormObj.password);
            // console.log('Username and password: ', loginFormObj);
            var promise = $http({
                method:'GET',
                url:'http://github.com/login/oauth/authorize',
                params:{
                    client_id:loginFormObj.userName,
                    allow_signup:false
                }
            })
            .success(function(data,status,headers,config){
                return data;
            }).error(function(data,success,headers,config){
                console.error('Error sending githubAuthenticate', data);
            });//end:sucu
            return promise;
        }//end:githubAuthenticate
    }
}());//iife