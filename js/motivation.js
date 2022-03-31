

var data = new Vue({
	el: '#motivation-js-area',

	data: {
        now:0
	},

	methods: {
        move_tabs(go) {
            if(go==0) {
                this.now=0;
                $('#box0').addClass('mot-par-on');
                $('#box1').removeClass('mot-par-on');
                $('#box2').removeClass('mot-par-on');
                $(".mot-wrap").css('background-image', "url('images/meg2.jpg')");
            }

            else if(go==1) {
                this.now=1;
                $('#box1').addClass('mot-par-on');
                $('#box0').removeClass('mot-par-on');
                $('#box2').removeClass('mot-par-on');
                $(".mot-wrap").css('background-image', "url('images/mot3.webp')");

            }

            else if(go==2) {
                this.now=2;
                $('#box2').addClass('mot-par-on');
                $('#box1').removeClass('mot-par-on');
                $('#box0').removeClass('mot-par-on');
                $(".mot-wrap").css('background-image', "url('images/mot1.jpg')");

            }
        }


	},

	created() {

	},

	mounted() {
		console.log('there');
        this.move_tabs(0);  
    window.addEventListener('keydown', (e) => {
      if (e.key == 2) {
        console.log('click');
        if(this.now<3) this.move_tabs(this.now+1);
      }
      else if (e.key == 8) {
        console.log('click');
        if(this.now>0) this.move_tabs(this.now-1);
      }
    });  
		
		
	},

	updated() {
        
	},

});