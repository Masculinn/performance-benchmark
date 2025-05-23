/* 
I saw numerous amount of posts about 
"Hello devssss, which of the js method is better?"
that always made me consider getting rid of this doom-scrolling 
shit in linkedin or other community platforms... That was the first 
point of creating my own micro-benchmark node.js project to see actual 
impacts without exposure to people's ridicilous discussion hell...
Write any of the function you want, after configuring the 'META' object
run 'node server3' inside the root directory. Enjoy!
*/

function phase1() {
  const charset = ["qwertyuiopasdfghjklzxcvbnm"];

  const arr = [];
  for (let i = 0; i < charset[0].length; i++) {
    arr.push(charset[0][i]);
  }

  return arr;
}

function phase2() {
  const charset = "qwertyuiopasdfghjklzxcvbnm";
  const arr = charset.split("");
  return arr;
}

export { phase1, phase2 };
