import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { addNewPost, editPost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  addPostForm!:FormGroup;
  formType:string ="create";
  modifyFormId! :string | undefined
  constructor(private fb:FormBuilder,private store:Store<appState>,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.addPostForm =this.fb.group({
      title: ['',[Validators.required,Validators.minLength(5)]],
      description: ['',[Validators.required,Validators.minLength(5)]]
    })
    // this.route.paramMap.subscribe((params:any)=>{
    //   if(params&& params?.params?.id){
    //     this.modifyFormId = params.params.id
    //     this.formType ="modify";
    //     this.store.select(getPostById(this.modifyFormId)).subscribe(data=>{
    //       if(data){
    //         this.addPostForm.patchValue(data)
    //         // console.log(data);

    //       }
    //     })
    //   }

    // })


    /// in above code  we get the router parms from the url manaually and send it to the selector but now wehave implemented the router store
    // we get the data ditectly from router-selector and used inside the posts sleector to fetch the data from the store


      this.store.select(getPostById).subscribe(val=>{
        if(val){
          console.log(val);
          this.addPostForm.patchValue(val)
          this.modifyFormId = val.id
          this.formType ="modify";
        }
      })



  }
  validateTitle():string | null{
    const data = this.addPostForm?.controls['title'];
    if(data.invalid && data.touched){
      if(data?.errors?.required){
        return 'title is required'
      }
      if(data?.errors?.minlength){
        return 'title minlength is 5'
      }
    }
    return null
  }
  validateDescription():string | null{
    const data = this.addPostForm?.controls['description'];
    if(data.invalid && data.touched){
      if(data?.errors?.required){
        return 'description is required'
      }
      if(data?.errors?.minlength){
        return 'description minlength is 5'
      }
    }
    return null
  }
  addPost(){
    if(!this.addPostForm.valid){
     return;
    }
    this.store.dispatch(addNewPost({post:this.addPostForm.value}))
   this.addPostForm.reset();
  //  this.router.navigate(['posts'])
  }
  modifyPost(){
    if(!this.addPostForm.valid){
      return;
     }
     this.store.dispatch(editPost({post:{...this.addPostForm.value,id:this.modifyFormId}}))
     this.addPostForm.reset();
    //  this.router.navigate(['posts'])
  }
}
