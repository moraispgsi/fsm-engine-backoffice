import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Box } from 'reactjs-admin-lte';
// import Markdown from 'react-remarkable';

// import './Documentation.css';

// const readme = require('../README.md');

const Documentation = () => (
  <div className="skeleton" style={{ paddingTop: '25px' }}>
    <section className="content">
      <div className="row">
        <Col sm={8} md={8} >
          <Box>
            <Box.Header>
              <Box.Title>Add Server</Box.Title>
            </Box.Header>
            <Box.Body>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Server URL
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Server URL" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Display name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Display name" />
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
  </div>
);

export default Documentation;
