# Шаблонная система a1ext0

Вставляет текст или узел вместо {...}. Для того чтобы воспользоваться, надо вызвать функцию a1temp с аргументом-обьектом.

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
<p>{phone}</p>
</template>
}
```

obj: обьект, или массив обьектов
```javascript
let obj = {
  name: 'Alex',
  phone: 'secret'
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
Если передать массив
```javascript
let obj = [{name: 'Alex', phone: 'secret'}, {name: 'Victor', phone: 'not secret'}]
```
То вернётся documentFragment с несколькими элементами, который можно вставить также, как и обычный элемент
