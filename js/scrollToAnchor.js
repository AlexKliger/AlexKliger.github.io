$("a[href*='#']") // Selects all links with hashes.
    .not('[href="#"]') // Removes links that don't actually link to anything.
    .click(function(event) {
        // Find element to scroll to.
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 700, function() {
                // Callback after animation. Must change focus.
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable.
                    $target.focus(); // Set focus again.
                }
            }

            )
        }
    })