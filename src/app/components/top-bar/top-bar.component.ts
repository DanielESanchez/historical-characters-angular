import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
            },
            {
                label: 'Characters list',
                icon: 'pi pi-fw pi-user',
            },
        ];
    }

}
