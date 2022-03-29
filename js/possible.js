

var data = new Vue({
	el: '#possible-js-area',

	data: {
    now:0
	},

	methods: {

	run_plot_lhs() {
        Plotly.d3.csv('csv/fprez_snrplot.csv', function (err, rows) {
        var x2 = []
        var y2 = []
        var x2std= []
        var y2std=[]
        var x1 = []
        var y1 = []
        var x1std= []
        var y1std=[]
        for(i=0;i<rows.length;i++) {
          x2.push(parseFloat(rows[i]['0.2snr']))
          y2.push(parseFloat(rows[i]['0.2peak']))
          x2std.push(parseFloat(rows[i]['0.2snrvar']))
          y2std.push(parseFloat(rows[i]['0.2pkvar']))
          x1.push(parseFloat(rows[i]['0.1snr']))
          y1.push(parseFloat(rows[i]['0.1peak']))
          x1std.push(parseFloat(rows[i]['0.1snrvar']))
          y1std.push(parseFloat(rows[i]['0.1pkvar']))
        }
      
        //Define Data
        console.log('called')
        var trace1 ={
        x:x1,
        y:y1,
        mode:"lines+markers",
        name:"0.1R",
        line: {color: '#00693e', width: 2, shape: 'spline'}
        }
        var trace2 ={
        x:x2,
        y:y2,
        mode:"lines+markers",
        name:"0.2R",
        line: {color: '#77dd77', width: 2, shape: 'spline'}

        } 
    
        var data = [trace1, trace2];
    
        //Define Layout
        var layout = {
        margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 10
        },
        grid:{rows:1, columns:1},
        xaxis: {showgrid: false, title:'SNR',showline:true, mirror: true},
        yaxis: { title: "Peak Of Residual", showgrid: false ,
            showline:true, mirror: true}, 
        font:{family:"Open Sans", color:"#CCCCCC"},
        plot_bgcolor:"black",
        paper_bgcolor:"black"
        };
    
    // Display using Plotly
    Plotly.newPlot("myPlot", data, layout);
    });

    },

    run_plot_rhs() {
        Plotly.d3.csv('csv/fprez_simp.csv', function (err, rows) {
        var fl=[]
        var frm= []
        var mod=[]
        var res=[]
        for(i=0;i<rows.length;i++) {
            fl.push(parseFloat(rows[i]['flux2d']));
            mod.push(parseFloat(rows[i]['model2d']));
            frm.push(parseFloat(rows[i]['phase'])/3.1415);
            res.push(parseFloat(rows[i]['flux2d'])-parseFloat(rows[i]['model2d']))
        }
  
          //Define Data
        //console.log(rows);
        var tracef ={
            x:frm,
            y:fl,
            mode:"lines",
            name:"flux",
            marker: {color: '#77dd77', width: 3, shape: 'spline'}
  
        } ;
        var tracem ={
            x:frm,
            y:mod,
            mode:"lines",
            name:"model",
            line: {color: '#00693e', width: 3, shape: 'spline'}
  
        }
        
        var traceres = {
            x:frm,
            y:res,
            xaxis: 'x2',
            yaxis: 'y2',
            mode:"lines",
            name:"residue",
            line: {color: '#7cfc00', width: 1, shape: 'spline'}
        }
        var data = [tracef, tracem, traceres];
      
       //Define Layout
        var layout = {
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            },
            grid:{rows:1, columns:2,pattern: 'independent',roworder: ' top to bottom', ygap:0.2},
            xaxis: {range: [Math.min(frm), Math.max(frm)],title:'phase(pi)', showgrid: false, showline:true,
                 mirror: true},
            yaxis: {range: [1.1*Math.min(fl),1.1*Math.max(fl)], title: "Flux", showgrid: false ,
            showline:true, mirror: true}, 
            xaxis2: {range: [Math.min(frm), Math.max(frm)],title:'phase(pi)', showgrid: false, showline:true,
                mirror: true},
            yaxis2: {range: [1.1*Math.min(res),1.1*Math.max(res)], title: "Flux-Model", showgrid: false ,
           showline:true, mirror: true}, 
            font:{family:"Open Sans", color:"#CCCCCC"},
            plot_bgcolor:"black",
            paper_bgcolor:"black"
        };
      
      // Display using Plotly
      Plotly.newPlot("myPlot2", data, layout);
      });
  
    },


	},

	created() {

	},

	mounted() {
		console.log('there');
        this.run_plot_lhs();
        this.run_plot_rhs();
		
		
	},

	updated() {
        
	},

});