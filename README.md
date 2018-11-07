# vkui

VKUI — это набор компонентов для Vue, с помощью которых можно создавать интерфейсы, внешне неотличимые от нативных iOS и Android приложений.

Данный репозиторий является форком пакета https://www.npmjs.com/package/@urapywka/vkui, который, в свою очередь, порт библиотеки https://github.com/VKCOM/VKUI, написанной на React.

За исключением некоторых деталей, использование библиотеки идентично оригинальной на React. [Документация к исходной библиотеке](https://vkcom.github.io/vkui-styleguide/).

# Установка

```
npm install --save @denull/vkui
```

Подключить все компоненты можно так (в `main.js`):
```js
import '@denull/vkui'
```

Чтобы подключить только часть компонентов из исходников:
```js
/* Замените эти стили на свои, если хотите использовать другую тему */
import '@denull/vkui/src/styles/generated/palette.css';
import '@denull/vkui/src/styles/generated/client_light.css';

import { Button, Epic, VKView, Panel } from "@denull/vkui/src/components"

import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

Vue.component('Button', Button)
Vue.component('Epic', Epic)
Vue.component('VKView', VKView)
Vue.component('Panel', Panel)
```

Вместо вызовов Vue.component(…) также можно передавать импортированные компоненты в поле `components` при объявлении собственных компонентов. В таком случае они будут доступны только внутри них.


# TODO

* Сделать нормальную showcase-страницу, протестировать работоспособность всех компонентов