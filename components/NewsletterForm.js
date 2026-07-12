import { useState } from 'react';
import { decode } from 'html-entities';
import StyledButton from './styles/StyledButton.styled';
import EmailCaptureContainer from './styles/EmailCaptureContainer.styled';

const NewsletterForm = ({ status, message, onValidated, className }) => {
	const [error, setError] = useState(null);
	const [email, setEmail] = useState(null);

	/**
	 * Handle form submit.
	 *
	 * @return {{value}|*|boolean|null}
	 */
	const handleFormSubmit = (event) => {
		// Cancel the default action, if needed
		event.preventDefault();
		setError(null);

		if (!email) {
			setError('Please enter a valid email address');
			return null;
		}

		const isFormValidated = onValidated({ EMAIL: email });

		// On success return true
		return email && email.indexOf('@') > -1 && isFormValidated;
	};

	/**
	 * Handle Input Key Event.
	 *
	 * @param event
	 */
	const handleInputKeyEvent = (event) => {
		setError(null);
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Trigger the button element with a click
			handleFormSubmit(event);
		}
	};

	/**
	 * Extract message from string.
	 *
	 * @param {String} message
	 * @return {null|*}
	 */
	const getMessage = (message) => {
		if (!message) {
			return null;
		}
		const result = message?.split('-') ?? null;
		if ('0' !== result?.[0]?.trim()) {
			return decode(message);
		}
		const formattedMessage = result?.[1]?.trim() ?? null;
		return formattedMessage ? decode(formattedMessage) : null;
	};

	return (
		<div className={className}>
			<EmailCaptureContainer>
				<input
					onChange={(event) => setEmail(event?.target?.value ?? '')}
					type='email'
					placeholder='Your email'
					onKeyUp={(event) => handleInputKeyEvent(event)}
				/>
				<StyledButton href='#' onClick={handleFormSubmit}>
					Sign up
				</StyledButton>
			</EmailCaptureContainer>
			<div className='newsletter-form-info'>
				{status === 'sending' && <div>Sending...</div>}
				{status === 'error' || error ? (
					<p
						className='newsletter-form-error'
						dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
					/>
				) : null}
				{status === 'success' && status !== 'error' && !error && (
					<div dangerouslySetInnerHTML={{ __html: decode(message) }} />
				)}
			</div>
		</div>
	);
};

export default NewsletterForm;
