import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

function checkLength(val: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (!c.value)
      return null;
    if (c.value.toString().length == val)
      return null;
    return { length: true };
  };
}
function PaswdMatch(c: AbstractControl): { [key: string]: boolean } | null {
  let pswd = c.get('password');
  let cpswd = c.get('cPassword');
  if (pswd.pristine || cpswd.pristine)
    return null;
  if (pswd.value === cpswd.value)
    return null;
  return { match: true };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;  //Root Form group
  mobilePtrn = '^[0-9]*$';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: [{ value: 'NA', disabled: true }, [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', [checkLength(10),Validators.pattern(this.mobilePtrn)]],
      paswrdGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        cPassword: ['', [Validators.required]]
      },
        { validator: PaswdMatch }
      ),
      notification: 'email'
    });

    // this.signUpForm.patchValue({
    //   firstName: 'testName'
    // });
  }
  save() {
    console.log(this.signUpForm.value);
  }

  setNotifyVia(val: string): void {
    const phoneControl = this.signUpForm.get('mobile');
    if (val == 'email') {
      phoneControl.clearValidators();
    }
    else {
      phoneControl.setValidators([Validators.required])
    }
    phoneControl.updateValueAndValidity();
  }

}
