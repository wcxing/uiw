Rate 评分
===

评分组件

```jsx
import { Rate } from 'uiw';
```

### 基本用法

按钮样式的单选组合。

<!--DemoStart,bgWhite,codePen--> 
```js
import { Rate, Divider, Icon } from 'uiw';

const Demo = () => (
  <div>
    <Rate value={3} />
    <Divider />
    <Rate color="#393E48" character="☆" value={4} />
    <Divider />
    <Rate color="#28a745" character={<Icon type="heart-on" />} value={3} />
    <Divider />
    <Rate color="#dc3545" character="✿" value={4} />
  </div>
)

ReactDOM.render(<Demo />, _mount_);
```
<!--End-->

### 只读

按钮样式的单选组合。

<!--DemoStart,bgWhite,codePen--> 
```js
import { Rate, Divider, Icon } from 'uiw';

const Demo = () => (
  <div>
    <Rate readOnly value={3} />
    <Divider />
    <Rate readOnly character="☆" value={4} />
    <Divider />
    <Rate readOnly character={<Icon type="heart-on" />} value={3} />
    <Divider />
    <Rate readOnly character="✿" value={4} />
  </div>
)

ReactDOM.render(<Demo />, _mount_);
```
<!--End-->

### 文本

按钮样式的单选组合。

<!--DemoStart,bgWhite,codePen--> 
```js
import { Rate, Divider } from 'uiw';

const Demo = () => (
  <div>
    <Rate character="美" value={4} />
    <Divider />
    <Rate color="#d80000" character="好" value={3} />
    <Divider />
    <Rate character="传" value={4} />
  </div>
)

ReactDOM.render(<Demo />, _mount_);
```
<!--End-->

### 半选显示

<!--DemoStart,bgWhite,codePen--> 
```js
import { Rate, Divider, Icon } from 'uiw';

const Demo = () => (
  <div>
    <Rate character={<Icon type="heart-on" />} value={3.3} />
    <Divider />
    <Rate color="#d80000" character={<Icon type="heart-on" />} value={4.3} />
  </div>
)

ReactDOM.render(<Demo />, _mount_);
```
<!--End-->

### 尺寸

<!--DemoStart,bgWhite,codePen--> 
```js
import { Rate, Divider, Icon } from 'uiw';

const Demo = () => (
  <div>
    <Rate style={{ fontSize: 34 }} character={<Icon type="heart-on" />} value={3} />
  </div>
)

ReactDOM.render(<Demo />, _mount_);
```
<!--End-->

## Rate

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 根据 value 进行比较，判断是否选中 | Number | - |
| count | star 总数 | Number | `5` |
| readOnly | 只读，无法进行交互 | Boolean | `false` |
| character | 自定义字符 | ReactNode | - |
| color | 自定义 Star 的颜色 | String | - |
| className | 自定义样式类名 | String | - |
| onChange | 数值改变时的回调，返回当前值 | Funtcion(e:Even,value) | - |
| onHoverChange | 鼠标经过时数值变化的回调 | Funtcion(e:Even,value) | - |
