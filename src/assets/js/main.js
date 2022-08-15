import '../styles/main.scss';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SUCCESS_MSG = "Congrats, you've been added to the list !";
const INVALID_EMAIL_MSG = "Whooops, make sure it's a valid email";

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const contactContent = document.querySelector('.contact-content');
const contactForm = document.querySelector('.contact-form');
const emailInput = document.querySelector('#email-input');
const errorWrapper = document.querySelector('.error-wrapper');

const navToggleButton = document.querySelector('.nav-toggle-button');
const menuIcon = document.querySelector('.nav-toggle-button > svg');
const navParent = document.querySelector('.nav');
const menuList = document.querySelector('#main-nav');
const navLinks = document.querySelectorAll('.nav a');

const menuIconSvgPath = `<path stroke-linecap="round"  stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />`;
const closeIconSvgPath = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`;

const getActiveTabIndex = (tabButtons) => {
  return Array.from(tabButtons).findIndex((tabButton) =>
    tabButton.classList.contains('active')
  );
};

const hideActiveTab = (activeTabInd) => {
  tabContents[activeTabInd].classList.add('hidden');
  tabButtons[activeTabInd].classList.remove('active');
};

const setTabActive = (ind) => {
  tabContents[ind].classList.remove('hidden');
  tabButtons[ind].classList.add('active');
};

tabButtons.forEach((button, ind) => {
  button.addEventListener('click', (e) => {
    const activeTabInd = getActiveTabIndex(tabButtons);
    hideActiveTab(activeTabInd);
    setTabActive(ind);
  });
});

function createSuccesMsgElement() {
  const textElement = document.createElement('p');
  textElement.classList.add('successful-msg');
  textElement.setAttribute('tabindex', '-1');
  textElement.innerText = SUCCESS_MSG;
  return textElement;
}

function createErrorMsgElement() {
  const textElement = document.createElement('span');
  textElement.classList.add('error-msg');
  textElement.innerText = INVALID_EMAIL_MSG;
  return textElement;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const email = emailInput.value;
  const isEmailValid = email.match(EMAIL_REGEX);
  if (!isEmailValid) {
    errorWrapper.innerHTML = '';
    const errorMsgElement = createErrorMsgElement();
    errorWrapper.appendChild(errorMsgElement);
    contactForm.classList.add('invalid-input');
    emailInput.focus();
  } else {
    contactForm.remove();
    const messageElement = createSuccesMsgElement();
    contactContent.appendChild(messageElement);
    messageElement.focus();
  }
}

contactForm.addEventListener('submit', handleFormSubmit);

const isNavOpen = () => menuList.classList.contains('open');

function handleNavToggle() {
  const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    navToggleButton.setAttribute('aria-expanded', false);
    menuIcon.innerHTML = menuIconSvgPath;
  } else {
    navToggleButton.setAttribute('aria-expanded', true);
    menuIcon.innerHTML = closeIconSvgPath;
  }
  navParent.classList.toggle('open');
  menuList.classList.toggle('open');
  document.body.classList.toggle('overflow-hidden');
}

navToggleButton.addEventListener('click', handleNavToggle);

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    if (isNavOpen()) {
      handleNavToggle();
    }
  });
});
