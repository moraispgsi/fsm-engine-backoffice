/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import $ from 'jquery';
import swal from 'sweetalert2';

class MachineView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			versions: []
		};
		this.getVersions(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.machine !== this.props.machine) {
			this.getVersions(props);
		}
	}

	getVersions(props) {

		$.ajax({
			url: props.server.url + '/machine/' + props.machine + '/version/keys',
			headers: {
				authorization: 'JWT ' + props.server.token,
			},
			method: 'GET',
			success: (data) => {
				console.log(data);
				this.state.versions = data.versionsKeys.map((versionKey) => {
					return {
						versionKey
					}
				});
				this.setState(this.state);
			},
			error: (error) => {
				console.log(error);
			}
		});

	}

	onSelectVersion(versionKey) {
		if(this.props.onSelectVersion) {
			this.props.onSelectVersion(this.props.machine, versionKey);
		}
	}

	addVersion() {

		swal({
			type: 'info',
			title: 'Adding a new version!',
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
			`,
			showConfirmButton: false,
		});

		$.ajax({
			url: `${this.props.server.url}/machine/${this.props.machine}/version`,
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'POST',
			success: (data) => {
				swal.close();
				swal({
					type: 'success',
					title: 'Saved successfully!',
				});
				this.props.refreshTree();
				this.onSelectVersion(data.versionKey);
			},
			error: (error) => {
				swal.close();
				swal({
					type: 'error',
					html: JSON.parse(error.responseText).message,
					title: 'Could not add a new version!',
				})
			}
		});
	}

	render() {
		return (
				<div className="col-lg-9 animated fadeInRight border-left"
						 style={{
							 borderStyle: 'dashed', padding: '15px 20px 20px 20px', height: this.props.height - 41 + 'px',
							 borderRight: 'transparent', borderBottom: 'transparent', borderTop: 'transparent'
						 }}>
					<div className="row">
						<div className="col-lg-12">

									<div className="tabs-container">
										<ul className="nav nav-tabs">
											<li className="active"><a data-toggle="tab" href="#view-1"> <i className="fa fa-info"/> info</a>
											</li>
											<li className=""><a data-toggle="tab" href="#view-2"> <i className="fa fa-laptop"/> versions</a>
											</li>
										</ul>
										<div className="tab-content">

									<div id="view-1" className="tab-pane active">

										<div className="panel-body col-md-12" style={{height: this.props.height - 100 + 'px'}}>

											<div className="row">
												<div className="col-lg-12">


													<div className="row">
														<div className="col-md-5">

															<div>
																<img src="/img/Keynote.png" alt="..." className="img-responsive" />

															</div>

														</div>
														<div className="col-md-7">

															<h2 className="font-bold m-b-xs">
																{this.props.machine.charAt(0).toUpperCase() + this.props.machine.slice(1)} machine
															</h2>
															<small>Created at 20<sup>th</sup>, September 2017</small>

															<hr />

															<h4>Machine description</h4>

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
																<dt>Versions</dt>
																<dd>The keynote machine has in total <span className="text-navy" >3</span> version.</dd>
																<dt>Instances</dt>
																<dd>There are <span className="text-navy" >325</span> instances of this machines</dd>
																<dt>Snapshots</dt>
																<dd>There were taken <span className="text-navy" >1516</span> snapshots</dd>
															</dl>
															<hr />

															<div>
																<div className="btn-group">
																	<button className="btn btn-primary btn-sm" onClick={()=>this.addVersion()}>
																		<i className="fa fa-plus"></i> Add version
																	</button>
																	<button className="btn btn-white btn-sm"><i className="fa fa-edit"></i> Change description
																	</button>
																	<button className="btn btn-white btn-sm"><i className="fa fa-download"></i> Latest sealed version
																	</button>
																</div>
															</div>

														</div>
													</div>

												</div>

											</div>

										</div>
									</div>

									<div id="view-2" className="tab-pane" >
										<div className="panel-body col-md-12" style={{height: this.props.height - 100 + 'px'}}>
											{
												this.state.versions.map((version, index) => {

													return (<div id={'file-box' + index} onClick={() => this.onSelectVersion(version.versionKey)}
																			 className="file-box" key={index} onMouseEnter={() => {
														$('#file-box' + index).removeClass('animated pulse');
														window.setTimeout(() => {
															$('#file-box' + index).addClass('animated pulse');
														}, 20);
													}}>
														<div className="file">
																<span className="corner"/>
																<div className="icon">
																	<i className="fa fa-file-code-o"/>
																</div>
																<div className="file-name">
																	{version.versionKey}
																	<br />
																	<small>Added: Jan 11, 2014</small>
																</div>
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
		)
	}

}

export
default
MachineView;