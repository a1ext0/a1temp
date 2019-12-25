//Шаблонная система a1ext0. Работает с помощью фигурных скобок + ключ обьекта (например "{name}"). HTML код внутри тега будет заменён на строку ключа объекта. Если дать не обьект, а массив, то вернет фрагмент всех его элементов.

export function a1temp(opt) {
  //temp - шаблон, obj - объект для шаблона
  let temp = new DocumentFragment();
  temp.append(document.querySelector(opt.temp).content.cloneNode(true));
  let s = {};
  let y = {};
  findText.call(s, temp);
  for (let i = 0; i < temp.children.length; i++) {
    findTag.call(y, temp.children[i]);
  }
  let ii = 0;
  if (Array.isArray(opt.obj)) {
    let fragment = new DocumentFragment();
    let temp2 = new DocumentFragment();
    temp2.append(temp.cloneNode(true));
    let s2 = {};
    let y2 = {};
    findText.call(s2, temp2);
    for (let i = 0; i < temp2.children.length; i++) {
      findTag.call(y2, temp2.children[i]);
    }
    let mass = [];
    for (let i of opt.obj) {
      for (let key in i) {
        if (s[key]) {
          for (let node of s[key]) {
            let regexp = new RegExp(`{${key}?}`, 'g');
            let node2 = s2[key][s[key].indexOf(node)];
            let val = node.nodeValue.replace(regexp, i[key]);
            node2.nodeValue = val;
            ii++;
            //drawText(node, key, i[key]);
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
  let regexp = new RegExp(`{.+?}`);
  if (element.nodeType == Node.TEXT_NODE && regexp.test(element.nodeValue)) {
    let name = element.nodeValue.match(/\{.+?\}/g)[0].replace(/\{?\}?/g, '');
    if (!this[name]) {
      this[name] = [];
    }
    this[name].push(element);
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
