// Data for the classes with their IDs, titles, and logo paths
const classesData = [
  { id: "physics1", title: "Physics 1", logo: "assets/icons/phys1logo.svg" },
  { id: "ap-physics1", title: "AP Physics 1", logo: "assets/icons/ap1logo.svg" },
  { id: "ap-physics2", title: "AP Physics 2", logo: "assets/icons/ap2logo.svg" },
  { id: "ap-physics-c-mech", title: "AP Physics C: Mechanics", logo: "assets/icons/mechlogo.svg" },
  { id: "ap-physics-c-em", title: "AP Physics C: E&M", logo: "assets/icons/enmlogo.svg" }
];

// Resource names and their icons
const resources = [
  { name: "Investigation", icon: "📝" },
  { name: "Notes", icon: "📒" },
  { name: "Reading", icon: "📚" },
  { name: "PowerPoint", icon: "📊" },
  { name: "Video", icon: "🎬" },
  { name: "Concept Builders", icon: "🧠" },
  { name: "Problem Set", icon: "⚙️" },
  { name: "FRQ Practice", icon: "📝" },
  { name: "Simulator", icon: "🔬" },
  { name: "Practice Test", icon: "🧪" }
];

// Constants for structure counts
const TOTAL_UNITS = 12;
const TOTAL_LESSONS = 5;

// Helper function to create a resource item (assignment)
function createResourceItem(classId, unitNum, lessonNum, resource) {
  const li = document.createElement("li");
  li.className = "resource-item";
  
  const link = document.createElement("a");
  // Generate a URL based on parameters (dummy URL for example)
  link.href = `https://example.com/${classId}/unit${unitNum}/lesson${lessonNum}/${resource.name.replace(/\s+/g, "-").toLowerCase()}`;
  link.target = "_blank";

  const iconDiv = document.createElement("div");
  iconDiv.className = "resource-icon";
  iconDiv.textContent = resource.icon;
  
  link.appendChild(iconDiv);
  link.appendChild(document.createTextNode(" " + resource.name));
  li.appendChild(link);
  return li;
}

// Helper function to create a lesson item
function createLesson(classId, unitNum, lessonNum) {
  const lessonLi = document.createElement("li");
  lessonLi.className = "lesson-item";
  
  const lessonHeader = document.createElement("div");
  lessonHeader.className = "lesson-header";
  lessonHeader.textContent = `Lesson ${lessonNum}`;
  
  const arrowDiv = document.createElement("div");
  arrowDiv.className = "arrow";
  arrowDiv.textContent = "▼";
  lessonHeader.appendChild(arrowDiv);
  
  const lessonContent = document.createElement("div");
  lessonContent.className = "lesson-content";
  
  const resUl = document.createElement("ul");
  resUl.className = "resources-list";
  resources.forEach(resource => {
    resUl.appendChild(createResourceItem(classId, unitNum, lessonNum, resource));
  });
  
  lessonContent.appendChild(resUl);
  lessonLi.appendChild(lessonHeader);
  lessonLi.appendChild(lessonContent);
  
  return lessonLi;
}

// Helper function to create a unit item
function createUnit(classId, unitNum) {
  const unitLi = document.createElement("li");
  unitLi.className = "unit-item";
  
  const unitHeader = document.createElement("div");
  unitHeader.className = "unit-header";
  unitHeader.textContent = `Unit ${unitNum}`;
  
  const arrowDiv = document.createElement("div");
  arrowDiv.className = "arrow";
  arrowDiv.textContent = "▼";
  unitHeader.appendChild(arrowDiv);
  
  const unitContent = document.createElement("div");
  unitContent.className = "unit-content";
  
  const lessonsUl = document.createElement("ul");
  for (let lessonNum = 1; lessonNum <= TOTAL_LESSONS; lessonNum++) {
    lessonsUl.appendChild(createLesson(classId, unitNum, lessonNum));
  }
  
  unitContent.appendChild(lessonsUl);
  unitLi.appendChild(unitHeader);
  unitLi.appendChild(unitContent);
  return unitLi;
}

// Helper function to create a class card
function createClassCard(classData) {
  const cardDiv = document.createElement("div");
  cardDiv.className = `class-card ${classData.id}`;
  
  const headerDiv = document.createElement("div");
  headerDiv.className = "class-header";
  
  const img = document.createElement("img");
  img.src = classData.logo;
  img.alt = "Physics Icon";
  
  headerDiv.appendChild(img);
  headerDiv.appendChild(document.createTextNode(classData.title));
  
  const arrowDiv = document.createElement("div");
  arrowDiv.className = "arrow";
  arrowDiv.textContent = "▼";
  headerDiv.appendChild(arrowDiv);
  
  const classContent = document.createElement("div");
  classContent.className = "class-content";
  
  const unitsUl = document.createElement("ul");
  unitsUl.className = "units-list";
  for (let unitNum = 1; unitNum <= TOTAL_UNITS; unitNum++) {
    unitsUl.appendChild(createUnit(classData.id, unitNum));
  }
  
  classContent.appendChild(unitsUl);
  cardDiv.appendChild(headerDiv);
  cardDiv.appendChild(classContent);
  return cardDiv;
}

// Generate the full structure and add to the page
function generateStructure() {
  const container = document.getElementById("classes-container");
  classesData.forEach(classData => {
    const card = createClassCard(classData);
    container.appendChild(card);
  });
}

// Add toggle functionality for the three levels
function addToggleListeners() {
  // Toggle Class Card: clicking a class header shows/hides its units
  document.querySelectorAll('.class-header').forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', () => {
      const parentCard = header.parentElement;
      
      // Collapse other classes
      document.querySelectorAll('.class-card').forEach(card => {
        if (card !== parentCard) {
          card.classList.remove('active');
          card.querySelector('.class-header').setAttribute('aria-expanded', 'false');
        }
      });

      parentCard.classList.toggle('active');
      const expanded = parentCard.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
    });

    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Toggle Units: clicking a unit header shows/hides its lessons
  document.querySelectorAll('.unit-header').forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', e => {
      e.stopPropagation();
      const unitItem = header.parentElement;
      
      // Collapse other units within the same class
      const unitsList = unitItem.parentElement;
      unitsList.querySelectorAll('.unit-item').forEach(item => {
        if (item !== unitItem) {
          item.classList.remove('active');
          item.querySelector('.unit-header').setAttribute('aria-expanded', 'false');
        }
      });

      unitItem.classList.toggle('active');
      const expanded = unitItem.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
    });

    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Toggle Lessons: clicking a lesson header shows/hides its assignments
  document.querySelectorAll('.lesson-header').forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', e => {
      e.stopPropagation();
      const lessonItem = header.parentElement;
      
      // Collapse other lessons within the same unit
      const lessonsList = lessonItem.parentElement;
      lessonsList.querySelectorAll('.lesson-item').forEach(item => {
        if (item !== lessonItem) {
          item.classList.remove('active');
          const h = item.querySelector('.lesson-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        }
      });

      lessonItem.classList.toggle('active');
      const expanded = lessonItem.classList.contains('active');
      header.setAttribute('aria-expanded', expanded);
    });

    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

// Run after the document is ready
document.addEventListener("DOMContentLoaded", () => {
  generateStructure();
  addToggleListeners();
});
