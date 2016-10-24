import threading
import time
import ConfigParser
import urllib2
import unittest

class StoppableThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""

    def __init__(self, target):
        super(StoppableThread, self).__init__(target=target, args=[self])
        self._stop = threading.Event()

    def stop(self):
        self._stop.set()

    def stopped(self):
        return self._stop.isSet()
    
class TestPackets(unittest.TestCase):
    def _update(self, thread):
        params = "token=123"
        url = "%s:%s/?%s" % (self.config["host"], self.config["port"], params)
        for i in range(1, 10+1):
            if not thread.stopped():
                time.sleep(0.1)
                f = urllib2.urlopen(url)
                print(f.read())
                print "sent request %s" % i
            else:
                return
        thread.stop()
        
    def setUp(self):
        parser = ConfigParser.ConfigParser()
        parser.read("config.txt")
        self.config = parser._sections["test"]
        
    def runTest(self):
        thread = StoppableThread(self._update)
        thread.start()
        for i in range(1, 10+1):
            if not thread.stopped():
                time.sleep(1)
                print str(i) + "second(s)"
            
        thread.stop()

if __name__ == "__main__":
    unittest.main()