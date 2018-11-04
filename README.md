# vkui

VKUI — это набор компонентов для Vue, с помощью которых можно создавать интерфейсы, внешне неотличимые от наших iOS и Android приложений.

Данный репозиторий является форком пакета https://www.npmjs.com/package/@urapywka/vkui, который, в свою очередь, порт библиотеки https://github.com/VKCOM/VKUI, написанной на React.

За исключением некоторых деталей, использование библиотеки идентично оригинальной на React. [https://vkcom.github.io/vkui-styleguide/](Документация к исходной библиотеке).

# Установка

```
npm install --save @denull/vkui portal-vue
```

Подключить все компоненты можно так (в `main.js`):
```js
import '@denull/vkui'
import PortalVue from 'portal-vue'

import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

Vue.use(PortalVue)
```

Чтобы подключить только часть компонентов из исходников:
```js
import '@denull/vkui/src/styles/common.css';
import '@denull/vkui/src/styles/constants.css';
import '@denull/vkui/src/styles/generated/palette.css';
import '@denull/vkui/src/styles/generated/client_light.css';
import Button from "@denull/vkui/src/components/Button/Button.vue"
import Epic from "@denull/vkui/src/components/Epic/Epic.vue"
import VKView from "@denull/vkui/src/components/VKView/VKView.vue"
import Panel from "@denull/vkui/src/components/Panel/Panel.vue"
import PortalVue from 'portal-vue'

import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

Vue.use(PortalVue)
Vue.component('Button', Button)
Vue.component('Epic', Epic)
Vue.component('VKView', VKView)
Vue.component('Panel', Panel)
```


# TODO

Отсутствующие компоненты:

* Entity
* Search
* FixedTabs
* Tooltip
* RangeSlider