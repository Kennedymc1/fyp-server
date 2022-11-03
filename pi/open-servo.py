from time import sleep
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(37,GPIO.OUT)

servo.start(0)
sleep(2)

duty = 2
while duty <= 17:
        servo.ChangeDutyCycle(duty)
        sleep(0.1)
        duty = duty+1
servo.stop()
GPIO.cleanup()