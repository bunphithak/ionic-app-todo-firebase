import { TodoInterface } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Observable<TodoInterface[]>;
  private todoCollection: AngularFirestoreCollection<TodoInterface>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.todoCollection = this.afs.collection<TodoInterface>('todos');
    this.todos = this.todoCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getTodos(): Observable<TodoInterface[]> {
    return this.todos;
  }

  getTodoDetail(id: string): Observable<TodoInterface> {
    return this.todoCollection.doc<TodoInterface>(id).valueChanges()
    .pipe(
      take(1),
      map(todo => {
        todo.id = id;
        return todo;
      })
    );
  }

  addTodo(todo: TodoInterface): Promise<DocumentReference> {
    return this.todoCollection.add(todo);
  }

  updateTodo(todo: TodoInterface): Promise<void> {
    return this.todoCollection.doc(todo.id).update({
      name: todo.name,
      notes: todo.notes
    });
  }

  delateTodo(id: string): Promise<void> {
    return this.todoCollection.doc(id).delete();
  }
}
