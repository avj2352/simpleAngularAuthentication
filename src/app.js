(function(){
    angular
    .module('myApp',['base64']);
    //Registering Angular Controller
    angular.module('myApp')
    .controller('mainController',mainController);    
    //Registering Angular Service
    angular.module('myApp')
    .service('authService',authService);
    //Registering the endpoint as a constant. Change this endpoint to your specific URL
    angular.module('myApp')
    .constant('loginEndPoint','https://seagatesystemtest.testrail.net/');
    // .constant('loginEndPoint','http://localhost');
    //NOTE: Registering the apiEndpoint
    angular.module('myApp')
    .constant('apiEndpoint','index.php?/api/v2/')    


    authService.$inject = ['$http','loginEndPoint','apiEndpoint'];
    mainController.$inject = ['$scope','$base64','authService','$sce'];
    
    function mainController($scope,$base64,authService,$sce){
        var vm = $scope;
        vm.formObject = {username:'',password:''};
        vm.isLoggedIn = false;
        $scope.title = authService.getService();       
        $scope.userNameHeader = '';

        //If username and password is not set, show the modal
        var isUser = authService.getUsername();
        var isPassword = authService.getPassword();        
        if((isUser && isPassword) && (isUser!=='' && isPassword !=='')){
            console.log('Username is: ', isUser, ' & password: ', isPassword);
        }else{
            vm.isLoggedIn = true;
        }//endif

        
        
        //Event handlers - loginUser, resetUser
        vm.loginUser = function(inputFormObj){
            vm.formObject = inputFormObj;
            if(vm.formObject.username && vm.formObject.username!==''){
                $scope.userNameHeader = vm.formObject.username;
                authService.setUsername($base64.encode(vm.formObject.username));
            }
            if(vm.formObject.password && vm.formObject.password!==''){
                authService.setPassword($base64.encode(vm.formObject.password));
            }
            vm.isLoggedIn = false;
        };//end:loginUser

        vm.resetUser = function(){
            vm.formObject = {username:'',password:''};
            vm.isLoggedIn = false;
        };//end:resetUser
        
        //Submit XHR Request
        vm.submitRequest = function(inputRequest){
            isUser = authService.getUsername();
            isPassword = authService.getPassword();
            if(isUser && isPassword && inputRequest){   
                var inputXHRRequest = {
                    username:isUser,
                    password:isPassword,
                    xhrRequest:inputRequest
                };
            var getTestRailApiService = authService.getTestRailApi(inputXHRRequest);
            getTestRailApiService.then(function(response){
                console.log('Response from API is: ', response);
            });//end:then
            }else{
                console.error('Application Error - insufficient parameters: ', isUser,' : ', isPassword,' : ',inputRequest);
            }
            console.log('Input Request is: ', inputRequest);
        };//end:inputRequest

        // Trigger a modal if isLoggedIn is true
        $scope.$watch('isLoggedIn',function(newValue,oldValue){
            if(newValue){
            $('#myModal').modal('show');
            }else{
            $('#myModal').modal('hide');
            }
        });//end:$watch
        
    }//end:mainController

    function authService($http,loginEndPoint,apiEndpoint){
        var userInfo = {username:'', password:''};
        return{
            getService:getService,
            getUsername:getUsername,
            setUsername:setUsername,
            getPassword:getPassword,
            setPassword:setPassword,
            getTestRailApi:getTestRailApi,
            getTextRailPage:getTextRailPage
        };//end:return


        function getService(){
            return 'Test Rail Web API POC';
        }//end:getService

        function getUsername(){
            return userInfo.username;
        }//end:getUsername

        function setUsername(name){
            userInfo.username = name;
            console.log('Username set as:',name);
        }//end:setUsername

        function getPassword(){
            return userInfo.password;
        }//end:getPassword

        function setPassword(password){
            userInfo.password = password;
            console.log('Password set as:',password);
        }//end:setPassword

        function getTestRailApi(requestObj){
            if(!requestObj){
                throw('getTextRailAPI error:');                            
            }//endif:
            var xhrRequest = requestObj.xhrRequest;
            var promise = $http({
                method:'GET',
                url:loginEndPoint+apiEndpoint+xhrRequest,
                data:'',
                headers:{                    
                    "Content-Type":"application/json",
                    "Authorization":"Basic "+ requestObj.username +":"+ requestObj.password
                }
            })
            .then(function(response){
                return response.data;
            });
            return promise;
        }//end:getTestRailApi

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
                console.error('Angular Service Error sending githubAuthenticate', data);
            });//end:sucu
            return promise;
        }//end:githubAuthenticate

    }//end:authService
}());//iife