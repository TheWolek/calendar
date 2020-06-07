//Gobal vars
let selectedTerm = {
    month: undefined,
    day: undefined,
    hour: undefined,
    min: undefined,
    FullDate: undefined,
    data: undefined,
    proc: undefined,
    det: undefined
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear(); //used to display current month at init

//DOM obj
let selectMonth = document.getElementById("month"); //select
let selectYear = document.getElementById("year"); //select
let monthAndYear = document.getElementById("monthAndYear"); //display

//let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let months = []

for (let i = 0; i < 12; i++) {
    months.push(getMonth(i))
}

//init
$(function () {
    pasteMonthToSelect()
    showCalendar(currentMonth, currentYear);
})


function Summary() { //handles summary section
    // add EVH to form
    $('#summaryForm').on('submit', function () {
        // let formdata = $(this).serialize()
        selectedTerm.data = $("#summaryForm-Data").val()
        selectedTerm.proc = $("#summaryForm-Proc").val()
        selectedTerm.det = $("#summaryForm-Details").val()
        let formdata = JSON.stringify(selectedTerm)

        console.log(formdata)
        return false;
    })

    function pasteProcs() {
        let PROCS = ["strzyżenie", "modelowanie", "farbowanie"]
        let select = $('#summaryForm-Proc')
        PROCS.forEach(function (val, i) {
            let item = document.createElement("option")
            let itemText = document.createTextNode(val)
            $(item).append(itemText)
            $(select).append(item)


        })
    }

    if ($('#summaryForm-Proc').children().length == 1) { pasteProcs() }

    $('#summaryForm-month').val(getMonth(selectedTerm.month))
    $('#summaryForm-day').val(selectedTerm.day)
    $('#summaryForm-hour').val(selectedTerm.hour)
    $('#summaryForm-min').val(selectedTerm.min)
}

function TP(place) { //scroll page to selected element
    function TP_action(position) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#" + position).offset().top
        }, 1000)
    }
    switch (place) {
        case 0:
            TP_action("monthAndYear")
            break;
        case 1:
            TP_action("SelectMenu")
            break;
        case 2:
            TP_action("Summary")
            break;
        default:
            return
    }
}

function getMonth(num) { //returns month name or false if passed num is not in range(0-11)
    switch (num) {
        case 0:
            return "Styczeń"
        case 1:
            return "Luty"
        case 2:
            return "Marzec"
        case 3:
            return "Kwiecień"
        case 4:
            return "Maj"
        case 5:
            return "Czerwiec"
        case 6:
            return "Lipiec"
        case 7:
            return "Sierpień"
        case 8:
            return "Wrzesień"
        case 9:
            return "Październik"
        case 10:
            return "Listopad"
        case 11:
            return "Grudzień"
        default:
            return false

    }
}