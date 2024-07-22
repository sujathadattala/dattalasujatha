import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact, ContactService } from '../../contact.service';

@Component({
  selector: 'app-cl',
  templateUrl: './cl.component.html',
  styleUrls: ['./cl.component.css']
})
export class CLComponent implements OnInit {
  contacts: Contact[] = [];
  firstname: string = '';
  lastname: string = '';
  emailId: string = '';
  isEditing = false;
  successMessage: string = ''; 
// contactForm: FormGroup;
  // newContact:any= { id: 0, name: '', email: '' };


  constructor(private contactService: ContactService,private cdr: ChangeDetectorRef
  ) { 
   
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      console.log("Response", this.contacts)
    });
  }
  loadContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }
  newContact = { id: 0, firstname: '',lastname:'', emailId: '' };
  showModal = false;

  openModal(contact?: Contact): void {
    if (contact) {
      this.newContact = { ...contact };
      console.log('Editing Contact:', this.newContact);
      this.isEditing = true;
    } else {
      this.newContact = { id: 0, firstname: '', lastname: '', emailId: '' };
      console.log('Adding New Contact:', this.newContact);
      this.isEditing = false;
    }
    this.showModal = true;
    this.cdr.detectChanges();
  }
  
  // onSubmit(): void {
  //   if (this.contactForm.valid) {
  //     const formData = this.contactForm.value;
  //     console.log('Form Data:', formData);
  //     // Handle form data (e.g., send to server)
  //   } else {
  //     console.log('Form is not valid');
  //   }
  // }
  
  saveNewContact(): void {
    if (this.isEditing) {
      this.contactService.updateContact(this.newContact).subscribe(() => {
        const index = this.contacts.findIndex(c => c.id === this.newContact.id);
        this.contacts[index] = this.newContact;
        this.showModal = false;
       this.showSuccessMessage('Contact updated successfully'); 
     
      }, error => {
        console.error('Error updating contact', error);
      });
    } else {
      this.contactService.addContact(this.newContact).subscribe((contact: Contact) => {
        this.contacts.push(contact);
        this.showModal = false;
        this.showSuccessMessage('Contact added successfully');
        
      }, error => {
        console.error('Error saving contact', error);
      });
    }
  }
  


  editContact(contact: Contact): void {
    this.newContact = { ...contact };
    this.showModal = true;
  }


  
    deleteContact(id: number): void {
      this.contactService.deleteContact(id).subscribe(() => {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.showSuccessMessage('Contact deleted successfully');
      });
  }

  closeModal() {
    this.showModal = false;
  }
  showSuccessMessage(message: string): void { // Add this method
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000); // Hide the message after 3 seconds
  }

 
}