
let studentCounter = 1;

function addRow() {

    let studentId = studentCounter++; // auto number
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let major = document.getElementById("major").value;
    let courseName = document.getElementById("courseName").value;
    let courseNumber = document.getElementById("courseNumber").value;

    if (
        name === "" ||
        address === "" ||
        phone === "" ||
        major === "" ||
        courseName === "" ||
        courseNumber === ""
    ) {
        alert("Fill all fields");
        return;
    }

    let table = document
        .getElementById("dataTable")
        .getElementsByTagName("tbody")[0];

    let row = table.insertRow();

    row.insertCell(0).innerHTML = studentId;
    row.insertCell(1).innerHTML = name;
    row.insertCell(2).innerHTML = address;
    row.insertCell(3).innerHTML = phone;
    row.insertCell(4).innerHTML = major;
    row.insertCell(5).innerHTML = courseName;
    row.insertCell(6).innerHTML = courseNumber;

    // edit button
    let editCell = row.insertCell(7);
    editCell.innerHTML =
        '<button onclick="editRow(this)">Edit</button>';

    // delete button
    let deleteCell = row.insertCell(8);
    deleteCell.innerHTML =
        '<button onclick="deleteRow(this)">Delete</button>';

    clearForm();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("major").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseNumber").value = "";
}

function deleteRow(btn) {
    let row = btn.parentNode.parentNode;
    row.remove();
}

function editRow(btn) {

    let row = btn.parentNode.parentNode;

    document.getElementById("name").value = row.cells[1].innerHTML;
    document.getElementById("address").value = row.cells[2].innerHTML;
    document.getElementById("phone").value = row.cells[3].innerHTML;
    document.getElementById("major").value = row.cells[4].innerHTML;
    document.getElementById("courseName").value = row.cells[5].innerHTML;
    document.getElementById("courseNumber").value = row.cells[6].innerHTML;

    row.remove();
}

function saveCSV() {

    let table = document.getElementById("dataTable");
    let csv = [];

    for (let i = 0; i < table.rows.length; i++) {

        let row = [];
        let cols = table.rows[i].cells;

        for (let j = 0; j < cols.length - 2; j++) {
            row.push(cols[j].innerText);
        }

        csv.push(row.join(","));
    }

    downloadCSV(csv.join("\n"));
}

function downloadCSV(data) {

    let blob = new Blob([data], { type: "text/csv" });

    let url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "students.csv");

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
