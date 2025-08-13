// === PAGE TOGGLE ===
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const addBtn = document.getElementById('addBtn');
const backBtn = document.getElementById('backBtn');
const homeBtn = document.getElementById('homeBtn'); // Assuming you have an element with id="homeBtn"

addBtn.addEventListener('click', () => {
  page1.style.display = 'none';
page2.style.display = 'block';
  window.scrollTo(0, 0);
});

backBtn.addEventListener('click', () => {
    page2.style.display = 'none';
  page1.style.display = 'block';
  window.scrollTo(0,0);
});

// Home button → always go to page1
if (homeBtn) {
  homeBtn.addEventListener('click', () => {
    page2.classList.add('hidden');
    page1.classList.remove('hidden');
    window.scrollTo(0,0);
  });
}

// === FILE UPLOAD LABEL ===
function attachFileLabel(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const label = document.querySelector(`label[for="${inputId}"]`);
  input.addEventListener('change', () => {
    if (!input.files || input.files.length === 0) {
      label.innerHTML = 'Upload image ⤓';
    } else {
      label.innerHTML = input.files[0].name + ' ✓';
    }
  });
}
attachFileLabel('bannerFile');
attachFileLabel('fileUpload');
attachFileLabel('authorPhoto');


// === SEARCH FILTER ===
const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const excerpt = card.querySelector(".card-excerpt").textContent.toLowerCase();

    if (title.includes(term) || excerpt.includes(term)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// === MODAL ===
const modal = document.getElementById("cardModal");
const closeBtn = document.querySelector(".close-btn");
const modalImage = document.querySelector(".article-image");
const modalTitle = document.querySelector(".modal-title");
const modalMeta = document.querySelector(".modal-meta");

// Open modal when clicking a card
document.querySelectorAll('#page1 .card').forEach(card => {
  card.addEventListener('click', () => {

    // Skip if this card is inside Page 3
    if (card.closest('#page3')) return;

    const imgSrc = card.querySelector('.card-img').src;
    const title = card.querySelector('.card-title').textContent;
    const authorName = card.querySelector('.author-name')?.textContent || "";
    const date = card.querySelector('.date')?.textContent || "";

    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalMeta.textContent = `${authorName} — ${date}`;
    modal.style.display = "block";
  });
});

// Close modal on click
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Close modal on ESC key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});

document.querySelectorAll('.menu-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const navMenu = toggle.closest('.navbar').querySelector('.nav-menu');
    navMenu.classList.toggle('active');
  });
});

// Edit button handler
document.getElementById("editCardBtn").addEventListener("click", () => {
  alert("Edit functionality to be implemented!");
  // Here you can open page2 with pre-filled data from the card
});

// Download button handler
document.getElementById("downloadCardBtn").addEventListener("click", () => {
  if (currentFiles.length === 0) {
    alert("No files attached to this article.");
    return;
  }

  currentFiles.forEach(file => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});


let currentFiles = [];

document.querySelectorAll("#page1 .card").forEach(card => {
  card.addEventListener("click", () => {
    const imgSrc = card.querySelector(".card-img").src;
    const title = card.querySelector(".card-title").textContent;
    const authorName = card.querySelector(".author-name")?.textContent || "";
    const date = card.querySelector(".date")?.textContent || "";

    // Get files from card
    const filesAttr = card.getAttribute("data-files") || "";
    currentFiles = filesAttr ? filesAttr.split(",") : [];

    // Populate modal content
    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalMeta.textContent = `${authorName} — ${date}`;

    // Populate file links in modal
    const filesContainer = document.querySelector(".modal-files");
    filesContainer.innerHTML = "";
    if (currentFiles.length > 0) {
      filesContainer.innerHTML = "<h4>Attached files:</h4>" +
        currentFiles.map(file => `<a href="${file}" target="_blank">${file.split("/").pop()}</a>`).join("<br>");
    }

    modal.style.display = "block";
  });
});

// add a new card:-


document.getElementById("addForm").addEventListener("submit", (e) => {
  

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const date = new Date().toLocaleDateString();
  const description = document.querySelector('input[placeholder="Short description"]').value;

  // Get banner image if uploaded
  const bannerInput = document.getElementById("bannerFile");
  let imageSrc = "images/default.jpg";
  if (bannerInput.files && bannerInput.files[0]) {
    imageSrc = URL.createObjectURL(bannerInput.files[0]);
  }

  // Get attached file if uploaded
  const fileInput = document.getElementById("fileUpload");
  let attachedFiles = [];
  if (fileInput.files && fileInput.files.length > 0) {
    attachedFiles = Array.from(fileInput.files).map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
  }

  // Create new card element
  const newCard = document.createElement("article");
  newCard.className = "card";
  newCard.dataset.files = attachedFiles.map(f => f.url).join(",");

  newCard.innerHTML = `
    <div class="card-image">
      <img src="${imageSrc}" alt="Card Image" class="card-img">
      <span class="card-badge">App Name</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${title}</h3>
      <p class="card-excerpt">${description}</p>
      <div class="card-meta">
        <div class="author">
              const authorPhotoInput = document.getElementById("authorPhoto");
            let authorPhotoSrc = "images/default-avatar.png";
            if (authorPhotoInput.files && authorPhotoInput.files[0]) {
              authorPhotoSrc = URL.createObjectURL(authorPhotoInput.files[0]);
            } 

          <div class="author-info">
            <div class="author-name">${author}</div>
            <div class="date">${date}</div>
          </div>
        </div>
        <div class="goto">›</div>
      </div>
    </div>
  `;

  document.getElementById("cardsGrid").appendChild(newCard);

  // Modal click event for new card
  newCard.addEventListener("click", () => {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalMeta.textContent = `${author} — ${date}`;

    // Show attached files if any
    const filesContainer = document.querySelector(".modal-files");
    filesContainer.innerHTML = "";
    if (attachedFiles.length > 0) {
      filesContainer.innerHTML = "<h4>Attached files:</h4>" +
        attachedFiles.map(f => `<a href="${f.url}" target="_blank">${f.name}</a>`).join("<br>");
    }

    modal.style.display = "block";
  });

  // Switch back to page 1
  page2.classList.add("hidden");
  page1.classList.remove("hidden");
  window.scrollTo(0,0);

  // Reset form and clear file inputs
  e.target.reset();
  bannerInput.value = "";
  fileInput.value = "";
});

// Hide all pages function
function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
}

/*function showPage(pageId) {
    hideAllPages();
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        window.scrollTo(0, 0);

        // Reattach page-specific events
        if (pageId === 'page1') {
            attachHomePageEvents();
        } else if (pageId === 'page3') {
            attachAppsPageEvents();
        }
    }
}
*/
function attachHomePageEvents() {
    const addBtn1 = document.getElementById('addBtn');
    if (addBtn1) {
        addBtn1.onclick = null; // remove old click
        addBtn1.addEventListener('click', () => {
            console.log("Home page add button clicked");
            // Your Page 1 Add button logic here
        });
    }
}

function attachAppsPageEvents() {
    const addBtn3 = document.getElementById('addBtnPage3');
    if (addBtn3) {
        addBtn3.onclick = null; // remove old click
        addBtn3.addEventListener('click', () => {
            console.log("Apps page add button clicked");
            // Your Page 3 Add button logic here
        });
    }
}

// Attach navigation clicks after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const homeLinks = document.querySelectorAll('.home-link');
    const appsLinks = document.querySelectorAll('.apps-link');

    homeLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showPage('page1');
        });
    });

    appsLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showPage('page3');
        });
    });
});


function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        window.scrollTo(0, 0);

        // Re-attach page-specific events
        if (pageId === 'page1') {
    const addBtn1 = document.getElementById('addBtn');
    if (addBtn1) {
        addBtn1.onclick = null; // clear previous
        addBtn1.addEventListener('click', () => {
            page1.classList.add('hidden');
            page2.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }
}
        if (pageId === 'page3') {
            const addBtn3 = document.getElementById('addBtnPage3');
            if (addBtn3) {
                addBtn3.onclick = () => {
                    console.log("Apps page add button clicked");
                };
            }
        }
    }
}


// Page 3 App Details modal
const appDetailsModal = document.getElementById("appDetailsModal");
const appDetailsClose = document.querySelector(".app-details-close");

document.querySelectorAll("#page3 .list-card").forEach(card => {
  card.addEventListener("click", () => {
    appDetailsModal.querySelector(".app-image").src = card.dataset.img || "";
    appDetailsModal.querySelector(".app-name").innerText = card.dataset.name || "";
    appDetailsModal.querySelector(".app-url").innerText = card.dataset.url || "";
    appDetailsModal.querySelector(".app-url").href = card.dataset.url || "#";
    appDetailsModal.querySelector(".app-port span").innerText = card.dataset.port || "";
    appDetailsModal.querySelector(".app-last-update span").innerText = card.dataset.lastupdate || "";
    appDetailsModal.querySelector(".app-username").innerText = card.dataset.username || "";
    appDetailsModal.querySelector(".app-password").innerText = card.dataset.password || "";
    appDetailsModal.querySelector(".app-teams").innerText = card.dataset.teams || "";
    appDetailsModal.querySelector(".app-vendor-name").innerText = card.dataset.vendorname || "";
    appDetailsModal.querySelector(".app-vendor-phone").innerText = card.dataset.vendorphone || "";
    appDetailsModal.querySelector(".app-vendor-mail").innerText = card.dataset.vendormail || "";
    appDetailsModal.querySelector(".db-name").innerText = card.dataset.dbname || "";
    appDetailsModal.querySelector(".db-ip").innerText = card.dataset.dbip || "";
    appDetailsModal.querySelector(".db-size").innerText = card.dataset.dbsize || "";
    appDetailsModal.querySelector(".db-type").innerText = card.dataset.dbtype || "";

    const statusEl = appDetailsModal.querySelector(".db-status");
    statusEl.innerText = card.dataset.dbstatus || "";
    statusEl.className = "db-status status-badge " + (card.dataset.dbstatus?.toLowerCase() || "");

    appDetailsModal.style.display = "block";
  });
});

appDetailsClose.addEventListener("click", () => {
  appDetailsModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === appDetailsModal) {
    appDetailsModal.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const filterToggle = document.getElementById('filterToggle');
  const filterPanel = document.getElementById('filterPanel');
  const filterName = document.getElementById('filterName');
  const filterAuthor = document.getElementById('filterAuthor');
  const filterStartDate = document.getElementById('filterStartDate');
  const filterEndDate = document.getElementById('filterEndDate');
  const resetFilters = document.getElementById('resetFilters');

  // ✅ 1. Extract info from the card WITHOUT changing HTML
  cards.forEach(card => {
    const appName = card.querySelector('.card-badge')?.textContent.trim() || '';
    const author = card.querySelector('.author-name')?.textContent.trim() || '';
    const dateText = card.querySelector('.date')?.textContent.trim() || '';

    let dateValue = '';
    if (dateText) {
      const parsedDate = new Date(dateText);
      if (!isNaN(parsedDate)) {
        dateValue = parsedDate.toISOString().split('T')[0];
      }
    }

    // Store values as data attributes for filtering
    card.dataset.name = appName;
    card.dataset.author = author;
    card.dataset.date = dateValue;
  });

  // ✅ 2. Toggle filter dropdown
  filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('show');
  });

  // ✅ 3. Apply filters
  function applyFilters() {
    const selectedName = filterName.value;
    const selectedAuthor = filterAuthor.value;
    const startDate = filterStartDate.value;
    const endDate = filterEndDate.value;

    cards.forEach(card => {
      const matchesName = !selectedName || card.dataset.name === selectedName;
      const matchesAuthor = !selectedAuthor || card.dataset.author === selectedAuthor;
      const matchesDate =
        (!startDate && !endDate) ||
        (!startDate || card.dataset.date >= startDate) &&
        (!endDate || card.dataset.date <= endDate);

      card.style.display = (matchesName && matchesAuthor && matchesDate) ? '' : 'none';
    });
  }

  // ✅ 4. Reset filters
  resetFilters.addEventListener('click', () => {
    filterName.value = '';
    filterAuthor.value = '';
    filterStartDate.value = '';
    filterEndDate.value = '';
    applyFilters();
  });

  // ✅ 5. Filter instantly on change
  filterName.addEventListener('change', applyFilters);
  filterAuthor.addEventListener('change', applyFilters);
  filterStartDate.addEventListener('change', applyFilters);
  filterEndDate.addEventListener('change', applyFilters);
});