const log = console.log;

log('Hello Bootstrap');

require(['contact-form'], function(form) {
    document.body.addEventListener('click', function() {
        $('p.form-error-text').removeClass('text-hide');
        form();
    });
});
