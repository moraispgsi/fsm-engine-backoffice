/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import $ from 'jquery';
import 'jstree';
import request from 'browser-request';

class TreeView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.loadManifest();
	}

	loadManifest() {
		$.ajax({
			url: this.props.server.url + '/engine/manifest',
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'GET',
			success: (data) => {
				this.buildTree(this._machines(data.machines));
			}
		});

		// switch (response.statusCode) {
		// 	case 401:
		// 		console.log('Token is invalid, either change the token in the settings ' +
		// 				'(use the config command) or generate a new token ' +
		// 				'(use the token command).\n. To exit, type `exit`.');
		// 		break;
		// 	case 412:
		// 		console.log('Validation Error');
		// 		break;
	}

	buildTree(data) {
		$('#jstree_container').empty();
		$('#jstree_container').append(
				$('<div/>')
						.attr("id", "jstree")
		);

		this.jstree = $('#jstree').jstree({
			core: {
				check_callback: true,
				data: data,
			},
			plugins: ['types', 'changed'],
			types: {
				default: {
					icon: 'fa fa-folder',
					draggable: false,
				},
				machine: {
					icon: 'fa fa-cube'
				},
				version: {
					icon: 'fa fa-file-code-o'
				},
				instance: {
					icon: 'fa fa-bolt'
				},
				snapshot: {
					icon: 'fa fa-file-text-o'
				}
			}
		});
		if (this.jstree.on) {
			this.jstree.on("changed.jstree", function (e, data) {
				if (data.node.data && data.node.data.onSelect) {
					data.node.data.onSelect();
				}
			});
		}
	}

	onSelectMachine(machine) {
		if (this.props.onSelectMachine) {
			this.props.onSelectMachine(machine);
			console.log(`${machine}`);
		}
	}

	onSelectVersion(machine, versionKey) {
		if (this.props.onSelectVersion) {
			this.props.onSelectVersion(machine, versionKey);
			console.log(`${machine} ${versionKey}`);
		}
	}

	onSelectInstance(machine, versionKey, instanceKey) {
		if (this.props.onSelectInstance) {
			this.props.onSelectInstance(machine, versionKey, instanceKey);
			console.log(`${machine} ${versionKey} ${instanceKey}`);
		}
	}

	onSelectSnapshot(machine, versionKey, instanceKey, snapshotKey) {
		if (this.props.onSelectSnapshot) {
			this.props.onSelectSnapshot(machine, versionKey, instanceKey, snapshotKey);
			console.log(`${machine} ${versionKey} ${instanceKey} ${snapshotKey}`);
		}
	}

	_snapshot(machine, versionKey, instanceKey, snapshots) {
		return Object.keys(snapshots).map((snapshotKey) => {
			return {
				text: snapshotKey,
				type: 'snapshot',
				data: {
					onSelect: () => {
						this.onSelectSnapshot(machine, versionKey, instanceKey, snapshotKey);
					}
				},
			};
		});
	}

	_instances(machine, versionKey, instances) {
		return Object.keys(instances).map((instanceKey) => {
			return {
				text: instanceKey,
				type: 'instance',
				data: {
					onSelect: () => {
						this.onSelectInstance(machine, versionKey, instanceKey);
					}
				},
				children: this._snapshot(machine, versionKey, instanceKey, instances[instanceKey].snapshots)
			};
		});
	}

	_versions(machine, versions) {
		return Object.keys(versions).map((versionKey) => {
			return {
				text: versionKey,
				type: 'version',
				data: {
					onSelect: () => {
						this.onSelectVersion(machine, versionKey);
					}
				},
				children: [].concat(this._instances(machine, versionKey, versions[versionKey].instances))
			};
		});
	}

	_machines(machines) {
		return Object.keys(machines).map((machine) => {
			return {
				text: machine,
				type: 'machine',
				data: {
					onSelect: () => {
						this.onSelectMachine(machine);
					}
				},
				children: this._versions(machine, machines[machine].versions)
			};
		});
	}

	render() {
		return (
				<div id="jstree_container"/>
		);
	}

}


export default TreeView;