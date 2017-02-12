var React = require('react');
require('./css/info.css')

var Info = React.createClass({
	render: function() {
		return (
			<div className="info">
				<h2>I'm a info-compomnent</h2>
				<ul>{this.props.userInfo}</ul>
			</div>
			);
	}
});

module.exports = Info;
