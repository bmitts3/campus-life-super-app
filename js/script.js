const endpoint = 'https://foodish-api.com/api/';

// Fetch a random food image URL from the Foodish API
async function fetchRandomFoodImage() {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.image || response.url;
}

// Fetch the 3 images at the same time
async function fetchMultiple(n = 3) {
  const promises = Array.from({ length: n }, () => fetchRandomFoodImage());
  return Promise.all(promises);
}

// Minimal foodmenu: assumes DOM element and fetches succeed
async function foodmenu() {
  const container = document.querySelector('#food-menu');
  const urls = await fetchMultiple(3);
// create a label from the URL
  function labelFromUrl(url) {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    let last = parts.length ? parts[parts.length - 1] : u.hostname;
    last = last.split('?')[0].split('#')[0]; 
    last = last.replace(/\.[^/.]+$/, ''); 
    last = last.replace(/[-_]+/g, ' '); 
    last = last.replace(/\d+/g, ''); 
    last = last.replace(/\s+/g, ' ').trim(); 
    last = last.replace(/\b\w/g, (c) => c.toUpperCase()); 
    return last || 'Food Image';
  }

  container.innerHTML = urls
    .map((url) => {
      const label = labelFromUrl(url);
      return `
        <figure class="card text-center" style="width: 12rem;">
          <img src="${url}" alt="${label}" class="card-img-top" >
          <figcaption class="card-body"><p class="card-text mb-0">${label}</p></figcaption>
        </figure>
      `;
    })
    .join('');
}

// runs without a button to activate
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#food-menu');
  if (container) {
    foodmenu();
  }
});
