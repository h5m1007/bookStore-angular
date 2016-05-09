angular.module('bookStoreApp', [
        // 依赖注入
        'ui.router', 'ngGrid', 'BookListModule', 'BookDetailModule', 'bookStoreServices', 'AddBookModule'
    ])
    .run(function($rootScope, $state, $stateParams) {
        // 把$state和$stateParams放在$rootScope
        // 便于其它地方引用和注入
        $rootScope.$state = $state;
        // $stateParams 包含url携带的参数,返回键值对
        $rootScope.$stateParams = $stateParams;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        // 使用 ui-router 代替ng原生路由
        // ui-router支持嵌套视图
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'tpls/home.html'
                    },
                    'main@index': {
                        templateUrl: 'tpls/loginForm.html'
                    }
                }
            })
            .state('booklist', {
                url: '/{bookType:[0-9]{1,4}}', // 正则 匹配1到4的数字
                views: {
                    '': {
                        templateUrl: 'tpls/booklist.html'
                    },
                    'booktype@booklist': {
                        templateUrl: 'tpls/bookType.html'
                    },
                    'bookgrid@booklist': {
                        templateUrl: 'tpls/bookGrid.html'
                    }
                }
            })
            .state('addbook', {
                url: '/addbook',
                templateUrl: 'tpls/addBookForm.html'
            })
            .state('bookdetail', {
                url: '/booktype/:TypeId/bookdetail/:bookId',
                templateUrl: 'tpls/BookDetail.html'
            });
    });
