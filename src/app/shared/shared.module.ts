import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxSkeletonLoaderModule.forRoot()],
  exports: [CommonModule, NgxSkeletonLoaderModule],
})
export class SharedModule {}
