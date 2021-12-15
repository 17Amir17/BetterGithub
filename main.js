const imageDivTitleSelector = 'a.Link--primary';

function getAllImageDivs() {
  const imageDivs = [];
  const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
  [...document.querySelectorAll(imageDivTitleSelector)].map((elem) => {
    const elemTitle = elem.getAttribute('title');
    if (typeof elemTitle === 'string' && imageReg.test(elemTitle)) {
      imageDivs.push(elem.parentElement.parentElement);
    }
  });
  return imageDivs;
}

function clickDiff(imageDiv) {
  const diffButton = imageDiv.querySelectorAll('button')[2];
  diffButton.click();
}

const imageDivs = getAllImageDivs();
imageDivs.forEach(clickDiff);
