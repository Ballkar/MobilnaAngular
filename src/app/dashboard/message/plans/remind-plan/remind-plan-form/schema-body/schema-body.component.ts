import { HostListener } from '@angular/core';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Subject } from 'rxjs';
import { MessageSchemaBodyModel, SCHEMABODYTYPES } from '../../../models/remindPlan.model';
import { BodyAttribute } from '../../../../schemas/BodyAttribute.model';
import { MessageSchemaService } from '../../../../schemas/messageSchema.service';

@Component({
  selector: 'app-schema-body',
  templateUrl: './schema-body.component.html',
  styleUrls: ['./schema-body.component.scss']
})
export class SchemaBodyComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  SCHEMABODYTYPES = SCHEMABODYTYPES;
  @ViewChildren('triggerAddVariable') variableAddTrigger: QueryList<MatMenuTrigger>;
  @ViewChildren('triggerEditVariable') variableEditTrigger: QueryList<MatMenuTrigger>;
  @ViewChildren('valueDisplayer') valueDisplayerRefs: QueryList<ElementRef>;
  @Input() bodyCtrl: FormControl;
  textToAddCtrl: FormControl = new FormControl();

  @HostListener('keydown', ['$event'])
    onClick(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
  }
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    public schemaService: MessageSchemaService,
  ) { }

  ngOnInit() {
  }

  openVariableMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.variableAddTrigger.first.openMenu();
  }

  mapValues(values: MessageSchemaBodyModel[]) {
    const res = [];
    values.forEach((value, index) => {
      const previousValue = values[index - 1];
      if (value.type === SCHEMABODYTYPES.TEXT && previousValue && previousValue.type === SCHEMABODYTYPES.TEXT) {
        const concatedValue = previousValue.text + value.text;
        res[res.length - 1].text = concatedValue;
      } else {
        res.push(value);
      }
    });

    return res;
  }

  editTextValue(element, index: number) {
    const newValue = element.innerText.replace(/\u21B5/g, '</br>');
    const values = [...this.bodyCtrl.value];

    if (newValue) {
      values[index].text = newValue;
    } else {
      values.splice(index, 1);
    }

    this.bodyCtrl.setValue(values);
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  addNewText() {
    const values = [...this.bodyCtrl.value];
    const lastValue = values[values.length - 1];

    if (lastValue && lastValue.type === SCHEMABODYTYPES.TEXT) {

      const lastElement = this.valueDisplayerRefs.toArray()[values.length - 1];
      lastElement.nativeElement.focus();
      this.setCaretAtEndOfElement(lastElement.nativeElement);
    } else {
      const newTextValue: MessageSchemaBodyModel = { text: ' ', type: SCHEMABODYTYPES.TEXT };
      values.push(newTextValue);
      this.bodyCtrl.setValue(values);
      this.cd.detectChanges();
      const lastElement = this.valueDisplayerRefs.toArray()[values.length - 1];

      lastElement.nativeElement.focus();
      this.setCaretAtEndOfElement(lastElement.nativeElement);
    }
  }

  addNewVariable(attribute: BodyAttribute) {
    const values = [...this.bodyCtrl.value];
    const { model, variable} = attribute;
    const newValue: MessageSchemaBodyModel = { model, variable: { name: variable, model }, type: SCHEMABODYTYPES.VARIABLE };
    values.push(newValue);
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  editVariable(index: number, attribute: BodyAttribute) {
    const values = [...this.bodyCtrl.value];
    const { model, variable} = attribute;
    const newValue: MessageSchemaBodyModel = { model, variable: { name: variable, model }, type: SCHEMABODYTYPES.VARIABLE };
    values[index] = newValue;
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  removeVariable(variable: MessageSchemaBodyModel) {
    const values = [...this.bodyCtrl.value];
    const i = values.indexOf(variable);
    if (i > -1) { values.splice(i, 1); }
    this.bodyCtrl.setValue(this.mapValues(values));
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

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
