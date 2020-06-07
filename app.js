//vars
let selectedTerm = {
    month: undefined,
    day: undefined,
    hour: undefined,
    min: undefined
}

$(function () {
    $('#summaryForm').on('Submit', function () {
        let formdata = $(this).serialize()

        console.log(formdata)
        return false;
    })
})

function pasteHours() {
    let dayItem = $('#' + selectedTerm.day)
    let ul = $('#Term-list')
    ul.html('')

    if (dayItem.hasClass('bg-red')) {
        let item = document.createElement("p")
        let itemText = document.createTextNode("W niedzielę i święta nie pracujemy. Wybierz proszę inny termin")
        item.appendChild(itemText)
        ul.append(item)
    } else {
        let hour = 9
        let min = 0
        for (let i = 0; i <= 18; i++) {
            let item = document.createElement("li");
            let itemText
            if (hour < 10) {
                itemText = "0" + hour
            } else {
                itemText = hour
            }

            if (min == 0) {
                min = 1
                itemText = document.createTextNode(itemText + ":00")
                item.setAttribute("id", hour + ":0")
                item.setAttribute("onClick", 'setTerm("' + hour + ':0")')
            } else {
                min = 0
                item.setAttribute("id", hour + ":3")
                item.setAttribute("onClick", 'setTerm("' + hour + ':3")')
                hour++
                itemText = document.createTextNode(itemText + ":30")
            }
            // itemText = document.createTextNode(i);
            item.appendChild(itemText)
            item.setAttribute("class", "list-group-item")

            ul.append(item)
        }
    }
}

function showTerms() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#SelectMenu").offset().top
    }, 1000)
    pasteHours()
}

function setTerm(hour) {
    let free = true
    hour = hour.split(":")
    // let term = {
    //     month: currentMonth,
    //     day: selectedDay,
    //     hour: hour[0],
    //     min: hour[1] + "0"
    // }

    selectedTerm.hour = hour[0]
    selectedTerm.min = hour[1]
    console.log(JSON.parse(JSON.stringify(selectedTerm)))
    if (free) {
        $('#Summary').css('display', 'block')
        Summary()
        TP(2)
    } else {
        //else show notify
    }
}

function Summary() {
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
    pasteProcs()

    $('#summaryForm-month').val(getMonth(selectedTerm.month))
    $('#summaryForm-day').val(selectedTerm.day)
    $('#summaryForm-hour').val(selectedTerm.hour)
    $('#summaryForm-min').val(selectedTerm.min + "0")
}

function TP(place) {
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
    }
}

function getMonth(num) {
    switch (num) {
        case 0:
            out = "Styczeń"
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