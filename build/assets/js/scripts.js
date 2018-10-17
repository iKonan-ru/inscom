$('.filterBox__filters').on('click', function() {
    $(this).toggleClass('filterBox__filters_active');
    $('.filterBox__filtersBlock').toggleClass('filterBox__filtersBlock_collapsed').slideToggle(200);
});

$('a.dropdown').on('click', function(e) {

    const $hiddenBlock = $(this).parent().parent().find('.table__hiddenBlock');
    const $hiddenList = $hiddenBlock.find('ul');

    $(this).toggleClass('dropdown_open')
        .closest().find('.expandable').toggleClass('expandable_collapsed');

    if ($(this).hasClass('dropdown_open')) {
        $hiddenBlock.height($hiddenList.height());
    } else {
        $hiddenBlock.height(0);
    }

    e.preventDefault();
});
