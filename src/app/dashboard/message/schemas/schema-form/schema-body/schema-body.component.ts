import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChildren('valueDisplayer') valueDisplayerRefs: QueryList<ElementRef>;
  @Input() bodyCtrl: FormControl;
  textToAddCtrl: FormControl = new FormControl();
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // this.bodyCtrl.valueChanges.pipe(
    //   takeUntil(this.onDestroy$)
    // ).subscribe(console.log);
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

    return res;
  }

  editTextValue(element, index: number) {
    // '&nbsp;'
    const newValue = element.innerText.replace(/\u21B5/g, '</br>');
    const values = [...this.bodyCtrl.value];

    values[index]['text'] = newValue;
    this.bodyCtrl.setValue(values);
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  addNewText() {
    const values = [...this.bodyCtrl.value];
    const lastValue = values[values.length - 1];
    this.newElementTrigger.closeMenu();

    if (lastValue['text']) {
      const lastElement = this.valueDisplayerRefs.toArray()[values.length - 1];
      lastElement.nativeElement.focus();
      this.setCaretAtEndOfElement(lastElement.nativeElement);
    } else {
      const newTextValue: SchemaText = { text: '' };
      values.push(newTextValue);
      this.bodyCtrl.setValue(values);
      this.cd.detectChanges();
      const lastElement = this.valueDisplayerRefs.toArray()[values.length - 1];

      lastElement.nativeElement.focus();
      this.setCaretAtEndOfElement(lastElement.nativeElement);
    }
  }

  private setCaretAtEndOfElement( node ) {
    const sel = document.getSelection();
    node = node.firstChild;
    if (sel.rangeCount) {
      ['Start', 'End'].forEach(pos =>
        sel.getRangeAt(0)['set' + pos](node, node.length)
      );
    }
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
