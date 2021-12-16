const imageDivTitleSelector = 'a.Link--primary';
const richDiffSelector = 'button[aria-label="Display the rich diff"]';

function getAllImageDivs() {
  const imageDivs = [];
  const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
  const imageTitleDivs = [...document.querySelectorAll(imageDivTitleSelector)];
  imageTitleDivs.map((elem) => {
    const elemTitle = elem.getAttribute('title');
    if (typeof elemTitle === 'string' && imageReg.test(elemTitle)) {
      try {
        imageDivs.push(elem.parentElement.parentElement);
      } catch (error) {
        console.log(error);
      }
    }
  });
  return imageDivs;
}

function clickDiff(imageDiv) {
  try {
    const diffButton = imageDiv.querySelector(richDiffSelector);
    diffButton.click();
  } catch (error) {
    console.log(error);
  }
}

function clickAllDiff() {
  // Wait a second for all dom to load
  // This is a pretty bad way to do this
  // However I cant simply use a onLoad event listener
  // Because the event isn't called probably because it is
  // loaded in a similar way to react-router-dom (the page does not refresh)
  setTimeout(() => {
    const imageDivs = getAllImageDivs();
    imageDivs.forEach(clickDiff);
  }, 1000);
}

console.log("Running");
clickAllDiff();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === 'TAB_CHANGED') {
    if (request.url && request.url.endsWith('files')) {
      clickAllDiff();
    }
  }
});
