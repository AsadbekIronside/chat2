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
                // var child = document.getElementById('b'+val);
                // document.getElementById('chatsGroup').removeChild(child);
                // document.getElementById('search').setAttribute('hidden', true);
                // document.getElementById('params').setAttribute('hidden', true);
                // $('#to_user').html('');
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Chat has been cleared.',
                    icon: 'success'
                  })

            }
            else{
                Swal.fire({ 
                    title: 'Error!',
                    text: 'Some error occured!',
                    icon: 'error'
                  })
            }
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
              title: 'Cancelled',
              text: 'Your messaages are safe :)',
              icon: 'error'
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
            if(val){
                $('#messageList').html('');

                document.getElementById('search').setAttribute('hidden', true);
                document.getElementById('params').setAttribute('hidden', true);
                $('#to_user').html('');
                Swal.fire({
                    title: 'Success!',
                    text: 'You have just left the group.',
                    icon: 'success'
                  })

            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Some error occured!',
                    icon: 'error'
                  })
            }
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
              title: 'Cancelled',
              icon: 'error'
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

    return result;

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
                        if(val){
                            $('#messageList').html('');

                            document.getElementById('search').setAttribute('hidden', true);
                            document.getElementById('params').setAttribute('hidden', true);
                            $('#to_user').html('');
                            Swal.fire({
                                title: 'Success!',
                                text: 'You have just deleted the group.',
                                icon: 'success'
                            })

                        }
                        else{
                            Swal.fire({
                                title: 'Error!',
                                text: 'Some error occured!',
                                icon: 'error'
                              })
                        }
                      } else if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        Swal.fire({
                          title: 'Cancelled',
                          icon: 'error'
                        })
                      }
                });

               
            } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
              title: 'Cancelled',
              icon: 'error'
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

    return result;

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
                      title: 'You made a right decision without deleting!',
                      icon: 'error'
                    })
                }
            });

        }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'Cancelled!',
              icon: 'error'
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

    if(!response.result){
        console.log('Failed!');
    }else{
        console.log('Updated!');
        $('#groupPhoto').html('');
        $('#groupPhoto').append(`<img class="card-img img-fluid rounded-circle img-thumbnail" style="width:130px; height:130px;" src="public/assets/send/groupImages/${response.photo}" alt="Card image">`);
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
            title: 'Deleted!',
            icon: 'success'
          });
    }else{
        Swal.fire({
            title: 'Failed!',
            text: 'Unknown error occured.',
            icon: 'error'
          })
    }
}

const edit_group_message = async(id)=>{
    
    let mess = await fetch('/get-group-edit-message?id='+id)
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {console.log(err);})
    // console.log(mess);
    if(mess.message){

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
                        title: 'Edited!',
                        icon: 'success'
                      });
                      $('#grmessage'+id).html(message);
                }else{
                    Swal.fire({
                        title: 'Failed!',
                        text: 'Unknown error occured.',
                        icon: 'error'
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