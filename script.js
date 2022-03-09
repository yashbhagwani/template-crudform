var selectedRow = null

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["firstname"] = document.getElementById("InputFirstName").value;
    formData["lastname"] = document.getElementById("InputLastName").value;
    formData["email"] = document.getElementById("InputEmail").value;
    formData["gender"] = document.querySelector('input[id ="inlineRadio"]:checked').value;
    formData["password"] = document.getElementById("InputPassword").value;
    formData["confirmpassword"] = document.getElementById("InputConfirmPassword").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("userlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.confirmpassword;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onClick="onEdit(this)" class="btn btn-primary"
                        style="background-color: #5a61ed;">Edit</button>
                        <button onClick="onDelete(this)" class="btn btn-primary"
                        style="background-color: #5a61ed;">Delete</button>`;
}

function resetForm() {
    document.getElementById("InputFirstName").value = "";
    document.getElementById("InputLastName").value = "";
    document.getElementById("InputEmail").value = "";
    document.getElementById("inlineRadio").value = "";
    document.getElementById("InputPassword").value = "";
    document.getElementById("InputConfirmPassword").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("InputFirstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("InputLastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("InputEmail").value = selectedRow.cells[2].innerHTML;
    document.getElementById("inlineRadio").value = selectedRow.cells[3].innerHTML;
    document.getElementById("InputPassword").value = selectedRow.cells[4].innerHTML;
    document.getElementById("InputConfirmPassword").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstname;
    selectedRow.cells[1].innerHTML = formData.lastname;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.gender;
    selectedRow.cells[4].innerHTML = formData.confirmpassword;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("userlist").deleteRow(row.rowIndex);
        resetForm();
    }
}

function searchFunc() {
    let filter = document.getElementById("searchbar").value.toUpperCase();
    let myTable = document.getElementById("userlist");
    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            let textvalue = td.textContent || td.innerHTML;
            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}