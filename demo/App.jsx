/* eslint-disable no-alert,class-methods-use-this */
import React from 'react';
// import tinycolor from 'tinycolor2';
//
//
import pkgInfo from '../package.json';
import {
  Dashboard,
  Header,
  Sidebar,
} from '../src/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Dashboard
        navbarChildren={this.navMenu()}
        sidebarChildren={this.sb(this.props.pickTheme)}
        footerChildren={this.footer()}
        sidebarMini
        theme={this.props.theme}
      >
        {this.props.children}
      </Dashboard>
    );
  }
  navMenu() {
    return ([
      <Header.Item
        href={`https://github.com/${pkgInfo.user}/${pkgInfo.name}`}
        iconClass="fa fa-github"
        key="1"
        title="Github"
      />,
      <Header.UserMenu
        name="Ricardo Morais"
        image="/public/perfil.png"
        profileAction={() => alert('Access profile')}
        signOutAction={() => alert('Sign out')}
        key="2"
      />,
    ]);
  }
  sb(pickTheme) {
    return ([
      <Sidebar.UserPanel
        name="Ricardo Morais"
        image="/public/perfil.png"
        online
        key="1"
      />,
      <Sidebar.Search key="2" />,
      <Sidebar.Menu header="MAIN NAVIGATION" key="3">
        <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Dashboard" />
        <Sidebar.Menu.Item icon={{ className: 'fa-server' }} title="Servers" >
          <Sidebar.Menu.Item
            icon={{ className: 'fa-globe' }}
            onClick={() => pickTheme('skin-black')}
            title="Server INSTICC One"
          >
            <Sidebar.Menu.Item title="Machine Deadline" icon={{ className: 'fa-file' }} >
              <Sidebar.Menu.Item title="Version 1" icon={{ className: 'fa-file-code-o' }} />
            </Sidebar.Menu.Item>
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item
            icon={{ className: 'fa-globe' }}
            onClick={() => pickTheme('skin-black')}
            title="Server INSTICC Two"
          >
            <Sidebar.Menu.Item title="Machine Keynote" icon={{ className: 'fa-file' }} >
              <Sidebar.Menu.Item title="Version 1" icon={{ className: 'fa-file-code-o' }} />
            </Sidebar.Menu.Item>
          </Sidebar.Menu.Item>
        </Sidebar.Menu.Item>
        <Sidebar.Menu.Item icon={{ className: 'fa-exchange' }} title="Actions dispatchers" >
          <Sidebar.Menu.Item
            icon={{ className: 'fa-globe' }}
            onClick={() => pickTheme('skin-black')}
            title="Dispatcher ACE.js"
          >
            <Sidebar.Menu.Item title="http://insticc.org/cms" icon={{ className: 'fa-hashtag' }} />
            <Sidebar.Menu.Item title="http://insticc.org/ddm" icon={{ className: 'fa-hashtag' }} />
          </Sidebar.Menu.Item>
        </Sidebar.Menu.Item>
      </Sidebar.Menu>,
    ]);
  }
  footer() {
    return ([
      <strong>
        <span>Copyright © 2014-2016 </span>
        <a href="http://almsaeedstudio.com">Almsaeed Studio</a>
        <span>. </span>
      </strong>,
      <span> All rights reserved.</span>,
      <div style={{ float: 'right' }}>
        <b>Version</b>
        <span> 2.3.8</span>
      </div>,
    ]);
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  pickTheme: React.PropTypes.func,
  theme: React.PropTypes.string,
};

export default App;
