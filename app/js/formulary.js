j$ = jQuery.noConflict();
j$(document).ready(function() {
    hideAllListElements();
    var purchased = j$('[id$=purchased-list]');
    purchased.show();

    j$('.drug-activity-search-type').click(function() {
        var elementSelected = j$(this).attr('id');
        var currentlyActiveElement = j$('.drug-activity-search-type.active');
        
        currentlyActiveElement.removeClass('active');
        j$(this).addClass('active');
        
        var purchased = j$('[id$=purchased-list]');
        var views = j$('[id$=views-list]');
        var saves = j$('[id$=saved-list]');
        var claimsFiled = j$('[id$=claims-list]');
        var shared = j$('[id$=shared-list]');
        var refill = j$('[id$=refill-list]');
        
        if(elementSelected == 'purchased') {
            hideAllListElements();
            purchased.show();
        } else if(elementSelected == 'views') {
            hideAllListElements();
            views.show();
        } else if (elementSelected == 'saves') {
            hideAllListElements();
            saves.show();
        } else if(elementSelected == 'claims-filed') {
            hideAllListElements();
            claimsFiled.show();
        } else if(elementSelected == 'shared') {
            hideAllListElements();
            shared.show();
        } else if(elementSelected == 'refill') {
            hideAllListElements();
            refill.show();
        } 
    });

});

function hideAllListElements() {
    var purchased = j$('[id$=purchased-list]');
    var views = j$('[id$=views-list]');
    var saves = j$('[id$=saved-list]');
    var claimsFiled = j$('[id$=claims-list]');
    var shared = j$('[id$=shared-list]');
    var refill = j$('[id$=refill-list]');

    purchased.hide();
    views.hide();
    saves.hide();
    claimsFiled.hide();
    shared.hide();
    refill.hide();
}