// import data file
document.writeln("<script type='text/javascript' src='/javascripts/lib/environ.js'></script>");

$(function () {

    // var MARG_LAST_SEASON_WEEKDAY = [{"new_index_weekDAY":1,"computer":0.4121,"light":0.2318,"hvac":0.5553,"etc":0.0467,"total":1.2458},{"new_index_weekDAY":2,"computer":0.4055,"light":0.2316,"hvac":0.6154,"etc":0.0439,"total":1.2964},{"new_index_weekDAY":3,"computer":0.3982,"light":0.2264,"hvac":0.5851,"etc":0.0464,"total":1.2561},{"new_index_weekDAY":4,"computer":0.3952,"light":0.2129,"hvac":0.5175,"etc":0.0443,"total":1.17},{"new_index_weekDAY":5,"computer":0.3893,"light":0.2115,"hvac":0.4305,"etc":0.0474,"total":1.0786},{"new_index_weekDAY":6,"computer":0.3805,"light":0.2043,"hvac":0.3425,"etc":0.0434,"total":0.9707},{"new_index_weekDAY":7,"computer":0.3733,"light":0.1982,"hvac":0.3405,"etc":0.0447,"total":0.9567},{"new_index_weekDAY":8,"computer":0.3616,"light":0.1931,"hvac":0.3652,"etc":0.0457,"total":0.9656},{"new_index_weekDAY":9,"computer":0.3512,"light":0.1895,"hvac":0.2547,"etc":0.0471,"total":0.8425},{"new_index_weekDAY":10,"computer":0.344,"light":0.1735,"hvac":0.2108,"etc":0.0463,"total":0.7745},{"new_index_weekDAY":11,"computer":0.3381,"light":0.1619,"hvac":0.182,"etc":0.0463,"total":0.7283},{"new_index_weekDAY":12,"computer":0.3291,"light":0.1334,"hvac":0.1983,"etc":0.0447,"total":0.7055},{"new_index_weekDAY":13,"computer":0.3364,"light":0.1243,"hvac":0.2252,"etc":0.0438,"total":0.7295},{"new_index_weekDAY":14,"computer":0.3353,"light":0.1148,"hvac":0.2137,"etc":0.0399,"total":0.7037},{"new_index_weekDAY":15,"computer":0.3246,"light":0.1019,"hvac":0.2328,"etc":0.0382,"total":0.6975},{"new_index_weekDAY":16,"computer":0.3152,"light":0.0924,"hvac":0.3063,"etc":0.0407,"total":0.7546},{"new_index_weekDAY":17,"computer":0.312,"light":0.0919,"hvac":0.2991,"etc":0.043,"total":0.746},{"new_index_weekDAY":18,"computer":0.3084,"light":0.0797,"hvac":0.2634,"etc":0.0434,"total":0.6948},{"new_index_weekDAY":19,"computer":0.306,"light":0.0699,"hvac":0.1984,"etc":0.0422,"total":0.6163},{"new_index_weekDAY":20,"computer":0.3026,"light":0.0568,"hvac":0.2151,"etc":0.0431,"total":0.6175},{"new_index_weekDAY":21,"computer":0.2997,"light":0.0513,"hvac":0.211,"etc":0.0418,"total":0.6037},{"new_index_weekDAY":22,"computer":0.2978,"light":0.047,"hvac":0.2461,"etc":0.0419,"total":0.6328},{"new_index_weekDAY":23,"computer":0.2961,"light":0.043,"hvac":0.2555,"etc":0.0393,"total":0.6339},{"new_index_weekDAY":24,"computer":0.2954,"light":0.0428,"hvac":0.255,"etc":0.0404,"total":0.6336},{"new_index_weekDAY":25,"computer":0.2926,"light":0.0427,"hvac":0.2574,"etc":0.0389,"total":0.6317},{"new_index_weekDAY":26,"computer":0.2921,"light":0.0422,"hvac":0.2557,"etc":0.039,"total":0.629},{"new_index_weekDAY":27,"computer":0.2925,"light":0.0421,"hvac":0.2705,"etc":0.041,"total":0.6461},{"new_index_weekDAY":28,"computer":0.2922,"light":0.0425,"hvac":0.2702,"etc":0.0492,"total":0.6541},{"new_index_weekDAY":29,"computer":0.2919,"light":0.0444,"hvac":0.2262,"etc":0.046,"total":0.6085},{"new_index_weekDAY":30,"computer":0.292,"light":0.041,"hvac":0.2202,"etc":0.0463,"total":0.5994},{"new_index_weekDAY":31,"computer":0.2919,"light":0.04,"hvac":0.2197,"etc":0.0454,"total":0.5969},{"new_index_weekDAY":32,"computer":0.2932,"light":0.0403,"hvac":0.2485,"etc":0.0454,"total":0.6275},{"new_index_weekDAY":33,"computer":0.2998,"light":0.0526,"hvac":0.3447,"etc":0.0416,"total":0.7387},{"new_index_weekDAY":34,"computer":0.3041,"light":0.0571,"hvac":0.2513,"etc":0.0452,"total":0.6577},{"new_index_weekDAY":35,"computer":0.3064,"light":0.0597,"hvac":0.266,"etc":0.0445,"total":0.6766},{"new_index_weekDAY":36,"computer":0.3112,"light":0.0701,"hvac":0.2712,"etc":0.0442,"total":0.6966},{"new_index_weekDAY":37,"computer":0.317,"light":0.0859,"hvac":0.2643,"etc":0.0456,"total":0.7129},{"new_index_weekDAY":38,"computer":0.3222,"light":0.095,"hvac":0.2412,"etc":0.0463,"total":0.7046},{"new_index_weekDAY":39,"computer":0.3318,"light":0.1047,"hvac":0.2872,"etc":0.0487,"total":0.7723},{"new_index_weekDAY":40,"computer":0.3453,"light":0.1084,"hvac":0.1749,"etc":0.048,"total":0.6766},{"new_index_weekDAY":41,"computer":0.3647,"light":0.1157,"hvac":0.1687,"etc":0.0523,"total":0.7014},{"new_index_weekDAY":42,"computer":0.3714,"light":0.1188,"hvac":0.1213,"etc":0.0505,"total":0.6621},{"new_index_weekDAY":43,"computer":0.376,"light":0.1181,"hvac":0.1641,"etc":0.0472,"total":0.7054},{"new_index_weekDAY":44,"computer":0.38,"light":0.1172,"hvac":0.1633,"etc":0.0481,"total":0.7087},{"new_index_weekDAY":45,"computer":0.3845,"light":0.1164,"hvac":0.2441,"etc":0.0487,"total":0.7938},{"new_index_weekDAY":46,"computer":0.3942,"light":0.1228,"hvac":0.2716,"etc":0.0503,"total":0.8389},{"new_index_weekDAY":47,"computer":0.4051,"light":0.1267,"hvac":0.3314,"etc":0.0491,"total":0.9123},{"new_index_weekDAY":48,"computer":0.4111,"light":0.1292,"hvac":0.3041,"etc":0.0518,"total":0.8962},{"new_index_weekDAY":49,"computer":0.4048,"light":0.1311,"hvac":0.1976,"etc":0.0483,"total":0.7818},{"new_index_weekDAY":50,"computer":0.3857,"light":0.1333,"hvac":0.1664,"etc":0.0495,"total":0.7348},{"new_index_weekDAY":51,"computer":0.3742,"light":0.1331,"hvac":0.1168,"etc":0.0479,"total":0.6719},{"new_index_weekDAY":52,"computer":0.3892,"light":0.1387,"hvac":0.0849,"etc":0.0542,"total":0.667},{"new_index_weekDAY":53,"computer":0.4112,"light":0.1492,"hvac":0.0495,"etc":0.0648,"total":0.6747},{"new_index_weekDAY":54,"computer":0.4356,"light":0.1557,"hvac":0.038,"etc":0.07,"total":0.6993},{"new_index_weekDAY":55,"computer":0.452,"light":0.1631,"hvac":0.0335,"etc":0.0661,"total":0.7148},{"new_index_weekDAY":56,"computer":0.4703,"light":0.1766,"hvac":0.0369,"etc":0.0578,"total":0.7415},{"new_index_weekDAY":57,"computer":0.4794,"light":0.1851,"hvac":0.0705,"etc":0.0594,"total":0.7943},{"new_index_weekDAY":58,"computer":0.4829,"light":0.1876,"hvac":0.0407,"etc":0.0537,"total":0.7648},{"new_index_weekDAY":59,"computer":0.4845,"light":0.1884,"hvac":0.0674,"etc":0.0536,"total":0.7938},{"new_index_weekDAY":60,"computer":0.4974,"light":0.1973,"hvac":0.0612,"etc":0.0523,"total":0.8082},{"new_index_weekDAY":61,"computer":0.498,"light":0.2022,"hvac":0.0255,"etc":0.0529,"total":0.7786},{"new_index_weekDAY":62,"computer":0.5055,"light":0.2074,"hvac":0.0551,"etc":0.0555,"total":0.8236},{"new_index_weekDAY":63,"computer":0.5145,"light":0.2111,"hvac":0.0466,"etc":0.0605,"total":0.8328},{"new_index_weekDAY":64,"computer":0.5146,"light":0.2125,"hvac":0.0616,"etc":0.0594,"total":0.8481},{"new_index_weekDAY":65,"computer":0.5106,"light":0.2134,"hvac":0.0859,"etc":0.0612,"total":0.8711},{"new_index_weekDAY":66,"computer":0.5051,"light":0.2133,"hvac":0.1202,"etc":0.0636,"total":0.9022},{"new_index_weekDAY":67,"computer":0.4928,"light":0.2112,"hvac":0.0611,"etc":0.0578,"total":0.8229},{"new_index_weekDAY":68,"computer":0.4884,"light":0.2147,"hvac":0.0609,"etc":0.0542,"total":0.8183},{"new_index_weekDAY":69,"computer":0.4979,"light":0.2253,"hvac":0.0771,"etc":0.0574,"total":0.8577},{"new_index_weekDAY":70,"computer":0.4838,"light":0.2256,"hvac":0.0529,"etc":0.0516,"total":0.8138},{"new_index_weekDAY":71,"computer":0.4739,"light":0.2202,"hvac":0.0358,"etc":0.0522,"total":0.7821},{"new_index_weekDAY":72,"computer":0.4648,"light":0.2234,"hvac":0.0811,"etc":0.0529,"total":0.8223},{"new_index_weekDAY":73,"computer":0.4392,"light":0.2237,"hvac":0.0916,"etc":0.055,"total":0.8095},{"new_index_weekDAY":74,"computer":0.3998,"light":0.2224,"hvac":0.0497,"etc":0.0559,"total":0.7278},{"new_index_weekDAY":75,"computer":0.3814,"light":0.2268,"hvac":0.0774,"etc":0.0541,"total":0.7397},{"new_index_weekDAY":76,"computer":0.3885,"light":0.2319,"hvac":0.0648,"etc":0.0572,"total":0.7424},{"new_index_weekDAY":77,"computer":0.4019,"light":0.2334,"hvac":0.135,"etc":0.0625,"total":0.8328},{"new_index_weekDAY":78,"computer":0.4003,"light":0.2326,"hvac":0.1916,"etc":0.0546,"total":0.8791},{"new_index_weekDAY":79,"computer":0.3957,"light":0.2317,"hvac":0.2004,"etc":0.051,"total":0.8788},{"new_index_weekDAY":80,"computer":0.3912,"light":0.2286,"hvac":0.1029,"etc":0.0541,"total":0.7768},{"new_index_weekDAY":81,"computer":0.4001,"light":0.2367,"hvac":0.2411,"etc":0.0524,"total":0.9303},{"new_index_weekDAY":82,"computer":0.403,"light":0.2366,"hvac":0.282,"etc":0.0524,"total":0.9741},{"new_index_weekDAY":83,"computer":0.4061,"light":0.2373,"hvac":0.386,"etc":0.0497,"total":1.0791},{"new_index_weekDAY":84,"computer":0.4079,"light":0.2379,"hvac":0.3239,"etc":0.0507,"total":1.0204},{"new_index_weekDAY":85,"computer":0.4146,"light":0.2393,"hvac":0.3733,"etc":0.0483,"total":1.0754},{"new_index_weekDAY":86,"computer":0.419,"light":0.2416,"hvac":0.4657,"etc":0.0494,"total":1.1756},{"new_index_weekDAY":87,"computer":0.423,"light":0.244,"hvac":0.4076,"etc":0.05,"total":1.1246},{"new_index_weekDAY":88,"computer":0.4184,"light":0.2387,"hvac":0.2558,"etc":0.0495,"total":0.9625},{"new_index_weekDAY":89,"computer":0.4189,"light":0.2357,"hvac":0.2934,"etc":0.046,"total":0.994},{"new_index_weekDAY":90,"computer":0.4152,"light":0.2369,"hvac":0.2907,"etc":0.0462,"total":0.989},{"new_index_weekDAY":91,"computer":0.4221,"light":0.2366,"hvac":0.3377,"etc":0.0489,"total":1.0452},{"new_index_weekDAY":92,"computer":0.4243,"light":0.2319,"hvac":0.3311,"etc":0.0465,"total":1.0337},{"new_index_weekDAY":93,"computer":0.4202,"light":0.2319,"hvac":0.3998,"etc":0.0462,"total":1.0981},{"new_index_weekDAY":94,"computer":0.4142,"light":0.2319,"hvac":0.4184,"etc":0.048,"total":1.1125},{"new_index_weekDAY":95,"computer":0.4091,"light":0.2285,"hvac":0.4357,"etc":0.049,"total":1.1224},{"new_index_weekDAY":96,"computer":0.4062,"light":0.2283,"hvac":0.4761,"etc":0.0455,"total":1.1561}];
    // var MARG_LAST_SEASON_WEEKEND = [{"new_index_weekEND":1,"computer":0.3169,"light":0.1473,"hvac":0.3769,"etc":0.0442,"total":0.8853},{"new_index_weekEND":2,"computer":0.3107,"light":0.1469,"hvac":0.378,"etc":0.0436,"total":0.8791},{"new_index_weekEND":3,"computer":0.3083,"light":0.1444,"hvac":0.3338,"etc":0.0443,"total":0.8309},{"new_index_weekEND":4,"computer":0.3065,"light":0.1319,"hvac":0.4362,"etc":0.0462,"total":0.9208},{"new_index_weekEND":5,"computer":0.3037,"light":0.1278,"hvac":0.4183,"etc":0.048,"total":0.8977},{"new_index_weekEND":6,"computer":0.3009,"light":0.1086,"hvac":0.5205,"etc":0.0452,"total":0.9753},{"new_index_weekEND":7,"computer":0.3007,"light":0.1086,"hvac":0.5198,"etc":0.0493,"total":0.9783},{"new_index_weekEND":8,"computer":0.2999,"light":0.1083,"hvac":0.5196,"etc":0.0452,"total":0.973},{"new_index_weekEND":9,"computer":0.3013,"light":0.1064,"hvac":0.5198,"etc":0.0458,"total":0.9734},{"new_index_weekEND":10,"computer":0.2989,"light":0.1059,"hvac":0.5149,"etc":0.0439,"total":0.9637},{"new_index_weekEND":11,"computer":0.2974,"light":0.1008,"hvac":0.4674,"etc":0.0452,"total":0.9106},{"new_index_weekEND":12,"computer":0.296,"light":0.1008,"hvac":0.4476,"etc":0.0458,"total":0.8904},{"new_index_weekEND":13,"computer":0.2991,"light":0.0964,"hvac":0.3503,"etc":0.043,"total":0.7888},{"new_index_weekEND":14,"computer":0.2967,"light":0.0844,"hvac":0.2022,"etc":0.0463,"total":0.6295},{"new_index_weekEND":15,"computer":0.2995,"light":0.0678,"hvac":0.1309,"etc":0.0481,"total":0.5462},{"new_index_weekEND":16,"computer":0.294,"light":0.0679,"hvac":0.158,"etc":0.0479,"total":0.5678},{"new_index_weekEND":17,"computer":0.2907,"light":0.0595,"hvac":0.2816,"etc":0.0436,"total":0.6754},{"new_index_weekEND":18,"computer":0.2917,"light":0.0593,"hvac":0.289,"etc":0.0439,"total":0.6839},{"new_index_weekEND":19,"computer":0.2927,"light":0.0593,"hvac":0.2889,"etc":0.0423,"total":0.6832},{"new_index_weekEND":20,"computer":0.2899,"light":0.0593,"hvac":0.2891,"etc":0.0447,"total":0.683},{"new_index_weekEND":21,"computer":0.2864,"light":0.0496,"hvac":0.2518,"etc":0.0428,"total":0.6307},{"new_index_weekEND":22,"computer":0.2858,"light":0.0422,"hvac":0.2511,"etc":0.0443,"total":0.6234},{"new_index_weekEND":23,"computer":0.2872,"light":0.0411,"hvac":0.251,"etc":0.0462,"total":0.6255},{"new_index_weekEND":24,"computer":0.2875,"light":0.0412,"hvac":0.2087,"etc":0.0445,"total":0.5819},{"new_index_weekEND":25,"computer":0.2863,"light":0.0278,"hvac":0.0438,"etc":0.0439,"total":0.4017},{"new_index_weekEND":26,"computer":0.2844,"light":0.0238,"hvac":0.0097,"etc":0.045,"total":0.3629},{"new_index_weekEND":27,"computer":0.2813,"light":0.0238,"hvac":0.0097,"etc":0.0411,"total":0.3559},{"new_index_weekEND":28,"computer":0.2795,"light":0.0238,"hvac":0.0097,"etc":0.0431,"total":0.3561},{"new_index_weekEND":29,"computer":0.2797,"light":0.0238,"hvac":0.0096,"etc":0.0397,"total":0.3528},{"new_index_weekEND":30,"computer":0.2793,"light":0.0238,"hvac":0.0097,"etc":0.0434,"total":0.3562},{"new_index_weekEND":31,"computer":0.2803,"light":0.0222,"hvac":0.0096,"etc":0.0446,"total":0.3568},{"new_index_weekEND":32,"computer":0.2816,"light":0.0198,"hvac":0.0096,"etc":0.0442,"total":0.3552},{"new_index_weekEND":33,"computer":0.283,"light":0.0198,"hvac":0.0096,"etc":0.0448,"total":0.3573},{"new_index_weekEND":34,"computer":0.2826,"light":0.0197,"hvac":0.0096,"etc":0.0434,"total":0.3553},{"new_index_weekEND":35,"computer":0.2823,"light":0.0197,"hvac":0.0096,"etc":0.0415,"total":0.3531},{"new_index_weekEND":36,"computer":0.2825,"light":0.0197,"hvac":0.0096,"etc":0.0433,"total":0.3551},{"new_index_weekEND":37,"computer":0.2819,"light":0.0196,"hvac":0.0096,"etc":0.0418,"total":0.3529},{"new_index_weekEND":38,"computer":0.2806,"light":0.0196,"hvac":0.0095,"etc":0.0382,"total":0.348},{"new_index_weekEND":39,"computer":0.2814,"light":0.0195,"hvac":0.0095,"etc":0.0385,"total":0.3489},{"new_index_weekEND":40,"computer":0.2821,"light":0.0211,"hvac":0.0095,"etc":0.0427,"total":0.3554},{"new_index_weekEND":41,"computer":0.2837,"light":0.021,"hvac":0.0095,"etc":0.0452,"total":0.3593},{"new_index_weekEND":42,"computer":0.2864,"light":0.0195,"hvac":0.0095,"etc":0.0451,"total":0.3606},{"new_index_weekEND":43,"computer":0.2862,"light":0.0195,"hvac":0.0095,"etc":0.0438,"total":0.359},{"new_index_weekEND":44,"computer":0.2864,"light":0.0219,"hvac":0.0095,"etc":0.0425,"total":0.3603},{"new_index_weekEND":45,"computer":0.2782,"light":0.0258,"hvac":0.0091,"etc":0.0383,"total":0.3514},{"new_index_weekEND":46,"computer":0.2895,"light":0.0273,"hvac":0.0095,"etc":0.0412,"total":0.3676},{"new_index_weekEND":47,"computer":0.2961,"light":0.0273,"hvac":0.0095,"etc":0.0389,"total":0.3719},{"new_index_weekEND":48,"computer":0.2966,"light":0.0254,"hvac":0.0095,"etc":0.04,"total":0.3715},{"new_index_weekEND":49,"computer":0.2925,"light":0.0211,"hvac":0.0095,"etc":0.0398,"total":0.363},{"new_index_weekEND":50,"computer":0.2914,"light":0.0211,"hvac":0.0095,"etc":0.0426,"total":0.3645},{"new_index_weekEND":51,"computer":0.2931,"light":0.0211,"hvac":0.0095,"etc":0.0421,"total":0.3658},{"new_index_weekEND":52,"computer":0.2961,"light":0.021,"hvac":0.0095,"etc":0.0452,"total":0.3719},{"new_index_weekEND":53,"computer":0.2952,"light":0.0245,"hvac":0.0095,"etc":0.0428,"total":0.372},{"new_index_weekEND":54,"computer":0.2978,"light":0.0285,"hvac":0.0095,"etc":0.0415,"total":0.3774},{"new_index_weekEND":55,"computer":0.3012,"light":0.0347,"hvac":0.0095,"etc":0.0426,"total":0.388},{"new_index_weekEND":56,"computer":0.2983,"light":0.0378,"hvac":0.0095,"etc":0.0434,"total":0.3891},{"new_index_weekEND":57,"computer":0.299,"light":0.0443,"hvac":0.0095,"etc":0.0423,"total":0.3952},{"new_index_weekEND":58,"computer":0.3014,"light":0.0552,"hvac":0.12,"etc":0.0444,"total":0.5209},{"new_index_weekEND":59,"computer":0.3042,"light":0.0656,"hvac":0.1239,"etc":0.0458,"total":0.5395},{"new_index_weekEND":60,"computer":0.3112,"light":0.0786,"hvac":0.0888,"etc":0.0444,"total":0.5229},{"new_index_weekEND":61,"computer":0.3112,"light":0.099,"hvac":0.0441,"etc":0.0467,"total":0.5009},{"new_index_weekEND":62,"computer":0.3098,"light":0.0998,"hvac":0.0468,"etc":0.0473,"total":0.5036},{"new_index_weekEND":63,"computer":0.3137,"light":0.102,"hvac":0.0671,"etc":0.0451,"total":0.5279},{"new_index_weekEND":64,"computer":0.3124,"light":0.1095,"hvac":0.2852,"etc":0.0431,"total":0.7502},{"new_index_weekEND":65,"computer":0.3118,"light":0.1161,"hvac":0.3818,"etc":0.0428,"total":0.8526},{"new_index_weekEND":66,"computer":0.3139,"light":0.1155,"hvac":0.3137,"etc":0.0398,"total":0.783},{"new_index_weekEND":67,"computer":0.317,"light":0.1243,"hvac":0.5818,"etc":0.0404,"total":1.0635},{"new_index_weekEND":68,"computer":0.3204,"light":0.1289,"hvac":0.6317,"etc":0.0366,"total":1.1177},{"new_index_weekEND":69,"computer":0.3189,"light":0.1381,"hvac":0.6329,"etc":0.0416,"total":1.1314},{"new_index_weekEND":70,"computer":0.3151,"light":0.1378,"hvac":0.5295,"etc":0.0391,"total":1.0216},{"new_index_weekEND":71,"computer":0.3203,"light":0.1352,"hvac":0.56,"etc":0.0429,"total":1.0584},{"new_index_weekEND":72,"computer":0.3176,"light":0.1273,"hvac":0.5573,"etc":0.0452,"total":1.0475},{"new_index_weekEND":73,"computer":0.3157,"light":0.1198,"hvac":0.4617,"etc":0.0447,"total":0.9419},{"new_index_weekEND":74,"computer":0.3154,"light":0.1235,"hvac":0.3892,"etc":0.0444,"total":0.8725},{"new_index_weekEND":75,"computer":0.3143,"light":0.1271,"hvac":0.2855,"etc":0.0452,"total":0.7721},{"new_index_weekEND":76,"computer":0.3167,"light":0.1225,"hvac":0.2315,"etc":0.0425,"total":0.7132},{"new_index_weekEND":77,"computer":0.3194,"light":0.1226,"hvac":0.3864,"etc":0.0435,"total":0.8718},{"new_index_weekEND":78,"computer":0.3192,"light":0.1294,"hvac":0.6256,"etc":0.0425,"total":1.1167},{"new_index_weekEND":79,"computer":0.316,"light":0.1315,"hvac":0.5161,"etc":0.0418,"total":1.0054},{"new_index_weekEND":80,"computer":0.3159,"light":0.1426,"hvac":0.7418,"etc":0.0433,"total":1.2436},{"new_index_weekEND":81,"computer":0.3189,"light":0.1517,"hvac":0.7437,"etc":0.04,"total":1.2543},{"new_index_weekEND":82,"computer":0.3171,"light":0.1633,"hvac":0.7666,"etc":0.0433,"total":1.2903},{"new_index_weekEND":83,"computer":0.3152,"light":0.15,"hvac":0.776,"etc":0.0412,"total":1.2824},{"new_index_weekEND":84,"computer":0.3175,"light":0.1549,"hvac":0.7955,"etc":0.0448,"total":1.3127},{"new_index_weekEND":85,"computer":0.3165,"light":0.1464,"hvac":0.7881,"etc":0.0408,"total":1.2917},{"new_index_weekEND":86,"computer":0.318,"light":0.1447,"hvac":0.7353,"etc":0.0419,"total":1.2399},{"new_index_weekEND":87,"computer":0.3185,"light":0.1455,"hvac":0.6723,"etc":0.0397,"total":1.1761},{"new_index_weekEND":88,"computer":0.3207,"light":0.1456,"hvac":0.6447,"etc":0.0414,"total":1.1525},{"new_index_weekEND":89,"computer":0.3244,"light":0.1439,"hvac":0.6707,"etc":0.0387,"total":1.1777},{"new_index_weekEND":90,"computer":0.3236,"light":0.1431,"hvac":0.7723,"etc":0.0461,"total":1.2851},{"new_index_weekEND":91,"computer":0.3222,"light":0.1427,"hvac":0.9319,"etc":0.0444,"total":1.4412},{"new_index_weekEND":92,"computer":0.3202,"light":0.1505,"hvac":0.8165,"etc":0.045,"total":1.3323},{"new_index_weekEND":93,"computer":0.3219,"light":0.1478,"hvac":0.4765,"etc":0.0418,"total":0.9879},{"new_index_weekEND":94,"computer":0.3233,"light":0.1518,"hvac":0.4677,"etc":0.0482,"total":0.991},{"new_index_weekEND":95,"computer":0.3257,"light":0.1484,"hvac":0.3727,"etc":0.0438,"total":0.8906},{"new_index_weekEND":96,"computer":0.3274,"light":0.1448,"hvac":0.3891,"etc":0.0456,"total":0.9071}];

    // var lastSesaon_total = [];
    var lastSesaon_hvac  = [];
    var lastSesaon_com   = [];
    var lastSesaon_light = [];
    // var lastSesaon_etc   = [];
    //
    // var today_total = [];
    var today_hvac  = [];
    var today_com   = [];
    var today_light = [];
    // var today_etc   = [];
    //
    // var savingRateComparison;
    //
    // var comparing_breakdownColors = ['#b3d5c8', '#f5e0b3', '#e8c2c1', '#d3bdd1']; //com, light, hvac, etc
    // var today_breakdownColors = ['#7db19f', '#eecf8d', '#f3a3a1', '#a889a5'];

    var nowText = "";

    // 1. Last Winter
    if(weekDay_Indicator == 1){
      TARGET = MARG_LAST_SEASON_WEEKDAY;
    } else {
      TARGET = MARG_LAST_SEASON_WEEKEND;
    }

    // console.log(TARGET[0]);
    // console.log(TARGET.length);
    // console.log(TARGET[0].computer);

    for(var index = 0; index < TARGET.length; index++){
      // {"new_index_weekDAY":1,"computer":0.4121,"light":0.2318,"hvac":0.5553,"etc":0.0467,"total":1.2458}

      // total = TARGET[index].total;
      hvac  = TARGET[index].hvac;
      com   = TARGET[index].computer;
      light = TARGET[index].light;
      // etc   = TARGET[index].etc;

      // lastSesaon_total.push(Number(total.toFixed(2)));
      lastSesaon_hvac.push(Number(hvac.toFixed(2)));
      lastSesaon_com.push(Number(com.toFixed(2)));
      lastSesaon_light.push(Number(light.toFixed(2)));
      // lastSesaon_etc.push(Number(etc.toFixed(2)));
    }

    // var lastSesaon_totalSum = limitedArraySum(lastSesaon_total, 96)

    // console.log("lastSesaon_total",lastSesaon_total);

    // 2. Today
    invokeOpenAPI('api/labs/marg/energy/quarters.json', todayCB);

    function todayCB(today_) {
      today = today_;

      for(var index = 0; index < today.length; index++){
        // total = today[index].sum;
        hvac = accumulator(today[index], 'hvac');
        com  = accumulator(today[index], 'computer');
        light = accumulator(today[index], 'light');
        // etc = total - (hvac + com + light);

        // today_total.push(Number(total.toFixed(2)));
        today_hvac.push(Number(hvac.toFixed(2)));
        today_com.push(Number(com.toFixed(2)));
        today_light.push(Number(light.toFixed(2)));
        // today_etc.push(Number(etc.toFixed(2)));
      }

      if(today.length != 0) {
        nowText = (new Date(today[today.length-1].dateTo).getHours()) + ":";
        nowText_minute = new Date(today[today.length-1].dateTo).getMinutes();
        // console.log("month length:", nowText_minute));
        if (nowText_minute < 10) {
          nowText_minute = '0' + nowText_minute;
        }
        nowText = nowText + nowText_minute + " 기준";
      } else {
        nowText = "데이터가 충분하지 않습니다";
      }

      writeText();
    }


    // 3. write text
    function writeText(){
      var todayLength = today_com.length;

      //console.log("##########",limitedArraySum(lastSesaon_com,   todayLength)*COM_WEIGHT);

      var points_Com   = (limitedArraySum(lastSesaon_com,   todayLength) - limitedArraySum(today_com,   todayLength)).toFixed(0);
      var points_light = (limitedArraySum(lastSesaon_light, todayLength) - limitedArraySum(today_light, todayLength)).toFixed(0);
      var points_hvac  = (limitedArraySum(lastSesaon_hvac,  todayLength) - limitedArraySum(today_hvac,  todayLength)).toFixed(0);

      console.log(Number(points_Com), Number(points_light), Number(points_hvac));

      var savingText = (Number(points_Com) + Number(points_light) + Number(points_hvac));

      // savingText = 0;

      var sign="";
      if (savingText > 0) {
        sign="+";
        signColorCode = "#3e721f";
        $('#smiley').prepend('<img id="faces" src="./images/green_v2.png" width="110%"/>');
      } else if(savingText == 0) {
        sign="";
        signColorCode = "gray";
        // $('#smiley').prepend('<img id="faces" src="./images/red_v2.png" style="max-width: 100%; height: auto;"/>');
        $('#smiley').prepend('<img id="faces" src="./images/green_v2.png" width="110%"/>');
      } else {
        sign="";
        signColorCode = "#a50a0a";
        $('#smiley').prepend('<img id="faces" src="./images/red_v2.png" width="110%"/>');
      }

      var savingPoints=$("<div>").css({"font-size": "20px", "display" : "inline", "color": "gray"}).text('절전 점수');
      // var percentage_title2=$("<div>").attr("id","percentage_title").css({"font-size": "40px", "font-weight" : "bold", "color": currentColor, "display" : "inline", "text-shadow" : "1px 1px #000000"}).text(percent_smile+'pts ');
      var savingPoints2=$("<div>").css({"font-size": "100px", "font-weight" : "bold", "color": signColorCode, "display" : "inline"}).text(sign + savingText);
      var savingPoints3=$("<div>").css({"font-size": "30px", "font-weight" : "bold", "color": signColorCode, "display" : "inline"}).text(' 점');

      $('#saving_points').append(savingPoints2).append(savingPoints3).append("<br><br>").append(savingPoints);
      $('#title_nowText').append(nowText);

      $('#triangle').prepend('<img src="./images/triangle.png" height: auto;"/>');
  }
});
