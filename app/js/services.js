angular.module('bookStoreServices', [])
    .service('bookList', ['$rootScope', '$http', '$stateParams',
        function($rootScope, $http, $stateParams) {
            this.bookListFn = function(){
                return $http.get("../data/books" + $stateParams.TypeId + ".json");
            };
        }
    ])
    .service('bookStoreService_2', ['$scope',
        function($scope) {}
    ]);
