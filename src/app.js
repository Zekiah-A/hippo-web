import "lit"
import "hippo-header"
import "hippo-footer"
import "notification-ribbon"

export const serverAddress = localStorage.serverAddress || "http://server.hippo.casino";

document.addEventListener("DOMContentLoaded", () => {
	const main = document.querySelector("main");
	if (!localStorage.welcomeNotifDismissed) {
		const welcomeNotif = document.createElement("notification-ribbon");
		welcomeNotif.setAttribute("message", "It seems that you're new here. Welcome to the casino. Don't forget to check out our sessions page to see what's on!");
		welcomeNotif.setAttribute("type", "notification");
		welcomeNotif.setAttribute("duration", Infinity);
		welcomeNotif.addEventListener("dismiss", () => {
			localStorage.welcomeNotifDismissed = true;
		})
		document.body.insertBefore(welcomeNotif, main)
	}
});
