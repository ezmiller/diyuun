/**
 * SendInvite
 */
(function() {
	'use strict';

	// React & Components
	var React = require('react');

	// Mixins.
	var Classable = require('./mixins/classable.js');

	var SendInvite = React.createClass({

		mixins: [Classable],

		render: function() {

			var gridClasses =this.getClasses('column two-thirds offset-by-two', {});
			var wrapClasses = this.getClasses('send-invite form-wrap z-depth-1', {});

			return (
				<section className="above-fold">
					<div className={gridClasses}>
						<div className={wrapClasses}>
							<form className="send-invite-form" role="form">
								<h3>Send an invite...</h3>
								<h5>Invite your colleagues to Kanon.</h5>
								<fieldset>
									<div className="fieldset-wrap">
										<legend>To:</legend>
										<div className="to-fields-wrap">
											<div>
											<input
												type="text"
							          name="name"
							          ref="name"
							          placeholder="Full Name" />
							        </div>
							        <div>
							        <input
												type="text"
							          name="email"
							          ref="email"
							          placeholder="Email Address" />
							        </div>
							        <div>
							        <input
												type="text"
							          name="title"
							          ref="title"
							          placeholder="Title" />
							        </div>
							        <div>
						          <input
												type="text"
							          name="institution"
							          ref="institution"
							          placeholder="Institution" />
							        </div>
						        </div>
						      </div>
				        </fieldset>
				        <hr/>
				        <fieldset>
				        	<div className="fieldset-wrap">
				        		<legend>Message:</legend>
				        		<div className="message-fields-wrap">
				        			<div>
				        			<label htmlFor="recipient">Dear</label>
				        			<input
												type="text"
							          name="recipient"
							          ref="recipient"
							          placeholder="Name" /><span className="comma">,</span>
							        </div>
							        <div>
							        <textarea 
							        	name="message"
							        	ref="message" >
							        	I would like to invite you to Kanon, a collaborative space for academics to discuss scholarship and ideas.
							        </textarea>
							        </div>
							        <div>
							        <input
							        	type="text"
							        	name="link"
							        	ref="link"
							        	placeholder="[Link will appear]"
							        	disabled />
							        </div>
				        		</div>
				        	</div>
				        </fieldset>
				        <input type="submit" name="submit" value="Send" />
			        </form>
			      </div>
			    </div>
				</section>
			);
		}
	});

	module.exports = SendInvite;


}());