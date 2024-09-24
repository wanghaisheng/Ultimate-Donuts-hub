import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { HeroComponent } from "./components/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
