/* eslint-disable react/prefer-stateless-function,react/no-unescaped-entities,max-len,no-restricted-syntax,react/forbid-prop-types */
import React from 'react';
import ActionDocumentation from './ActionDocumentation';

class NamespaceDocumentation extends React.Component {
  servicesDocumentation() {
    const result = [];
    for (const action of this.props.services) {
      result.push((
        <div>
          <ActionDocumentation action={action} />
        </div>
      ));
    }
    return result;
  }
  render() {
    return (
      <section id="js-tree">
        <h2 className="link"><i className="fa fa-hashtag text-aqua" /> {this.props.namespace}</h2>
        <div className="container-fluid">
          <h3>Usage</h3>
          <p>
            Add the namespace to the root <code>{'<scxml>'}</code> tag and give it an abbreviation. Example: <code>xmlns:nsAbbr="{this.props.namespace}"</code>
          </p>
          {
            this.servicesDocumentation()
          }
        </div>
      </section>
    );
  }
}

NamespaceDocumentation.defaultProps = {
  services: [],
  namespace: 'Undefined',
};

NamespaceDocumentation.propTypes = {
  services: React.PropTypes.array,
  namespace: React.PropTypes.string,
};

export default NamespaceDocumentation;
