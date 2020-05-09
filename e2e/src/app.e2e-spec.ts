import { AppPage } from './app.po';
import { RegisterPage } from './register/register.po';
import { async } from 'rxjs/internal/scheduler/async';
import { ApplicationPage } from './applications/applications.po';
import { app } from 'firebase';

describe('workspace-project App', () => {
  let page: AppPage;
  let register: RegisterPage;
  let application: ApplicationPage;

  beforeEach(() => {
    page = new AppPage();
    register = new RegisterPage();
    application = new ApplicationPage();
  });

  it('should display Name of App in message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Acme Explorer');
  });

  it('Register should display role EXPLORER in field role', () => {
    register.navigateTo();
    expect(register.getRoleText()).toEqual('EXPLORER');
  });

  it('Register Successfull', async () => {
    register.navigateTo();
    expect(await register.fillRegister()).toContain('correctamente');
  });

  it('Apply a trip', async () => {
    application.navigateToLogin();
    application.login();
    application.navigateTo();
    expect(await application.applyTrip()).toContain('correctamente');
  });

  it('List should have at least 1 applie', async () => {
    application.navigateToListApplies();
    expect(await application.listHaveTrip()).toBeGreaterThan(1);
  });
});
