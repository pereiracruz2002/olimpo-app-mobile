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
            window.plugins.OneSignal
             .startInit("9a887929-acb0-4e32-aa2d-7c2b25a8fe8d", "197198791318")
             .handleNotificationOpened(notificationOpenedCallback)
             .endInit();
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

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'views/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '',
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'views/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.events', {
        url: '/events/:event_type_id',
        views: {
            'menuContent': {
                templateUrl: 'views/events.html',
                controller: 'EventsCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.event_detail', {
        url: '/event_detail/:event_id',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/event_detail.html',
                controller: 'EventDetailCtrl',
                params: {
                    'event_id': ''
                }
            },
            'fabContent': {
                template: ''
            }
        }
    })


    .state('app.event_category', {
        url: '/event_category',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/event_category.html',
                controller: 'EventCategorylCtrl',
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.event_map', {
        url: '/event_map/:event_id',
        views: {
            'menuContent': {
                templateUrl: 'views/event_detail_maps.html',
                controller: 'EventDetailMapCtrl',
                params: {
                    'event_id': ''
                }
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })


    .state('app.register', {
        url: '/register/:code/:email',
        views: {
            'menuContent': {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                params: {
                    'code': '',
                    'email': ''
                }
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
            }
        }
    })

    .state('app.perfil', {
        url: '/perfil/:id',
        views: {
            'menuContent': {
                templateUrl: 'views/perfil.html',
                controller: 'PerfilCtrl'
            },
            'fabContent': {
                template: '',
            }
        }
    })

    .state('app.curriculum', {
        url: '/curriculum/:chef_id',
        views: {
            'menuContent': {
                templateUrl: 'views/curriculum.html',
                controller: 'CurriculumCtrl'
            },
            'fabContent': {
                template: '',
            }
        }
    })

    .state('app.editar', {
        url: '/editar',
        views: {
            'menuContent': {
                templateUrl: 'views/editar.html',
                controller: 'EditarCtrl'
            },
            'fabContent': {
                template: '',
            }
        }
    })
    .state('app.configuracoes', {
        url: '/configuracoes',
        views: {
            'menuContent': {
                templateUrl: 'views/configs.html',
                controller: 'ConfiguracoesContrller'
            },
            'fabContent': {
                template: '',
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});

App.filter('formata_datetime', function(){
    return function(msg) {
        var data_time = msg.split(' ');
        var data = data_time[0].split('-');
        return data[2]+"/"+data[1]+'/'+data['0'] +' - '+data_time[1].substr(0,5);
    }
});

App.constant('$ionicLoadingConfig', {
      template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
});
