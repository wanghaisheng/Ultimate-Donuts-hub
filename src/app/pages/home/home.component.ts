import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
