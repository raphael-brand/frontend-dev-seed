define("contact-form", function() {
  return function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener(
        "submit",
        function(event) {
          console.log(form.checkValidity());
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            $("p.form-error-text").toggleClass("in out");
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  };
});

const log = console.log;

log('Hello Bootstrap');

require(['contact-form'], function(form) {
    window.addEventListener('load', function() {
        //$('p.form-error-text').removeClass('text-hide');
        form();
    });
});
