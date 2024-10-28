import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl):ValidationErrors | null => {
    const form = control as FormGroup;
    const password = form.get('password') as FormControl;
    const confirmPassword = form.get('confirmPassword') as FormControl;

    if(password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({mustMatch: true});
      return {mustMatch: true};
    } else{
      confirmPassword?.setErrors(null);
      return null
    }
  };

}
