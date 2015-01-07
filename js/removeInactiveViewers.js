/*
We shouldn't send X requests constantly just because a user left their machine
on overnight. After an hour let's stop the checking (by launching a confirm prompt
which blocks code execution) unless the user explicitly asks us to continue.
*/

var inactiveChecker, disableInactiveChecker;

window.onfocus = function (event) {
    clearInterval(window.inactiveChecker);
}

window.onblur = function (event) {
    if (!disableInactiveChecker) {
		window.inactiveChecker = setInterval(checkInactive, 3600000);
	}
}

function checkInactive() {
    clearInterval(window.inactiveChecker);
    if (!window.confirm("Looks like this tab has been inactive for a while.\n\nDo you want to keep checking X in the background? Click OK to keep checking or Cancel to turn off automatic updates.")) {
        console.log('Automatic updates disabled');
		clearInterval(autoChecker);
		disableInactiveChecker = true;
    }
}