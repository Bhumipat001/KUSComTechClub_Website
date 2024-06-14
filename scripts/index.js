document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('nav a');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    logo.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var informationLink = document.querySelector('.nav-menu li a[href="Information"]');
    
    informationLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 750,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var informationLink = document.querySelector('.nav-menu li a[href="Contact"]');
    
    informationLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
});

const API_KEY = import.meta.env.VITE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const RANGE = import.meta.env.VITE_RANGE_index;

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
      const links = {
        fromLink: data.values[1][1],
        instagramLink: data.values[2][1],
        facebookLink: data.values[3][1],
        youtubeLink: data.values[4][1],
        youtubeVideoLink: data.values[5][1]
      };
      links.youtubeVideoLink = convertToEmbedLink(links.youtubeVideoLink);
      updateVideoID(links.youtubeVideoLink);
      useLinks(links);
    })
}

function convertToEmbedLink(shareLink) {
  const videoID = shareLink.match(/(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/)[1];
  return `https://www.youtube.com/embed/${videoID}`;
}

function updateVideoID(embedLink) {
  var iframe = document.getElementById('youtube-video');
  iframe.src = embedLink;
}

function useLinks(links) {
  const applyButton = document.getElementById('applyButton');
  const instagramButton = document.getElementById('Instragram');
  const instagramButton_icon = document.querySelector('a.button.instagram');
  const facebookButton_icon = document.querySelector('a.button.facebook');
  const youtubeButton_icon = document.querySelector('a.button.youtube');

  if (applyButton) {
      applyButton.onclick = function() {
          window.location.href = links.fromLink;
      };
  }

  if (instagramButton) {
      instagramButton.onclick = function() {
          window.location.href = links.instagramLink;
      };
  }

  if (instagramButton_icon) {
      instagramButton_icon.onclick = function(event) {
          event.preventDefault();
          window.location.href = links.instagramLink;
      };
  }

  if (facebookButton_icon) {
      facebookButton_icon.onclick = function(event) {
          event.preventDefault();
          window.location.href = links.facebookLink;
      };
  }

  if (youtubeButton_icon) {
      youtubeButton_icon.onclick = function(event) {
          event.preventDefault();
          window.location.href = links.youtubeLink;
      };
  }
}

fetchData();