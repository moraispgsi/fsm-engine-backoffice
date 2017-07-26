/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import ModelViewer from "./ModelViewer";
import ContainerDimensions from 'react-container-dimensions';
import swal from 'sweetalert2';

class VersionView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			machineDescription: `
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
			`,
			versionDescription: `
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
			`,
			instances: []
		};
		this.loadInformation(this.props);
		this.loadModel(this.props);
		this.getInstances(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.machine !== this.props.machine ||
				nextProps.versionKey !== this.props.versionKey) {
			this.loadInformation(nextProps);
			this.loadModel(nextProps);
			this.getInstances(nextProps);
		}
	}

	getInstances(props) {

		$.ajax({
			url: `${props.server.url}/machine/${props.machine}/version/${props.versionKey}/instance/keys`,
			headers: {
				authorization: 'JWT ' + props.server.token,
			},
			method: 'GET',
			success: (data) => {
				this.state.instances = data.instancesKeys.map((instanceKey) => {
					return {
						instanceKey
					}
				});
				this.setState(this.state);
			},
			error: (error) => {
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
			url: `${props.server.url}/machine/${props.machine}/version/${props.versionKey}/info`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'GET',
			success: (data) => {
				this.state.info = data;
				this.setState(this.state);
				this.loadInfoRequest = null;
			},
			error: (error) => {
				console.log(error);
				this.loadInfoRequest = null;
			}
		});
	}

	loadModel(props) {
		console.log(`Loading version's model`);
		if (this.loadModelRequest) {
			this.loadModelRequest.abort();
		}

		console.log(`${props.server.url}/machine/${props.machine}/version/${props.versionKey}/model`);
		this.loadModelRequest = $.ajax({
			url: `${props.server.url}/machine/${props.machine}/version/${props.versionKey}/model`,
			headers: {
				authorization: 'JWT ' + props.server.token,
			},
			method: 'GET',
			success: (data) => {
				console.log("here: " + data.model);
				this.state.model = data.model;
				this.setState(this.state);
				this.loadModelRequest = null;
			},
			error: (error) => {
				console.log(error);
				this.loadModelRequest = null;
			}
		});
	}

	changeMachineDescription() {
		swal({
			title: "Machine description",
			text: "Change the machine description:",
			input: 'textarea',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			inputValue: this.state.machineDescription,
			inputPlaceholder: "Write something",
			preConfirm: function (inputValue) {
				return new Promise(function (resolve, reject) {

					if (inputValue === "") {
						reject('You need to write something!');
						return;
					}
					setTimeout(function () {
						resolve()
					}, 2000)
				})
			},
		}).then((inputValue) => {
			console.log(inputValue);
			this.state.machineDescription = inputValue;
			this.setState(this.state);
			swal("Nice!", "The description was successfully changed.", "success");
		});
	}

	changeVersionDescription() {
		swal({
			title: "Version description",
			text: "Change the version description:",
			input: 'textarea',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			inputValue: this.state.machineDescription,
			inputPlaceholder: "Write something",
			preConfirm: function (inputValue) {
				return new Promise(function (resolve, reject) {

					if (inputValue === "") {
						reject('You need to write something!');
						return;
					}
					setTimeout(function () {
						resolve()
					}, 2000)
				})
			},
		}).then((inputValue) => {
			console.log(inputValue);
			this.state.versionDescription = inputValue;
			this.setState(this.state);
			swal("Nice!", "The description was successfully changed.", "success");
		});
	}

	static download(filename, text) {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	downloadVersion() {

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
			<h2>Downloading!</h2>`,
			showConfirmButton: false,
		});

		setTimeout(() => {
			// reject('This email is already taken.')
			VersionView.download('version1.xml', this.modelViewer.state.model);
			swal.close();
			swal({
				type: 'success',
				title: 'Downloaded successfully!',
			})
		}, 2000)
	}

	saveVersion() {

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
			url: `${this.props.server.url}/machine/${this.props.machine}/version/${this.props.versionKey}/model`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'PUT',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				model: this.modelViewer.state.model
			}),
			success: (data) => {
				swal.close();
				swal({
					type: 'success',
					title: 'Saved successfully!',
				})
			},
			error: (error) => {
				swal.close();
				swal({
					type: 'error',
					html: JSON.parse(error.responseText).message,
					title: 'Could not save the version!',
				})
			}
		});

	}

	seal() {

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
			<h2>Sealing the version!</h2>`,
			showConfirmButton: false,
		});

		$.ajax({
			url: `${this.props.server.url}/machine/${this.props.machine}/version/${this.props.versionKey}/seal`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'PUT',
			success: (data) => {
				console.log(data);
				this.state.info.isSealed = true;
				this.setState(this.state);
				swal({
					type: 'success',
					title: 'Sealed successfully!',
				})
			},
			error: (error) => {
				swal.close();
				swal({
					type: 'error',
					html: JSON.parse(error.responseText).message,
					title: 'Could not seal the version!',
				})
			}
		});

	}

	instantiate() {

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
			<h2>Instantiating the version!</h2>`,
			showConfirmButton: false,
		});

		$.ajax({
			url: `${this.props.server.url}/machine/${this.props.machine}/version/${this.props.versionKey}/instance`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'POST',
			success: (data) => {
				swal({
					type: 'success',
					title: 'Version was successfully instantiated!',
				});
				this.onSelectInstance(data.instanceKey);
				this.props.refreshTree();
			},
			error: (error) => {
				swal.close();
				swal({
					type: 'error',
					html: JSON.parse(error.responseText).message,
					title: 'Could not seal the version!',
				})
			}
		});
	}

	goToMachine() {
		if (this.props.onSelectMachine) {
			this.props.onSelectMachine(this.props.machine);
		}
	}

	onSelectInstance(instanceKey) {
		if(this.props.onSelectInstance) {
			this.props.onSelectInstance(this.props.machine, this.props.versionKey, instanceKey);
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
									<li className=""><a data-toggle="tab" href="#instances-tab"> <i className="fa fa-laptop"/>
										instances</a>
									</li>
									<li className=""><a data-toggle="tab" href="#model-tab"> <i className="fa fa-file-code-o"/>
										model</a>
									</li>
								</ul>
								<div className="tab-content">

									<div id="info-tab" className="tab-pane active">

										<div className="panel-body col-md-12">

											<h2 className="font-bold m-b-xs">
												{this.props.machine.charAt(0).toUpperCase() + this.props.machine.slice(1)} machine -
												version {this.props.versionKey.charAt(this.props.versionKey.length - 1)}
											</h2>
											<small>Created at 20<sup>th</sup>, September 2017</small>

											<div className="hr-line-dashed"/>

											<h4>Machine description</h4>

											<div className="small text-muted">
												{this.state.machineDescription}
											</div>
											<br/>
											<h4>Version description</h4>

											<div className="small text-muted">
												{this.state.versionDescription}
											</div>

											<dl className="small m-t-md">
												<dt>Status</dt>
												{
													this.state.info && this.state.info.isSealed ?
															<dd>This version is currently <span className="text-navy">sealed</span>,
																which means that the version can be instantiated. The version's model cannot be edited.
															</dd>
															:
															<dd>This version is currently <span className="text-navy">not sealed</span>,
																which means that the version cannot be instantiated until it is sealed. The version's
																model can be edited.
															</dd>
												}

												<dt>Instances</dt>
												<dd>There are <span className="text-navy">325</span> instances of this machines</dd>
												<dt>Snapshots</dt>
												<dd>There were taken <span className="text-navy">1516</span> snapshots</dd>
											</dl>
											<hr />

											<div>
												<div className="btn-group">
													{
														!this.state.info ? null :
																this.state.info.isSealed ?
																		<button className="btn btn-primary btn-sm" onClick={() => this.instantiate()}>
																			<i className="fa fa-bolt"/> Instantiate
																		</button> :
																		<button className="btn btn-primary btn-sm" onClick={() => this.seal()}>
																			<i className="fa fa-archive"/> Seal
																		</button>
													}
													<button className="btn btn-white btn-sm" onClick={() => this.goToMachine()}>
														<i className="fa fa-chevron-up"/> Machine
													</button>
													<button className="btn btn-white btn-sm"
																	onClick={() => this.changeMachineDescription()}>
														<i className="fa fa-edit"> </i> Machine description
													</button>
													<button className="btn btn-white btn-sm"
																	onClick={() => this.changeVersionDescription()}>
														<i className="fa fa-edit"> </i> Version description
													</button>
													<button className="btn btn-white btn-sm"
																	onClick={() => this.loadInformation()}>
														<i className="fa fa-refresh"/> Refresh
													</button>
													<button className="btn btn-white btn-sm"
																	onClick={() => this.downloadVersion()}>
														<i className="fa fa-download"></i> Download
													</button>
												</div>
											</div>

										</div>

									</div>

									<div id="instances-tab" className="tab-pane">
										<div className="panel-body col-md-12" style={{minHeight: this.props.height - 100 + 'px'}}>
											<h4 className="font-bold m-b-xs">
												Instances
											</h4>
											<small>List of all the instances of the <span className="text-navy">version1</span> in the
												<span className="text-navy"> keynote</span> machine
											</small>
											<hr />
											{
												this.state.instances.map((instance, index) => {

													return (<div id={'file-box' + index} className="file-box" key={index}
																			 onClick={()=>this.onSelectInstance(instance.instanceKey)} onMouseEnter={() => {
														$('#file-box' + index).removeClass('animated pulse');
														window.setTimeout(() => {
															$('#file-box' + index).addClass('animated pulse');
														}, 20);
													}}>
														<div className="file">
																<span className="corner"/>
																<div className="icon">
																	<i className="fa fa-bolt"
																		 style={{color: `#${instance.isRunning ? 'dadada' : 'f8ac59'}`}}/>
																</div>
																<div className="file-name">
																	{instance.instanceKey}
																	<br />
																	<small>Added: Jan 11, 2014</small>
																</div>
														</div>
													</div>)
												})
											}
										</div>
									</div>

									<div id="model-tab" className="tab-pane">
										<div className="panel-body ">
											<h4 className="font-bold m-b-xs">
												Model
											</h4>
											<small>{this.state.isSealed ? 'Presenting' : 'Editing'} the <span
													className="text-navy">{this.props.versionKey}</span> in the
												<span className="text-navy"> {this.props.machine}</span> machine
											</small>
											<hr />
											<div className="row col-md-12">
												<ModelViewer model={this.state.model} ref={(ref) => {
													this.modelViewer = ref
												}}/>
											</div>
											<div className="row col-md-12" style={{marginRight: '0px'}}>
												<hr />
											</div>

											<div className="btn-group">
												{
													!this.state.info ||
													this.state.info.isSealed ?
															null :
															<button className="btn btn-primary btn-sm"
																			onClick={() => {
																				this.saveVersion();
																			}}>
																<i className="fa fa-archive"/> Save
															</button>
												}
												<button className="btn btn-white btn-sm"><i className="fa fa-clipboard"/> Copy content
												</button>
												{
													!this.state.info ||
													this.state.info.isSealed ?
															null :
															<button className="btn btn-white btn-sm"><i className="fa fa-eraser"/> Erase content
															</button>
												}
												<button className="btn btn-white btn-sm"
																onClick={() => this.downloadVersion()}>
													<i className="fa fa-download"/> Download
												</button>
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

export
default
VersionView;