import threading
import time
import ConfigParser
import urllib2

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

def get_config():
    global config
    parser = ConfigParser.ConfigParser()
    parser.read("config.txt")
    config = parser._sections["test"]
    

def _update(thread):
    params = "token=123"
    url = "%s:%s/?%s" % (config["host"], config["port"], params)
    for i in range(1, 10+1):
        if not thread.stopped():
            time.sleep(0.1)
            f = urllib2.urlopen(url)
            print(f.read())
            print "sent request %s" % i
        else:
            return
    thread.stop()

if __name__ == "__main__":
    config = {}
    get_config()
    thread = StoppableThread(_update)
    thread.start()
    for i in range(1, 10+1):
        if not thread.stopped():
            time.sleep(1)
            print str(i) + "second(s)"
        
    thread.stop()
