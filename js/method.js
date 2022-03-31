

var meth = new Vue({
	el: '#method-js-area',

	data: {
        x:30,
        y:40,
        ccx:300,
        ccy:250,
        pts:[],
        ldpts:[],

        // navigation
        reset:1,
        odd:0,
        dot:0,
        ldot:0,
        jt:0,


	},

        computed:{
           move_poly() {
                x = this.x;
                y=this.y;
                return((x-40).toString()+','+(y-40).toString()+' '+(x+50).toString()+
                        ','+(y-20).toString()+' '+(x+60).toString()+','+(y+40).toString()+' '+
                        (x).toString()+','+(y+80).toString()+' '+(x-50).toString()+','+(y+30).toString());
                }
        },

	methods: {
	    track_coor: function(event) {
                this.x = event.clientX;
                this.y = event.clientY;
                /*$('#movethis').css('left',x);
                $('#movethis').css('top',y);*/
             },

             choose_bar(i) {
                console.log(this.odd);
                if(i==0) {
                    this.odd=0; this.dot=0; this.jt=0;
                    $('#nav0').addClass('m-nav-el-on');
                    $('#nav1').removeClass('m-nav-el-on');
                    $('#nav2').removeClass('m-nav-el-on');
                    $('#nav3').removeClass('m-nav-el-on');
                }

                if(i==1) {
                    this.odd ++;
                    if(this.odd==3) this.odd=0;
                    if(this.odd) $('#nav1').addClass('m-nav-el-on');
                    else $('#nav1').removeClass('m-nav-el-on') ;
                    $('#nav0').removeClass('m-nav-el-on');
                }

                if(i==2) {
                    this.dot = 1-this.dot; 
                    this.ldot=0;
                    if(this.dot) { 
                        $('#nav3').removeClass('m-nav-el-on');
                        $('#nav2').addClass('m-nav-el-on') ; 
                    }
                    else $('#nav2').removeClass('m-nav-el-on') ; 
                    $('#nav0').removeClass('m-nav-el-on');
                }

                if(i==3) {
                    this.ldot = 1-this.ldot;
                    this.dot=0; 
                    if(this.ldot) {
                        $('#nav2').removeClass('m-nav-el-on') ;
                        $('#nav3').addClass('m-nav-el-on') ; 
                    }
                    else $('#nav3').removeClass('m-nav-el-on') ; 
                    $('#nav0').removeClass('m-nav-el-on');
                }

                if(i==4) {
                    this.jt = 1- this.jt;  
                    if(this.jt) $('#nav4').addClass('m-nav-el-on'); 
                    else $('#nav4').removeClass('m-nav-el-on') ;
                    $('#nav0').removeClass('m-nav-el-on'); 

                }

             }

	},

	mounted() {
        //console.log("here",ldrd[2]);
        for(i=0;i<1000;i++){
            r=Math.pow(Math.random(),0.5)*150
            ldr=Math.pow(Math.random(),0.8)*150
            th=Math.random()*2*3.1415
            this.pts.push({x:this.ccx+r*Math.cos(th),y:this.ccy+r*Math.sin(th)})
            this.ldpts.push({x:this.ccx+ldr*Math.cos(th),y:this.ccy+ldr*Math.sin(th)})
        };
        //for(i=0;i<ldrd.length;i++) {
        //    this.pts.push({x:this.ccx+parseFloat(ldrd[i])*Math.cos(parseFloat(ldth[i])),y:this.ccy+parseFloat(ldrd[i])*Math.sin(parseFloat(ldth[i]))})
        //}
        this.choose_bar(0);
        window.addEventListener('keydown', (e) => {
            if (e.key == '.') {
              console.log('click');
              this.choose_bar(2);
            }
            else if(e.key == 'o') {
                this.choose_bar(1);
            }
            else if(e.key == ',') {
                this.choose_bar(3);
            }
            else if(e.key == '/') {
                this.choose_bar(4);
            }
        });
        
	},

	updated() {

        
	},

});