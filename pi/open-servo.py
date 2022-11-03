from gpiozero import Servo
from time import sleep

servo = Servo(26)

running = True

try: 
        while running:
            servo.min()
            sleep(0.5)
            servo.max()
            running = False
except KeyboardInterrupt:
    print('error with opening servo')