var app = require('express')();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
      destination:(req, file, cb)=>{
            cb(null, 'public/assets/uploadImages/')
      },
      filename:(req, file, cb)=>{
            // console.log(file);
            cb(null, Date.now()+ path.extname(file.originalname))
      }
});

var storage2 = multer.diskStorage({
      destination:(req, file, cb)=>{
            cb(null, 'public/assets/groupImages/');
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

      app.get('/', isUserAllowed, mainController.get_main_page);

      // app.post('/post-photo', (req, res)=>{
      //       console.log(req.body.profile_photo);
      // });

      app.get('/delete-user', isUserAllowed, mainController.delete_user);

      app.post('/post-messages', isUserAllowed, mainController.post_messages);
      app.get('/get-messages', isUserAllowed, mainController.get_messages);
      app.get('/get-contacts', isUserAllowed, mainController.get_contacts);
      app.get('/get-chats', isUserAllowed, mainController.get_chats);
      app.get('/delete-message', isUserAllowed, mainController.delete_message);
      app.get('/get-edit-message', isUserAllowed, mainController.get_edit_message);
      app.post('/edit-message', isUserAllowed, mainController.edit_message);

      app.get('/start-chat', isUserAllowed, mainController.start_chat);
      app.get('/clear-chat', isUserAllowed, mainController.clear_chat);
      app.get('/get-unreplied', isUserAllowed, mainController.get_unreplied);

      app.post('/update-user-name', isUserAllowed, mainController.update_account_name);
      app.get('/get-user-info', isUserAllowed, mainController.get_user_info);
      app.post('/update-profile-photo', isUserAllowed, upload.single('photo'), mainController.update_profile_photo);

      // group
      app.get('/all-users', isUserAllowed, mainController.get_all_users);
      app.post('/create-group', isUserAllowed, mainController.create_group);
      app.get('/get-groups', isUserAllowed, mainController.get_groups);
      app.get('/get-group-info', isUserAllowed, mainController.get_group_by_id);
      app.get('/get-group-members', isUserAllowed, mainController.get_group_members);
      app.get('/show-member-profile', isUserAllowed, mainController.show_member_profile);

      app.get('/leave-group', isUserAllowed, mainController.leave_group);
      app.get('/delete-group', isUserAllowed, mainController.delete_group);

      app.get('/get-users-to-add', isUserAllowed, mainController.get_users_to_add);
      app.post('/add-users', isUserAllowed, mainController.add_users_to_group);
      app.get('/get-group-members-info', isUserAllowed, mainController.get_group_members_info);
      app.post('/update-group-photo', isUserAllowed, uploadGroupPhotos.single('photo'), mainController.update_group_photo);

      /////group messages

      app.get('/get-group-messages', isUserAllowed, mainController.get_group_messages);
      app.get('/delete-group-message', isUserAllowed, mainController.delete_group_mess);
      app.get('/get-group-edit-message', isUserAllowed, mainController.get_group_edit_mess);
      
      app.post('/post-group-messages', isUserAllowed, mainController.post_group_messages);
      app.post('/edit-group-message', isUserAllowed, mainController.edit_group_mess);

      ///send files

      app.post('/send-file', isUserAllowed, postFiles.single('file'), mainController.post_file);
      app.post('/send-file-group', isUserAllowed, postFilesGroup.single('file'), mainController.post_file_group);
      
}