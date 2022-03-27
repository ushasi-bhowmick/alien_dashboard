var data = new Vue({
	el: '#search-js-area',

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
          d2.push(parseFloat(rows[i]['d2']) -1)
          d3.push(parseFloat(rows[i]['d3'])-1)
          frm.push(parseFloat(rows[i]['#frame'])/3.1415)
          res.push(parseFloat(rows[i]['d3'])-parseFloat(rows[i]['d2']))
        }
        console.log(d2, d3, frm)

        //Define Data
        console.log('called')
    var trace2d ={
      x:frm,
      y:d2,
      mode:"lines",
      name:"2d",
      row:1,
      col:2,
      line: {color: 'green', width: 2, shape: 'spline'}
    }
    var trace3d ={
      x:frm,
      y:d3,
      mode:"lines",
      name:"3d",
      xaxis: 'x2',
      yaxis: 'y2',
      row:1,
      col:1,
      line: {color: '#445566', width: 2, shape: 'spline'}

    } 
    var traceRes = {
      x:frm,
      y:res,
      row:1,
      col:1,
      mode:"lines",
      name:"Res",
      xaxis: 'x3',
      yaxis: 'y3',
      line: {color: '#445566', width: 2, shape: 'spline'}

    } 
    var data = [trace2d, trace3d, traceRes];
    
     //Define Layout
    var layout = {
      grid:{rows:2, columns:2,pattern: 'independent', ygap:0.2},
      xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true, mirror: true, domain:[0,1]},
      yaxis: {range: [1.1*Math.min(d2),1.1*Math.max(d2)], title: "Flux", showgrid: false ,
         showline:true, mirror: true, domain:[0.55,1]}, 
      xaxis2: {range: [Math.min(frm), Math.max(frm)], title: "Phase", showgrid: false, showline:true, 
        mirror: true, domain:[0,0.43]},
      yaxis2: {range: [1.1*Math.min(d3),1.1*Math.max(d3)], title: "Flux", showgrid: false , 
        showline:true, mirror: true, domain:[0,0.45]}, 
      xaxis3: {range: [Math.min(frm), Math.max(frm)], title: "Phase", showgrid: false,
       showline:true, mirror: true, domain:[0.57,1], anchor:'x3'},
      yaxis3: {range: [1.1*Math.min(d3),1.1*Math.max(d3)], title: "Flux-Model", showgrid: false , 
          showline:true, mirror: true, domain:[0,0.45], anchor:'y3'}, 
      title: "Kepler Transit",
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