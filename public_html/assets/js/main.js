var flag = 1;
var field = {
    width: screen.availWidth * 0.84,
    height: screen.availHeight * 0.61,
    draw: function () {
        //central circle
        var cir = this.field.getContext('2d');
        cir.clearRect(0, 0, this.width, this.height);
        cir.beginPath();
        cir.arc(this.width / 2 - 2, this.height / 2 - 2, 65, 0, 2 * Math.PI, false);
        cir.fillStyle = '#62fe8b';
        cir.fill();
        cir.lineWidth = 4;
        cir.strokeStyle = '#fff';
        cir.stroke();
        //central small circle
        var cir = this.field.getContext('2d');
        cir.beginPath();
        cir.arc(this.width / 2 - 2, this.height / 2 - 2, 7, 0, 2 * Math.PI, false);
        cir.fillStyle = '#fff';
        cir.fill();
        cir.lineWidth = 10;
        cir.strokeStyle = '#fff';
        cir.stroke();
        //central line
        var cl = this.field.getContext('2d');
        cl.strokeStyle = "#fff";
        cl.lineWidth = 4;
        cl.beginPath();
        cl.moveTo(this.width / 2 - 2, 0);
        cl.lineTo(this.width / 2 - 2, this.height);
        cl.stroke();
        //left lines
        var ll = this.field.getContext('2d');
        ll.strokeStyle = "#fff";
        ll.lineWidth = 4;
        ll.beginPath();
//left lines
        ll.moveTo(0, this.height * 0.2);
        ll.lineTo(this.width * 0.13, this.height * 0.2);
        ll.lineTo(this.width * 0.13, this.height * 0.8);
        ll.lineTo(0, this.height * 0.8);

//right lines
        ll.moveTo(this.width, this.height * 0.2);
        ll.lineTo(this.width * 0.87, this.height * 0.2);
        ll.lineTo(this.width * 0.87, this.height * 0.8);
        ll.lineTo(this.width, this.height * 0.8);
        ll.stroke();


        var lg = this.field.getContext('2d');
        lg.strokeStyle = "#FF4B4B";
        lg.lineWidth = 5;
        lg.beginPath();
        lg.moveTo(0, this.height * 0.35);
        lg.lineTo(10, this.height * 0.35);
        lg.lineTo(10, this.height * 0.65);
        lg.lineTo(0, this.height * 0.65);

        lg.moveTo(this.width, this.height * 0.35);
        lg.lineTo(this.width - 10, this.height * 0.35);
        lg.lineTo(this.width - 10, this.height * 0.65);
        lg.lineTo(this.width, this.height * 0.65);

        lg.stroke();


    }
}

$(document).ready(function () {
    pos = {};
    var direction = 0;
    var ball = $("#ball");
    ball.start = function () {
        this.css({
            left: field.width / 2 + 18,
            top: field.height / 2 + 2,
            opacity: 1
        });
    }
    ball.move = function (a, b, delta) {

        var x = parseInt(this.offset().left.toFixed(0)) + 2000 * delta;
        var y = parseInt(this.offset().top.toFixed(0));

        var top = a * x + b + y;
        if (Math.floor(parseInt(top) < 0)) {
            top = 0;
        } else if (Math.floor(parseInt(top) > field.height + 15)) {
            top = field.height + 15;
        }

        if (x <= 15) { // add condition with top
            if ((Math.floor(parseInt(top)) > 300 && Math.floor(parseInt(top)) < 350)) {
                x = 0;
            } else {
                x = 15;
            }
        } else if (x > parseInt(field.width) + 50) {
            if ((Math.floor(parseInt(top)) > 300 && Math.floor(parseInt(top)) < 350)) {
                x = parseInt(field.width) + 35;
            } else {
                x = parseInt(field.width) + 27;
            }
        }

        ball.animate({
            left: x.toString(),
            top: Math.floor(parseInt(top))
        }, 500);

        flag = 0;
    }
    ball.start();
    $("#field").css("margin", ($("body").height() / $("#field").height() / 2));
    field.field = $("#field")[0];
    if (field.field.getContext) {
        var coordinate = [];
        colors = {
            a: "magenta",
            b: "blue"
        };
        field.draw();
        ball.bind("mousemove",
                function (event) {
                    if (flag == 0) {
                        coordinate = [];
                        flag = 1;
                    }

                    if (coordinate.length < 3) {
                        temp = {
                            x: event.clientX,
                            y: event.clientY
                        };

                        coordinate.push(temp);
                    } else if (coordinate.length == 3) {
                        var a = (coordinate[0].y - coordinate[2].y) / (coordinate[0].x - coordinate[2].x);
                        var b = (coordinate[0].y - a * coordinate[0].x);

                        if ((coordinate[2].x - coordinate[0].x) > 0) {
                            var delta = 1;
                        } else {
                            var delta = -1;
                        }
                        ball.move(a.toFixed(2), b.toFixed(2), delta);
                        setInterval(function () {
                            if ((ball.offset().left < 75 || ball.offset().left > 1105) && (ball.offset().top > 300 && ball.offset().top < 350)) {
                                var audio = new Audio('assets/audio/1.mp3');
                                audio.play();
                                ball.animate({
                                    left: field.width / 2 + 18,
                                    top: field.height / 2 + 2,
                                }, 5);
                                coordinate = [];
                                flag = 0;
                                return;
                            }
                        }, 150);

                    }
                });


    }
});
