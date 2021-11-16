import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Post } from "../posts/state/posts.state";

@Injectable({
  providedIn:'root'
})
export class PostsService {
  constructor( private http:HttpClient){}

  getPost():Observable<Post[]>{
    return this.http.get<Post[]>(`https://ngrx-proj-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`).pipe(map(val=>{
      const posts:Post[]=[];
      for(let key in val){
        posts.push({...val[key],id:key})
      }
      return posts
    }))
  }

   addPost(post:Post):Observable<{name:string}>{
    return this.http.post<{name:string}>(`https://ngrx-proj-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`,post)
  }
   updatePost(post:Post):Observable<Post>{
    return this.http.patch<Post>(`https://ngrx-proj-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json`,post)
  }
  deletePost(id:string){
    return this.http.delete(`https://ngrx-proj-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`)
  }

  getSinglePost(id:string):Observable<Post>{
    return this.http.get<Post>(`https://ngrx-proj-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`)
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
        case 'EMAIL_EXISTS':
          return 'Email already exist';
          case 'Permission denied':
            return 'Permission denied';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }
}
