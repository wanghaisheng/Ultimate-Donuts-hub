import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContainerComponent, NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  items = [
    {
      title: 'Address',
      rows: ['500 Al Tahrir St, Dokki, GZ 94158.'],
    },
    {
      title: 'Opening Hours',
      rows: ['Sun – Thu: 10am - 10pm', 'Fri – Sat: 10am - 11pm'],
    },
    {
      title: 'Contact',
      rows: ['Info@mysite.com', '123-456-7890'],
    },
    {
      title: 'Follow Us',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com' },
        { label: 'Facebook', href: 'https://www.facebook.com' },
        { label: 'TikTok', href: 'https://www.tiktok.com/' },
      ],
    },
  ];
}
