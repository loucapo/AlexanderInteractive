$(document).ready(function () {

    if (location.hash) {
        var hash = location.hash.replace('#!/', '');
        console.log(hash);
        $('[title=' + hash + ']').click();
    }

    $('.state').click(function () {
        location.hash = '!/' + this.title;
    });
});