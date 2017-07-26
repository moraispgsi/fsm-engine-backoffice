/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import JSONTree from 'react-json-tree';
import brace from 'brace';
import AceEditor from 'react-ace';
import sizer from 'react-sizer';
import 'brace/mode/xml';
import 'brace/theme/eclipse';

class ModelViewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			model: this.props.model
		}
	}

	componentWillMount() {

	}

	componentWillUpdate() {

	}

	componentWillReceiveProps(nextProps) {
		this.state = {
			model: nextProps.model
		};

		this.setState(this.state);
	}

	onChange(model) {
		this.state.model = model;
	}

	render() {
		const options = {
			lineNumbers: true,
			mode: 'xml'
		};
		return (
				<div className="col-lg-12 border-left"
						 style={{
							 borderStyle: '', padding: '0',paddingLeft: '0px',
							 borderRight: 'transparent', borderBottom: 'transparent', borderTop: 'transparent'
						 }}>
					<AceEditor
							width="100%"
							mode="xml"
							theme="eclipse"
							onChange={this.onChange.bind(this)}
							name="UNIQUE_ID_OF_DIV"
							value={this.state.model}
							editorProps={{$blockScrolling: true}}
					/></div>
		)
	}

}

export default ModelViewer;