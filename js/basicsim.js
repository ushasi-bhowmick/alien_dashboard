var sims = new Vue({
	el: '#basicsim-js-area',

	data: {
    animpath:"images/temp.gif",
    now:0,
	},

	methods: {
        choose_plot(i) {
            if(i==0) {
              this.animpath="images/temp1.gif";
              this.now=0;
              $('#box0').addClass('b-par-on');
              $('#box1').removeClass('b-par-on');
              $('#box2').removeClass('b-par-on');
              this.run_plot(0)
            }
      
            else if(i==1) {
              this.animpath="images/temp.gif";
              this.now=1;
              $('#box1').addClass('b-par-on');
              $('#box0').removeClass('b-par-on');
              $('#box2').removeClass('b-par-on');
              this.run_plot_2()
      
            }
      
            else {
              this.animpath="images/temp2.gif";
              this.now=2;
              $('#box2').addClass('b-par-on');
              $('#box1').removeClass('b-par-on');
              $('#box0').removeClass('b-par-on');
              this.run_plot(1)
      
            }
        },

        run_plot(whch) {
            Plotly.d3.csv('csv/fprez_simp.csv', function (err, rows) {
            var fl=[]
            var frm= []
            var mod=[]
            for(i=0;i<rows.length;i++) {
                if(whch==0) fl.push(parseFloat(rows[i]['flux']));
                else fl.push(parseFloat(rows[i]['flux2d']));
                mod.push(parseFloat(rows[i]['model']));
                frm.push(parseFloat(rows[i]['phase'])/3.1415);
            }
      
              //Define Data
            //console.log(rows);
            var tracef ={
                x:frm,
                y:fl,
                mode:"markers",
                name:"f",
                
                marker: {color: '#77dd77', size:5, width: 1}
      
            } ;
            var tracem ={
                x:frm,
                y:mod,
                mode:"lines",
                name:"m",
                line: {color: '#00693e', width: 3, shape: 'spline'}
      
            } 
            var data = [tracef, tracem];
          
           //Define Layout
            var layout = {
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50,
                    pad: 4
                },
                grid:{rows:1, columns:1,pattern: 'independent',roworder: ' top to bottom', ygap:0.2},
                xaxis: {range: [Math.min(frm), Math.max(frm)],title: "phase(pi)",  showgrid: false, showline:true,
                     mirror: true},
                yaxis: {range: [1.1*Math.min(fl),1.1*Math.max(fl)], title: "Flux", showgrid: false ,
                showline:true, mirror: true}, 
                font:{family:"Open Sans", color:"#CCCCCC"},
                plot_bgcolor:"black",
                paper_bgcolor:"black"
            };
          
          // Display using Plotly
          Plotly.newPlot("myPlot", data, layout);
          });
      
        },

        run_plot_2() {
            Plotly.d3.csv('csv/fprez_multi.csv', function (err, rows) {
            var fl=[]
            var frm= []
            var mod=[]
            for(i=0;i<rows.length;i++) {
                fl.push(parseFloat(rows[i]['flux']));
                frm.push(parseFloat(rows[i]['phase']));
            }
      
              //Define Data
            console.log('called')
            var tracef ={
                x:frm,
                y:fl,
                mode:"lines",
                name:"f",
                line: {color: '#77dd77', width: 2, shape: 'spline'}
      
            } ;
            var data = [tracef];
          
           //Define Layout
            var layout = {
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50,
                    pad: 4
                },
                grid:{rows:1, columns:1,pattern: 'independent',roworder: ' top to bottom', ygap:0.2},
                xaxis: {range: [Math.min(frm), Math.max(frm)], showgrid: false, showline:true,
                     mirror: true},
                yaxis: {range: [1.1*Math.min(fl),1.1*Math.max(fl)], title: "Price in Millions", showgrid: false ,
                showline:true, mirror: true}, 
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
    console.log('here');
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