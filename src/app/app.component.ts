import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../app/task-service.service'

import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  taskData:any;
  ArrayData:any=[];
  pieData:any=[];
  avgValue:Number=0;
  highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  constructor(private taskService:TaskServiceService){

  }
  ngOnInit(){
    this.getData()
  }
  getData(){
      this.taskService.getData().subscribe(res=>{
        this.taskData = res;
        this.avgValue=(this.taskData.length*100)/100
        this.ArrayData.push({"name":"Latitude>0","data":this.taskData.filter((e)=>parseInt(e.address.geo.lat)>0)})
        this.ArrayData.push({"name":"Latitude<0","data":this.taskData.filter((e)=>parseInt(e.address.geo.lat)<0)})
        this.ArrayData.push({"name":"Longitude>0","data":this.taskData.filter((e)=>parseInt(e.address.geo.lng)>0)})
        this.ArrayData.push({"name":"Longitude<0","data":this.taskData.filter((e)=>parseInt(e.address.geo.lng)<0)})
        for (var i = 0; i < this.ArrayData.length; i++){
          this.pieData.push({
            "name" : this.ArrayData[i].name,
            "y" : this.ArrayData[i]['data'].length
          })
        }
        this.preparePiechart(this.pieData);
        
      })
  }
  preparePiechart(pieData: any) {
    this.chartOptions = {
      chart: {
        // plotBackgroundColor: 'silver',
        // plotBorderWidth: 2,
        // plotShadow: true,
        type: 'pie'
      },
      colors: ['#ff0000', '#00ffff', '#ffcc66', '#bfbfbf'],
      title: {
        //text: 'Browser market shares in October, 2019'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data:pieData
        // data: [{
        //   name: 'Chrome',
        //   y: 61.41,
        //   sliced: true,
        //   selected: true
        // }, {
        //   name: 'Internet Explorer',
        //   y: 11.84
        // }, {
        //   name: 'Firefox',
        //   y: 10.85
        // }, {
        //   name: 'Edge',
        //   y: 4.67
        // }, {
        //   name: 'Safari',
        //   y: 4.18
        // }, {
        //   name: 'Sogou Explorer',
        //   y: 1.64
        // }, {
        //   name: 'Opera',
        //   y: 1.6
        // }, {
        //   name: 'QQ',
        //   y: 1.2
        // }, {
        //   name: 'Other',
        //   y: 2.61
        // }]
      }]
    }
  }
}
