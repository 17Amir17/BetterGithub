const imageDivTitleSelector = 'a.Link--primary';
const richDiffSelector = 'button[aria-label="Display the rich diff"]';
const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
const filesChangedSelector = '.tabnav-tab'

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
  listenForTabChange(1000);
  const imageDivs = await getAllImageDivs();
  imageDivs.forEach(clickDiff);
}

function listenForTabChange(delay){
  setTimeout(() => {
    const tabs = document.querySelectorAll(filesChangedSelector);
    if(tabs && tabs.length >= 4){
      tabs[3].addEventListener('click', () => {
        clickAllDiff();
        // listenForTabChange(1000);
      })
    }
  }, delay)
}

let clicked = 0;
function listenForInnerTabChange(url){
  setInterval(() => {
    if(!onFilesPage(window.location.href)){
      clicked = 0;
    }else{
      if(clicked === 0){
        clickAllDiff();
        clicked++;
      }
    }
  }, 1000);
}

function onFilesPage(url){
  let lastPath =  url.split('/');
  lastPath = lastPath[lastPath.length-1].substr(0, 5);
  return lastPath === 'files';
}

if(onFilesPage(window.location.href)){
  listenForInnerTabChange(window.location.href);
  clickAllDiff();
  clicked++;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === 'TAB_CHANGED' && clicked === 0) {
    if (request.url) {
      if(onFilesPage(request.url)){
        clickAllDiff();
        clicked++;
      }
    }
  }
});
