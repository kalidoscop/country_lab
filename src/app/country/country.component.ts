import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../_services/country.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  countries: any[] = [];
  searchTerm: string = '';
  totalImages: number = 2;
  loadedImages: number = 0;
  allImagesLoaded: boolean = false;
  loading: boolean = false;
  private countryService = inject(CountryService);

  ngOnInit() {
    this.countryService.getAfricanCountries().subscribe((data) => {
      this.countries = data.sort((a, b) =>
        a.translations.fra.common.localeCompare(b.translations.fra.common)
      );
    });
  }

  onImageLoad() {
    this.loadedImages++;
    console.log(this.loadedImages);
    if (!this.selectedCountry.coatOfArms.png) {
      if (this.loadedImages === 1) {
        this.allImagesLoaded = true;
        this.loading = false;
        this.searchTerm = this.selectedCountry.translations.fra.common;
      }
    } else {
      if (this.loadedImages === this.totalImages) {
        this.allImagesLoaded = true;
        this.loading = false;
        this.searchTerm = this.selectedCountry.translations.fra.common;
      }
    }
  }
  filteredCountries() {
    return this.countries.filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }
  selectedCountry: any;

  async selectCountry(country: any) {
    if (this.selectedCountry !== country) {
      this.loadedImages = 0;
      this.allImagesLoaded = false;
      this.loading = true;
      console.log('Selected Country:', country);
      setTimeout(() => {
        this.selectedCountry = country;
      }, 1000);
    }
   
    
  }
  clean() {
    this.searchTerm = '';
  }
}
