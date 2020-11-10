const jokeText = document.getElementById('joke');
const newJokeButton = document.getElementById('new-joke');
const jokeContainer = document.getElementById('joke-container');

const image = document.getElementById('chuck');
const loader = document.getElementById('loader');

function loadingJoke() {
   loader.hidden = false;
   image.hidden = true;
   jokeContainer.hidden = true;
}

function completeLoadingJoke() {
   loader.hidden = true;
   image.hidden = false;
   jokeContainer.hidden = false;
}



async function getJoke() {
   const apiUrl = 'https://api.chucknorris.io/jokes/random';

   try {
      loadingJoke();
      const request = await fetch(apiUrl);
     
      const response = await request.json();

      if (response.value.length >120) {
         jokeText.classList.add('long-quote');
      }else {
         jokeText.classList.remove('long-quote');
      }
      if (response.value.length > 250) {
         getJoke();
      }
      jokeText.textContent = response.value;
      completeLoadingJoke();
   }catch(error) {
      getJoke();
   }
}



newJokeButton.addEventListener('click', getJoke);
getJoke();