'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Todo = use('App/Model/Todo')
const Family = use('App/Model/Family')
const Comment = use('App/Model/Comment')
const User = use('App/Model/User')
const Validator = use('Validator')

class ToDoController {
  * index(request, response) {
    const user = yield request.auth.check()
     if (user) {
          response.redirect('/todos/showmytodos');
          return 
      }
    
      
    const categories = yield Category.all()

    for (let category of categories) {
      console.log(category);
      const topTodos = yield category.todos().fetch()
      category.topTodos = topTodos.toJSON()
    }

    yield response.sendView('main', {
      categories: categories.toJSON()
    })
  }

  * showMyToDos(request, response) {
     let nullCats = [];
     let currCat = 0;
    const categories = yield Category.all()
    let newCats = [];
   
   const familyToDos = yield Family.all();
      
    let sharedToDos = [];
   
   for (let todo of familyToDos) {
       if (todo.famMemb_id == request.currentUser.id) {
           sharedToDos.push(todo);
       }
   }
    
   
    
    for (let category of categories) {
      const firstPost = yield category.todos().where('user_id', request.currentUser.id).first()
      const topTodos = yield category.todos().where('user_id', request.currentUser.id).fetch()

      var index = categories.indexOf(category);

    

      category.topTodos = topTodos.toJSON()

      if (firstPost == null) {
        // categories.splice(index, 1);
      }
      else {
        newCats.push(category);
      }
      currCat++;
    }

    yield response.sendView('showMyToDos', {
      newCats: newCats,
      nullCats: nullCats,
      sharedToDos: sharedToDos,
    });
  }

  * create(request, response) {
    const categories = yield Category.all();

    yield response.sendView('createToDo', {
      categories: categories.toJSON()
    });
  }

  * doCreate(request, response) {
    const toDoData = request.except('_csrf');

    const rules = {
      name: 'required',
      category_id: 'required',
      year_date: 'min:4|above:2015',
      month_date: 'above:0', 
      day_date: 'above:0|under:32'
    }
    const validation = yield Validator.validateAll(toDoData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }
    
    toDoData.user_id = request.currentUser.id;
    yield Todo.create(toDoData);

    response.redirect('/');
  }

  * modify(request, response) {


    
    const categories = yield Category.all();

    const id = request.param('id');
    const todo = yield Todo.find(id);


    if (request.currentUser.id !== todo.user_id) {
      response.redirect('/accessDenied');
      return
    }

    if (!todo) {
      //response.notFound('A ToDo amit szeretett volna elérni, nem található!')
      yield response.sendView('todoNotFound', {
    
    })
      return
    }

    yield response.sendView('modifyToDo', {
      todo: todo.toJSON(),
      categories: categories.toJSON()
    });

  }

  * doModify(request, response) {
     const todoData = request.except('_csrf');

    const rules = {
      name: 'required',
      category_id: 'required',
       year_date: 'min:4|above:2015',
      month_date: 'above:0', 
      day_date: 'above:0|under:32'
    }
    const validation = yield Validator.validateAll(todoData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id');
    const todo = yield Todo.find(id);
    
    const sharedTodos = yield Family.all();

    if (request.currentUser.id !== todo.user_id) {
      response.redirect('/accessDenied');
      return
    }
        
    todo.name = todoData.name;
    todo.description = todoData.description;
    todo.category_id =  todoData.category_id;
    todo.year_date = todoData.year_date;
    todo.month_date = todoData.month_date;
    todo.day_date = todoData.day_date;
    
    for (let td of sharedTodos) {
        if (td.todo_id == id) {
            td.todo_name = todoData.name;
            td.description = todoData.description;
            td.category_id = todoData.category_id;
            td.year_date = todoData.year_date;
            td.month_date = todoData.month_date;
            td.day_date = todoData.day_date;
            td.save();
        }
    }
    
    yield todo.save();

    response.redirect('/todos/showmytodos');
  }
  
   * delete (request, response) {
      const id = request.param('id');
      const todo = yield Todo.find(id);
      const todoInFamily = yield Family.all();
      
      let todosToDeleteFromFamily = [];
      
      for (let todoinfamily of todoInFamily) {
          if (todoinfamily.todo_id == id) {
              todosToDeleteFromFamily.push(todoinfamily);
          }
      }
      

      if (request.currentUser.id !== todo.user_id) {
        response.redirect('/accessDenied');
        return
      }

      if (!todo) {
        //response.notFound('A ToDo amit szeretett volna elérni, nem található!')
      //  response.redirect('/todos/todoNotFound');
        yield response.sendView('todoNotFound', {
            
    })
        return
      }

      yield todo.delete();
      
      for (let todoinfamily of todosToDeleteFromFamily) {
          yield todoinfamily.delete();
      }
      response.redirect('/todos/showMyToDos');
  }

  * show(request, response) {
    const id = request.param('id')
    const todo = yield Todo.find(id)
    const todos = yield Todo.all();
    const allComments = yield Comment.all();
    
    const sharedToDos = yield Family.all();
   

    let connComms = []
    console.log(allComments);

    for (let comm of allComments) {
      if ((comm.todo_id == id)) {
        connComms.push(comm);
      }
    }

    console.log(connComms);

    let isUserIDFound = false;
    for (let td of sharedToDos) {
        console.log("CurrUser: " + request.currentUser.id + " == " + td.famMemb_id + "&&" + id + "==" + td.todo_id)
        if ((request.currentUser.id == td.famMemb_id) &&
             id == td.todo_id) {
                 isUserIDFound = true;
             }
    }
    
    console.log(request.currentUser.id + " != " + todo.user_id)
    console.log(isUserIDFound)

     if ((request.currentUser.id != todo.user_id) && !isUserIDFound) {
        response.redirect('/accessDenied');
        return
    }

    if (!todo) {
      //response.notFound('A ToDo amit szeretett volna elérni, nem található!')
            yield response.sendView('todoNotFound', {
    
    })
      return
    }
    yield todo.related('category').load()

 
    yield response.sendView('showToDo', {
      todo: todo.toJSON(),
      comments: connComms
    })

  }
  
  * todoNotFound(request, response) {
      yield response.sendView('todoNotFound', {
      
    })
  }

  * accessDenied(request, response) {
     yield response.sendView('accessDenied', {
      
    })
  }
  
  * comment(request, response) {
    const id = request.param('id')
    const todo = yield Todo.find(id)

    const sharedToDos = yield Family.all();
    
    let isUserIDFound = false;
    for (let td of sharedToDos) {
        if ((request.currentUser.id == td.famMemb_id) &&
             id == td.todo_id) {
                 isUserIDFound = true;
             }
    }

     if (request.currentUser.id !== todo.user_id && !isUserIDFound) {
      response.redirect('/accessDenied');
      return
    }

    if (!todo) {
            yield response.sendView('todoNotFound', {
    
    })
      return
    }
    yield todo.related('category').load()

 
    yield response.sendView('writeComment', {
      todo: todo.toJSON()
    })
  }
  
* doComment(request, response) {
     const commentData = request.except('_csrf');

     const sharedToDos = yield Family.all();
 
    const rules = {
      text: 'required',
    }
    const validation = yield Validator.validateAll(commentData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id');
    const todo = yield Todo.find(id);

    let isUserIDFound = false;
    for (let td of sharedToDos) {
        if ((request.currentUser.id == td.famMemb_id) &&
             id == td.todo_id) {
                 isUserIDFound = true;
             }
    }

     if (request.currentUser.id !== todo.user_id && !isUserIDFound) {
      response.redirect('/accessDenied');
      return
    }

  
    
    commentData.user_id = request.currentUser.id;
    commentData.todo_id = id;

    yield Comment.create(commentData);

    response.redirect("/todos/"+id);
  }
  
  * addNewMember(request, response) {
    const id = request.param('id')
    const todo = yield Todo.find(id)

     if (request.currentUser.id !== todo.user_id) {
      response.redirect('/accessDenied');
      return
    }

    if (!todo) {
            yield response.sendView('todoNotFound', {
    
    })
      return
    }
    
    yield todo.related('category').load()

 
    yield response.sendView('addFamilyMember', {
      todo: todo.toJSON()
    })
  }
  
  
  * doAddNewMember(request, response) {
     const memberData = request.except('_csrf');
     const users = yield User.all();

    const rules = {
      mem_email: 'required|email',
    }
    const validation = yield Validator.validateAll(memberData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id');
    const todo = yield Todo.find(id);
    
    let found = false;
    
    let userLookedFor;
    
    for (let user of users) {
        if (user.email == memberData.mem_email) {
            found = true;
            userLookedFor = user;
            console.log("FOUND");
        }
    }

    if (request.currentUser.id !== todo.user_id) {
      response.redirect('/accessDenied');
      return
    }

    let currMem = {};
    
    
    
    currMem.user_id = request.currentUser.id;
    currMem.todo_id = id;
    currMem.famMemb_id = userLookedFor.id;
    currMem.name = todo.name;
    currMem.username = request.currentUser.username;
    currMem.todo_name = todo.name;
    currMem.user_name = request.currentUser.username;

    yield Family.create(currMem);

    response.redirect("/todos/"+id);
  }

   * ajaxDelete(request, response) {
    const id = request.param('id')
    const todo = yield Todo.find(id)
    console.log(id);
    console.log(todo);
    if (!todo) {
      response.notFound('Hiba történt a feldolgozás során!')
      return
    }
    yield todo.delete()
    response.ok({success: true});
  }

  * ajaxComment(request, response) {
      const commentData = request.except('_csrf');
      const id = request.param('id')
      const todo = yield Todo.find(id)
      const comments = yield Comment.all();
      
      
      if (request.currentUser.id !== todo.user_id) {
      response.redirect('/accessDenied');
      return
    }
    
                        
        let lastNum = 0;
        for (let comm of comments) {
               lastNum = comm.id;

        }
        
        console.log(lastNum);
        lastNum++;
        
      commentData.user_id = request.currentUser.id;
      commentData.todo_id = id;
     // commentData.id = lastNum;

     yield Comment.create(commentData);

     response.ok({success: true});
  }

   * ajaxModifyToDo(request, response) {
       const todoData = request.except('_csrf');
      const categories = yield Category.all()


    const rules = {
      name: 'required',
      category_id: 'required',
       year_date: 'min:4|above:2015',
      month_date: 'above:0', 
      day_date: 'above:0|under:32'
    }
    const validation = yield Validator.validateAll(todoData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id');
    const todo = yield Todo.find(id);
    
    const sharedTodos = yield Family.all();

    if (request.currentUser.id !== todo.user_id) {
      response.redirect('/accessDenied');
      return
    }
        
    todo.name = todoData.name;
    todo.description = todoData.description;
    todo.category_id =  todoData.category_id;
    todo.year_date = todoData.year_date;
    todo.month_date = todoData.month_date;
    todo.day_date = todoData.day_date;
    
    for (let td of sharedTodos) {
        if (td.todo_id == id) {
            td.todo_name = todoData.name;
            td.description = todoData.description;
            td.category_id = todoData.category_id;
            td.year_date = todoData.year_date;
            td.month_date = todoData.month_date;
            td.day_date = todoData.day_date;
            td.save();
        }
    }
    
    
    yield todo.save();
    let catName;
     for (let category of categories) {
         if (category.id == todo.category_id) {
             catName = category.name;
         }
    }
    
    
   response.ok({success: true, tName: todo.name, tDesc: todo.description, tCatID: catName, tYDate: todo.year_date, tMDate: todo.month_date, tDDate: todo.day_date});

  }
  
  
}

module.exports = ToDoController
