const imageDivTitleSelector = 'a.Link--primary';
const viewModesSelector = '.js-view-modes';
const dataViewElemSelector = 'div[data-type="diff"]';
const dataViewElem = document.querySelector(dataViewElemSelector);
const diffViewElem = createDiffView();
const diffLiElem = createDiffHtml();
const viewMode = document.querySelector(viewModesSelector);

function createDiffHtml() {
  const elem = document.createElement('li');
  elem.setAttribute('data-mode', 'difference');
  elem.setAttribute('class', 'js-view-mode-item');
  elem.addEventListener('click', onDiffClick);
  elem.innerText = 'Difference';
  return elem;
}

function createDiffView() {
  const elem = dataViewElem.querySelector('.swipe').cloneNode();
  elem.setAttribute('class', 'difference view');
  elem.innerText = 'DIFF ELEM';
  return elem;
}

function deactivate(elements) {
  elements.forEach((sibling) => {
    sibling.classList.remove('active');
  });
}

function hideAll(elements) {
  elements.forEach((elem) => (elem.style.display = 'none'));
}

function onDiffClick(e) {
  // Deactivate all other ticks
  deactivate([...viewMode.querySelectorAll('li')]);
  e.target.classList.add('active');
  // Hide all views
  hideAll([...document.querySelectorAll('.view')]);
  //Show diff view
  diffViewElem.hidden = false;
}

function injectDifference() {
  viewMode.appendChild(diffLiElem);
  //   console.log(createDiffView());
  dataViewElem.appendChild(diffViewElem);
}

console.log('Running');
injectDifference();
