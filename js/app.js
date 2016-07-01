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

    $scope.cols = 1;
    $scope.item_count = 1;
    $scope.slot_count = 1;
    $scope.permutations_count = 1;
    $scope.combinations_count = 1;

    $scope.item_names = {
        1: {'button_type': 'btn-primary', 'text': 'One', 'sqcolor': 'red'},
        2: {'button_type': 'btn-warning', 'text': 'Two', 'sqcolor': 'green'},
        3: {'button_type': 'btn-info', 'text': 'Three', 'sqcolor': 'orange'},
        4: {'button_type': 'btn-success', 'text': 'Four', 'sqcolor': 'beige'},
        5: {'button_type': 'btn-danger', 'text': 'Five', 'sqcolor': 'purple'}
    };
    $scope.good_items = [];

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

    $scope.make_button_row = function(arrangement) {
        //var list = [1,2];
        //$log.log(arrangement);
        var items = [];
        for(i=0; i<arrangement.length;i++) {
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

     $scope.add_slot = function () {
        $log.log('add');
        if ($scope.slot_count < $scope.item_count) {
            $scope.slot_count += 1;
        }

    };

    $scope.decrease_slot = function () {
        $log.log('remove');
        if ($scope.slot_count > 1) {
            $scope.slot_count -= 1;
        }

    };

    $scope.create = function () {
        //alert($scope.item_count);
        //$log.log($scope.item_count);
        var b = _.join(['a', 'b']);
        //$log.log(b);
    };


    $scope.permutator = function (inputArr) {
        var results = [];

        function permute(arr, memo) {
            var cur, memo = memo || [];

            for (var i = 0; i < arr.length; i++) {
                cur = arr.splice(i, 1);
                if (arr.length === 0) {
                    results.push(memo.concat(cur));
                }
                permute(arr.slice(), memo.concat(cur));
                arr.splice(i, 0, cur[0]);
            }

            return results;
        }

        return permute(inputArr);
    };

    $scope.combinations = function (list) {
        var set = [],
            listSize = list.length,
            combinationsCount = (1 << listSize),
            combination;

        for (var i = 1; i < combinationsCount; i++) {
            var combination = [];
            for (var j = 0; j < listSize; j++) {
                if ((i & (1 << j))) {
                    combination.push(list[j]);
                }
            }
            set.push(combination);
        }
        return set;
    };

    var permutations_choose = function(xs, r)
    {
        if (!r) return [];
        return xs.reduce(function (memo, cur, i) {
            var others = xs.slice(0, i).concat(xs.slice(i + 1)),
                perms = permutations_choose(others, r - 1),
                newElms = !perms.length ? [[cur]] :
                    perms.map(function (perm) {
                        return [cur].concat(perm)
                    });
            return memo.concat(newElms);
        }, []);
    };

    $scope.combinations_choose = function (list, r) {
        var combos = $scope.combinations(list);
        var results =  _.filter(combos, function(item) { return item.length == r;});
        return results;
    };

    $scope.perm_set_items = [];
    $scope.perm_choose_list = [];

    $scope.combo_set_items = [];
    $scope.combo_choose_list = [];


    var update_ = function() {

    };

    $scope.$watch('item_count', function(){
        $scope.perm_set_items = $scope.range(1, $scope.item_count);
        $scope.perm_choose_list = permutations_choose($scope.perm_set_items, $scope.slot_count);
        $scope.permutations_count = $scope.perm_choose_list.length;

        $scope.combo_choose_list = [];
        $scope.combo_set_items = $scope.range(1, $scope.item_count);
        $scope.combo_choose_list = $scope.combinations_choose($scope.combo_set_items, $scope.slot_count);
        $scope.combinations_count = $scope.combo_choose_list.length;

    });

    $scope.$watch('slot_count', function(){
        $scope.perm_set_items = $scope.range(1, $scope.item_count);
        $scope.perm_choose_list = permutations_choose($scope.perm_set_items, $scope.slot_count);
        $scope.permutations_count = $scope.perm_choose_list.length;

        $scope.combo_choose_list = [];
        $scope.combo_set_items = $scope.range(1, $scope.item_count);
        $scope.combo_choose_list = $scope.combinations_choose($scope.combo_set_items, $scope.slot_count);
        $scope.combinations_count = $scope.combo_choose_list.length;

    });



    $scope.get_perms = function () {
        return $scope.perm_choose_list;
    };


    $scope.get_combos = function() {
        return $scope.combo_choose_list;
    };


   $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];




}]);