const imageDivTitleSelector = 'a.Link--primary';
const richDiffSelector = 'button[aria-label="Display the rich diff"]';
const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

async function getAllImageDivs() {
  // Get all divs with image in title
  const imageDivs = [];
  const imageTitleDivs = await selectImageDivTitle();
  imageTitleDivs.map((elem) => {
    const elemTitle = elem.getAttribute('title');
    // Validate title
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

const select = () => {
  // Select all image titles after 100ms
  return new Promise((res) => {
    setTimeout(() => {
      //Select all title dive
      let imageTitleDivs = [
        ...document.querySelectorAll(imageDivTitleSelector),
      ];
      // Filter out non image titles
      imageTitleDivs = imageTitleDivs.filter((div) =>
        imageReg.test(div.innerText)
      );
      res(imageTitleDivs);
    }, 100);
  });
};


async function selectImageDivTitle() {
  // Github loades the images after the page is loaded so I gather them
  // Between a minimum amount of tries and a maximum timeout
  const timeout = 10;
  const minimun = 5;
  let current = 1;
  while (current < timeout || current < minimun) {
    const imgTitleDiv = await select();
    if (imgTitleDiv.length !== 0) {
      if (current > minimun) return imgTitleDiv;
    }
    current++;
  }
  return [];
}

function clickDiff(imageDiv) {
  //Click the diff button
  try {
    const diffButton = imageDiv.querySelector(richDiffSelector);
    diffButton.click();
  } catch (error) {
    console.log(error);
  }
}

async function clickAllDiff() {
  const imageDivs = await getAllImageDivs();
  imageDivs.forEach(clickDiff);
}

clickAllDiff();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === 'TAB_CHANGED') {
    if (request.url && request.url.endsWith('files')) {
      clickAllDiff();
    }
  }
});
