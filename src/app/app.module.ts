import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from '../modules/auth/guards/auth.guard';
import { AuthService } from '@modules/app-common/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
    providers: [AuthGuard, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
