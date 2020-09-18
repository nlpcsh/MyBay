'use strict';

$(document).ready(function() {

    $('body').on('click', '.edit-address', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'get',
            url: '/profile/edit-address'
        }).done(function(data) {
            //alert( "success" );
            $('.address').html(data);
            //console.log(data);
        })
        .fail(function(err) {
            alert( "error" );
        })
    });

    $('body').on('click', '.add-address', function(event) {
        event.preventDefault();
        const form = $('.address-form').serialize();
        $.ajax({
            method: 'post',
            url: '/profile/add-address',
            data: form,
            success: function(response) {
                const userAddress = response;
                //document.getElementById("disp").innerHTML =response;
                $('.address').html(`<h3>Address</h3>
                    <p><b>Country:</b> ${userAddress.address.country} </p>
                    <p><b>Zip code:</b> ${userAddress.address.zipCode}</p>
                    <p><b>City:</b> ${userAddress.address.city}</p>
                    <p><b>Street:</b> ${userAddress.address.houseNumber}, ${userAddress.address.street}</p>
                    <p><b>Telephone:</b> ${userAddress.tel} </p>
                    <div class="text-right">
                        <button class="btn btn-link edit-address">Edit Address</button>
                    </div>`);
            }
        })
        .fail(function(err) {
            alert( "error" );
        })
    });
});
