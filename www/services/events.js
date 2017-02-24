App.factory('EventsService', function($http, URL_API, $httpParamSerializerJQLike, $filter){
    var factory = {};


    factory.getInfo = function(event_id)
    {
        return $http({
            method: 'GET',
            url: URL_API+'evento/info/'+event_id
        });
    }

    factory.isConfirmed = function(event_id)
    {
        var dados = {
            'event_id': event_id,
            'token': localStorage.getItem('token')
        }
        return $http({
            method: 'POST',
            url: URL_API+'evento/isConfirmed',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });
    }
    factory.addEventGuest = function(dados){
        return $http({
            method: 'POST',
            url: URL_API+'evento/addEventGuest',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });
    }

    factory.checkInviteFriendsForEvent = function(event_id){
        var dados = {
            'event_id': event_id,
            'token': localStorage.getItem('token')
        }
        return $http({
            method: 'POST',
            url: URL_API+'evento/checkInviteFriendsForEvent',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });

    }


    factory.insertInvitedInEvent = function(dados){

        return $http({
            method: 'POST',
            url: URL_API+'evento/insertInvitedInEvent',
            data: dados,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });

    }

    factory.invitedEmail = function(dados){

        return $http({
            method: 'POST',
            url: URL_API+'evento/invitedEmail',
            data: dados,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });
    }


    factory.insertCommentForEvent = function(event_id,comment){

        var dados = {
            'event_id': event_id,
            'token': localStorage.getItem('token'),
            'comment':comment
        }

        return $http({
            method: 'POST',
            url: URL_API+'evento/insertCommentForEvent',
            data: $httpParamSerializerJQLike(dados),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });
    }


    factory.getEventsPublic= function(cidade, estado)
    {
        return $http({
            method: 'POST',
            url: URL_API+'evento/getTypesPublic',
            data:"cidade="+cidade+"&estado="+estado,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        })

    }


    factory.getEventDetailPublic = function(event_id)
    {
       return $http({
            method: 'GET',
            url: URL_API+'evento/getEventDetailPublic/'+event_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }); 
    }

    factory.getListEventsPublic = function(event_type_id)
    {
        return $http({
            method: 'GET',
            url: URL_API+'evento/getEventsPublic/'+event_type_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    return factory;

});
