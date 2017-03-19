(function(angular) {
    var app = angular.module('todos.controller', ['ngRoute']);
    app.controller('todosController', ['$scope', '$location', '$routeParams','$route','todos', function($scope, $location,$routeParams,$route, todos) {
        //生成随机数，用于设置id

        $scope.tasks = todos.tasks;
        // $scope.tasks = todos.get();

        $scope.newTask = "";
        // 添加任务
        $scope.add = function() {
            todos.add($scope.newTask);
            $scope.newTask = "";
        };


        // 移除任务
        $scope.remove = function(id) {
            todos.remove(id);
        };

        //编辑并保存现有项目
        $scope.editingId = -1;
        $scope.edit = function(id) {
            $scope.editingId = id;
        };
        $scope.save = function() {
            $scope.editingId = -1;
            todos.save($scope.tasks);
        };




        //整体切换状态
        $scope.mainStatus = false;
        $scope.toggleAll = function() {
            $scope.tasks.forEach(function(v, i) {
                v.completed = $scope.mainStatus;
            });
            todos.save($scope.tasks);
        };


        //清除已完成的任务 解决上部方法的bug ，从数组的后部开始遍历，从后部开始删除数据。
        $scope.completedClear = function() {
            for (var i = $scope.tasks.length - 1; i >= 0; i--) {
                if ($scope.tasks[i].completed) {
                    $scope.tasks.splice(i, 1);
                }
            }
            $scope.isAllClear = true;
            todos.save($scope.tasks);
        };


        //若没有已完成任务，则不显示 Clear completed 按钮
        $scope.isShow = function() {
            var flag = false;
            $scope.tasks.forEach(function(v, i) {
                if (v.completed == true) {
                    flag = true;
                }
            });
            return flag;
        };

        // 显示剩余未完成的项目
        $scope.left = function() {
            var num = 0;
            $scope.tasks.forEach(function(v, i) {
                if (v.completed == false) {
                    num++;
                }
            });
            return num;
        };
        // $scope.left();

        $scope.isCompleted = {};
        // $scope.currentButton = 'all';
        //  $scope.active = function () {
        //      $scope.isCompleted = {completed : false};
        //  }
        //  $scope.finish = function () {
        //      $scope.isCompleted = {completed : true};
        //  }
        //  $scope.showAll = function () {
        //      $scope.isCompleted = {};
        //  };

        // $scope.location = $location;
        // $scope.$watch('location.url()', function(nowValue, oldValue) {
        //     switch (nowValue) {
        //         case '/active':
        //             $scope.isCompleted = { completed: false };
        //             $scope.currentButton = 'active';
        //             break;
        //         case '/completed':
        //             $scope.isCompleted = { completed: true };
        //             $scope.currentButton = 'completed';
        //             break;
        //         default:
        //             $scope.isCompleted = {};
        //             $scope.currentButton = 'all';
        //             break;
        //     }
        // });


        // $scope.isCompleted = $routeParams.status
        switch ($routeParams.status) {
            case 'active':
                 $scope.isCompleted = { completed: false };
                 $scope.currentButton = 'active';
                 break;
            case 'completed':
                 $scope.isCompleted = { completed: true };
                 $scope.currentButton = 'completed';
                 break;
            default:
                 $scope.isCompleted = {};
                 $scope.currentButton = 'all';
                 break;
        }
    }]);


    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:status?', {
            // templateUrl: 'tmp',
            templateUrl: './view.html',
            controller: 'todosController'
        })
    }]);
})(angular)
