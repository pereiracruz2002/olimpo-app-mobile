App.factory('PagamentoService', function($http, URL_API, $httpParamSerializerJQLike, $filter){
    var factory = {};

    factory.getDirectSession = function() 
    {
        return $http({
            method: 'POST',
            url: URL_API+'pagamento/getDirectSession',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }
    factory.pagamento= function(dados) 
    {
        return $http({
            method: 'POST',
            data: $httpParamSerializerJQLike(dados),
            url: URL_API+'pagamento/pagar',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.validarCupom = function(dados)
    {
        return $http({
            method: 'POST',
            data: $httpParamSerializerJQLike(dados),
            url: URL_API+'pagamento/cupom',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    factory.getEndereco = function(cep)
    {
        var dados = {
            'cep': cep
        };

        return $http({
            method: 'POST',
            data: $httpParamSerializerJQLike(dados),
            url: URL_API+'cep',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    return factory;
});
