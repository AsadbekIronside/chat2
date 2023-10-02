 //Parameter
const clearChat2 = ()=>{
    var val='';
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, clear chat!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success mt-2',
        cancelButtonClass: 'btn btn-danger ms-2 mt-2',
        buttonsStyling: false
    }).then(async function (result) {
        if (result.value) {
            val = await clearChat();

            if(val !== -1){
                $('#messageList').html('');
                Swal.fire({
                    position:'top-end',
                    showConfirmButton:false,
                    title: 'Deleted!',
                    text: 'Chat has been cleared.',
                    icon: 'success',
                    timer:1500,
                    customClass:'swal-class2'
                  })

            }
            else{
                Swal.fire({ 
                    position:'top-end',
                    showConfirmButton:false,
                    title: 'Error!',
                    text: 'Some error occured!',
                    icon: 'error',
                    timer:1500,
                    customClass:'swal-class2'
                  })
            }
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
                position:'top-end',
                showConfirmButton:false,
                title: 'Cancelled',
                text: 'Your messaages are safe :)',
                icon: 'error',
                timer:1500,
                customClass:'swal-class3'
            })
          }
    });
};

////////////
const leaveChat = ()=>{
    var val='';
    Swal.fire({
        title: 'Are you sure to leave this group?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, leave group!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success mt-2',
        cancelButtonClass: 'btn btn-danger ms-2 mt-2',
        buttonsStyling: false
    }).then(async function (result) {
        if (result.value) {
            val = await leaveGroup();
            if(val.result){
                $('#messageList').html('');
                $('#gc'+val.id).remove();
                document.getElementById('search').setAttribute('hidden', true);
                document.getElementById('params').setAttribute('hidden', true);
                $('#to_user').html('');
                Swal.fire({
                    position:'top-end',
                    showConfirmButton:false,
                    title: 'Success!',
                    text: 'You have just left the group.',
                    icon: 'success',
                    timer:2000,
                    customClass:'swal-class2'
                  })

            }
            else{
                Swal.fire({
                    position:'top-end',
                    showConfirmButton:false,
                    title: 'Error!',
                    text: 'Some error occured!',
                    icon: 'error',
                    timer:1500,
                    customClass:'swal-class'
                  })
            }
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
                position:'top-end',
                showConfirmButton:false,
                title: 'Cancelled',
                icon: 'error',
                timer:1500,
                customClass:'swal-class'
            })
          }
    });
};

const leaveGroup = async()=>{

    let id = document.getElementById('groupId').innerHTML;
    
    let result = await fetch('/leave-group?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {
        console.log(err);
    });

    if(!result)
        console.log('delete failed!');

    console.log('successfully deleted!');

    return {result, id};

}

////////// delete group

const delete_group = ()=>{
    var val='';
    Swal.fire({
        title: 'Do you want to delete and leave the group?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete group!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success mt-2',
        cancelButtonClass: 'btn btn-danger ms-2 mt-2',
        buttonsStyling: false
    }).then(async function (result) {
        if (result.value) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'The group and all messages with it will be deleted!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, sure!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-success mt-2',
                    cancelButtonClass: 'btn btn-danger ms-2 mt-2',
                    buttonsStyling: false
                }).then(async function (result) {
                    if (result.value) {
                        val = await deleteGroup();
                        if(val.result){
                            $('#messageList').html('');
                            $('#gc'+val.id).remove();
                            document.getElementById('search').setAttribute('hidden', true);
                            document.getElementById('params').setAttribute('hidden', true);
                            $('#to_user').html('');
                            Swal.fire({
                                position:'top-end',
                                showConfirmButton:false,
                                title: 'Success!',
                                text: 'You have just deleted the group.',
                                icon: 'success',
                                timer:2000,
                                customClass:'swal-class3'
                            })

                        }
                        else{
                            Swal.fire({
                                position:'top-end',
                                showCancelButton:false,
                                title: 'Error!',
                                text: 'Some error occured!',
                                icon: 'error',
                                timer:1500,
                                customClass:'swal-class2'
                              })
                        }
                      } else if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        Swal.fire({
                            position:'top-end',
                            showConfirmButton:false,
                            title: 'Cancelled',
                            icon: 'error',
                            timer:1500,
                            customClass:'swal-class'
                        })
                      }
                });

               
            } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
                position:'top-end',
                showConfirmButton:false,
                title: 'Cancelled',
                icon: 'error',
                timer:1500,
                customClass:'swal-class'
            })
        }
    });
};

const deleteGroup = async()=>{

    let groupId = document.getElementById('groupId').innerHTML;

    let result = await fetch('/delete-group?id='+groupId)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {
        console.log(err);
    });

    if(!result){
        console.log('Unsuccessful delete!');
    }
    console.log('Deleted :)');

    return {result, groupId};

}


$('#deleteAccount').click(function () {
    Swal.fire({
        title: "Do you want to delete your account?",
        showCancelButton: true,
        confirmButtonColor: "#1cbb8c",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes",
      }).then(function (result) {
        if (result.value) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1cbb8c",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes, delete it!"
              }).then(async function (result) {
                if (result.value) {
                    await fetch('/delete-user');
                }else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        position:'top-end',
                        showConfirmButton:false,
                        text: 'You made a right decision without deleting!',
                        icon: 'error',
                        timer:1500,
                        customClass:'swal-class2'
                    })
                }
            });

        }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                position:'top-end',
                showCancelButton:false,
                showConfirmButton:false,
                title: 'Cancelled!',
                icon: 'error',
                timer:1500,
                customClass:'swal-class'
            })
        }
    });
});


const getUsersToAdd = async()=>{
  
    let groupId = document.getElementById('groupId').innerHTML;

    const response = await fetch('/get-users-to-add?id='+groupId)
    .then(response => response.json())
    .catch(err => {console.log(err);});
    
    if(!response.result){
      console.log('Unsuccessfull getusersToAdd');
      return;
    }

    resultAllUser = '';
    response.result.forEach((user)=>{
        addAllUsers(user);
    });

    localStorage.setItem('members', JSON.stringify({members:response.result}));

    $('#add_users_group').html('');
    $('#add_users_group').append(resultAllUser);

}

const addMember = async()=>{

    let groupId = $('#groupId').html();
    let members = JSON.parse(localStorage.getItem('members')).members;

    console.log('members = '+members);

    var result = [];

    for(let  x of members){
        if(document.getElementById('formCheck'+x.user_id).checked){
            result.push(x.user_id);
        }
    }

    console.log('result = '+result);

    let response = await fetch('/add-users', {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          newUsers:result,
          groupId:groupId
        })
    })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    // console.log('Add users::'+response);

    let numberOfMem = $('.members').html();
    numberOfMem = parseInt(numberOfMem.split('\s')[0])+result.length;

    $('.members').html(numberOfMem+" members");

    const response2 = await fetch('/get-group-members-info?id='+groupId)
    .then(response => response.json())
    .catch(er => {console.log(er);});

    var members1 = response2.members;
    var owner = response2.owner;
    var current_user = response2.current_user;

    // console.log('members = '+members[0]);
    // console.log(typeof owner);

    membersTemp = '';

    if(!members1){
        console.log('members = '+members1);
        return;
    }

    if(owner){
        membersTemp +=
        `<a href="#groupMemberProfile" data-bs-toggle="modal" class="list-group-item list-group-item-action fw-bolder" data-bs-dismiss="modal" onclick="show_member_profile(${owner.user_id})">
            <div class="d-flex">
                <div class="user-img away  align-self-center me-4 ">
                    <img src="public/assets/send/uploadImages/${owner.profile_photo}" class="rounded-circle avatar-xs" alt="avatar-3" style="height:50px;width:50px;">
                </div>
                <div class="flex-1 overflow-hidden align-self-center">
                    <h5 class="text-truncate font-size-14 mb-1">${owner.account_name}</h5>
                </div>
                <div class="font-size-13 text-primary">Owner</div>
            </div>
          </a>`;    
          if(owner.user_id === current_user){
                let menuTemp =
                `<a class="dropdown-item" href="#groupProfile" data-bs-toggle="modal"><i class="bi bi-info-circle align-middle fa-lg me-2"></i>View Group Info</a>
                <a class="dropdown-item text-danger" href="javascript:void(0);" onclick="delete_group()"><i class="bi bi-box-arrow-right align-middle fa-lg me-2"></i>Delete And Leave Group</a>`
            
                $('#dropdownMenu').html('');
            
                $('#dropdownMenu').append(menuTemp);
          }
    }

    members1.forEach((user)=>{
        // console.log('user = '+user);
        add_members(user);
    });

    $('#groupMembers').html('');
    $('#groupMembers').append(membersTemp);

    
}

$('#searchAddUsers').keyup(async function (e) { 

    var val = $('#searchAddUsers').val();

    // console.log('val = ' + val);
    if(!val)
        await getUsersToAdd();

    let members = JSON.parse(localStorage.getItem('members')).members;
    // console.log(chats);

    for(let i=0; i < members.length; i++ ){
        if (!members[i].username.toLowerCase().includes(val.toLowerCase())) {
            // console.log(user);
            childNode = document.getElementById('form' + members[i].user_id);
            console.log('childNode = '+childNode);
            document.getElementById('add_users_group').removeChild(childNode);

            members.splice(i, 1);
            localStorage.removeItem('members');
            localStorage.setItem('members', JSON.stringify({members:members}));

        }
    }

});

const updateGroupPhoto = async()=>{

    let groupId = $('#groupId').html();
    let photo = document.getElementById('groupProfilePhoto').files[0];

    console.log('photo = '+photo);

    if(!photo)
        return photo;

    let formData = new FormData();
    formData.append('photo', photo);

    let response = await fetch('/update-group-photo?id='+groupId, {
        method:"POST",
        body:formData
    })
    .then(response => response.json())
    .then(response => response)
    .catch(err => {console.log(err);});

    if(response.result){
        Swal.fire({
            position:'top-end',
            title:'Photo changed!',
            showConfirmButton:false,
            icon:'success',
            timer:1700,
            customClass:'swal-class'
        });
        $('#groupPhoto').html('');
        $('#groupPhoto').append(`<img class="card-img img-fluid rounded-circle img-thumbnail" style="width:130px; height:130px;" src="public/assets/send/groupImages/${response.photo}" alt="Card image">`);
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

}

////////////// group messages edit and delete

const delete_group_message = async (id)=>{
    let result = await fetch('/delete-group-message?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(result){
        $('#grmess'+id).remove();
        Swal.fire({
            position:'top-end',
            showConfirmButton:false,
            title: 'Deleted!',
            icon: 'success',
            timer:1500,
            customClass:'swal-class2'
          });
    }else{
        Swal.fire({
            position:'top-end',
            showCancelButton:false,
            title: 'Failed!',
            text: 'Unknown error occured.',
            icon: 'error',
            timer:1500,
            customClass:'swal-class2'
          })
    }
}

const edit_group_message = async(id)=>{
    
    let mess = await fetch('/get-group-edit-message?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);})
    // console.log(mess);
    if(mess){
        // console.log('mess.message = '+mess.message);
        $('#updateGrMessage').val(mess.message);
        $('#sendEditMessGr').click(async ()=>{

            var message = $('#updateGrMessage').val();

            if(message.localeCompare(mess.message) !== 0){

                var result = await fetch ('/edit-group-message?id='+id, {
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
                        showConfirmButton:false,
                        title: 'Edited!',
                        icon: 'success',
                        timer:1500,
                        customClass:'swal-class2'
                      });
                      $('#grmessage'+id).html(message);
                }else{
                    Swal.fire({
                        position:'top-end',
                        showCancelButton:false,
                        title: 'Failed!',
                        text: 'Unknown error occured.',
                        icon: 'error',
                        timer:1500,
                        customClass:'swal-class2'
                      })
                }

            }

        });

        $('#updateGrMessage').keypress((event) => { 
            if(event.key === 'Enter'){
                event.preventDefault();
                $('#sendEditMessGr').click();
            }
        });
    }

}

const sendFileModal = () => {

    $('#send_file_modal').modal('show');

    let file = document.getElementById('shareFile').files[0];
    
    var name = file.name;
    if(name.split(' ').length === 1 && name.length>30){
        name = '...'+name.substring(name.length-30);
    }
    // console.log(file);
    // var index = name.lastIndexOf('.');
    // name = name.substring(index+1);

    // if(name === "jpeg" || name === "jpg" || name === "png" || name === "tiff" || name === "bmp" || name === "eps"){
    //     $('#sendfile').html(`<img class="card-img img-fluid rounded-circle img-thumbnail to-user-photo" style="height:140px; width:140px" src="" alt="Card image">`);
    // }

    $('#sendfile').html(name);
}
const send_file = async() => {

    $('#sendfile').empty();
    $('#sendfile').append(
    `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Sending...
    </button>`);
    
    let to_user_id = $('#userId').html();
    let file = document.getElementById('shareFile').files[0];
    let formData = new FormData();

    formData.append('file', file);

    let result = await fetch('/send-file?id='+to_user_id, {
        method:"POST",
        body:formData
    })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(result){

        $('#send_file_modal').modal('hide');
        
    }

}

const open_file = async() => {

    let filename = sessionStorage.getItem('filename');
    // console.log('ishlavotti');
    await fetch('/get-chat-file?name='+filename)
    .then(response => response.blob())
    .then(blob =>{
        console.log(blob);
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);

        // console.log(url);

        a.click();
        a.remove();
    })
    .catch(err => {console.log(err);});

}

const sendFileModalGr = ()=>{

    $('#send_file_modal_gr').modal('show');

    let file = document.getElementById('shareFile').files[0];
    
    var name = file.name;
    if( name.length>30){
        name = '...'+name.substring(name.length-30);
    }
    // console.log(file);
    
    $('#sendfilegr').html(name);

}

const send_file_gr = async() => {

    $('#sendfilegr').empty();
    $('#sendfilegr').append(
    `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Sending...
    </button>`);

    let groupId = parseInt(document.getElementById('groupId').innerHTML);

    let file = document.getElementById('shareFile').files[0];
    let formData = new FormData();

    formData.append('file', file);

    let result = await fetch('/send-file-group?id='+groupId, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(result)
        $('#send_file_modal_gr').modal('hide');
    else{
        $('#send_file_modal_gr').modal('hide');
        Swal.fire({
            title: 'Failed!',
            icon: 'danger',
            showCancelButton: true,
            cancelButtonText: 'OK',
            cancelButtonClass: 'btn btn-success mt-2',
            buttonsStyling: false
        });
    } 
        

}

const openGroupFile = async() => {

    let filename = sessionStorage.getItem('filenameGr');
    
    await fetch('get-group-file?name='+filename)
    .then(response => response.blob())
    .then(blob => {
        
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        
        a.click();
        a.remove();

    })
    .catch(err => {console.log(err);});

}

///// show photo sent 

const show_photo_sent = async(id) => {

    let result = await fetch('/get-file-info?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err =>{console.log(err);});

    if(result){
        $('#photoSent').empty();
        $('#photoSent').append(`<img class="mb-0" src="public/assets/send/${result}" 
        style="width: 100%; max-height:42rem;">`);
    }

    $('#see_photo_sent').modal('show');
}

const show_photo_sent_gr = async(id) => {

    let result = await fetch('/get-group-file-info?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err =>{console.log(err);});

    if(result){
        $('#photoSent').empty();
        $('#photoSent').append(`<img class="mb-0" src="public/assets/send/sendGroup/${result}" 
        style="width: 100%; max-height:42rem;">`);
    }

    $('#see_photo_sent').modal('show');

}

////////////// fullscreen

const fullscreen = () => {

    if($('#chat_area').css("min-height") === "486px"){
        $('#chat_area').css("min-height", "565px");
        $('#chatsGroup').css("min-height", "565px");
    }
    else{
        $('#chat_area').css("min-height", "486px");
        $('#chatsGroup').css("min-height", "486px");
    }
    
}

//chats modal
var chatModal;
const get_chats_modal = async()=>{
    chatModal = '';
    let data = await fetch('/get-chats')
        .then(response => response.json())
        .catch(err => {console.log(err);});

    if(data.data){
        // console.log(data);
        localStorage.removeItem('chats_modal');
        localStorage.setItem('chats_modal', JSON.stringify(data));

        for(let user of data.chats){
            await add_chats_modal(user);
        }
        $('#modal_chat_group').html('');
        $('#modal_chat_group').append(chatModal);
    }
}
const add_chats_modal = async (user) => { 

    var now = new Date();
    var time = new Date(user.create_time);
    var resultTime;
    // console.log(user);
    if (now.getDate() - time.getDate() > 0)
        resultTime = now.getDate() - time.getDate() + '  days ago';
    else if (now.getHours() - time.getHours() > 0)
        resultTime = now.getHours() - time.getHours() + ' hours ago';
    else
        resultTime = now.getMinutes() - time.getMinutes() + ' minutes ago';

    if(user.message ){

        if(user.type === 'text'){
            var contactTemp =
            ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" data-bs-dismiss="modal" onclick="start_chat(${user.user_id})" id="bm${user.user_id}">
                    <div class="d-flex">
                        <div class="user-img away align-self-center me-4 ">
                            <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats" 
                            alt="avatar-3" style="height:65px!important; width:65px!important;">
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
            ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" data-bs-dismiss="modal" onclick="start_chat(${user.user_id})" id="bm${user.user_id}">
                    <div class="d-flex">
                        <div class="user-img away  align-self-center me-4 ">
                            <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats" 
                            alt="avatar-3" style="height:65px!important; width:65px!important;">
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
        ` <a href="javascript:void(0);" class="list-group-item list-group-item-action fw-bolder list-chats" data-bs-dismiss="modal" onclick="start_chat(${user.user_id})" id="bm${user.user_id}">
                <div class="d-flex">
                    <div class="user-img away align-self-center me-4 ">
                        <img src="public/assets/send/uploadImages/${user.profile_photo}" class="rounded-circle avatar-xs img-chats" alt="avatar-3" 
                        style="height:65px!important; width:65px!important;">
                    </div>
                    <div class="flex-1 overflow-hidden align-self-center">
                        <h5 class="text-truncate font-size-14 mb-1">${user.account_name}</h5>
                    </div>
                </div>
           </a>`;

    }

    chatModal += contactTemp;
}
$('#searchChatModal').keyup(async() => { 
    var val = document.getElementById('searchChatModal').value;

    // console.log('val = ' + val);
    if(!val)
        await get_chats_modal();

    let chats = localStorage.getItem('chats_modal');
    chats = JSON.parse(chats).chats;
    // console.log(chats);
 
    for(let i=0; i < chats.length; i++){
        if (!chats[i].account_name.toLowerCase().includes(val.toLowerCase())) {
            // console.log(user);
            childNode = document.getElementById('bm' + chats[i].user_id);
            document.getElementById('modal_chat_group').removeChild(childNode);
            chats.splice(i, 1);
            localStorage.removeItem('chats_modal');
            localStorage.setItem('chats_modal', JSON.stringify({chats: chats}));
        }
    }
});

/////Change group name

$('#saveGroupName').click(async() => {
    // console.log('clicked');
    var name = $('#newGroupName').val();
    var gr_id = $('#groupId').html();

    console.log('name = '+name);
    console.log('group id = '+gr_id);

    if(!name){
        $('#newGroupName').css({'border-color':'red', 'color':'red'});
        $('[for="newGroupName"]').css({'color':'red'});
        return;
    }
    var result = await fetch('/change-group-name?id='+gr_id, {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify({name:name})
    })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);});

    if(result){

        $('.group-name').html(name);
        $('.grname'+gr_id).html(name);

        Swal.fire({
            position:'top-end',
            showConfirmButton:false,
            icon:'success',
            text:'Changed successfully!',
            timer:1700,
            customClass:'swal-class'
        });

    }else {
        Swal.fire({
            position:'top-end',
            showConfirmButton:false,
            icon:'error',
            text:'Unknown error occured!',
            timer:1700,
            customClass:'swal-class'
        });
    }
});

$('#newGroupName').keypress((event)=>{  

    if(event.key === 'Enter'){
        event.preventDefault();
        $('#saveGroupName').click();
    }
});


