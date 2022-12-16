var buttons = document.getElementsByTagName("button");

var siz = buttons.length;

for (let i = 0; i < siz; i++) {
    buttons[i].onmouseover = function () {
        this.classList.add("lighter");
    };
    buttons[i].onmouseleave = function () {
        this.classList.remove("lighter");
    };
    buttons[i].onmousedown = function () {
        this.classList.add("darker");
    };
    buttons[i].onmouseup = function () {
        this.classList.remove("darker");
    };
}

var eventDay;
var month;
var year;

$(function(){

    let array=[];
    let id=1;


    eventDay=0;
    let allDays = 0
    let now = new Date()
    let isHave=[];
    month = new Date().getMonth()+1;
    calendar()
    year = $('.year').text();
    let ddd = new Date(month+"/1/"+year).getDay();
    console.log(ddd);

    $(".arrow-left").click(function(){
      year=Number(year)-1;
      $('.year').text(year)
      //添加日历上的事件
      let mon = $(".month-hover").text();// 日历的月份

      let firstDay=new Date(mon+"/1/"+year).getDay();

      let days= getDays(year,mon);


      //输出之前需要清空之前初始化的天数
      for (let i = 1; i <=42 ; i++) {
        $("#"+i).text("")
        $("#"+i).parent().next().remove()
      }

      //  输出天数
      let start=0;
      for (let i = 1; i <= days; i++) {
        if (firstDay==0){
          start=6
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().addClass("td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
          $("#"+Number(start+i)).parent().parent().css("display","flex")
        }else{
          start=firstDay-1
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().addClass("td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
          $("#"+Number(start+i)).parent().parent().css("display","flex")
        }
      }


      let ddd = firstDay;
      for (let i = 0; i <array.length ; i++) {

        if (array[i]["Yearoftheevent"]==year){
          if (mon==array[i]["Monthoftheevent"]){
            if (ddd==0){
              isHave.push((Number(array[i]["Dayoftheevent"]) + 6))
              $("#"+(Number(array[i]["Dayoftheevent"]) + 6)).parent().after('<span name="ca-event" data-id="'+array[i]["EventId"]+'" class="ca-event"><span class="iconfont" id="iconfont">&#xe652;</span>'+array[i]["EventId"]+'</span>')
            }else{
              isHave.push((Number(array[i]["Dayoftheevent"])+Number(ddd)-1))
              $("#"+(Number(array[i]["Dayoftheevent"])+Number(ddd)-1)).parent().after('<span name="ca-event" data-id="'+array[i]["EventId"]+'" class="ca-event"><span class="iconfont" id="iconfont">&#xe652;</span>'+array[i]["EventId"]+'</span>')
            }
          }
        }
      }

    })

    $(".arrow-right").click(function(){
      year=Number(year)+1;
      $('.year').text(year)
      //添加日历上的事件
      let mon = $(".month-hover").text();// 日历的月份

      let firstDay=new Date(mon+"/1/"+year).getDay();

      let days= getDays(year,mon);


      //输出之前需要清空之前初始化的天数
      for (let i = 1; i <=42 ; i++) {
        $("#"+i).text("")
        $("#"+i).parent().next().remove()
      }

      //  输出天数
      let start=0;
      for (let i = 1; i <= days; i++) {
        if (firstDay==0){
          start=6
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().attr("name","td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
        }else{
          start=firstDay-1
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().attr("name","td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
        }
      }


      let ddd = firstDay;
      for (let i = 0; i <array.length ; i++) {

        if (array[i]["Yearoftheevent"]==year){
          if (mon==array[i]["Monthoftheevent"]){
            if (ddd==0){
              isHave.push((Number(array[i]["Dayoftheevent"]) + 6))
              $("#"+(Number(array[i]["Dayoftheevent"]) + 6)).parent().after('<span name="ca-event" data-id="'+array[i]["EventId"]+'" class="ca-event">'+array[i]["EventId"]+'</span>')
            }else{
              isHave.push((Number(array[i]["Dayoftheevent"])+Number(ddd)-1))
              $("#"+(Number(array[i]["Dayoftheevent"])+Number(ddd)-1)).parent().after('<span name="ca-event" data-id="'+array[i]["EventId"]+'" class="ca-event"></span>'+array[i]["EventId"]+'</span>')
            }
          }
        }
      }


    })

    $("span[name='month']").click(function(){


      // 清除日历的事件
      for (let i = 0; i < isHave.length; i++) {
          $("#"+(isHave[i])).parent().next().remove()
      }



      //样式改变
      $(".month-hover").removeClass("month-hover")
      $(this).addClass("month-hover")
      //获取点击的日期
      month = $(this).attr('data-id');



      let year = $('.year').text()// 日历的年份
      //添加日历上的事件
      let mon = $(".month-hover").text();// 日历的月份

      let ddd = new Date(month+"/1/"+year).getDay();
      for (let i = 0; i <array.length ; i++) {

        if (array[i]["Yearoftheevent"]==year){
          if (mon==array[i]["Monthoftheevent"]){
            if (ddd==0){
              isHave.push((Number(array[i]["Dayoftheevent"]) + 6))
              $("#"+(Number(array[i]["Dayoftheevent"]) + 6)).parent().after('<span name="ca-event" data-id="'+array[i]["EventId"]+'" class="ca-event"><span class="iconfont" id="iconfont">&#xe652;</span>'+array[i]["EventId"]+'</span>')
            }else{
              isHave.push((Number(array[i]["Dayoftheevent"])+Number(ddd)-1))
              $("#"+(Number(array[i]["Dayoftheevent"])+Number(ddd)-1)).parent().after('<span name="ca-event" data-id="'+array[i]["EventId"]+'" class="ca-event"><span class="iconfont" id="iconfont">&#xe652;</span>'+array[i]["EventId"]+'</span>')
            }
          }
        }
      }







      let days= getDays(year,month);
      // 获取当前的年份的某个具体月份的第一天是周几
      let firstDay=new Date(month+"/1/"+year).getDay();
      // console.log(firstDay)
      //输出之前需要清空之前初始化的天数
      for (let i = 1; i <=42 ; i++) {
        $("#"+i).text("")
      }
      //  输出天数
      let start=0;
      for (let i = 1; i <= days; i++) {
        if (firstDay==0){
          start=6
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().attr("name","td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
        }else{
          start=firstDay-1
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().attr("name","td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
        }
      }


      $("span[name='ca-event']").click(function(e) {
        alert(11)
        e.stopPropagation()
        e.preventDefault();

        $(".b").trigger("click");

        $("input[name='link']").val("http://localhost:3000/detail/"+$(this).attr("data-id"))
        $("input[name='code']").val($(this).attr("data-id"))
      })


    })
    // 获取日期数
    function getDays(year,month)
    {
      let days=0;
      switch (Number(month)) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          days = 31
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          days = 30
          break;
        default:
          //判断闰年 得到二月份的天数
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            days = 29
          } else {
            days = 28
          }
          break;
      }
      return days;
    }
    //初始化日历
    function calendar() {
      let m = new Date().getMonth()
      $(".check-month span:eq("+m+")").addClass("month-hover")
      let year = now.getFullYear()
      $('.year').text(year)
      //得到每个月多少天
      allDays=getDays(year,month)
      now.setDate(1) //将时间设置成本月的一号
      let firstDay = now.getDay()//0 是周日
      // 0   1   2   3   4    5   6
      //周日 周一 周二 周三 周四 周五 周六
      //  输出天数
      let start=0;
      for (let i = 1; i <= allDays; i++) {
        if (firstDay==0){
          start=6
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().attr("name","td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
        }else {
          start=firstDay-1
          $("#"+Number(start+i)).text(i)
          $("#"+Number(start+i)).parent().parent().attr("name","td")
          $("#"+Number(start+i)).parent().parent().css("cursor","pointer")
        }
      }
    }
    $(".a").click(function(){
      eventDay=$(this).children().text()
    });

    $("[name='td']").click(function (e) {
      if($(e.target).is('span[name="ca-event"]')){
        $("span[name='ca-event']").click(function (e) {
          e.stopPropagation();
          e.preventDefault();
          $(".b").trigger("click");

          $("input[name='link']").val("sample.com"+$(this).attr("data-id"))
          $("input[name='code']").val($(this).attr("data-id"))
          for (let i = 0; i <array.length ; i++) {

            if (array[i]["EventId"]==$(this).attr("data-id")){

              $(".time3").val(array[i]["time2"])
              $(".time32").val(array[i]["time2To"])

            }

          }

        })

      }
      eventDay=$(this).children(":first").children().text()
      $(".c").trigger("click");
    })
});

var but_createEvent = document.getElementById("ce_button");
but_createEvent.onmouseup = function () {
    this.classList.remove("darker");
    var eveName = document.getElementById("eventName").value;
    var timeStart = document.getElementById("timeStart").value;
    var timeEnd = document.getElementById("timeEnd").value;
    var detail = document.getElementById("eventdetail").value;
    if(eveName && timeStart && timeEnd && detail && eventDay != 0){
        alert("Event Created!");

        var stringCode = UniqueCode(makeCode());

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/users/addevent", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            Event_name: eveName,
            Event_decription: detail,
            Year_of_event: year,
            Month_of_event: month,
            Day_of_event: eventDay,
            Starting_time_of_event: timeStart,
            Ending_time_of_event: timeEnd,
            Code: stringCode
        }));
        document.getElementById("eventName").value = "";
        document.getElementById("timeStart").value = "";
        document.getElementById("timeEnd").value = "";
        document.getElementById("eventdetail").value = "";
        var links = document.getElementsByClassName("Invlink");
        var codes = document.getElementsByClassName("InvCode");

        links[0].value = window.location.hostname + stringCode;
        links[1].value = window.location.hostname + stringCode;

        codes[0].value = stringCode;
        codes[1].value = stringCode;

        window.location.hash = "modal-two";

    }
    else if(eventDay == 0){
        alert("Please select a day before creating the event!");
    }
    else{
        alert("Please fill out all areas!");
    }
}



function UniqueCode(code){
    var uCode = code;
    var brk = false
    while(1){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 200 && this.status == 4){
                if(this.response == "[]"){
                    brk = true;
                }
                else{
                    uCode = makeCode();
                }
            }
        }
        xhttp.open("GET", "/users/testCode/" + uCode, true);
        xhttp.send();
        if(brk){
            break;
        }
    }
    return uCode;
}