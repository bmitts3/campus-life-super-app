const endpoint = 'https://foodish-api.com/api/';

// Fetch a random food image URL from the Foodish API
async function fetchRandomFoodImage() {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.image || response.url;
}

// Fetch multiple images in parallel
async function fetchMultiple(n = 3) {
  return Promise.all(Array.from({ length: n }, () => fetchRandomFoodImage()));
}

// Minimal foodmenu: fetch and render 3 images with labels
async function foodmenu() {
  const container = document.querySelector('#food-menu');
  if (!container) return;
  const urls = await fetchMultiple(3);

  function labelFromUrl(url) {
    const u = new URL(url);
    let last = u.pathname.split('/').filter(Boolean).pop() || u.hostname;
    last = last.split('?')[0].split('#')[0];
    last = last.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').replace(/\d+/g, '').replace(/\s+/g, ' ').trim();
    last = last.replace(/\b\w/g, (c) => c.toUpperCase());
    return last || 'Food Image';
  }

  container.innerHTML = urls
    .map((url) => `
      <div class="col-12 col-sm-6 col-md-4">
        <figure class="food-item">
          <img src="${url}" alt="${labelFromUrl(url)}" loading="lazy" class="img-fluid rounded">
          <figcaption class="small text-center text-muted mt-1">${labelFromUrl(url)}</figcaption>
        </figure>
      </div>
    `)
    .join('');
}

// GPA Calculator
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#food-menu')) foodmenu();

  const table = document.getElementById('gpa-table');
  if (!table) return;

  const points = { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.3, D: 1.0, F: 0 };

  document.getElementById('add-row').addEventListener('click', () => {
    table.querySelector('tbody').insertAdjacentHTML(
      'beforeend',
      '<tr>' +
        '<td><input type="number" min="0" step="0.5" class="credits" value="3"></td>' +
        '<td>' +
          '<select class="grade">' +
            '<option value="">Select</option>' +
            '<option>A</option><option>A-</option><option>B+</option><option>B</option><option>B-</option>' +
            '<option>C+</option><option>C</option><option>C-</option><option>D+</option><option>D</option>' +
            '<option>F</option>' +
          '</select>' +
        '</td>' +
        '<td><button class="remove-row">Remove</button></td>' +
      '</tr>'
    );
  });

  table.querySelector('tbody').addEventListener('click', (e) => {
    if (e.target.matches('.remove-row')) e.target.closest('tr').remove();
  });

  document.getElementById('calc').addEventListener('click', () => {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    let totalPts = 0, totalCr = 0;
    rows.forEach((r) => {
      const cr = parseFloat(r.querySelector('.credits').value) || 0;
      const g = r.querySelector('.grade').value;
      if (!cr || !g) return;
      const gp = points[g];
      if (gp == null) return;
      totalPts += gp * cr;
      totalCr += cr;
    });
    const out = document.getElementById('gpa-result');
    if (!totalCr) out.innerHTML = '<div class="text-danger">Enter credits and grades to calculate GPA.</div>';
    else out.innerHTML = `<div>Semester GPA: ${(totalPts / totalCr).toFixed(2)}</div>`;
  });
});
