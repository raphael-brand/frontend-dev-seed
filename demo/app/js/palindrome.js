define('palindrome', function() {
    return function(fn) {
        fetch('files/palindromes.txt').then(response => {
            response.text().then(fn);
        });
    }
});
