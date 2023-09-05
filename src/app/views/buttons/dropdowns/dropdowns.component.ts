import { Component } from '@angular/core';
import { UserType } from '../../pages/user/user-type.dto';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserDTO } from '../../pages/user/user.dto';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
})
export class DropdownsComponent  {


      // Define available user types using the enum values
      userTypes: UserType[] = Object.values(UserType);

      selectUserType(userType: UserType) {
        this.registrationForm.patchValue({ userType: userType });
      }

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      userType: [UserType.SOCIETE],
      });
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

}

