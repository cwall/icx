j$(document).ready(function() {
    j$('.claim-filter').click(function() {
        var inputMemberType = j$('[id$=member-type-input]'); // Select member hidden input field
        var newMemberType = j$('[id$=member-type] .value-base span').html(); // Take the selected member type dropdown value
        inputMemberType.val(newMemberType); // Populate hidden member field with selected value

        var inputClaimType = j$('[id$=claim-type-input]');
        var newClaimType = j$('[id$=claim-type] .value-base span').html();
        inputClaimType.val(newClaimType);
        
        // Trigger input events to fire angular fuction
        inputClaimType.trigger('input');
        inputMemberType.trigger('input'); 
    });
});