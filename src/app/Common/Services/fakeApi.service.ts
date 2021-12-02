import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { PeriodicElement } from '../Models/PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private listOfElements : PeriodicElement[] = [];

  obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  array$: Observable<any> =  this.obsArray.asObservable();
  
  constructor(private http: HttpClient) {}

  public getElements(){
    let obs1 = this.http.get<PeriodicElement[]>("../../../assets/elements.json");
    let obs2 = this.array$;
    return zip(obs1, obs2)
    .pipe(map(x => x[0].concat(x[1])));
    // return this.array$;
  }


  public addElement(elementToAdd: PeriodicElement) {
    this.array$.pipe(take(1)).subscribe(val => {
      const newArr = [...val, elementToAdd];
      this.obsArray.next(newArr);
    })
  }
}
