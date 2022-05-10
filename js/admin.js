window.addEventListener("load", getUsers);
document.getElementById("signOutButton").addEventListener("click", logout);

function getUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/users`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      // In admin.html or whatever the admin html page is
      // <tbody id="tablebody"></tbody>  // Add this
      const tbody = document.getElementById("tablebody");
      for (let i = 0; i < response.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var text1 = document.createTextNode(response[i].user_name);
        var text2 = document.createTextNode(response[i].first_name);
        var text3 = document.createTextNode(response[i].last_name);
        var text4 = document.createTextNode(response[i].email);
        var text5 = document.createTextNode(response[i].phone_number);
        var text6 = document.createTextNode(response[i].admin ? "Yes" : "No");
        var text7 = document.createElement("button");
        text7.setAttribute("id", "deleteTuple" + i);
        text7.setAttribute("class", "btn btn-light");
        var text7a = document.createElement("img");
        text7a.setAttribute("src", "/img/icons/basic/trash_full.svg");
        text7a.setAttribute("alt", "testing image");
        text7.appendChild(text7a);
        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);
        td6.appendChild(text6);
        td7.appendChild(text7);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tbody.appendChild(tr);
      }
    }
  };

  xhr.send();
}

// Gabriel's code below (start)
async function logout() {
  try {
    let responseObject = await fetch("/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (responseObject.status === 200) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}
