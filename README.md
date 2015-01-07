Is X Down? 
===============
This was an internal tool I built to test if a service is available, communicated (of course) through reaction gifs.

It also served as a learning exercise:
* The tool has a PHP component which logs the status of an HTTP request to a JSON file to serve as a cache.
* A front-end queries this JSON file with `jQuery.ajax()`.
* The [Notification API](https://developer.mozilla.org/en/docs/Web/API/notification) is used to alert the user when the offline service comes back online.
* [Localstorage](https://developer.mozilla.org/en/docs/Web/Guide/API/DOM/Storage#localStorage) was used to keep a (sometimes depressing) count of how long the user had spent with the tool open and the service unavailable. 


Can I use this myself?
------
Sure, just change references to X to the name of whatever site you'd like to monitor, and adjust the `$targetURL` variable in `checkStatus.php`.