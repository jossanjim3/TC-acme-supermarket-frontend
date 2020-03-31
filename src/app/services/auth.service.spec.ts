import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActorService } from './actor.service';
import { AngularFireModule } from 'angularfire2';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AngularFireModule.initializeApp({
        apiKey: 'AIzaSyBLQG_gHOvvts7C3g_bpuV91TU-GYZHKLA',
        authDomain: 'acme-viaje-el-corte-andaluh.firebaseapp.com',
        databaseURL: 'https://acme-viaje-el-corte-andaluh.firebaseio.com',
        projectId: 'acme-viaje-el-corte-andaluh',
        storageBucket: 'acme-viaje-el-corte-andaluh.appspot.com',
        messagingSenderId: '785752393006',
        appId: '1:785752393006:web:b3ba408388312107d6e6bf',
        measurementId: 'G-ZKX46KJLB8'
      }),
    ],
    providers: [
      AngularFireAuth, ActorService, HttpClient, HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
