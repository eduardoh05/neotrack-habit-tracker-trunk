// Lógica para cadastro e progresso de hábitos

const habitForm = document.getElementById('habit-form');
const habitNameInput = document.getElementById('habit-name');
const habitsList = document.getElementById('habits-list');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
  habitsList.innerHTML = '';
  habits.forEach((habit, idx) => {
    const li = document.createElement('li');
    li.className = 'habit-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'habit-name';
    nameSpan.textContent = habit.name;

    const progressBtn = document.createElement('button');
    progressBtn.className = 'progress-btn' + (habit.doneToday ? ' done' : '');
    progressBtn.textContent = habit.doneToday ? '✓' : '+';
    progressBtn.title = habit.doneToday ? 'Já marcado hoje!' : 'Marcar progresso de hoje';

    progressBtn.onclick = () => {
      if (!habit.doneToday) {
        habit.doneToday = true;
        habit.progress += 1;
        saveHabits();
        renderHabits();
      }
    };

    const progressInfo = document.createElement('span');
    progressInfo.textContent = `Dias: ${habit.progress}`;

    li.appendChild(nameSpan);
    li.appendChild(progressInfo);
    li.appendChild(progressBtn);
    habitsList.appendChild(li);
  });
}

// Reseta progresso diário ao recarregar em um novo dia
function resetDailyProgress() {
  const today = new Date().toLocaleDateString();
  const lastDate = localStorage.getItem('lastDate');
  if (lastDate !== today) {
    habits.forEach(h => h.doneToday = false);
    localStorage.setItem('lastDate', today);
    saveHabits();
  }
}

habitForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = habitNameInput.value.trim();
  if (name && !habits.some(h => h.name.toLowerCase() === name.toLowerCase())) {
    habits.push({ name, progress: 0, doneToday: false });
    saveHabits();
    renderHabits();
    habitNameInput.value = '';
  }
});

resetDailyProgress();
renderHabits();