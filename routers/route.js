var app = require('express')();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
      destination:(req, file, cb)=>{
            cb(null, 'public/assets/send/uploadImages/')
      },
      filename:(req, file, cb)=>{
            // console.log(file);
            cb(null, Date.now()+ path.extname(file.originalname))
      }
});

var storage2 = multer.diskStorage({
      destination:(req, file, cb)=>{
            cb(null, 'public/assets/send/groupImages/');
      },
      filename:(req, file, cb)=>{
            cb(null, Date.now()+path.extname(file.originalname));
      }
});

var storage3 = multer.diskStorage({
      destination:(req, file, cb)=>{
            cb(null, 'public/assets/send/');
      },
      filename:(req, file, cb)=>{
            cb(null, Date.now()+path.extname(file.originalname));
      }
});

var storage4 = multer.diskStorage({
      destination:(req, file, cb)=>{
            cb(null, 'public/assets/send/sendGroup/');
      },
      filename:(req, file, cb)=>{
            cb(null, Date.now()+path.extname(file.originalname));
      }
});

var upload = multer({storage:storage});
var uploadGroupPhotos = multer({storage:storage2});
var postFiles = multer({storage: storage3});
var postFilesGroup = multer({storage:storage4});

app.use(urlencodeParser);
app.use(bodyParser.json());
app.use(cors());
////Maincontroller

const mainController = require('../controllers/MainController');
const { fileLoader } = require('ejs');

module.exports = function (app) {

      function isUserAllowed(req, res, next) {
            sess = req.session;
            if (sess.user) {
                  return next();
            }
            else { res.redirect('/login'); }
      }

      app.use(isUserAllowed);

      app.get('/', mainController.get_main_page);

      // app.post('/post-photo', (req, res)=>{
      //       console.log(req.body.profile_photo);
      // })
      app.get('/delete-user',  mainController.delete_user);

      app.post('/post-messages',  mainController.post_messages);
      app.get('/get-messages', mainController.get_messages);
      app.get('/get-contacts', mainController.get_contacts);
      app.get('/get-chats', mainController.get_chats);
      app.get('/delete-message', mainController.delete_message);
      app.get('/get-edit-message', mainController.get_edit_message);
      app.post('/edit-message', mainController.edit_message);

      app.get('/start-chat', mainController.start_chat);
      app.get('/clear-chat', mainController.clear_chat);
      app.get('/get-unreplied', mainController.get_unreplied);

      app.post('/update-user-name', mainController.update_account_name);
      app.get('/get-user-info', mainController.get_user_info);
      app.post('/update-profile-photo', upload.single('photo'), mainController.update_profile_photo);

      app.get('/get-active-time', mainController.get_active_time);

      // group
      app.get('/all-users', mainController.get_all_users);
      app.post('/create-group', uploadGroupPhotos.single('photo'), mainController.create_group);
      app.get('/get-groups', mainController.get_groups);
      app.get('/get-group-info', mainController.get_group_by_id);
      app.get('/get-group-members', mainController.get_group_members);
      app.get('/show-member-profile', mainController.show_member_profile);

      app.get('/leave-group', mainController.leave_group);
      app.get('/delete-group', mainController.delete_group);

      app.get('/get-users-to-add', mainController.get_users_to_add);
      app.post('/add-users', mainController.add_users_to_group);
      app.get('/get-group-members-info', mainController.get_group_members_info);
      app.post('/update-group-photo', uploadGroupPhotos.single('photo'), mainController.update_group_photo);
      app.post('/change-group-name', mainController.update_group_name);

      /////group messages

      app.get('/get-group-messages', mainController.get_group_messages);
      app.get('/delete-group-message', mainController.delete_group_mess);
      app.get('/get-group-edit-message', mainController.get_group_edit_mess);
      
      app.post('/post-group-messages', mainController.post_group_messages);
      app.post('/edit-group-message', mainController.edit_group_mess);

      ///send files

      app.post('/send-file', postFiles.single('file'), mainController.post_file);
      app.post('/send-file-group', postFilesGroup.single('file'), mainController.post_file_group);
      app.get('/get-chat-file', mainController.get_file);
      app.get('/get-group-file', mainController.get_group_file);
      app.get('/get-file-info', mainController.get_file_info);
      app.get('/get-group-file-info', mainController.get_group_file_info);
      
}