/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from 'reactjs-admin-lte';
import { Col } from 'react-bootstrap';


class Version extends React.Component {
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
                  <Box.Title>Version information</Box.Title>
                </Box.Header>
                <Box.Body>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th style={{ width: '50%' }}>Key:</th>
                          <td>version1</td>
                        </tr>
                        <tr>
                          <th>Server</th>
                          <td>INSTICC One</td>
                        </tr>
                        <tr>
                          <th>Machine</th>
                          <td>deadline</td>
                        </tr>
                        <tr>
                          <th>Is sealed</th>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <th>Created at:</th>
                          <td>{new Date().toISOString()}</td>
                        </tr>
                        <tr>
                          <th>Last updated at:</th>
                          <td>{new Date().toISOString()}</td>
                        </tr>
                      </tbody>
                    </table>
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
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-arrow-left" /> Previous version</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-arrow-right" /> Next version</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-archive" /> Seal</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-code" /> View model</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-bolt" /> Add instance</a></li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col sm={12} md={12} >
              <Box>
                <Box.Header>
                  <Box.Title>Instances</Box.Title>
                </Box.Header>
                <Box.Body>
                  <table id="instances" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>key</th>
                        <th>isRunning</th>
                        <th>hasFinished</th>
                        <th>createdAt</th>
                        <th>updatedAt</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>instance1</td>
                        <td>true</td>
                        <td>false</td>
                        <td>{new Date().toISOString()}</td>
                        <td>{new Date().toISOString()}</td>
                        <td><a href="\" className="link">view</a></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>key</th>
                        <th>isRunning</th>
                        <th>hasFinished</th>
                        <th>createdAt</th>
                        <th>updatedAt</th>
                        <th>action</th>
                      </tr>
                    </tfoot>
                  </table>
                </Box.Body>
              </Box>
            </Col>
          </div>
        </section>
      </div>
    );
  }
}

export default Version;
