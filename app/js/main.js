"use strict"
;(function ($) {
    $().ready(function () {
        jQuery.validator.addMethod("lettersonly", function (value, element) {
            return this.optional(element) || /^[a-z,а-я]+$/i.test(value);
        });
        $('#signUpForm').validate({
            rules: {
                name: {
                    required: true,
                    digits: false,
                    minlength: 2,
                    maxlength: 60,
                    lettersonly: true
                },
                secondname: {
                    required: true,
                    digits: false,
                    minlength: 3,
                    maxlength: 60,
                    lettersonly: true
                },
                email: {
                    required: true,
                    email: true
                },
                pass: {
                    required: true
                },
                gender:{
                    required: true
                },
                checkbox: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: 'Field "name" should contain from 2 to 60 letters',
                    lettersonly: 'This field can not consist any numbers or spaces'
                },
                secondname: {
                    required: 'Field "secondname" should contain from 3 to 60 letters',
                    lettersonly: 'This field can not consist any numbers or spaces'
                },
                email: 'Email is not valid',
                checkbox: 'You have to check it ►'
            }
        })
    })
})(jQuery);

$(document).ready(function(){
    $('.newSlider').slick({
        arrows: false
    });
});