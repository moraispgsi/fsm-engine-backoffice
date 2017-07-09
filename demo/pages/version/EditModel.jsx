/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from 'reactjs-admin-lte';
import ReactAce from 'react-ace-editor';
import update from 'react-addons-update';

class EditorModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  setContent(content) {
    const newState = update(this.state, { $merge: { content } });
    this.setState(newState);
  }
  setAce(ace) {
    const newState = update(this.state, { $merge: { ace } });
    this.setState(newState);
  }
  render() {
    return (
      <div className="skeleton" style={{ paddingTop: '25px' }}>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <Box>
                <Box.Header>
                  <Box.Title>SCXML Editor</Box.Title>
                </Box.Header>
                <Box.Body>
                  <ReactAce
                    mode="xml"
                    theme="eclipse"
                    setReadOnly={false}
                    onChange={(content) => { this.setContent(content); }}
                    style={{ height: '400px' }}
                    ref={(instance) => { this.setAce(instance); }} // Let's put things into scope
                  />
                </Box.Body>
              </Box>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default EditorModel;
