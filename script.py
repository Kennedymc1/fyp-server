import requests
import threading
import time
import os

os.system("fswebcam -r 1280x720 --no-banner image.jpg")


def current_milli_time():
    return round(time.time() * 1000)


def makeRequest():
    # threading.Timer(5.0, makeRequest).start()
    devUrl = 'http://localhost:4000'
    prodUrl = 'https://hardware-lab-1.herokuapp.com'

    imageUploadUrl = devUrl + "/upload-image"
    imagefile = open("image.jpg", "rb")
    imageUploadResponse = requests.post(imageUploadUrl, files = {"image": imagefile})
    print(imageUploadResponse)


    # millis = current_milli_time()
    # props = '?data=time:'+str(millis)

    # devUrl = 'http://localhost:4000/post-data'
    # prodUrl = 'https://hardware-lab-1.herokuapp.com/post-data'

    # url = prodUrl + props

    # x = requests.get(url)

    # print("raspberry data sent: " + str(millis))


makeRequest()
