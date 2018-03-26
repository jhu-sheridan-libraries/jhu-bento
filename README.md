# l-Bento

A React/Redux based bento box prototype for library discovery layer. 

To add a new API widget, do the following: 

1. Create a new file in src/widgets. The widget has to define two things: 
  * a Component that displays the content
  * a search function that returns a Promise object. 

2. Add the widget to widgets/index.js.

```
import MyNewWidget, { searchForMyNewWidget } from './MyNewWidget.js'
...
const widgets = {
  ...
  mywidget: { widget: MyNewWidget, search: searchForMyNewWidget },
}
export default widgets
```

Add the widget to components/Bento.js. 

```
...
<div ...>
{ this.renderWidgetContainer('mywidget') }
</div>
...
```

That's it! If everything works as expected, the new API widget should show up at the 2nd column of the 3rd row.  