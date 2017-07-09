import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Box } from 'reactjs-admin-lte';
// import Markdown from 'react-remarkable';

// import './Documentation.css';

// const readme = require('../README.md');
class DispatcherAdd extends React.Component {
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
                <Box.Title>Add dispatcher </Box.Title>
              </Box.Header>
              <Box.Body>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalDisplayName">
                    <Col componentClass={ControlLabel} sm={2}>
                      Name
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Insert the name that will be displayed." />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalServerURL">
                    <Col componentClass={ControlLabel} sm={2}>
                      URL
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Insert the action dispatcher URL." />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit">
                        Add
                      </Button>
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
                </Form>
              </Box.Body>
            </Box>
          </Col>
        </div>
      </section>
    );
  }
}

export default DispatcherAdd;
