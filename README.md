[![Build Status](https://travis-ci.org/jhu-sheridan-libraries/jhu_bento.svg?branch=master)](https://travis-ci.org/jhu-sheridan-libraries/jhu_bento)
[![Maintainability](https://api.codeclimate.com/v1/badges/58c8c6e04033c00ea859/maintainability)](https://codeclimate.com/github/jhu-sheridan-libraries/jhu_bento/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/58c8c6e04033c00ea859/test_coverage)](https://codeclimate.com/github/jhu-sheridan-libraries/jhu_bento/test_coverage)
[![Dependency Status](https://beta.gemnasium.com/badges/github.com/jhu-sheridan-libraries/jhu_bento.svg)](https://beta.gemnasium.com/projects/github.com/jhu-sheridan-libraries/jhu_bento)

# Bento

A React/Redux based bento box prototype for library discovery layer. 

## Quick start

To set up the application, first install the docker images. 

Then install nodejs and yarn. On mac, you may use brew to install both. 

Install node modules

```
cd jhu_bento
yarn install
```

Start the webpack server

```
yarn start
```

Now you can look at the application at http://127.0.0.1:8080/

## Development

Start the webpack server,

```
cd jhu_bento
yarn start
```

Use your favorite editor to edit files. Any change to `/src` would be automatically loaded in the browser. 

## Add a widget

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
