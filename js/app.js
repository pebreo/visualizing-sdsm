var app = angular.module('myApp', ['chart.js']);


app.directive('myElem', function () {
    return {
        restrict: 'E',
        templateUrl: 'set_items.html'
    };
});

app.directive('permElem', function () {
    return {
        restrict: 'E',
        templateUrl: 'perm_items.html'
    };
});

app.directive('comboElem', function () {
    return {
        restrict: 'E',
        templateUrl: 'combo_items.html'
    };
});

app.controller('MyCtrl', ['$scope', '$log', function ($scope, $log) {

    $scope.dist_type = 'normal';
    $scope.selected_data = [];
    $scope.selected_title = '';

    $scope.item_names = {
        1: {'button_type': 'btn-primary', 'text': 'One', 'sqcolor': 'red'},
        2: {'button_type': 'btn-warning', 'text': 'Two', 'sqcolor': 'green'},
        3: {'button_type': 'btn-info', 'text': 'Three', 'sqcolor': 'orange'},
        4: {'button_type': 'btn-success', 'text': 'Four', 'sqcolor': 'beige'},
        5: {'button_type': 'btn-danger', 'text': 'Five', 'sqcolor': 'purple'}
    };

    $scope.get_good_items = function () {
        var items = [];
        var n = 1;
        while (n <= $scope.item_count) {
            items.push($scope.item_names[n]);
            n++;
        }
        //$log.log(items);
        return items;
    };

    $scope.make_button_row = function (arrangement) {
        //var list = [1,2];
        //$log.log(arrangement);
        var items = [];
        for (i = 0; i < arrangement.length; i++) {
            items.push($scope.item_names[arrangement[i]]);
        }
        //$log.log(items);
        return items;
    };

    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.additem = function () {
        $log.log('add');
        if ($scope.item_count < 5) {
            $scope.item_count += 1;
            $scope.slot_count = $scope.item_count;
        }

    };

    $scope.remove_item = function () {
        $log.log('remove');
        if ($scope.item_count > 1) {
            $scope.item_count -= 1;
            $scope.slot_count = $scope.item_count;

        }

    };


    var sum = function (obj, key) {
        var arr;
        if (_.isArray(obj) && typeof obj[0] === 'number') {
            arr = obj;
        } else {
            key = key || 'value';
            arr = _.pluck(obj, key);
        }
        var val = 0, i;
        for (i = 0; i < arr.length; i++)
            val += (arr[i] - 0);
        return val;
    };

    var sort = function (arr) {
        return _.sortBy(arr, _.identity);
    };

    var mean = ave = average = function (obj, key) {
        return sum(obj, key) / _.size(obj);
    };

    var median = function (arr) {
        arr = arr.slice(0); // create copy
        var middle = (arr.length + 1) / 2,
            sorted = sort(arr);
        return (sorted.length % 2) ? sorted[middle - 1] : (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
    };


    $scope.normal_dist = {
        title: 'Normal Distribution',
        //freq: [3, 17, 28, 92, 197, 334, 556, 800, 1045, 1275, 1288, 1263, 1095, 774, 569, 335, 175, 94, 36, 20, 6],
        freq: [6, 16, 58, 93, 176, 316, 543, 785, 1075, 1287, 1372, 1231, 1051, 795, 555, 327, 165, 80, 45, 21, 3],
        data: [13, 6, 9, 4, 11, 10, 7, 5, 10, 11, 9, 10, 21, 11, 9, 10, 12, 10, 7, 12, 9, 11, 13, 10, 9, 10, 7, 16, 16, 16, 11, 12, 9, 7, 14, 10, 9, 9, 9, 11, 12, 7, 12, 5, 7, 8, 12, 15, 11, 12, 12, 16, 8, 9, 11, 14, 9, 11, 14, 15, 10, 6, 7, 17, 7, 8, 13, 5, 17, 9, 11, 12, 9, 13, 17, 9, 17, 2, 13, 9, 11, 14, 13, 10, 9, 7, 15, 14, 16, 8, 12, 7, 11, 10, 9, 15, 11, 11, 9, 12, 16, 15, 10, 12, 13, 8, 15, 10, 17, 15, 11, 11, 14, 17, 10, 8, 5, 11, 9, 16, 16, 16, 12, 16, 9, 14, 14, 7, 9, 8, 12, 11, 13, 10, 9, 15, 12, 8, 10, 8, 10, 10, 7, 14, 14, 16, 12, 8, 13, 9, 13, 11, 11, 12, 16, 10, 12, 7, 11, 6, 7, 13, 14, 8, 14, 12, 10, 9, 13, 11, 11, 18, 10, 11, 8, 9, 12, 16, 9, 13, 12, 11, 12, 5, 11, 12, 9, 14, 8, 4, 9, 6, 12, 14, 11, 12, 11, 12, 13, 10, 10, 7, 14, 17, 13, 11, 17, 13, 14, 14, 9, 8, 10, 5, 9, 8, 10, 12, 14, 10, 12, 15, 9, 13, 10, 11, 3, 13, 14, 17, 9, 9, 15, 13, 6, 10, 10, 6, 13, 15, 13, 11, 12, 11, 10, 8, 11, 9, 15, 7, 6, 16, 17, 8, 9, 10, 15, 12, 8, 13, 14, 14, 15, 12, 14, 13, 16, 10, 10, 3, 9, 13, 11, 5, 7, 8, 10, 8, 9, 13, 11, 9, 8, 7, 9, 6, 10, 9, 12, 10, 11, 18, 9, 18, 6, 12, 11, 12, 8, 12, 9, 10, 19, 13, 6, 15, 11, 5, 11, 12, 10, 10, 10, 7, 9, 13, 8, 8, 8, 10, 10, 5, 10, 6, 13, 11, 8, 9, 11, 9, 11, 14, 14, 15, 16, 12, 8, 15, 18, 9, 14, 17, 7, 8, 15, 9, 7, 4, 11, 15, 14, 13, 5, 10, 13, 9, 8, 11, 11, 11, 11, 13, 12, 8, 11, 7, 12, 12, 13, 10, 12, 7, 6, 6, 14, 7, 6, 14, 13, 13, 8, 9, 16, 4, 14, 12, 11, 13, 12, 10, 9, 5, 12, 6, 12, 14, 5, 9, 8, 7, 7, 12, 7, 12, 9, 16, 7, 11, 15, 17, 10, 9, 10, 13, 8, 8, 6, 12, 13, 9, 14, 13, 11, 13, 12, 11, 12, 15, 20, 13, 19, 10, 12, 12, 15, 6, 13, 13, 7, 13, 9, 9, 12, 14, 12, 16, 8, 12, 18, 7, 14, 11, 12, 17, 13, 14, 11, 11, 8, 10, 14, 10, 6, 11, 9, 13, 13, 5, 11, 16, 12, 14, 12, 15, 9, 13, 9, 9, 9, 8, 10, 17, 14, 9, 10, 12, 11, 10, 11, 11, 12, 14, 11, 9, 7, 9, 5, 12, 10, 15, 13, 8, 11, 14, 12, 12, 12, 11, 15, 12, 13, 11, 16, 10, 11, 7, 12, 7, 8, 10, 13, 14, 18, 7, 12, 9, 9, 9, 9, 8, 20, 12, 11, 7, 13, 7, 7, 10, 6, 9, 11, 9, 13, 10, 15, 12, 9, 8, 11, 11, 10, 16, 8, 15, 14, 8, 12, 5, 15, 16, 10, 13, 10, 8, 11, 10, 11, 19, 1, 10, 10, 10, 11, 10, 17, 11, 9, 12, 10, 13, 14, 13, 10, 11, 13, 8, 17, 15, 4, 9, 6, 12, 17, 2, 17, 14, 3, 10, 6, 9, 13, 13, 14, 12, 10, 7, 13, 14, 7, 13, 6, 12, 9, 7, 7, 7, 11, 12, 9, 13, 5, 16, 10, 12, 18, 8, 13, 8, 13, 10, 10, 12, 16, 6, 7, 6, 15, 12, 15, 11, 13, 13, 9, 14, 13, 9, 10, 11, 13, 8, 4, 10, 9, 8, 6, 13, 9, 11, 14, 18, 14, 3, 12, 10, 12, 14, 10, 10, 12, 10, 9, 8, 12, 12, 10, 17, 12, 14, 17, 9, 14, 11, 12, 11, 6, 15, 13, 11, 12, 8, 13, 8, 11, 11, 12, 13, 5, 10, 12, 13, 9, 7, 9, 11, 9, 5, 6, 10, 9, 11, 11, 15, 14, 13, 13, 14, 10, 7, 11, 11, 11, 8, 10, 9, 7, 11, 12, 18, 2, 12, 8, 12, 17, 13, 11, 12, 6, 9, 10, 13, 14, 12, 13, 9, 10, 12, 11, 8, 10, 3, 13, 14, 9, 18, 12, 14, 4, 12, 8, 12, 10, 13, 11, 12, 9, 11, 13, 8, 13, 9, 11, 17, 6, 12, 8, 11, 12, 12, 11, 9, 4, 9, 13, 17, 9, 13, 14, 12, 11, 13, 18, 3, 14, 11, 8, 9, 13, 7, 11, 11, 8, 11, 14, 12, 10, 6, 12, 16, 16, 7, 16, 11, 12, 16, 6, 11, 5, 12, 8, 7, 8, 9, 15, 12, 14, 10, 8, 9, 16, 13, 9, 10, 9, 12, 10, 12, 11, 15, 5, 13, 9, 11, 13, 7, 16, 10, 6, 15, 6, 17, 11, 15, 11, 12, 11, 15, 19, 13, 11, 13, 8, 13, 11, 13, 11, 10, 10, 14, 14, 13, 8, 10, 11, 12, 14, 11, 15, 15, 6, 14, 9, 7, 9, 12, 14, 13, 7, 13, 11, 19, 11, 14, 5, 15, 11, 16, 7, 10, 9, 9, 8, 15, 15, 20, 10, 11, 8, 4, 11, 15, 8, 7, 4, 10, 5, 10, 5, 11, 12, 10, 13, 12, 8, 7, 8, 7, 16, 8, 9, 14, 12, 9, 8, 12, 16, 11, 16, 11, 15, 12, 10, 17, 7, 4, 15, 7, 13, 16, 6, 8, 11, 8, 7, 9, 11, 14, 16, 9, 4, 15, 9, 13, 11, 8, 14, 12, 10, 13, 13, 11, 12, 10, 14, 11, 10, 11, 12, 17, 13, 11, 8, 8, 1, 6, 11, 12, 9, 13, 11, 13, 8, 12, 17, 6, 9, 14, 9, 15, 10, 11]

    };

    $scope.skewed_dist = {
        title: 'Skewed Distribution',
        freq: [3, 17, 28, 92, 197, 334, 556, 800, 1045, 1275, 1288, 1263, 1095, 774, 569, 335, 175, 94, 36, 20, 6]
    };

    $scope.uniform_dist = {
        title: 'Uniform Distribution',
        freq: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800]
        data: []
    };

    $scope.make_normal = function () {
        $scope.dist_type = 'normal';
        $log.log('normal!');

    };

    $scope.make_skewed = function () {
        $scope.dist_type = 'skewed';
        $log.log('skewed!');
    };

    $scope.make_uniform = function () {
        $scope.dist_type = 'uniform';

        $log.log('uniform!');
    };

    //$scope.labels = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12','13','14','15',
    //                    '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32'];

    $scope.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20', '21'];
    $scope.series = [''];


    $scope.$watch('dist_type', function () {
        $log.log('the dist type ' + $scope.dist_type);
        if ($scope.dist_type === 'normal') {
            $log.log('condition normal');
            $scope.selected_data = $scope.normal_dist['freq'];
            $scope.selected_title = $scope.normal_dist['title'];
            $scope.data = [
                $scope.selected_data
            ];

            $scope.options = {
                title: {
                    display: true,
                    text: $scope.selected_title

                }
            };
            $scope.median = median($scope.normal_dist['data']);
            $scope.mean = mean($scope.normal_dist['data']);

        }
        ;
        if ($scope.dist_type === 'skewed') {
            $log.log('condition skewed');
            $scope.selected_data = $scope.skewed_dist['freq'];
            $scope.selected_title = $scope.skewed_dist['title'];
            $scope.data = [
                $scope.selected_data
            ];

            $scope.options = {
                title: {
                    display: true,
                    text: $scope.selected_title

                }
            };
            $scope.median = median($scope.skewed_dist['freq']);
            $scope.mean = mean($scope.skewed_dist['freq']);
        }
        ;
        if ($scope.dist_type === 'uniform') {
            $log.log('condition uniform');

             $scope.selected_data = $scope.uniform_dist['freq'];
            $scope.selected_title = $scope.uniform_dist['title'];
            $scope.data = [
                $scope.selected_data
            ];

            $scope.options = {
                title: {
                    display: true,
                    text: $scope.selected_title

                }
            };
            $scope.median = median($scope.uniform_dist['freq']);
            $scope.mean = mean($scope.uniform_dist['freq']);
        }
        ;

    });




}]);