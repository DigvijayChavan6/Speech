window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

const outputBox = document.getElementById('output-box');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

let listening = false;

recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    if (event.results[0].isFinal) {
        outputBox.textContent +=" " + transcript;
    }
});

recognition.addEventListener('end', () => {
    if (listening) {
        recognition.start();
    }
});

startBtn.addEventListener('click', () => {
    outputBox.textContent="";
    listening = true;
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    listening = false;
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
