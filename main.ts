function P1_servo_movement () {
    pins.servoWritePin(AnalogPin.P1, 0)
    basic.pause(servo_operation_time)
    basic.pause(close_duration)
    pins.servoWritePin(AnalogPin.P1, Servo_Up_P1)
    basic.pause(servo_operation_time)
}
bluetooth.onBluetoothConnected(function () {
    basic.pause(2000)
    basic.showIcon(IconNames.Yes)
    bluetooth.startUartService()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.pause(2000)
    basic.showIcon(IconNames.No)
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
    mode = 2
    basic.showLeds(`
        . # # # .
        . # . . #
        . # # # #
        . # . . #
        . # # # .
        `)
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
function SpaceCheck () {
    CharCodeList = []
    for (let index = 0; index <= word.length - 1; index++) {
        CharCodeList.push(convertToText(word.charCodeAt(index)))
        if (word.charCodeAt(index) == 32) {
            CharCodeList.push("32")
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    mode = 1
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
function P2_servo_movement () {
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, 0)
    basic.pause(servo_operation_time)
    basic.pause(close_duration)
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, Servo_Up_P2)
    basic.pause(servo_operation_time)
    basic.pause(open_time)
}
let current_mors_code = ""
let index1 = 0
let text_list: string[] = []
let code = ""
let word = ""
let CharCodeList: string[] = []
let mode = 0
let open_time = 0
let servo_operation_time = 0
let Servo_Up_P1 = 0
let Servo_Up_P2 = 0
let close_duration = 0
let index2 = 0
wuKong.setLightMode(wuKong.LightMode.OFF)
// a
// b
// c
// d
// e
// f
// g
// h
// i
// j
// k
// l
// m
// n
// o
// p
// q
// r
// s
// t
// u
// v
// w
// x
// y
// z
// space
// а
// б
// в
// г
// д
// е
// ж
// з
// и
// й
// к
// л
// м
// н
// о
// п
// р
// с
// т
// у
// ф
// х
// ц
// ч
// ш
// щ
// ъ
// ь (прескочил съм 203 - ы)
// ю (прескочил съм 205 - э)
// я
let letters_lower = [
"97",
"98",
"99",
"100",
"101",
"102",
"103",
"104",
"105",
"106",
"107",
"108",
"109",
"110",
"111",
"112",
"113",
"114",
"115",
"116",
"117",
"118",
"119",
"120",
"121",
"122",
"32",
"176",
"177",
"178",
"179",
"180",
"181",
"182",
"183",
"184",
"185",
"186",
"187",
"188",
"189",
"190",
"191",
"128",
"129",
"130",
"131",
"132",
"133",
"134",
"135",
"136",
"137",
"138",
"139",
"142",
"143"
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
".-.-"
]
serial.redirectToUSB()
serial.setRxBufferSize(253)
serial.setTxBufferSize(253)
close_duration = 300
Servo_Up_P2 = 37
Servo_Up_P1 = 46
servo_operation_time = 200
let pause_letters = 1100
let pause_words = 3100
open_time = 0
P1_servo_movement()
P2_servo_movement()
basic.pause(200)
basic.forever(function () {
    while (mode == 2) {
        bluetooth.uartWriteLine("Waiting for word...")
        code = ""
        text_list = []
        word = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        bluetooth.uartWriteLine(word)
        SpaceCheck()
        // Parsing the en or bg word
        if (word.charCodeAt(0) == 208 || word.charCodeAt(0) == 209) {
            for (let index22 = 0; index22 <= CharCodeList.length - 1; index22++) {
                if (index22 % 2 != 0) {
                    bluetooth.uartWriteLine(CharCodeList[index22])
                    text_list.push(CharCodeList[index22])
                }
                if (index22 == CharCodeList.length - 2) {
                    break;
                }
            }
        } else {
            for (let index3 = 0; index3 <= word.length - 1; index3++) {
                bluetooth.uartWriteLine(convertToText(word.charCodeAt(index3)))
                text_list.push(convertToText(word.charCodeAt(index3)))
                if (index3 == word.length - 2) {
                    break;
                }
            }
        }
        index1 = 0
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
basic.forever(function () {
    while (mode == 1) {
        serial.writeLine("Waiting for word...")
        bluetooth.uartWriteLine("Waiting for word...")
        code = ""
        text_list = []
        word = serial.readLine()
        serial.writeLine(word)
        index1 = 0
        text_list = word.split("")
        for (let current_letter2 of text_list) {
            current_mors_code = morse_list[letters_lower.indexOf(current_letter2)]
            for (let current_morse_char2 of current_mors_code) {
                if (current_morse_char2 == ".") {
                    P2_servo_movement()
                } else if (current_morse_char2 == "-") {
                    P1_servo_movement()
                } else if (current_morse_char2 == " ") {
                    basic.pause(pause_words)
                    basic.pause(pause_letters)
                }
            }
            basic.pause(pause_letters)
        }
    }
})
