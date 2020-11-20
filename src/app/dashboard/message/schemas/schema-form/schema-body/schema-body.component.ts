import { Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SchemaVariable, SchemaText } from '../../../message.model';

@Component({
  selector: 'app-schema-body',
  templateUrl: './schema-body.component.html',
  styleUrls: ['./schema-body.component.scss']
})
export class SchemaBodyComponent implements OnInit, OnDestroy {

  onDestroy$: Subject<void> = new Subject();
  @ViewChild('triggerNewElement', {static: false}) newElementTrigger: MatMenuTrigger;
  @ViewChildren('triggerAddVariable') variableAddTrigger: QueryList<MatMenuTrigger>;
  @ViewChildren('triggerEditVariable') variableEditTrigger: QueryList<MatMenuTrigger>;
  @Input() bodyCtrl: FormControl;
  textToAddCtrl: FormControl = new FormControl();
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log(this.bodyCtrl.value);
    this.bodyCtrl.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(console.log);
  }

  // openEditor(value?: Array<SchemaVariable | SchemaText>) {
  //   const ref = this.dialog.open(ElementComponent, { data: value });
  //   ref.afterClosed().pipe(
  //     filter((data: Array<SchemaVariable | SchemaText>) => !!data)
  //   ).subscribe((r) => console.log(r));
  // }

  // remove(value: Array<SchemaVariable | SchemaText>) {
  //   console.log(value);
  // }

  openVariableMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.variableAddTrigger.first.openMenu();
  }


  mapValues(values: Array<SchemaVariable | SchemaText>) {
    const res = [];
    values.forEach((value, index) => {
      if (value['text'] && values[index - 1] && values[index - 1]['text']) {
        const concatedText = values[index - 1]['text'] + value['text'];
        const concatedValue = values[index - 1]['text'] = concatedText;

        res[res.length - 1]['text'] = concatedValue;
      } else {
        res.push(value);
      }
    });

    console.log(res);

    return res;
  }

  addNewText() {

  }

  addNewVariable(model: string, name: string) {
    const values = [...this.bodyCtrl.value];
    const newValue: SchemaVariable = { variable: { model, name } };
    values.push(newValue);
    this.bodyCtrl.setValue(this.mapValues(values));
    this.newElementTrigger.closeMenu();
  }

  editVariable(index: number, model: string, name: string) {
    const values = [...this.bodyCtrl.value];
    const newValue: SchemaVariable = { variable: { model, name } };
    values[index] = newValue;
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  removeVariable(variable: SchemaVariable) {
    const values = [...this.bodyCtrl.value];
    const i = values.indexOf(variable);
    if (i > -1) {
      values.splice(i, 1);
    }
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
