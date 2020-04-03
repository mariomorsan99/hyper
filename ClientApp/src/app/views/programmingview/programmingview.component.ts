import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepWizard } from '../../models/stepwizard';
import { Search } from '../../models/productcommerce.model';

declare var $: any;
declare var toastr: any;

@Component({
    selector: 'app-programmingview',
    templateUrl: './programmingview.component.html',
    styleUrls: ['./programmingview.component.scss']
})
export class ProgrammingViewComponent implements OnInit {

    @Input() ItemInfo = Search;

    objetStep3: Search;
    public scheduleForm: FormGroup;
    Name: any;
    DateSince: any;
    DateUntil: any;
    Frequency: any;
    ItemInfo2: Search;
    Urlwizard = new StepWizard();
    startDate: any;
    endDate: any;
    frequency = ['1 hora', '2 horas', '3 horas',
        '6 horas', '12 horas', '1 día'];
    public keyboardSearch: any;
    updateStartDate: Date;
    fetchDateSince: Date;
    addDates: boolean = true;

    constructor() {
        this.scheduleForm = new FormGroup({
            'frequencyControl': new FormControl(this.frequency[0], Validators.required),
            'nameSearch': new FormControl('', Validators.required),
            'dateSince': new FormControl(new Date(), Validators.required),
            'dateUntil': new FormControl(new Date(), Validators.required),
        }
        );
        this.scheduleForm.controls['nameSearch'].valueChanges.subscribe(data => {
            console.log(data);
            this.keyboardSearch = data;
        });
    }

    ngOnInit() {
        this.SetupDatePicker();
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "progressBar": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "400",
            "hideDuration": "500",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    SetObjectStep3(name: any, dateSince: any, dateUntil: any, frequency: any) {
        this.Name = name;
        this.DateSince = dateSince;
        this.DateUntil = dateUntil;
        this.Frequency = frequency;
    }

    SetupDatePicker() {
        $('.input-daterange').datepicker({
            language: "es",
            format: "d M yyyy",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            todayHighlight: true,
            startDate: new Date()
        });
    }

    GetRangedDates() {
        var startdate = $('#startdate').datepicker("getUTCDate");
        var enddate = $('#enddate').datepicker("getUTCDate");
        try {
            this.startDate = startdate.toISOString();
            this.endDate = enddate.toISOString();
            this.updateStartDate = new Date(startdate);
        } catch (error) {
            console.log(error);
            toastr.error('Debe seleccionar un rango de fechas', '');
            this.addDates = false;
        }
    }

    RecoverSchedule(name: any, schedule: any) {
        this.scheduleForm.patchValue({
            nameSearch: name,
            item: schedule.concurrentSchedule,
        });

        this.scheduleForm.controls['nameSearch'].disable();

        var dateSince = new Date(schedule.dateSince).toLocaleDateString();
        var dateUntil = new Date(schedule.dateUntil).toLocaleDateString();

        this.fetchDateSince = new Date(schedule.dateSince);

        $('#startdate').datepicker("setStartDate", dateSince);
        $('#startdate').datepicker("update", dateSince);
        $('#enddate').datepicker("update", dateUntil);
    }
}
