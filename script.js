const notFunnyReactionGifs = [
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597415002/notFunny-5.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597414996/notFunny-1.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597414994/notFunny-4.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597414994/notFunny-3.gif',
];
const funnyReactionGifs = [
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597414988/funny-6.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597414989/funny-7.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597414988/funny-2.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597415001/funny-4.gif',
  'https://res.cloudinary.com/dh41vh9dx/image/upload/v1597415002/funny-1.gif',
];
const reactionGif = document.getElementById('reaction');

const synth = window.speechSynthesis; // speech synthesis api
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // speech recognition api
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Speech Function
const speak = (speakingText) => {
  // Check if speaking
  if (synth.speaking) {
    return;
  }

  // Get speak text
  const utterText = new SpeechSynthesisUtterance(speakingText);
  const voices = synth.getVoices();
  utterText.voice = voices.find((voice) => voice.lang === 'en-US');
  text.textContent = speakingText;

  // Speak end
  utterText.onend = (e) => {
    toggleHead();
    toggleButton();
  };

  // Speak error
  utterText.onerror = (e) => {
    console.error('Something went wrong');
  };

  // Speak
  toggleHead();
  synth.speak(utterText);
};

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    // Normally, don't write out API Keys like this, but an exception made here because it's free.
    key: 'e985f868e96c46d9b0789c3855350152',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

const reactToJoke = () => {
  reactionGif.style.visibility = 'visible';
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
