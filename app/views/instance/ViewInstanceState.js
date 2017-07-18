/* eslint-disable no-unused-vars,max-len */
import React from 'react';
import { Box } from 'reactjs-admin-lte';
import { Col } from 'react-bootstrap';
import JSONTree from 'react-json-tree';
// import ObjectInspector from 'react-object-inspector';

const theme = {
  scheme: 'grayscale',
  author: 'alexandre gavioli (https://github.com/alexx2/)',
  base00: '#101010',
  base01: '#252525',
  base02: '#464646',
  base03: '#525252',
  base04: '#ababab',
  base05: '#b9b9b9',
  base06: '#e3e3e3',
  base07: '#f5f5f5',
  base08: '#7c7c7c',
  base09: '#999999',
  base0A: '#a0a0a0',
  base0B: '#8e8e8e',
  base0C: '#868686',
  base0D: '#686868',
  base0E: '#747474',
  base0F: '#5e5e5e',
};
// fsd
class ViewInstanceState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="skeleton" style={{ paddingTop: '25px' }}>
        <section className="content">
          <div className="row">
            <Col sm={6} md={6} >
              <Box>
                <Box.Header>
                  <Box.Title>Instance state</Box.Title>
                </Box.Header>
                <Box.Body>
                  <div className="well well-sm" style={{ backgroundColor: '#ffffff' }}>
                    <JSONTree data={{ date: null, hasExtension: false, extensionDate: null, deadlineId: -1 }} theme={theme} />
                  </div>
                </Box.Body>
              </Box>
            </Col>
            <Col sm={6} md={6} >
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">Actions</h3>
                </div>
                <div className="box-footer no-padding">
                  <ul className="nav nav-stacked">
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-globe" /> Go to server</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-file" /> Go to machine</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-file-code-o" /> Go to version</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-bolt" /> Go to instance</a></li>
                  </ul>
                </div>
              </div>
            </Col>
          </div>
        </section>
      </div>
    );
  }
}

export default ViewInstanceState;
