import "lit"
import "hippo-header"
import "hippo-footer"
import "notification-ribbon"
import "event-table"

document.addEventListener("DOMContentLoaded", () => {
	const footer = document.createElement("hippo-footer")
	const main = document.querySelector("main")
	if (main) {
		document.body.insertAdjacentElement("beforeend", footer)
	}
	else {
		document.body.append(footer)
	}

	if (!localStorage.welcomeNotifDismissed) {
		const welcomeNotif = document.createElement("notification-ribbon")
		welcomeNotif.setAttribute("message", "It seems that you're new here. Welcome to the casino. Don't forget to check out our sessions page to see what's on!")
		welcomeNotif.setAttribute("type", "notification")
		welcomeNotif.setAttribute("duration", Infinity)
		welcomeNotif.addEventListener("dismiss", () => {
			localStorage.welcomeNotifDismissed = true
		})
		document.body.insertBefore(welcomeNotif, main)
	}
});