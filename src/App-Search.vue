<template>
  <div id="app">
<Root :activeView="activeView">
  <VKView id="view1"  :activePanel="activePanel1" key="view1">
    <Panel id="panel13">
      <PanelHeader theme="brand">
      <Search theme="header" v-model="searchText" placeholder="плейсхолдер">
        <div slot="after">Clear</div>
      </Search>

        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          A {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      <HeaderContext :opened="contextOpened" :onClose="function(){ contextOpened = false; test(); }">
        <Div style="background-color: #eee;">HeaderContext</Div>
      </HeaderContext>
      <Search v-model="searchText"></Search>
      <br/>
<Button @click="activeView='view2'">To view2</Button>
<Button @click="activePanel1='panel2'">To panel2</Button>


    </Panel>
    <Panel id="panel2">
      <PanelHeader theme="brand">
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          A {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      <HeaderContext :opened="contextOpened" :onClose="function(){ contextOpened = false; test(); }">
        <Div style="background-color: #eee;">HeaderContext</Div>
      </HeaderContext>
<Button @click="activeView='view2'">To view2</Button>
<Button @click="activePanel1='panel13'">To panel1</Button>
    </Panel>
  </VKView>
  <VKView id="view2" :activePanel="activePanel" key="view2">
    <Panel id="panel1">
      <PanelHeader theme="brand">
        <template slot="left">
        <HeaderButton slot="addon" :primary="true" @click="activeView = 'view1'">
          Назад
        </HeaderButton>
      </template>
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          B {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
<Button @click="activeView='view1'">To view1</Button>
<Button @click="activePanel='panel2'">To panel2</Button>
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
      
    </Panel>
  </VKView>
</Root>
  </div>
</template>

<script>
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

import Search from './components/Search/Search'


import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

export default {
  name: 'app',
  data: () => ({
    activeView: 'view1',
    activePanel1: 'panel13',
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
    searchText:'ttt',
  }),
  components: {
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
    Search
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
