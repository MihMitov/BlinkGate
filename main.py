def P1_servo_movement():
    pins.servo_write_pin(AnalogPin.P0, Servo_up)
    basic.pause(100)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P0, 0)
def Both_servo_movement():
    pins.servo_write_pin(AnalogPin.P0, Servo_up)
    pins.servo_write_pin(AnalogPin.P1, Servo_up)
    basic.pause(100)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P0, 0)
    pins.servo_write_pin(AnalogPin.P1, 0)

def on_button_pressed_a():
    global mode
    mode = 0
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        """)
    pins.servo_write_pin(AnalogPin.P0, Servo_up)
    basic.pause(100)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P0, 0)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global mode
    mode = 0
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        """)
    pins.servo_write_pin(AnalogPin.P0, Servo_up)
    pins.servo_write_pin(AnalogPin.P1, Servo_up)
    basic.pause(100)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P0, 0)
    pins.servo_write_pin(AnalogPin.P1, 0)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def P0_servo_movement():
    pins.servo_write_pin(AnalogPin.P0, Servo_up)
    basic.pause(100)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P0, 0)

def on_button_pressed_b():
    global mode
    mode = 0
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        """)
    pins.servo_write_pin(AnalogPin.P1, Servo_up)
    basic.pause(100)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P1, 0)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_pressed():
    global mode
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
    mode = 1
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

index2 = 0
letters_index = 0
text_index = 0
index1 = 0
word = ""
code = ""
mode = 0
Servo_up = 0
close_duration = 0
index = 0
text_list: List[str] = []
letters_lower = ["a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"]
morse_list = [".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--.."]
serial.redirect_to_usb()
close_duration = 2000
Servo_up = 40
pins.servo_write_pin(AnalogPin.P0, 0)
pins.servo_write_pin(AnalogPin.P1, 0)
Both_servo_movement()

def on_forever():
    global code, text_list, word, index1, text_index, letters_index, index2
    while mode == 1:
        pins.servo_write_pin(AnalogPin.P0, 0)
        pins.servo_write_pin(AnalogPin.P1, 0)
        serial.write_line("Waiting for word...")
        code = ""
        text_list = []
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
        word = serial.read_line()
        serial.write_line(word)
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
        index1 = 0
        while index1 <= len(word) - 1:
            text_list.append(word.char_at(index1))
            index1 += 1
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
        if len(text_list) > 0:
            text_index = 0
            letters_index = 0
            while len(text_list) > text_index:
                if text_list[text_index] == letters_lower[letters_index]:
                    code = "" + code + morse_list[letters_index] + "/"
                    text_index += 1
                    letters_index = 0
                else:
                    letters_index += 1
            music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
                music.PlaybackMode.UNTIL_DONE)
            basic.pause(500)
            index2 = 0
            while index2 <= len(code) - 1:
                if code.char_at(index2) == ".":
                    P0_servo_movement()
                elif code.char_at(index2) == "-":
                    P1_servo_movement()
                else:
                    Both_servo_movement()
                basic.pause(100)
                index2 += 1
        else:
            basic.pause(3000)
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
basic.forever(on_forever)
