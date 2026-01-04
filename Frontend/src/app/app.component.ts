import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NameService } from './services/name.service';
import { Name } from './models/name.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Name Drawer';
  names: Name[] = [];
  newName: string = '';
  drawnName: Name | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private nameService: NameService) {}

  ngOnInit(): void {
    this.loadNames();
  }

  loadNames(): void {
    this.loading = true;
    this.error = null;
    this.nameService.getAllNames().subscribe({
      next: (data: Name[]) => {
        this.names = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load names. Make sure the backend is running.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addName(): void {
    if (!this.newName.trim()) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.nameService.addName({ fullName: this.newName.trim() }).subscribe({
      next: (name: Name) => {
        this.names.push(name);
        this.newName = '';
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to add name.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  drawRandom(): void {
    if (this.names.length === 0) {
      this.error = 'No names available to draw from.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.nameService.drawRandom().subscribe({
      next: (name: Name) => {
        this.drawnName = name;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to draw a random name.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteName(id: number): void {
    if (!confirm('Are you sure you want to delete this name?')) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.nameService.deleteName(id).subscribe({
      next: () => {
        this.names = this.names.filter(n => n.id !== id);
        if (this.drawnName && this.drawnName.id === id) {
          this.drawnName = null;
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to delete name.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteAllNames(): void {
    if (!confirm('Are you sure you want to delete ALL names?')) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.nameService.deleteAllNames().subscribe({
      next: () => {
        this.names = [];
        this.drawnName = null;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to delete all names.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  clearDrawnName(): void {
    this.drawnName = null;
  }
}
