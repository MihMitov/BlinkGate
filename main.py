def P1_servo_movement():
    pins.servo_write_pin(AnalogPin.P1, 0)
    basic.pause(servo_operation_time)
    basic.pause(close_duration)
    pins.servo_write_pin(AnalogPin.P1, Servo_Up_P1)
    basic.pause(servo_operation_time)

def on_bluetooth_connected():
    basic.pause(2000)
    basic.show_icon(IconNames.YES)
    bluetooth.start_uart_service()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.pause(2000)
    basic.show_icon(IconNames.NO)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_button_pressed_ab():
    global mode
    mode = 2
    basic.show_leds("""
        . # # # .
        . # . . #
        . # # # #
        . # . . #
        . # # # .
        """)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

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
    P2_servo_movement()
input.on_button_pressed(Button.A, on_button_pressed_a)

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
    P1_servo_movement()
input.on_button_pressed(Button.B, on_button_pressed_b)

def play_tone():
    music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
        music.PlaybackMode.UNTIL_DONE)
    basic.pause(500)

def on_logo_pressed():
    global mode
    mode = 1
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
    music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
        music.PlaybackMode.UNTIL_DONE)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def P2_servo_movement():
    wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, 0)
    basic.pause(servo_operation_time)
    basic.pause(close_duration)
    wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, Servo_Up_P2)
    basic.pause(servo_operation_time)
    basic.pause(open_time)
current_mors_code = ""
index1 = 0
word = ""
code = ""
mode = 0
open_time = 0
servo_operation_time = 0
Servo_Up_P1 = 0
Servo_Up_P2 = 0
close_duration = 0
wuKong.set_light_mode(wuKong.LightMode.OFF)
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
    "z",
    " ",
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "ъ",
    "ь",
    "ю",
    "я",
]
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
    "--..",
    " ",
    ".-",
    "-...",
    ".--",
    "--.",
    "-..",
    ".",
    "...-",
        "--..",
        "..",
        ".---",
        "-.-",
        ".-..",
        "--",
        "-.",
        "---",
        ".--.",
        ".-.",
        "...",
        "-",
        "..-",
        "..-.",
        "....",
        "-.-.",
        "---.",
        "----",
        "--.-",
        "-.--",
        "-..-",
        "..--",
        ".-.-",]
serial.redirect_to_usb()
serial.set_rx_buffer_size(32)
serial.set_tx_buffer_size(32)
close_duration = 300
Servo_Up_P2 = 37
Servo_Up_P1 = 48
servo_operation_time = 200
pause_letters = 1100
pause_words = 3100
open_time = 0
P1_servo_movement()
P2_servo_movement()
basic.pause(200)

def on_forever():
    global code, text_list, word, index1, current_mors_code
    while mode == 2:
        bluetooth.uart_write_line("Waiting for word...")
        code = ""
        text_list = []
        word = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
        bluetooth.uart_write_line(word)
        index1 = 0
        text_list = word.split("")
        for current_letter in text_list:
            current_mors_code = morse_list[letters_lower.index_of(current_letter)]
            for current_morse_char in current_mors_code:
                if current_morse_char == ".":
                    P2_servo_movement()
                elif current_morse_char == "-":
                    P1_servo_movement()
                elif current_morse_char == " ":
                    basic.pause(pause_words)
                    basic.pause(pause_letters)
            basic.pause(pause_letters)
basic.forever(on_forever)

def on_forever2():
    global code, text_list, word, index1, current_mors_code
    while mode == 1:
        serial.write_line("Waiting for word...")
        bluetooth.uart_write_line("Waiting for word...")
        code = ""
        text_list = []
        word = serial.read_line()
        serial.write_line(word)
        index1 = 0
        text_list = word.split("")
        for current_letter2 in text_list:
            current_mors_code = morse_list[letters_lower.index_of(current_letter2)]
            for current_morse_char2 in current_mors_code:
                if current_morse_char2 == ".":
                    P2_servo_movement()
                elif current_morse_char2 == "-":
                    P1_servo_movement()
                elif current_morse_char2 == " ":
                    basic.pause(pause_words)
                    basic.pause(pause_letters)
            basic.pause(pause_letters)
basic.forever(on_forever2)
