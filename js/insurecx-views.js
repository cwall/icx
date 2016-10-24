j$ = jQuery.noConflict();

j$(document).ready(function() {

  // If the user opens a link in a new tab, display that tab's content
  if(window.location.hash) {
    var componentId = window.location.hash.substring(1).toLowerCase();

    var relatedTabs = j$('.related-tab').removeClass('active');
    
    var links = j$('.child-records-container');
    links.hide();

    j$('[id$=' + componentId + ']').show();

    var clickedLink = j$('[id$=' + componentId.replace('-child-list', '') + ']');
    clickedLink.addClass('active');

  }


  var min = j$(window).height();
  var wid = j$(window).width();
  var mostRecentlySelectedListItem;
    
  j$('.menu-btn').on('click', function(){
    if(j$('nav').hasClass('mobile')){
      j$('nav').animate({left:"-800px"}).removeClass('mobile');
    } else {
      j$('nav').animate({left:"-0px"}).addClass('mobile');
    }
  });

  j$('.mobile li a').on('click', function() {
    j$('nav').animate({left:"-800px"});
  });

  j$('.collapse-card').on('click', function(){
    j$('.card-info').fadeToggle("fast");
  });


  j$('.ui-menu i, .data-btn').on('click', function(){
    //j$('.options').slideToggle('fast');
    j$(this).parent().siblings('.options').slideToggle('fast');
  });


  j$('.data-btn').on('click', function(){
    j$(this).parents('.options').slideToggle('fast');
  });
/* */
  j$('.data-btn').on('click', function(){
    var selectedMenuOption = j$(this).data('menu-title');
    j$(this).closest('.ui-menu').find('.value-base > span').text(selectedMenuOption);

    var optionListType = j$(this).parents('.options').attr('id');

    var allRecords;
    if(optionListType == 'task') {
      allRecords = j$('.task-obj-details');
    } else if(optionListType == 'case') {
      allRecords = j$('.case-obj-details');
    }

    if(selectedMenuOption.includes('All')) {
      allRecords.show();
    } else if(selectedMenuOption == 'Open') {
      if(optionListType == 'task') {
        j$('.task-obj-details[isClosed=true]').hide();
        j$('.task-obj-details[isClosed=false]').show();
      } else if(optionListType == 'case') {
        j$('.case-obj-details[isClosed=true]').hide();
        j$('.case-obj-details[isClosed=false]').show();
      }
    } else if(selectedMenuOption == 'Closed') {
      if(optionListType == 'task') {
        j$('.task-obj-details[isClosed=true]').show();
        j$('.task-obj-details[isClosed=false]').hide();
      } else if(optionListType == 'case') {
        j$('.case-obj-details[isClosed=true]').show();
        j$('.case-obj-details[isClosed=false]').hide();
      }
    }
  });

  /* */
  /* changes tab content when the tabs are clicked
  tabs must be of class "related-tab", content must be of id "[id from tab]-child-list" */
  j$('.related-tab').click(function() {
    resetRelatedListFilters();
    var thisElementId = j$(this).attr('id');

    var thisLowercaseElementId = j$(this).attr('id').toLowerCase();
    var clickedLink = j$('[id$=' + thisElementId + ']');

    if(mostRecentlySelectedListItem == thisElementId) {
        return;
    } 
    
    var relatedTabs = j$('.related-tab').removeClass('active');
    clickedLink.addClass('active');
    
    var links = j$('.child-records-container');
    links.hide();

    thisLowercaseElementId += '-child-list';
    j$('[id$=' + thisLowercaseElementId + ']').slideToggle(400);
    
    mostRecentlySelectedListItem = thisElementId;  
  });

  //Utility functions
  function resetRelatedListFilters() {
    var listMenus = j$('.ui-menu .options');
    listMenus.css('display', 'none');

    /* j$('.ui-menu').find('.value-base > span').text('Open'); 9-14 - messing up claims filters, commenting out for now */ 
    j$('.obj-details[isClosed=true]').hide();
    j$('.obj-details[isClosed=false]').show();
  }

  function getIsTrueOrFalse(isPCP) {
      if(isPCP) {
          return '<i class="fa fa-check boolean" style="color:green;" aria-hidden="true"></i>';
      } else {
          return '<i class="fa fa-close boolean" style="color:red;" aria-hidden="true"></i>'
      }
  }

  function getDisplayValue(fieldValue) {
      if(fieldValue === undefined) {
          return '';
      } else {
          return fieldValue;
      }
  }

  function getDateString(date) {
      if(date === undefined) {
          return 'N/A';
      } else {
          var dateObj = new Date(date);
          
          var dayValue = dateObj.getDate();
          var monthValue = dateObj.getMonth() + 1;
          var yearValue = dateObj.getFullYear();
          var today = monthValue + '/' + dayValue + '/' + yearValue;
          
          return today;
      }
  }

  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })(); 
});
       