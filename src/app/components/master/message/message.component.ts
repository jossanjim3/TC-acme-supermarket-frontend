import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { InfoMenssage } from 'dist/ACME-Explorer/models/info-menssage.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends TranslatableComponent implements OnInit, OnDestroy {
  infoMessage: string;
  cssClass: string;
  subcription: Subscription;
  showMessage = true;

  constructor(private translateService: TranslateService, private messageService: MessageService) {
    super(translateService);
  }

  ngOnInit() {
    this.subcription = this.messageService.message.subscribe(
      (data: InfoMenssage) => {
        if (data) {
          this.infoMessage = data.infoMessage;
          this.cssClass = data.cssClass;
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
