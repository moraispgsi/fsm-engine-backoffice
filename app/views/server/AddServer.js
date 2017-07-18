import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Box } from 'reactjs-admin-lte';

class ServerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="content">
        <div className="row">
          <Col sm={8} md={8} >
            <Box>
              <Box.Header>
                <Box.Title><i className="fa fa-server" style={{ marginRight: 8, color: '#1a2226' }} />Add Server</Box.Title>
              </Box.Header>
              <Box.Body>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalDisplayName">
                    <Col componentClass={ControlLabel} sm={2}>
                      Name
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Insert the name that is displayed." />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalServerURL">
                    <Col componentClass={ControlLabel} sm={2}>
                      URL
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Insert the server URL." />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalServerURL">
                    <Col componentClass={ControlLabel} sm={2}>
                      Grant type
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Insert the grant type." />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalServerURL">
                    <Col componentClass={ControlLabel} sm={2}>
                     Authorization Password
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Insert the authorization password." />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit">
                        Add
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Box.Body>
            </Box>
          </Col>
        </div>
      </section>
    );
  }
}

export default ServerAdd;
