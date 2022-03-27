Vue.component ( 'lhsrow', {
	template: `<div class="time-img-box">
				<img :src="img" class='time-img-edit-2' :id=nameLength @click="$emit('sel')" draggable="true"
				@dragstart="$emit('move')">
			</div>`,

	props:["lrow","img"],

	computed: {
		nameLength: function () {
            return 'i'+String(this.lrow+1); 
        }
	}
});

var data = new Vue({
	el: '#data-js-area',

	data: {
    
	},

	methods: {

    choose_plot(i) {
      if(i==0) {
        $('#box0').addClass('t-par-on');
        $('#box1').removeClass('t-par-on');
        $('#box2').removeClass('t-par-on');
        $('#box3').removeClass('t-par-on');
        this.run_plot('csv/2d3d_0.1R_circ.csv')
      }

      else if(i==1) {
        $('#box1').addClass('t-par-on');
        $('#box0').removeClass('t-par-on');
        $('#box2').removeClass('t-par-on');
        $('#box3').removeClass('t-par-on');
        this.run_plot('csv/2d3d_0.1R_kep.csv')

      }

      else if(i==2) {
        $('#box2').addClass('t-par-on');
        $('#box1').removeClass('t-par-on');
        $('#box0').removeClass('t-par-on');
        $('#box3').removeClass('t-par-on');
        this.run_plot('csv/2d3d_0.1R_limb_circ.csv')

      }

      else {
        $('#box3').addClass('t-par-on');
        $('#box1').removeClass('t-par-on');
        $('#box2').removeClass('t-par-on');
        $('#box0').removeClass('t-par-on');
        this.run_plot('csv/2d3d_0.1R_limb_kep.csv')

      }
    },

		run_plot(filename) {
      Plotly.d3.csv(filename, function (err, rows) {
        var d2 = []
        var d3 = []
        var frm= []
        var res=[]
        for(i=0;i<rows.length;i++) {
          d2.push(parseFloat(rows[i]['2d']))
          d3.push(parseFloat(rows[i]['3d']))
          frm.push(parseFloat(rows[i]['#frame']))
          res.push(parseFloat(rows[i]['2d'])-parseFloat(rows[i]['3d']))
        }
      
        //Define Data
        console.log('called')
    var trace2d ={
      x:frm,
      y:d2,
      mode:"lines",
      name:"2d",
      line: {color: 'green', width: 2, shape: 'spline'}
    }
    var trace3d ={
      x:frm,
      y:d3,
      mode:"lines",
      name:"3d",
      line: {color: '#445566', width: 2, shape: 'spline'}

    } 
    var traceRes = {
      x:frm,
      y:res,
      mode:"lines",
      name:"Res",
      xaxis: 'x2',
      yaxis: 'y2',
      line: {color: '#445566', width: 2, shape: 'spline'}

    } 
    var data = [trace2d, trace3d, traceRes];
    
     //Define Layout
    var layout = {
      grid:{rows:2, columns:1,pattern: 'independent',roworder: ' top to bottom', ygap:0.2},
      xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true, mirror: true},
      yaxis: {range: [1.1*Math.min(d2),1.1*Math.max(d2)], title: "Price in Millions", showgrid: false ,
         showline:true, mirror: true}, 
      xaxis2: {range: [Math.min(frm), Math.max(frm)], title: "Square Meters", showgrid: false, showline:true, mirror: true},
      yaxis2: {range: [1.1*Math.min(res),1.1*Math.max(res)], title: "Price in Millions", showgrid: false , 
        showline:true, mirror: true}, 
      title: "House Prices vs. Size",
      font:{family:"Open Sans", color:"#CCCCCC"},
      plot_bgcolor:"black",
      paper_bgcolor:"black"
    };
    
    // Display using Plotly
    Plotly.newPlot("myPlot", data, layout);
    });

    }


	},

	created() {

	},

	mounted() {
		console.log('there');
    this.run_plot('csv/2d3d_0.1R_circ.csv');    
		
		
	},

	updated() {
        
	},

});