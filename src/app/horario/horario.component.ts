import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { HorarioService } from './horario.service';
import esLocale from '@fullcalendar/core/locales/es';
import decode from 'jwt-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent implements OnInit {
  EventosAgendados: EventInput[] = [];
  dialogcrear: boolean;
  currentEvents: EventApi[] = [];
  iduser: any;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private horarioService: HorarioService
  ) {}
  docDate = 'Jun 15, 2015, 21:43:11 UTC';
  form = new FormGroup({
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date(), [Validators.required]),
    title: new FormControl('', [Validators.required]),
  });
  date1: Date;
  ngOnInit(): void {
    this.iduser = this.getdatostoken().id;
    this.horarioService.getMateriasInscritas(this.iduser).subscribe((res) => {
      this.EventosAgendados = res;
      this.calendarOptions.events = res;
    });
  }
  calendarOptions: CalendarOptions = {
    locales: [esLocale],
    locale: 'es',
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',

      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectLongPressDelay: 1,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    height: 650,
  };
  getdatostoken() {
    const token: any = localStorage.getItem('token');
    const tokendecode: any = decode(token);
    return tokendecode;
  }
  nuevo: DateSelectArg;
  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    this.form.setValue({
      start: selectInfo.start,
      end: selectInfo.end,
      title: '',
    });
    this.dialogcrear = true;
    this.nuevo = selectInfo;
  }
  guardarnuevo() {

    if (this.form.valid) {
      const calendarApi = this.nuevo.view.calendar;
      calendarApi.addEvent({
        id: createEventId(),
        title: this.form.value.title?.toString(),
        start: Date.parse(this.form.value.start!.toString()),
        end: Date.parse(this.form.value.end!.toString()),
      });
    }
    const datos = {
      userId: this.iduser,
      title : this.form.value.title,
      start : this.form.value.start,
      end : this.form.value.end
    }


    this.horarioService.nuevo(datos).subscribe(res=>{
      console.log(res);
      
    })
    this.dialogcrear = false;
  }
  evento : any
  handleEventClick(clickInfo: EventClickArg) {
    this.dialogVer = true
    console.log(clickInfo.event);
    this.evento = {
      id: clickInfo.event.id,
      start : clickInfo.event.start,
      end: clickInfo.event.end,
      title: clickInfo.event.title,
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  dialogVer :boolean

  eliminar(){
    
    this.horarioService.eliminar(this.evento.id).subscribe(res=>{
      location.reload()
    })

  }
}
