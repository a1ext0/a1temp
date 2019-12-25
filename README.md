# Шаблонная система a1ext0

Вставляет текст (не HTML!!!) вместо {`ключ обьекта`}, html в блок, где находится {=`ключ обьекта`}(заменит всё в блоке), или атрибут вместо a1="`имя атрибута` `ключ обьекта` (через пробел)". Для того чтобы воспользоваться, надо вызвать функцию a1temp с аргументом-обьектом.

Например:
```javascript
a1temp({
  temp: '#temp1',
  obj: object
})
```
template: строка с селектором нужного template, пример template:
```html
<template id="temp">
<h1>{name}</h1>
<p a1="class classname">{=password}</p>
</template>
}
```

obj: обьект, или массив обьектов
```javascript
let obj = {
  name: 'Alex',
  classname: 'secret',
  password: '<b>I will not say</b>'
}
```

Функция вернёт элемент, который потом можно вставить куда-то.
```javascript
let div = a1temp({
  temp: '#temp1',
  obj: object
})
body.append(div);
```
Его наполнение будет выглядеть так:
```html
<h1>Alex</h1>
<p class="secret"><b>I will not say</b></p>
}
```

Если передать массив
```javascript
let obj = [{...}, {...}]
```
То вернутся несколько элементов, которые можно вставить также, как и обычный элемент
