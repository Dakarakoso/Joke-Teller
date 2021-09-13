const button = document.getElementById("button");
const audio = document.getElementById("audio");

const audioElement = document.getElementById("audio");

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// passing Joke to VoiceRSS API
const tellMe = (joke) => {
  // console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "00d380384abf40a799ccbc10a8fc9d4f",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const getJokes = async () => {
  const jokesApiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious";
  let joke = "";
  try {
    const response = await fetch(jokesApiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
