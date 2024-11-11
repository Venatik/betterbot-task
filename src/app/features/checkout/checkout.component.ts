import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Countries } from "../../types/countries.enum";
import { USStates } from "../../types/usstates.enum";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
  @ViewChild("checkoutForm")
  checkoutForm!: NgForm;

  formData = {
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    notes: "",
  };

  countries = Object.values(Countries);
  usStates = Object.values(USStates);
  stateDropdownEnabled = false;
  availableStates: string[] = [];

  onCountryChange() {
    this.formData.state = "";

    if (this.formData.country === Countries.UnitedStates) {
      this.stateDropdownEnabled = true;
      this.availableStates = Object.values(USStates);
    } else {
      this.stateDropdownEnabled = false;
      this.availableStates = [];
    }
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log("Checkout Form Submitted!");
      console.log("Form Data:", {
        Name: this.formData.name,
        Email: this.formData.email,
        Phone: this.formData.phone,
        Address: this.formData.address,
        Country: this.formData.country,
        State: this.formData.state,
        Notes: this.formData.notes,
      });
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }

  private markFormGroupTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
