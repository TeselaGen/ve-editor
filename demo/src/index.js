import React from "react";
import { render } from "react-dom";
import exampleSequenceData from '../../src/exampleData/exampleSequenceData';
console.log('exampleSequenceData:', exampleSequenceData)
import {
	CircularView,
	RowView,
	RowItem,
	VeToolBar,
	CutsiteFilter
} from "../../src";

let Demo = function () {
	return (
		<div>
			<h1>ve-editor Demo</h1>
			<CircularView sequenceData={exampleSequenceData}/>
			<RowView sequenceData={exampleSequenceData}/>
		</div>
	);
	
}

render(<Demo />, document.querySelector("#demo"));
