var tabTimeRecorder;

// Polyfill for browsers without localstorage support. Taken from https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage
if (!window.localStorage) {
	window.localStorage = {
		getItem: function (sKey) {
			if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
			return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		},
		key: function (nKeyId) {
			return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
		},
		setItem: function (sKey, sValue) {
			if(!sKey) { return; }
			document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
			this.length = document.cookie.match(/\=/g).length;
		},
		length: 0,
		removeItem: function (sKey) {
			if (!sKey || !this.hasOwnProperty(sKey)) { return; }
			document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			this.length--;
		},
		hasOwnProperty: function (sKey) {
			return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		}
	};
	window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}

if(localStorage.getItem('timeOnTab') === null ) {
	var timeOnTab = 0;
} else {
	var timeOnTab = Number(localStorage.getItem('timeOnTab'));
} 

function startTabTimer() {
	if (window.status === 'down') {
		window.tabTimeRecorder = setInterval(increaseTimeOnTab, 1000);
		console.log('Timer started');
		$('#time-on-tab-holder').append('<p>');  
		$( "#time-on-tab-holder" ).prop( 'title', 'Since 13 October 2014 at least' );
		$( '#time-on-tab-holder' ).fadeIn();
	}
}

function clearTimer() {
	localStorage.removeItem('timeOnTab');
}

function increaseTimeOnTab() {
	if (status === 'down') {
		timeOnTab = Number(timeOnTab) + 1;
		localStorage.setItem('timeOnTab',timeOnTab);
		
		if (timeOnTab <60 ) {
			var message = timeOnTab + ' seconds'
		} else if (timeOnTab >= 60 && timeOnTab < 120) {
			var minutes = Math.floor(timeOnTab/ 60);
			var seconds = timeOnTab % 60;
			var message = minutes + ' minute and ' + seconds + ' seconds';
		} else if( timeOnTab >= 120 && timeOnTab < 3600) {
			var minutes = Math.floor(timeOnTab/ 60);
			var seconds = timeOnTab % 60;
			var message = minutes + ' minutes and ' + seconds + ' seconds';
		} else if( timeOnTab >= 3600 && timeOnTab < 7200) {
			var hours = Math.floor(timeOnTab/ 3600);
			var minutes = Math.floor(timeOnTab/ 60)-60;
			var seconds = timeOnTab % 60;
			var message = hours + ' hour ' + minutes + ' minutes and ' + seconds + ' seconds';
		} else if( timeOnTab >= 7200) {
			var hours = Math.floor(timeOnTab/ 3600);
			var minutes = Math.floor(timeOnTab/ 60)-(60 * hours);
			var seconds = timeOnTab % 60;
			var message = hours + ' hours ' + minutes + ' minutes and ' + seconds + ' seconds';
		}
		$( '#time-on-tab-holder' ).show();
		$( '#time-on-tab-holder p' ).text( 'All in all, you\'ve spent at least ' + message + ' waiting for X to be back up.' );
	} else {
		// Status is up so we hide counter
		$( '#time-on-tab-holder' ).hide();
	}
}