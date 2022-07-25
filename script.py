import requests
import threading
import time


def current_milli_time():
    return round(time.time() * 1000)


def makeRequest():
    threading.Timer(5.0, makeRequest).start()

    millis = current_milli_time()
    url = 'http://localhost:4000/post-data?data=time:'+str(millis)
    x = requests.get(url)

    print("raspberry data sent: "+ str(millis))


makeRequest()
