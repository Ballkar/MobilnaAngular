import { HostListener } from '@angular/core';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { PlanBodyModelElement, PLANBODYTYPES } from '../../models/remindPlan.model';
import { BodyVariable } from './BodyVariable.model';

@Component({
  selector: 'app-schema-body',
  templateUrl: './schema-body.component.html',
  styleUrls: ['./schema-body.component.scss']
})
export class SchemaBodyComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  SCHEMABODYTYPES = PLANBODYTYPES;
  @ViewChildren('triggerAddVariable') variableAddTrigger: QueryList<MatMenuTrigger>;
  @ViewChildren('triggerEditVariable') variableEditTrigger: QueryList<MatMenuTrigger>;
  @ViewChildren('valueDisplayer') valueDisplayerRefs: QueryList<ElementRef>;
  @Input() bodyCtrl: FormControl;
  textToAddCtrl: FormControl = new FormControl();
  bodyVariablesAvailable: BodyVariable[] = [
    new BodyVariable('customer', 'name'),
    new BodyVariable('customer', 'surname'),
    new BodyVariable('user', 'name'),
    new BodyVariable('work', 'start_hour'),
    new BodyVariable('work', 'start_date'),
  ];

  @HostListener('keydown', ['$event'])
    onClick(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
  }
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  openVariableMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.variableAddTrigger.first.openMenu();
  }

  mapValues(values: PlanBodyModelElement[]) {
    const res = [];
    values.forEach((value, index) => {
      const previousValue = values[index - 1];
      if (value.type === PLANBODYTYPES.TEXT && previousValue && previousValue.type === PLANBODYTYPES.TEXT) {
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

    if (lastValue && lastValue.type === PLANBODYTYPES.TEXT) {

      const lastElement = this.valueDisplayerRefs.toArray()[values.length - 1];
      lastElement.nativeElement.focus();
      this.setCaretAtEndOfElement(lastElement.nativeElement);
    } else {
      const newTextValue: PlanBodyModelElement = { text: ' ', type: PLANBODYTYPES.TEXT };
      values.push(newTextValue);
      this.bodyCtrl.setValue(values);
      this.cd.detectChanges();
      const lastElement = this.valueDisplayerRefs.toArray()[values.length - 1];

      lastElement.nativeElement.focus();
      this.setCaretAtEndOfElement(lastElement.nativeElement);
    }
  }

  addNewVariable(attribute: BodyVariable) {
    const values = [...this.bodyCtrl.value];
    const { model, name } = attribute;
    const newValue: PlanBodyModelElement = { variable: { name, model }, type: PLANBODYTYPES.VARIABLE };
    values.push(newValue);
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  editVariable(index: number, attribute: BodyVariable) {
    const values = [...this.bodyCtrl.value];
    const { model, name } = attribute;
    const newValue: PlanBodyModelElement = { variable: { name, model }, type: PLANBODYTYPES.VARIABLE };
    values[index] = newValue;
    this.bodyCtrl.setValue(this.mapValues(values));
  }

  removeVariable(variable: PlanBodyModelElement) {
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
