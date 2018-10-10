import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  dialogBody: string;
  dialogTitle: string;

  constructor(private dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { dialogTitle, dialogBody }
  ) {

console.log('my dialogComponent constructor');
console.log('>>> dialogBody '+dialogBody);

    this.dialogBody = dialogBody;
    this.dialogTitle = dialogTitle;


   }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogRef.close();
  }

}
