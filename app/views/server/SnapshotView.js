/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import JSONTree from 'react-json-tree';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/eclipse';

// const theme = {
// 	scheme: 'grayscale',
// 	author: 'alexandre gavioli (https://github.com/alexx2/)',
// 	base00: '#101010',
// 	base01: '#252525',
// 	base02: '#464646',
// 	base03: '#525252',
// 	base04: '#ababab',
// 	base05: '#b9b9b9',
// 	base06: '#e3e3e3',
// 	base07: '#f5f5f5',
// 	base08: '#7c7c7c',
// 	base09: '#999999',
// 	base0A: '#a0a0a0',
// 	base0B: '#8e8e8e',
// 	base0C: '#868686',
// 	base0D: '#686868',
// 	base0E: '#747474',
// 	base0F: '#5e5e5e',
// };

class SnapshotView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snapshot: {}
		}
	}

	setSnapshot(snapshot) {
		this.state.snapshot = snapshot;
		this.setState(this.state);
		this.forceUpdate();
	}

	render() {
		return (
				<AceEditor
							width="100%"
							mode="json"
							readOnly={true}
							theme="eclipse"
							name="UNIQUE_ID_OF_DIV"
							value={JSON.stringify(this.state.snapshot, null, '\t')}
							editorProps={{$blockScrolling: true}}
					/>
				// <JSONTree data={this.props.snapshot} theme={theme} />
		)
	}

}

export default SnapshotView;