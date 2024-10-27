import { LitElement, html, css } from 'lit';
import { serverAddress } from 'app';

class LoginSignup extends LitElement {
	static properties = {
		email: { type: String },
		showVerification: { type: Boolean },
		verificationCode: { type: String }
	};

	constructor() {
		super();
		this.email = "";
		this.verificationCode = "";
		this.showVerification = false;
	}

	static styles = css`
		dialog {
			padding: 48px 16px 16px;
			width: min(100%, 300px);
			box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.301);
		}
		form {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
		input[type="email"], input[type="text"] {
			padding: 10px;
			font-size: 14px;
			border-radius: 5px;
		}
		button {
			padding: 8px;
		}
		button.header-button {
			position: absolute;
			top: 8px;
			padding: 0px 8px 0px 8px;
			height: 32px;
		}
		button.close-button {
			right: 8px;
		}
		button.back-button {
			left: 8px;
		}
		input.code-input {
			height: 64px;
			font-size: 48px;
			text-align: center;
		}
	`;

	open() {
		this.shadowRoot.querySelector("dialog").showModal();
	}

	close() {
		this.shadowRoot.querySelector("dialog").close();
	}

	async handleLogin(e) {
		e.preventDefault();
		if (!this.email) {
			return;
		}
		const res = await fetch(serverAddress + "/auth/login", {
			method: "POST",
			body: JSON.stringify({ email: this.email }),
			headers: { "Content-Type": "application/json" }
		});
		if (!res.ok) {
			const errorResponse = await res.json();
			return;
		}
		this.showVerification = true;
	}

	async handleVerification(e) {
		e.preventDefault();
		if (!this.verificationCode) {
			return;
		}
		const res = await fetch(serverAddress + "/auth/verify", {
			method: "POST",
			body: JSON.stringify({ code: this.verificationCode }),
			headers: { "Content-Type": "application/json" }
		});
		if (!res.ok) {
			const errorResponse = await res.json();
			return;
		}
		this.close();
	}

	render() {
		return html`
			<button type="button" @click=${(e) => this.open()}>Login</button>
			<dialog>
				<button type="button" class="header-button close-button" @click=${(e) => this.close()}>
				<img src="/assets/close.svg" height="28" alt="Close">
				</button>
				${this.showVerification
					? html`
						<button type="button" class="header-button back-button" @click=${(e) => this.showVerification = false}>
							<img src="/assets/arrow-back.svg" height="28" alt="Back">
						</button>
						<p>A verification code has been sent to: <strong>${this.email}</strong></p>
						<p>Please check your email to verify your login.</p>
						<form @submit=${this.handleVerification}>
							<input
								type="text"
								maxlength="7"
								class="code-input"
								id="verificationCode"
								.value=${this.verificationCode}
								placeholder="email code"
								@keydown=${this.handleVerificationCodeInput}
								required
							>
							<button type="submit">Done</button>
						</form>
					`
					: html`
						<form @submit=${this.handleLogin}>
							<label for="email">Enter your email to log in:</label>
							<input
								type="email"
								id="email"
								.value=${this.email}
								@input=${(e) => (this.email = e.target.value)}
								required
							/>
							<button type="submit">Log In</button>
						</form>
					`}
			</dialog>
		`;
	}

	handleVerificationCodeInput(e) {
		if (e.key === "Backspace" || e.key === "Delete" || e.key == "-") {
			return;
		}

		const value = e.target.value.replace("-", "").toUpperCase();
		if (value.length >= 3) {
			this.verificationCode = value.slice(0, 3) + '-' + value.slice(3, 6);
		}
		else {
			this.verificationCode = value;
		}
		e.target.value = this.verificationCode;
	}
}

customElements.define("login-signup", LoginSignup);
