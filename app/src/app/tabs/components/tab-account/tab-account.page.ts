import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account/account.service';
import { ThirdPartyAccountService } from 'src/app/core/services/third-party-account/third-party-account.service';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-tab-account',
  templateUrl: 'tab-account.page.html',
  styleUrls: ['tab-account.page.scss'],
})
export class TabAccountPage {
  accounts: any = [];
  thirdPartyAccounts: any = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private thirdPartyAccountService: ThirdPartyAccountService
  ) {
    this.accountService.getAccounts().subscribe((res: Response) => {
      if (res.success) {
        this.accounts = res.data.accounts;
      }
    });
    this.thirdPartyAccountService
      .getThirdPartyAccounts()
      .subscribe((res: Response) => {
        if (res.success) {
          this.thirdPartyAccounts = res.data.accounts;
        }
      });
  }

  createOwnAccount() {
    this.accountService.createAccount().subscribe((response: Response) => {
      if (response.success) {
        this.accounts.push(response.data.account);
      }
    });
  }

  createThirdPartyAccount() {
    this.router.navigateByUrl('/tabs/tab1/new', { replaceUrl: true });
  }
}
