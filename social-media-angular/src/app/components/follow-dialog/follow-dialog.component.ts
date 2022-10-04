import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FollowDialog } from 'src/app/interfaces/follow-dialog';

@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.css']
})
export class FollowDialogComponent implements OnInit {

  constructor(public dialogDisplay: MatDialogRef<FollowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : FollowDialog, private router: Router ) { }

  ngOnInit(): void {
  }

  onNoClick(): void
  {
    this.dialogDisplay.close();
  }

  // this is where our click buttons and routing 
  
  display(userId: number): void
  {
    console.log("DISPLAY UserID: ", userId)
    this.onNoClick();

    this.router.navigate(['/profile/', userId], { replaceUrl: true });
    
  }
}
