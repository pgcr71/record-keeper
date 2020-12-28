import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from './add-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userSevice: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone_number: ['', Validators.required]
    })
  }

  addUser() {
    if(this.addUserForm.valid) {
      this.userSevice.addUser(this.addUserForm.value).subscribe(() => {
        this.dialogRef.close(this.addUserForm.value);
      })
    }
  }
}
