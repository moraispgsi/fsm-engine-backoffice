/* eslint-disable no-unused-vars */
import React from 'react';
import MainPanel from './MainPanel';
import MachineView from './MachineView';
import TreeView from "./TreeView";
import VersionView from './VersionView'
import SnapshotView from "./SnapshotView";
import ModelViewer from "./ModelViewer";
import ContainerDimensions from 'react-container-dimensions';
import {Col} from "react-bootstrap";
import SettingsPanel from "./Settings";
import swal from 'sweetalert2';
import InstanceView from "./InstanceView";
import HistoryView from "./HistoryView";

class ViewServer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selection: {
				type: 'none'
			},
			server: {
				name: 'INSTICC One',
				url: 'http://213.228.151.36:3011',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTB9.pEmirmwCl8E-cext0Tcqy1DJFerSpOm1nZPdotSWalE',
				dispatcher: {
					name: 'INSTICC',
					url: 'http://www.INSTICC.org/ace-dispatcher'
				}
			}
		};
	}

	addMachine() {
		swal({
			title: 'Add a new machine',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			showLoaderOnConfirm: true,
			preConfirm: (machine) => {
				return new Promise((resolve, reject) => {
					$.ajax({
						url: this.state.server.url + '/machine',
						headers: {
							authorization: 'JWT ' + this.state.server.token,
						},
						contentType: "application/json; charset=utf-8",
						data: JSON.stringify({
							name: machine
						}),
						method: 'POST',
						success: (data) => {
							this.treeView.loadManifest();
							resolve();
						},
						error: (error) => {
							reject(JSON.stringify(error));
						}
					});
				})
			},
			allowOutsideClick: false
		}).then(function (machine) {
			swal({
				type: 'success',
				title: `Machine ${machine} was successfully created!`,
			})
		})
	}

	onSelectMachine(machine) {
		this.state.selection = {
			type: 'machine',
			machine,
		};
		this.setState(this.state);
	}

	onSelectVersion(machine, versionKey) {
		this.state.selection = {
			type: 'version',
			machine,
			versionKey,
		};
		this.setState(this.state);
	}

	onSelectInstance(machine, versionKey, instanceKey) {
		this.state.selection = {
			type: 'instance',
			machine,
			versionKey,
			instanceKey,
		};
		this.setState(this.state);
	}

	onSelectSnapshot(machine, versionKey, instanceKey, snapshotKey) {
		this.state.selection = {
			type: 'instance',
			machine,
			versionKey,
			instanceKey,
			snapshotKey,
		};
		this.setState(this.state);
	}

	refreshTree() {
		if(this.treeView) {
			this.treeView.loadManifest();
		}
	}

	render() {
		return (
				<div style={{paddingBottom: '20px'}}>

					{/* Breadcrumbs navigation bar */}
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


					<div className="wrapper wrapper-content">
						<div className="row">

							{/* TABS */}
							<div className="tabs-container">
								<ul className="nav nav-tabs">
									<li className="active"><a data-toggle="tab" href="#main-panel"> <i className="fa fa-info"/>
										Information</a>
									</li>
									<li className=""><a data-toggle="tab" href="#browse-panel"><i className="fa fa-desktop"/> Browse</a>
									</li>
									<li className=""><a data-toggle="tab" href="#repl-panel"><i className="fa fa-terminal"/> REPL</a>
									</li>
									<li className=""><a data-toggle="tab" href="#repository-panel"><i className="fa fa-git"/>
										Repository</a>
									</li>
									<li className=""><a data-toggle="tab" href="#settings-panel"><i className="fa fa-cog"/> Settings</a>
									</li>
								</ul>
								<div className="tab-content">

									{/* MAIN Tab */}
									<div id="main-panel" className="tab-pane active">
										<div className="panel-body col-md-12">
											<MainPanel server={this.state.server}/>
										</div>
									</div>

									{/* TreeView */}
									<div id="browse-panel" className="tab-pane">
										<div className="panel-body">


											<ContainerDimensions>
												{({height}) => (
														<div>
															<div className="col-lg-3">
																<div className="ibox float-e-margins">
																	<div className="ibox-content" style={{border: 'none'}}>
																		<div className="file-manager">
																			<h5>Show:</h5>
																			<a href="#" className="file-control active">All</a>
																			<a href="#" className="file-control">Sealed</a>
																			<a href="#" className="file-control">Not Sealed</a>

																			<div className="hr-line-dashed"/>
																			<button className="btn btn-primary btn-block" onClick={() => this.addMachine()}>
																				Add machine
																			</button>
																			<div className="hr-line-dashed"/>

																			<h5>Machines</h5>

																			<TreeView ref={(ref) => {this.treeView = ref}}
																								server={this.state.server}
																								onSelectMachine={this.onSelectMachine.bind(this)}
																								onSelectVersion={this.onSelectVersion.bind(this)}
																								onSelectInstance={this.onSelectInstance.bind(this)}
																								onSelectSnapshot={this.onSelectSnapshot.bind(this)}
																			/>

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

															{/*<MachineView height={height}/>*/}
															{/*<SnapshotView height={height} />*/}
															{/*<ModelViewer height={height}/>*/}
															{
																(() => {
																	switch (this.state.selection.type) {
																		case 'machine':
																			return <MachineView server={this.state.server}
																													machine={this.state.selection.machine}
																													onSelectVersion={this.onSelectVersion.bind(this)}
																													refreshTree={this.refreshTree.bind(this)}
																			/>;
																		case 'version':
																			return <VersionView server={this.state.server}
																													machine={this.state.selection.machine}
																													versionKey={this.state.selection.versionKey}
																													onSelectMachine={this.onSelectMachine.bind(this)}
																													onSelectInstance={this.onSelectInstance.bind(this)}
																													refreshTree={this.refreshTree.bind(this)}
																			/>;
																		case 'instance':
																			return <InstanceView server={this.state.server}
																													machine={this.state.selection.machine}
																													versionKey={this.state.selection.versionKey}
																													instanceKey={this.state.selection.instanceKey}
																													onSelectMachine={this.onSelectMachine.bind(this)}
																													onSelectVersion={this.onSelectVersion.bind(this)}
																													refreshTree={this.refreshTree.bind(this)}
																			/>;
																		default:
																			return null
																	}
																})()
															}
														</div>
												)
												}

											</ContainerDimensions>
										</div>
									</div>

									{/* MAIN Tab */}
									<div id="repl-panel" className="tab-pane">
										<div className="panel-body col-md-12">
											<h2>Coming soon</h2>
										</div>
									</div>

									<div id="settings-panel" className="tab-pane">
										<div className="panel-body">
											<SettingsPanel />
										</div>
									</div>

									<div id="repository-panel" className="tab-pane">
										<div className="panel-body">
											<HistoryView server={this.state.server} />
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
