
# DEPRECATED 
Please go to https://github.com/TeselaGen/teselagen-react-components and find the vector editor there
# ve-editor

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

This repo contains a react VectorEditor component + redux hook-ins for that component. Also available for use are subcomponents:

```
CircularView
LinearView
RowView
RowItem
StatusBar
VeToolBar
```

Use this package like: 


```js
//rootReducer.js
import {reducer as VectorEditor} from 've-editor';

var initialState = {VectorEditor: {
  YourNamedEditor: {},
}}
return combineReducers({
    VectorEditor, //plug in the VectorEditor reducer
    ...etc.
})

//YourNamedEditor.js
import createVectorEditor from 've-editor'
export default createVectorEditor({
  namespace: 'YourNamedEditor', 
})


//a-file-that-uses-the-editor.js
import YourNamedEditor from '../YourNamedEditor';
var {VectorEditor, VectorEditorContainer, veSelectors, veActions} = YourNamedEditor

render() {
	return (
	<div>
		<VectorEditor {...{actionOverrides}}>
		  <CircularView
		    {
		      ...{
		        ...editorDimensions,
		      }
		    }
		    />
		</VectorEditor>
	</div>
	)
}

```



[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
