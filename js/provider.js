j$(document).ready(function() {
    hideAllListElements();
    var pcp = j$('[id$=pcp-list]');
    pcp.show();

    j$('.provider-activity-search-type').click(function() {
        //favorite-select, pcp-select, number-visits, number-views
        var elementSelected = j$(this).attr('id');
        var currentlyActiveElement = j$('.provider-activity-search-type.active');
        
        currentlyActiveElement.removeClass('active');
        j$(this).addClass('active');
        
        var pcp = j$('[id$=pcp-list]');
        var favorites = j$('[id$=favorite-list]');
        var clickToCalls = j$('[id$=click-to-calls-list]');
        var directions = j$('[id$=directions-list]');
        var views = j$('[id$=views-list]');
        var reviewRating = j$('[id$=review-rating-list]');
        var visits = j$('[id$=visits-list]');
        
        if(elementSelected == 'favorite') {
            hideAllListElements();
            favorites.show();
        } else if(elementSelected == 'pcp') {
            hideAllListElements();
            pcp.show();
        } else if (elementSelected == 'clicktocall') {
            hideAllListElements();
            clickToCalls.show();
        } else if(elementSelected == 'getdirections') {
            hideAllListElements();
            directions.show();
        } else if(elementSelected == 'views') {
            hideAllListElements();
            views.show();
        } else if(elementSelected == 'visits') {
            hideAllListElements();
            visits.show();
        } else if(elementSelected == 'reviews') {
            hideAllListElements();
            reviewRating.show();
        }
    });
});

function hideAllListElements() {
    var pcp = j$('[id$=pcp-list]');
    var favorites = j$('[id$=favorite-list]');
    var clickToCalls = j$('[id$=click-to-calls-list]');
    var directions = j$('[id$=directions-list]');
    var views = j$('[id$=views-list]');
    var reviewRating = j$('[id$=review-rating-list]');
    var visits = j$('[id$=visits-list]');

    pcp.hide();
    favorites.hide();
    clickToCalls.hide();
    directions.hide();
    views.hide();
    reviewRating.hide();
    visits.hide();
}