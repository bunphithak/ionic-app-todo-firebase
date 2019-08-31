import { TodoService } from './../../servers/todo.service';
import { TodoInterface } from './../../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  public todos: Observable<TodoInterface[]>;
  constructor(
    private todoServers: TodoService
  ) { }

  ngOnInit() {
    this.todos = this.todoServers.getTodos();
  }

}
