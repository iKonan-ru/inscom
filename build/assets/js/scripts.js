$('.filterBox__filters').on('click', function() {
    $(this).toggleClass('filterBox__filters_active');
    $('.filterBox__filtersBlock').toggleClass('filterBox__filtersBlock_collapsed').slideToggle(200);
});

(function($) {
    $('tr.expandable a.dropdown').on('click', function(e) {
        const $parentNode = $(this).parent().parent();
        const $hiddenBlock = $parentNode.find('.table__hiddenBlock');
        const $hiddenList = $hiddenBlock.find('ul');

        if ($(this).hasClass('dropdown_open')) {
            $hiddenBlock.height(0);
        } else {
            $hiddenBlock.height($hiddenList.height());
        }

        $(this).toggleClass('dropdown_open');
        $parentNode.toggleClass('expandable_collapsed');

        e.preventDefault();
    });
})(window.jQuery);
