/* eslint-disable react/no-unescaped-entities,no-trailing-spaces,max-len,no-restricted-syntax */
import React from 'react';
import NamespaceDocumentation from './NamespaceDocumentation';
// import ActionDocumentation from './ActionDocumentation';

class DispatcherDocumentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatcherName: 'INSTICC',
      // Dummy services(Needs to be requested to the action dispatcher)
      services: {
        'http://www.insticc.org/cms': {
          abbreviation: 'cms',
          actions: {
            changeView: {
              arguments: {
                name: {
                  type: 'string',
                  description: 'The name of the website',
                },
                id: {
                  type: 'string',
                  description: 'The id of the component to change the visibility',
                },
                view: {
                  type: 'string',
                  description: 'The view identifier',
                },
              },
              description: 'This action is used to change the view of a component in a website.',
            },
            changeVisibility: {
              arguments: {
                name: {
                  type: 'string',
                  description: 'The name of the website',
                },
                id: {
                  type: 'string',
                  description: 'The id of the component to change the visibility',
                },
                visibility: {
                  type: 'boolean',
                  description: 'The boolean value for the component visibility',
                },
              },
              description: 'This action is used to change the visibility of a component in a website.',
            },
          },
        },
        'http://www.insticc.org/ddm': { abbreviation: 'ddm', actions: {} },
        'http://www.insticc.org/hermes': { abbreviation: 'hermes', actions: {} },
      },
    };
  }
  servicesDocumentation() {
    const namespaces = Object.keys(this.state.services);
    const result = [];
    for (const ns of namespaces) {
      result.push(<NamespaceDocumentation namespace={ns} data={this.state.services[ns]} />);
    }
    return result;
  }
  render() {
    return (
      <header className="content-header container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="content-max-width">Documentation {this.state.dispatcherName} dispatcher</h1>
            <div className="content container-fluid">
              <div className="row">
                <div className="col-lg-8">
                  <div className="content-max-width">
                    {
                      this.servicesDocumentation()
                    }
                    <footer>
                      <div className="callout callout-info">
                        <h4>Note</h4>
                        <p>This documentation was generated automatically</p>
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default DispatcherDocumentation;
