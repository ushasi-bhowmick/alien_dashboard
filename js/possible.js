

var data = new Vue({
	el: '#possible-js-area',

	data: {
    now:0,
    val:3
	},

	methods: {

    choose_plot(i) {
            if(i==0) {
              this.now=0;
              $('#box0').addClass('p-par-on');
              $('#box1').removeClass('p-par-on');
              $('#box2').removeClass('p-par-on');
              this.run_plot_rhs();
            }
      
            else if(i==1) {
              this.now=1;
              $('#box1').addClass('p-par-on');
              $('#box0').removeClass('p-par-on');
              $('#box2').removeClass('p-par-on');
              this.run_plot_mid(this.val);
            }

            else {
                this.now=2;
                $('#box2').addClass('p-par-on');
                $('#box0').removeClass('p-par-on');
                $('#box1').removeClass('p-par-on');
                this.run_plot_lhs();
              }
      
          },

	run_plot_lhs() {
        Plotly.d3.csv('csv/fprez_snrplot.csv', function (err, rows) {
        var x2 = []
        var y2 = []
        var x2std= []
        var y2std=[]
        var x3 = []
        var y3 = []
        var x3std= []
        var y3std=[]
        var x1 = []
        var y1 = []
        var x1std= []
        var y1std=[]
        for(i=0;i<rows.length;i++) {
          x3.push(parseFloat(rows[i]['0.05snr']))
          y3.push(parseFloat(rows[i]['0.05peak']))
          x3std.push(parseFloat(rows[i]['0.05snrvar']))
          y3std.push(parseFloat(rows[i]['0.05pkvar']))
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
        var trace3 ={
            x:x3,
            y:y3,
            mode:"lines+markers",
            name:"0.05R",
            line: {color: '#7cfc00', width: 2, shape: 'spline'}
         } 
    
        var data = [trace1, trace2, trace3];
    
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
        var fl3d=[]
        var frm= []
        var fl2d=[]
        var mod3d=[]
        var mod2d=[]
        var res3d=[]
        var res2d=[]
        for(i=0;i<rows.length;i++) {
            fl2d.push(parseFloat(rows[i]['flux2d']));
            mod2d.push(parseFloat(rows[i]['model2d']));
            frm.push(parseFloat(rows[i]['phase'])/3.1415);
            res2d.push(parseFloat(rows[i]['flux2d'])-parseFloat(rows[i]['model2d']));
            fl3d.push(parseFloat(rows[i]['flux']));
            mod3d.push(parseFloat(rows[i]['model']));
            res3d.push(parseFloat(rows[i]['flux'])-parseFloat(rows[i]['model']));
        }
  
          //Define Data
        //console.log(rows);
        var tracef2d ={
            x:frm,
            y:fl2d,
            mode:"lines",
            xaxis: 'x2',
            yaxis: 'y2',
            name:"flux",
            marker: {color: '#77dd77', width: 3, shape: 'spline'}
  
        } ;
        var tracem2d ={
            x:frm,
            y:mod2d,
            mode:"lines",
            xaxis: 'x2',
            yaxis: 'y2',
            name:"model",
            line: {color: '#00693e', width: 3, shape: 'spline'}
  
        };
        
        var traceres2d = {
            x:frm,
            y:res2d,
            xaxis: 'x4',
            yaxis: 'y4',
            mode:"lines",
            name:"residue",
            line: {color: '#7cfc00', width: 1, shape: 'spline'}
        };

        var tracef3d ={
            x:frm,
            y:fl3d,
            xaxis: 'x1',
            yaxis: 'y1',
            mode:"lines",
            name:"flux",
            marker: {color: '#77dd77', width: 3, shape: 'spline'}
  
        } ;
        var tracem3d ={
            x:frm,
            y:mod3d,
            xaxis: 'x1',
            yaxis: 'y1',
            mode:"lines",
            name:"model",
            line: {color: '#00693e', width: 3, shape: 'spline'}
  
        };
        
        var traceres3d = {
            x:frm,
            y:res3d,
            xaxis: 'x3',
            yaxis: 'y3',
            mode:"lines",
            name:"residue",
            line: {color: '#7cfc00', width: 1, shape: 'spline'}
        };

        var data = [ tracef3d, tracem3d, traceres3d,tracef2d, tracem2d, traceres2d];
      
       //Define Layout
        var layout = {
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            },
            grid:{rows:2, columns:2,pattern:'independent',roworder: ' top to bottom', ygap:0.2},
            xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true,
                 mirror: true},
            yaxis: {range: [1.1*Math.min(fl3d),1.1*Math.max(fl3d)], title: "Flux", showgrid: false ,
            showline:true, mirror: true}, 
            xaxis3: {range: [Math.min(frm), Math.max(frm)],title:'phase(pi)', showgrid: false, showline:true,
                 mirror: true},
            yaxis3: {range: [-0.0004,0.0004], title: "Flux-Model", showgrid: false ,
            showline:true, mirror: true}, 
            xaxis2: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true,
                 mirror: true},
            yaxis2: {range: [1.1*Math.min(fl2d),1.1*Math.max(fl2d)], showgrid: false ,
            showline:true, mirror: true}, 
            xaxis4: {range: [Math.min(frm), Math.max(frm)],title:'phase(pi)', showgrid: false, showline:true,
                 mirror: true},
            yaxis4: {range: [-0.0004,0.0004], showgrid: false ,
            showline:true, mirror: true}, 
            
            font:{family:"Open Sans", color:"#CCCCCC"},
            plot_bgcolor:"black",
            paper_bgcolor:"black"
        };
      
      // Display using Plotly
      Plotly.newPlot("myPlot", data, layout);
      });
  
    },

    run_plot_mid(vl) {
        Plotly.d3.csv('csv/fprez_noiselist.csv', function (err, rows) {
        var temp_list=['271.42','243.36','175.49','97.98','48.91','24.41','12.83','7.44','4.93','3.77']
        var fl=[]
        var frm= []
        var mod=[]
        var res=[]
        for(i=0;i<rows.length;i++) {
            mod.push(parseFloat(rows[i]['tr'+temp_list[vl]]));
            fl.push(parseFloat(rows[i]['mod'+temp_list[vl]]));
            frm.push(parseFloat(rows[i]['phase'])/3.1415);
            res.push(parseFloat(rows[i]['res'+temp_list[vl]]));
        }
  
          //Define Data
        //console.log(rows);
        var tracef ={
            x:frm,
            y:fl,
            mode:"lines",
            xaxis: 'x1',
            yaxis: 'y1',
            name:"flux",
            marker: {color: '#77dd77', width: 3, shape: 'spline'}
  
        } ;
        var tracem ={
            x:frm,
            y:mod,
            mode:"lines",
            xaxis: 'x1',
            yaxis: 'y1',
            name:"model",
            line: {color: '#00693e', width: 3, shape: 'spline'}
  
        };
        
        var traceres = {
            x:frm,
            y:res,
            xaxis: 'x2',
            yaxis: 'y2',
            mode:"lines",
            name:"residue",
            line: {color: '#7cfc00', width: 1, shape: 'spline'}
        };

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
            grid:{rows:2, columns:1,pattern:'independent',roworder: ' top to bottom', ygap:0.2},
            xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true,
                 mirror: true},
            yaxis: {range: [1.1*Math.min(fl),1.1*Math.max(fl)], title: "Flux", showgrid: false ,
            showline:true, mirror: true}, 
            xaxis2: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true,
                 mirror: true},
            yaxis2: {range: [1.1*Math.min(res),1.1*Math.max(res)], showgrid: false ,
            showline:true, mirror: true}, 
            
            font:{family:"Open Sans", color:"#CCCCCC"},
            plot_bgcolor:"black",
            paper_bgcolor:"black"
        };
         // Display using Plotly
        Plotly.newPlot("myPlot", data, layout);
        });

    },

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