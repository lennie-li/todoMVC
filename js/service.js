(function(angular) {
    var app = angular.module('todos.service', []);

    app.service('todos', ['$window', function($window) { //相当于是一个构造函数，使用时相当于通过这个函数new了一个对象
        var that = this;
        var storage = $window.localStorage;
        var get = function() {
            return JSON.parse(storage.getItem('todos')) || [];
        };
        var tasks = this.tasks = get();
        var random = function() {
            return +new Date + Math.random();
        };
        this.add = function(newTask) {
            tasks.push({ id: random(), name: newTask, completed: false });
            storage.setItem('todos', JSON.stringify(tasks));
        };
        this.remove = function(id) {
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id == id) {
                    tasks.splice(i, 1);
                    storage.setItem('todos', JSON.stringify(tasks));
                    return;
                }
            }
        };
        this.save = function(changeTasks) {
            storage.setItem('todos', JSON.stringify(changeTasks));
        };
        
    }]);
})(angular);
