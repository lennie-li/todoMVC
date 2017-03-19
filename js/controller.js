(function(angular) {
    var app = angular.module('todos.controller', []);
    app.controller('todosController', ['$scope', '$location', 'todos', function( $scope , $location , todos ) {
        //生成随机数，用于设置id
        $scope.random = function() {
            return +new Date + Math.random();
        };
        $scope.tasks = [
            { id: $scope.random(), name: '吃饭', completed: true },
            { id: $scope.random(), name: '睡觉', completed: false },
            { id: $scope.random(), name: '打豆豆', completed: false },
            { id: $scope.random(), name: '被打', completed: true },
        ];
        // $scope.tasks = todos.get();

        $scope.newTask = "";
        // 添加任务
        $scope.add = function() {
            $scope.tasks.push({ id: $scope.random(), name: $scope.newTask, completed: false });
            $scope.newTask = "";
        };


        //使用创建的服务来进行添加数据
        // $scope.add = function() {
        //     todos.set({ id: $scope.random(), name: $scope.newTask, completed: false });
        //     $scope.newTask = '';
        //     $scope.tasks = todos.get();
        // };
        // 移除任务
        $scope.remove = function(id) {
            $scope.tasks.forEach(function(v, i) {
                if (v.id == id) {
                    $scope.tasks.splice(i, 1);
                    return;
                }
            });
        }; 


        //使用创建的服务来进行移除数据
        // $scope.remove = function(id) {
        //     todos.remove(id);
        //     $scope.tasks = todos.get();
        // };

        //编辑并保存现有项目
        $scope.editingId = -1;
        $scope.edit = function(id) {
            $scope.editingId = id;
        };
        $scope.save = function(id) {
            $scope.editingId = -1;
        };




        //整体切换状态
        $scope.mainStatus = false;
        $scope.toggleAll = function() {
            $scope.tasks.forEach(function(v, i) {
                v.completed = $scope.mainStatus;
            });
        };

        //清除已完成的任务  从0开始删除数组中的元素，会改变arr.length ,导致index的判断出现错误，已删除元素后部的元素无法检查到。
        // $scope.completedClear = function() {
        //     $scope.tasks.forEach(function(v, i) {
        //         if (v.completed) {
        //             $scope.tasks.splice(i, 1);
        //         }
        //     });
        //     $scope.isAllClear = true;
        // };


        //清除已完成的任务 解决上部方法的bug ，从数组的后部开始遍历，从后部开始删除数据。
        $scope.completedClear = function() {
            for (var i = $scope.tasks.length - 1; i >= 0; i--) {
                if($scope.tasks[i].completed){
                    $scope.tasks.splice(i, 1);
                }
            }
            $scope.isAllClear = true;
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
        //  	$scope.isCompleted = {completed : false};
        //  }
        //  $scope.finish = function () {
        //  	$scope.isCompleted = {completed : true};
        //  }
        //  $scope.showAll = function () {
        //  	$scope.isCompleted = {};
        //  };

        $scope.location = $location;
        $scope.$watch('location.url()', function(nowValue, oldValue) {
            switch (nowValue) {
                case '/active':
                    $scope.isCompleted = { completed: false };
                    $scope.currentButton = 'active';
                    break;
                case '/completed':
                    $scope.isCompleted = { completed: true };
                    $scope.currentButton = 'completed';
                    break;
                default:
                    $scope.isCompleted = {};
                    $scope.currentButton = 'all';
                    break;
            }
        });
    }]);
    // app.controller('todosController',['$scope', '$location', 'todos',function ($scope,$location,todos) {
    //     /* body... */
    // }])
})(angular)
