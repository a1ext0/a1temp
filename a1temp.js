//Шаблонная система a1ext0. Работает с помощью фигурных скобок + ключ обьекта (например "{name}"). HTML код внутри тега будет заменён на строку ключа объекта. Если дать не обьект, а массив, то вернет фрагмент всех его элементов.

export function a1temp(opt) {
  //temp - шаблон, obj - объект для шаблона
  let temp = new DocumentFragment();
  temp.append(document.querySelector(opt.temp).content.cloneNode(true));
  let s = {text: {},html: {}};
  let y = {};
  findText.call(s, temp);
  for (let i = 0; i < temp.children.length; i++) {
    findTag.call(y, temp.children[i]);
  }
  if (Array.isArray(opt.obj)) {
    let fragment = new DocumentFragment();
    let temp2 = new DocumentFragment();
    temp2.append(temp.cloneNode(true));
    let s2 = {text: {},html: {}};
    let y2 = {};
    findText.call(s2, temp2);
    for (let i = 0; i < temp2.children.length; i++) {
      findTag.call(y2, temp2.children[i]);
    }
    let mass = [];
    for (let i of opt.obj) {
      for (let key in i) {
        if (s.text[key]) {
          for (let node of s.text[key]) {
            let regexp = new RegExp(`{${key}?}`, 'g');
            let node2 = s2.text[key][s.text[key].indexOf(node)];
            let val = node.nodeValue.replace(regexp, i[key]);
            node2.nodeValue = val;
          }
        }
        if (s.html[key]) {
          for (let node of s.html[key]) {
            let regexp = new RegExp(`{=${key}?}`, 'g');
            let node2 = s2.html[key][s.html[key].indexOf(node)];
            let val = node.nodeValue.replace(regexp, i[key]);
            let div = document.createElement('div');
            let div2 = new DocumentFragment();
            div.innerHTML = val;
            for (let k = 0; k < div.childNodes.length; i++) {
              div2.append(div.childNodes[k]);
            }
            console.log(div2);
            node2.nodeValue = '';
            while (node2.nextSibling) {
              node2.nextSibling.remove();
            }
            while (node2.previousSibling) {
              node2.previousSibling.remove();
            }
            node2.parentElement.append(div2);
          }
        }
        if (y[key]) {
          for (let node of y[key]) {
            let node2 = y2[key][y[key].indexOf(node)];
            node2.removeAttribute('a1');
            node2.setAttribute(node.a1name[0], i[key]);
          }
        }
      }
      fragment.append(temp2.cloneNode(true));
    }
    return fragment;
  } else {
    for (let key in opt.obj) {
      if (s[key]) {
        for (let node of s[key]) {
          drawText(node, key, opt.obj[key]);
        }
      }
      if (y[key]) {
        for (let node of y[key]) {
          drawTag(node, key, opt.obj[key]);
        }
      }
    }
    return temp;
  }
}

function drawText(el, key, val) {
  let regexp = new RegExp(`{${key}?}`, 'g');
  el.nodeValue = el.nodeValue.replace(regexp, val);
}

function drawTag(el, key, val) {
  el.removeAttribute('a1');
  el.setAttribute(el.a1name[0], val);
}

function findText(element) {
  if (element.childNodes.length > 0) {
    for (let i = 0; i < element.childNodes.length; i++) {
      findText.call(this, element.childNodes[i]);
    }
  }
  let regexp = new RegExp(`{.+}`);
  let regexp2 = new RegExp(`{=.+}`);
  if (element.nodeType == Node.TEXT_NODE && regexp.test(element.nodeValue)) {
    if (element.nodeValue.match(regexp2)) {
      let name = element.nodeValue.match(/\{=.+\}/g)[0].replace(/\{?=?\}?/g, '');
      if (!this.html[name]) {
        this.html[name] = [];
      }
      this.html[name].push(element);
    } else {
      let name = element.nodeValue.match(/\{.+\}/g)[0].replace(/\{?\}?/g, '');
      if (!this.text[name]) {
        this.text[name] = [];
      }
      this.text[name].push(element);
    }
  }
}
function findTag(element) {
  if (element.children.length > 0) {
    for (let i = 0; i < element.children.length; i++) {
      findTag.call(this, element.children[i]);
    }
  }
  if (element.hasAttribute('a1')) {
    let name = element.getAttribute('a1').split(' ');
    if (!this[name[1]]) {
      this[name[1]] = [];
    }
    element.a1name = name;
    this[name[1]].push(element);
  }
}
