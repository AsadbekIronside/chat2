var titleArray = [];

async function addMessage(message, to_user_info) {  

    const time = new Date(parseInt(message.create_time));
    const currentdate = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var months = time.getMonth();
    var days = time.getDate();
    var size, name;
    var filename;
    // console.log(JSON.parse(message.message));

    if(message.type !== 'text'){
        size = parseInt(JSON.parse(message.message).size);
    }
    if(message.type === 'application'){
        name = JSON.parse(message.message).name;
        if(name.split(' ').length === 1 && name.length>20){
            name = '...'+name.substring(name.length-20);
            // console.log(name);
        }

        filename = JSON.parse(message.message).savedName;
        sessionStorage.removeItem('filename');
        sessionStorage.setItem('filename', filename);
    }

    if(size > 1000000){
        size = Math.trunc(size/100000)/10;
        size +=' MB';        
    }else{
        size = Math.trunc(size/100)/10;
        size += ' KB';
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    var temp = '';
    var dayTitle = '';
    // console.log('months='+months);
    // console.log('days='+days);

    if (months === currentdate.getMonth() && days === currentdate.getDate()) {

        dayTitle += 'Today';
        // console.log(dayTitle);

        if (!titleArray.includes(dayTitle)) {

            temp += `<li> 
                       <div class="chat-day-title">
                            <span class="title">${dayTitle}</span>
                       </div>
                     </li>`;
            titleArray.push(dayTitle);
        }

    }
    else if (months === currentdate.getMonth() && days < currentdate.getDate()) {

        dayTitle += days + ' ';

        switch (months) {
            case 0: dayTitle += 'January'; break;
            case 1: dayTitle += 'February'; break;
            case 2: dayTitle += 'March'; break;
            case 3: dayTitle += 'April'; break;
            case 4: dayTitle += 'May'; break;
            case 5: dayTitle += 'June'; break;
            case 6: dayTitle += 'July'; break;
            case 7: dayTitle += 'August'; break;
            case 8: dayTitle += 'September'; break;
            case 9: dayTitle += 'Oktober'; break;
            case 10: dayTitle += 'November'; break;
            case 11: dayTitle += 'December'; break;
        }

        if (!titleArray.includes(dayTitle)) {

            temp += `<li> 
                         <div class="chat-day-title">
                           <span class="title">${dayTitle}</span>
                         </div>
                    </li>`;
            titleArray.push(dayTitle);

        }
    }
    else if (months <= currentdate.getMonth()) {
        dayTitle += days + ' ';

        switch (months) {
            case 0: dayTitle += 'January'; break;
            case 1: dayTitle += 'February'; break;
            case 2: dayTitle += 'March'; break;
            case 3: dayTitle += 'April'; break;
            case 4: dayTitle += 'May'; break;
            case 5: dayTitle += 'June'; break;
            case 6: dayTitle += 'July'; break;
            case 7: dayTitle += 'August'; break;
            case 8: dayTitle += 'September'; break;
            case 9: dayTitle += 'Oktober'; break;
            case 10: dayTitle += 'November'; break;
            case 11: dayTitle += 'December'; break;
        }

        if (!titleArray.includes(dayTitle)) {

            temp += `<li> 
                         <div class="chat-day-title">
                           <span class="title">${dayTitle}</span>
                         </div>
                    </li>`;
            titleArray.push(dayTitle);

        }

    }


    if (message.from_user_id !== to_user_info.user_id) {    

        if(message.type === 'text'){
            temp += ` <li class="right" id="message${message.message_id}">
                        <div class="conversation-list">
                            <div class="ctext-wrap">
                                <div class="ctext-wrap-content">
                                    <p class="mb-0" id="mess${message.message_id}">${message.message}</p>
                                    <div class="btn-group dropstart" style="position:absolute; bottom:26px; margin-left:15px;">
                                            <a class="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                                            <i class="ri-more-2-fill ri-lg"></i>
                                            </a>
                                        <div class="dropdown-menu myDropdown" style="position:absolute; min-width:0.3rem;">
                                            <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#editMessage" data-bs-toggle="modal"
                                             onclick="edit_message(${message.message_id})"><i class="ri-pencil-fill text-primary"></i></a>
                                            <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#" onclick="delete_message(${message.message_id })">
                                            <i class="ri-delete-bin-7-fill text-danger"></i></a>
                                        </div>
                                    </div>
                                    <p style="position:absolute; right:3px; top:50px;"><i class="ri-check-line ri-lg" style="text-align:end;"></i></p>
                                </div>
                                <p class="chat-time mb-0 ms-1">${hours}:${minutes}</p>
                                 
                            </div> 
                        </div>
                    </li>`;

        }else if(message.type === 'image'){

            temp +=
             ` <li class="right" id="message${message.message_id}">
                    <div class="conversation-list">
                        <div class="ctext-wrap" style="width:50%; margin-left:50%;">
                            <div class="ctext-wrap-content" style="padding:0px;"> 
                                <a href="#" onclick="show_photo_sent(${message.message_id})">
                                    <img class="mb-0 img-thumbnail" src="public/assets/send/${JSON.parse(message.message).savedName}" 
                                    style="width:100%; margin:0px;">
                                </a>
                                <div class="btn-group dropstart" style="position:absolute; bottom:26px;">
                                        <a class="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                                          <i class="ri-more-2-fill ri-lg"></i>
                                        </a>
                                    <div class="dropdown-menu myDropdown" style="position:absolute; min-width:0.3rem;">
                                        <a class="dropdown-item text-danger" style="padding:0.3rem 1.2rem;" href="#" onclick="delete_message(${message.message_id })"><i class="ri-delete-bin-7-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                <p class="chat-time mb-0 ms-1">${hours}:${minutes}</p>
                                </div>
                                <div class="col-6">
                                    <p style="text-align:end; margin-top:4px; margin-right:2px"><i class="ri-check-line ri-lg"></i></p>
                                </div>
                            </div>
                          
                        </div>
            
                    </div>
                </li>`;

        }else{
        
            temp +=
            ` <li class="right" id="message${message.message_id}">
                   <div class="conversation-list">
                       <div class="ctext-wrap">
                           <div class="ctext-wrap-content ms-1"> 
                             <div class="" style="display:flex">
                                    <div>
                                        <a class="align-middle" onclick="open_file()">
                                            <i class="bi bi-file-earmark-text" style="font-size:2rem"></i>
                                        </a>
                                    </div>
                                    <div style="margin-top:10px; margin-left:3px">
                                        <h6 style="white-space:pre-line;" >${name}</h6>
                                        <small class="fw-bolder text-primary align-left">${size}</small>
                                    </div>
                             </div>
                             
                               <div class="btn-group dropstart" style="position:absolute; bottom:26px; margin-left:12px;">
                                       <a class="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                                       <i class="ri-more-2-fill ri-lg"></i>
                                       </a>
                                   <div class="dropdown-menu myDropdown" style="position:absolute; min-width:0.3rem;">
                                       <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#" onclick="delete_message(${message.message_id })">
                                       <i class="ri-delete-bin-7-fill text-danger"></i></a>
                                   </div>
                                   <p style="position:absolute; right:21px; top:30px;"><i class="ri-check-line ri-lg" style="text-align:end;"></i></p>
                               </div>
                       
                            </div>
                       </div>
                       <p class="chat-time mb-0 ms-1">${hours}:${minutes}</p>
                       
                       </div>
               </li>`;


        }
    } else {
        if(message.type === 'text'){

            temp += 
            `<li >
                <div class="conversation-list">
                    <div class="chat-avatar">
                        <img src="public/assets/send/uploadImages/${to_user_info.profile_photo}" alt="avatar-2">
                    </div>
                    <div class="ctext-wrap">
                        <div class="conversation-name">${to_user_info.account_name}</div>
                        <div class="ctext-wrap-content">
                            <p class="mb-0">${message.message}</p>
                        </div>
                        <p class="chat-time mb-0">${hours}:${minutes}</p>
                    </div>
                    
                </div>
            </li>`

        }else if(message.type === 'image'){

               temp += 
               `<li >
                   <div class="conversation-list">
                       <div class="chat-avatar">
                           <img src="public/assets/send/uploadImages/${to_user_info.profile_photo}" alt="avatar-2">
                       </div>
                       <div class="ctext-wrap" style="width:50%;">
                           <div class="conversation-name">${to_user_info.account_name}</div>
                           <div class="ctext-wrap-content"  style="padding:0px;">
                                <a href="#" onclick="show_photo_sent(${message.message_id})">
                                    <img class="mb-0 img-thumbnail" src="public/assets/send/${JSON.parse(message.message).savedName}" 
                                    style="width:100%;">
                                </a>
                           </div>
                           <p class="chat-time mb-0">${hours}:${minutes}</p>
                       </div>
                       
                   </div>
               </li>`

        }else{

            temp += 
            `<li >
                <div class="conversation-list">
                    <div class="chat-avatar">
                        <img src="public/assets/send/uploadImages/${to_user_info.profile_photo}" alt="avatar-2">
                    </div>
                    <div class="ctext-wrap">
                        <div class="conversation-name">${to_user_info.account_name}</div>
                        <div class="ctext-wrap-content" style="display:flex">
                            <div style="margin-right:3px;">
                                <a href="#" onclick="open_file()" class="align-middle  text-white">
                                    <i class="bi bi-file-earmark-text" style="font-size:2rem"></i>
                                </a>
                            </div>
                            <div style="margin-top:10px;">
                                <h6 style="white-space:pre-line; color:white;" >${name}</h6>
                                <small class="fw-bolder text-primary text-white">${size}</small>
                            </div>
                         </div>
                        <p class="chat-time mb-0">${hours}:${minutes}</p>
                    </div>
                    
                </div>
            </li>`

        }
    }

    $('#messageList').append(temp);
    scrollToBottom();
}
async function sendMessage() {
    const mess = document.getElementById('message').value;
    const toUserId = document.getElementById('userId').innerHTML;
    const time = Date.now();

    // console.log(toUserId);

    document.getElementById('message').value = '';

    if (!mess)
        return;

    await fetch('/post-messages', {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            message: mess,
            createTime: time,
            to_user_id: toUserId
        })
    });
}
var count = 0;

async function getMessages(to_user_id) {
    // console.log('count=' + count);
    const response = await fetch('/get-messages?count=' + count + '&toUserId=' + to_user_id)
        .then(response => response.json());

    const messageList = response.array;
    // console.log(messageList);
    const to_user_info = response.to_user_info;

    if (messageList.length > 0) {
        count = messageList[messageList.length - 1].message_id;
        // console.log('zzzzzzzzzzzzzzzzzzzzz=' + count);

        for(let i = 0; i < messageList.length; i++){

           await addMessage(messageList[i], to_user_info);

        }
    }
}

const delete_message = async(id) => {
    let result = await fetch('/delete-message?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(result){
        $('#message'+id).remove();
        Swal.fire({
            position:'top-end',
            title: 'Deleted!',
            icon: 'success',
            showConfirmButton:false,
            timer:1500,
            customClass:'swal-class'
          });
    }else{
        Swal.fire({
            position:'top-end',
            title: 'Failed!',
            text: 'Unknown error occured.',
            icon: 'error',
            showCancelButton:false,
            timer:1500,
            customClass:'swal-class'
          })
    }
    
}

const edit_message = async (id) => {
    
    let mess = await fetch('/get-edit-message?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);})
    
    // console.log(mess);
    if(mess){

        $('#updateMessage').val(mess.message);
        $('#sendEditMess').click(async ()=>{

            var message = $('#updateMessage').val();

            if(message.localeCompare(mess.message) !== 0){

                var result = await fetch ('/edit-message?id='+id, {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({mess: message})
                })
                .then(response => response.json())
                .then(response => response.result)
                .catch(err => {console.log(err);});

                if(result){
                    Swal.fire({
                        position:'top-end',
                        title: 'Edited!',
                        icon: 'success',
                        showConfirmButton:false,
                        timer:1500,
                        customClass:'swal-class'
                      });
                      $('#mess'+mess.message_id).html(message);
                }else{
                    Swal.fire({
                        position:'top-end',
                        title: 'Failed!',
                        text: 'Unknown error occured.',
                        showConfirmButton:false,
                        icon: 'error',
                        timer:1500,
                        customClass:'swal-class2'
                      })
                }

            }

        });

        $('#updateMessage').keypress((event) => { 
            if(event.key === 'Enter'){
                event.preventDefault();
                $('#sendEditMess').click();
            }
        });
    }
}

//scroll
const scrollToBottom = () => {
    // get the div element by its id
    const div = document.getElementById("chat_area");
    // smooth scroll to the bottom of the div
    div.scrollTo({
        top: div.scrollHeight,
        behavior: 'smooth'
    });
}
(scrollToBottom)();

///////////////////contacts

var result;

const add_contacts = async (user) => {
    const contactTemp =
         ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" onclick="start_new_chat(${user.user_id})"
          id="a${user.user_id}">
                    <div class="d-flex">
                        <div class="user-img away align-self-center" style="margin-right:50px;">
                            <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats"
                             alt="avatar-3" style="height:65px!important; width:65px!important;">
                        </div>
                        <div class="flex-1 overflow-hidden align-self-center">
                            <h3 class="text-truncate font-size-15 mb-1">${user.account_name}</h3>
                            <p class="mb-0 text-primary font-size-13">@${user.username}</p>
                        </div>
                    </div>
            </a>`;

    result += contactTemp;
}
const get_contacts = async () => {
    result = '';
    $('#modal_body_group').html('');

    await fetch('/get-contacts')
        .then(response => response.json())
        .then(data => {
            console.log('contacts'+ data);
            localStorage.removeItem('contacts');
            localStorage.setItem('contacts', JSON.stringify(data));
            data.contacts.forEach(user => add_contacts(user));
            $('#modal_body_group').html('');
            $('#modal_body_group').append(result);
        });
}

var myInterval = setInterval(() => { }, 10000);

var activeTimeInterval = setInterval(()=>{}, 10000);

const start_new_chat = async (userId) => {

    // console.log('This inside start_chat');
    count = 0;
    clearInterval(myInterval);

    const response = await fetch('/start-chat?userId=' + userId)
        .then(response => response.json())
        .then(response => response.result)
        .catch(err => {console.log(err);});

    // console.log(response);

    const toUser = $('#to_user');
    toUser.html('');

    var result;

    if(!response.active_time){
        result =
        `<h5 class="font-size-15 mb-1 text-truncate">${response.account_name}<p id="userId" hidden>${response.user_id}</p></h5>
        <p class="text-truncate mb-0" id="activeTime"><i class="mdi mdi-circle text-success align-middle me-1"></i>a long time ago</p>`;
        
    }else{

        // console.log('Inside else');

        var active_time = parseInt(response.active_time);
        var delta = Date.now() - active_time;
        var resTime = '';
    
        if(delta >= 2*30*24*60*60*1000){
            resTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
        }
        else if(delta >= 30*24*60*60*1000){
            resTime += "last month";
        }
        else if(delta >= 2*7*24*60*60*1000){
            resTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
        }
        else if(delta >= 7*24*60*60*1000){
            resTime += "last week";
        }
        else if(delta >= 2*24*60*60*1000){
            resTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
        }
        else if(delta >= 24*60*60*1000){
            resTime += "yesterday";
        }else if(delta >= 2*60*60*1000){
            resTime += Math.trunc(delta / (60*60*1000))+" hours ago";
        }
        else if(delta >= 60*60*1000){
            resTime += 'an hour ago';
        }
        else if(delta >= 2*60*1000){
            resTime += Math.trunc(delta / (60*1000))+" minutes ago";
        }else{
            resTime += "Active now";
        }    

        if(resTime !== "Active now"){

            result =
            `<h5 class="font-size-15 mb-1 text-truncate">${response.account_name}<p id="userId" hidden>${response.user_id}</p></h5>
            <p class="text-truncate mb-0" id="activeTime"><i class="mdi mdi-circle text-warning align-middle me-1"></i>${resTime}</p>`;

        }else{

            result =
            `<h5 class="font-size-15 mb-1 text-truncate">${response.account_name}<p id="userId" hidden>${response.user_id}</p></h5>
            <p class="text-truncate mb-0" id="activeTime"><i class="mdi mdi-circle text-success align-middle me-1"></i>${resTime}</p>`;

        }

        clearInterval(activeTimeInterval);

        activeTimeInterval = setInterval(async()=>{
        await get_active_time(response.user_id);
        }, 60000);
    
    }

    toUser.append(result);

    $('#messageList').html('');

    const cardBody =
        `<h5 class="card-title fw-bolder">Name:</h5>
            <h6 class="card-text ">${response.account_name}</h6>
            <h5 class="card-title fw-bolder">Username:</h5>
            <p class="card-text ">@${response.username}</p>
            <p class="card-text"><small class="text-primary">Active now</small></p>`;

    $('#cardBody').empty();
    $('#cardBody').append(cardBody);

    $('#toUserPhoto').html('');
    $('#toUserPhoto').append(`<img class="card-img img-fluid rounded-circle img-thumbnail" 
    style="background-position: center; height: 140px; width: 140px; object-fit: cover;"
     src="public/assets/send/uploadImages/${response.profile_photo}" alt="Card image">`);

    document.getElementById('search').removeAttribute('hidden');
    document.getElementById('params').removeAttribute('hidden');

    let chatTemp = 
    ` <a class="dropdown-item" href="#toUserProfile" data-bs-toggle="modal">View Profile</a>
      <a class="dropdown-item text-danger" href="javascript:void(0);" onclick="clearChat2()">Clear chat</a>`;

    $('#dropdownMenu').html('');

    $('#dropdownMenu').append(chatTemp);

    myInterval = setInterval(async () => {
        await getMessages(userId);
        // console.log('log ishlavotti');
    }, 800);

    document.querySelector('#modal_close_contact').click();

    ////////
    if($('#ChatTitle').html() === 'Groups'){

        document.getElementById('searchGroupChat').outerHTML = `<input type="text" class="form-control" placeholder="Search..." id="searchChats">`;
        await get_chats();
        $('#ChatTitle').html('Chats');
    }
    /////////

    const contactTemp =
    ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder" onclick="start_chat(${response.user_id})" id="b${response.user_id}">
            <div class="d-flex">
                <div class="user-img away  align-self-center me-4 ">
                    <img src="public/assets/send/uploadImages/${response.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3" style="height:50px;width:50px;">
                </div>
                <div class="flex-1 overflow-hidden align-self-center">
                    <h5 class="text-truncate font-size-14 mb-1">${response.account_name}</h5>
                </div>
            </div>
       </a>`;

    $('#chatsGroup').append(contactTemp);

        ///enter messaage div
        let enterMessage = 
        `<div class="col-auto" style="padding:0px;">
            <div class="position-relative">
                <label class="form-label" for="shareFile">
                    <i class="ri-attachment-2 ri-2x align-middle"></i>
                    <input class="form-control" type="file" id="shareFile" hidden required onchange="sendFileModal()">
                </label>      
            </div>
        </div>
        <div class="col">
            <div class="position-relative">
                <input id="message" name="message" type="text" class="form-control chat-input" placeholder="Enter Message...">        
            </div>
        </div>
        <div class="col-auto">
            <button type="button" id="send_button" class="btn btn-primary chat-send w-md waves-effect waves-light" onclick="sendMessage()"><span class="d-none d-sm-inline-block me-2">Send</span> <i class="mdi mdi-send"></i></button>
        </div>`;

        $('#enterMessage').html('');
        $('#enterMessage').append(enterMessage);

    //press enter
    document.getElementById('message').addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById('send_button').click();
        }
    });

};

// get active time 

const get_active_time = async(id) => {

    // console.log('get_active_time ishlavotti');
    
    let result = await fetch('/get-active-time?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(!result){
        $('#activeTime').html("a long time ago");
        return;
    }

    // console.log(result);
    var active_time = parseInt(result);
    var delta = Date.now() - active_time;
    var resTime = '';
    console.log('delta = '+delta);

    if(delta >= 2*30*24*60*60*1000){
        resTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
    }
    else if(delta >= 30*24*60*60*1000){
        resTime += "last month";
    }
    else if(delta >= 2*7*24*60*60*1000){
        resTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
    }
    else if(delta >= 7*24*60*60*1000){
        resTime += "last week";
    }
    else if(delta >= 2*24*60*60*1000){
        resTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
    }
    else if(delta >= 24*60*60*1000){
        resTime += "yesterday";
    }else if(delta >= 2*60*60*1000){
        resTime += Math.trunc(delta / (60*60*1000))+" hours ago";
    }
    else if(delta >= 60*60*1000){
        resTime += 'an hour ago';
    }
    else if(delta >= 2*60*1000){
        resTime += Math.trunc(delta / (60*1000))+" minutes ago";
    }else{
        resTime += "Active now";
    }

    if(resTime !== "Active now"){

        $('#activeTime').html(`<i class="mdi mdi-circle text-warning align-middle me-1"></i>${resTime}`);

    }else{

        $('#activeTime').html(`<i class="mdi mdi-circle text-success align-middle me-1"></i>${resTime}`);
    }
    // console.log('ishlavotti');

}


///// live search contacts

document.getElementById('searchContact').addEventListener('keyup', async() => {

    let val = document.getElementById('searchContact').value;

    if(!val)
        await get_contacts();
    // console.log('val = '+val);

    let contacts = localStorage.getItem('contacts');
    contacts = JSON.parse(contacts).contacts;
    // console.log(contacts);
    for(let i=0; i < contacts.length; i++){
        
        if (!contacts[i].username.toLowerCase().includes(val.toLowerCase())) {
            // console.log(user);
            childNode = document.getElementById('a' + contacts[i].user_id);
            document.getElementById('modal_body_group').removeChild(childNode);
            contacts.splice(i, 1);
            localStorage.removeItem('contacts');
            localStorage.setItem('contacts', JSON.stringify({contacts: contacts}) );
        }
    }
});

//// get chats

var resultChat;

const add_chats = async (user) => {

    var now = Date.now();
    var time = parseInt(user.create_time);
    var resultTime = '';
    var delta = now-time;
    // console.log(user);
    
    if(delta >= 2*30*24*60*60*1000){
        resultTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
    }
    else if(delta >= 30*24*60*60*1000){
        resultTime += "a month ago";
    }
    else if(delta >= 2*7*24*60*60*1000){
        resultTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
    }
    else if(delta >= 7*24*60*60*1000){
        resultTime += "a week ago";
    }
    else if(delta >= 2*24*60*60*1000){
        resultTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
    }
    else if(delta >= 24*60*60*1000){
        resultTime += "yesterday";
    }else if(delta >= 2*60*60*1000){
        resultTime += Math.trunc(delta / (60*60*1000))+" hours ago";
    }
    else if(delta >= 60*60*1000){
        resultTime += 'an hour ago';
    }
    else if(delta >= 60*1000){
        resultTime += Math.trunc(delta / (60*1000))+" minutes ago";
    }else{
        resultTime += "now";
    }

    if(user.message ){

        if(user.type === 'text'){
            var contactTemp =
            ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats"
              onclick="start_chat(${user.user_id})" id="b${user.user_id}" >
                    <div class="d-flex">
                        <div class="user-img away align-self-center me-4 ">
                            <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats" alt="avatar-3" style="height:50px;width:50px;">
                        </div>
                        <div class="flex-1 overflow-hidden align-self-center">
                            <h5 class="text-truncate font-size-14 mb-1">${user.account_name}</h5>
                            <p class="text-truncate mb-0">${user.message}</p>
                        </div>
                        <div class="font-size-11">${resultTime}</div>
                    </div>
             </a>`;
        }else{
            var name = JSON.parse(user.message).name;
            if(name.split(' ').length === 1 && name.length>20){
                name = '...'+name.substring(name.length-20);
            }
            var contactTemp =
            ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" 
               onclick="start_chat(${user.user_id})" id="b${user.user_id}">
                    <div class="d-flex">
                        <div class="user-img away  align-self-center me-4 ">
                            <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats" alt="avatar-3" style="height:50px;width:50px;">
                        </div>
                        <div class="flex-1 overflow-hidden align-self-center">
                            <h5 class="text-truncate font-size-14 mb-1">${user.account_name}</h5>
                            <p class="text-truncate mb-0">${name}</p>
                        </div>
                        <div class="font-size-11">${resultTime}</div>
                    </div>
             </a>`;    
        }

    }else{

        var contactTemp =
        ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" 
           onclick="start_chat(${user.user_id})" id="b${user.user_id}">
                <div class="d-flex">
                    <div class="user-img away align-self-center me-4 ">
                        <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats" alt="avatar-3" style="height:50px;width:50px;">
                    </div>
                    <div class="flex-1 overflow-hidden align-self-center">
                        <h5 class="text-truncate font-size-14 mb-1">${user.account_name}</h5>
                    </div>
                </div>
           </a>`;

    }

    resultChat += contactTemp;
}

const get_chats = async () => {

    resultChat = '';

    let data = await fetch('/get-chats')
        .then(response => response.json())
        .catch(err => {console.log(err);});

    if(data.data){
        // console.log(data);
        localStorage.removeItem('chats');
        localStorage.setItem('chats', JSON.stringify(data));

        for(let user of data.chats){
            await add_chats(user);
        }
        // console.log(resultChat);
        $('#chatsGroup').empty();
        $('#chatsGroup').append(resultChat);

        // console.log(resultChat.length);
    }
       
}

const search_chats = () => {
    $('#searchChats').keyup(async function (e) { 
        var val = document.getElementById('searchChats').value;
    
        console.log('val = ' + val);
        if(!val)
            await get_chats();
    
        let chats = localStorage.getItem('chats');
        chats = JSON.parse(chats).chats;
        // console.log(chats);
     
        for(let i=0; i < chats.length; i++){
            if (!chats[i].account_name.toLowerCase().includes(val.toLowerCase())) {
                // console.log(user);
                childNode = document.getElementById('b' + chats[i].user_id);
                document.getElementById('chatsGroup').removeChild(childNode);
                chats.splice(i, 1);
                localStorage.removeItem('chats');
                localStorage.setItem('chats', JSON.stringify({chats: chats}));
            }
        }
    
    });
}
$(document).ready(function () {
    get_chats();
    search_chats();
});

var myInterval = setInterval(() => { }, 10000);

const start_chat = async (userId) => {  

    // console.log('This inside start_chat');
    count = 0;
    clearInterval(myInterval);

    const response = await fetch('/start-chat?userId=' + userId)
        .then(response => response.json())
        .then(response => response.result)
        .catch(err => {console.log(err);});

    const toUser = $('#to_user');
    toUser.html('');

    // console.log(response);

    var result;
    var cardBody;

    if(!response.active_time){
        result =
        `<h5 class="font-size-15 mb-1 text-truncate">${response.account_name}<p id="userId" hidden>${response.user_id}</p></h5>
         <p class="text-truncate mb-0" id="activeTime"><i class="mdi mdi-circle text-dark align-middle me-1"></i>a long time ago</p>`;
       
        cardBody =
           `<h5 class="card-title fw-bolder">Name:</h5>
            <h6 class="card-text ">${response.account_name}</h6>
            <p class="card-text"><small class="text-primary">a long time ago</small></p>`;

        $('#cardBody').html('');
        $('#cardBody').append(cardBody);

    }else{

        var active_time = parseInt(response.active_time);
        var delta = Date.now() - active_time;
        var resTime = '';
    
        if(delta >= 2*30*24*60*60*1000){
            resTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
        }
        else if(delta >= 30*24*60*60*1000){
            resTime += "last month";
        }
        else if(delta >= 2*7*24*60*60*1000){
            resTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
        }
        else if(delta >= 7*24*60*60*1000){
            resTime += "last week";
        }
        else if(delta >= 2*24*60*60*1000){
            resTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
        }
        else if(delta >= 24*60*60*1000){
            resTime += "yesterday";
        }else if(delta >= 2*60*60*1000){
            resTime += Math.trunc(delta / (60*60*1000))+" hours ago";
        }
        else if(delta >= 60*60*1000){
            resTime += 'an hour ago';
        }
        else if(delta >= 2*60*1000){
            resTime += Math.trunc(delta / (60*1000))+" minutes ago";
        }else{
            resTime += "Active now";
        }  

        if(resTime !== "Active now"){

            result =
            `<h5 class="font-size-15 mb-1 text-truncate">${response.account_name}<p id="userId" hidden>${response.user_id}</p></h5>
            <p class="text-truncate mb-0" id="activeTime"><i class="mdi mdi-circle text-warning align-middle me-1"></i>${resTime}</p>`;

        }else{

            result =
            `<h5 class="font-size-15 mb-1 text-truncate">${response.account_name}<p id="userId" hidden>${response.user_id}</p></h5>
            <p class="text-truncate mb-0" id="activeTime"><i class="mdi mdi-circle text-success align-middle me-1"></i>${resTime}</p>`;

        }
        clearInterval(activeTimeInterval);

        activeTimeInterval = setInterval(async()=>{
        await get_active_time(response.user_id);
        }, 60000);

        //user prfile
        cardBody =
        `<h5 class="card-title fw-bolder">Name:</h5>
            <h6 class="card-text ">${response.account_name}</h6>
            <h5 class="card-title fw-bolder">Username:</h5>
            <p class="card-text ">@${response.username}</p>
            <p class="card-text"><small class="text-primary">${resTime}</small></p>`;

        $('#cardBody').html('');
        $('#cardBody').append(cardBody);
        
        ////get messages
        myInterval = setInterval(async () => {
            await getMessages(userId);
            // console.log('log ishlavotti');
        }, 800);
    }

    toUser.append(result);

    $('#messageList').html('');

    $('#toUserPhoto').html('');
    $('#toUserPhoto').append(`<img class="card-img img-fluid rounded-circle img-thumbnail to-user-photo" style="height:140px; width:140px" src="public/assets/send/uploadImages/${response.profile_photo}" alt="Card image">`);

    document.getElementById('search').removeAttribute('hidden');
    document.getElementById('params').removeAttribute('hidden');

    let chatTemp = 
    ` <a class="dropdown-item" href="#toUserProfile" data-bs-toggle="modal">View Profile</a>
      <a class="dropdown-item text-danger" href="javascript:void(0);" onclick="clearChat2()">Clear chat</a>`;

    $('#dropdownMenu').html('');
    $('#dropdownMenu').append(chatTemp);

    ///enter messaage div
    let enterMessage = 
            `<div class="col-auto" style="padding:0px;">
                <div class="position-relative">
                    <label class="form-label" for="shareFile">
                        <i class="ri-attachment-2 ri-2x align-middle"></i>
                        <input class="form-control" type="file" id="shareFile" onchange="sendFileModal()" hidden required >
                    </label>      
                </div>
            </div>
            <div class="col">
                <div class="position-relative">
                    <input id="message" name="message" type="text" class="form-control chat-input" placeholder="Enter Message...">        
                </div>
            </div>
            <div class="col-auto">
                <button type="button" id="send_button" class="btn btn-primary chat-send w-md waves-effect waves-light" onclick="sendMessage()"><span class="d-none d-sm-inline-block me-2">Send</span> <i class="mdi mdi-send"></i></button>
            </div>`;

    $('#enterMessage').html('');
    $('#enterMessage').append(enterMessage);


    ///keypress
    document.getElementById('message').addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById('send_button').click();
        }
    });

    titleArray = [];
    if($('#ChatTitle').html() === 'Groups'){

        document.getElementById('searchGroupChat').outerHTML = `<input type="text" class="form-control" placeholder="Search..." id="searchChats">`;
        await get_chats();
        $('#ChatTitle').html('Chats');
        search_chats();
    }

};

//alerts

async function clearChat() {

    const to_user_id = document.getElementById('userId').innerHTML;

    const response = await fetch('/clear-chat?userId=' + to_user_id)
        .then(response => response.json());

    return response.ok.startsWith('ok') ? parseInt(response.result) : -1;
}

/////Notification

var resultUnrep;

const add_unreplied = async (user) => {

    var now = Date.now();
    var time = parseInt(user.create_time);
    var resultTime = '';
    var delta = now-time;
    // console.log(user);
    
    if(delta >= 2*30*24*60*60*1000){
        resultTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
    }
    else if(delta >= 30*24*60*60*1000){
        resultTime += "a month ago";
    }
    else if(delta >= 2*7*24*60*60*1000){
        resultTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
    }
    else if(delta >= 7*24*60*60*1000){
        resultTime += "a week ago";
    }
    else if(delta >= 2*24*60*60*1000){
        resultTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
    }
    else if(delta >= 24*60*60*1000){
        resultTime += "yesterday";
    }else if(delta >= 2*60*60*1000){
        resultTime += Math.trunc(delta / (60*60*1000))+" hours ago";
    }
    else if(delta >= 60*60*1000){
        resultTime += 'an hour ago';
    }
    else if(delta >= 60*1000){
        resultTime += Math.trunc(delta / (60*1000))+" minutes ago";
    }else{
        resultTime += "now";
    }

    if(user.type === 'text'){
        var unrepliedTemp =
        `<li id="c${user.user_id}">
            <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder" onclick="start_unreplied_chat(${user.user_id})">
                <div class="d-flex">
                    <img src="public/assets/send/uploadImages/${user.profile_photo}" class="me-3 rounded-circle avatar-xs" alt="user-pic">
                    <div class="flex-1">
                        <h6 class="mt-0 mb-1">${user.account_name}</h6>
                        <div class="font-size-12 text-muted">
                            <p class="mb-1">${user.message}.</p>
                            <p class="mb-0"><i class="mdi mdi-clock-outline me-2"></i>${resultTime}</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>`;
    }else {

        var name = JSON.parse(user.message).name;
            if(name.split(' ').length === 1 && name.length>25){
                name = '...'+name.substring(name.length-25);
            }

        var unrepliedTemp =
        `<li id="c${user.user_id}">
            <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder" onclick="start_unreplied_chat(${user.user_id})">
                <div class="d-flex">
                    <img src="public/assets/send/uploadImages/${user.profile_photo}" class="me-3 rounded-circle avatar-xs" alt="user-pic">
                    <div class="flex-1">
                        <h6 class="mt-0 mb-1">${user.account_name}</h6>
                        <div class="font-size-12 text-muted">
                            <p class="mb-1">${name}.</p>
                            <p class="mb-0"><i class="mdi mdi-clock-outline me-2"></i>${resultTime}</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>`;
    }

    resultUnrep += unrepliedTemp;

}

var notifNumber;
const get_unreplied = async () => {

    $('#notifGroup').html('');
    resultUnrep = '';
    var response = await fetch('/get-unreplied')
        .then(response => response.json())
        .then(data => data.result);

    if(response.length > 0){
        response.forEach(user => add_unreplied(user));
        $('#notifGroup').append(resultUnrep);
        document.querySelector('.noti-dot').removeAttribute('hidden');
        notifNumber = response.length;
    }
    else    
        document.querySelector('.noti-dot').setAttribute('hidden', true);
}

$(document).ready(async () => {
    await get_unreplied();
});

const start_unreplied_chat = async (userId) => {

    await start_chat(userId);

    var child = document.getElementById('c' + userId);
    var fatherDiv = document.getElementById('notifGroup');
    fatherDiv.removeChild(child);

    notifNumber --;

    if(notifNumber === 0){
        document.querySelector('.noti-dot').setAttribute('hidden', true);
    }

}



////////////////////save account_name

$('#newName').keypress((event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        $('#saveName').click();
    }
});

document.getElementById('saveName').addEventListener('click', async () => {
    let val = document.getElementById('newName').value;
    document.getElementById('newName').value = '';
    // console.log('value='+val);
    if (val) {
        await fetch('/update-user-name', {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ name: val })
        })
        .then(response => response.json())
        .then(response => {
            if(response.result){
                document.getElementById('accountName').innerHTML = val;
                document.getElementById('topRigthName').innerHTML = val;
                Swal.fire({
                    position:'top-end',
                    showConfirmButton:false,
                    title:'Changed!',
                    icon:'success',
                    timer:1500,
                    customClass:'swal-class'
                });
            }else {
                Swal.fire({
                    position:'top-end',
                    showConfirmButton:false,
                    icon:'error',
                    title:'Some error occured!',
                    timer:1500,
                    customClass:'swal-class2'
                })
            }
        });
    }
});

/////

const show_user_profile = async () => {

    let user = await fetch('get-user-info')
        .then(response => response.json())
        .then(response => response.result);

    let userProfile =
        ` <div class="col-sm-4">
            <img class="card-img rounded-circle img-thumbnail to-user-photo" style="height: 140px; width: 140px;"
            src="public/assets/send/uploadImages/${user.profile_photo}" alt="Card image" id="userProf">
        </div>
        <div class="col-sm-8">
            <div class="card-body">
                <h5 class="card-title fw-bolder">Name:</h5>
                <h6 class="card-text " id="accountName">${user.account_name}</h6>
                <h5 class="card-title fw-bolder">Username:</h5>
                <p class="card-text ">@${user.username}</p>
                <p class="card-text"><small class="text-primary">Active now</small></p>
            </div>
        </div>`;

    let currentName =
        `Current Name:<input type="text" class="form-control" value="${user.account_name}" style="width: 60%;" readonly>`

    $('#userProfileCard').html('');
    $('#userProfileCard').append(userProfile);
    $('#currentName').html('');
    $('#currentName').append(currentName);
    $('#topRigthName').html(user.account_name);
}

/////update profile image

const updatePhoto = async () => {
    // console.log('adfdsf');
    var formData = new FormData();
    var photo = document.getElementById('profilePhot').files[0];

    if (!photo)
        return;
    // console.log('photo='+photo);
    formData.append('photo', photo);

    await fetch('/update-profile-photo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        if(response){
            Swal.fire({
                position:'top-end',
                title:'Photo changed!',
                showConfirmButton:false,
                icon:'success',
                timer:1700,
                customClass:'swal-class'
            });
            document.getElementById('userProf').setAttribute('src', `public/assets/send/uploadImages/${response.result}`);
            document.getElementById('topRightPhoto').setAttribute('src', `public/assets/send/uploadImages/${response.result}`);
            document.getElementById('btnClosePhoto').click();

        }else{
            Swal.fire({
                position:'top-end',
                title:'Some error occured!',
                showConfirmButton:false,
                icon:'error',
                timer:1700,
                customClass:'swal-class'
            })
        }

    });

}

$('#profilePhot').keypress((event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        $('#changeUserProfilePhoto').click();
    }
});

//////groups

const newGroup = () => {

    document.getElementById('modal_close_group').click();
    document.getElementById('groupName').value = '';
    document.getElementById('groupNameLabel').style.color = 'darkgreen';
    document.getElementById('groupName').style.borderBottom = '2px solid darkgreen';
    document.getElementById('profilePhotGR').files = null;
}

var formData = new FormData();
const selectContacts = () => {

    var groupNameNode = document.getElementById('groupName');
    var groupName = groupNameNode.value;

    if (!groupName) {
        groupNameNode.style.borderColor = 'red';
        document.getElementById('groupNameLabel').style.color = 'red';
    }
    else {
        $('#groupModalPhoto').modal('show');
        document.getElementById('closeModalgr').click();
        formData.append('name', groupName);
        
    }
}

///// set group photo

const setGroupPhoto = async() => {

    var photo = document.getElementById('profilePhotGR').files[0];

    if(photo){
        // console.log(photo);
        formData.append('photo', photo);

        $('#closeGrPho').click();
        $('#selectContacts').modal('show');

        await getAllUsers();
    }else{
        document.getElementById('profilePhotGR').style.borderColor='red';
        return;

    }
}

document.getElementById('groupName').addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('nextBtn').click();
    }
});
document.getElementById('profilePhotGR').addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('grPhoto').click();
    }
})

var resultAllUser;

const getAllUsers = async () => {
    resultAllUser = '';
    await fetch('/all-users')
        .then(response => response.json())
        .then(response => {
            // console.log('response='+response);
            let user_idArray = response.result.map(user => user.user_id);
            localStorage.removeItem('allUsers');
            localStorage.setItem('allUsers', JSON.stringify({ array: user_idArray }));
            response.result.forEach((user) => { addAllUsers(user) });
            $('#select_group_users').html('');
            $('#select_group_users').append(resultAllUser);
        });
}

const addAllUsers = (user) => {
    let usersTemp =
        `<div class="form-check my-0 ps-3 pe-1 py-2" id="form${user.user_id}" style="height:3.6rem">
            <label class="form-check-label ms-2" for="formCheck${user.user_id}" style="width:95%!important;" onclick="input_checked(${user.user_id})">
            <input class="form-check-input" type="checkbox" id="formCheck${user.user_id}" style="margin-top:14px" hidden>
                <div class="d-flex">
                    <div class="user-img away align-self-center me-4">
                        <img id="img${user.user_id}" src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3 ms-2"
                         style="height:45px;width:45px;">
                    </div>
                    <div class="flex-1 align-self-center me-4">
                        <h5 class="text-truncate font-size-14 mb-1" id="name${user.user_id}">${user.account_name}</h5>
                        <p class="text-truncate mb-0 font-size-12 text-primary">@${user.username}</p>
                    </div>
                </div>
            </label>
         </div>`
    resultAllUser += usersTemp;
}
///search users to add new Group
$('#selectUsers').keyup(async() => {
    var val = document.getElementById('searchChats').value;
    
    console.log('val = ' + val);
    if(!val)
        await getAllUsers();

    let chats = localStorage.getItem('chats');
    chats = JSON.parse(chats).chats;
    // console.log(chats);
 
    for(let i=0; i < chats.length; i++){
        if (!chats[i].account_name.toLowerCase().includes(val.toLowerCase())) {
            // console.log(user);
            childNode = document.getElementById('b' + chats[i].user_id);
            document.getElementById('chatsGroup').removeChild(childNode);
            chats.splice(i, 1);
            localStorage.removeItem('chats');
            localStorage.setItem('chats', JSON.stringify({chats: chats}));
        }
    }
})
const input_checked = (id) => {
    if(document.getElementById('formCheck' + id).checked){
        $('#form'+id).css({'opacity':'0.5'});
        $('#img'+id).css({'border':'3px solid darkgreen'});
        $('#name'+id).css({'color':"darkgreen"});
    }
    else {
        $('#form'+id).css({'background-color':'white', 'border':'0px', 'opacity':'1'});
        $('#img'+id).css({'border':'0px'});
        $('#name'+id).css({'color':'black'});
    }  
       
}
const createGroup = async () => {

    let result = '';
    let userIdArray = JSON.parse(localStorage.getItem('allUsers')).array;

    for (let i = 0; i < userIdArray.length; i++) {
        if (document.getElementById('formCheck' + userIdArray[i]).checked) {
            result += userIdArray[i] + ',';
        }
    }
    // console.log('result = '+result);
    result = result.substring(0, result.length - 1);

    formData.append('users', result);

    let result2 = await fetch('/create-group', {
        method: "POST",
        body: formData
    });
    let result3 = await result2.json();
    console.log("kelgan data ::", result3);
    document.getElementById('closeModalLast').click();
    start_new_group(result3.result);

    ///////////// add new group to chat groups

    let group = await fetch('/get-group-info?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if($('#ChatTitle').html() === 'Groups'){
        $('#chatsGroup').append(
            `<a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" onclick="start_new_group(${group.id})" 
            id="gc${group.id}">
                      <div class="d-flex">
                          <div class="user-img away align-self-center me-4"">
                              <img src="public/assets/send/groupImages/${group.photo}" class="rounded-circle avatar-xs img-chats"
                               alt="avatar-3" style="height:50px!important; width:50px!important; border:1px solid lightblue;">
                          </div>
                          <div class="flex-1 overflow-hidden align-self-center">
                              <h3 class="text-truncate font-size-15 mb-1">${group.name}</h3>
                          </div>
                      </div>
            </a>`  
        );

    }

    

    /////// 
    document.getElementById('groupName').value = '';
    document.getElementById('groupNameLabel').style.color = 'darkgreen';
    document.getElementById('groupName').style.color = 'darkgreen';
}   
var groupResult;

const getGroups = async()=>{

    groupResult = '';
    const result = await fetch('/get-groups')
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(!result){
        console.log("groups: "+result);
        return;
    }

    sessionStorage.removeItem('groups');
    sessionStorage.setItem('groups', JSON.stringify({groups:result}));
    // console.log('groups = '+result);
    result.forEach((group)=>{
        add_groups(group);
    });

    $('#groupsBody').html('');
    $('#groupsBody').append(groupResult);

}

const add_groups = (group)=>{
    // console.log('group = '+group.id);

    const groupTemp =
        `<a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" onclick="start_new_group(${group.id})" 
         id="g${group.id}">
                   <div class="d-flex">
                       <div class="user-img away align-self-center" style="margin-right:50px;">
                           <img src="public/assets/send/groupImages/${group.photo}" class="rounded-circle avatar-xs img-chats"
                            alt="avatar-3" style="height:65px!important; width:65px!important; border:1px solid lightblue;">
                       </div>
                       <div class="flex-1 overflow-hidden align-self-center">
                           <h3 class="text-truncate font-size-15 mb-1 grname${group.id}">${group.name}</h3>
                       </div>
                   </div>
         </a>`;

    groupResult+=groupTemp;
}

$('#searchGroup').keyup(async function (e) { 

    e.preventDefault();
    var groups = JSON.parse(sessionStorage.getItem('groups')).groups;
    var val = $('#searchGroup').val();

    if(!val){
        await getGroups();
        return;
    }

    // console.log('val = '+val);
    for(let i = 0; i < groups.length; i++){
        if(!groups[i].name.toLowerCase().includes(val.toLowerCase())){

            $('#g'+groups[i].id).remove();
            groups.splice(i, 1);
            sessionStorage.removeItem('groups');
            sessionStorage.setItem('groups', JSON.stringify({groups: groups}));
        }
    }

});

var membersTemp;
var groupResultChat;

const start_new_group = async(id)=>{

    let group = await fetch('/get-group-info?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(!group){
        console.log('groupInfo = '+group);
        return;
    }
    let users = group.users.split(',');

    let groupProfile = 
        `<h5 class="font-size-15 mb-1 text-truncate group-name">${group.name}<p id="groupId" hidden>${group.id}</p></h5>
        <p class="text-truncate mb-0 members">${users.length+1} members</p>`;

    $('#to_user').html('');
    $('#to_user').html(groupProfile);

    let menuTemp =
    ` <a class="dropdown-item" href="#groupProfile" data-bs-toggle="modal"><i class="bi bi-info-circle align-middle fa-lg me-2"></i>View Group Info</a>
      <a class="dropdown-item text-danger" href="javascript:void(0);" onclick="leaveChat()"><i class="bi bi-box-arrow-right align-middle fa-lg me-2"></i>Leave Group</a>`

    $('#dropdownMenu').html('');

    $('#dropdownMenu').append(menuTemp);

    ////

    const cardBody =
        `<h6 class="card-text group-name">${group.name}</h6>
         <p class="card-text members">${users.length+1} members</p>`;

    $('#cardBodyGroup').html('');
    $('#cardBodyGroup').append(cardBody);

    $('#groupPhoto').html('');
    $('#groupPhoto').append(`<img class="card-img img-fluid rounded-circle img-thumbnail mt-3" style="width:130px; height:130px;" src="public/assets/send/groupImages/${group.photo}" alt="Card image">`);


    membersTemp='';

    const response = await fetch('/get-group-members?members='+group.users+'&owner='+group.owner)
    .then(response => response.json())
    .catch(er => {console.log(er);});

    var members = response.members;
    var owner = response.owner;
    var current_user = response.current_user;

    // console.log('members = '+members[0]);
    // console.log(typeof owner);

    if(members.length ===0 ){
        console.log('members = '+members);
        return;
    }

    if(owner){
        var active_time = parseInt(owner.active_time);
        var delta = Date.now() - active_time;
        var resTime = '';
        // console.log('delta = '+delta);

        if(delta >= 2*30*24*60*60*1000){
            resTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
        }
        else if(delta >= 30*24*60*60*1000){
            resTime += "last month";
        }
        else if(delta >= 2*7*24*60*60*1000){
            resTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
        }
        else if(delta >= 7*24*60*60*1000){
            resTime += "last week";
        }
        else if(delta >= 2*24*60*60*1000){
            resTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
        }
        else if(delta >= 24*60*60*1000){
            resTime += "yesterday";
        }else if(delta >= 2*60*60*1000){
            resTime += Math.trunc(delta / (60*60*1000))+" hours ago";
        }
        else if(delta >= 60*60*1000){
            resTime += 'an hour ago';
        }
        else if(delta >= 2*60*1000){
            resTime += Math.trunc(delta / (60*1000))+" minutes ago";
        }else{
            resTime += "Active now";
        }


        if(owner.user_id === current_user){
            let menuTemp =
            `<a class="dropdown-item" href="#groupProfile" data-bs-toggle="modal"><i class="bi bi-info-circle align-middle fa-lg me-2"></i>View Group Info</a>
             <a class="dropdown-item text-danger" href="javascript:void(0);" onclick="delete_group()"><i class="bi bi-box-arrow-right align-middle fa-lg me-2"></i>Delete And Leave Group</a>`
        
            $('#dropdownMenu').html('');
           $('#dropdownMenu').append(menuTemp);

           membersTemp +=
           `<a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder" onclick="show_member_profile(${owner.user_id})" disabled>
               <div class="d-flex">
                   <div class="user-img away  align-self-center me-4 ">
                       <img src="public/assets/send/uploadImages/${owner.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3" style="height:50px;width:50px;">
                   </div>
                   <div class="flex-1 overflow-hidden align-self-center">
                       <h5 class="text-truncate font-size-14 mb-1">${owner.account_name}</h5>
                       <small class="text-truncate mb-0 text-primary">${resTime}</small>
                   </div>
                   <div class="font-size-13 text-primary">Owner</div>
               </div>
             </a>`; 
        }
        else{
            membersTemp +=
            `<a href="#groupMemberProfile" data-bs-toggle="modal" class="list-group-item list-group-item-action fw-bolder" data-bs-dismiss="modal" onclick="show_member_profile(${owner.user_id})">
                <div class="d-flex">
                    <div class="user-img away  align-self-center me-4 ">
                        <img src="public/assets/send/uploadImages/${owner.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3" style="height:50px;width:50px;">
                    </div>
                    <div class="flex-1 overflow-hidden align-self-center">
                        <h5 class="text-truncate font-size-14 mb-1">${owner.account_name}</h5>
                        <small class="text-truncate mb-0 text-primary">${resTime}</small>
                    </div>
                    <div class="font-size-13 text-primary">Owner</div>
                </div>
              </a>`;  
        }  
          
    }

    members.forEach((user)=>{
        // console.log('user = '+user);
        add_members(user, current_user);
    });

    $('#groupMembers').html('');
    $('#groupMembers').append(membersTemp);

    ////set send button

    let enterMessage = 
            `<div class="col-auto" style="padding:0px;">
                <div class="position-relative">
                    <label class="form-label" for="shareFile">
                        <i class="ri-attachment-2 ri-2x align-middle"></i>
                        <input class="form-control" type="file" id="shareFile" hidden required onchange="sendFileModalGr()">
                    </label>      
                </div>
            </div>
            <div class="col">
                <div class="position-relative">
                    <input id="messageGroup" name="message" type="text" class="form-control chat-input" placeholder="Enter Message...">        
                </div>
            </div>
            <div class="col-auto">
                <button type="button" id="messageGroup" class="btn btn-primary chat-send w-md waves-effect waves-light" onclick="send_group_messages()"><span class="d-none d-sm-inline-block me-2">Send</span> <i class="mdi mdi-send"></i></button>
            </div>`;

    $('#enterMessage').html('');
    $('#enterMessage').append(enterMessage);

    /////press enter
    
    document.getElementById('messageGroup').addEventListener('keypress', async(event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
            await send_group_messages();
        }
    })

    $('#messageList').html('');

    // console.log($('#ChatTitle').outerHTML);
    if($('#ChatTitle').html() === 'Chats'){
        await get_groups_chat();
        $('#ChatTitle').html('Groups');

        document.getElementById('searchChats').outerHTML = `<input type="text" class="form-control" placeholder="Search..." id="searchGroupChat">`;
        
        $('#searchGroupChat').keyup(async function (e) { 

            var groups = JSON.parse(sessionStorage.getItem('groups_chat')).groups;
            var val = $('#searchGroupChat').val();
            $('#searchGroupChat').html('');
        
            if(!val){
                await get_groups_chat();
                return;
            }
        
            // console.log('val = '+val);
            for(let i = 0; i < groups.length; i++){
                if(!groups[i].name.toLowerCase().includes(val.toLowerCase())){
        
                    $('#gc'+groups[i].id).remove();
                    groups.splice(i, 1);
                    sessionStorage.removeItem('groups_chat');
                    sessionStorage.setItem('groups_chat', JSON.stringify({groups: groups}));
                }
            }
        
        });
    }

    document.getElementById('params').removeAttribute('hidden');
    document.getElementById('search').removeAttribute('hidden');
    document.getElementById('modal_close_group').click();

    // cursor
    // $('#messageGroup').focus();
    titleArray = [];

    let grId = group.id;
    countMessage = 0;
    clearInterval(myInterval);
    myInterval = setInterval(async()=>{
        await get_group_messages(grId);
    }, 1000);


}

const get_groups_chat = async()=>{
    groupResultChat = '';
    const result = await fetch('/get-groups')
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(!result){
        console.log("groups: "+result);
        return;
    }

    sessionStorage.removeItem('groups_chat');
    sessionStorage.setItem('groups_chat', JSON.stringify({groups:result}));
    // console.log('groups = '+result);
    result.forEach((group)=>{
        add_groups_chat(group);
    });

    $('#chatsGroup').html('');
    $('#chatsGroup').append(groupResultChat);

}
/// ad groups chat

const add_groups_chat = (group)=> {
    const groupTemp =
    `<a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" onclick="start_new_group(${group.id})" 
     id="gc${group.id}">
               <div class="d-flex">
                   <div class="user-img away align-self-center me-4"">
                       <img src="public/assets/send/groupImages/${group.photo}" class="rounded-circle avatar-xs img-chats"
                        alt="avatar-3" style="height:50px!important; width:50px!important; border:1px solid lightblue;">
                   </div>
                   <div class="flex-1 overflow-hidden align-self-center">
                       <h3 class="text-truncate font-size-15 mb-1 grname${group.id}">${group.name}</h3>
                   </div>
               </div>
     </a>`;

    groupResultChat+=groupTemp;
}

const add_members = (user, current_user)=>{

    var active_time = parseInt(user.active_time);
    var delta = Date.now() - active_time;
    var resTime = '';
    // console.log('delta = '+delta);

    if(delta >= 2*30*24*60*60*1000){
        resTime += Math.trunc(delta / (30*24*60*60*1000))+" months ago";
    }
    else if(delta >= 30*24*60*60*1000){
        resTime += "last month";
    }
    else if(delta >= 2*7*24*60*60*1000){
        resTime += Math.trunc(delta / (7*24*60*60*1000))+" weeks ago";
    }
    else if(delta >= 7*24*60*60*1000){
        resTime += "last week";
    }
    else if(delta >= 2*24*60*60*1000){
        resTime += Math.trunc(delta / (24*60*60*1000))+" days ago";
    }
    else if(delta >= 24*60*60*1000){
        resTime += "yesterday";
    }else if(delta >= 2*60*60*1000){
        resTime += Math.trunc(delta / (60*60*1000))+" hours ago";
    }
    else if(delta >= 60*60*1000){
        resTime += 'an hour ago';
    }
    else if(delta >= 2*60*1000){
        resTime += Math.trunc(delta / (60*1000))+" minutes ago";
    }else{
        resTime += "Active now";
    }


    if(user.user_id === current_user){
        var temp = 
        ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder" onclick="show_member_profile(${user.user_id})">
                <div class="d-flex">
                    <div class="user-img away  align-self-center me-4 ">
                        <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3" style="height:50px;width:50px;">
                    </div>
                    <div class="flex-1 overflow-hidden align-self-center">
                        <h5 class="text-truncate font-size-14 mb-1">${user.account_name}</h5>
                        <small class="text-truncate mb-0 text-primary">Active now</small>
                    </div>
                </div>
           </a>`;
    }
    else{
        var temp = 
        ` <a href="#groupMemberProfile" data-bs-toggle="modal" class="list-group-item list-group-item-action fw-bolder" data-bs-dismiss="modal" onclick="show_member_profile(${user.user_id})">
                <div class="d-flex">
                    <div class="user-img away  align-self-center me-4 ">
                        <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3" style="height:50px;width:50px;">
                    </div>
                    <div class="flex-1 overflow-hidden align-self-center">
                        <h5 class="text-truncate font-size-14 mb-1">${user.account_name}</h5>
                        <small class="text-truncate mb-0 text-primary">${resTime}</small>
                    </div>
                </div>
           </a>`;
    }

    membersTemp+=temp;
}

const show_member_profile = async(userId)=>{

    let user = await fetch('/show-member-profile?userId=' + userId)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => console.log(err));

    if(!user){
        $('#otaDiv').html('');
        console.log('result : '+false);
        return;
    }

    var userProfile;

    if(user.account_name === 'Deleted Account'){
        userProfile =
        `<div class="col-md-4">
            <img class="card-img rounded-circle img-thumbnail" style="background-position: center; height: 130px; width: 130px; object-fit: cover;"
            src="public/assets/send/uploadImages/${user.profile_photo}" alt="Card image" id="userProf">
        </div>
        <div class="col-md-8 mb-1">
            <div class="card-body">
                <h5 class="card-title fw-bolder">Name:</h5>
                <h6 class="card-text " id="accountName">${user.account_name}</h6>
            </div>
        </div>
        <hr>
        <div>
            <a href="javascript:void(0);" data-bs-dismiss="modal" style="font-weight:bolder; margin-left:36%" onclick="start_chat(${user.user_id})">
               SEND MESSAGE
            </a>
        </div>`;
    }
    else {
        userProfile =
        `<div class="col-md-4">
            <img class="card-img rounded-circle img-thumbnail" style="background-position: center; height: 130px; width: 130px; object-fit: cover;"
            src="public/assets/send/uploadImages/${user.profile_photo}" alt="Card image" id="userProf">
        </div>
        <div class="col-md-8 mb-1">
            <div class="card-body">
                <h5 class="card-title fw-bolder">Name:</h5>
                <h6 class="card-text " id="accountName">${user.account_name}</h6>
                <h5 class="card-title fw-bolder">Username:</h5>
                <p class="card-text ">@${user.username}</p>
            </div>
        </div>
        <hr>
        <div>
            <a href="javascript:void(0);" data-bs-dismiss="modal" style="font-weight:bolder; margin-left:36%" onclick="start_chat(${user.user_id})">
               SEND MESSAGE
            </a>
        </div>`;
    }



    $('#otaDiv').html('');
    $('#otaDiv').html(userProfile);
   
}
var countMessage = 0;

const get_group_messages = async(groupId)=>{
    
    let messages = await fetch('/get-group-messages?id='+groupId+'&count='+countMessage)
    .then(response => response.json())
    .catch(err =>{ console.log(err);});

    if(!messages.result){
        // console.log('messages = '+messages);
        return;
    }
    countMessage = messages.result[messages.result.length-1].id;

    // console.log(messages);
    for(let x of messages.result){
        await add_group_messages(x, messages.user_id);
    }

}

const add_group_messages = async(message, current_user_id)=>{

    const time = new Date(message.create_time);
    const currentdate = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var months = time.getMonth();
    var days = time.getDate();
    var size, name, filename;

    if(message.type === 'application'){
        size = parseInt(JSON.parse(message.message).size);
        name = JSON.parse(message.message).name;
        if(name.split(' ').length === 1 && name.length>20){
            name = '...'+name.substring(name.length-20);
        }

        filename = JSON.parse(message.message).savedName;
        sessionStorage.removeItem('filenameGr');
        sessionStorage.setItem('filenameGr', filename);
    }
   

    if(size > 1000000){
        size = Math.trunc(size/100000)/10;
        size +=' MB';        
    }else{
        size = Math.trunc(size/100)/10;
        size += ' KB';
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    var temp = '';
    var dayTitle = '';

    if (months === currentdate.getMonth() && days === currentdate.getDate()) {

        dayTitle += 'Today';
        // console.log(dayTitle);

        if (!titleArray.includes(dayTitle)) {

            temp += `<li> 
                       <div class="chat-day-title">
                            <span class="title">${dayTitle}</span>
                       </div>
                     </li>`;
            titleArray.push(dayTitle);
        }

    }
    else if (months === currentdate.getMonth() && days < currentdate.getDate()) {

        dayTitle += days + ' ';

        switch (months) {
            case 0: dayTitle += 'January'; break;
            case 1: dayTitle += 'February'; break;
            case 2: dayTitle += 'March'; break;
            case 3: dayTitle += 'April'; break;
            case 4: dayTitle += 'May'; break;
            case 5: dayTitle += 'June'; break;
            case 6: dayTitle += 'July'; break;
            case 7: dayTitle += 'August'; break;
            case 8: dayTitle += 'September'; break;
            case 9: dayTitle += 'Oktober'; break;
            case 10: dayTitle += 'November'; break;
            case 11: dayTitle += 'December'; break;
        }

        if (!titleArray.includes(dayTitle)) {

            temp += `<li> 
                         <div class="chat-day-title">
                           <span class="title">${dayTitle}</span>
                         </div>
                    </li>`;
            titleArray.push(dayTitle);

        }
    }
    else if (months <= currentdate.getMonth()) {
        dayTitle += days + ' ';

        switch (months) {
            case 0: dayTitle += 'January'; break;
            case 1: dayTitle += 'February'; break;
            case 2: dayTitle += 'March'; break;
            case 3: dayTitle += 'April'; break;
            case 4: dayTitle += 'May'; break;
            case 5: dayTitle += 'June'; break;
            case 6: dayTitle += 'July'; break;
            case 7: dayTitle += 'August'; break;
            case 8: dayTitle += 'September'; break;
            case 9: dayTitle += 'Oktober'; break;
            case 10: dayTitle += 'November'; break;
            case 11: dayTitle += 'December'; break;
        }

        if (!titleArray.includes(dayTitle)) {

            temp += `<li> 
                         <div class="chat-day-title">
                           <span class="title">${dayTitle}</span>
                         </div>
                    </li>`;
            titleArray.push(dayTitle);

        }

    }

    // console.log('message.user = '+ message.user);
    // console.log(current_user_id);

    if(message.user_id === current_user_id){
        if(message.type === 'text'){

            temp += ` <li class="right" id="grmess${message.id}">
                        <div class="conversation-list">
                            <div class="ctext-wrap">
                                <div class="ctext-wrap-content">
                                    <p class="mb-0" id="grmessage${message.id}">${message.message}</p>
                                    <div class="btn-group dropstart" style="position:absolute; bottom:26px; margin-left:15px;">
                                            <a class="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                                            <i class="ri-more-2-fill ri-lg"></i>
                                            </a>
                                        <div class="dropdown-menu myDropdown" style="position:absolute; min-width:0.3rem;">
                                            <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#editGrMessage" data-bs-toggle="modal"
                                             onclick="edit_group_message(${message.id})"><i class="ri-pencil-fill text-primary"></i></a>
                                            <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#"
                                             onclick="delete_group_message(${message.id})"><i class="ri-delete-bin-7-fill text-danger"></i></a>
                                        </div>
                                    </div>
                                    <p style="position:absolute; right:3px; top:50px;"><i class="ri-check-line ri-lg" style="text-align:end;"></i></p>
                                </div>
                                <p class="chat-time mb-0">${hours}:${minutes}</p>
                                 
                            </div> 
                        </div>
                    </li>`;

        }else if(message.type === 'image'){

            temp +=
             ` <li class="right" id="grmess${message.id}">
                    <div class="conversation-list">
                        <div class="ctext-wrap" style="width:50%; margin-left:50%;">
                            <div class="ctext-wrap-content" style="padding:0px;"> 
                                <a href="#" onclick="show_photo_sent_gr(${message.id})">
                                        <img class="mb-0 img-thumbnail" src="public/assets/send/sendGroup/${JSON.parse(message.message).savedName}" 
                                        style="width:100%;">
                                </a>
                                <div class="btn-group dropstart" style="position:absolute; bottom:26px;">
                                        <a class="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                                        <i class="ri-more-2-fill ri-lg"></i>
                                        </a>
                                    <div class="dropdown-menu myDropdown" style="position:absolute; min-width:0.3rem;">
                                        <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#" onclick="delete_group_message(${message.id })"><i class="ri-delete-bin-7-fill text-danger"></i></a>
                                    </div>
                                </div>
                                <p style="position:absolute; right:21px; top:30px;"><i class="ri-check-line ri-lg" style="text-align:end;"></i></p>
                            </div>
                            <p class="chat-time mb-0">${hours}:${minutes}</p>
                            
                            </div>
                        
                        </div>
                </li>`;

        }else{

            temp +=
            ` <li class="right" id="grmess${message.id}">
                   <div class="conversation-list">
                       <div class="ctext-wrap">
                           <div class="ctext-wrap-content ms-1"> 
                             <div class="" style="display:flex">
                                    <div>
                                        <a onclick="openGroupFile()" class="align-middle">
                                            <i class="bi bi-file-earmark-text" style="font-size:2rem"></i>
                                        </a>
                                    </div>
                                    <div style="margin-top:10px; margin-left:3px">
                                        <h6 style="white-space:pre-line;" >${name}</h6>
                                        <small class="fw-bolder text-primary align-left">${size}</small>
                                    </div>
                             </div>
                             
                               <div class="btn-group dropstart" style="position:absolute; bottom:26px; margin-left:12px;">
                                       <a class="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                                       <i class="ri-more-2-fill ri-lg"></i>
                                       </a>
                                   <div class="dropdown-menu myDropdown" style="position:absolute; min-width:0.3rem;">
                                       <a class="dropdown-item" style="padding:0.3rem 1.2rem;" href="#" onclick="delete_group_message(${message.id })"><i class="ri-delete-bin-7-fill text-danger"></i></a>
                                   </div>
                               </div>
                               <p style="position:absolute; right:21px; top:30px;"><i class="ri-check-line ri-lg" style="text-align:end;"></i></p>
                            </div>
                       </div>
                       <p class="chat-time mb-0"> ${hours}:${minutes}</p>
                       
                       </div>
               </li>`;


        }
    } else {
        if(message.type === 'text'){

            temp += 
            `<li >
                <div class="conversation-list">
                    <div class="chat-avatar">
                        <img src="public/assets/send/uploadImages/${message.profile_photo}" alt="avatar-2">
                    </div>
                    <div class="ctext-wrap">
                        <div class="conversation-name">${message.account_name}</div>
                        <div class="ctext-wrap-content">
                            <p class="mb-0">${message.message}</p>
                        </div>
                        <p class="chat-time mb-0">${hours}:${minutes}</p>
                    </div>
                    
                </div>
            </li>`

        }else if(message.type === 'image'){

               temp += 
               `<li >
                   <div class="conversation-list">
                       <div class="chat-avatar">
                           <img src="public/assets/send/uploadImages/${message.profile_photo}" alt="avatar-2">
                       </div>
                       <div class="ctext-wrap" style="width:50%;">
                           <div class="conversation-name">${message.account_name}</div>
                           <div class="ctext-wrap-content"  style="padding:0px;">
                                <a href="#" onclick="show_photo_sent_gr(${message.id})">
                                    <img class="mb-0 img-thumbnail" src="public/assets/send/sendGroup/${JSON.parse(message.message).savedName}" 
                                    style="width:100%;">
                                </a>
                           </div>
                           <p class="chat-time mb-0">${hours}:${minutes}</p>
                       </div>
                       
                   </div>
               </li>`

        }else{

            temp += 
            `<li >
                <div class="conversation-list">
                    <div class="chat-avatar">
                        <img src="public/assets/send/uploadImages/${message.profile_photo}" alt="avatar-2">
                    </div>
                    <div class="ctext-wrap">
                        <div class="conversation-name">${message.account_name}</div>
                        <div class="ctext-wrap-content" style="display:flex">
                            <div style="margin-right:3px;">
                                <a href="#" onclick="openGroupFile()" class="align-middle  text-white">
                                    <i class="bi bi-file-earmark-text" style="font-size:2rem"></i>
                                </a>
                            </div>
                            <div style="margin-top:10px;">
                                <h6 style="white-space:pre-line; color:white;" >${name}</h6>
                                <small class="fw-bolder text-primary text-white">${size}</small>
                            </div>
                         </div>
                        <p class="chat-time mb-0">${hours}:${minutes}</p>
                    </div>
                    
                </div>
            </li>`

        }
    
    }
 

    $('#messageList').append(temp);
    scrollToBottom();

}

const send_group_messages = async()=>{

    let groupId = parseInt(document.getElementById('groupId').innerHTML);
    // console.log(groupId);
    let message = document.getElementById('messageGroup').value;
    document.getElementById('messageGroup').value = '';
    
    if(!message){
        return;
    }

    let response = await fetch('/post-group-messages', {
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({message:message, groupId:groupId})
    })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => console.log(err));

    if(!response){
        console.log('Unsuccessful post');
        return;
    }
}
