import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgForOf, NgStyle],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() stars!: number;
  @Input() size: number = 1.6;
  @Output() ratingChange = new EventEmitter<number>();

  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6,
    };
  }

  getStarImage(current: number): string {
    const previousHalf = current - 0.5;
    const imageName =
      this.stars >= current
        ? 'star-full'
        : this.stars >= previousHalf
        ? 'star-half'
        : 'star-empty';
    return `/assets/stars/${imageName}.svg`;
  }

  setRating(rating: number) {
    this.stars = rating;
    this.ratingChange.emit(this.stars);
  }
}
