/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from 'reactjs-admin-lte';
import { Col } from 'react-bootstrap';
import { InfoTile } from 'adminlte-reactjs';

class ViewServer extends React.Component {
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
                  <Box.Title>Server information</Box.Title>
                </Box.Header>
                <Box.Body>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th style={{ width: '50%' }}>Serve name:</th>
                          <td>INSTICC One</td>
                        </tr>
                        <tr>
                          <th>Server URL</th>
                          <td>http://www.INSTICC.org/engine1</td>
                        </tr>
                        <tr>
                          <th>Action dispatcher</th>
                          <td>ACE.js</td>
                        </tr>
                        <tr>
                          <th>Action dispatcher URL</th>
                          <td>http://www.INSTICC.org/ace-dispatcher</td>
                        </tr>
                        <tr>
                          <th>Machines</th>
                          <td>2</td>
                        </tr>
                        <tr>
                          <th>Instances</th>
                          <td>30</td>
                        </tr>
                        <tr>
                          <th>Is running</th>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <th>Added at:</th>
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
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-edit" /> Edit</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-unlink" /> Unlink dispatcher</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-link" /> Link dispatcher</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-git" /> Repository</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-play" /> Resume</a></li>
                    <li><a href=""><i style={{ marginRight: '4px' }} className="fa fa-stop" /> Stop</a></li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col sm={12} md={12} >
              <Box>
                <Box.Header>
                  <Box.Title>Machines</Box.Title>
                </Box.Header>
                <Box.Body>
                  <InfoTile
                    width={3}
                    icon="fa-file"
                    stats="20 instances"
                    subject="deadline"
                    theme="bg-aqua"
                  />
                  <InfoTile
                    width={3}
                    icon="fa-file"
                    stats="10 instances"
                    subject="keynote"
                    theme="bg-yellow"
                  />
                </Box.Body>
              </Box>
            </Col>
          </div>
        </section>
      </div>
    );
  }
}

export default ViewServer;
