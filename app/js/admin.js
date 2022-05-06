window.addEventListener('load', getUsers);

function getUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/users`, true);

    xhr.onload = function () {
        if (this.status == 200) {
            const response = JSON.parse(this.responseText);
            // In admin.html or whatever the admin html page is
            // <tbody id="tablebody"></tbody>  // Add this 
            const tbody = document.getElementById('tablebody');
            for (let i = 0; i < response.length; i++) {
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                var text1 = document.createTextNode(response[i].user_name);
                var text2 = document.createTextNode(response[i].first_name);
                var text3 = document.createTextNode(response[i].last_name);
                var text4 = document.createTextNode(response[i].email);
                var text5 = document.createTextNode(response[i].phone_number);
                var text6 = document.createTextNode(response[i].admin ? "Yes" : "No");
                td1.appendChild(text1);
                td2.appendChild(text2);
                td3.appendChild(text3);
                td4.appendChild(text4);
                td5.appendChild(text5);
                td6.appendChild(text6);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tbody.appendChild(tr);
            }
        }
    }

    xhr.send();
}
