/**
 * Created by Ricardo Morais on 22/07/2017.
 */

import React from 'react';
import $ from 'jquery';
import 'jstree';
import moment from 'moment';

class HistoryView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {commits: []};
		this.loadHistory();
	}

	loadHistory() {
		$.ajax({
			url: this.props.server.url + '/engine/commits',
			headers: {
				authorization: 'JWT ' + this.props.server.token,
			},
			method: 'GET',
			success: (data) => {
				this.state.commits = data;
				this.setState(this.state);
			}
		});
	}

	render() {
		return (

				<div className="inspinia-timeline">
					{

						this.state.commits.map((commit, i) => {
							let date = moment(commit.date);
							return (
									<div className="timeline-item">
										<div className="row">
											<div className="col-xs-3 date">
												<i className="fa fa-briefcase"></i>
												{date.format("dddd, MMMM Do YYYY, h:mm a")}
												<br/>
												<small className="text-navy">{date.fromNow()}</small>
											</div>
											<div className={`col-xs-9 content ${i == 0 ? 'no-top-border':'' }` }
													 style={{minHeight: '120px'}}>
												<p className="m-b-xs"><strong>Commit</strong><br />
													<small className="link">
														<i className="fa fa-hashtag"/> {commit.sha}
													</small>
												</p>

												<p>{commit.message}</p>

											</div>
										</div>
									</div>
							)
						})

					}

				</div>
		);
	}

}


export default HistoryView;