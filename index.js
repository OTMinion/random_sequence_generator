function generateSequence() {
  let inputNum = document.getElementById("inputNum").value;
  let sequenceNum = parseInt(document.getElementById("sequenceNum").value);
  let sequence = "";

  for (let i = 0; i < sequenceNum; i++) {
    let randomIndex = Math.floor(Math.random() * inputNum.length);
    sequence += inputNum.charAt(randomIndex);
  }

  // Add hyphen after every three characters
  sequence = sequence.match(/.{1,3}/g).join("-");

  document.getElementById("output").innerHTML = sequence;
}
