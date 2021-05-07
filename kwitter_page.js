//YOUR FIREBASE LINKS
var firebaseConfig = {
    apiKey: "AIzaSyDP6xK2Yk6N77jXcDncmWG1RPjWmre7EmY",
    authDomain: "mycity-mlv9.firebaseapp.com",
    databaseURL: "https://mycity-mlv9-default-rtdb.firebaseio.com",
    projectId: "mycity-mlv9",
    storageBucket: "mycity-mlv9.appspot.com",
    messagingSenderId: "794686430177",
    appId: "1:794686430177:web:3747fd95a785f4ee3f90a0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick='updateLike(this.id)'>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function update(message_id) {
    console.log("click on lick button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}


function Logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}