import { LitElement, html, css } from 'lit';

export class AlertDialog extends LitElement {
	static styles = css`
		dialog {
			padding: 48px 16px 16px;
			width: min(100%, 300px);
			box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.301);
		}
		button {
			padding: 8px;
		}
	`;

	static properties = {
		message: { type: String }
	};

	render() {
		return html`
			<dialog>
				<p>${this.message}</p>
				<button @click="${this.close}">OK</button>
			</dialog>
		`;
	}

	open() {
		this.shadowRoot.querySelector("dialog").showModal();
	}

	static open(message) {
		const alertDialog = document.createElement("alert-dialog");
		document.body.appendChild(alertDialog);
		alertDialog.message = message;
		alertDialog.updateComplete.then(() => {
			alertDialog.open();
		});	
	}

	close() {
		this.shadowRoot.querySelector("dialog").close();
		this.remove();
	}
}

customElements.define("alert-dialog", AlertDialog);
