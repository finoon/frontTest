import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../../apiService/api.service';
import { UserDTO } from '../../pages/user/user.dto';
import { UserType } from '../user/user-type.dto';

// Custom validator function to check if passwords match
/*const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');
  
  if (!password || !repeatPassword) {
    return null;
  }
  
  return password.value === repeatPassword.value ? null : { passwordMismatch: true };
};*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    // Define available user types using the enum values
    userTypes: UserType[] = Object.values(UserType);

    /*selectUserType(userType: UserType) {
      console.log('Selected User Type:', userType);
      this.registrationForm.patchValue({ userType: userType });
    }*/

    selectUserType(userType: UserType) {
      console.log('Selected User Type:', userType);
      this.user.userType = userType; // Update the user type property
    }
    

  user: UserDTO = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    phoneNumber: '',
    actif: true,
    dateCreation: new Date().toISOString(), // Convert date to string
    dateDesactivation: '',
    cin: '',
    matriculeOperateurBanque: '',
    matriculeAgent: '',
    nif: '',
    userType: UserType.SOCIETE, // Set a default user type
  };

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.registrationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      repeatPassword: ['', Validators.required],
      phoneNumber: [''],
      actif: [true],
      dateCreation: [new Date().toISOString()], // Convert date to string
      dateDesactivation: [null],
      cin: [''],
      matriculeOperateurBanque: [''],
      matriculeAgent: [''],
      nif: [''],
      userType: [UserType.SOCIETE],
      }, {
      validator: this.passwordMatchValidator.bind(this) // Add the custom validator
    });
  }

  ngOnInit() {
  }

  passwordValidator(control: FormControl) {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  
    const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
  
    return valid ? null : { passwordComplexity: true };
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const passwordControl = group.get('password');
    const repeatPasswordControl = group.get('repeatPassword');
    
    if (!passwordControl || !repeatPasswordControl) {
      return null; // If the controls are missing, validation cannot be performed
    }
  
    const password = passwordControl.value;
    const repeatPassword = repeatPasswordControl.value;
  
    return password === repeatPassword ? null : { passwordMismatch: true };
  }


  registerUser(formData: any) {
    // Check if passwords match
    /*if (this.registrationForm.value.password !== this.registrationForm.value.repeatPassword) {
      console.error('le mot de passe ne correspond pas');
      // You can show an error message to the user or handle it as you prefer
      return;
    }*/

  // Check if passwords match
  if (formData.password !== formData.repeatPassword) {
    console.error('le mot de passe ne correspond pas');
    return;
  }

  const userDto: UserDTO = {
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    password: formData.password,
    phoneNumber: formData.phoneNumber,
    actif: formData.actif,
    dateCreation: formData.dateCreation,
    dateDesactivation: formData.dateDesactivation,
    cin: formData.cin,
    matriculeOperateurBanque: formData.matriculeOperateurBanque,
    matriculeAgent: formData.matriculeAgent,
    nif: formData.nif,
    userType: formData.userType,
  };

    const observable = this.apiService.createUser(userDto);

    observable.subscribe({
      next: (response) => {
        console.log('Utilisateur créé:', response);
        // Handle successful response
      },
      error: (error) => {
        console.error('Erreur de la registration:', error);
        // Handle error
      },
      complete: () => {
        // Handle completion
      }
    });
  }
}
