import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service.ts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form!: FormGroup;

  editMode = false;
  showPasswordFields = false;
  editingPassword = false;

  showImageModal = false;
  showDeleteModal = false;

  idUser = localStorage.getItem("idUser");
  userName = localStorage.getItem("username") || "Usuário";

  constructor(
    private profileService: ProfileService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nameUser: new FormControl(localStorage.getItem("userName"), Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      changePassword: new FormControl(false),
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl('')
    });

    this.loadUserData();

    // controla exibição dos campos e movimento do card
    this.form.get("changePassword")?.valueChanges.subscribe((v: boolean) => {
      this.showPasswordFields = v;
      this.editingPassword = v;
      this.updateWrapperMargin();
    });
  }

  /* =====================================
     Avatar só aparece se NÃO estiver alterando senha
  ====================================== */
  shouldShowAvatar(): boolean {
  return !this.form.get("changePassword")?.value;
}

  /* =====================================
     Atualiza posição do card
  ====================================== */
  updateWrapperMargin() {
    const wrapper = document.querySelector('.profile-wrapper');

    if (this.editingPassword) {
      wrapper?.classList.add('editing-password');
    } else {
      wrapper?.classList.remove('editing-password');
    }
  }

  /* =====================================
     Carrega informações do usuário
  ====================================== */
  loadUserData() {
    this.profileService.getUserById(this.idUser!).subscribe({
      next: (u) => {
        this.form.patchValue({
          email: u.email,
          nameUser: u.nameUser
        });
      }
    });
  }

  /* =====================================
     Editar / Cancelar
  ====================================== */
  enableEditMode() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.showPasswordFields = false;
    this.editingPassword = false;

    this.form.patchValue({ changePassword: false });

    this.updateWrapperMargin();
    this.loadUserData();
  }

  /* =====================================
     Salvar
  ====================================== */
  salvar() {
    if (this.form.invalid) {
      this.toast.error("Preencha corretamente");
      return;
    }

    this.profileService.updateUser(this.idUser!, this.form.value).subscribe({
      next: () => {
        this.toast.success("Dados atualizados!");
        this.editMode = false;
        this.editingPassword = false;
        this.showPasswordFields = false;

        this.updateWrapperMargin();
      },
      error: () => this.toast.error("Erro ao atualizar")
    });
  }

  /* =====================================
     Modais
  ====================================== */
  openImageModal() { this.showImageModal = true; }
  closeImageModal() { this.showImageModal = false; }

  openDeleteModal() { this.showDeleteModal = true; }
  closeDeleteModal() { this.showDeleteModal = false; }

  confirmDelete() {
    this.profileService.deleteUser(this.idUser!).subscribe({
      next: () => {
        this.toast.success("Conta apagada");
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

}
