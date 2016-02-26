$( document ).ready( function () {
    var cur_page = 1,
        page_size = 800,
        max_size = 2500;

    $.getJSON( 'content.json', function( data ) {
        var items = [], i = 1;

        content = data && data.tabs || [];

        $.each( content, function( key, val ) {
            var checked = ( i === 1 ) ? 'checked' : '';

            // split into multiple lines for legibility
            items.push( '<input id="tab' + i + '" type="radio" name="grp" ' + checked + '/>' +
                        '<label title="' + val.title + '" for="tab' + i + '">' + val.label + '</label>' +
                        '<div class="content">' + val.content + '</div>' );
            i++;
        });

        $( '.container' ).append( items.join('') );

        $( 'label' ).click( function () {
            location.hash = '!/' + this.title;
        });

        $( '.next_page' ).click(function (e) {
            e.preventDefault();
            nextPage();
        });
        $( '.prev_page' ).click(function (e) {
            e.preventDefault();
            prevPage();
        });

        $( '.pages a').click(function(e) {
            e.preventDefault();
            goToPage(this.text);
        });

        if ( location.hash ) {
            var hash = location.hash.replace( '#!/', '' );
            $( 'label[title=' + hash + ']' ).click();
        }
    });

    function nextPage() {
        var offset = cur_page * -page_size;
        var next_offset = (cur_page + 1) * -page_size;

        doAnimation('.mask', offset);

        cur_page = cur_page + 1;
    }

    function prevPage() {
        var offset = (cur_page - 1) * -page_size + page_size;

        doAnimation('.mask', offset);

        cur_page = cur_page - 1;
    }

    function goToPage(page) {
        var offset = (page - 1) * -page_size;
        cur_page = page;
        doAnimation('.mask', offset);
    }

    function doAnimation(target, left) {
        var next_offset = (cur_page) * -page_size;

        $(target).animate(
            {
                left: left
            }, function() {
                // update next / prev visibility
                if (left === 0){
                    //document.querySelector('.prev_page').style.display = 'none';
                    $('.prev_page').addClass('disabled');
                } else {
                    //document.querySelector('.prev_page').style.display = 'inline';
                    $('.prev_page').removeClass('disabled');
                }
                if ((Math.abs(next_offset) + page_size) >= max_size){
                    //last page, hide next
                    //document.querySelector('.next_page').style.display = 'none';
                    $('.next_page').addClass('disabled');
                } else {
                    //document.querySelector('.next_page').style.display = 'inline';
                    $('.next_page').removeClass('disabled');
                }

                $('.pages li').removeClass('active')
                $('.page' + cur_page).addClass('active');
            }
        );
    }

});