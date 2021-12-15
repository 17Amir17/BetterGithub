const imageDivTitleSelector = 'a.Link--primary';
const viewModesSelector = '.js-view-modes';
const viewMode = document.querySelector(viewModesSelector);

function createDiffHtml() {
  const elem = document.createElement('li');
  elem.setAttribute('data-mode', 'difference');
  elem.setAttribute('class', 'js-view-mode-item');
  elem.addEventListener('click', onDiffClick);
  elem.innerText = 'Difference';
  return elem;
}

function onDiffClick(e) {
  console.log('!!');
  const siblings = [...viewMode.querySelectorAll('li')];
  siblings.forEach((sibling) => {
    sibling.classList.remove('active');
  });
  e.target.classList.add('active');
}

function injectDifference() {
  const diffElem = createDiffHtml();
  viewMode.appendChild(diffElem);
}

console.log('Running');
injectDifference();
