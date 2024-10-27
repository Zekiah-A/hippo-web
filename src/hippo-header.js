import { LitElement, html, css } from "lit";
import "login-signup";

class HippoHeader extends LitElement {
	static styles = css`
		nav {
			background-color: rgb(223, 128, 241);
			display: flex;
			flex-direction: row;
			align-items: center;
			column-gap: 8px;
			position: sticky;
			top: 0px;
			left: 0px;
		}

		a.header-logo-link {
			display: flex;
			padding: 4px;
		}

		img.header-logo {
			height: 48px;
		}

		h1.main-title {
			margin: 8px;
			font-size: 36px;
			text-align: center;
		}

		ul.nav-list {
			display: flex;
			flex-direction: row;
			column-gap: 8px;
			margin: 0px;
			padding: 0px;
		}

		li.nav-item {
			list-style: none;
			color: black;
		}

		li.nav-item > a {
			font-weight: bold;
			color: rgb(65, 20, 107);
			text-decoration: none;
		}

		li.nav-item > a:hover {
			color: rgb(105, 60, 147);
		}

		li.nav-item.current-page {
			color: black;
			text-decoration: underline;
			text-decoration-thickness: 2px;
		}

		button.hamburger-button {
			display: none;
			padding: 12px;
			height: 40px;
			margin-right: 8px;
		}

		.login-button {
			margin-left: auto;
			margin-right: 8px;
		}

		button.hamburger-button > img {
			width: 16px;
		}

		@media only screen and (max-width:786px) {
			button.hamburger-button {
				display: block;
			}

			h1.main-title {
				position: absolute;
				top: 0px;
				left: 0px;
				margin-left: 64px;
				margin-right: 64px;
			}
			
			ul.nav-list {
				display: none;
				background-color: #afe6d3;
				flex-direction: column;
				row-gap: 4px;
				position: absolute;
				right: 10px;
				top: 48px;
				box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.301);
				padding: 16px 0px 16px 0px;
				z-index: 2;
				border-radius: 4px;
			}

			ul.nav-list[open] {
				display: flex;
			}

			li.nav-item {
				height: 54px;
				display: flex;
			}

			li.nav-item > a {
				flex-grow: 1;
				align-self: center;
				text-align: center;
				padding: 16px 32px 16px 32px;
				font-size: 1.1em;
			}

			li.nav-item > a:hover {
				background-color: #698a7e;
			}
		}

		@media only screen and (max-width:600px) {
			h1.main-title {
				font-size: 5vw;
				height: 36px;
				display: flex;
				align-items: center;
				line-height: 0.8em;
			}
		}
	`;

	static properties = {
		page: { type: String }
	};

	constructor() {
		super();
		this.page = '';  // Default page
	}

	render() {
		return html`
			<header>
				<nav class="header-nav">
					<a href="index.html" class="header-logo-link">
						<img src="assets/dripped-out-hippo-logo.webp" class="header-logo" alt="logo">
					</a>
					<ul class="nav-list" id="navList" @mouseleave="${() => this.removeAttribute('open')}">
						<li class="nav-item ${this.page === 'index' ? 'current-page' : ''}"><a href="/">Home</a></li>
						<li class="nav-item ${this.page === 'sessions' ? 'current-page' : ''}"><a href="/sessions">Sessions</a></li>
						<li class="nav-item ${this.page === 'profile' ? 'current-page' : ''}"><a href="/profile">Profile</a></li>
						<li class="nav-item ${this.page === 'admin' ? 'current-page' : ''}"><a href="/admin">Admin</a></li>
					</ul>
					<login-signup class="login-button"></login-signup>
					<button type="button" class="hamburger-button" @click="${this.toggleMenu}">
						<img alt="menu" src="assets/hamburger-bars.svg">
					</button>
				</nav>
			</header>
			<h1 class="main-title"><slot name="title">Hippo Casino</slot></h1>
		`;
	}

	toggleMenu() {
		const navList = this.shadowRoot.getElementById("navList");
		navList.toggleAttribute("open");
	}
}

customElements.define("hippo-header", HippoHeader);
