import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeriodicElement } from 'src/app/Common/Models/PeriodicElement';
import { FakeApiService } from 'src/app/Common/Services/fakeApi.service';

@Component({
  selector: 'app-new-element',
  templateUrl: './new-element.component.html',
  styleUrls: ['./new-element.component.scss']
})
export class NewElementComponent implements OnInit {

  formGroup!: FormGroup;
  submitted = false;
  dataToSave!: PeriodicElement;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private fakeApiService: FakeApiService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'weight': [null, Validators.required],
      'symbol': [null, Validators.required],
      'position': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  onSubmit(formValue: any){
    debugger;
    this.submitted = true;
    this.dataToSave = formValue;
    this.fakeApiService.addElement(this.dataToSave);
    this.router.navigate(['']);
  }

  goBack(){
    this.router.navigate(['']);
  }

}
