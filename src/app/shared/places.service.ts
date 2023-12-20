import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  addresses: any[] = [];
  constructor(private restApi: RestApiService) { }

  getPlace = (place: string) => {
    this.restApi.getAutoPlace(place).subscribe({
      next: (res: any) => {
        this.addresses = res.features; // Gán dữ liệu vào mảng addresses
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  };
}
