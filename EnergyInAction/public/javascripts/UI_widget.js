/**
 * Plugin: jquery.zWeatherFeed
 *
 * Version: 1.2.1
 * (c) Copyright 2011-2013, Zazar Ltd
 *
 * Description: jQuery plugin for display of Yahoo! Weather feeds
 *
 * History:
 * 1.2.1 - Handle invalid locations
 * 1.2.0 - Added forecast data option
 * 1.1.0 - Added user callback function
 *         New option to use WOEID identifiers
 *         New day/night CSS class for feed items
 *         Updated full forecast link to feed link location
 * 1.0.3 - Changed full forecast link to Weather Channel due to invalid Yahoo! link
	   Add 'linktarget' option for forecast link
 * 1.0.2 - Correction to options / link
 * 1.0.1 - Added hourly caching to YQL to avoid rate limits
 *         Uses Weather Channel location ID and not Yahoo WOEID
 *         Displays day or night background images
 *
 **/

(function($){

	$.fn.weatherfeed = function(locations, options, fn) {

		// Set plugin defaults
		var defaults = {
			unit: 'c',
			image: true,
			country: false,
			highlow: true,
			wind: true,
			humidity: false,
			visibility: false,
			sunrise: false,
			sunset: false,
			forecast: false,
			link: true,
			showerror: true,
			linktarget: '_self',
			woeid: false
		};
		var options = $.extend(defaults, options);
		var row = 'odd';

		// Functions
		return this.each(function(i, e) {
			var $e = $(e);

			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!$.isArray(locations)) return false;

			var count = locations.length;
			if (count > 10) count = 10;

			var locationid = '';

			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date();

			// Select location ID type
			var queryType = options.woeid ? 'woeid' : 'location';

			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where "+ queryType +" in ("+ locationid +") and u='"+ options.unit +"'";
			var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

			// Send request
			$.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {

						if (data.query.results.channel.length > 0 ) {

							// Multiple locations
							var result = data.query.results.channel.length;
							for (var i=0; i<result; i++) {

								// Create weather feed item
								_process(e, data.query.results.channel[i], options);
							}
						} else {

							// Single location only
							_process(e, data.query.results.channel, options);
						}

						// Optional user callback function
						if ($.isFunction(fn)) fn.call(this,$e);

					} else {
						if (options.showerror) $e.html('<p>Weather information unavailable</p>');
					}
				},
				error: function(data) {
					if (options.showerror) $e.html('<p>Weather request failed</p>');
				}
			});

			// Function to each feed item
			var _process = function(e, feed, options) {
				var $e = $(e);

				// Check for invalid location
				if (feed.description != 'Yahoo! Weather Error') {

					// Format feed items
					var wd = feed.wind.direction;
					if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
					var wf = feed.item.forecast[0];

					// Determine day or night image
					wpd = feed.item.pubDate;
					n = wpd.indexOf(":");
					tpb = _getTimeAsDate(wpd.substr(n-2,8));
					tsr = _getTimeAsDate(feed.astronomy.sunrise);
					tss = _getTimeAsDate(feed.astronomy.sunset);

					// Get night or day
					if (tpb>tsr && tpb<tss) { daynight = 'day'; } else { daynight = 'night'; }

					// Add item container
					var html = '<div class="weatherItem '+ row +' '+ daynight +'"';
					if (options.image) html += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight.substring(0,1) +'.png); background-repeat: no-repeat;"';
					html += '>';
					var wind_a = wd;
				     switch (wind_a)
                    {
                     case 'N': wd_a="북";break;
                     case 'S': wd_a="남";break;
                     case 'E': wd_a="동";break;
                     case 'W': wd_a="서";break;
                     case 'NE': wd_a="북동";break;
                     case 'NW': wd_a="북서";break;
                     case 'SE': wd_a="남동";break;
                     case 'SW': wd_a="남서";break;
                     case 'NNE': wd_a="북북동";break;
                     case 'NNW': wd_a="북북서";break;
                     case 'SSE': wd_a="남남동";break;
                     case 'SSW': wd_a="남남서";break;
                     case 'ENE': wd_a="동북동";break;
                     case 'ESE': wd_a="동남동";break;
                     case 'WNW': wd_a="서북서";break;
                     case 'WSW': wd_a="서남서";break;
                      }
					  var CONDITION_a = feed.item.condition.code;
				        switch (CONDITION_a){
					    case'0':CONDITION_a="폭풍";break;
						case'1':CONDITION_a="열대폭풍";break;
						case'2':CONDITION_a="허리케인";break;
						case'3':CONDITION_a="심한뇌우";break;
						case'4':CONDITION_a="뇌우";break;
						case'5':CONDITION_a="혼합비와눈";break;
						case'6':CONDITION_a="혼합비와진눈깨비";break;
						case'7':CONDITION_a="혼합눈과진눈깨비";break;
						case'8':CONDITION_a="진눈깨비";break;
						case'9':CONDITION_a="이슬비가내리다";break;
						case'10':CONDITION_a="냉동비";break;
						case'11':CONDITION_a="샤워";break;
						case'12':CONDITION_a="샤워";break;
						case'13':CONDITION_a="눈이진눈깨비";break;
						case'14':CONDITION_a="빛눈소나기";break;
						case'15':CONDITION_a="불고눈";break;
						case'16':CONDITION_a="눈";break;
						case'17':CONDITION_a="빗발";break;
						case'18':CONDITION_a="진눈깨비";break;
						case'19':CONDITION_a="먼지";break;
						case'20':CONDITION_a="흐린";break;
						case'21':CONDITION_a="안개";break;
						case'22':CONDITION_a="연기나는";break;
						case'23':CONDITION_a="세차게몰아치는";break;
						case'24':CONDITION_a="바람이센";break;
						case'25':CONDITION_a="감기";break;
						case'26':CONDITION_a="흐린";break;
						case'27':CONDITION_a="대체로맑음(밤)";break;
						case'28':CONDITION_a="대체로맑음(일)";break;
						case'29':CONDITION_a="대체로맑음(밤)";break;
						case'30':CONDITION_a="대체로맑음(일)";break;
						case'31':CONDITION_a="클리어(밤)";break;
						case'32':CONDITION_a="명란한";break;
						case'33':CONDITION_a="공정(밤)";break;
						case'34':CONDITION_a="공정(일)";break;
						case'35':CONDITION_a="혼합비와우박";break;
						case'36':CONDITION_a="뜨거운";break;
						case'37':CONDITION_a="고립된뇌우";break;
						case'38':CONDITION_a="구름조금";break;
						case'39':CONDITION_a="구름조금";break;
						case'40':CONDITION_a="소나기";break;
						case'41':CONDITION_a="폭설";break;
						case'42':CONDITION_a="흩어져산발적눈";break;
						case'43':CONDITION_a="폭설";break;
						case'44':CONDITION_a="대체로맑음";break;
						case'45':CONDITION_a="thundershowers";break;
						case'46':CONDITION_a="소나기";break;
						case'47':CONDITION_a="고립thundershowers";break;
				}
					// Add item data
					html += '<div class="weatherCity">'+ feed.location.city +'</div>';
					if (options.country) html += '<div class="weatherCountry">'+ feed.location.country +'</div>';
					html += '<div class="weatherTemp">'+ feed.item.condition.temp +'&deg;</div>';
					html += '<div class="weatherDesc">'+ CONDITION_a +'</div>';
					// Add optional data
					if (options.highlow) html += '<div class="weatherRange">최고: '+ wf.high +'&deg; 최저: '+ wf.low +'&deg;</div>';
					if (options.wind) html += '<div class="weatherWind">바람: '+ wd_a +' '+ feed.wind.speed + feed.units.speed +'</div>';
					if (options.humidity) html += '<div class="weatherHumidity">Humidity: '+ feed.atmosphere.humidity +'</div>';
					if (options.visibility) html += '<div class="weatherVisibility">Visibility: '+ feed.atmosphere.visibility +'</div>';
					if (options.sunrise) html += '<div class="weatherSunrise">Sunrise: '+ feed.astronomy.sunrise +'</div>';
					if (options.sunset) html += '<div class="weatherSunset">Sunset: '+ feed.astronomy.sunset +'</div>';

					// Add item forecast data
					if (options.forecast) {

						html += '<div class="weatherForecast">';

						var wfi = feed.item.forecast;

						for (var i=0; i<wfi.length; i++) {
							html += '<div class="weatherForecastItem" style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ wfi[i].code +'s.png); background-repeat: no-repeat;">';
							html += '<div class="weatherForecastDay">'+ wfi[i].day +'</div>';
							html += '<div class="weatherForecastDate">'+ wfi[i].date +'</div>';
							html += '<div class="weatherForecastText">'+ wfi[i].text +'</div>';
							html += '<div class="weatherForecastRange">High: '+ wfi[i].high +' Low: '+ wfi[i].low +'</div>';
							html += '</div>'
						}

						html += '</div>'
					}

					if (options.link) html += '<div class="weatherLink"><a href="'+ feed.link +'" target="'+ options.linktarget +'" title="Read full forecast">Full forecast</a></div>';

				} else {
					var html = '<div class="weatherItem '+ row +'">';
					html += '<div class="weatherError">City not found</div>';
				}

				html += '</div>';

				// Alternate row classes
				if (row == 'odd') { row = 'even'; } else { row = 'odd';	}

				$e.append(html);
			};

			// Get time string as date
			var _getTimeAsDate = function(t) {

				d = new Date();
				r = new Date(d.toDateString() +' '+ t);

				return r;
			};

		});
	};

})(jQuery);
