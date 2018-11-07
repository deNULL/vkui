import ActionSheet from './ActionSheet/ActionSheet'
import ActionSheetItem from './ActionSheetItem/ActionSheetItem'
import Alert from './Alert/Alert'
import Avatar from './Avatar/Avatar'
import Button from './Button/Button'
import Cell from './Cell/Cell'
import CellButton from './CellButton/CellButton'
import Checkbox from './Checkbox/Checkbox'
import Div from './Div/Div'
import Epic from './Epic/Epic'
import File from './File/File'
import FixedLayout from './FixedLayout/FixedLayout'
import Footer from './Footer/Footer'
import FormLayout from './FormLayout/FormLayout'
import FormLayoutGroup from './FormLayoutGroup/FormLayoutGroup'
import Gallery from './Gallery/Gallery'
import Group from './Group/Group'
import Header from './Header/Header'
import HeaderButton from './HeaderButton/HeaderButton'
import HeaderContext from './HeaderContext/HeaderContext'
import HorizontalScroll from './HorizontalScroll/HorizontalScroll'
import InfoRow from './InfoRow/InfoRow'
import Input from './Input/Input'
import Link from './Link/Link'
import List from './List/List'
import Panel from './Panel/Panel'
import PanelHeader from './PanelHeader/PanelHeader'
import PanelHeaderContent from './PanelHeaderContent/PanelHeaderContent'
import PopoutWrapper from './PopoutWrapper/PopoutWrapper'
import Progress from './Progress/Progress'
import Radio from './Radio/Radio'
import Root from './Root/Root'
import ScreenSpinner from './ScreenSpinner/ScreenSpinner'
import Select from './Select/Select'
import SelectMimicry from './SelectMimicry/SelectMimicry'
import Slider from './Slider/Slider'
import Spinner from './Spinner/Spinner'
import VKSwitch from './Switch/Switch'
import Tabbar from './Tabbar/Tabbar'
import TabbarItem from './TabbarItem/TabbarItem'
import Tabs from './Tabs/Tabs'
import TabsItem from './TabsItem/TabsItem'
import Tappable from './Tappable/Tappable'
import Textarea from './Textarea/Textarea'
import Touch from './Touch/Touch'
import VKView from './VKView/VKView'
import Search from './Search/Search'
import Tooltip from './Tooltip/Tooltip'
import RangeSlider from './RangeSlider/RangeSlider'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

import '../styles/common.css';
import '../styles/constants.css';

export {
  Root,
  VKView,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PopoutWrapper,
  Touch,
  Tappable,
  Textarea,
  Button,
  Header,
  HeaderButton,
  HeaderContext,
  HorizontalScroll,
  Gallery,
  Group,
  List,
  Cell,
  CellButton,
  Checkbox,
  Div,
  Epic,
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
  Slider,
  Spinner,
  VKSwitch,
  Tabs,
  TabsItem,
  Tabbar,
  TabbarItem,
  Search,
  Tooltip,
  RangeSlider
}

export { platform, ANDROID, IOS } from '../lib/platform';