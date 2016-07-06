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
        freq: [3, 17, 28, 92, 197, 334, 556, 800, 1045, 1275, 1288, 1263, 1095, 774, 569, 335, 175, 94, 36, 20, 6]
    };

    $scope.skewed_dist = {
        title: 'Skewed Distribution',
        freq: [3, 17, 28, 92, 197, 334, 556, 800, 1045, 1275, 1288, 1263, 1095, 774, 569, 335, 175, 94, 36, 20, 6]
    };

    $scope.uniform_dist = {
        title: 'Uniform Distribution',
        freq: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800]
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
            $scope.median = median($scope.normal_dist['freq']);
            $scope.mean = mean($scope.normal_dist['freq']);

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