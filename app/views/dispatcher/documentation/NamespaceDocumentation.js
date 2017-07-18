/* eslint-disable react/prefer-stateless-function,react/no-unescaped-entities,max-len,no-restricted-syntax,react/forbid-prop-types,react/no-unused-prop-types */
import React from 'react';
import ActionDocumentation from './ActionDocumentation';

class NamespaceDocumentation extends React.Component {
  servicesDocumentation() {
    const result = [];
    for (const actionName of Object.keys(this.props.data.actions)) {
      const action = this.props.data.actions[actionName];
      action.name = actionName;
      result.push((
        <div>
          <ActionDocumentation abbr={this.props.data.abbreviation} action={action} />
        </div>
      ));
    }
    return result;
  }
  render() {
    return (
      <section id="js-tree">
        <h2 className="link"><i className="fa fa-hashtag text-aqua" /> {this.props.data.abbreviation.toUpperCase()} </h2>
        <div className="container-fluid">
          <h3>Usage</h3>
          <p>
            Add the namespace to the root <code>{'<scxml>'}</code> tag and give it an abbreviation. Example: <code>xmlns:{this.props.data.abbreviation}="{this.props.namespace}"</code>
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
  data: [],
  namespace: 'Undefined',
};

NamespaceDocumentation.propTypes = {
  data: React.PropTypes.object,
  namespace: React.PropTypes.string,
};

export default NamespaceDocumentation;
