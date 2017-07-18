/* eslint-disable no-unused-vars */
import React from 'react';
import {Box} from 'reactjs-admin-lte';
import {Col} from 'react-bootstrap';


class ViewServer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			machineSelected: 'Machine3',
			server: {
				name: 'INSTICC One',
				url: 'http://www.INSTICC.org/engine1',
				dispatcher: {
					name: 'INSTICC',
					url: 'http://www.INSTICC.org/ace-dispatcher'
				},
				machines: [
					'Machine1',
					'Machine2',
					'Machine3',
					'Machine4',
					'Machine5',
					'Machine6',
					'Machine7',
					'Machine8',
				],
				displayVersions: [
					{
						versionKey: 'version1',
						createdAt: new Date(),
						isSealed: true,
					},
					{
						versionKey: 'version2',
						createdAt: new Date(),
						isSealed: true,
					},
					{
						versionKey: 'version3',
						createdAt: new Date(),
						isSealed: true,
					}
				]

			}

		};
	}

	select(machine) {
		this.state.machineSelected = machine;
		// Request the versions of the machine



		this.setState(this.state);
	}

	render() {
		return (
				<div>
					<div className="row border-bottom white-bg page-heading">
						<div className="col-lg-9">
							<h2>{this.state.server.name}</h2>
							<ol className="breadcrumb">
								<li>
									<a href="index.html">Home</a>
								</li>
								<li className="active">
									<strong>Server</strong>
								</li>
							</ol>
						</div>
					</div>
					<div className="wrapper wrapper-content animated ">
						<div className="row">

							<div className="tabs-container">
								<ul className="nav nav-tabs">
									<li className="active"><a data-toggle="tab" href="#tab-1"> <i className="fa fa-laptop"/></a>
									</li>
									<li className=""><a data-toggle="tab" href="#tab-2"><i className="fa fa-desktop"/></a>
									</li>
								</ul>
								<div className="tab-content">
									<div id="tab-1" className="tab-pane active">
										<div className="panel-body">

											<Col sm={12} md={12}>
												<div className="ibox float-e-margins" style={{border: 'none'}}>
													<div className="ibox-title" style={{border: 'none'}}>
														<h5>Server information</h5>
														<div className="ibox-tools">
															<a className="dropdown-toggle" data-toggle="dropdown" href="#"
																 aria-expanded="false">
																<i className="fa fa-wrench"/>
															</a>
															<ul className="dropdown-menu dropdown-user">
																<li><a href=""><i style={{marginRight: '4px'}} className="fa fa-edit"/>
																	Edit</a>
																</li>
																<li><a href=""><i style={{marginRight: '4px'}}
																									className="fa fa-unlink"/>
																	Unlink
																	dispatcher</a></li>
																<li><a href=""><i style={{marginRight: '4px'}} className="fa fa-link"/>
																	Link
																	dispatcher</a></li>
																<li><a href=""><i style={{marginRight: '4px'}} className="fa fa-git"/>
																	Repository</a></li>
																<li><a href=""><i style={{marginRight: '4px'}} className="fa fa-play"/>
																	Resume</a></li>
																<li><a href=""><i style={{marginRight: '4px'}} className="fa fa-stop"/>
																	Stop</a>
																</li>
															</ul>
														</div>
													</div>
													<div className="ibox-content">

														<table className="table">
															<thead>
															<tr>
																<th style={{width: '50%'}}>Name:</th>
																<td>{this.state.server.name}</td>
															</tr>
															</thead>
															<tbody>
															<tr>
																<th>URL</th>
																<td>
																	<i style={{marginRight: '4px'}} className="fa fa-globe"/>
																	{this.state.server.url}
																</td>
															</tr>
															<tr>
																<th>Dispatcher</th>
																<td><b>{this.state.server.dispatcher.name}</b>
																	<i style={{marginLeft: '6px', marginRight: '4px'}} className="fa fa-link"/>
																	{this.state.server.dispatcher.url}
																</td>
															</tr>
															</tbody>
														</table>

													</div>
												</div>

											</Col>

										</div>
									</div>
									<div id="tab-2" className="tab-pane">
										<div className="panel-body">

											<div className="col-lg-3">
												<div className="ibox float-e-margins">
													<div className="ibox-content" style={{border: 'none'}}>
														<div className="file-manager">
															<h5>Show:</h5>
															<a href="#" className="file-control active">All</a>
															<a href="#" className="file-control">Sealed</a>
															<a href="#" className="file-control">Not Sealed</a>
															<div className="hr-line-dashed"/>
															<button className="btn btn-primary btn-block">
																Add machine
															</button>
															<div className="hr-line-dashed"/>
															<h5>Machines</h5>
															<ul className="folder-list no-padding">
																{
																	this.state.server.machines.map((machine, index) => {
																		let icon = machine === this.state.machineSelected ? 'fa-folder-open' : 'fa-folder';
																		return (<li key={index}>
																			<a onClick={()=> this.select(machine)}><i className={`fa ${icon}`}/>{machine}</a>
																		</li>)
																	})
																}
															</ul>
															<h5 className="tag-title">Tags</h5>
															<ul className="tag-list no-padding">
																<li><a href="">Sealed</a></li>
																<li><a href="">Not Sealed</a></li>
															</ul>
															<div className="clearfix"/>
														</div>
													</div>
												</div>
											</div>

											<div className="col-lg-9 animated fadeInRight">
												<div className="row">
													<div className="col-lg-12">

														{
															this.state.server.displayVersions.map((version, index) => {

																return (<div className="file-box" key={index}>
																		<div className="file">
																			<a href="#">
																				<span className="corner"/>
																				<div className="icon">
																					<i className="fa fa-file-code-o"/>
																				</div>
																				<div className="file-name">
																					{version.versionKey}
																					<br />
																					<small>Added: Jan 11, 2014</small>
																				</div>
																			</a>
																		</div>
																</div>)

															})
														}

													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

		);
	}
}

export default ViewServer;
