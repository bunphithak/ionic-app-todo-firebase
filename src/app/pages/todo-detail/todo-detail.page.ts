import { TodoInterface } from './../../models/todo.model';
import { TodoService } from './../../servers/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {

  public todo: TodoInterface = {
    name: '',
    notes: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private toastCtel: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getTodoDetail(id).subscribe(todo => {
        this.todo = todo;
      });
    }
  }

  addTodo() {
    this.todoService.addTodo(this.todo).then(() => {
        this.router.navigateByUrl('/');
        this.showToast("Todo added");
    }, err => {
      this.showToast('There was a problem adding your todo :(');
    });
  }

  deleteTodo() {
    this.todoService.delateTodo(this.todo.id).then(() => {
        this.router.navigateByUrl('/');
        this.showToast("Todo deleted");
    }, err => {
      this.showToast('There was a problem deleting your todo :(');
    });
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo).then(() => {
        this.showToast("Todo updated");
    }, err => {
      this.showToast('There was a problem updating your todo :(');
    });
  }

  showToast(mag) {
    this.toastCtel.create({
      message: mag,
      duration: 2000
    }).then(toast => toast.present());
  }

}
