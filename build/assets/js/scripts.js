
//поиск по брендам
function searchBrand() {

    var ul = $('.dropdown-search-box');
    var input = ul.find('input');
    var li = ul.find('li.result');

    input.keyup(function(){
        var val = $(this).val();

        if ( val.length > 1 ) {
            li.hide();
            li.filter(':contains("'+ val +'")').show();
        } else {
            li.show();
        }
    });
}

searchBrand();

$('.filterBox__filters').on('click', function() {
    $(this).toggleClass('filterBox__filters_active');
    $('.filterBox__filtersBlock').toggleClass('filterBox__filtersBlock_collapsed').slideToggle(200);
});

$('a.dropdown').each(function() {
    let $hiddenBlock = $(this).parents().find('.expandable').find('.table__hiddenBlock');
    let $hiddenList = $hiddenBlock.find('ul');

    if ($(this).hasClass('dropdown_open')) {
        $hiddenBlock.height($hiddenList.height());
    } else {
        $hiddenBlock.height(0);
    }

    $(this).on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('dropdown_open')
            .parents().find('.expandable').toggleClass('expandable_collapsed');

        if ($(this).hasClass('dropdown_open')) {
            $hiddenBlock.height($hiddenList.height());
        } else {
            $hiddenBlock.height(0);
        }
    });
});
