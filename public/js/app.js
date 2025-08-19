document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Function to set theme
  const setTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      if (themeToggle) {
        themeToggle.querySelector('input').checked = true;
      }
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      if (themeToggle) {
        themeToggle.querySelector('input').checked = false;
      }
      localStorage.setItem('theme', 'light');
    }
  };

  // Check for saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDarkMode = htmlElement.classList.contains('dark');
      setTheme(isDarkMode ? 'light' : 'dark');
    });
  }

  const backButton = document.querySelector('[data-icon="ArrowLeft"]');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }

  const addEntryButton = document.getElementById('add-entry-button');
  if (addEntryButton) {
    addEntryButton.addEventListener('click', () => {
      window.location.href = 'entry_type.html';
    });
  }

  const closeButton = document.getElementById('close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      history.back();
    });
  }

  const activityButton = document.getElementById('activity-button');
  if (activityButton) {
    activityButton.addEventListener('click', () => {
      window.location.href = 'activity_details.html';
    });
  }

  const appointmentButton = document.getElementById('appointment-button');
  if (appointmentButton) {
    appointmentButton.addEventListener('click', () => {
      window.location.href = 'appointment_details.html';
    });
  }

  const milestoneButton = document.getElementById('milestone-button');
  if (milestoneButton) {
    milestoneButton.addEventListener('click', () => {
      window.location.href = 'milestone_details.html';
    });
  }

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      const entryType = window.location.pathname.split('/').pop().split('.')[0];
      let entryData = { entryType };

      if (entryType === 'activity_details') {
        entryData.name = document.getElementById('activity-name').value;
        entryData.day = document.getElementById('activity-day').value;
        entryData.time = document.getElementById('activity-time').value;
      } else if (entryType === 'appointment_details') {
        entryData.name = document.getElementById('appointment-name').value;
        entryData.date = document.getElementById('appointment-date').value;
        entryData.time = document.getElementById('appointment-time').value;
        entryData.location = document.getElementById('appointment-location').value;
      } else if (entryType === 'milestone_details') {
        entryData.description = document.getElementById('milestone-description').value;
        entryData.date = document.getElementById('milestone-date').value;
      }

      const params = new URLSearchParams(entryData).toString();
      window.location.href = `confirmation.html?${params}`;
    });
  }

  if (window.location.pathname.endsWith('confirmation.html')) {
    const params = new URLSearchParams(window.location.search);
    const entryData = Object.fromEntries(params.entries());
    if (entryData) {
      if (entryData.entryType === 'activity_details') {
        document.getElementById('activity-details-confirmation').style.display = 'block';
        document.getElementById('confirmation-activity-name').textContent = entryData.name;
        document.getElementById('confirmation-activity-schedule').textContent = `${entryData.day}, ${entryData.time}`;
      } else if (entryData.entryType === 'appointment_details') {
        document.getElementById('appointment-details-confirmation').style.display = 'block';
        document.getElementById('confirmation-appointment-name').textContent = entryData.name;
        document.getElementById('confirmation-appointment-datetime').textContent = `${entryData.date}, ${entryData.time}`;
        document.getElementById('confirmation-appointment-location').textContent = entryData.location;
      } else if (entryData.entryType === 'milestone_details') {
        document.getElementById('milestone-details-confirmation').style.display = 'block';
        document.getElementById('confirmation-milestone-description').textContent = entryData.description;
        document.getElementById('confirmation-milestone-date').textContent = entryData.date;
      }
    }
  }

  if (window.location.pathname.endsWith('index.html')) {
    const params = new URLSearchParams(window.location.search);
    const entryData = Object.fromEntries(params.entries());
    if (entryData && entryData.entryType) {
      const list = document.getElementById('this-week-list');
      const newEntry = document.createElement('div');
      newEntry.className = 'flex items-center gap-4 bg-white dark:bg-slate-900 px-4 min-h-[72px] py-2';

      let icon, title, subtitle;

      if (entryData.entryType === 'activity_details') {
        icon = 'BowlFood'; // Default icon for now
        title = entryData.name;
        subtitle = `${entryData.day}, ${entryData.time}`;
      } else if (entryData.entryType === 'appointment_details') {
        icon = 'Calendar';
        title = entryData.name;
        subtitle = `${entryData.date}, ${entryData.time}`;
      } else if (entryData.entryType === 'milestone_details') {
        icon = 'Trophy';
        title = entryData.description;
        subtitle = entryData.date;
      }

      const iconDiv = document.createElement('div');
      iconDiv.className = 'text-[#111518] dark:text-slate-50 flex items-center justify-center rounded-lg bg-[#f0f3f4] dark:bg-slate-800 shrink-0 size-12';
      iconDiv.dataset.icon = icon;
      iconDiv.dataset.size = '24px';
      iconDiv.dataset.weight = 'regular';
      iconDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,104h-8.37a88,88,0,0,0-175.26,0H32a8,8,0,0,0-8,8,104.35,104.35,0,0,0,56,92.28V208a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-3.72A104.35,104.35,0,0,0,232,112,8,8,0,0,0,224,104Zm-24.46,0H148.12a71.84,71.84,0,0,1,41.27-29.57A71.45,71.45,0,0,1,199.54,104ZM173.48,56.23q2.75,2.25,5.27,4.75a87.92,87.92,0,0,0-49.15,43H100.1A72.26,72.26,0,0,1,168,56C169.83,56,171.66,56.09,173.48,56.23ZM128,40a71.87,71.87,0,0,1,19,2.57A88.36,88.36,0,0,0,83.33,104H56.46A72.08,72.08,0,0,1,128,40Zm36.66,152A8,8,0,0,0,160,199.3V208H96v-8.7A8,8,0,0,0,91.34,192a88.29,88.29,0,0,1-51-72H215.63A88.29,88.29,0,0,1,164.66,192Z"></path>
          </svg>`;

      const textDiv = document.createElement('div');
      textDiv.className = 'flex flex-col justify-center';

      const titleP = document.createElement('p');
      titleP.className = 'text-[#111518] dark:text-slate-50 text-base font-medium leading-normal line-clamp-1';
      titleP.textContent = title;

      const subtitleP = document.createElement('p');
      subtitleP.className = 'text-[#637c88] dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2';
      subtitleP.textContent = subtitle;

      textDiv.appendChild(titleP);
      textDiv.appendChild(subtitleP);

      newEntry.appendChild(iconDiv);
      newEntry.appendChild(textDiv);

      list.appendChild(newEntry);

      // Clear the URL parameters
      history.replaceState(null, '', window.location.pathname);
    }
  }

  const confirmButton = document.getElementById('confirm-button');
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      const params = new URLSearchParams(window.location.search);
      window.location.href = `index.html?${params.toString()}`;
    });
  }

  const editButton = document.getElementById('edit-button');
  if (editButton) {
    editButton.addEventListener('click', () => {
      history.back();
    });
  }
});
