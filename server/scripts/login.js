'use strict';

$(document).ready(function() {
    $('#register-form-link').on('click', function(event) {
        $('#register-form').removeClass('hidden');
        $('#sign-in-form').addClass('hidden');
    });
});
