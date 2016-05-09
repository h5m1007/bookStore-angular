require.config({
    paths: {
        jQuery: "framework/jquery-1.11.0.min",
        angular: "framework/angular",
        angularAnimate: "framework/angular-animate",
        angularRoute: "framework/angular-route",
        angularUiRouter: "framework/angular-ui-router",
        angularBootstrap: "framework/ui-bootstrap-tpls-0.11.0",
        angularGrid: "framework/ng-grid.min",
        domReady: "js/domReady",
        app: "js/app",
        controllers: "js/controllers",
        directives: "js/directives",
        services: "js/services",
        filters: "js/filters"
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularBootstrap: {
            deps: ['angular']
        },
        angularAnimate: {
            deps: ['angular']
        },
        angularRoute: {
            deps: ['angular']
        },
        angularUiRouter: {
            deps: ['angular']
        },
        angularGrid: {
            deps: ['angular']
        }
    }
});
require([
    'jQuery',
    'angular',
    'angularAnimate',
    'angularRoute',
    'angularUiRouter',
    'angularBootstrap',
    'angularGrid',
    'app',
    'controllers',
    'directives',
    'services',
    'filters',
    'domReady!'
], function() {
    // angular.bootstrap(document, ['bookStoreApp']);
});
