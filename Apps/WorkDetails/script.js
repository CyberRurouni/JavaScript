// Data structure
let data = {
    currentDay: null,
    currentWeek: null,
    currentMonth: null,
    currentSession: null,
    allDays: [],
    allWeeks: [],
    allMonths: []
};

// DOM Elements
const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');

// Daily elements
const newDayBtn = document.getElementById('newDayBtn');
const startSessionBtn = document.getElementById('startSessionBtn');
const endSessionBtn = document.getElementById('endSessionBtn');
const exportDayBtn = document.getElementById('exportDayBtn');
const dayInfo = document.getElementById('dayInfo');
const dailyTableBody = document.querySelector('#dailyTable tbody');
const dailyTotal = document.getElementById('dailyTotal');
const sessionIndicator = document.getElementById('currentSessionIndicator');

// Weekly elements
const newWeekBtn = document.getElementById('newWeekBtn');
const exportWeekBtn = document.getElementById('exportWeekBtn');
const weekInfo = document.getElementById('weekInfo');
const weeklyTableBody = document.querySelector('#weeklyTable tbody');
const weeklyTotal = document.getElementById('weeklyTotal');

// Monthly elements
const newMonthBtn = document.getElementById('newMonthBtn');
const exportMonthBtn = document.getElementById('exportMonthBtn');
const monthInfo = document.getElementById('monthInfo');
const monthlyTableBody = document.querySelector('#monthlyTable tbody');
const monthlyTotal = document.getElementById('monthlyTotal');

// Initialize
loadData();
renderAll();

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetView = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        views.forEach(v => v.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${targetView}-view`).classList.add('active');
    });
});

// Daily functionality
newDayBtn.addEventListener('click', () => {
    const dayAim = prompt('What is your aim for today?', '');
    if (!dayAim) return;

    data.currentDay = {
        id: Date.now(),
        name: dayAim,
        date: new Date(),
        sessions: [],
        totalSeconds: 0
    };

    data.allDays.push(data.currentDay);

    // Add to current week if exists
    if (data.currentWeek) {
        // Check if this day is already in the week
        const existingDayIndex = data.currentWeek.days.findIndex(d => d.id === data.currentDay.id);
        if (existingDayIndex === -1) {
            data.currentWeek.days.push(data.currentDay);
        } else {
            // Update existing day reference
            data.currentWeek.days[existingDayIndex] = data.currentDay;
        }
    }

    saveData();
    renderDaily();
    renderWeekly();
    renderMonthly();
    enableDailyControls();
});

startSessionBtn.addEventListener('click', () => {
    if (!data.currentDay) {
        alert('Please start a new day first!');
        return;
    }

    if (data.currentSession) {
        alert('A session is already running!');
        return;
    }

    const startTime = new Date();
    data.currentSession = {
        id: Date.now(),
        startTime: startTime,
        startTimeStr: formatTime(startTime),
        endTime: null,
        endTimeStr: '',
        topic: '',
        details: '',
        result: '',
        duration: '',
        durationSeconds: 0
    };

    data.currentDay.sessions.push(data.currentSession);
    saveData();
    renderDaily();
    renderWeekly();
    renderMonthly();
    updateSessionControls(true);
});

endSessionBtn.addEventListener('click', () => {
    if (!data.currentSession) return;

    const endTime = new Date();
    const startTime = new Date(data.currentSession.startTime);

    // Find the actual session in the currentDay.sessions array
    const sessionInDay = data.currentDay.sessions.find(s => s.id === data.currentSession.id);
    
    if (sessionInDay) {
        sessionInDay.endTime = endTime;
        sessionInDay.endTimeStr = formatTime(endTime);
        sessionInDay.durationSeconds = Math.floor((endTime - startTime) / 1000);
        sessionInDay.duration = formatDuration(sessionInDay.durationSeconds);
    }

    updateDayTotal();
    updateWeekTotal();
    updateMonthTotal();

    data.currentSession = null;
    saveData();
    renderDaily();
    renderWeekly();
    renderMonthly();
    updateSessionControls(false);
});

exportDayBtn.addEventListener('click', () => {
    if (!data.currentDay || data.currentDay.sessions.length === 0) {
        alert('No sessions to export!');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(99, 102, 241);
    doc.text(`Daily Work Report`, 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Today's Aim: ${data.currentDay.name}`, 14, 30);
    doc.text(`Date: ${new Date(data.currentDay.date).toLocaleDateString()}`, 14, 38);

    const tableData = data.currentDay.sessions.map((s, i) => [
        i + 1,
        s.startTimeStr,
        s.endTimeStr || '-',
        s.topic || '-',
        s.details || '-',
        s.result || '-',
        s.duration || '-'
    ]);

    doc.autoTable({
        startY: 45,
        head: [['#', 'Start', 'End', 'Topic', 'Details', 'Result', 'Duration']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [99, 102, 241] },
        styles: { fontSize: 9 }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text(`Total Hours: ${formatDuration(data.currentDay.totalSeconds)}`, 14, finalY);

    doc.save(`${data.currentDay.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
});

// Weekly functionality
newWeekBtn.addEventListener('click', () => {
    const weekName = prompt('Enter week name:', `Week-${new Date().toLocaleDateString()}`);
    if (!weekName) return;

    data.currentWeek = {
        id: Date.now(),
        name: weekName,
        startDate: new Date(),
        days: [],
        totalSeconds: 0
    };

    // Add current day to the week if it exists
    if (data.currentDay) {
        data.currentWeek.days.push(data.currentDay);
        updateWeekTotal();
    }

    data.allWeeks.push(data.currentWeek);

    // Add to current month if exists
    if (data.currentMonth) {
        const existingWeekIndex = data.currentMonth.weeks.findIndex(w => w.id === data.currentWeek.id);
        if (existingWeekIndex === -1) {
            data.currentMonth.weeks.push(data.currentWeek);
            updateMonthTotal();
        } else {
            // Update existing week reference
            data.currentMonth.weeks[existingWeekIndex] = data.currentWeek;
            updateMonthTotal();
        }
    }

    saveData();
    renderWeekly();
    renderMonthly();
    exportWeekBtn.disabled = false;
});

exportWeekBtn.addEventListener('click', () => {
    if (!data.currentWeek || data.currentWeek.days.length === 0) {
        alert('No days to export!');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(99, 102, 241);
    doc.text(`Weekly Work Report`, 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Week: ${data.currentWeek.name}`, 14, 30);
    doc.text(`Period: ${new Date(data.currentWeek.startDate).toLocaleDateString()}`, 14, 38);

    const tableData = data.currentWeek.days.map((day, i) => [
        i + 1,
        new Date(day.date).toLocaleDateString(),
        day.name,
        day.sessions.length,
        formatDuration(day.totalSeconds)
    ]);

    doc.autoTable({
        startY: 45,
        head: [['Day #', 'Date', "Day's Aim", 'Sessions', 'Total Hours']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [99, 102, 241] },
        styles: { fontSize: 10 }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text(`Total Hours This Week: ${formatDuration(data.currentWeek.totalSeconds)}`, 14, finalY);

    doc.save(`${data.currentWeek.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
});

// Monthly functionality
newMonthBtn.addEventListener('click', () => {
    const monthName = prompt('Enter month name:', `Month-${new Date().toLocaleDateString()}`);
    if (!monthName) return;

    data.currentMonth = {
        id: Date.now(),
        name: monthName,
        startDate: new Date(),
        weeks: [],
        totalSeconds: 0
    };

    // Add current week if exists
    if (data.currentWeek) {
        data.currentMonth.weeks.push(data.currentWeek);
        updateMonthTotal();
    }

    data.allMonths.push(data.currentMonth);
    saveData();
    renderMonthly();
    exportMonthBtn.disabled = false;
});

exportMonthBtn.addEventListener('click', () => {
    if (!data.currentMonth || data.currentMonth.weeks.length === 0) {
        alert('No weeks to export!');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(99, 102, 241);
    doc.text(`Monthly Work Report`, 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Month: ${data.currentMonth.name}`, 14, 30);
    doc.text(`Period: ${new Date(data.currentMonth.startDate).toLocaleDateString()}`, 14, 38);

    const tableData = data.currentMonth.weeks.map((week, i) => {
        const startDate = new Date(week.startDate).toLocaleDateString();
        const endDate = week.days.length > 0
            ? new Date(week.days[week.days.length - 1].date).toLocaleDateString()
            : startDate;
        return [
            i + 1,
            `${startDate} - ${endDate}`,
            week.days.length,
            formatDuration(week.totalSeconds)
        ];
    });

    doc.autoTable({
        startY: 45,
        head: [['Week #', 'Period', 'Days Worked', 'Total Hours']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [99, 102, 241] },
        styles: { fontSize: 10 }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text(`Total Hours This Month: ${formatDuration(data.currentMonth.totalSeconds)}`, 14, finalY);

    doc.save(`${data.currentMonth.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
});

// Render functions
function renderDaily() {
    dailyTableBody.innerHTML = '';

    if (!data.currentDay) {
        dayInfo.classList.remove('active');
        dailyTotal.textContent = '00:00:00';
        return;
    }

    dayInfo.textContent = `📅 ${data.currentDay.name} - ${new Date(data.currentDay.date).toLocaleDateString()}`;
    dayInfo.classList.add('active');

    data.currentDay.sessions.forEach((session, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="time" step="1" value="${session.startTimeStr}" class="time-input" data-field="startTimeStr" data-id="${session.id}"></td>
            <td><input type="time" step="1" value="${session.endTimeStr || ''}" class="time-input" data-field="endTimeStr" data-id="${session.id}" ${!session.endTimeStr ? 'placeholder="--:--:--"' : ''}></td>
            <td><input type="text" value="${session.topic}" placeholder="Enter topic" data-field="topic" data-id="${session.id}"></td>
            <td><input type="text" value="${session.details}" placeholder="Enter details" data-field="details" data-id="${session.id}"></td>
            <td><input type="text" value="${session.result}" placeholder="Enter result" data-field="result" data-id="${session.id}"></td>
            <td class="duration-cell">${session.duration || '-'}</td>
            <td><button class="delete-btn" data-id="${session.id}">🗑️ Delete</button></td>
        `;
        dailyTableBody.appendChild(row);
    });

    dailyTotal.textContent = formatDuration(data.currentDay.totalSeconds);

    // Add event listeners for text inputs
    document.querySelectorAll('#dailyTable input[type="text"]').forEach(input => {
        input.addEventListener('input', (e) => {
            const sessionId = parseInt(e.target.dataset.id);
            const field = e.target.dataset.field;
            const session = data.currentDay.sessions.find(s => s.id === sessionId);
            if (session) {
                session[field] = e.target.value;
                saveData();
            }
        });
    });

    // Add event listeners for time inputs with manual recalculation
    document.querySelectorAll('#dailyTable input[type="time"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const sessionId = parseInt(e.target.dataset.id);
            const field = e.target.dataset.field;
            const session = data.currentDay.sessions.find(s => s.id === sessionId);

            if (session && e.target.value) {
                session[field] = e.target.value;

                // Recalculate duration if both times are present
                if (session.startTimeStr && session.endTimeStr) {
                    const today = new Date().toDateString();
                    const start = new Date(`${today} ${session.startTimeStr}`);
                    const end = new Date(`${today} ${session.endTimeStr}`);

                    // Handle case where end time is before start time (crossed midnight)
                    let durationMs = end - start;
                    if (durationMs < 0) {
                        durationMs += 24 * 60 * 60 * 1000; // Add 24 hours
                    }

                    session.durationSeconds = Math.floor(durationMs / 1000);
                    session.duration = formatDuration(session.durationSeconds);

                    // Update the duration display
                    const row = e.target.closest('tr');
                    const durationCell = row.querySelector('.duration-cell');
                    if (durationCell) {
                        durationCell.textContent = session.duration;
                    }

                    // Update totals for all levels
                    updateDayTotal();

                    // Update week if this day is in the current week
                    if (data.currentWeek) {
                        const weekDayIndex = data.currentWeek.days.findIndex(d => d.id === data.currentDay.id);
                        if (weekDayIndex !== -1) {
                            // Replace the entire day object to ensure all changes propagate
                            data.currentWeek.days[weekDayIndex] = data.currentDay;
                        }
                        updateWeekTotal();
                    }

                    // Update month if week is in current month
                    if (data.currentMonth && data.currentWeek) {
                        const monthWeekIndex = data.currentMonth.weeks.findIndex(w => w.id === data.currentWeek.id);
                        if (monthWeekIndex !== -1) {
                            // Replace the entire week object to ensure all changes propagate
                            data.currentMonth.weeks[monthWeekIndex] = data.currentWeek;
                        }
                        updateMonthTotal();
                    }

                    // Save and re-render everything
                    saveData();

                    // Update all displays
                    dailyTotal.textContent = formatDuration(data.currentDay.totalSeconds);
                    renderWeekly();
                    renderMonthly();
                }

                saveData();
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sessionId = parseInt(e.target.dataset.id);
            if (confirm('Delete this session?')) {
                data.currentDay.sessions = data.currentDay.sessions.filter(s => s.id !== sessionId);
                updateDayTotal();
                updateWeekTotal();
                updateMonthTotal();
                saveData();
                renderDaily();
                renderWeekly();
                renderMonthly();
            }
        });
    });
}

function renderWeekly() {
    weeklyTableBody.innerHTML = '';

    if (!data.currentWeek) {
        weekInfo.classList.remove('active');
        weeklyTotal.textContent = '00:00:00';
        return;
    }

    weekInfo.textContent = `📆 ${data.currentWeek.name} - Started ${new Date(data.currentWeek.startDate).toLocaleDateString()}`;
    weekInfo.classList.add('active');

    data.currentWeek.days.forEach((day, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${new Date(day.date).toLocaleDateString()}</td>
            <td>${day.name}</td>
            <td>${day.sessions.length}</td>
            <td>${formatDuration(day.totalSeconds)}</td>
        `;
        weeklyTableBody.appendChild(row);
    });

    weeklyTotal.textContent = formatDuration(data.currentWeek.totalSeconds);
}

function renderMonthly() {
    monthlyTableBody.innerHTML = '';

    if (!data.currentMonth) {
        monthInfo.classList.remove('active');
        monthlyTotal.textContent = '00:00:00';
        return;
    }

    monthInfo.textContent = `📊 ${data.currentMonth.name} - Started ${new Date(data.currentMonth.startDate).toLocaleDateString()}`;
    monthInfo.classList.add('active');

    data.currentMonth.weeks.forEach((week, index) => {
        const startDate = new Date(week.startDate).toLocaleDateString();
        const endDate = week.days.length > 0
            ? new Date(week.days[week.days.length - 1].date).toLocaleDateString()
            : startDate;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${startDate} - ${endDate}</td>
            <td>${week.days.length}</td>
            <td>${formatDuration(week.totalSeconds)}</td>
        `;
        monthlyTableBody.appendChild(row);
    });

    monthlyTotal.textContent = formatDuration(data.currentMonth.totalSeconds);
}

function renderAll() {
    renderDaily();
    renderWeekly();
    renderMonthly();
}

// Helper functions
function formatTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateDayTotal() {
    if (!data.currentDay) return;
    data.currentDay.totalSeconds = data.currentDay.sessions.reduce((sum, s) => sum + (s.durationSeconds || 0), 0);
    
    // Update this day in the current week if it exists
    if (data.currentWeek) {
        const dayIndex = data.currentWeek.days.findIndex(d => d.id === data.currentDay.id);
        if (dayIndex !== -1) {
            data.currentWeek.days[dayIndex] = data.currentDay;
        }
    }
}

function updateWeekTotal() {
    if (!data.currentWeek) return;
    data.currentWeek.totalSeconds = data.currentWeek.days.reduce((sum, d) => sum + (d.totalSeconds || 0), 0);
    
    // Update this week in the current month if it exists
    if (data.currentMonth) {
        const weekIndex = data.currentMonth.weeks.findIndex(w => w.id === data.currentWeek.id);
        if (weekIndex !== -1) {
            data.currentMonth.weeks[weekIndex] = data.currentWeek;
        }
    }
}

function updateMonthTotal() {
    if (!data.currentMonth) return;
    data.currentMonth.totalSeconds = data.currentMonth.weeks.reduce((sum, w) => sum + (w.totalSeconds || 0), 0);
}

function enableDailyControls() {
    startSessionBtn.disabled = false;
    exportDayBtn.disabled = false;
}

function updateSessionControls(isRunning) {
    if (isRunning) {
        startSessionBtn.disabled = true;
        endSessionBtn.disabled = false;
        sessionIndicator.textContent = '⏱️ Session in progress...';
        sessionIndicator.classList.add('active');
    } else {
        startSessionBtn.disabled = false;
        endSessionBtn.disabled = true;
        sessionIndicator.classList.remove('active');
    }
}

function saveData() {
    const vars = {
        currentDay: data.currentDay,
        currentWeek: data.currentWeek,
        currentMonth: data.currentMonth,
        currentSession: data.currentSession,
        allDays: data.allDays,
        allWeeks: data.allWeeks,
        allMonths: data.allMonths
    };
    localStorage.setItem('workTrackerData', JSON.stringify(vars));
}

function loadData() {
    const saved = localStorage.getItem('workTrackerData');
    if (saved) {
        const parsed = JSON.parse(saved);
        data = { ...data, ...parsed };

        // Enable controls based on loaded data
        if (data.currentDay) {
            enableDailyControls();
            if (data.currentSession) {
                // Check if session is actually still running (no end time)
                if (!data.currentSession.endTime) {
                    updateSessionControls(true);
                } else {
                    // Session already ended, clear it
                    data.currentSession = null;
                    updateSessionControls(false);
                }
            }
        }

        if (data.currentWeek) {
            exportWeekBtn.disabled = false;
        }

        if (data.currentMonth) {
            exportMonthBtn.disabled = false;
        }
    }
}