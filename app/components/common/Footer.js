import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="pull-right">
                  <a href="https://github.com/moraispgsi/fsm-engine">
                    <i className="fa fa-github fa-2x"/></a>
                </div>
                <div>
                    <strong>Copyright</strong> INSTICC &copy; {new Date().getFullYear()}
                </div>
            </div>
        )
    }
}

export default Footer