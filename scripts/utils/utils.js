import constants from 'constants.json';

function getAllImageDivs() {
  const imageDivs = [];
  document.querySelectorAll(constants.imageDivTitleSelector).map((elem) => {
    const elemTitle = elem.getAttribute('title');
    if (
      typeof elemTitle === 'string' &&
      elemTitle.endsWith(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)
    ) {
      imageDivs.push(elem.parent.parent);
    }
  });
  return imageDivs;
}

export { getAllImageDivs };
