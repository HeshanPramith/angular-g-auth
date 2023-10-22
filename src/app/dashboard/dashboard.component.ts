import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
export interface PeriodicElement {
  name: string;
  email: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Heshan Pramith', email: 'test@gmail.com' },
  { name: 'Tharindu Wijesuriya', email: 'myuserem@gmail.com' },
  { name: 'Ravindra Kumarasinghe', email: 'rocketloop@gmail.com' },
  { name: 'Chaminda Nanayakkara', email: 'devops@yahoo.com' },
  { name: 'Dasun Hasaranga', email: 'test@yahoo.com' },
  { name: 'Nadeeshani Mendis', email: 'emailtest@hotmail.com' },
  { name: 'Sandeepa Viduranga', email: 'email2323@hotmail.com' },
  { name: 'Sahan Silva', email: 'email2323@gmail.com' },
  { name: 'Ajith Kumara', email: 'myemail232@gmail.com' },
  { name: 'Hashan Perera', email: 'tester23@gmail.com' },
  { name: 'Nuwan De Silva', email: 'email2323@gmail.com' },
  { name: 'Rehan Fernando', email: 'myemail232@gmail.com' },
  { name: 'Yashan Silva', email: 'tester23@gmail.com' },
  { name: 'Dilan De Silva', email: 'test@gmail.com' },
  { name: 'Vimukthi Fernando', email: 'myuserem@gmail.com' },
  { name: 'Dhanushka Perara', email: 'rocketloop@gmail.com' },
  { name: 'Shyamal De Selva', email: 'devops@yahoo.com' },
  { name: 'Kasun Perera', email: 'test@yahoo.com' },
  { name: 'Avishka De Silva', email: 'emailtest@hotmail.com' },
  { name: 'Asitha Perera', email: 'email2323@hotmail.com' },
  { name: 'Yohan Fernando', email: 'email2323@gmail.com' },
  { name: 'Vimukthi Perera', email: 'myemail232@gmail.com' },
  { name: 'Dhanushka Fernando', email: 'tester23@gmail.com' },
  { name: 'John Mack', email: 'email2323@gmail.com' },
  { name: 'Peterson Cloid', email: 'myemail232@gmail.com' },
  { name: 'Neha Fed', email: 'tester23@gmail.com' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  applicantsList: any[] = [
    { text: 'IT-Sware/DB/QA/Web/Graphics/GIS', count: 14 },
    { text: 'IT-HWare/Networks/Systems', count: 2 },
    { text: 'Accounting/Auditing/Finance', count: 24 },
    { text: 'Banking/Insurance', count: 14 },
    { text: 'Sales/Marketing/Merchandising', count: 2 },
    { text: 'HR/Training', count: 1 },
    { text: 'Corporate Management/Analysts', count: 14 },
    { text: 'Office Admin/Secretary/Receptionist', count: 2 },
    { text: 'Civil Eng/Interior Design/Architecture', count: 1 },
    { text: 'IT-Telecoms', count: 14 },
    { text: 'Customer Relations/Public Relations', count: 2 },
    { text: 'Logistics/Warehouse/Transport', count: 1 },
  ];

  vacancyViews: any[] = [
    { text: 'ERP Functional consultant -Dehiwala', count: 245 },
    { text: 'Senior Data Base Engineer - Overseas - Fiji (1)', count: 652 },
    { text: 'Senior UI Developer', count: 456 },
    { text: 'Project Coordinator - Software Development', count: 120 },
    { text: 'HR Executive - Dehiwala', count: 50 },
    { text: 'Receptionists', count: 365 },
    { text: 'Call Center Operator - Pannipitiya', count: 20 },
    { text: 'Office Coordinator', count: 70 },
    { text: 'Executive Technical Pipe Medical Gas Projects Col 3', count: 48 },
    { text: 'Automobile Denter and Tinker - LOLC Motors (5)', count: 100 },
    { text: 'Legal Officer / Assistant', count: 542 },
    { text: 'Visa & Admission Executive', count: 48 },
  ];

  categories = new FormControl(['All']);
  categoryList: string[] = [
    'All',
    'IT-Sware/DB/QA/Web/Graphics/GIS',
    'IT-HWare/Networks/Systems',
    'Accounting/Auditing/Finance',
    'Banking/Insurance',
    'Sales/Marketing/Merchandising',
    'HR/Training',
  ];

  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.RenderCHart();
  }

  RenderCHart() {
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          'ERP Functional consultant -Dehiwala',
          'Senior Data Base Engineer - Overseas - Fiji (1)',
          'Senior UI Developer',
          'Project Coordinator - Software Development',
          'HR Executive - Dehiwala',
          'Receptionists',
          'Executive Technical Pipe Medical Gas Projects Col 3',
          'Project Coordinator - Software Development',
          'Project Coordinator',
          'Visa & Admission Executive',
          'Legal Officer / Assistant',
          'Senior UI Developer',
        ],
        datasets: [
          {
            label: '# of Applicants',
            data: [44, 20, 12, 36, 14, 140, 40, 58, 42, 60, 12, 32],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
