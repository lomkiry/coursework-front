import { Component, ElementRef, Input, ViewChild, inject, AfterViewInit } from '@angular/core';
import { CardShellComponent } from "../../../shared/card-shell/card-shell";
import { TransactionService } from '../../../core/transaction/transaction.service';
import { CategoryService } from '../../../core/category/category.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-diagram',
  standalone: true,
  imports: [CardShellComponent],
  templateUrl: './dashboard-diagram.html',
  styleUrl: './dashboard-diagram.scss',
})
export class DashboardDiagram implements AfterViewInit {
  @Input() type: 'income' | 'expense' = 'expense';
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  
  private transactionService = inject(TransactionService);
  private categoryService = inject(CategoryService);
  private chart: Chart | null = null;

  ngAfterViewInit() {
    // Ждем 100мс, чтобы верстка точно "встала"
    setTimeout(() => this.initChart(), 100);
  }

  private initChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Нет данных'],
        datasets: [{
          data: [1],
          backgroundColor: ['#eeeeee']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Подписываемся на данные
    this.transactionService.transactions$.subscribe(data => {
      this.updateChart(data);
    });
  }

  private updateChart(transactions: any[]) {
    if (!this.chart) return;

    const filtered = transactions.filter(t => t.type === this.type);
    if (filtered.length === 0) return;

    const stats = new Map<string, { sum: number, color: string }>();
    filtered.forEach(t => {
      const cat = this.categoryService.getCategoryById(t.categoryId);
      const name = cat?.name || 'Другое';
      const current = stats.get(name) || { sum: 0, color: cat?.color || '#ccc' };
      stats.set(name, { sum: current.sum + t.amount, color: current.color });
    });

    this.chart.data.labels = Array.from(stats.keys());
    this.chart.data.datasets[0].data = Array.from(stats.values()).map(v => v.sum);
    this.chart.data.datasets[0].backgroundColor = Array.from(stats.values()).map(v => v.color);
    this.chart.update();
  }
}