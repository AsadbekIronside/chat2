const knex = require('../db/db_init');
const messages = 'tb_messages';
const users = 'tb_users';
const groups = 'tb_groups';
const groupMessages = 'tb_group_messages';


const deleteUser = async(userId)=>{
    return await knex(users).update({user_status:0, delete_time:new Date(), active_time: Date.now()}).where('user_id', '=', userId);
}

const postMessages = async (data) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', data.from_user_id);

    return await knex.raw(
        `INSERT INTO tb_messages(from_user_id, to_user_id, message, create_time)VALUES(${data.from_user_id}, 
        ${data.to_user_id}, "${data.message}", "${data.create_time}");`);
    
}

const getMessages = async (count, from_user_id, to_user_id) => {
    return await knex(messages)
        .select(['message_id', 'from_user_id', 'to_user_id', 'message', 'create_time', 'type'])
        .where(knex.raw(`((from_user_id=${from_user_id} AND to_user_id=${to_user_id}) OR (from_user_id=${to_user_id} AND to_user_id=${from_user_id}))`))
        .andWhere('message_status', '=', 1)
        .andWhere(knex.raw(`message_id>${count}`))
        .orderBy('message_id');
}

const getMessagesUserRelated = async (current_user_id) => {

    return await knex(messages).select(['from_user_id', 'to_user_id'])
        .where(knex.raw(`(from_user_id=${current_user_id} OR to_user_id=${current_user_id}) AND message_status=1`));

}

const getUser = async (user_id) => {

    return await knex(users).select(['user_id', 'username', 'account_name', 'profile_photo', 'active_time'])
        .where('user_id', '=', user_id)
        .andWhere('user_status', '=', '1');
}

const clearChat = async (from_user_id, to_user_id) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', from_user_id);

    return await knex(messages).update({ message_status: 0, delete_time: new Date() })
        .where(knex.raw(`((from_user_id=${from_user_id} AND to_user_id=${to_user_id}) OR (from_user_id=${to_user_id} AND to_user_id=${from_user_id}))`))
        .andWhere('message_status', '=', '1');

}

const getOnesUserTyped = async (user_id) => {
    return await knex(messages).select(['message_id', 'from_user_id', 'to_user_id'])
        .where('message_status', '=', '1')
        .andWhere(knex.raw(`message_id IN (SELECT MAX(message_id) FROM tb_messages WHERE from_user_id=${user_id} GROUP BY to_user_id)`));
}

const getOnesTypedUser = async (user_id) => {
    return await knex(messages).select(['message_id', 'from_user_id', 'to_user_id'])
        .where('message_status', '=', '1')
        .andWhere(knex.raw(`message_id IN (SELECT MAX(message_id) FROM tb_messages WHERE to_user_id=${user_id} GROUP BY from_user_id)`));
}

const getMessageById = async (id) => {
    return await knex(messages).select(['message_id', 'message', 'create_time', 'type'])
        .where('message_id', '=', id)
        .andWhere('message_status', '=', 1);
}

const updateAccountName = async (id, name) => {
    return await knex(users).update({ account_name: name, update_time: new Date(), active_time:Date.now()}).where('user_id', '=', id)
    .then(result => true)
    .catch(err => {
        console.log(err);
        return false;
    });
}

const updateProfilePhoto = async (id, photo_name) => {
    await knex(users).update({ profile_photo: photo_name, update_time: new Date(), active_time: Date.now()}).where('user_id', '=', id);
}

const getAllUsers = async (user_id) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user_id);
    
    return await knex(users).select(['user_id', 'username', 'account_name', 'profile_photo'])
        .where('user_status', '=', '1').andWhere('user_id', '<>', user_id);
}

const deleteMessage = async (id, user)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(messages).update({message_status:0, delete_time: new Date()}).where('message_id', '=', id)
    .then(result => {
        return true;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

const editMessage = async (id, mess, user) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);
    
    return await knex(messages).update({message: mess, update_time: new Date()})
    .where('message_id', '=', id)
    .then(result => true)
    .catch(err => {
        console.log(err);
        return false;
    });
}

//groups 

const createGroup = async (group, user) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groups)
        .insert({
            name: group.name,
            users: group.users,
            owner: group.owner,
            create_time: new Date()
        })
        .then(result => {
            return result;
        })
        .catch(e => {
            return false;
        });


}

const getAllGroups = async ()=>{
    return await knex(groups).select(['id', 'name', 'users', 'owner', 'admins', 'photo'])
    .where('status', '=', '1')
    .then(result=>{
        return result;  
    })
    .catch(err => {
        return false;
    });
}

const getGroupById = async (id, user)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groups).select(['id','name', 'owner', 'users', 'admins', 'photo'])
    .where('id', '=', id)
    .then(result =>{
        return result;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

const getGroupMessages = async(id, count)=>{
    return await knex(users).select([ 
        'user_id', 'username', 'account_name', 'profile_photo', 'user_status', 'id', 'type', 'message', 'tb_group_messages.create_time AS create_time'])
    .innerJoin(groupMessages, 'tb_group_messages.user', 'tb_users.user_id')
    .where('group', '=', id)
    .andWhere('status', '=', 1)
    .andWhere('id', '>', count)
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

const postGroupMessages = async(user, group, message)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groupMessages).insert({
        user:user,
        group:group,
        message:message,
        create_time: new Date()
    })
    .then(result =>{
        return result;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
        
}

const updateGroupUsers = async(mems, id, user)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groups).update({users:mems, update_time: new Date()})
    .where('id', '=', id)
    .then(result =>{
        return result;
    })
    .catch(err =>{
        console.log(err);
        return false;
    });
}

const deleteGroup = async(id, user)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return knex(groups).update({status:0, delete_time: new Date(), owner:0})
    .where('id', '=', id)
    .then(result => {
        return true;
    })
    .catch(err =>{
        console.log(err);
        return false;
    });
}

const updateGroupPhoto = async(id, photo, user)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groups).update({photo:photo, update_time:new Date()})
    .where('id', '=', id)
    .andWhere('status', '=', '1')
    .then(result =>{
        return result;
    })
    .catch(err =>{
        console.log(err);
        return false;
    });
}

const getGroupMember = async (user_id) => {
    return await knex(users).select(['user_id', 'username', 'account_name', 'profile_photo', 'user_status', 'active_time'])
        .where('user_id', '=', user_id);
}

const get_unreplied_user = async (user_id, curr_user) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', curr_user);

    return await knex(users).select(['user_id', 'username', 'account_name', 'profile_photo', 'user_status', 'active_time'])
        .where('user_id', '=', user_id);
}


const delGroupMess = async (id, user) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groupMessages).update({status:0, delete_time: new Date()})
    .where('id', '=', id)
    .then(result => true)
    .catch(err => {
        console.log(err);
        return false;
    });
}

const editGroupMess = async (id, mess, user) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groupMessages).update({message: mess, update_time: new Date()})
    .where('id', '=', id)
    .then(result => true)
    .catch(err => {
        console.log(err);
        return false;
    });
}

const getGroupMessById = async(id) => {
    return await knex(groupMessages).select(['id', 'message', 'create_time'])
    .where('id', '=', id)
    .andWhere('status', '=', 1)
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

///files

const postFileMess = async(from, to, mess, type)=>{

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', from);

    return await knex(messages).insert({
        from_user_id: from, 
        to_user_id:to,
        message:mess,
        type:type,
        create_time: new Date()
    })
    .then(result => true)
    .catch(err => {
        console.log(err);
        return false;
    });
}

const postFileGroup = async(user, group, type, mess) => {

    await knex(users).update({active_time: Date.now()})
    .where('user_id', '=', user);

    return await knex(groupMessages).insert({
        user: user,
        group: group,
        message: mess,
        type:type,
        create_time: new Date()
    })
    .then(result => true)
    .catch(err => {
        console.log(err);
        return false;
    });

}



module.exports = {
    deleteUser, postMessages, getMessages,
    getMessagesUserRelated,getUser,
    clearChat, deleteMessage,getOnesTypedUser,
    getOnesUserTyped,getMessageById,
    updateAccountName, updateProfilePhoto,
    getAllUsers, createGroup, getAllGroups,
    getGroupById, getGroupMessages,
    postGroupMessages, updateGroupUsers,
    deleteGroup, updateGroupPhoto,
    getGroupMember,editMessage,
    delGroupMess, editGroupMess, getGroupMessById,
    postFileMess, postFileGroup, get_unreplied_user

};

