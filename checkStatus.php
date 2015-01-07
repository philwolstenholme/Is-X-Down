<?php
//Set no caching
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); 
header("Cache-Control: no-store, no-cache, must-revalidate"); 
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$httpcode = '';
$targetURL = 'http://www.example.com';

function checkUp($url){
	global $httpcode;
	$agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
	$ch=curl_init();
	curl_setopt ($ch, CURLOPT_URL, $url );
	curl_setopt($ch, CURLOPT_USERAGENT, $agent);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch,CURLOPT_VERBOSE, false);
	curl_setopt($ch, CURLOPT_TIMEOUT, 3);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
	curl_setopt($ch, CURLOPT_FRESH_CONNECT, TRUE);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch,CURLOPT_SSLVERSION, 3);
	curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, FALSE);
	$page=curl_exec($ch);
	$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if($httpcode>=200 && $httpcode<300) return true;
	else return false;
}

$cacheFile = getcwd() . '/cache.txt';

if (file_exists($cacheFile) && (filemtime($cacheFile) > (time() - (60 * 2) ))) {
	// Cache file is less than X seconds old, don't bother refreshing, just use the file as-is.
	$output = file_get_contents($cacheFile);
	echo $output;
} else {
	// Our cache is out-of-date, so load the data and save it over our cache for next time.
	$dateTime = date("r");
	if (checkUp($targetURL)) {
		$arr = array ('status'=>"OK",'httpcode'=>"$httpcode",'time'=>"$dateTime");
		$result = json_encode($arr);
	}
	else {
		$arr = array ('status'=>"down",'httpcode'=>"$httpcode",'time'=>"$dateTime");
		$result = json_encode($arr);
	}
	
	echo $result;
	file_put_contents($cacheFile, $result, LOCK_EX);
}
?>