const log = console.log;

log('Hello Bootstrap');
require(['palindrome'], function (palindrome) {
  palindrome((result) => {
    res = result.split("\n");
    // console.log(res);
    for(let textline of res) {
      let buffer = textline.replace(/[^a-z]*/gi,'');
      if(buffer.length % 2 == 1) {
        // if palindrome possible found
        if(buffer[1].toLowerCase() === buffer[buffer.length-2].toLowerCase())
          console.log(textline)
      }
      else
          console.log(' >', textline);
    }
  })
});
