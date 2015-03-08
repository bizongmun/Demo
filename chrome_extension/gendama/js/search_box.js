$(document).ready(function(){
    var this_input = $('input[id="searchtext"]');
    var word = '';
});
function changeSearch(value)
{
    if (value == 'rakuten' || value == 'yahoo') {
        $('input[id="searchtext"]').attr('alt', value);
        $('.searchMenu').val(value);
        $('#type').val(value);
        ChangeImg(value);
    }
    if (value == 'service') {
        $('input[id="searchtext"]').attr('alt', 'gendama');
        $('.searchMenu').val(value);
        ChangeImg('gendama');
    }
}
function myBlur(x)
{
    var type_s = $('input[id="searchtext"]').attr('alt');
    if (x.value == '' ) {
        if (type_s == 'rakuten') {
            x.value = '楽天の商品を検索';
        } else if (type_s == 'yahoo') {
            x.value = 'Yahooの商品を検索';
        } else {
            x.value = 'サービスを検索';
        }
    }
    x.style.color='#646464';
}
function myFocus(x)
{
    if (x.value == 'サービスを検索' || x.value == '楽天の商品を検索' 
        || x.value == 'Yahooの商品を検索') {
        x.value = '';
    }
    x.style.color='#646464';
}
function ChangeImg(this_alt_name)
{
    var this_input = $('input[id="searchtext"]');
    if ($.inArray(this_alt_name, ['rakuten', 'yahoo', 'gendama'])) {
        this_alt_name = this_input.attr('alt');
    }
    if (this_alt_name == 'rakuten') {
        this_input.css({
            backgroundImage:'url(/image/input_rakuten.png)',
            backgroundRepeat:'no-repeat',
            paddingLeft: '75px',
            width:'195px'
        });
        if (this_input.val() == 'サービスを検索' || this_input.val() == 'Yahooの商品を検索') {
            this_input.val('楽天の商品を検索');
        }
        this_input.attr('alt', 'rakuten');
    } else if (this_alt_name == 'yahoo') {
        this_input.css({
            backgroundImage:'url(/image/input_yahoo.png)',
            backgroundRepeat:'no-repeat',
            paddingLeft: '75px',
            width:'195px'
        });
        if (this_input.val() == 'サービスを検索' || this_input.val() == '楽天の商品を検索') {
            this_input.val('Yahooの商品を検索');
        }
        this_input.attr('alt', 'yahoo');
    }else {
        this_input.css({
            backgroundImage:'url(/image/input_gendama.gif)',
            backgroundRepeat:'no-repeat',
            paddingLeft: '75px',
            width:'195px'
        });
        if (this_input.val() == '楽天の商品を検索' || this_input.val() == 'Yahooの商品を検索') {
            this_input.val('サービスを検索');
        }
        this_input.attr('alt', 'gendama');
    }
}
window.onload = function() {
    var this_input = $('input[id="searchtext"]');
    var vars = [];
    var wards = [];
    var hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
    for (var i = 0; i <hashes.length; i++) {
        var w = hashes[i].slice(hashes[i].indexOf('?') + 1).split('&');
        vars.push(hashes[i]);
    }
    var this_alt_name = this_input.attr('alt');
    if ($.inArray('ecsearch', vars) == -1 ) {
        $('input[id="searchtext"]').attr('alt', 'gendama');
        this_alt_name = 'gendama';
        $('.searchMenu').val("service");
    }
    ChangeImg(this_alt_name);
}
