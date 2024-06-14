const API_KEY = import.meta.env.VITE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const RANGE = import.meta.env.VITE_RANGE_members;

function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const members = data.values.map(row => ({
        group: row[0],
        name: row[1],
        role: row[2],
        picture: row[3],
        backgroundImage: row[4],
        textColor: row[5]
      }));
      displayCards(members);
    })
}

function displayCards(members) {
  const container = document.getElementById('grouped-cards');
  const groups = {};

  members.forEach(member => {
    if (!groups[member.group]) {
      groups[member.group] = [];
    }
    groups[member.group].push(member);
  });

  const groupNames = Object.keys(groups);
  const numericGroups = groupNames.filter(name => /\d+$/.test(name)).sort((a, b) => {
    return parseInt(b.match(/\d+$/)[0], 10) - parseInt(a.match(/\d+$/)[0], 10);
  });

  const nonNumericGroups = groupNames.filter(name => !/\d+$/.test(name));
  const sortedGroups = [...nonNumericGroups, ...numericGroups];

  sortedGroups.forEach(group => {
    const groupContainer = document.createElement('div');
    groupContainer.className = 'group-container';

    const groupTitle = document.createElement('div');
    groupTitle.className = 'group-title';
    groupTitle.innerText = group;
    groupContainer.appendChild(groupTitle);

    groups[group].forEach(member => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundImage = `url(${member.backgroundImage})`;
      const pictureUrl = member.picture ? member.picture : 'images/logo_background.png';
      card.innerHTML = `
        <img src="${pictureUrl}" alt="${member.name}">
        <h3 style="color:${member.textColor};">${member.name}</h3>
        <p style="color:${member.textColor};">${member.role}</p>
      `;
      groupContainer.appendChild(card);
    });

    container.appendChild(groupContainer);
  });
}

fetchData();