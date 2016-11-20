'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Family = use('App/Model/Family')
const Hash = use('Hash')

class UserController {
  

  * register (request, response) {
    yield response.sendView('register')
  }

  * login (request, response) {
    yield response.sendView('login')
  }

  * doRegister(request, response) {

    
    const registerData = request.except('_csrf');
    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      lastname: 'required|min:2',
      firstname: 'required|min:2',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    }
    const validation = yield Validator.validateAll(registerData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const user = new User();

    user.username = registerData.username
    user.email = registerData.email
    user.firstname = registerData.firstname
    user.lastname = registerData.lastname
    user.password = yield Hash.make(registerData.password)

    yield user.save()

    yield request.auth.login(user)

    response.redirect('/todos/showmytodos');
  }

  * doLogin (request, response) {
    const email = request.input('email')
    const password = request.input('password')
   /* const lastname = request.input('lastname')
    const firstname = request.input('firstname')*/

    try {
      const login = yield request.auth.attempt(email, password) 

      if (login) {
            response.redirect('/todos/showmytodos');
        return
      }
    }
    catch (err) {
      yield request
        .withAll()
        .andWith({ errors: [err] })
        .flash()

      response.redirect('back')
      return
    }
  }

  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

  * showProfile(request, response) {
    const userID = request.param('id')
    const user = yield User.find(userID);

    if (request.currentUser.id == userID) {
     yield response.sendView('showUser', {
      user: user.toJSON(),
    });
    }
  }

    * doModifyProfile(request, response) {
      const modifyData = request.except('_csrf');
      const user = yield User.find(request.currentUser.id);
    
      const rules = {
        email: 'required|email',
        lastname: 'required|min:2',
        firstname: 'required|min:2',
        password: 'min:4',
        password_confirm: 'same:password',
      }

      const validation = yield Validator.validateAll(modifyData, rules);
      if (validation.fails()) {
        yield request
          .withAll()
          .andWith({ errors: validation.messages() })
          .flash()

        response.redirect('back')
        return
      }

      user.email = modifyData.email
      user.firstname = modifyData.firstname
      user.lastname = modifyData.lastname
      
      if (modifyData.password != '') {
        user.password = yield Hash.make(modifyData.password)
      }

      yield user.save();

      //yield request.auth.login(user)

      response.redirect('/todos/showmytodos');
    }

     * deleteProfile(request, response) {
       const id = request.param('id')
       const user = yield User.find(request.currentUser.id);

       const todos = yield user.todos().fetch()
       
       const sharedToDos = yield Family.all();
       
       
      if (request.currentUser.id != id) {
        response.redirect('/accessDenied');
        return
      }
       
       for (let todo of todos) {
         console.log(todo);
         yield todo.delete();
       }
       
       for (let td of sharedToDos) {
           if (td.user_id == request.currentUser.id) {
               yield td.delete();
           }
       }


      if (!user) {
        //response.notFound('A ToDo amit szeretett volna elérni, nem található!')
      //  response.redirect('/todos/todoNotFound');
        yield response.notFound('A fiók amit szeretett volna elérni, nem található!', {
            
      })
        return
      }

      yield user.delete();

      response.redirect('/');
    }
}

module.exports = UserController