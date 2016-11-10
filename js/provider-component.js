j$(document).ready(function() {
    var activeButton = j$('[id$=provider-search-type].active').attr('id');
    var providerTypeInput = j$('[id$=provider-type-input]');
    providerTypeInput.val(activeButton);
    providerTypeInput.trigger('input');

    j$('.provider-search-type').click(function() {
        j$('.provider-search-type').removeClass('active');
        j$(this).addClass('active');
        var elementSelected = j$(this).attr('id');
        var providerTypeInput = j$('[id$=provider-type-input]');
        j$('[id$=provider-type-input]').val(elementSelected);
        providerTypeInput.trigger('input');
    });
});
