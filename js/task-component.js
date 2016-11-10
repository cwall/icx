j$(document).ready(function() {
    j$('[id$=task-type]').click(function() {
        var inputTaskType = j$('[id$=task-type-input]');
        var newTaskType = j$('[id$=task-type] .value-base span').html();
        inputTaskType.val(newTaskType);
        inputTaskType.trigger('input');
    });
});
