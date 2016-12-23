j$ = jQuery.noConflict();
j$(document).ready(function() {
    if (sforce.console.isInConsole()) {
        j$('.sfdcBody').addClass('console-body');
        sforce.console.setTabTitle(providerName);
        j$('.console-body').css('background-color', '#F4FAFF');
    } 
    
    j$('[id$=emButton]').removeClass('btn');

    //google map code
    var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false
    }
  
    var map;
    var marker;
  
    var geocoder = new google.maps.Geocoder();
  
    var infowindow = new google.maps.InfoWindow({
        content: "<b>" + providerName + "</b><br>" + primaryAddress + "<br>"
    });

      geocoder.geocode( { address: primaryAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results.length) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          
            //create map
            map = new google.maps.Map(document.getElementById("map"), myOptions);
          
            //center map
            map.setCenter(results[0].geometry.location);
            
            //create marker
            marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: providerName
            });
            
            //add listeners
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
            });
            google.maps.event.addListener(infowindow, 'closeclick', function() {
              map.setCenter(marker.getPosition()); 
            });
            
          }
          
        } else {
          j$('#map').css({'height' : '15px'});
          j$('#map').html("Oops! " + providerName + "'s address could not be found, please make sure the address is complete and correct.");
          resizeIframe();
        }
      });
      
      function resizeIframe() {
        var me = window.name;
        if (me) {
          var iframes = parent.document.getElementsByName(me);
          if (iframes && iframes.length == 1) {
            height = document.body.offsetHeight;
            iframes[0].style.height = height + "px";
          }
        }
      }
      //end google map code
      
      //Show or hide email form when email button is clicked
        j$('[id$=emailButton]').click(function() {
            var emailForm = j$('[id$=zp-scout]');     
            var isHidden = j$('[id$=zp-scout]').is(':hidden');
            
            if(isHidden) {
                emailForm.show(); 
            } else {
               emailForm.hide(); 
            }
            
        });

        j$('[id$=zps-rf-to]').change(function() {
            var picklist = j$('[id$=zps-rf-to]').val();
            var newEmailField = j$('[id$=newEmailField]');
            
            if(picklist == 'Other') {
                newEmailField.show();
            } else {
                newEmailField.hide();
            }

        });

        j$('.close-dialog').click(function() {
            var emailForm = j$('[id$=zp-scout]');     
            emailForm.hide(); 
        });

});


