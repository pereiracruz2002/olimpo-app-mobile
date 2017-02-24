App.factory('UserService', function($http, URL_API, $httpParamSerializerJQLike, $filter){
    var factory = {};

    factory.login = function(dados) 
    {
        return $http({
            method: 'POST',
            url: URL_API+'usuario/login',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.getNotificacoes = function()
    {
        var dados = {'token': localStorage.getItem('token') };
        return $http({
            method: 'POST',
            url: URL_API+'usuario/notificacoesConfig',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.setNotificacoes = function(dados)
    {
        dados.token = localStorage.getItem('token');
        return $http({
            method: 'POST',
            url: URL_API+'usuario/notificacoesConfig',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    factory.getInfo = function()
    {
        var dados = {'token': localStorage.getItem('token') };
        return $http({
            method: 'POST',
            url: URL_API+'usuario/info',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.fbLogin = function(accessToken) 
    {
        var dados = {'accessToken': accessToken};
        return $http({
            method: 'POST',
            url: URL_API+'usuario/fbLogin',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.checkRegisterCode = function(dados) 
    {
        return $http({
            method: 'POST',
            url: URL_API+'usuario/checkCode',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    factory.register = function(dados) 
    {
        return $http({
            method: 'POST',
            url: URL_API+'usuario/register',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    factory.getCategories = function(token) 
    {
        return $http({
            method: 'GET',
            url: URL_API+'categorias'
        });
    }
    factory.getEvents = function(token,event_type_id) 
    {
        return $http({
            method: 'GET',
            url: URL_API+'evento/usuario/'+token+'/'+event_type_id
        });
    }

    factory.getCategoriesByEvents = function(token)
    {
        return $http({
            method: 'GET',
            url: URL_API+'evento/categoriasEventosUsuario/'+token
        });
    }

    factory.getEventsInvited = function(token) 
    {
        return $http({
            method: 'GET',
            url: URL_API+'evento/convidado/'+token
        });
    }

    factory.canRequestChef = function() 
    {
        var dados = {'token': localStorage.getItem('token') };
        return $http({
            method: 'POST',
            url: URL_API+'usuario/canRequestChef',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    factory.requestChef= function(dados) 
    {
        dados.token = localStorage.getItem('token');
        return $http({
            method: 'POST',
            url: URL_API+'usuario/requestChef',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.getFriends = function(dados)
    {
        return $http({
            method: 'POST',
            url: URL_API+'usuario/getListFriends',

            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.geraCodigo = function(dados){

        return $http({
            method: 'POST',
            url: URL_API+'usuario/geraCodigo',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

    }

    factory.getPerfil = function(dados){
        return $http({
            method: 'POST',
            url: URL_API+'usuario/getPerfil',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    factory.verificacaoSolicitacaoChef = function(dados){

        return $http({
            method: 'POST',
            url: URL_API+'usuario/verificacaoSolicitacaoChef',
            data: dados,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });
    }

    factory.getNotificationUser = function() 
    {
        var dados = {'token': localStorage.getItem('token') };
        return $http({
            method: 'POST',
            url: URL_API+'usuario/getNotificationUser',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.updatePicture = function(imagem) 
    {
        var dados = {
            'token': localStorage.getItem('token'),
            'imagem':imagem 
        };
        return $http({
            method: 'POST',
            url: URL_API+'usuario/updatePicture',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.updatePushNotification = function(player,token) 
    {
        var dados = {
            'token': localStorage.getItem('token'),
            'player_id':player,
            'device_token':token 
        };
        return $http({
            method: 'POST',
            url: URL_API+'usuario/updatePushNotification',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    

    return factory;
});
