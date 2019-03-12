import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  todos: Todo[];

  constructor(private TodoService: TodoService){}

  ngOnInit(){
    this.TodoService.getTodos().subscribe(res => {
      this.todos = res
    })
  }

  remove(item){
    this.TodoService.removeTodo(item.id);
  }
}
