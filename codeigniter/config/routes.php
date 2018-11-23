<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|    example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|    https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|    $route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|    $route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|    $route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:    my-controller/index    -> my_controller/index
|        my-controller/my-method    -> my_controller/my_method
 */
$route['default_controller'] = 'welcome';
// $route['Register1'] = 'Register/Register1';
$route['404_override'] = '';
$route['translate_uri_dashes'] = false;
$route['regform'] = "Account/register";
$route['login'] = "Account/logins";
$route['forgot'] = "ForgetPassword/forgotPassword";
$route['reset'] = "ForgetPassword/reset";
$route['mailvali'] = "EmailValidation/emailValid";
$route['getEmailId1'] = "ForgetPassword/getEmailId";
$route['color'] = "GetColor/fetchColor";
$route['note'] = "FetchNote/createNote";
$route['fetch'] = "FetchNote/fetch";
$route['resultcard'] = "FetchNote/editReminderCard";
$route['deletecard'] = "FetchNote/deleteReminderCard";
$route['popedit'] = "FetchNote/popCardEditReminder";
$route['popdelete'] = "FetchNote/delete";
$route['save'] = "FetchNote/save";
$route['addLabel'] = "Label/addLabel";
$route['fetchLabel'] = "Label/fetchLabel";
$route['deleteLabel'] = "Label/delete";
$route['editLabelurl'] = "Label/editLabel";
$route['isArchive'] = "Archived/isArchive";
$route['archivereceive']="Archived/receiveArchive";
$route['archiverefresh']="Archived/storearchive";
$route['unarchive']="Archived/unArchive";
$route['deleterecover']="Trash/deleteRecover";
$route['delete']="Trash/delete";
$route['deleteForever']= "Trash/deleteForver";
$route['remindernote']= "Reminder/reminderNotes";
$route['addlabel'] = "Label/labelForNote";
$route['addLabelCard']="Label/addLabelCard";
$route['deleteLabelCard']="Label/deleteLabel";
$route['getLabel']= "Label/getLabel";
$route['image']= "ProfilePic/upload";
$route['collabemail']="Collabortor/collabortors";
$route['collabowner']="Collabortor/getOwner";
$route['collaaddemail']="Collabortor/getCollabEmail";
$route['collabemailed']="Collabortor/getCollabedEmail";
$route['deletecollab']="Collabortor/deleteCollab";
$route['displaycollab']="Collabortor/displayForNoteCard";
$route['getmail']="Collabortor/getEmail";
$route['getpics']="ProfilePic/getPic";
