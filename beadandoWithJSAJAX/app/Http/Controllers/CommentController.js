'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Todo = use('App/Model/Todo')
const Comment = use('App/Model/Comment')
const User = use('App/Model/User')
const Validator = use('Validator')

class CommentController {
  
   * delete (request, response) {
      const id = request.param('id');
      const comment = yield Comment.find(id);
      const todo_id = comment.todo_id;


      

      if (request.currentUser.id !== comment.user_id) {
        response.redirect('/accessDenied');
        return
      }

      if (!comment) {
        //response.notFound('A ToDo amit szeretett volna elérni, nem található!')
      //  response.redirect('/todos/todoNotFound');
        yield response.sendView('todoNotFound', {
            
        })
        return
      }

      yield comment.delete();
      response.redirect('/todos/showmytodos');
  }

  * show(request, response) {
    const id = request.param('id')
    const todo = yield Todo.find(id)
    const todos = yield Todo.all();
    const allComments = yield Comment.all();

    let connComms = []
    console.log(allComments);

    for (let comm of allComments) {
      if ((comm.user_id == request.currentUser.id) && (comm.todo_id == id)) {
        connComms.push(comm);
      }
    }

    console.log(connComms);


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
  
  * modifyComment(request, response) {

    const id = request.param('id');
    const comment = yield Comment.find(id);


    if (request.currentUser.id !== comment.user_id) {
      response.redirect('/accessDenied');
      return
    }

    if (!comment) {
      //response.notFound('A ToDo amit szeretett volna elérni, nem található!')
      yield response.sendView('todoNotFound', {
    
    })
      return
    }

    yield response.sendView('modifyComment', {
      comment: comment.toJSON(),
    });

  }

  * doModifyComment(request, response) {
     const commentData = request.except('_csrf');

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
    const comment = yield Comment.find(id);

    if (request.currentUser.id !== comment.user_id) {
      response.redirect('/accessDenied');
      return
    }

    comment.text = commentData.text;
    
    yield comment.save();

    response.redirect('/todos/showmytodos');
  }


}

module.exports = CommentController
