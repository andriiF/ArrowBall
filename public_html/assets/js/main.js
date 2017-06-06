$(document).ready(function () {
    pos = {};
    var direction = 0;
    $("#field").on("mousemove", function (e) {
        pos = {
            x: event.pageX - this.offsetLeft - 30,
            y: event.pageY - this.offsetLeft - 45
        };
    });
    $("#field").css("margin", ($("body").height() / $("#field").height() / 2));
    var field = $("#field")[0];
    field.width = screen.availWidth * 0.8;
    field.height = screen.availHeight * 0.6;
    if (field.getContext) {
        coordinate = {
            x: 200,
            y: 200
        };
        colors = {
            a: "magenta",
            b: "blue"
        };
        draw = function () {
            //central circle
            var cir = field.getContext('2d');
            cir.clearRect(0, 0, field.width, field.height);

            cir.beginPath();
            cir.arc(field.width / 2 - 2, field.height / 2 - 2, 65, 0, 2 * Math.PI, false);
            cir.fillStyle = '#62fe8b';
            cir.fill();
            cir.lineWidth = 4;
            cir.strokeStyle = '#fff';
            cir.stroke();

            //central small circle
            var cir = field.getContext('2d');
            cir.beginPath();
            cir.arc(field.width / 2 - 2, field.height / 2 - 2, 7, 0, 2 * Math.PI, false);
            cir.fillStyle = '#fff';
            cir.fill();
            cir.lineWidth = 10;
            cir.strokeStyle = '#fff';
            cir.stroke();

            //central line
            var cl = field.getContext('2d');
            cl.strokeStyle = "#fff";
            cl.lineWidth = 4;
            cl.beginPath();
            cl.moveTo(field.width / 2 - 2, 0);
            cl.lineTo(field.width / 2 - 2, field.height);
            cl.stroke();
            //left lines

            var ll = field.getContext('2d');
            ll.strokeStyle = "#fff";
            ll.lineWidth = 4;
            ll.beginPath();
            ll.moveTo(0, field.height * 0.2);
            ll.lineTo(field.width * 0.13, field.height * 0.2);
            ll.lineTo(field.width * 0.13, field.height * 0.8);
            ll.lineTo(0, field.height * 0.8);
            ll.moveTo(field.width, field.height * 0.2);
            ll.lineTo(field.width * 0.87, field.height * 0.2);
            ll.lineTo(field.width * 0.87, field.height * 0.8);
            ll.lineTo(field.width, field.height * 0.8);
            ll.stroke();

            ball = field.getContext('2d');
            ball.beginPath();

            ball.arc(coordinate.x, coordinate.y, 23, 0, 10 * Math.PI, false);
            var grd = cir.createRadialGradient(10, 10, 23, 38, 50, 300);
            grd.addColorStop(0, "black");
            grd.addColorStop("0.3", colors.a);
            grd.addColorStop("0.6", colors.b);
            grd.addColorStop(1, "red");
            ball.fillStyle = grd;
            ball.strokeStyle = grd;
            ball.shadowColor = '#004';
            ball.shadowBlur = 10;
            ball.shadowOffsetX = 0;
            ball.shadowOffsetY = 0;
            ball.fill();
            ball.stroke();
        };
        draw();


    }
    function action() {
        if (coordinate.x == pos.x) {
            console.log(pos);
        }

        if (coordinate.x <= field.width - 30 && coordinate.y <= field.height - 30) {
            redraw(1);
        } else {
            coordinate.x = Math.floor(Math.random() * field.width - 30);
            coordinate.y = Math.floor(Math.random() * field.height - 30);
        }



    }

    setInterval(action, 1);

//    $(document).on("click", function (e) {
//        var pos = {
//            x: e.pageX - ((screen.availWidth - screen.availWidth * 0.8) / 2),
//            y: e.pageY - ((screen.availHeight - screen.availHeight * 0.8) / 2)
//        };
//    });
    redraw = function (speed) {
        for (var i = 0; i < speed; i++) {
            coordinate.y++;
            coordinate.x++;
        }
        draw();
    }

});
