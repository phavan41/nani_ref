import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  forwardRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  DoCheck,
  KeyValueDiffer,
  KeyValueDiffers,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import { AppDaterangepickerComponent } from './app-daterangepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocaleConfig, DefaultLocaleConfig } from './app-daterangepicker.config';

//import * as _moment from '../../../assets/js/moment.js';
//const moment = _moment;

import * as moment from 'moment-timezone';

@Directive({
  selector: 'input[appDaterangepickerMd]',
  host: {
    '(keyup.esc)': 'hide()',
    '(blur)': 'onBlur()',
    '(click)': 'open()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDaterangepickerDirective), multi: true
    }
]
})
export class AppDaterangepickerDirective implements OnInit, OnChanges, DoCheck {
  public picker: AppDaterangepickerComponent;
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  private _validatorChange = Function.prototype;
  private _value: any;
  private localeDiffer: KeyValueDiffer<string, any>;
  @Input()
  minDate: moment.Moment
  @Input()
  maxDate: moment.Moment
  @Input()
  autoApply: boolean;
  @Input()
  alwaysShowCalendars: boolean;
  @Input()
  showCustomRangeLabel: boolean;
  @Input()
  linkedCalendars: boolean;
  @Input()
  singleDatePicker: boolean;
  @Input()
  showWeekNumbers: boolean;
  @Input()
  showISOWeekNumbers: boolean;
  @Input()
  showDropdowns: boolean;
  @Input()
  isInvalidDate: Function;
  @Input()
  isCustomDate: Function;
  @Input()
  showClearButton: boolean;
  @Input()
  ranges: any;
  @Input()
  opens: string;
  @Input()
  drops: string;
  firstMonthDayClass: string;
  @Input()
  lastMonthDayClass: string;
  @Input()
  emptyWeekRowClass: string;
  @Input()
  firstDayOfNextMonthClass: string;
  @Input()
  lastDayOfPreviousMonthClass: string;
  @Input()
  keepCalendarOpeningWithRange: boolean;
  @Input()
  showRangeLabelOnInput: boolean;
  @Input()
  showCancel: boolean = false;
  @Input()
  timeZone: string = '';
  // timepicker variables
  @Input()
  timePicker: Boolean = false;
  @Input()
  timePicker24Hour: Boolean = false;
  @Input()
  timePickerIncrement: number = 1;
  @Input()
  timePickerSeconds: Boolean = false;
  _locale: LocaleConfig = {};
  @Input() set locale(value) {
    this._locale = {...value, ...this.localeConfig};
  }
  get locale(): any {
    return this._locale;
  }
  @Input()
  private _endKey: string = 'endDt';
  private _startKey: string = 'startDt';
  private _rangeKey: string = 'dateRangeLabel';
  @Input() set startKey(value) {
    if (value !== null) {
      this._startKey = value;
    } else {
      this._startKey = 'startDt';
    }
  };
  @Input() set endKey(value) {
    if (value !== null) {
      this._endKey = value;
    } else {
      this._endKey = 'endDt';
    }
  };
  @Input() set rangeKey(value) {
    if (value !== null) {
      this._rangeKey = value;
    } else {
      this._rangeKey = 'dateRangeLabel';
    }
  };
  
  @Input()
  private _endKeyString: string = 'endDate';
  private _startKeyString: string = 'startDate';
  @Input() set startKeyString(value) {
    if (value !== null) {
      this._startKeyString = value;
    } else {
      this._startKeyString = 'startDate';
    }
  };
  @Input() set endKeyString(value) {
    if (value !== null) {
      this._endKeyString = value;
    } else {
      this._endKeyString = 'endDate';
    }
  };
  
  notForChangesProperty: Array<string> = [
    'locale',
    'endKey',
    'startKey',
    'endKeyString',
    'startKeyString'
  ];

  get value() {
    return this._value || null;
  }
  set value(val) {
    this._value = val;
    this._onChange(val);
    this._changeDetectorRef.markForCheck();
  }
  @Output('change') onChange: EventEmitter<Object> = new EventEmitter();
  @Output('rangeClicked') rangeClicked: EventEmitter<Object> = new EventEmitter();
  @Output('datesUpdated') datesUpdated: EventEmitter<Object> = new EventEmitter();

  constructor(
    public viewContainerRef: ViewContainerRef,
    public _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _el: ElementRef,
    private _renderer: Renderer2,
    private differs: KeyValueDiffers,
    private localeConfig: LocaleConfig
  ) {
    this.drops = 'down';
    this.opens = 'right';
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(AppDaterangepickerComponent);
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.picker = (<AppDaterangepickerComponent>componentRef.instance);
    this.picker.inline = false; // set inline to false for all directive usage
  }
  ngOnInit() {
    this.picker.rangeClicked.asObservable().subscribe((range: any) => {
      this.rangeClicked.emit(range);
    });
    this.picker.datesUpdated.asObservable().subscribe((range: any) => {
      this.datesUpdated.emit(range);
    });
    this.picker.choosedDate.asObservable().subscribe((change: any) => {
      if (change) {
        const value = {};
		value[this._rangeKey] = change.chosenLabel;
        value[this._startKey] = change.startDate;
        value[this._endKey] = change.endDate;
		if (change.startDate != null){
			if (this.locale.format){
				value[this._startKeyString] = change.startDate.format(this.locale.format);
			} else {
				value[this._startKeyString] = change.startDate.format('MM/DD/YYYY');
			}
		} else {
			value[this._startKeyString] = "";
		}
		
		if (change.endDate != null){
			if (this.locale.format){
				value[this._endKeyString] = change.endDate.format(this.locale.format);
			} else {
				value[this._endKeyString] = change.endDate.format('MM/DD/YYYY');
			}
        } else {
			value[this._endKeyString] = "";
		}
		this.value = value;
        this.onChange.emit(value);
        if(typeof change.chosenLabel === 'string') {
          this._el.nativeElement.value = change.chosenLabel;
        }
      }
    });
    this.picker.firstMonthDayClass = this.firstMonthDayClass;
    this.picker.lastMonthDayClass = this.lastMonthDayClass;
    this.picker.emptyWeekRowClass = this.emptyWeekRowClass;
    this.picker.firstDayOfNextMonthClass = this.firstDayOfNextMonthClass;
    this.picker.lastDayOfPreviousMonthClass = this.lastDayOfPreviousMonthClass;
    this.picker.drops = this.drops;
    this.picker.opens = this.opens;
    this.localeDiffer = this.differs.find(this.locale).create();
	this.picker.timeZone = this.timeZone;
  }

  ngOnChanges(changes: SimpleChanges): void  {
    for (let change in changes) {
      if (changes.hasOwnProperty(change)) {
        if (this.notForChangesProperty.indexOf(change) === -1) {
          this.picker[change] = changes[change].currentValue;
		  if (change === "ranges"){
			  this.picker.renderRanges();
		  } else if (change === "timeZone"){
			  this.picker.updateCalendars();
		  }
        }
      }
    }
  }

  ngDoCheck() {
    if (this.localeDiffer) {
      const changes = this.localeDiffer.diff(this.locale);
      if (changes) {
        this.picker.updateLocale(this.locale);
      }
    }
  }

  onBlur() {
    this._onTouched();
  }

  open(event?: any) {
    this.picker.show(event);
    setTimeout(() => {
      this.setPosition();
    })
  }

  hide(e?) {
    this.picker.hide(e);
  }
  toggle(e?) {
    if (this.picker.isShown) {
      this.hide(e);
    } else {
      this.open(e);
    }
  }

  clear() {
    this.picker.clear();
  }

  writeValue(value) {
	  if (value!=null){
		this.value = value;
		this.setValue(value);
	  }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  private setValue(val: any) {
    if (val) {
      if (val[this._startKey]) {
        this.picker.setStartDate(val[this._startKey])
      }
      if (val[this._endKey]) {
        this.picker.setEndDate(val[this._endKey])
      }
      this.picker.calculateChosenLabel();
      if (this.picker.chosenLabel) {
        this._el.nativeElement.value = this.picker.chosenLabel;
      }
    } else {
      this.picker.clear();
    }
  }
    /**
     * Set position of the calendar
     */
    setPosition() {
      let style;
      let containerTop;
      const container = this.picker.pickerContainer.nativeElement;
      const element = this._el.nativeElement;
      if (this.drops && this.drops == 'up') {
        containerTop = (element.offsetTop - container.clientHeight) + 'px';
      } else {
        containerTop = '47px';
      }
      if (this.opens == 'left') {
        style = {
            top: containerTop,
            left: (element.offsetLeft - container.clientWidth + element.clientWidth) + 'px',
            right: 'auto'
        };
      } else if (this.opens == 'center') {
          style = {
            top: containerTop,
            left: (element.offsetLeft  +  element.clientWidth / 2
                    - container.clientWidth / 2) + 'px',
            right: 'auto'
          };
      } else {
          style = {
            top: containerTop,
            left: element.offsetLeft  + 'px',
            right: 'auto'
          }
      }
      if (style) {
        this._renderer.setStyle(container, 'top', style.top);
        this._renderer.setStyle(container, 'left', style.left);
        this._renderer.setStyle(container, 'right', style.right);
      }

  }
  /**
   * For click outside of the calendar's container
   * @param event event object
   * @param targetElement target element object
   */
  @HostListener('document:click', ['$event', '$event.target'])
  outsideClick(event, targetElement: HTMLElement): void {
      if (!targetElement) {
        return;
      }
      if (targetElement.classList.contains('ngx-daterangepicker-action')) {
        return;
      }
      const clickedInside = this._el.nativeElement.contains(targetElement) || targetElement.id == "calndar-icon" || targetElement.id == "calndar-icon-span";
      if (!clickedInside) {
         this.hide()
      }
  }
}
