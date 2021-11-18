import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ThirdPartyAccountService } from 'src/app/core/services/third-party-account/third-party-account.service';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private thirdPartyAccountService: ThirdPartyAccountService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      alias: ['', [Validators.required, Validators.minLength(6)]],
      bank: ['', [Validators.required, Validators.minLength(6)]],
      accountNumber: ['', [Validators.required, Validators.minLength(6)]],
      holder: ['', [Validators.required, Validators.minLength(6)]],
      currency: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async submit() {
    const loading = await this.loadingController.create();
    await loading.present();

    const data = this.credentials.value;
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    data['number'] = data.accountNumber;

    this.thirdPartyAccountService.createThirdPartyAccount(data).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  get alias() {
    return this.credentials.get('alias');
  }

  get bank() {
    return this.credentials.get('bank');
  }

  get accountNumber() {
    return this.credentials.get('accountNumber');
  }

  get holder() {
    return this.credentials.get('holder');
  }

  get currency() {
    return this.credentials.get('currency');
  }
}
