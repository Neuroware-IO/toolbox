var bce_web = {
    buttons: function()
    {
        $('#navigation').on('click', 'a.navigator', function(e)
        {
            e.preventDefault();
            $('.navigator').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('href');
            var pos = $(id).position().top - 60;
            $('body, html').animate({
                scrollTop: pos
            }, 350);
        });
    },
    forms: function()
    {
        $('form.wufoo').on('keyup', 'input, textarea', function(e)
        {
            e.preventDefault();
            var form = $(this).parent().parent().parent().parent();
            var url = $(form).attr('data-base');
            $(form).find('.form-group').each(function(i)
            {
                var obj = $(this).find('input, textarea');
                var key = $(obj).attr('data-name');
                var value = $(obj).val();
                if(key && value)
                {
                    url = url + key + '=' + value + '&';
                }
            });
            $(form).attr('action', url);
        });
    },
    init: function()
    {
        bce_web.buttons();
        bce_web.forms();
        bce_web.parallax();
    },
    parallax: function()
    {
        $('#header .parallax').parallax({
            mouseport: jQuery("#header")
        });
    }
};

$(document).ready(function(e)
{
    bce_web.init();
});