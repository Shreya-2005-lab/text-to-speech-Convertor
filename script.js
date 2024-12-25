let speech = new SpeechSynthesisUtterance();

let convertor = document.querySelector("span");
const text = "CONVERTOR";

let index = 0;
let isTyping = true;

function typeAndEraseText() {
  if (isTyping) {

    if (index < text.length) {
      convertor.textContent += text[index];
      index++;
      setTimeout(typeAndEraseText, 150); 
    } else {
      isTyping = false;
      setTimeout(typeAndEraseText, 2000);
    }
  } else {
    if (index > 0) {
      index--;
      convertor.textContent = text.slice(0, index);
      setTimeout(typeAndEraseText, 150); 
    } else {
      isTyping = true;
      setTimeout(typeAndEraseText, 500); 
    }
  }
}

function blinkCursor() {
  setInterval(() => {
    convertor.style.borderRight =
      convertor.style.borderRight === "3px solid white"
        ? "3px solid transparent"
        : "3px solid white";
  }, 500); 
}

typeAndEraseText();
blinkCursor();


let voices = [];

let voiceselect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];


    voices.forEach((voice,i) => (voiceselect.options[i]=new Option(voice.name,i)));
};

voiceselect.addEventListener("change",()=>{
    speech.voice = voices[voiceselect.value];
})



btn = document.querySelector("button");

btn.addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});