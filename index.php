<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache"/>
<title>Is X down?</title>
<script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>
<script type='text/javascript' src='js/checkStatus.js'></script>
<script type='text/javascript' src='js/notifications.js'></script>
<script type='text/javascript' src='js/removeInactiveViewers.js'></script>
<script type='text/javascript' src='js/timeOnTab.js'></script>
<script type='text/javascript' src='js/init.js'></script>


<link rel="stylesheet" type="text/css" href="css/styles.css" />
</head>
<body>
	<h1 id="status">Checking...</h1>
	<img id="reaction" src="img/waiting.gif" />
	<p id="info"></p>
	<p id="askNotificationPermission" style="display:none;">
		<button class="btn btn-default" onClick="giveNotificationPermission()">Notify me of changes</button>
	</p>
	<div id="time-on-tab-holder"></div>
</body>
</html>