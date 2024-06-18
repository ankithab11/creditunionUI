import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { EmployeeServiceService } from '../services/employee-service.service';
import { first } from 'rxjs/internal/operators/first';
import { debounceTime, filter, fromEvent, map, pluck, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
//import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateMemberModalComponent } from '../create-member-modal/create-member-modal.component';
@Component({
  selector: 'app-search-member',
  standalone: true,
  imports: [CommonModule, NgbAlert],
  templateUrl: './search-member.component.html',
  styleUrl: './search-member.component.css'
})
export class SearchMemberComponent implements OnInit, AfterViewInit{
  private modalService = inject(NgbModal);
  searchText = '';
  @ViewChild('searchbar') searchbar!: ElementRef<any>;
  minLength = 2;
  employees: Account[] = [];
  constructor(private employeeService: EmployeeServiceService){}

  ngOnInit(): void {
    this.refreshData('');
  }

  refreshData(search: string) {
    return this.employeeService.getAccounts('').pipe(first()).subscribe((res)=>{
      console.log(res);
      this.employees = res;
    });
  }

  createAccount() {
    const modalRef = this.modalService.open(CreateMemberModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.refreshData('');
      }
    });
  }

  ngAfterViewInit() {
    fromEvent(this.searchbar?.nativeElement, 'input')
      .pipe(
        map( (e:any) => e.target.value),
        filter((searchTerm: string) => {
          return (
            searchTerm.trim().length >= (this.minLength ? this.minLength : 1)
          );
        }),
        debounceTime(500),
        switchMap((value) => {
          return this.employeeService.getAccounts(value);
        })
      )
      .subscribe((result: any) => {
        this.employees = result;
      });
}

}
