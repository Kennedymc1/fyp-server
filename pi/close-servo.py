from gpiozero import Servo
from time import sleep

servo = Servo(26)

running = True

try: 
        while running:
            servo.max()
            sleep(0.5)
            servo.min()
            running = False
except KeyboardInterrupt:
    print('error with opening servo')