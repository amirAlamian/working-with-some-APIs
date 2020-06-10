let data1;
let data2;
let counter = 0;
let langs = "";
let titles1 = ["Native Name: ", "Capital: ", "Region: ", "Population: ", "Languages: ", "Time Zone: "];
let info1 = ["nativeName", "capital", "region", "population", "languages", "timezones"];
let titles2=["Wind Speed: ","Temperature: ","Humidity: ","Visibility: "];
let info2=["wind_speed","temperature","humidity","visibility"];
function GetMap(x,y,z) {
    var map = new Microsoft.Maps.Map('.box2', {
        credentials: 'Auf0i4sDt7TytmBTSAUetQx6ZathezZIYoUQeq8qTdO_AN1XBl9xgxEf0TNJRnbs',
        center: new Microsoft.Maps.Location(x,y),
        zoom:6
    });

    var center = map.getCenter();

    var pin = new Microsoft.Maps.Pushpin(center, {
        title:z,
        text: '1'
    });

    map.entities.push(pin);
}
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://restcountries.eu/rest/v2/all",
        async: false,
        success: function (response) {
            data1 = response;
        },
        error: function (err) {
            console.log(err);
        }
    })
    console.log(data1);

    for (let i = 0; i < data1.length; i++) {
        $("#sel1").append("<option></option>");
        $("select").find("option").eq(i + 1).addClass("one" + " " + i).text(data1[i]["name"]);
    }
    $(document).on("click", "#sel1", function () {
        if (counter % 2 === 1) {
            for (i = 0; i < data1.length; i++) {
                if (data1[i]["name"] === $(this).val()) {
                
                    for (let j = 0; j < info1.length; j++) {
                        if (j === 4) {
                            for (let k = 0; k < data1[i][info1[j]].length; k++) {
                                langs += data1[i][info1[j]][k]["name"] + ", " + data1[i][info1[j]][k]["nativeName"] + " ";
                            }
                            $(".p1").eq(j).text(titles1[j] + langs);
                            continue;
                        }
                        $(".p1").eq(j).text(titles1[j] + data1[i][info1[j]]);
                    }
                    $(".codeBox").text(data1[i]["callingCodes"]);
                    $(".box").eq(2).find("img").attr({
                        "src": data1[i]["flag"],
                        "alt": data1[i]["name"] + "`s flag"
                    })
                    $.ajax({
                        type: "GET",
                        url: "http://api.weatherstack.com/current?access_key=9ef6610d4c8f2f31e6a5bac5fa731939&query="+data1[i]["capital"],
                        async:false,
                        success: function (response) {
                            data2=response                            
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                    for(j=0;j<4;j++){
                        $(".p2").eq(j).text(titles2[j]+data2["current"][info2[j]])
                    }
                     GetMap(data2["location"]["lat"],data2["location"]["lon"],data1[i]["capital"]);
                }
            }

        }
        langs = ""
        counter++;
    })
})


