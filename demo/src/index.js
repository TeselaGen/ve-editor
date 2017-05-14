import React from "react";
import { render } from "react-dom";

import {
	CircularView,
	RowView,
	RowItem,
	VeToolBar,
	CutsiteFilter
} from "../../lib";

let Demo = function () {
	return (
		<div>
			<h1>ve-editor Demo</h1>
			<CircularView />
		</div>
	);
	
}

render(<Demo />, document.querySelector("#demo"));
