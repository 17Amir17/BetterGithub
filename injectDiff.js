(function(e,t){var n=this;if(typeof module!="undefined"){var r;try{Canvas=require("canvas")}catch(i){}module.exports=t(n,e,Canvas)}else typeof define=="function"&&typeof define.amd=="object"?define(t(n,e)):n[e]=t(n,e)})("imagediff",function(t,n,r){function v(n,i){var s;if(r)s=r.createCanvas(n,i);else{if(!t.document||!t.document.createElement)throw new Error(e.message+"\n"+"Please see https://github.com/HumbleSoftware/js-imagediff#cannot-find-module-canvas\n");s=document.createElement("canvas"),n&&(s.width=n),i&&(s.height=i)}return s}function m(e,t){return l.width=e,l.height=t,c.clearRect(0,0,e,t),c.createImageData(e,t)}function g(){return r}function y(e){return x(e,u)}function b(e){return x(e,s)}function w(e){return x(e,o)}function E(e){return!!e&&!!x(e,a)&&typeof e.width!==f&&typeof e.height!==f&&typeof e.data!==f}function S(e){return y(e)||b(e)||w(e)||E(e)}function x(e,t){return typeof e=="object"&&!!Object.prototype.toString.apply(e).match(t)}function T(e){var t=e.height,n=e.width,r=e.data,i,s,o;l.width=n,l.height=t,i=c.getImageData(0,0,n,t),s=i.data;for(o=e.data.length;o--;)s[o]=r[o];return i}function N(e){if(y(e))return C(e);if(b(e))return k(e);if(w(e))return L(e);if(E(e))return e}function C(e){var t=e.height,n=e.width;return l.width=n,l.height=t,c.clearRect(0,0,n,t),c.drawImage(e,0,0),c.getImageData(0,0,n,t)}function k(e){var t=e.height,n=e.width,r=e.getContext("2d");return r.getImageData(0,0,n,t)}function L(e){var t=e.canvas,n=t.height,r=t.width;return e.getImageData(0,0,r,n)}function A(e){var t=N(e),n=v(t.width,t.height),r=n.getContext("2d");return r.putImageData(t,0,0),n}function O(e,t){return e.width===t.width}function M(e,t){return e.height===t.height}function _(e,t){return M(e,t)&&O(e,t)}function D(e,t,n){var r=e.data,i=t.data,s=r.length,o;n=n||0;if(!_(e,t))return!1;for(o=s;o--;)if(r[o]!==i[o]&&Math.abs(r[o]-i[o])>n)return!1;return!0}function P(e,t,n){return(_(e,t)?H:B)(e,t,n)}function H(e,t,n){var r=e.height,i=e.width,s=m(i,r),o=e.data,u=t.data,a=s.data,f=a.length,l,c,h,p,d,v;for(h=0;h<f;h+=4)a[h]=Math.abs(o[h]-u[h]),a[h+1]=Math.abs(o[h+1]-u[h+1]),a[h+2]=Math.abs(o[h+2]-u[h+2]),a[h+3]=Math.abs(255-Math.abs(o[h+3]-u[h+3]));return s}function B(e,t,n){function b(e){f==="top"?(l=0,c=0):(l=Math.floor((r-e.height)/2),c=Math.floor((i-e.width)/2))}var r=Math.max(e.height,t.height),i=Math.max(e.width,t.width),s=m(i,r),o=e.data,u=t.data,a=s.data,f=n&&n.align,l,c,h,p,d,v,g,y;for(d=a.length-1;d>0;d-=4)a[d]=255;b(e);for(h=e.height;h--;)for(p=e.width;p--;)d=4*((h+l)*i+(p+c)),v=4*(h*e.width+p),a[d+0]=o[v+0],a[d+1]=o[v+1],a[d+2]=o[v+2];b(t);for(h=t.height;h--;)for(p=t.width;p--;)d=4*((h+l)*i+(p+c)),v=4*(h*t.width+p),a[d+0]=Math.abs(a[d+0]-u[v+0]),a[d+1]=Math.abs(a[d+1]-u[v+1]),a[d+2]=Math.abs(a[d+2]-u[v+2]);return s}function j(){var e;for(e=0;e<arguments.length;e++)if(!S(arguments[e]))throw{name:"ImageTypeError",message:"Submitted object was not an image."}}function F(e,t){return e=document.createElement(e),e&&t&&(e.innerHTML=t),e}function I(e,t){return typeof document!="undefined"?q(e,t):R(e,t)}function q(e,t){var n=F("div","<span>Expected to be equal."),r=F("div","<div>Actual:</div>"),i=F("div","<div>Expected:</div>"),s=F("div","<div>Diff:</div>"),o=p.diff(e,t),u=v(),a;return u.height=o.height,u.width=o.width,n.style.overflow="hidden",r.style.float="left",i.style.float="left",s.style.float="left",a=u.getContext("2d"),a.putImageData(o,0,0),r.appendChild(A(e)),i.appendChild(A(t)),s.appendChild(u),n.appendChild(r),n.appendChild(i),n.appendChild(s),n.innerHTML}function R(e,t){return"Expected to be equal."}function U(e,t,n){var r=A(e),i,s;n=n||Function,i=r.toDataURL().replace(/^data:image\/\w+;base64,/,""),s=Buffer.from(i,"base64"),require("fs").writeFile(t,s,n)}var i=/\[object Array\]/i,s=/\[object (Canvas|HTMLCanvasElement)\]/i,o=/\[object CanvasRenderingContext2D\]/i,u=/\[object (Image|HTMLImageElement)\]/i,a=/\[object ImageData\]/i,f="undefined",l=v(),c=l.getContext("2d"),h=t[n],p,d;return d={toBeImageData:function(){return{compare:function(e,t){var n=p.isImageData(e);return{pass:n,message:n?"Is ImageData":"Is not ImageData"}}}},toImageDiffEqual:function(){return{compare:function(e,t,n){var r=p.equal(e,t,n);return{pass:r,message:r?"Expected not to be equal.":I(e,t)}}}}},p={createCanvas:v,createImageData:m,getCanvasRef:g,isImage:y,isCanvas:b,isContext:w,isImageData:E,isImageType:S,toImageData:function(e){return j(e),E(e)?T(e):N(e)},equal:function(e,t,n){return j(e,t),e=N(e),t=N(t),D(e,t,n)},diff:function(e,t,n){return j(e,t),e=N(e),t=N(t),P(e,t,n)},jasmine:d,noConflict:function(){return t[n]=h,p}},typeof module!="undefined"&&(p.imageDataToPNG=U),p})

try {
  const viewModesSelector = '.js-view-modes';
  const dataViewElemSelector = 'div[data-type="diff"]';
  const dataViewElem = document.querySelector(dataViewElemSelector);
  const defaultDisplayStyle = dataViewElem.querySelector('.swipe').style;
  const viewMode = document.querySelector(viewModesSelector);
  let diffViewElem;
  let diffLiElem;

  function createDiffHtml() {
    const elem = document.createElement('li');
    elem.setAttribute('data-mode', 'difference');
    elem.setAttribute('class', 'js-view-mode-item');
    elem.addEventListener('click', onDiffClick);
    elem.innerText = 'Difference';
    return elem;
  }

  function getImages() {
    const image1 = dataViewElem.querySelectorAll('img')[0].cloneNode();
    const image2 = dataViewElem.querySelectorAll('img')[1].cloneNode();
    image1.setAttribute('crossOrigin', '');
    image2.setAttribute('crossOrigin', '');
    image1.style = '';
    image2.style = '';
    return { image1, image2 };
  }

  function resizeTo(canvas, pct) {
    const tempCanvas = document.createElement('canvas');
    const tctx = tempCanvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    tempCanvas.width = cw;
    tempCanvas.height = ch;
    tctx.drawImage(canvas, 0, 0);
    canvas.width *= pct;
    canvas.height *= pct;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(tempCanvas, 0, 0, cw, ch, 0, 0, cw * pct, ch * pct);
  }

  function createDiffView(image1, image2) {
    const elem = dataViewElem.querySelector('.swipe').cloneNode();
    elem.setAttribute('class', 'difference view');
    // Image diff
    const diff = imagediff.diff(image1, image2);
    const canvas = imagediff.createCanvas(diff.width, diff.height);
    const context = canvas.getContext('2d');
    // Draw the generated image with differences on the canvas
    context.putImageData(diff, 0, 0);
    // Now you can do whatever you want with the canvas
    // for example render it inside a div element:
    const resizeBy =
      Number(defaultDisplayStyle.width.split('px')[0]) / diff.width;
    resizeTo(canvas, resizeBy);
    elem.appendChild(canvas);
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
    diffViewElem.style = defaultDisplayStyle;
  }

  function waitForImageData(){
    return new Promise((res) => {
      setTimeout( () => {
        const { image1, image2 } = getImages();
        if(image1.src && image1.src != '' && image2.src && image2.src != ''){
          res();
        }
      } , 100)
    })  
  }

  (async () => {
    await waitForImageData();
    const { image1, image2 } = getImages();

    let iCount = 0;
    function onImageLoad() {
      iCount++;
      if (iCount != 2) return;
      diffViewElem = createDiffView(image1, image2);
      dataViewElem.appendChild(diffViewElem);
    }

    function injectDifference() {
      diffLiElem = createDiffHtml();
      viewMode.appendChild(diffLiElem);
      //This is a very bad way of doing things i know i am lazy
      image1.onload = onImageLoad;
      image2.onload = onImageLoad;
    }

    injectDifference();
  })();
} catch (error) {
  console.log("Inject Diff Error");
}
