function Particle( x, y, radius ) {
    this.init( x, y, radius );
}
Particle.prototype = {
    init: function( x, y, radius ) {
        this.alive = true;
        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random( TWO_PI );
        this.drag = 0.92;
        this.color = '#fff';
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.vx = 0.0;
        this.vy = 0.0;
    },
    move: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.theta += random( -0.5, 0.5 ) * this.wander;
        this.vx += sin( this.theta ) * 0.1;
        this.vy += cos( this.theta ) * 0.1;
        this.radius *= 0.96;
        this.alive = this.radius > 0.5;
    },
    draw: function( ctx ) {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};
// ----------------------------------------
// Example
// ----------------------------------------
var MAX_PARTICLES = 280;
var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
var particles = [];
var pool = [];
var demo = Sketch.create({
    container: document.getElementById( 'container' ),
    retina: 'auto'
});
demo.setup = function() {
    // Set off some initial particles.
    var i, x, y;
    for ( i = 0; i < 20; i++ ) {
        x = ( demo.width * 0.5 ) + random( -100, 100 );
        y = ( demo.height * 0.5 ) + random( -100, 100 );
        demo.spawn( x, y );
    }
};
demo.spawn = function( x, y ) {
    
    var particle, theta, force;
    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );
    particle = pool.length ? pool.pop() : new Particle();
    particle.init( x, y, random( 5, 40 ) );
    particle.wander = random( 0.5, 2.0 );
    particle.color = random( COLOURS );
    particle.drag = random( 0.9, 0.99 );
    theta = random( TWO_PI );
    force = random( 2, 8 );
    particle.vx = sin( theta ) * force;
    particle.vy = cos( theta ) * force;
    particles.push( particle );
};
demo.update = function() {
    var i, particle;
    for ( i = particles.length - 1; i >= 0; i-- ) {
        particle = particles[i];
        if ( particle.alive ) particle.move();
        else pool.push( particles.splice( i, 1 )[0] );
    }
};
demo.draw = function() {
    demo.globalCompositeOperation  = 'lighter';
    for ( var i = particles.length - 1; i >= 0; i-- ) {
        particles[i].draw( demo );
    }
};
demo.mousemove = function() {
    var particle, theta, force, touch, max, i, j, n;
    for ( i = 0, n = demo.touches.length; i < n; i++ ) {
        touch = demo.touches[i], max = random( 1, 4 );
        for ( j = 0; j < max; j++ ) {
          demo.spawn( touch.x, touch.y );
        }
    }
};



$(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
    //   e.preventDefault();
    //   var msg = $("#chat-input").val(); 
    //   if(msg.trim() == ''){
    //     return false;
    //   }
    //   generate_message(msg, 'self');
    //   var buttons = [
    //       {
    //         name: 'Existing User',
    //         value: 'existing'
    //       },
    //       {
    //         name: 'New User',
    //         value: 'new'
    //       }
    //     ];

      
    })
    
    function generate_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <span class=\"msg-avatar\">";
    //   str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      if(type == 'self'){
       $("#chat-input").val(''); 
      }    
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
    }  
    
    function generate_button_message(msg, buttons){    
      INDEX++;
      var btn_obj = buttons.map(function(button) {
         return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
      }).join('');
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
      str += "          <span class=\"msg-avatar\">";
    //   str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "          <div class=\"cm-msg-button\">";
      str += "            <ul>";   
      str += btn_obj;
      str += "            <\/ul>";
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);   
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
      $("#chat-input").attr("disabled", true);
    }
    
    $(document).delegate(".chat-btn", "click", function() {
      var value = $(this).attr("chat-value");
      var name = $(this).html();
      $("#chat-input").attr("disabled", false);
      generate_message(name, 'self');
    })
    
    $("#chat-circle").click(function() {    
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
    $(".chat-box-toggle").click(function() {
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
  })