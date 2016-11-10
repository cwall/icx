j$(document).ready(function() {
    var activeButton = j$('[id$=drug-search-type].active').attr('id');
    var drugTypeInput = j$('[id$=drug-type-input]');
    drugTypeInput.val(activeButton);
    drugTypeInput.trigger('input');

    j$('.drug-search-type').click(function() {
        j$('.drug-search-type').removeClass('active');
        j$(this).addClass('active');
        var elementSelected = j$(this).attr('id');

        var drugTypeInput = j$('[id$=drug-type-input]');
        drugTypeInput.val(elementSelected);
        drugTypeInput.trigger('input');
    });
});