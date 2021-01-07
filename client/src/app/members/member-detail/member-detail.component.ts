import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member:Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private membersServices:MembersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [{
      height : '500px',
      width : '500px',
      imagePercent : 100,
      thumbnailsColumns : 4,
      imageAnimation : NgxGalleryAnimation.Slide,
      preview : false
    }];
  }

  getImages() : NgxGalleryImage[] {
    const imageUrls = [];
    if(this.member.photos.length == 0)
    {
      var url = '/assets/user.png';
      imageUrls.push({small : url, medium : url, large : url });
    }
    else {
      for (const photo of this.member.photos) {
        imageUrls.push({small : photo?.url, medium : photo?.url, large : photo?.url });
      }
    }
    
    return imageUrls;
  }

  loadMember()
  {
    this.membersServices.getMember(this.route.snapshot.paramMap.get('username'))
    .subscribe(member => { this.member = member; this.galleryImages = this.getImages(); } )
  }

}
