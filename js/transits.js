var transit = new Vue({
	el: '#tr-js-area',

	data: {
        animpath:"images/letsgo.gif",
        sel:[1,1,0,0]
	},

	methods: {
		choose_animation(el) {
            this.sel[el]=1-this.sel[el];
            if(el==2 && this.sel[el]) $('#box2').addClass('t-par-on');
            if(el==3 && this.sel[el]) $('#box3').addClass('t-par-on');
            if(el==2 && !this.sel[el]) $('#box2').removeClass('t-par-on');
            if(el==3 && !this.sel[el]) $('#box3').removeClass('t-par-on');
            console.log(this.sel);
            this.load_animation();

        },

        load_animation() {
            if(this.sel[0] && this.sel[1] && !this.sel[2] && !this.sel[3]) {
                this.animpath="images/letsgo.gif"; 
                this.run_plot('csv/2d3d_0.2R_circ_corr.csv');
            }
            else if(this.sel[0] && this.sel[1] && this.sel[2] && !this.sel[3]) {
                this.animpath="images/letsgo.gif";
                this.run_plot('csv/2d3d_0.2R_limb_circ_corr.csv');
            }
            else if(this.sel[0] && this.sel[1] && !this.sel[2] && this.sel[3]) {
                this.animpath="images/letsgo4.gif";
                this.run_plot('csv/2d3d_0.2R_kep_corr.csv');
            }
            else if(this.sel[0] && this.sel[1] && this.sel[2] && this.sel[3]) {
                this.animpath="images/letsgo4.gif";
                this.run_plot('csv/2d3d_0.2R_limb_kep_corr.csv');
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
                frm.push(parseFloat(rows[i]['frame'])/3.1415)
                res.push(parseFloat(rows[i]['2d'])-parseFloat(rows[i]['3d']))
            }
      
              //Define Data
            console.log('called')
            var trace3d ={
                x:frm,
                y:d3,
                mode:"lines",
                line: {color: '#77dd77', width: 3, shape: 'spline'}
      
            } 
            var data = [trace3d];
          
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
                xaxis: {range: [Math.min(frm), Math.max(frm)], title:"Phase" ,showgrid: false, showline:true,
                     mirror: true},
                yaxis: {range: [1.1*Math.min(d2),1.1*Math.max(d2)], title: "Flux", showgrid: false ,
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
        window.addEventListener('keydown', (e) => {
            if (e.key == 6) {
              console.log('click');
            }
        });

		console.log('here');
        this.run_plot('csv/2d3d_0.2R_circ_corr.csv');
		
	},

	updated() {
        
	},

});