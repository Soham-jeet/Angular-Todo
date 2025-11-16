import { Component } from '@angular/core';

interface Task {
  title: string;
  done: boolean;
  createdAt?: Date;
  Priority?: 'Low' | 'Medium' | 'High';
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {

  newTask : string='';
  newPriority : 'Low'| 'Medium' | 'High' = 'Medium';        
  tasks : Task[]= [];

  ngOnInit() {
    this.loadTasks(); // Load tasks from LocalStorage when component loads
  }

  loadTasks() {
    const saved = localStorage.getItem('tasks');

    if(saved) {
      this.tasks = JSON.parse(saved).map((t : any) => ({
        ...t,
        createdAt : new Date(t.createdAt) //convert date string to Date object
      }));
    }
    else {
        this.tasks = [];
      }
    }

    //save tasks to LocalStorage whenever tasks array changes
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

  //add new task
  addTask() {
    const text = this.newTask.trim();
    if(!text) return;
    this.tasks.unshift({
      title : text,
      done : false,
      createdAt : new Date(),
      Priority : this.newPriority
    });
    this.newTask = '';
    this.newPriority = 'Medium'

    this.saveTasks(); // Save tasks to LocalStorage
  }

  //delete task at index
  deleteTask(index : number) {
    this.tasks.splice(index, 1);

    this.saveTasks(); // Save tasks to LocalStorage
  }

  //toggle task done status
  toggleDone(task : Task){
    task.done = !task.done;

    this.saveTasks(); // Save tasks to LocalStorage
  }

  //sort tasks by priority: High, Medium, Low
  sortByPriority() {
    this.tasks.sort((a,b) => {
      const rank = {'High' : 3, 'Medium' : 2, 'Low' : 1};
      return (rank[b.Priority!] - rank[a.Priority!]);
    });

    this.saveTasks(); // Save tasks to LocalStorage
  }
}
