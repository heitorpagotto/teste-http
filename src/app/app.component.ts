import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Post } from './models/post';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'teste-http';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  post = new Post();
  posts: Post[];
  postsFiltred:Post[];


  form:any;
  
  constructor(private http: HttpClient, private fb:FormBuilder) {
    this.form = this.fb.group({
      filter: [''],
    });
  }
  

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.http.get<Post[]>(this.ROOT_URL + '/posts').subscribe(resp=>{
      this.posts = resp;
      this.postsFiltred = resp;
    });
  }

  getPost(){
    let id = this.form.get('filter').value;
    this.postsFiltred = [];
    if(id === ''){
      this.postsFiltred = this.posts;

    }else{
      this.posts.filter(item=> item.id === Number(id) || item.title.includes(id) || item.userId === Number(id) ).map(itemMap=> {
         this.postsFiltred.push(itemMap);
      });
    }
  }


    

}
