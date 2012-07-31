### How to run the tests

In order to run this test you must serve this files from a web server due to the fact that you can't make ajax requests on the local file system.

A simple solution is to use python's simple http server. Just install [python](http://python.org) and run the following command one folder above here (where chevron.js and test folder are located):

    python -m SimpleHTTPServer 80

Then, in your browser, just go to http://127.0.0.1/tests to run the tests.

Also, make sure you have acces to the internet. The jQuery library is pulled from the web. Alternatively, you can include a local copy of jQuery in index.html