App.filter('trustAsHTML', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

App.filter('formatar_preco', function(){
    return function(valor) {
        return number_format(valor, 2, ',','.');
    };
});

App.filter('formata_data', function(){
    return function(str) {
        if(typeof str != "undefined"){
            var data = str.split('-');
            return data[2]+'/'+data[1]+'/'+data[0];
        }
    };
});
App.filter('formata_datetime', function(){
    return function(str) {
        if(typeof str != "undefined"){
            var time= str.split(' ');
            var data = time[0].split('-');
            return data[2]+'/'+data[1]+'/'+data[0]+' '+time[1];
        }
    };
});

App.filter('data_extenso', function(){
    return function(str){
        if(typeof str != "undefined"){
            var mes = {
                '01': 'Jan',
                '02': 'Fev',
                '03': 'Mar',
                '04': 'Abr',
                '05': 'Mai',
                '06': 'Jun',
                '07': 'Jul',
                '08': 'Ago',
                '09': 'Set',
                '10': 'Out',
                '11': 'Nov',
                '12': 'Dez'
            }
            var arr = str.substr(0,10).split('-');
            return arr[2]+' - '+mes[arr[1]]+' - '+arr[0];
        }
    }
})
