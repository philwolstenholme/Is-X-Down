var notificationSent = false;
var notificationUserOptedIn = false;

function giveNotificationPermission() {
	if (window.Notification && Notification.permission !== "granted") {
		Notification.requestPermission(function(status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	}
	notificationUserOptedIn = true;
	$( '#askNotificationPermission' ).html('OK, just keep this browser window open. A notification will appear within a few minutes of X being back online.');
}

function sendBackUpNotification() {
	if (notificationUserOptedIn && !notificationSent) {
		if (window.Notification && Notification.permission === "granted") {
			var n = new Notification("X is back online", {
				body: 'Back to work!',
				icon: 'img/smile.png',
				tag: 'isXdown'
			});
		} else {
			alert("X is back online");
		}
		notificationSent = true;
	}
}

function checkForNotification() {
	if (status === 'down'){
		$( '#askNotificationPermission' ).show();
	}
	if (status === 'OK'){
		$( '#askNotificationPermission' ).hide();
		sendBackUpNotification();
	}
}