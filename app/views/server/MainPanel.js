/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import {Box} from 'reactjs-admin-lte';
import {Col} from 'react-bootstrap';

class MainPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			machines: 8,
			versions: 344,
			instances: 1235,
			snapshots: 32523,
		};
	}

	render() {
		return (
				<Col sm={12} md={12}>

					<div className="row">
						<div className="col-lg-12">

							<div className="row">

								<div className="col-md-6">

									<h2 className="font-bold m-b-xs">
										INSTICC One server
									</h2>
									<small>Created at 21<sup>st</sup>, September 2017</small>

									<hr />

									<h4>Description</h4>

									<div className="small text-muted">
										It is a long established fact that a reader will be distracted by the readable
										content of a page when looking at its layout. The point of using Lorem Ipsum is

										<br/>
										<br/>
										There are many variations of passages of Lorem Ipsum available, but the majority
										have suffered alteration in some form, by injected humour, or randomised words
										which don't look even slightly believable.
									</div>
									<dl className="small m-t-md">
										<dt>Location</dt>
										<dd>The <span className="text-navy">INSTICC One</span> server is located at
											<span className="text-navy"> {this.props.server.url}</span></dd>
										<dt>Token</dt>
										<dd>Using the
											<span> </span><code className="text-navy" style={{whiteSpace: 'normal'}}>
												{this.props.server.token}
											</code> JWT token to connect to the server.
										</dd>
										<dt>Dispatcher</dt>
										<dd>The server is linked to the <span className="text-navy">{this.props.server.dispatcher.name}</span> dispatcher.</dd>

										<dt>Machines</dt>
										<dd>There are <span className="text-navy">{this.state.machines}</span> machines in the server.</dd>
										<dt>Versions</dt>
										<dd>The server has a total of <span className="text-navy">{this.state.versions}</span> versions.</dd>
										<dt>Instances</dt>
										<dd>There are <span className="text-navy">{this.state.instances}</span> instances in the server.</dd>
										<dt>Snapshots</dt>
										<dd>There were taken <span className="text-navy">{this.state.snapshots}</span> snapshots until today.</dd>
									</dl>
									<hr />

									<div>
										<div className="btn-group">
											<button className="btn btn-primary btn-sm"><i className="fa fa-stop"></i> Stop
											</button>
											<button className="btn btn-primary btn-sm"><i className="fa fa-play"></i> Resume
											</button>
											<button className="btn btn-white btn-sm"><i className="fa fa-edit"></i> Change description
											</button>
											<button className="btn btn-white btn-sm"><i className="fa fa-download"></i> Download backup
											</button>
										</div>
									</div>



								</div>

								<div className="col-md-6">
									<h2>Some graphics here coming soon</h2>
								</div>
							</div>

						</div>

					</div>

				</Col>
		)
				;
	}

}

export default MainPanel;