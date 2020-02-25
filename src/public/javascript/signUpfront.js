function fNameFunction() {
    var name = document.getElementById("khedma").value;
    var message = document.getElementById("fName");
    if (name.length < 3) {
        message.innerHTML = "last name is too short!";
        return false;
    }
    else {
        message.innerHTML = "";
        return true;
    }
}




function lNameFunction() {
    // var name = document.getElementById("lastname").value;
    // var message = document.getElementById("lName");


    // if (name.length < 3) {
    //     message.innerHTML = "last name is too short !";
    //     return false;
    // }
    // else {
    //     message.innerHTML = "";
    //     return true;
    // }
    return true;

}




function userName() {
    var name = document.getElementById("username").value;
    var message = document.getElementById("Uname");


    if (name.length < 3) {
        message.innerHTML = "username is too short !";
        return false;
    }
    else {
        message.innerHTML = "";
        return true;
    }

}

function emailAdd() {
    var mail = document.getElementById("email").value;
    var at;
    var point;
    var message = document.getElementById("emailM");

    at = mail.lastIndexOf("@");
    point = mail.lastIndexOf(".");
    if (at == -1 || point == -1 || at > point) {
        message.innerHTML = "invalid email form";
        return false;
    }
    else {
        message.innerHTML = "";
        return true;
    }


}

function passwordFn() {
    var entier = false;
    var min = false;
    var maj = false;
    var minS = "abcdefghijklmnopqrstuvwxyz";
    var majS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var mdp = document.getElementById("password").value;
    var message = document.getElementById("passwordId");

    var x;


    for (var i = 0; i < 10; i++) {
        if (mdp.search(i) !== -1) {
            entier = true;
        }
    }
    x = mdp.length;
    for (var j = 0; j < x; j++) {

        if (minS.search(mdp[j]) !== -1) min = true;
        if (majS.search(mdp[j]) !== -1) maj = true;
    }

    if (entier == false || min === false || maj === false) {
        message.innerHTML = " to be safe, the password must contain integers, capital and lowcase character";
        return false;
    }
    else {
        if (mdp.length < 6) {
            message.innerHTML = "password is too short !";
            return false;
        } else {
            message.innerHTML = "";
            return true;
        }


    }


}





function verifyPassword() {
    var mot = document.getElementById("password").value;
    var cmdpa = document.getElementById("confPassword").value;
    var cmodp = document.getElementById("cPassword");

    if (cmdpa !== mot) {
        cmodp.innerHTML = "password is wrong!";
        return false;
    }

    else {
        cmodp.innerHTML = "";
        return true;
    }


}


// function submitFunction() {


//     if (fNameFunction() && lNameFunction() && userName() && emailAdd() && passwordFn() && verifyPassword()) {
//     }
//     else {
//         document.getElementById("error").addEventListener("click", function (event) {
//             event.preventDefault()
//         });

//     }
// }
