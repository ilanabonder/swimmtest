// this is a comment comments are cool

let SpeechRecognition = webkitSpeechRecognition;
let giphyAPIKey = 'Uo81CXdUYTYmTVUtOQGKeO3mjnKTeY0o';

let getSpeech = () => {
  let recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  // recognition.continuous = false;
  recognition.interimResults = true;
  console.log('started rec');

  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    console.log('confidence: ' + event.results[0][0].confidence);
    document.querySelector('#speech-div').textContent = speechResult;
    getGif(speechResult);
  };

  recognition.onend = () => {
    console.log('it is over');

    // for "endless" mode, comment out the next line and uncomment getSpeech()
    recognition.stop();
    // getSpeech(); 

  };

  recognition.onerror = event => {
    console.log('something went wrong: ' + event.error);
  };
};

const getGif = phrase => {
  let url = `http://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;
  console.log(url);

  fetch(url, {
      mode: 'cors'
    })
    .then(response => response.json())
    .then(result => {
      let imgUrl = result.data.image_url;
      document.querySelector('#the-gif').src = imgUrl;
    });
};

document.querySelector('#my-button').onclick = () => {
  console.log('clickity');
  getSpeech();
};