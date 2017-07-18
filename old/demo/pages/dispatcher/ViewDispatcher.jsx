/* eslint-disable no-unused-vars,class-methods-use-this */
import React from 'react';
import { Box } from 'reactjs-admin-lte';
import { Col, Row } from 'react-bootstrap';
import { InfoTile, StatTile } from 'adminlte-reactjs';
import { Link } from 'react-router';

class ViewDispatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ellipsis(str) {
    const elSize = 30;
    return str.length <= elSize ? str : (str.length > elSize ? '' : '...') + str.substr(str.length - elSize);
  }
  render() {
    return (
      <div className="skeleton" style={{ paddingTop: '25px' }}>
        <section className="content">
          <div className="row">
            <Col sm={6} md={6} >
              <Box>
                <Box.Header>
                  <Box.Title>Action dispatcher server information</Box.Title>
                </Box.Header>
                <Box.Body>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th style={{ width: '50%' }}>Server name:</th>
                          <td>ACE.js</td>
                        </tr>
                        <tr>
                          <th>Server URL</th>
                          <td>http://www.INSTICC.org/dispatcher1</td>
                        </tr>
                        <tr>
                          <th>Namespaces</th>
                          <td>2</td>
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
                    <li><Link to="/dispatcher/edit"><i style={{ marginRight: '4px' }} className="fa fa-edit" /> Edit</Link></li>
                    <li><Link to="/dispatcher/link"><i style={{ marginRight: '4px' }} className="fa fa-link" /> Link server</Link></li>
                    <li><Link to="/dispatcher/link"><i style={{ marginRight: '4px' }} className="fa fa-unlink" /> Unlink server</Link></li>
                    <li><Link to="/dispatcher/documentation"><i style={{ marginRight: '4px' }} className="fa fa-book" /> Documentation</Link></li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col sm={12} md={12}>
              <StatTile
                width={3}
                theme="bg-yellow"
                icon="fa-hashtag"
                subject={this.ellipsis('http://www.INSTICC.org/ddm')}
                stats="0 actions"
                link="#"
              />
              <StatTile
                width={3}
                theme="bg-red"
                icon="fa-hashtag"
                subject={this.ellipsis('http://www.INSTICC.org/cms')}
                stats="2 actions"
                link="#"
              />
            </Col>
          </div>
        </section>
      </div>
    );
  }
}

export default ViewDispatcher;
