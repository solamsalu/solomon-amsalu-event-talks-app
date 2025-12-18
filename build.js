const fs = require('fs');
const path = require('path');

const talks = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'talks.json'), 'utf-8'));
const template = fs.readFileSync(path.join(__dirname, 'src', 'template.html'), 'utf-8');
const style = fs.readFileSync(path.join(__dirname, 'src', 'style.css'), 'utf-8');
const script = fs.readFileSync(path.join(__dirname, 'src', 'script.js'), 'utf-8');

let scheduleHtml = '';
let currentTime = new Date('2025-12-18T10:00:00');

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

talks.forEach((talk, index) => {
  const startTime = new Date(currentTime);
  const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

  scheduleHtml += `
    <div class="talk" data-category="${talk.category.join(', ')}">
      <div class="talk-time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
      <h2 class="talk-title">${talk.title}</h2>
      <div class="talk-speakers">By: ${talk.speakers.join(', ')}</div>
      <p class="talk-description">${talk.description}</p>
      <div class="talk-category">
        ${talk.category.map(c => `<span>${c}</span>`).join('')}
      </div>
    </div>
  `;

  currentTime = new Date(endTime.getTime() + 10 * 60 * 1000);

  if (index === 1) {
    const lunchStartTime = new Date(currentTime);
    const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    scheduleHtml += `
      <div class="break">
        <div class="talk-time">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div>
        <div>Lunch Break</div>
      </div>
    `;
    currentTime = new Date(lunchEndTime.getTime());
  }
});

const finalHtml = template
  .replace('{{style}}', style)
  .replace('{{script}}', script)
  .replace('{{schedule}}', scheduleHtml);

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), finalHtml);

console.log('Website has been generated successfully!');
