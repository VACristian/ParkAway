import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/authentification/auth.guard';
import { AboutComponent } from './about/about.component';
import { CreateTichetComponent } from './create-tichet/create-tichet.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PricingComponent } from './pricing/pricing.component';
import { RegisterComponent } from './register/register.component';
import { FaqComponent } from './faq/faq.component';
import { FeaturesComponent } from './features/features.component';
import { MytichetsComponent } from './mytichets/mytichets.component';
import { ManageComponent } from './manage/manage.component';



export const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'pricing',component:PricingComponent},
  {path:'create-tichet',component:CreateTichetComponent},
  {path:'about',component:AboutComponent},
  {path:'faq',component:FaqComponent},
  {path:'features',component:FeaturesComponent},
  {path:'mytichets',component:MytichetsComponent},
  {path:'manage',component:ManageComponent},
  {path:'',redirectTo:'/home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
