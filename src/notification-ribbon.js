import { LitElement, html, css } from 'lit';

class NotificationRibbon extends LitElement {
	static properties = {
		message: { type: String },
		type: { type: String },
		duration: { type: Number }
	};

	constructor() {
		super();
		this.message = '';
		this.type = 'notification';
		this.duration = 5000;
		this.durationTimer = -1;
	}

	static styles = css`
		:host {
			display: flex;
			align-items: center;
			width: calc(100% - 32px);
			margin: 16px;
			height: fit-content;
			padding: 8px;
			column-gap: 16px;
			border: 2px solid black;
			box-shadow: 0px 2px #00000038;
			margin-bottom: 8px;
			opacity: 1;
			transition: .5s opacity, .5s transform;
		}

		:host([hidden]) {
			opacity: 0;
			position: absolute;
			transform: translateX(100%);
		}

		:host([type="notification"]) {
			background: lightblue;
		}

		:host([type="warning"]) {
			background: red;
			color: white;
		}

		:host([type="timer"]) {
			background: orange;
		}

		p {
			flex-grow: 1;
			align-self: center;
			font-size: 16px;
			margin: 0px;
		}

		img {
			height: 40px;
			aspect-ratio: 1/1;
		}
	`;

	firstUpdated() {
		this.updateDuration();
	}

	updateDuration() {
		if (this.durationTimer !== -1) {
			clearTimeout(this.durationTimer);
		}
		if (this.duration !== Infinity && !isNaN(this.duration)) {
			this.durationTimer = setTimeout(() => {
				this.setAttribute('hidden', 'true');
			}, this.duration);
		}
	}

	render() {
		const imageUrl = {
			timer: "../assets/timer.png",
			notification: "../assets/notification.png",
			warning: "../assets/warning.png"
		}[this.type] || "";

		return html`
			<img src="${imageUrl}" />
			<p>${this.message}</p>
			<button @click="${() => {
				this.setAttribute('hidden', 'true')
			    const dismissEvent = new CustomEvent('dismiss')
				this.dispatchEvent(dismissEvent);
			}}">Dismiss</button>
		`;
	}
}

customElements.define('notification-ribbon', NotificationRibbon);