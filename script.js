const roomContainer = document.getElementById('roomContainer');
const roomCountInput = document.getElementById('roomCount');
const buildRoomsButton = document.getElementById('buildRooms');
const generatePlanButton = document.getElementById('generatePlan');
const resetButton = document.getElementById('reset');
const summary = document.getElementById('summary');

function createRoomInputs() {
  const roomCount = Number(roomCountInput.value) || 0;
  roomContainer.innerHTML = '';

  if (roomCount < 1) {
    roomContainer.innerHTML = '<p>Please enter at least one room.</p>';
    return;
  }

  for (let i = 1; i <= roomCount; i += 1) {
    const roomCard = document.createElement('div');
    roomCard.className = 'room-card';
    roomCard.innerHTML = `
      <h3>Room ${i}</h3>
      <div class="grid two-col">
        <label>
          Room Type
          <input type="text" data-room-type placeholder="e.g., Bedroom, Kitchen" />
        </label>
        <label>
          Room Size (sq ft)
          <input type="number" min="40" step="5" data-room-size placeholder="e.g., 200" />
        </label>
        <label>
          Interior Style
          <input type="text" data-room-style placeholder="e.g., Minimal, Cozy" />
        </label>
        <label>
          Key Features
          <input type="text" data-room-features placeholder="e.g., Walk-in closet, island counter" />
        </label>
      </div>
    `;
    roomContainer.appendChild(roomCard);
  }
}

function formatMoney(value) {
  if (!value) return 'Not provided';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function generateSummary() {
  const homeName = document.getElementById('homeName').value || 'Untitled Home';
  const area = document.getElementById('area').value || 'Not provided';
  const floors = document.getElementById('floors').value || 'Not provided';
  const roomCount = document.getElementById('roomCount').value || 'Not provided';
  const aesthetic = document.getElementById('aesthetic').value;
  const palette = document.getElementById('palette').value || 'Not provided';
  const materials = document.getElementById('materials').value || 'Not provided';
  const budget = Number(document.getElementById('budget').value || 0);

  const roomTypes = [...document.querySelectorAll('[data-room-type]')];
  const roomSizes = [...document.querySelectorAll('[data-room-size]')];
  const roomStyles = [...document.querySelectorAll('[data-room-style]')];
  const roomFeatures = [...document.querySelectorAll('[data-room-features]')];

  const roomLines = roomTypes.map((input, index) => {
    const type = input.value || `Room ${index + 1}`;
    const size = roomSizes[index]?.value || 'N/A';
    const style = roomStyles[index]?.value || 'N/A';
    const features = roomFeatures[index]?.value || 'N/A';
    return `${index + 1}. ${type} — ${size} sq ft | Style: ${style} | Features: ${features}`;
  });

  const text = [
    `🏡 HOME PLAN: ${homeName}`,
    '',
    'Structure Overview',
    `• Total area: ${area} sq ft`,
    `• Floors: ${floors}`,
    `• Number of rooms: ${roomCount}`,
    '',
    'Aesthetic & Interior Direction',
    `• Overall aesthetic: ${aesthetic}`,
    `• Color palette: ${palette}`,
    `• Materials: ${materials}`,
    `• Budget: ${formatMoney(budget)}`,
    '',
    'Room-by-Room Plan',
    roomLines.length ? roomLines.join('\n') : 'No room details added yet.'
  ].join('\n');

  summary.classList.remove('empty');
  summary.textContent = text;
}

function resetPlanner() {
  document.querySelectorAll('input').forEach((input) => {
    if (input.type === 'number') {
      if (input.id === 'floors') input.value = 1;
      else if (input.id === 'roomCount') input.value = 3;
      else input.value = '';
    } else {
      input.value = '';
    }
  });
  document.getElementById('aesthetic').selectedIndex = 0;
  roomContainer.innerHTML = '';
  summary.textContent = 'Your generated home plan summary will appear here.';
  summary.classList.add('empty');
}

buildRoomsButton.addEventListener('click', createRoomInputs);
generatePlanButton.addEventListener('click', generateSummary);
resetButton.addEventListener('click', resetPlanner);

createRoomInputs();
