import requests
import threading
import time
import os

from smbus2 import SMBus
from mlx90614 import MLX90614

from picamera import PiCamera
from time import sleep



def getTemperature():
    bus = SMBus(1)
    sensor = MLX90614(bus, address=0x5A)
    temperature = sensor.get_amb_temp()
    bus.close()
    return temperature



# def current_milli_time():
#     return round(time.time() * 1000)

def takePicture():
    os.system("raspistill -o image.jpg")
    # camera = PiCamera()

    # camera.start_preview()
    # sleep(5)
    # camera.capture('/image.jpg')

    # camera.stop_preview()

def makeRequest():
    threading.Timer(45.0, makeRequest).start()
    takePicture()
    devUrl = 'http://localhost:4000'
    prodUrl = 'https://hardware-lab-1.herokuapp.com'

    temperature = getTemperature()
    imageUploadUrl = prodUrl + "/upload-image?temp=%d"%temperature
    imagefile = open("image.jpg", "rb")
    imageUploadResponse = requests.post(imageUploadUrl, files = { 
        "image": imagefile    
        })
    print(imageUploadResponse)


makeRequest()
