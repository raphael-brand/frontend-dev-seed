const log = console.log;

log('Hello Bootstrap');

require(['contact-form'], function(form) {
    window.addEventListener('load', function() {
        //$('p.form-error-text').removeClass('text-hide');
        form();
    });
});
