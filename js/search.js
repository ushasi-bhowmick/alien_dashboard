var data = new Vue({
	el: '#search-js-area',

	data: {
    lims:0.02,
    hd:"",
    rpl:"",
    rorb:"",
    u1:"",
    u2:"",
    b:"",
    now:0
    
	},

	methods: {

    choose_plot(i) {
      if(i==0) {
        this.now=0;
        $('#box0').addClass('s-par-on');
        $('#box1').removeClass('s-par-on');
        $('#box2').removeClass('s-par-on');
        this.lims=0.02;
        this.hd="Confirmed Planet";
        this.rpl=0.11;this.rorb=11.19; this.u1=0.53; this.u2=0.15; this.b=0.602;
        this.run_plot('csv/fprez_5359701.csv',0.02,0.0,[-0.001,0,0.001])
      }

      else if(i==1) {
        this.now=1;
        $('#box1').addClass('s-par-on');
        $('#box0').removeClass('s-par-on');
        $('#box2').removeClass('s-par-on');
        this.lims=0.2;
        this.hd="Possible Eclipsing Binary";
        this.rpl=0.037;this.rorb=3.5193; this.u1=0.3975; this.u2=0.2650; this.b=0;
        this.run_plot('csv/fprez_8110757.csv',0.2,0.5,[-0.002,0,0.0045])

      }

      else if(i==2) {
        this.now=2;
        $('#box2').addClass('s-par-on');
        $('#box1').removeClass('s-par-on');
        $('#box0').removeClass('s-par-on');
        this.lims=0.06;
        this.hd="Confirmed Eclipsing Binary";
        this.rpl="0.04,0.03,0.002";this.rorb="24.4,17.7,51.52"; this.u1=0.29; this.u2=0.0; this.b=0;
        this.run_plot('csv/fprez_6372268.csv',0.1,0.555,[-0.003,0,0.001])

      }
    },

		run_plot(filename, lims,linex,liney) {
      Plotly.d3.csv(filename, function (err, rows) {
        var fl = []
        var frm= []
        var mod=[]
        var res=[]
        for(i=0;i<rows.length;i++) {
          fl.push(parseFloat(rows[i]['flux']))
          mod.push(parseFloat(rows[i]['model']))
          frm.push(parseFloat(rows[i]['phase']))
          res.push(parseFloat(rows[i]['flux'])-parseFloat(rows[i]['model']))
        }

        //Define Data
        console.log(lims,fl);
        console.log([1.1*Math.min(fl),1.1*Math.max(fl)]);
    var tracefl1 ={
      x:frm,
      y:fl,
      mode:"lines",
      name:"flux",
      xaxis: 'x1',
      yaxis: 'y1',
      row:1,
      col:2,
      line: {color: '#77dd77', width: 2, shape: 'spline'}
    }
    var tracefl2 ={
      x:frm.slice(0,parseInt((frm.length/2))),
      y:fl.slice(0,parseInt((frm.length/2))),
      mode:"lines",
      name:"flux",
      xaxis: 'x2',
      yaxis: 'y2',
      row:1,
      col:2,
      line: {color: '#77dd77', width: 2, shape: 'spline'}
    }
    var traceres ={
      x:frm.slice(0,parseInt((frm.length/2))),
      y:res.slice(0,parseInt((frm.length/2))),
      mode:"lines",
      name:"res",
      xaxis: 'x3',
      yaxis: 'y3',
      row:1,
      col:1,
      line: {color: '#7cfc00', width: 2, shape: 'spline'}

    } 
    var tracem1 = {
      x:frm,
      y:mod,
      row:1,
      xaxis: 'x1',
      yaxis: 'y1',
      col:1,
      mode:"lines",
      name:"model",
      line: {color: '#00693e', width: 2, shape: 'spline'}

    } 
    var tracem2 = {
      x:frm.slice(0,parseInt((frm.length/2))),
      y:mod.slice(0,parseInt((frm.length/2))),
      row:1,
      col:1,
      xaxis: 'x2',
      yaxis: 'y2',
      mode:"lines",
      name:"model",
      line: {color: '#00693e', width: 2, shape: 'spline'}

    } 

    var trline = {
      x:[linex,linex,linex],
      y:liney,
      row:1,
      col:1,
      xaxis: 'x1',
      yaxis: 'y1',
      mode:"lines",
      name:"m",
      showlegend: false,
      line: {color: '#888888', width: 1, shape: 'spline'}
    }
    var data = [tracefl1, tracem1, traceres,trline, tracefl2, tracem2];
    
     //Define Layout
    var layout = {
      margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
      grid:{rows:2, columns:2,pattern: 'independent', ygap:0.2},
      xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true, mirror: true, domain:[0,1]},
      yaxis: {range: [1.1*Math.min(fl),1.1*Math.max(fl)], title: "Flux", showgrid: false ,
         showline:true, mirror: true, domain:[0.55,1]}, 
      xaxis2: {range: [-lims, lims], title: "Phase(pi)", showgrid: false, showline:true, 
        mirror: true, domain:[0,0.43]},
      yaxis2: {range: [1.1*Math.min(fl),1.1*Math.max(fl)], title: "Flux", showgrid: false , 
        showline:true, mirror: true, domain:[0,0.45]}, 
      xaxis3: {range: [-lims, lims], title: "Phase(pi)", showgrid: false,
       showline:true, mirror: true, domain:[0.57,1], anchor:'x3'},
      yaxis3: {range: [1.1*Math.min(res),1.1*Math.max(res)], title: "Flux-Model", showgrid: false , 
          showline:true, mirror: true, domain:[0,0.45], anchor:'y3'}, 
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
      if (e.key == 6) {
        console.log('click');
        if(this.now<2) this.choose_plot(this.now+1);
      }
      else if (e.key == 4) {
        console.log('click');
        if(this.now>0) this.choose_plot(this.now-1);
      }
    }); 
		
		
	},

	updated() {
        
	},

});