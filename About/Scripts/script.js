const birthDate = new Date("2009-04-24"); // AAAA-MM-JJ

const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();
const dayDiff = today.getDate() - birthDate.getDate();

if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
   age--;
}

const options = { day: 'numeric', month: 'long' };
const birthdayFormatted = birthDate.toLocaleDateString('fr-FR', options);

document.getElementById("age").textContent = `${age} ans`;
document.getElementById("age2").textContent = `${age} ans`;
const birthdayElem = document.getElementById("birthday");
birthdayElem.textContent = `${birthdayFormatted}`;

if (
  today.getDate() === birthDate.getDate() &&
  today.getMonth() === birthDate.getMonth()
) {
  birthdayElem.classList.add("glow");
}


const menuItemAbout = document.getElementById("menu-item-about");
const aboutSection = document.getElementById("about-section");

const menuItemSocials = document.getElementById("menu-item-socials");
const socialsSection = document.getElementById("socials-section");

const menuItemPassions = document.getElementById("menu-item-passions");
const passionsSection = document.getElementById("passions-section");

function collapseSection(section) {
  return new Promise((resolve) => {
    if (!section || section.classList.contains('hidden')) {
      resolve();
      return;
    }
    section.style.maxHeight = section.scrollHeight + 'px';
    section.offsetHeight;
    section.classList.add('hidden');
    section.style.maxHeight = '0px';
    const onEnd = (e) => {
      if (e.propertyName === 'max-height') {
        section.removeEventListener('transitionend', onEnd);
        resolve();
      }
    };
    section.addEventListener('transitionend', onEnd);
  });
}

function expandSection(section) {
  return new Promise((resolve) => {
    if (!section || !section.classList.contains('hidden')) {
      resolve();
      return;
    }
    section.classList.remove('hidden');
    section.style.maxHeight = '0px';
    // Force reflow
    section.offsetHeight;
    section.style.maxHeight = section.scrollHeight + 'px';
    const onEnd = (e) => {
      if (e.propertyName === 'max-height') {
        section.removeEventListener('transitionend', onEnd);
        section.style.maxHeight = 'none';
        resolve();
      }
    };
    section.addEventListener('transitionend', onEnd);
  });
}

const allSections = [aboutSection, socialsSection, passionsSection].filter(Boolean);
const allTriggers = [menuItemAbout, menuItemSocials, menuItemPassions].filter(Boolean);

function isOpen(section) {
  return section && !section.classList.contains('hidden');
}

async function toggleOrShow(targetSection, triggerEl) {
  if (!targetSection) return;

  if (isOpen(targetSection)) {
    await collapseSection(targetSection);
    if (triggerEl) triggerEl.setAttribute('aria-expanded', 'false');
    return;
  }

  await Promise.all(allSections.filter(s => s && s !== targetSection).map(s => collapseSection(s)));
  allTriggers.forEach(t => t && t.setAttribute('aria-expanded', 'false'));
  await expandSection(targetSection);
  if (triggerEl) triggerEl.setAttribute('aria-expanded', 'true');
}

if (menuItemAbout && aboutSection) {
  menuItemAbout.setAttribute('aria-controls', 'about-section');
  menuItemAbout.setAttribute('aria-expanded', 'false');
  menuItemAbout.addEventListener('click', () => toggleOrShow(aboutSection, menuItemAbout));
}

if (menuItemSocials && socialsSection) {
  menuItemSocials.setAttribute('aria-controls', 'socials-section');
  menuItemSocials.setAttribute('aria-expanded', 'false');
  menuItemSocials.addEventListener('click', () => toggleOrShow(socialsSection, menuItemSocials));
}

if (menuItemPassions && passionsSection) {
  menuItemPassions.setAttribute('aria-controls', 'passions-section');
  menuItemPassions.setAttribute('aria-expanded', 'false');
  menuItemPassions.addEventListener('click', () => toggleOrShow(passionsSection, menuItemPassions));
}
