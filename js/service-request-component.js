j$(document).ready(function() {
    j$('[id$=tasks-list]').hide(); // Hide the list of tasks initially

    j$('[id$=task-type]').click(function() {
        var inputTaskType = j$('[id$=task-type-input]');
        var newTaskType = j$('[id$=task-type] .value-base span').html();
        inputTaskType.val(newTaskType);
        
        inputTaskType.trigger('input');
    });

    j$('[id$=case-type]').click(function() {
        var inputCaseType = j$('[id$=case-type-input]');
        var newCaseType = j$('[id$=case-type] .value-base span').html();
        inputCaseType.val(newCaseType);
        
        inputCaseType.trigger('input');
    });

    j$('.service-request-search-type').click(function(){
        var clickedElement = j$(this).attr('id');
        var activeButton = j$('.service-request-search-type.active');
        activeButton.removeClass('active');
        j$(this).addClass('active');
        
        
        if(clickedElement === 'tasks') {
            j$('[id$=tasks-list]').show();
            j$('[id$=cases-list]').hide();
        } else if(clickedElement === 'cases') {
            j$('[id$=cases-list]').show();              
            j$('[id$=tasks-list]').hide();          
        }
    });
});

