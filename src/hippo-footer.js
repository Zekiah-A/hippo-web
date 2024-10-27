import { LitElement, html, css } from "lit";

class HippoFooter extends LitElement {
	static styles = css`
		footer {
			display: flex;
			flex-direction: row;
			padding: 16px;
			column-gap: 16px;
			background-color: rgb(175, 230, 211);
		}

		footer > hr {
			visibility: hidden;
		}
		
		@media only screen and (max-width:786px) {
			footer > hr {
				visibility: visible;
				align-self: center;
				height: 100%;
			}
		}
	`;

	render() {
		return html`
			<footer>
				<span>Copyright © 2024 High Stakes Collective</span>
				<hr>
				<a href="mailto://admin@hippo.casino">Contact us</a>
			</footer>
		`
	}
}

customElements.define("hippo-footer", HippoFooter)