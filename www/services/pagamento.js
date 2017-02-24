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
            url: URL_API+'pagamento/pagseguro',
            //url: URL_API+'pagamento/pagar',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }
    return factory;
});
