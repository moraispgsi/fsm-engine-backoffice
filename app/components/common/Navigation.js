import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link, Location} from 'react-router';

class Navigation extends Component {

	componentDidMount() {
		const {menu} = this.refs;
		$(menu).metisMenu();
	}

	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	}

	secondLevelActive(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
	}

	render() {
		return (
				<nav className="navbar-default navbar-static-side" role="navigation">
					<ul className="nav metismenu" id="side-menu" ref="menu">
						<li className="nav-header">
							<div className="dropdown profile-element"> <span>
                             </span>
								<a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Ricardo Morais</strong>
                             </span> <span className="text-muted text-xs block">Administrator
															<strong className="caret"></strong></span> </span> </a>
								<ul className="dropdown-menu animated fadeInRight m-t-xs">
									<li><a href="#"> Logout</a></li>
								</ul>
							</div>
							<div className="logo-element">
								SC+
							</div>
						</li>
						<li className={this.activeRoute("/server")}>
							<a href="#">
								<i className="fa fa-server"/>
								<span className="nav-label">Servers</span>
								<span className="fa arrow"/>
							</a>
							<ul className="nav nav-second-level">
								<li className={this.activeRoute("/server1")}>
									<Link to="/server"><i className="fa fa-globe"></i>
										<span className="nav-label">INSTICC One</span></Link>
								</li>
								<li className={this.activeRoute("/server2")}>
									<Link to="/server"><i className="fa fa-globe"></i>
										<span className="nav-label">INSTICC Two</span></Link>
								</li>
							</ul>

						</li>

					</ul>

				</nav>
		)
	}
}

export default Navigation