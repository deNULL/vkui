<template>
  <div id="app">

  <!-- <Button>
    <Button @click="activePanel = 'panel3'">Panel 2</Button>
  </Button> -->

<!-- {{ activePanel }}
<br>
{{ popout2 }} -->

<!-- <Root :activeView="activeView"> -->
<Epic :activeStory="activeStory">
  <Tabbar slot="tabbar">
    <TabbarItem>1</TabbarItem>
    <TabbarItem @click="activeStory = 'view1'" :selected="activeStory == 'view1'" label="12">Два</TabbarItem>
    <TabbarItem @click="activeStory = 'view2'" :selected="activeStory == 'view2'">
      <vkui-icon name="done" size="24" />
    </TabbarItem>
  </Tabbar>
  <VKView id="view1"  activePanel="panel13" key="view1">
    <Panel id="panel13">
      <PanelHeader theme="brand">
        <HeaderButton slot="addon" :primary="true" @click="activePanel = 'panel2'">
          Назад
        </HeaderButton>
        <HeaderButton slot="left" :primary="true" @click="activePanel = 'panel2'"><vkui-icon name="place" :size="24" /></HeaderButton>
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          Communities {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      <HeaderContext :opened="contextOpened" :onClose="function(){ contextOpened = false; test(); }">
        <Div style="background-color: #eee;">HeaderContext</Div>
      </HeaderContext>
      {{ activeView }}
      <Button @click="activeView='view2'">Next View</Button>
      <Div>
        <Group>
          <Header level="2">
            test
            <Link slot='aside' @click="test">aside link</Link>
          </Header>
          <List>
            <Cell @click="test">Пятница</Cell>
            <Cell href="/">Суббота</Cell>
            <Cell>Воскресение</Cell>
          </List>
        </Group>

        <Group title="Переходы">
          <List>
            <Cell :expandable="true">Учетная запись</Cell>
            <Cell>Основные</Cell>
          </List>
        </Group>

        <Group title="Индикатор">
          <List>
            <Cell expandable indicator="При использовании">Геолокация</Cell>
            <Cell expandable indicator="Всегда">Автопроигрывание медиа</Cell>
            <Cell expandable indicator="Выключены">Стикеры</Cell>
          </List>
        </Group>

        <Group title="Многострочность">
          <List>
            <Cell multiline>A Series of Unfortunate Events, Archer, Brooklyn Nine-Nine, Doctor Who, Game of Thrones</Cell>
            <Cell multiline>The Avalanches</Cell>
          </List>
        </Group>

        <Group title="Подпись">
          <List>
            <Cell description="Depeche Mode">Where’s the Revolution</Cell>
            <Cell description="The Weeknd">I Feel It Coming (Feat. Daft Punk)</Cell>
          </List>
        </Group>

        <Group title="Большая ячейка">
          <List>
            <Cell size="l" description="Друзья в Facebook">
              <Avatar slot="before" :size="72" />
              <div slot="bottomContent" style="display: flex;">
                <Button size="m">Добавить</Button>
                <Button size="m" level="secondary" style="margin-left: 8px">Скрыть</Button>
              </div>
              <vkui-icon slot="asideContent" name="more_horizontal" size="24" />
              Семён Ефимов
            </Cell>
          </List>
        </Group>

        <Group title="Иконки">
          <List>
            <Cell><vkui-icon slot="before" name="about" size="24" />Информация</Cell>
            <Cell><vkui-icon slot="before" name="services" size="24" />Сервисы</Cell>
          </List>
        </Group>

        <Group title="Чекбоксы">
          <List>
            <Cell selectable><Avatar slot="before" :size="40" src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg" />Артур Стамбульцян</Cell>
            <Cell removable :onRemove="test"><Avatar slot="before" :size="40" src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg" />Артур Стамбульцян</Cell>
          </List>
        </Group>
      </Div>
      <Group :title="slider.toString()" description="Слайдеры">
        <Slider v-model="slider"
          :min="0"
          :max="1" />
        <br>
        <Slider v-model="slider"
          :step="0.2"
          :min="0"
          :max="5" />
      </Group>
      <Group :title="'Select example: ' + sex" description="Description">
        <Div>
          <Select :onChange="() => {activeView='view2'}" placeholder="Выберите пол" v-model="sex">
            <option value="m">Мужской</option>
            <option value="f">Женский</option>
          </Select>
          <br>
          <Select placeholder="Выберите пол" v-model="sex">
            <option value="m">Мужской</option>
            <option value="f">Женский</option>
          </Select>
          <br>
          <SelectMimicry placeholder="Выберите страну"></SelectMimicry>
          <br>
          <SelectMimicry placeholder="Выберите страну">Москва</SelectMimicry>
        </Div>
      </Group>
    </Panel>
  </VKView>
  <VKView id="view2" :activePanel="activePanel" key="view2">
    <!-- <ScreenSpinner slot="popout"/> -->
    <ActionSheet v-if="popout2"
      slot="popout"
      :onClose="function(){popout2 = false;}"
    >
      <template slot="title">Hi!</template>
      <template slot="text">I am action sheet</template>
      <ActionSheetItem @click="test" autoclose>Action</ActionSheetItem>
      <ActionSheetItem @click="test" autoclose theme="destructive">Sheet</ActionSheetItem>
      <ActionSheetItem @click="test" :autoclose="true" theme="cancel">Cancel</ActionSheetItem>
    </ActionSheet>
    <!-- <Alert v-if="!popout2"
      slot="popout"
      :actions="[{
        title: 'Close',
        autoclose: true,
        style: 'destructive'
      }, {
        title: 'Cancel',
        autoclose: true,
        style: 'cancel'
      }]"
      :onClose="function(){popout2 = true;}"
    >
      <h2>Hi!</h2>
      <p>I am alert</p>
    </Alert> -->
    <Panel id="panel1">
      <PanelHeader theme="brand">
        <HeaderButton slot="addon" :primary="true" @click="activePanel = 'panel2'">
          Назад
        </HeaderButton>
        <HeaderButton slot="left" :primary="true" @click="activePanel = 'panel2'">
          <
        </HeaderButton>
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          Communities {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      <FixedLayout vertical="top">
        <!-- <Div style="background: #fafafa;">Fixed</Div> -->
        <Tabs type="buttons" theme="header">
          <TabsItem :selected="true">1 {{ activeView }}</TabsItem>
          <TabsItem>Два</TabsItem>
          <TabsItem @click="test">Три четыре</TabsItem>
        </Tabs>
      </FixedLayout>
      <!-- <Tabbar>
        <TabbarItem :selected="true">1</TabbarItem>
        <TabbarItem label="12">Два</TabbarItem>
        <TabbarItem @click="test">
          <vkui-icon name="done" size="16" />
        </TabbarItem>
      </Tabbar> -->
      <HeaderContext :opened="contextOpened" :onClose="function(){ contextOpened = false; test(); }">
        <Div style="background-color: #eee;">HeaderContext</Div>
      </HeaderContext>
      <Div :style="{ paddingTop: '60px', paddingBottom: '60px' }">

        <Group title="Group title" description="Group description. Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
          {{ activeView }}
          <Button @click="activeView='view1'">Prev View</Button>
          <Div>
            <FormLayout @submit="function(e) {e.preventDefault(); test();}">
              <FormLayoutGroup top="Пароль" bottom="Пароль может содержать только латинские буквы и цифры.">
                <Button top="top test">123</Button>
              </FormLayoutGroup>
              <Button top="top test">{{ popout2 }}</Button>
              <Radio value="3" v-model="radio1">Radio 1</Radio>
              <Radio value="4" v-model="radio1" description="description">Radio 2</Radio>
            </FormLayout>
            <Div>Radio1 = {{ radio1 }}</Div>
            <Button @click="activePanel = 'panel2'">Panel 1</Button>
            <Button @click="openSheet">openSheet</Button>
            popout2: {{ popout2 }}
            <a href="javascript:void(0);" @click="openSheet">test</a>
            <hr>
            <Button level="primary" @click="openSheet">Test</Button>
            <Button level="secondary" @click="openSheet">Test</Button>
            <Button level="tertiary" @click="openSheet">Test</Button>
            <Button level="outline" @click="openSheet">Test</Button>
            <Button level="commerce" @click="openSheet">12</Button>
            <hr>
            <Avatar type="default" :size="80" src="https://pp.userapi.com/c840137/v840137341/229c0/ydVgaKkHAp8.jpg?ava=1" />
            <Avatar type="app" :size="80" src="https://pp.userapi.com/c840137/v840137341/229c0/ydVgaKkHAp8.jpg?ava=1" />
            <Avatar type="image" :size="80" src="https://pp.userapi.com/c840137/v840137341/229c0/ydVgaKkHAp8.jpg?ava=1" />
            <hr>
            {{ input }}
            <Input @focus="test" placeholder="placeholder Focus" v-model="input" />
            <Input placeholder="placeholder" v-model="input" />
            <Link href="///">test link</Link>
            <Checkbox v-model="sw1">Я согласен со всем, что вы <Link href="///">там</Link> понаписали</Checkbox>
            <VKSwitch v-model="sw1"></VKSwitch> {{ sw1 }}
            <VKSwitch v-model="sw2"></VKSwitch> {{ sw2 }}
            <VKSwitch v-model="sw2" disabled="true"></VKSwitch>
            <Group title="progress">
              <Progress :value="progress" />
              <br>
              <Button @click="progress = progress + 10">Progress +10</Button>
            </Group>
            <HorizontalScroll>
              <div style="display: flex;">
                <Button level="primary" @click="openSheet">Test</Button>
                <Button level="secondary" @click="openSheet">Test</Button>
                <Button level="tertiary" @click="openSheet">Test</Button>
                <Button level="outline" @click="openSheet">Test</Button>
                <Button level="commerce" @click="openSheet">Test</Button>
                <Button level="primary" @click="openSheet">Test</Button>
                <Button level="secondary" @click="openSheet">Test</Button>
                <Button level="tertiary" @click="openSheet">Test</Button>
                <Button level="outline" @click="openSheet">Test</Button>
                <Button level="commerce" @click="openSheet">Test</Button>
                <Button level="primary" @click="openSheet">Test</Button>
                <Button level="secondary" @click="openSheet">Test</Button>
                <Button level="tertiary" @click="openSheet">Test</Button>
                <Button level="outline" @click="openSheet">Test</Button>
                <Button level="commerce" @click="openSheet">Test</Button>
                <Button level="commerce" @click="openSheet">13</Button>
              </div>
            </HorizontalScroll>
            <InfoRow title="InfoRow">
              InfoRow
            </InfoRow>
            <hr>
            <File>
              <vkui-icon slot="before" name="done" size="16" />
              Тест Файл
            </File>
          </Div>
        </Group>
        <Group title="Кнопка-ячейка">
          <CellButton>
            <vkui-icon slot="before" name="done" size="16" />
            Добавить новую школу</CellButton>
          <CellButton>Добавить новую школу</CellButton>
        </Group>
        <Group title="Стилизация">
          <CellButton level="danger">Покинуть беседу</CellButton>
        </Group>
        <Group title="Кнопка c иконкой">
          <CellButton><div slot="before">before</div>Добавить родственника</CellButton>
        </Group>
      </Div>
      <Footer>Footer</Footer>
    </Panel>
    <Panel id="panel2" theme="white">
      <PanelHeader>
        <template slot="left">
          <HeaderButton :primary="true" @click="activePanel = 'panel1'">
            Назад
          </HeaderButton>
        </template>
        Товары
      </PanelHeader>
      <Group title="Group title" description="Group description. Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
        <Div>
          <Button @click="activePanel = 'panel3'">Panel 2</Button>
          <br>
          <br>
          {{ activeView }}
          <Button @click="activeView='view1'">Prev View</Button>
        </Div>
        <Div>
          <Gallery
            slideWidth="90%"
            style="height: 150px;"
            bullets="dark">
            <div id="slide1"><div style="height: 150px; background-color: blue;"></div></div>
            <div id="slide2"><div style="height: 150px; background-color: green;"></div></div>
            <div id="slide3"><div style="height: 150px; background-color: red;"></div></div>
          </Gallery>
        </Div>
      </Group>
    </Panel>
    <Panel id="panel3">
      <PanelHeader theme="alternate">Light titlte</PanelHeader>
      <Button @click="activePanel = 'panel4'">Panel 3</Button>
    </Panel>
    <Panel id="panel4"><Button @click="activePanel = 'panel5'">Panel 4</Button></Panel>
    <Panel id="panel5"><Button @click="activePanel = 'panel1'">Panel 5</Button></Panel>
    <!-- <template slot="popout">
      <ActionSheet v-if="popout2"
        title="Hi!"
        text="I am action sheet"
        :onClose="() => popout2 = false"
      >
        <ActionSheetItem @click="test" autoclose>Action</ActionSheetItem>
        <ActionSheetItem @click="test" autoclose theme="destructive">Sheet</ActionSheetItem>
        <ActionSheetItem @click="test" autoclose theme="cancel">Cancel</ActionSheetItem>
      </ActionSheet>
    </template> -->
  </VKView>
</Epic>  
<!-- </Root> -->



  <!-- <hr>
  <Button level="2">
    {{ popout2 }}
    <Button level="2" id="3" size="l">level 2</Button>
    <Button level="2">level 2</Button>
  </Button>
  
    <a href="javascript:void(0);" @click="test">111111111</a>
    <div @dragstart="test">2222222222</div>

    <Tappable>Tappable</Tappable> 

    <Touch t="s">
      Touch
    </Touch>

    <hr> -->

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <div style="text-align: center;">
      <Button @dragstart.native="test" fack="fack" size="l">default click test s</Button>
    </div>

    <hr>

    <br>
    <Button @click="test" level="1">level 1</Button>
    <Button level="2">level 2</Button>
    <Button level="3">level 3</Button>
    <Button level="sell">level sell</Button>
    <Button level="buy">level buy</Button>
    <Button level="primary">level primary</Button>
    <Button level="danger">level danger</Button>
    <Button type="cell" level="buy">level sell</Button>
    <br>
    <Button size="m">size m</Button>
    <Button size="l">size l</Button>
    <Button size="xl">size xl</Button>
    <br>
    <Button type="default">type default</Button>
    <Button type="cell">type cell</Button>
    <br>
    <Button type="cell" align="left">align left</Button>
    <Button type="cell" align="center">align center</Button>
    <Button type="cell" align="right">align right</Button>
    <br>
    <Button :stretched="true">stretched</Button>
    <hr>
    <Header level="1">Header level 1</Header>
    <Header level="2" aside="Aside content">Header level 2</Header>
    <hr>
    <Group title="Group title" description="Group description. Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
      <List>
        <Cell>
          One
        </Cell>
        <Cell>
          Two
        </Cell>
        <Cell>
          Three
        </Cell>
      </List>
    </Group> -->
  </div>
</template>

<script>
import Epic from './components/Epic/Epic'
import Root from './components/Root/Root'
import VKView from './components/VKView/VKView'
import Panel from './components/Panel/Panel'
import PanelHeader from './components/PanelHeader/PanelHeader'
import PanelHeaderContent from './components/PanelHeaderContent/PanelHeaderContent'
import Touch from './components/Touch/Touch'
import Tappable from './components/Tappable/Tappable'
import Button from './components/Button/Button'
import Header from './components/Header/Header'
import HeaderButton from './components/HeaderButton/HeaderButton'
import HeaderContext from './components/HeaderContext/HeaderContext'
import HorizontalScroll from './components/HorizontalScroll/HorizontalScroll'
import Group from './components/Group/Group'
import Gallery from './components/Gallery/Gallery'
import List from './components/List/List'
import Cell from './components/Cell/Cell'
import CellButton from './components/CellButton/CellButton'
import Checkbox from './components/Checkbox/Checkbox'
import Div from './components/Div/Div'
import ActionSheet from './components/ActionSheet/ActionSheet'
import ActionSheetItem from './components/ActionSheetItem/ActionSheetItem'
import Alert from './components/Alert/Alert'
import Avatar from './components/Avatar/Avatar'
import File from './components/File/File'
import FixedLayout from './components/FixedLayout/FixedLayout'
import Footer from './components/Footer/Footer'
import FormLayout from './components/FormLayout/FormLayout'
import FormLayoutGroup from './components/FormLayoutGroup/FormLayoutGroup'
import InfoRow from './components/InfoRow/InfoRow'
import Input from './components/Input/Input'
import Link from './components/Link/Link'
import Progress from './components/Progress/Progress'
import Radio from './components/Radio/Radio'
import ScreenSpinner from './components/ScreenSpinner/ScreenSpinner'
import Select from './components/Select/Select'
import SelectMimicry from './components/SelectMimicry/SelectMimicry'
import VKSwitch from './components/Switch/Switch'
import Tabs from './components/Tabs/Tabs'
import TabsItem from './components/TabsItem/TabsItem'
import Tabbar from './components/Tabbar/Tabbar'
import TabbarItem from './components/TabbarItem/TabbarItem'
import Slider from './components/Slider/Slider'


import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

export default {
  name: 'app',
  data: () => ({
    activeView: 'view1',
    activePanel: 'panel1',
    popout2: false,
    contextOpened: false,
    progress: 10,
    sw1: false,
    sw2: true,
    radio1: "4",
    input: '',
    activeStory: 'view1',
    sex: undefined,
    slider: .5,
  }),
  components: {
    Epic,
    Root,
    VKView,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Touch,
    Tappable,
    Button,
    Header,
    HeaderButton,
    HeaderContext,
    HorizontalScroll,
    Group,
    Gallery,
    List,
    Cell,
    CellButton,
    Checkbox,
    Div,
    ActionSheet,
    ActionSheetItem,
    Alert,
    Avatar,
    File,
    FixedLayout,
    Footer,
    FormLayout,
    FormLayoutGroup,
    InfoRow,
    Input,
    Link,
    Progress,
    Radio,
    ScreenSpinner,
    Select,
    SelectMimicry,
    VKSwitch,
    Tabs,
    TabsItem,
    Tabbar,
    TabbarItem,
    Slider,
  },
  methods: {
    test (e) {
      console.log("test 123", e)
    },
    openSheet () {
      this.popout2 = true;
    }
  }
}
</script>

<style>
@import './styles/common.css';
@import './styles/constants.css';
@import './styles/generated/palette.css';
@import './styles/generated/client_light.css';
/*@import './styles/generated/client_dark.css';*/

hr {
  border: none;
  border-bottom: 2px dashed #eee;
  margin: 40px 0;
}
</style>
