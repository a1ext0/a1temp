# Шаблонная система a1ext0

Вставляет текст (не HTML!!!) вместо {...}. Для того чтобы воспользоваться, надо вызвать функцию a1temp с аргументом-обьектом.

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
<p a1="class classname">password here</p>
</template>
}
```

obj: обьект, или массив обьектов
```javascript
let obj = {
  name: 'Alex',
  classname: 'secret'
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
<p class="secret">password here</p>
}
```

Если передать массив
```javascript
let obj = [{name: 'Alex', phone: 'secret'}, {name: 'Victor', phone: 'notsecret'}]
```
То вернутся несколько элементов, которые можно вставить также, как и обычный элемент
