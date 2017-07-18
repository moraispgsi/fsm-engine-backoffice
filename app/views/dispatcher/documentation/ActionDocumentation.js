/* eslint-disable react/prefer-stateless-function,react/no-unescaped-entities,max-len,react/forbid-prop-types,no-restricted-syntax,react/no-unused-prop-types */
import React from 'react';

class ActionDocumentation extends React.Component {
  attributeTRArray() {
    const trArray = [];
    const argsOb = this.props.action.arguments;
    for (const argument of Object.keys(argsOb)) {
      trArray.push(
        <tr>
          <td>{argument}</td>
          <td>{argsOb[argument].type}</td>
          <td>{argsOb[argument].description}</td>
        </tr>,
      );
    }
    return trArray;
  }
  attributes() {
    let args = '';
    const argsOb = this.props.action.arguments;
    for (const argument of Object.keys(argsOb)) {
      args += ` ${argument}="${argsOb[argument].type}"`;
    }
    return args;
  }
  render() {
    return (
      <div>
        <h3><i className="fa fa-tag text-red" /> Action {this.props.action.name}</h3>
        {this.props.action.description}

        <h4>Data Api</h4>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.attributeTRArray()}
          </tbody>
        </table>

        <p>
          Add <code>{`<${this.props.abbr}:${this.props.action.name} ${this.attributes()}  \\>`}</code>
          to the markup and add the values to the respective attributes.
          To use dynamic data in the markup, append <code>expr</code> to the attribute name and capitalize the attribute.
        </p>
        <p>
          Example:
          <ul>
            <li>Attribute <code>name</code>.</li>
            <li>Usage: <code>exprName="foo"</code>.</li>
          </ul>
        </p>
      </div>
    );
  }
}

ActionDocumentation.defaultProps = {
  abbr: 'abbr',
  action: {},
};

ActionDocumentation.propTypes = {
  abbr: React.PropTypes.string.isRequired,
  action: React.PropTypes.object.isRequired,
};

export default ActionDocumentation;
