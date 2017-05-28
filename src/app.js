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
    .constant('loginEndPoint','https://seagatesystemtest.testrail.net');


    authService.$inject = ['$http','loginEndPoint'];
    mainController.$inject = ['$scope','$base64','$localStorage','authService','$sce'];
    
    function mainController($scope,$base64,$localStorage,authService,$sce){
        var vm = $scope;
        //Now we are getting an HTML response, so using a different variable name, responseHTML
        vm.responseHTML = '';

        $scope.title = authService.getService();
        //We are calling the Get Page service at the beginning of the application
        var getHTMLPageService = authService.getTextRailPage();
        getHTMLPageService.then(function(response){
            if(response.data){
                vm.responseHTML = $sce.trustAsHtml(response.data);
            }//endif: response has a ppty data
        });//end:getHTMLPageService

        
    }//end:mainController

    function authService($http,loginEndPoint){
        return{
            getService:getService,
            getTextRailPage:getTextRailPage
        };
        function getService(){
            return 'Getting Test Rail Website...';
        }//end:getService

        function getTextRailPage(){                   
            var promise = $http({
                method:'GET',
                url:loginEndPoint,
                headers:{                    
                    'Content-Type':'text/html; charset=utf-8',                                    
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