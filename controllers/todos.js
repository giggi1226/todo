import db from '../db';
import models from '../models';

class Controller {
  getAllTodos(req, res){
    models.Todo.findAll().then(todos => {
      res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos
      })
    })
  }

  getTodo(req, res){
    const id = parseInt(req.params.id, 10);
    // const result = db.find(todo => todo.id === id)

    models.Todo.findByPk(id).then(todo => {
      console.log("hello " + todo);
      if(todo){
        console.log("in if")
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        });
      }

      return res.status(404).send({
        success: 'false',
        message: 'todo does not exist'
      });

    })
  }

  createTodo(req, res){
    console.log(req.body)
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }
    
    models.Todo.findOne({
      where: { title: req.body.title }
    }).then(todoFound => {
      if(todoFound){
        return res.status(403).send({
          success: 'true',
           message: 'A todo with that title exist already', 
         });
      }
    })

    const todo = {
      title: req.body.title
    }
    models.Todo.create(todo).then((todo) => {
      return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo
      })
    })
  }

  updateTodo(req, res){
    console.log("hello " + req);
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const updatedTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      updatedTodo,
    });    
  }

  deleteTodo(req, res){
    const id = parseInt(req.params.id, 10);
    const result = db.find(todo => todo.id === id)
    if (result) {
      let index = db.indexOf(result)
      db.splice(index, 1)
      return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfuly',
      });
    }
    return res.status(404).send({
      success: 'false',
      message: 'todo not found',
    });
  }
}

const todoController = new Controller();
export default todoController;