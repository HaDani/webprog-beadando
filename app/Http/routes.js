'use strict'

const Route = use('Route')

// Route.on('/').render('welcome')
// Route.on('/').render('main')
// Route.get('/', function * (request, response) {
//     yield response.sendView('main');
// });
Route.get('/', 'ToDoController.index')
Route.get('/todos/create', 'ToDoController.create').middleware('auth')
Route.post('/todos/create', 'ToDoController.doCreate').middleware('auth')
Route.get('/todos/showmytodos', 'ToDoController.showMyToDos').middleware('auth')
Route.get('/todos/:id', 'ToDoController.show').middleware('auth')
Route.get('/todos/:id/modify', 'ToDoController.modify').middleware('auth')
Route.post('/todos/:id/modify', 'ToDoController.doModify').middleware('auth')
Route.get('/todos/:id/delete', 'ToDoController.delete').middleware('auth')
Route.get('/todos/:id/markAsComplete', 'ToDoController.markAsComplete').middleware('auth')
Route.get('/todos/todoNotFound', 'ToDoController.todoNotFound')
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
Route.get('/accessDenied', 'ToDoController.accessDenied')
Route.get('/todos/:id/comment', 'ToDoController.comment').middleware('auth')
Route.post('/todos/:id/comment', 'ToDoController.doComment').middleware('auth')
Route.get('/comments/:id/delete', 'CommentController.delete').middleware('auth')
Route.get('/comments/:id/modify', 'CommentController.modifyComment').middleware('auth')
Route.post('/comments/:id/modify', 'CommentController.doModifyComment').middleware('auth')
Route.get('/profile/:id', 'UserController.showProfile').middleware('auth')
Route.post('/profile/:id', 'UserController.doModifyProfile').middleware('auth')
Route.get('/profile/:id/delete', 'UserController.deleteProfile').middleware('auth')
Route.get('todos/:id/addNewMember', 'TodoController.addNewMember').middleware('auth')
Route.post('todos/:id/addNewMember', 'TodoController.doAddNewMember').middleware('auth')
//git config --global url."https://".insteadOf git://
//node_modules\.bin\admin config\express-admin