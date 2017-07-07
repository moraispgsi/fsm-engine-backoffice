/* eslint-disable no-alert */
import React from 'react';
// import tinycolor from 'tinycolor2';

import pkgInfo from '../package.json';
import {
  Dashboard,
  Header,
  Sidebar,
} from '../src/index';

const navMenu = () => ([
  <Header.Item
    href={`https://github.com/${pkgInfo.user}/${pkgInfo.name}`}
    iconClass="fa fa-github"
    key="1"
    title="Github"
  />,
  <Header.UserMenu
    name="Ricardo Morais"
    image="public/user2-160x160.jpg"
    profileAction={() => alert('Access profile')}
    signOutAction={() => alert('Sign out')}
    key="2"
  />,
]);

const sb = pickTheme => ([
  <Sidebar.UserPanel
    name="Alexander Pierce"
    image="public/user2-160x160.jpg"
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
        <Sidebar.Menu.Item title="Machine Deadline" icon={{ className: 'fa-cube' }} >
          <Sidebar.Menu.Item title="Version 1" icon={{ className: 'fa-file-code-o' }}>
            <Sidebar.Menu.Item title="Instances 1" icon={{ className: 'fa-bolt' }} />
            <Sidebar.Menu.Item title="Instances 2" icon={{ className: 'fa-bolt' }} />
            <Sidebar.Menu.Item title="Instances 3" icon={{ className: 'fa-bolt' }} />
          </Sidebar.Menu.Item>
        </Sidebar.Menu.Item>
      </Sidebar.Menu.Item>
      <Sidebar.Menu.Item
        icon={{ className: 'fa-globe' }}
        onClick={() => pickTheme('skin-black')}
        title="Server INSTICC Two"
      >
        <Sidebar.Menu.Item title="Machine Keynote" icon={{ className: 'fa-cube' }} >
          <Sidebar.Menu.Item title="Version 1" icon={{ className: 'fa-file-code-o' }}>
            <Sidebar.Menu.Item title="Instances 1" icon={{ className: 'fa-bolt' }} />
          </Sidebar.Menu.Item>
        </Sidebar.Menu.Item>
      </Sidebar.Menu.Item>
    </Sidebar.Menu.Item>
  </Sidebar.Menu>,
]);

const footer = () => ([
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

const App = ({ children, theme, pickTheme }) => (
  <Dashboard
    navbarChildren={navMenu()}
    sidebarChildren={sb(pickTheme)}
    footerChildren={footer()}
    sidebarMini
    theme={theme}
  >
    {children}
  </Dashboard>
);

App.propTypes = {
  children: React.PropTypes.node,
  pickTheme: React.PropTypes.func,
  theme: React.PropTypes.string,
};

export default App;
