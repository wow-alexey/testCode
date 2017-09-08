"use strict"
;
(function ($) {
    //**********Plugin for Login page*********
    $("#button").click(function () {
        //Для начала проверяю, не забыл ли клиент заполнить поля и поставить галочку на чекбокс
        if ($('input[type="checkbox"]').is(':checked')) {

            //Потом отправляю запрос на сервер
            $.ajax({
                type: 'POST',
                url: 'http://codeit.pro/frontTestTask/user/registration',
                dataType: "json",
                data: {
                    name: $('#name').val(),
                    secondname: $('#secondname').val(),
                    email: $('#email').val(),
                    gender: $('#gender').val(),
                    pass: $('#pass').val()
                }
            }).done(function (data) {
                //Проверяет ответ с сервера
                if (data['status'] == 'OK') {
                    //В этом случае редирект на страницу компаний
                    var url = "../app/index.html";
                    $(location).attr('href', url);
                }
                else if (data['message'] == 'Creating user error. Email already exists.') {
                    //В этом случае нужно поменять имэйл
                    alert('Such email already exists. Change it.');
                    //Вместо алёрта можно выводить новое окно или вделять красным поле и тд.
                }
                else if (data['status'] == 'Form Error') {
                    //В этом случаене все поля заполнены
                    alert('Not all fields are filled out')
                }
            }).fail(function (jqXHR, textStatus) {
                console.log(textStatus);
            });
        } else {
            alert("Fill all of gaps and don't forget about checkbox ;)")
        }
    });
})(jQuery);

(function ($) {
    //**********Plugin for Companies page**********
    // Делаю прелоадер. Знаю что это не совсем то что нужно, но готов научиться по правильному
    $(document).ready(function () {
        function hide() {
            $('.overlay').css('display', 'none');
            $('.blockContent').css('padding', '2%');
            $('.companiesList').css('overflow', 'auto');
        }
        setTimeout(hide, 1500);
    });

    // Вывожу общее количство компаний в блок Total Companies
    $.getJSON("http://codeit.pro/frontTestTask/company/getList", function (json) {
        $('#totalNumber').html(json.list.length);
    });

    // Вывожу список всех компаний
    $.getJSON("http://codeit.pro/frontTestTask/company/getList", function (json) {
        var out = '';
        var len = json.list.length;
        for (var i = 0; i < len; i++) {
            out += '<li><a>' + json.list[i]['name'] + '</a></li>';
        }
        $('#companiesList').html(out);
    });

    // Вывожу список новостей. Логика понятно, но как ПРАВИЛЬНО реализовать недодумался. Запутался.
    $.getJSON("http://codeit.pro/frontTestTask/news/getList", function (json) {
        var outAuthor = '';
        var len = json.list.length;
        for (var i = 0; i < len; i++) {
            outAuthor += '<span class="author">' + json.list[i]['author'] + '</span>';
            console.log(json.list[i]);
        }
        $('figcaption').html(outAuthor);

    });


})(jQuery);
