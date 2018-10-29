import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-my-dialog-option',
  templateUrl: './my-dialog-option.component.html',
  styleUrls: ['./my-dialog-option.component.css']
})
export class MyDialogOptionComponent implements OnInit {

  dialogBody: string;
  dialogTitle: string;
  dialogParam: string;

  constructor(
    public thisDialogRef: MatDialogRef<MyDialogOptionComponent>,
    @Inject(MAT_DIALOG_DATA) { dialogTitle, dialogBody, dialogParam }
  ) {
    this.dialogTitle = dialogTitle;
    this.dialogBody = dialogBody;
    this.dialogParam = dialogParam;
  }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close(true);
  }

  onCloseCancel() {
    console.log('my-dialog-option cancel');

    this.thisDialogRef.close('Cancel');
  }
}
