//Шаблонная система a1ext0. Работает с помощью фигурных скобок + ключ обьекта (например "{name}"). HTML код внутри тега будет заменён на строку ключа объекта. Если дать не обьект, а массив, то вернет фрагмент всех его элементов.

export function a1temp(opt) {
  //temp - шаблон, obj - объект для шаблона
  let temp = document.createElement('div');
  temp.append(document.querySelector(opt.temp).content.cloneNode(true));
  if (Array.isArray(opt.obj)) {
    let fragment = new DocumentFragment();
    for (let i of opt.obj) {
      for (let key in i) {
        try {
          finder(temp, key, i[key]);
          //finder(temp, key);
        } catch (e) {
          continue;
        }
      }
      fragment.append(temp.cloneNode(true));
    }
    return fragment;
  } else {
    for (let key in opt.obj) {
      try {
        finder(temp, key, opt.obj[key]);
        //finder(temp, key);
      } catch (e) {
        continue;
      }
    }
    return temp;
  }
}

function draw(el, val) {
  let div = document.createElement('div');
  div.insertAdjacentHTML('afterbegin', val);
  if (div.firstElementChild) {
    el.replaceWith(div.firstElementChild);
  } else {
    el.replaceWith(div.firstChild);
  }
}

function finder(element, find, val) {
  if (element.childNodes.length > 0) {
    for (let i = 0; i < element.childNodes.length; i++) finder(element.childNodes[i], find, val);
  }
  let regexp = new RegExp(`{${find}}`);
  if (element.nodeType == Node.TEXT_NODE && regexp.test(element.nodeValue)) {
    draw(element, val);
  }
}
