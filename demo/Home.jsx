import React from 'react';
// import { Box } from 'reactjs-admin-lte';
// import ReactAce from 'react-ace-editor';
// import Markdown from 'react-remarkable';
// import './Documentation.css';

// const readme = require('../README.md');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="skeleton" style={{ paddingTop: '25px' }}>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              Home
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
