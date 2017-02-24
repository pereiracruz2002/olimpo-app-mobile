App.run(function($ionicPlatform, $rootScope, UserService, $state) {
  	$ionicPlatform.registerBackButtonAction(function () {
        if ($state.current.name == "app.profile" || $state.current.name == "login") {
          // do something for this state
           navigator.app.exitApp();
        } else {
          navigator.app.backHistory();
        }
    }, 100);

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        var notificationOpenedCallback = function(jsonData) {
           console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
         };
    });

    $rootScope.$on('$stateChangeStart', function() {
        if(localStorage.getItem('token') && typeof $rootScope.user == 'undefined'){
            UserService.getInfo().then(function(result){
                $rootScope.user = result.data;
            });
        }
    });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.navBar.alignTitle('center');

    /*
    // Turn off back button text
    */
    $ionicConfigProvider.backButton.previousTitleText(false);

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    }).state('preregister', {
        url: '/preregister',
        templateUrl: 'views/preregister.html',
        controller: 'preRegisterCtrl'
    })
    .state('register', {
        url: '/register/:code/:email?',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        params: {
            'code': '',
            'email': ''
        }
    })
    .state('esqueci_senha', {
        url: '/esqueci_senha',
        templateUrl: 'views/esqueci_senha.html',
        controller: 'LoginCtrl',
    })

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html',
		controller: 'TabsCtrl'
    })
    .state('tab.friends', {
        url: '/friends',
        views: {
            'friends': {
                templateUrl: 'views/friends.html',
                controller: 'FriendsCtrl'
            }
        }
    })

    .state('tab.home',{
        url: '/home',
        views:{
            'home':{
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
            }
        }

    })

    .state('tab.minha_conta',{
        url: '/minha_conta',
        views:{
            'minha_conta':{
                templateUrl: 'views/minha_conta.html',
                controller: 'minha_contaCtrl'
            }
        }

    })

    .state('tab.events_chef', {
        url: '/events_chef',
        views: {
            'events_chef': {
                templateUrl: 'views/events_chef.html',
                controller: 'EventsChef'
            }
        }
    })
    .state('tab.chef_events', {
        url: '/chef_events/:user_id',
        params:{
            'user_id': ''
        },
        views: {
            'events_chef': {
                templateUrl: 'views/chef_events.html',
                controller: 'ChefEvents'
            }
        }
    })
    .state('tab.events_public', {
        url: '/events_public',
        views: {
            'events_chef': {
                templateUrl: 'views/events_public.html',
                controller: 'EventsPublic'
            },
        }
    })
    .state('tab.lista_evento_public', {
        url: '/lista_evento_public/:event_id',
        params:{
            'event_id': ''
        },
        views: {
            'events_chef': {
                templateUrl: 'views/event_public_list.html',
                controller: 'EventsPublicList'
            },
        }
    })

     .state('tab.detalhe_evento_public', {
        url: '/detalhe_evento_public/:event_id',
        params:{
            'event_id': ''
        },

        views: {
            'events_chef': {
                 templateUrl: 'views/event_public_detail.html',
                 controller: 'EventDetailPublic'
        
            },
        }
       
    })
    .state('detalhe_evento', {
        url: '/event/:event_id',
        templateUrl: 'views/event_detail.html',
        controller: 'EventDetail'
    })

    .state('event_confirm', {
        url: '/event_confirm/:event_id',
        templateUrl: 'views/event_confirm.html',
        params: {
            'event_id': ''
        },
        controller: 'EventConfirm'
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});

App.filter('formata_datetime', function(){
    return function(msg) {
        var data_time = msg.split(' ');
        var data = data_time[0].split('-');
        return data[2]+"/"+data[1]+'/'+data['0'] +' - '+data_time[1].substr(0,5);
    }
});


