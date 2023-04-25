let generatedSequence = "";
let output = document.getElementById("output");

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

  output.innerHTML = sequence;
  generatedSequence = sequence.replace(/-/g, "");
  document.getElementById("typedNum").value = "";
  document
    .getElementById("typedNum")
    .setAttribute(
      "maxlength",
      generatedSequence.length + Math.floor(generatedSequence.length / 3) - 1
    );
  document.getElementById("results").innerHTML = "";
  document.getElementById("score").innerHTML = "";
  document.getElementById("percentage").innerHTML = "";
}

function checkSequence() {
  let typedNum = document.getElementById("typedNum").value;
  let results = "";
  let correctCount = 0;

  // Remove hyphens from typedNum
  typedNum = typedNum.replace(/-/g, "");

  // Remove hyphens from generatedSequence
  let generatedSequenceWithoutHyphens = generatedSequence.replace(/-/g, "");

  for (let i = 0; i < generatedSequenceWithoutHyphens.length; i++) {
    if (i >= typedNum.length) {
      results += '<span class="incorrect">' + generatedSequence.charAt(i) + "</span>";
    } else if (generatedSequenceWithoutHyphens.charAt(i) !== typedNum.charAt(i)) {
      results += '<span class="incorrect">' + generatedSequence.charAt(i) + "</span>";
    } else {
      results += generatedSequence.charAt(i);
      correctCount++;
    }

    if ((i + 1) % 3 === 0 && i !== generatedSequenceWithoutHyphens.length - 1) {
      results += "-";
    }
  }

  document.getElementById("results").innerHTML = results;
  output.classList.remove("blur");
  let score =
    correctCount + "/" + (generatedSequence.length - generatedSequence.split("-").length + 1);
  document.getElementById("score").innerHTML = score;
  let percentage = (
    (correctCount / (generatedSequence.length - generatedSequence.split("-").length + 1)) *
    100
  ).toFixed(2);
  document.getElementById("percentage").innerHTML = percentage;
}

document.getElementById("typedNum").addEventListener("focus", function () {
  output.classList.add("blur");
});

document.getElementById("typedNum").addEventListener("input", function () {
  let typedNum = this.value;
  let cursorPosition = this.selectionStart;
  typedNum = typedNum.replace(/[^0-9]/g, "");
  let newTypedNum = "";

  for (let i = 0; i < typedNum.length; i++) {
    newTypedNum += typedNum.charAt(i);

    if ((i + 1) % 3 === 0 && i !== typedNum.length - 1) {
      newTypedNum += "-";
    }
  }

  this.value = newTypedNum;

  // Restore cursor position
  this.selectionStart = cursorPosition - (typedNum.length - newTypedNum.replace(/-/g, "").length);
  this.selectionEnd = cursorPosition - (typedNum.length - newTypedNum.replace(/-/g, "").length);
});
