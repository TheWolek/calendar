function pasteHours() {
    function generateHours(hour, Time) {
        //let hour = 9
        let min = 0
        for (let i = 0; i < Time * 2; i++) {
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
                item.setAttribute("id", hour + "0")
                item.setAttribute("onClick", 'setTerm("' + hour + ':0")')
            } else {
                min = 0
                item.setAttribute("id", hour + "3")
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

    //let dayItem = $('#' + selectedTerm.day)
    let Weekday = selectedTerm.FullDate.getDay()
    let ul = $('#Term-list')
    ul.html('')
    //  dayItem.hasClass('bg-red')
    if (Weekday == 0) {
        let item = document.createElement("p")
        let itemText = document.createTextNode("W niedzielę i święta nie pracujemy. Wybierz proszę inny termin")
        item.appendChild(itemText)
        ul.append(item)
    } else if (Weekday == 6) {
        generateHours(9, 5)
    } else {
        generateHours(9, 9)
    }
    findBusy()
}

function findBusy() {
    let selectedDate = { date: selectedTerm.getFullDate("-") }
    //console.log(selectedDate)
    $.post("actions/findTerms.php", selectedDate)
        .always(() => {

        })
        .done((data) => {
            data = JSON.parse(data)
            //console.log(data)
            if (data.status) {
                found = data.data
                found.forEach((val, i) => {
                    let date = val.date
                    let hour = date.substr(11, 2)
                    let min = date.substr(14, 1)
                    date = hour + min
                    $(function () {
                        // $("#" + date).css("background", "var(--redColor)")
                        $("#" + date).addClass("busy")
                        $("#" + date).removeAttr("onclick")
                    })
                })
            }
        })
        .fail((data) => {

        })

    if (selectedTerm.FullDate.getFullYear() == today.getFullYear() && selectedTerm.FullDate.getMonth() == today.getMonth() && selectedTerm.FullDate.getDate() == today.getDate()) {
        let hour = today.getHours()
        let min = today.getMinutes()
        let maxToDelete = min < 30 ? hour + "0" : (hour + 1) + "0"

        $("#Term-list li").each((i, val) => {
            if (parseInt($(val).attr("id")) <= parseInt(maxToDelete)) {

                $(val).removeAttr("onclick")
                $(val).css("filter", "contrast(.3)")
            }
        })

    }
}

function showTerms() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#SelectMenu").offset().top
    }, 1000)
    pasteHours()
}

function setTerm(hour) {
    hour = hour.split(":")

    selectedTerm.hour = hour[0]
    selectedTerm.min = hour[1] + "0"

    selectedTerm.FullDate = new Date(currentYear, selectedTerm.month, selectedTerm.day, selectedTerm.hour, selectedTerm.min)
    //console.log(JSON.parse(JSON.stringify(selectedTerm)))
    $('#Summary').css('display', 'block')
    Summary()
    TP(3)
}