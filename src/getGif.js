export default async function getGif(search) {
  const img = document.createElement(`img`);
  const container = document.querySelector(`.container`);
  container.innerHTML = ``;
  container.textContent = "Loading GIF...";

  const gifData = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=ndYQkQhMG2RhcTXetLSKGLHcB46H0O0I&s=${search}`,
    { mode: `cors` }
  );
  const gif = await gifData.json();
  container.textContent = ``;
  img.src = gif.data.images.original.url;

  container.appendChild(img);
}
