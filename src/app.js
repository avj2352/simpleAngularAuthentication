(function(){
    angular
    .module('myApp',['base64','ngStorage']);
    //Registering Angular Controller
    angular.module('myApp')
    .controller('mainController',mainController);    
    //Registering Angular Service
    angular.module('myApp')
    .service('authService',authService);
    //Registering the endpoint as a constant. Change this endpoint to your specific URL
    angular.module('myApp')
    .constant('loginEndPoint','https://api.github.com/users');


    authService.$inject = ['$http','loginEndPoint'];
    mainController.$inject = ['$scope','$base64','$localStorage','authService'];
    
    function mainController($scope,$base64,$localStorage,authService){
        var vm = $scope;
        vm.resultName = ''; // Result Name from XHR Will be stored in this
        vm.imageUrl = ''; // Result Avatar Image from XHR Will be stored in this image
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
                if(response.data.length>0){
                    vm.resultName = response.data[0].login;
                    vm.imageUrl = response.data[0].avatar_url;
                }else{
                    console.error('Sorry Response is not in Array format');
                }
            });
        };//end:submitForm
    }//end:mainController

    function authService($http,loginEndPoint){
        return{
            getService:getService,
            githubAuthenticate:githubAuthenticate
        };
        function getService(){
            return 'Angular GitHub API Authentication';
        }//end:getService

        function githubAuthenticate(loginFormObj){
            //For OAuth you need to encode the userName and password
            // loginFormObj.userName = $base64.encode(loginFormObj.userName);
            // loginFormObj.password = $base64.encode(loginFormObj.password);            
            var promise = $http({
                method:'GET',
                url:loginEndPoint,
                params:{                    
                    client_id:loginFormObj.userName,
                    client_secret:loginFormObj.password                    
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