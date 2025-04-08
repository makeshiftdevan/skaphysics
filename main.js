document.querySelectorAll('.class-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        card.classList.toggle('active');
    });
});

function createLessonItems(className, unitNum) {
    const lessonItems = [];
    for (let lesson = 1; lesson <= 5; lesson++) {
        const resourceList = document.createElement('ul');
        resourceList.className = 'resources-list';
        const resources = ['Investigations', 'Notes', 'PPT', 'Video', 'Practice Problems', 'Concept Builders', 'Phet'];
        const icons = ['📝','📒','📊','🎬','⚙️','🧠','🔬'];
        resources.forEach((res, i) => {
            const li = document.createElement('li');
            li.className = 'resource-item';
            li.innerHTML = `<div class="resource-icon">${icons[i]}</div>${res}`;
            li.onclick = () => window.location.href = `/${className}/unit${unitNum}/lesson${lesson}/${res.toLowerCase().replace(/ /g, '-')}`;
            resourceList.appendChild(li);
        });
        const unitContent = document.createElement('div');
        unitContent.className = 'unit-content';
        unitContent.appendChild(resourceList);

        const unitHeader = document.createElement('div');
        unitHeader.className = 'unit-header';
        unitHeader.innerHTML = `Lesson ${lesson} <div class="arrow">▼</div>`;
        unitHeader.onclick = () => unitItem.classList.toggle('active');

        const unitItem = document.createElement('li');
        unitItem.className = 'unit-item';
        unitItem.appendChild(unitHeader);
        unitItem.appendChild(unitContent);

        lessonItems.push(unitItem);
    }
    return lessonItems;
}

const classMap = {
    'physics1': 'Physics 1',
    'ap-physics1': 'AP Physics 1',
    'ap-physics2': 'AP Physics 2',
    'ap-physics-c-mech': 'AP Physics C: Mech',
    'ap-physics-c-em': 'AP Physics C: E&M'
};

Object.keys(classMap).forEach(classKey => {
    const classCard = document.querySelector(`.${classKey} .units-list`);
    for (let unit = 1; unit <= 12; unit++) {
        const unitItem = document.createElement('li');
        unitItem.className = 'unit-item';

        const unitHeader = document.createElement('div');
        unitHeader.className = 'unit-header';
        unitHeader.innerHTML = `Unit ${unit}: Topic <div class="arrow">▼</div>`;
        unitHeader.onclick = () => unitItem.classList.toggle('active');

        const unitContent = document.createElement('div');
        unitContent.className = 'unit-content';

        const lessonList = document.createElement('ul');
        lessonList.className = 'resources-list';

        createLessonItems(classKey, unit).forEach(lesson => lessonList.appendChild(lesson));

        unitContent.appendChild(lessonList);
        unitItem.appendChild(unitHeader);
        unitItem.appendChild(unitContent);
        classCard.appendChild(unitItem);
    }
});
