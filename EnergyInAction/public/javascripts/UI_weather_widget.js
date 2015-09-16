// forked from djankey's "Weather widget" http://jsdo.it/djankey/weatherwidget
var jsonProxy = "http://jsonp.jit.su/?&url=";
var cityList = ['Suwon'];
var currentCity = cityList[0];
var metricUnits = true;
var stage, W, H, ui, control, preloader, img_preloader, holder, bmp, jsonData, loading, cityLabel, tempLabel, conditionLabel;
var ypos = 0;

function init() {
     // setup canvas
    var canvas = document.getElementById('canvas');
    if (!canvas || !canvas.getContext) {
        console.log('HTML5 Canvas is not supported!');
        return;
    }

    // dimensions
    W = canvas.width;
    H = canvas.height;

    // create a stage object to work with the canvas
    stage = new createjs.Stage(canvas);
    stage.mouseMoveOutside = false;
    stage.mouseEventsEnabled = false;
    stage.enableMouseOver(30);

    // loading text...
    loading = new createjs.Text("LOADING...", '12px Arial', '#CCCCCC');
    loading.alpha = 0.5;
	loading.x = W/2;
    loading.y = ypos + 120;
    loading.textAlign  = "center";
	stage.addChild(loading);

    // data preloader
    preloader = new createjs.LoadQueue(true);
    preloader.addEventListener("fileload", handleFileLoad);

    // image preloader
    img_preloader = new createjs.LoadQueue(false);
    img_preloader.addEventListener("fileload", handleImageLoad);

    // web fonts preloader
    WebFont.load({
       google: { families: ['Oxygen::latin'] },

        active: function() {
            build();
        }
    });

    // draw canvas
    updateStage();
}

function build() {
    holder = new createjs.Container();
    stage.addChild(holder);
    holder.alpha = 0;

    holder.onMouseOver = function(e) {
        if(holder.alpha === 1) document.body.style.cursor='pointer';
        else document.body.style.cursor='default';
    }
    holder.onMouseOut = function(e) {
        document.body.style.cursor='default';
    }

    holder.onPress = getURL;

    var bg = new createjs.Shape();//E0E0E0
    bg.graphics.beginLinearGradientFill(["#ffffff","#ffffff"], [0, 1], 0, 40, W - 60, 40).drawRoundRect(0, ypos, W, 80, 10, 10, 10, 10).endFill();
    holder.addChild(bg);

    var circ = new createjs.Shape();
    circ.graphics.beginFill('#E0E0E0');
    circ.graphics.drawCircle(W/2, ypos + 40, 30);
    circ.graphics.endFill();
    circ.alpha = 0.4;
    holder.addChild(circ);

    // city label
    cityLabel = new createjs.Text(currentCity, '25px Oxygen', '#353535');
	cityLabel.x = W/2 + 50;
    cityLabel.y = ypos + 10;
    cityLabel.maxWidth = W/2 - 90;
    cityLabel.textAlign  = "left";
	holder.addChild(cityLabel);

    // temperature label
    tempLabel = new createjs.Text("", '40px Oxygen', '#353535');
	tempLabel.x = W/2 - 50;
    tempLabel.y = ypos + 12;
    tempLabel.textAlign  = "right";
	holder.addChild(tempLabel);

    // current...
    conditionLabel = new createjs.Text(". . .", '14px Oxygen', '#353535');
	conditionLabel.x = W/2 + 50;
    conditionLabel.y = ypos + 50;
    conditionLabel.textAlign  = "left";
	holder.addChild(conditionLabel);

    // add dat.GUI
    gui = new dat.GUI();
    gui.close();
    gui.add(this, 'currentCity', cityList ).name("City: ").onChange(inputChanged);
    gui.add(window, 'metricUnits').name('metric values:').onChange(inputChanged);

    // load data
    loadWeatherData();

    // draw canvas
    updateStage();
}

function loadWeatherData() {
    showLoading(true);

    cityLabel.text = currentCity;
    tempLabel.text = "";

    var currentUnit = "metric";
    if(metricUnits === false) currentUnit = "imperial";

    var path = jsonProxy + encodeURIComponent("http://api.openweathermap.org/data/2.5/weather?q=" + currentCity  + "&mode=json&units=" + currentUnit);
    preloader.loadFile(path);
}

// update stage
function updateStage() {
    // redraw
	stage.update();
}

// file loaded
function handleFileLoad(event) {
    jsonData = JSON.parse(event.result);

    var unitSymbol = "C";
    if(metricUnits === false) unitSymbol = "F";
    tempLabel.text = Math.round(jsonData.main.temp) + "°" + unitSymbol;

    conditionLabel.text = jsonData.weather[0].main;

    var path = "http://openweathermap.org/img/w/"  + jsonData.weather[0].icon + ".png";
    // var path = "http://postfiles15.naver.net/20150916_254/dg89613_1442378795457fKile_PNG/1442396759_weather_icons-01.png?type=w3";
    console.log(jsonData.weather[0].icon);
    img_preloader.loadFile(path);

    updateStage();
}

function handleImageLoad(event) {
    showLoading(false);

    if(bmp) stage.removeChild(bmp);

    bmp = new createjs.Bitmap(event.result);
    bmp.x = W/2 - event.result.width/2;
    bmp.y = ypos + 40 - event.result.height/2;
    stage.addChild(bmp);

    updateStage();
}

function showLoading(e) {
    if(e===true) {
        holder.alpha = 0.5;
    } else {
        holder.alpha = 1;
    }

    loading.visible = e;
    updateStage();
}

// on city change
function inputChanged(e) {
    if(bmp) stage.removeChild(bmp);
    bmp = null;

    cityLabel.text = currentCity;
    tempLabel.text = "";
    conditionLabel.text = ". . .";
    loadWeatherData();
}

function getURL() {
    if(jsonData.coord) {
        window.open("http://openweathermap.org/Maps?zoom=7&lat=" + jsonData.coord.lat + "&lon=" + jsonData.coord.lon, '_blank');
    }
}
// >>> start
window.addEventListener('load', init, false);
