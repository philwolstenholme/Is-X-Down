var status, autoChecker, httpcode;

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

var failGifs = ['img/down.gif',
				'http://media.giphy.com/media/xzW3KvUpP0UiQ/giphy.gif',
				'http://media.giphy.com/media/XLDWU7BZAeWty/giphy.gif',
				'http://media.giphy.com/media/EmB4QtACPVBpS/giphy.gif',
				'http://imgur.com/MGm7ga1.gif',
				'http://1.bp.blogspot.com/-2jGhCpQ0Te0/Uvefo5xCVSI/AAAAAAAADWg/eNKZ_wf9fQc/s1600/AngryPanda.gif',
				'http://media.giphy.com/media/SawCTblA0AXAY/giphy.gif',
				'http://media.giphy.com/media/fml0xetKPK1Ec/giphy.gif',
				'https://33.media.tumblr.com/tumblr_mb95qmj9Qx1qmt85zo1_500.gif',
				'http://personalpages.manchester.ac.uk/staff/saarah.nakhuda/X-explosion.gif'
				]
				
var successGifs = ['img/OK.gif',
				'http://media.giphy.com/media/10FwycrnAkpshW/giphy.gif',
				'http://media.giphy.com/media/vtVpHbnPi9TLa/giphy.gif',
				'http://media.giphy.com/media/YROHNq4VhcPDO/giphy.gif']

function selectGif(array) {
	return array[Math.floor(Math.random()*array.length)]
}
					
function checkStatus() {
	$.ajax({
			type: "GET",
			url: 'checkStatus.php',
			async: true,
			cache: false,
			dataType: "json",
			success: function(data){
				status = data.status;
				httpcode = Number(data.httpcode);
				doStuffWithStatus(status);
			}
	});

	function doStuffWithStatus(status) {
		var currentdate = new Date(); 
		console.log('Status: ' + status + ' at ' + new Date().toJSON() );
		if (status === 'down'){
			$( '#reaction' ).attr( 'src', selectGif(failGifs));
			$( '#status' ).text( 'Yep, it\'s down' );
			if (httpcode !== 0) { 
				$( '#info' ).html( 'X returned a dodgy looking HTTP code: <a href="http://httpstatus.es/' + httpcode + '">' + httpcode + '</a>.' );
			} else {
				$( '#info' ).html( 'X returned an invalid HTTP code of just \'0\'.' );
			}
			$( 'body' ).addClass( 'fail' ).removeClass('OK');
			$( document ).prop( 'title', '✘ X is down' );
			clearInterval(autoChecker);
			window.autoChecker = setInterval(checkStatus, 10000);
		}

		if (status === 'OK'){
			$( '#reaction' ).attr( 'src', selectGif(successGifs));
			$( '#status' ).text( 'It looks OK to me' );
			$( '#info' ).html( 'X returned an OK looking HTTP code (<a href="http://httpstatus.es/' + httpcode + '">' + httpcode + '</a>).' );
			$( 'body' ).addClass( 'OK' ).removeClass('fail');
			$( document ).prop( 'title', '✔ X is OK' );
			clearInterval(autoChecker);
			window.autoChecker = setInterval(checkStatus, 30000);
		}
		
		checkForNotification(status);
	}
}