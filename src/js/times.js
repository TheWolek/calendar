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
    selectedTerm.min = hour[1] + "0"

    selectedTerm.FullDate = new Date(currentYear, selectedTerm.month, selectedTerm.day, selectedTerm.hour, selectedTerm.min)
    //console.log(JSON.parse(JSON.stringify(selectedTerm)))
    if (free) {
        $('#Summary').css('display', 'block')
        Summary()
        TP(3)
    } else {
        //else show notify
    }
}