import { Component, OnInit } from '@angular/core';
import { PayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends TranslatableComponent implements OnInit {

  private payPalConfig: PayPalConfig;
  constructor(private translateService: TranslateService, private route: ActivatedRoute,
    private router: Router) {
      super(translateService);
     }

  ngOnInit() {
    this.initConfig();
  }

  private initConfig(): void {

    const total = this.route.snapshot.queryParams['total'];

    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AcjT64gVGgyUUgj3K_eZuPbeVlRjG4TsUpAuH09xQPeMSh1Mmpj8aEr6P0z1zu1BEUPU-ELCrfJCDL6N',

    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: total
              }
            }
          },
          /* items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ] */
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },

    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },

    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      
      alert('comprado');
      
    },

    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },

    onError: err => {
      console.log('OnError', err);
    },

    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },

  };
  }

}
