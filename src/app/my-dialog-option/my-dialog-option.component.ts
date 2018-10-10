import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-my-dialog-option',
  templateUrl: './my-dialog-option.component.html',
  styleUrls: ['./my-dialog-option.component.css']
})
export class MyDialogOptionComponent implements OnInit {

  constructor(
    public thisDialogRef: MatDialogRef<MyDialogOptionComponent>,
    @Inject(MAT_DIALOG_DATA) { dialogTitle, dialogBody },
    public data: string
  ) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
