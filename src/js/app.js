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

function notify(msg, type) {
    let className
    let html = document.createElement("span")
    let htmlMsg = document.createTextNode(msg)
    html.appendChild(htmlMsg)
    $("#notify").css("display", "block")

    if (type == 1) {
        className = "alert-success"
    } else {
        className = "alert-danger"
    }

    $("#notify").addClass(className)
    $("#notify").append(html)
    $("#notify").css("opacity", "1")

    setTimeout(function () {
        $("#notify").css("opacity", "0")
        setTimeout(function () {
            $("#notify").html('')
        }, 1000)
    }, 4000)
}

function Reservation() {
    $("#calendarContent").css("display", "none")
    $("#SelectMenu").css("display", "none")
    $("#Summary").css("display", "none")
    $("#Reservation").css("display", "block")

    $("#data").html(selectedTerm.data)
    $("#proc").html(selectedTerm.proc)
    selectedTerm.det == '' ? $("#det").html("Brak") : $("#det").html(selectedTerm.det)


    let date = selectedTerm.FullDate
    $("#date").html(date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate())
    let time = date.getHours() + " : " + date.getMinutes()
    $("#hour").html(date.getMinutes() < 10 ? time += 0 : time)
}

function Summary() { //handles summary section
    // add EVH to form
    $('#summaryForm').on('submit', function () {
        // let formdata = $(this).serialize()
        selectedTerm.data = $("#summaryForm-Data").val()
        selectedTerm.proc = $("#summaryForm-Proc").val()
        selectedTerm.det = $("#summaryForm-Details").val()
        let formdata = JSON.stringify(selectedTerm)

        $.post("actions/addTerm.php", formdata)
            .always(function () {
                $('#summaryForm input[type="submit"]').attr("disabled", "disabled")
                $("#loader").css("display", "flex")
            })
            .done(function (data) {
                //console.log(JSON.parse(data))
                data = JSON.parse(data)
                console.log("test")

                setTimeout(() => {
                    if (data.status) {
                        notify("pomyślnie zarezerwowano wizytę", 1)
                        Reservation()
                    } else {
                        notify("wystąpił błąd", 0)
                        $('#summaryForm input[type="submit"]').prop("disabled", false)
                    }
                    $("#loader").css("display", "none")
                }, 1000)

                if (data.status)
                    TP(0)
            })
            .fail(function (data) {
                console.log("no", data)
            })
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
            TP_action("Reservation")
            break;
        case 1:
            TP_action("monthAndYear")
            break;
        case 2:
            TP_action("SelectMenu")
            break;
        case 3:
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