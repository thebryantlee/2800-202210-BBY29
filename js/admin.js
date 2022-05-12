// window.addEventListener("load", getUsers);
document.getElementById("signOutButton").addEventListener("click", logout);

function getUsers() {
  var xhr = new XMLHttpRequest();
  

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      // In admin.html or whatever the admin html page is
      // <tbody id="tablebody"></tbody>  // Add this
      const tbody = document.getElementById("tablebody");
      for (let i = 0; i < response.length; i++) {
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        td0.setAttribute("class", "ID");
        var td1 = document.createElement("td");
        td1.setAttribute("class", "user_name");
        var td2 = document.createElement("td");
        td2.setAttribute("class", "first_name");
        var td3 = document.createElement("td");
        td3.setAttribute("class", "last_name");
        var td4 = document.createElement("td");
        td4.setAttribute("class", "email");
        var td5 = document.createElement("td");
        td5.setAttribute("class", "phone_number");
        var td6 = document.createElement("td");
        td6.setAttribute("class", "admin");
        var td7 = document.createElement("td");
        td7.setAttribute("class", "actionsHeader");
        var text0 = document.createTextNode(response[i].ID);
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
        td0.appendChild(text0);
        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);
        td6.appendChild(text6);
        td7.appendChild(text7);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tbody.appendChild(tr);

        let user_name_records = document.querySelectorAll("td[class='user_name']");
                            for(let k = 0; k < user_name_records.length; k++) {
                              user_name_records[k].addEventListener("click", editCell);
                            }
        
        let first_name_records = document.querySelectorAll("td[class='first_name']");
                            for(let k = 0; k < first_name_records.length; k++) {
                              first_name_records[k].addEventListener("click", editCell);
                            }

        let last_name_records = document.querySelectorAll("td[class='last_name']");
                            for(let k = 0; k < last_name_records.length; k++) {
                              last_name_records[k].addEventListener("click", editCell);
                            }
        let email_records = document.querySelectorAll("td[class='email']");
                            for(let k = 0; k < email_records.length; k++) {
                              email_records[k].addEventListener("click", editCell);
                            }

        let phone_number_records = document.querySelectorAll("td[class='phone_number']");
                            for(let k = 0; k < phone_number_records.length; k++) {
                              phone_number_records[k].addEventListener("click", editCell);
                            }

        // let phone_number_records = document.querySelectorAll("td[class='phoneNumHeader']");
        //                     for(let k = 0; k < phone_number_records.length; k++) {
        //                       phone_number_records[k].addEventListener("click", editCell);
        //                     }                  
      }
    }
  };
  xhr.open("GET", `/users`, true);
  xhr.send();
}
getUsers();
async function editCell(e) {

  // add a listener for clicking on the field to change email
  // span's text
  let spanText = e.target.innerHTML;
  // span's parent (tr)
  let parent = e.target;
  // create a new input, and add a key listener to it
  let input = document.createElement("input");
  input.value = spanText;
  input.addEventListener("keyup", function(e) {
      let s = null;
      let v = null;
      // pressed enter
      if(e.which == 13) {          
          v = input.value;
          let newSpan = document.createElement("span");
          // have to wire an event listener to the new element
          newSpan.addEventListener("click", editCell);
          newSpan.innerHTML = v;
          parent.innerHTML = "";
          parent.appendChild(newSpan);
          console.log(parent);
        verifyEdits(parent);

          // let dataToSend = {id: parent.parentNode.querySelector(".idHeader").innerHTML,
          //                   user_name: v,
          //                   first_name: parent.parentNode.querySelector(".fNameHeader"),
          //                   last_name: parent.parentNode.querySelector(".lNameHeader").innerHTML,
          //                   email: parent.parentNode.querySelector(".emailHeader").innerHTML};
          
          // console.log("id=" + dataToSend.id + "&user_name=" + dataToSend.user_name);
          // // now send
          // const xhr = new XMLHttpRequest();
          // xhr.onload = function () {
          //     if (this.readyState == XMLHttpRequest.DONE) {

          //         // 200 means everthing worked
          //         if (xhr.status === 200) {
          //           getUsers();
          //         } else {

          //           // not a 200, could be anything (404, 500, etc.)
          //           console.log(this.status);

          //         }

          //     } else {
          //         console.log("ERROR", this.status);
          //     }
          // }
          // xhr.open("POST", "/update-user");
          // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          // xhr.send("id=" + dataToSend.id + "&user_name=" + dataToSend.user_name);

      }
  });
  parent.innerHTML = "";
  parent.appendChild(input);

}
async function verifyEdits(location) {
  console.log(location.className);
  console.log(location.children[0].innerHTML);
  console.log(location.parentNode.children[0].innerHTML);
  const data = {
    column: location.className,
    value: location.children[0].innerHTML,
    id: location.parentNode.children[0].innerHTML,
  };
  try {
    let responseObject = await fetch("/update-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status === 200) {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "success" +
          ' role="alert">' +
          "Your information has been updated" +
          "</div>";
        alertPlaceholder.append(wrapper);
    } else {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "There was problem updating your information" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }

      console.log(responseObject.status);
    }
    }
  }catch (error) {
    console.log(error);
  }
}
