function P1_servo_movement () {
    pins.servoWritePin(AnalogPin.P1, 0)
    basic.pause(servo_operation_time)
    basic.pause(close_duration)
    pins.servoWritePin(AnalogPin.P1, Servo_Up_P1)
    basic.pause(servo_operation_time)
}
bluetooth.onBluetoothConnected(function () {
    music.play(music.tonePlayable(784, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    bluetooth.startUartService()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.pause(1000)
    music.play(music.tonePlayable(165, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(147, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(131, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
})
input.onButtonPressed(Button.A, function () {
    mode = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    P2_servo_movement()
})
function play_tone () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    basic.pause(500)
}
input.onButtonPressed(Button.AB, function () {
    mode = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    P1_servo_movement()
    P2_servo_movement()
})
input.onButtonPressed(Button.B, function () {
    mode = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    P1_servo_movement()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    mode = 1
})
function P2_servo_movement () {
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, 0)
    basic.pause(servo_operation_time)
    basic.pause(close_duration)
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, Servo_Up_P2)
    basic.pause(servo_operation_time)
}
let current_mors_code = ""
let index1 = 0
let word = ""
let code = ""
let mode = 0
let servo_operation_time = 0
let Servo_Up_P1 = 0
let Servo_Up_P2 = 0
let close_duration = 0
wuKong.setLightMode(wuKong.LightMode.OFF)
let index = 0
let text_list: string[] = []
let letters_lower = [
"a",
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
" "
]
let morse_list = [
".-",
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
" "
]
serial.redirectToUSB()
serial.setRxBufferSize(32)
serial.setTxBufferSize(32)
close_duration = 150
Servo_Up_P2 = 37
Servo_Up_P1 = 48
servo_operation_time = 200
let pause_letters = 1100
let pause_words = 3100
P1_servo_movement()
P2_servo_movement()
basic.pause(200)
basic.forever(function () {
    while (mode == 1) {
        serial.writeLine("Waiting for word...")
        bluetooth.uartWriteLine("Waiting for word...")
        code = ""
        text_list = []
        word = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        bluetooth.uartWriteLine(word)
        serial.writeLine(word)
        index1 = 0
        text_list = word.split("")
        for (let current_letter of text_list) {
            current_mors_code = morse_list[letters_lower.indexOf(current_letter)]
            for (let current_morse_char of current_mors_code) {
                if (current_morse_char == ".") {
                    P2_servo_movement()
                } else if (current_morse_char == "-") {
                    P1_servo_movement()
                } else if (current_morse_char == " ") {
                    basic.pause(pause_words)
                    basic.pause(pause_letters)
                }
            }
            basic.pause(pause_letters)
        }
    }
})
