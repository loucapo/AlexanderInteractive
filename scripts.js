$( document ).ready( function () {

    $.getJSON( 'content.json', function( data ) {
        var items = [], checks = [], tabs = [], content = [], i = 1;

        $.each( data.tabs, function( key, val ) {
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

        if ( location.hash ) {
            var hash = location.hash.replace( '#!/', '' );
            $( 'label[title=' + hash + ']' ).click();
        }
    });

});