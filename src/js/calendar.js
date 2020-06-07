function selectDay(day, month) {
    function ifSun() {
        if (dayItem.hasClass('bg-red')) {
            dayItem.addClass('selected-red')
        } else
            dayItem.addClass('selected')
    }
    let dayItem = $('#' + day)
    if (selectedTerm.day == undefined) {
        ifSun()
        selectedTerm.day = day
        selectedTerm.month = month
        selectedTerm.FullDate = new Date(currentYear, month, day)
    } else {
        $('#' + selectedTerm.day).removeClass('selected')
        $('#' + selectedTerm.day).removeClass('selected-red')
        ifSun()
        selectedTerm.day = day
        selectedTerm.month = month
        selectedTerm.FullDate = new Date(currentYear, month, day)
    }
    $('#SelectMenu').css('display', 'block')
    showTerms()

}

function pasteMonthToSelect() {
    months.forEach(function (val, i) {
        $('#month').append('<option value="' + i + '">' + val + '</option>')
    })
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    //selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                $(cell).append(cellText);
                $(row).append(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today");
                } // color today's date
                cell.appendChild(cellText);
                cell.setAttribute("id", date)
                if (j == 0)
                    cell.classList.add("bg-red")
                cell.setAttribute("onClick", "selectDay(" + date + ", " + month + ")")
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}