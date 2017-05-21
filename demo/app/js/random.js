define('random',()=>{
  return  (a,z) => {
      return Math.floor(Math.random()*z+a);
  };
});