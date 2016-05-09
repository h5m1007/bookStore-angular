/**
 * 书籍列表模块
**/
var bookListModule = angular.module('BookListModule', ['bookStoreFilters']);
bookListModule.controller('BookListCtrl', ['$scope','$http','$state','$stateParams','$filter',function($scope, $http, $state, $stateParams, $filter) {
    // 控制bookGrid.html
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize){
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.books = pagedData;
        $scope.totalServerItems = data.length;
        if(!$scope.$$phase){
            $scope.$apply();
        }
    };
    // 封装在services.js中的服务bookList
    // console.log(bookList);
    // 封装在filters.js中的过滤器optionsFilter
    // 又ng内置服务$filter调用
    // console.log($filter("optionsFilter"));
    // 这里可以根据路由上传递过来的bookType参数加载不同的数据
    console.log($stateParams);
    $scope.getPagedDataAsync = function(pageSize, page, searchText){
        setTimeout(function(){
            var data;
            if(searchText){
                var ft = searchText.toLowerCase();
                $http.get(
                    '../data/books' +
                    $stateParams.bookType +
                    '.json'
                ).success(function(largeLoad){
                    data = largeLoad.filter(function(item){
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);
                });
            }else{
                $http.get(
                    '../data/books' +
                    $stateParams.bookType +
                    '.json'
                ).success(function(largeLood){
                    $scope.setPagingData(largeLood, page, pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal){
        if(newVal !== oldVal && newVal.currentPage !== oldVal.currentPage){
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    // $scope.$watch(Object, CallbackFn(newvalue, oldvalue){}, true);
    // 设置true即为深度监听，监听对象的每一属性变化
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',
        rowTemplate: '<div style="height: 100%"><div ng-style="{\'cursor\': row.cursor}" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell">' + 
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ngVerticalBarVisible: !$last}"></div>' +
            '<div ng-cell></div>' +
            '<div></div>',
        multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookdetail({TypeId:$stateParams.bookType,bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
}]);

/**
 * 书籍详情模块
**/
var bookDetailModule = angular.module('BookDetailModule', ['bookStoreServices']);
bookDetailModule.controller('BookDetailCtrl', ['$scope','$http','$state','$stateParams','bookList',function($scope, $http, $state, $stateParams, bookList) {
    console.log($stateParams);
    // 使用$http到后台获取数据
    bookList.bookListFn().success(function(data) {
        // console.log(data);
        for (var i = 0; i <= data.length; i++) {
            if (data[i].bookId === $stateParams.bookId) {
                // console.log(data[i]);
                var d = data[i];
                console.log(d);
                $scope.name = d.name;
                $scope.pic_src = d.pic_src;
                $scope.author = d.author;
                $scope.pubTime = d.pubTime;
                $scope.price = d.price;
            }
        }
    });
}]);

/**
 * 书籍新增模块
**/
var addBookModule = angular.module('AddBookModule', []);
addBookModule.controller('AddBookCtrl', function($scope, $http){
    // $scope.bookName = "书名待定";
    $scope.formData = {};
    $scope.setFormData = function(){
        $http({
            method: 'POST',
            url: '../data/formData.php',
            // data: JSON.stringify($scope.formData),
            // data: {name: "aaa", id: 1, age: 20},
            // contentType:'application/json;charset=UTF-8'
        })
        .success(function(data){
            console.log(data);
        });
    };
});