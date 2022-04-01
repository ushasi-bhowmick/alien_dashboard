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
    now:0
	},

	methods: {

    choose_plot(i) {
      if(i==0) {
        this.now=0;
        $('#box0').addClass('d-par-on');
        $('#box1').removeClass('d-par-on');
        $('#box2').removeClass('d-par-on');
        $('#box3').removeClass('d-par-on');
        this.run_plot('csv/2d3d_0.1R_circ.csv')
      }

      else if(i==1) {
        this.now=1;
        $('#box1').addClass('d-par-on');
        $('#box0').removeClass('d-par-on');
        $('#box2').removeClass('d-par-on');
        $('#box3').removeClass('d-par-on');
        this.run_plot('csv/2d3d_0.1R_kep.csv')

      }

      else if(i==2) {
        this.now=2;
        $('#box2').addClass('d-par-on');
        $('#box1').removeClass('d-par-on');
        $('#box0').removeClass('d-par-on');
        $('#box3').removeClass('d-par-on');
        this.run_plot('csv/2d3d_0.1R_limb_circ.csv')

      }

      else {
        this.now=3;
        $('#box3').addClass('d-par-on');
        $('#box1').removeClass('d-par-on');
        $('#box2').removeClass('d-par-on');
        $('#box0').removeClass('d-par-on');
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
          frm.push(parseFloat(rows[i]['#frame'])/3.1415)
          res.push(parseFloat(rows[i]['2d'])-parseFloat(rows[i]['3d']))
        }
      
        //Define Data
        console.log('called')
    var trace2d ={
      x:frm,
      y:d2,
      mode:"lines",
      name:"2d",
      line: {color: '#00693e', width: 2, shape: 'spline'}
    }
    var trace3d ={
      x:frm,
      y:d3,
      mode:"lines",
      name:"3d",
      line: {color: '#77dd77', width: 2, shape: 'spline'}

    } 
    var traceRes = {
      x:frm,
      y:res,
      mode:"lines",
      name:"Res",
      xaxis: 'x2',
      yaxis: 'y2',
      line: {color: '#7cfc00', width: 2, shape: 'spline'}

    } 
    var data = [trace2d, trace3d, traceRes];
    
     //Define Layout
    var layout = {
      grid:{rows:2, columns:1,pattern: 'independent',roworder: ' top to bottom', ygap:0.2},
      xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true, mirror: true},
      yaxis: {range: [1.1*Math.min(d2),1.1*Math.max(d2)], title: "Flux", showgrid: false ,
         showline:true, mirror: true}, 
      xaxis2: {range: [Math.min(frm), Math.max(frm)], title: "Phase(pi)", showgrid: false, showline:true, mirror: true},
      yaxis2: {range: [1.1*Math.min(res),1.1*Math.max(res)], title: "2D-3D", showgrid: false , 
        showline:true, mirror: true}, 
      title: "Transit of 2D vs 3D objects",
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
    this.choose_plot(0);  
    window.addEventListener('keydown', (e) => {
      if (e.key == 2) {
        console.log('click');
        if(this.now<3) this.choose_plot(this.now+1);
      }
      else if (e.key == 8) {
        console.log('click');
        if(this.now>0) this.choose_plot(this.now-1);
      }
    });  
		
		
	},

	updated() {
        
	},

});