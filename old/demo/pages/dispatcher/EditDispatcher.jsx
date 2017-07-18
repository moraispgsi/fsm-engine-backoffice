import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Box } from 'reactjs-admin-lte';

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
                <Box.Title>Edit dispatcher </Box.Title>
              </Box.Header>
              <Box.Body>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalDisplayName">
                    <Col componentClass={ControlLabel} sm={2}>
                      Name
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Insert the name that will be  displayed." />
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
                        Edit
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

export default DispatcherAdd;
