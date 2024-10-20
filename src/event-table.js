import { LitElement, html, css } from "lit";

class EventTable extends LitElement {
	static styles = css`
		table {
			font-family: arial, sans-serif;
			border-collapse: collapse;
			width: 100%;
		}

		td, th {
			border: 1px solid #dddddd;
			text-align: left;
			padding: 8px;
		}

		tr:nth-child(even) {
			background-color: #dddddd;
		}
	`;

	static properties = {
		events: { type: Array }
	};

	constructor() {
		super();
		this.events = [
			{
				date: "Monday",
				time: "From/until 10PM",
				event: "Poker games night",
				session: "Taster"
			}
		];
	}

	render() {
		return html`
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Time</th>
						<th>Event</th>
						<th>Session</th>
					</tr>
				</thead>
				<tbody>
					${this.events.map(
						(event) => html`
							<tr>
								<td>${event.date}</td>
								<td>${event.time}</td>
								<td>${event.event}</td>
								<td>${event.session}</td>
							</tr>
						`
					)}
				</tbody>
			</table>
		`;
	}
}

customElements.define("event-table", EventTable);