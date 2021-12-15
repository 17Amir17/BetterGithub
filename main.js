const imageDivTitleSelector = 'a.Link--primary';

function getAllImageDivs() {
  const imageDivs = [];
  const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
  const imageTitleDivs = [...document.querySelectorAll(imageDivTitleSelector)];
  console.log(imageTitleDivs);
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
    const diffButton = imageDiv.querySelectorAll('button')[2];
    diffButton.click();
  } catch (error) {
    console.log(error);
  }
}

function clickAllDiff() {
  setTimeout(() => {
    const imageDivs = getAllImageDivs();
    imageDivs.forEach(clickDiff);
  }, 1000);
}

clickAllDiff();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === 'TAB_CHANGED') {
    console.log(request.url.includes('files'));
    if (request.url && request.url.endsWith('files')) {
      console.log('Clicking!');
      clickAllDiff();
    }
  }
});
