/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import ModelViewer from "./ModelViewer";
import ContainerDimensions from 'react-container-dimensions';
import swal from 'sweetalert2';
import SnapshotView from "./SnapshotView";

class InstanceView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snapshots: []
		};
		this.loadInformation(this.props);
		this.getSnapshots(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.machine !== this.props.machine ||
				nextProps.versionKey !== this.props.versionKey ||
				nextProps.instanceKey !== this.props.instanceKey) {

			if(this.snashotView) {
				this.snashotView.setSnapshot({});
			}
			this.loadInformation(nextProps);
			this.getSnapshots(nextProps);
		}
	}

	getSnapshots(props) {

		$.ajax({
			url: `${props.server.url}/machine/${props.machine}/version/${props.versionKey}/instance/${props.instanceKey}/snapshot/keys`,
			headers: {
				authorization: 'JWT ' + props.server.token,
			},
			method: 'GET',
			success: (data) => {
				this.state.snapshots = data.snapshotsKeys.map((snapshotKey) => {
					return {
						snapshotKey
					}
				});
				this.setState(this.state);
			},
			failure: (error) => {
				console.log(error);
			}
		});
	}

	loadInformation(props) {
		console.log('Loading version information');
		if (this.loadInfoRequest) {
			this.loadInfoRequest.abort();
		}
		this.loadInfoRequest = $.ajax({
			url: `${props.server.url}/machine/${props.machine}/version/${props.versionKey}/instance/${props.instanceKey}/info`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'GET',
			success: (data) => {
				this.state.info = data;
				this.setState(this.state);
				this.loadInfoRequest = null;
				console.log("Info" + JSON.stringify(this.state.info));
				if (this.state.info.hasStarted) {
					if (this.interval) {
						clearInterval(this.interval);
					}
					this.interval = setInterval(() => this.getState(props), 1000);
					this.getState(props);
				}
			},
			failure: (error) => {
				console.log(error);
				this.loadInfoRequest = null;
			}
		});
	}

	getState(props) {
		$.ajax({
			url: `${props.server.url}/machine/${props.machine}/version/${props.versionKey}/instance/${props.instanceKey}/snapshot`,
			headers: {
				authorization: 'JWT ' + props.server.token,
			},
			method: 'GET',
			success: (data) => {
				if(this.snashotView) {
					this.snashotView.setSnapshot(data.snapshot);
				}
			},
			failure: (error) => {
				console.log(error);
			}
		});
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	sendEvent() {
		swal.setDefaults({
			input: 'text',
			confirmButtonText: 'Next &rarr;',
			showCancelButton: true,
			animation: false,
			progressSteps: ['1', '2']
		});

		let steps = [
			{
				title: 'Event',
				text: 'Insert the event name',
				input: 'text'
			},
			{
				title: 'Event data',
				text: 'Insert the event data in JSON format',
				input: 'textarea',
				preConfirm: function (json) {
					return new Promise(function (resolve, reject) {
						try {
							if (typeof JSON.parse(json) === 'object') {
								resolve();
							} else {
								reject('Invalid JSON Object');
							}
						} catch (err) {
							reject('Invalid JSON Object');
						}
					})
				},
			}
		];

		swal.queue(steps).then((result) => {
			swal.resetDefaults();
			let event = result[0];
			let eventData = JSON.parse(result[1]);
			console.log(event);
			$.ajax({
				url: `${this.props.server.url}/machine/${this.props.machine}/version/${this.props.versionKey}/instance/${this.props.instanceKey}/event`,
				headers: {
					authorization: 'JWT ' + this.props.server.token,
				},
				method: 'POST',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					event: event,
					data: eventData,
				}),
				success: (data) => {
					  swal(
								'Good job!',
								'The event was sent!',
								'success'
						)
				},
				error: (error) => {
					console.log(JSON.parse(error.responseText).message);
				}
			});
		});

	}

	start() {

		swal({
			type: 'info',
			html: `<div class="sk-spinner sk-spinner-cube-grid">
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			<div class="sk-cube"></div>
			</div>
			<h2>Saving!</h2>`,
			showConfirmButton: false,
		});

		$.ajax({
			url: `${this.props.server.url}/machine/${this.props.machine}
							/version/${this.props.versionKey}/instance/${this.props.instanceKey}/start`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'PUT',
			success: (data) => {
				swal.close();
				swal({
					type: 'success',
					title: 'Started successfully!',
				})
				this.loadInformation(this.props);
			},
			failure: (error) => {
				swal.close();
				swal({
					type: 'error',
					html: JSON.parse(error.responseText).message,
					title: 'Could start the instance!',
				})
			}
		});
	}


	goToMachine() {
		if (this.props.onSelectMachine) {
			this.props.onSelectMachine(this.props.machine);
		}
	}

	goToVersion() {
		if (this.props.onSelectVersion) {
			this.props.onSelectVersion(this.props.machine, this.props.versionKey);
		}
	}

	render() {
		return (
				<div className="col-lg-9 animated fadeInRight border-left"
						 style={{
							 borderStyle: 'dashed', padding: '15px 20px 20px 20px', minHeight: this.props.height - 41 + 'px',
							 borderRight: 'transparent', borderBottom: 'transparent', borderTop: 'transparent'
						 }}>
					<div className="row">
						<div className="col-lg-12">

							<div className="tabs-container">
								<ul className="nav nav-tabs">
									<li className="active"><a data-toggle="tab" href="#info-tab"> <i className="fa fa-info"/> info</a>
									</li>
									<li className=""><a data-toggle="tab" href="#snapshots-tab"> <i className="fa fa-laptop"/>
										snapshots</a>
									</li>
									<li className=""><a data-toggle="tab" href="#state-tab"> <i className="fa fa-laptop"/>
										state</a>
									</li>
								</ul>
								<div className="tab-content">

									<div id="info-tab" className="tab-pane active">

										<div className="panel-body col-md-12">

											<h2 className="font-bold m-b-xs">
												Instance {this.props.instanceKey.charAt(this.props.instanceKey.length - 1)}
												<small className="text-muted"> {this.props.machine} -
													version {this.props.versionKey.charAt(this.props.versionKey.length - 1)}
												</small>

											</h2>
											<small>Created at 20<sup>th</sup>, September 2017</small>

											<div className="hr-line-dashed"/>

											<dl className="small m-t-md">
												<dt>Status</dt>
												{/*add state ready*/}
												{
													this.state.info && this.state.info.hasStarted ?
															<dd>This instance is currently <span className="text-navy">running</span>
															</dd>
															:
															<dd>This version is currently <span className="text-navy">stopped</span>
															</dd>

												}
												<dd>The instance is running since <span className="text-navy">22, September 2017</span></dd>
												<dt>Snapshots</dt>
												<dd>There were taken <span className="text-navy">13</span> snapshots</dd>
											</dl>
											<hr />

											<div>
												<div className="btn-group">
													{
														(() => {

															if (!this.state.info || this.state.info.hasEnded) {
																return null;
															}

															if (!this.state.info.hasStarted ||
																	this.state.info.hasStarted && this.state.info.hasStopped) {
																return (
																		<button className="btn btn-primary btn-sm" onClick={() => this.start()}>
																			<i className="fa fa-play"/> Start
																		</button>
																)
															} else {
																return (
																		[
																			<button className="btn btn-primary btn-sm" onClick={() => this.stop()}>
																				<i className="fa fa-stop"/> Stop
																			</button>,
																			<button className="btn btn-sm btn-white " onClick={() => this.sendEvent()}>
																				<i className="fa fa-envelope-o"/> Send Event
																			</button>
																		]
																)

															}

														})()
													}
													<button className="btn btn-white btn-sm" onClick={() => this.goToMachine()}>
														<i className="fa fa-chevron-up"/> machine
													</button>
													<button className="btn btn-white btn-sm" onClick={() => this.goToVersion()}>
														<i className="fa fa-chevron-up"/> version
													</button>
												</div>
											</div>

										</div>

									</div>

									<div id="snapshots-tab" className="tab-pane">
										<div className="panel-body col-md-12" style={{minHeight: this.props.height - 100 + 'px'}}>
											<h4 className="font-bold m-b-xs">
												Instances
											</h4>
											<small>List of all the snapshots of the <span
													className="text-navy">{this.props.instanceKey}</span> of the <span
													className="text-navy">{this.props.versionKey}</span> in the
												<span className="text-navy"> keynote</span> machine
											</small>
											<hr />
											{
												this.state.snapshots.map((snapshot, index) => {

													return (<div id={'file-box' + index} className="file-box" key={index} onMouseEnter={() => {
														$('#file-box' + index).removeClass('animated pulse');
														window.setTimeout(() => {
															$('#file-box' + index).addClass('animated pulse');
														}, 20);
													}}>
														<div className="file">
															<span className="corner"/>
															<div className="icon">
																<i className="fa fa-file-text"
																	 style={{color: 'f8ac59'}}/>
															</div>
															<div className="file-name">
																{snapshot.snapshotKey}
																<br />
																<small>Added: Jan 11, 2014</small>
															</div>
														</div>
													</div>)
												})
											}
										</div>
									</div>

									<div id="state-tab" className="tab-pane">
										<div className="panel-body col-md-12" style={{minHeight: this.props.height - 100 + 'px'}}>
											<SnapshotView ref={(ref) => this.snashotView = ref}/>
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

export default InstanceView;