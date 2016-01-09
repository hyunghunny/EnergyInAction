$(function () {

  var LAST_WINTER_WEEKDAY = [{"new_index_weekDAY":1,"computer":0.0924,"light":0.147,"hvac":0.0033,"etc":0.0343,"total":0.2771},{"new_index_weekDAY":2,"computer":0.0868,"light":0.1353,"hvac":0.0034,"etc":0.0278,"total":0.2533},{"new_index_weekDAY":3,"computer":0.0861,"light":0.1209,"hvac":0.0035,"etc":0.0266,"total":0.2372},{"new_index_weekDAY":4,"computer":0.0924,"light":0.1093,"hvac":0.0031,"etc":0.0265,"total":0.2313},{"new_index_weekDAY":5,"computer":0.092,"light":0.1083,"hvac":0.0019,"etc":0.0264,"total":0.2286},{"new_index_weekDAY":6,"computer":0.0945,"light":0.1095,"hvac":0.0021,"etc":0.0279,"total":0.2339},{"new_index_weekDAY":7,"computer":0.0939,"light":0.1085,"hvac":0.0021,"etc":0.0271,"total":0.2316},{"new_index_weekDAY":8,"computer":0.0928,"light":0.1031,"hvac":0.0021,"etc":0.0263,"total":0.2243},{"new_index_weekDAY":9,"computer":0.0918,"light":0.0924,"hvac":0.0021,"etc":0.0261,"total":0.2125},{"new_index_weekDAY":10,"computer":0.092,"light":0.0849,"hvac":0.0023,"etc":0.0262,"total":0.2053},{"new_index_weekDAY":11,"computer":0.0964,"light":0.0788,"hvac":0.0025,"etc":0.026,"total":0.2037},{"new_index_weekDAY":12,"computer":0.0992,"light":0.0717,"hvac":0.0024,"etc":0.0261,"total":0.1995},{"new_index_weekDAY":13,"computer":0.0956,"light":0.0672,"hvac":0.0018,"etc":0.0316,"total":0.1962},{"new_index_weekDAY":14,"computer":0.0954,"light":0.0572,"hvac":0.002,"etc":0.033,"total":0.1875},{"new_index_weekDAY":15,"computer":0.0941,"light":0.0526,"hvac":0.0021,"etc":0.0326,"total":0.1815},{"new_index_weekDAY":16,"computer":0.0928,"light":0.0497,"hvac":0.0023,"etc":0.03,"total":0.1748},{"new_index_weekDAY":17,"computer":0.0877,"light":0.049,"hvac":0.0023,"etc":0.0286,"total":0.1676},{"new_index_weekDAY":18,"computer":0.0918,"light":0.049,"hvac":0.0024,"etc":0.0285,"total":0.1717},{"new_index_weekDAY":19,"computer":0.0919,"light":0.0489,"hvac":0.0026,"etc":0.0284,"total":0.1719},{"new_index_weekDAY":20,"computer":0.0848,"light":0.0437,"hvac":0.0025,"etc":0.0293,"total":0.1603},{"new_index_weekDAY":21,"computer":0.0806,"light":0.0373,"hvac":0.0023,"etc":0.0315,"total":0.1518},{"new_index_weekDAY":22,"computer":0.0778,"light":0.0367,"hvac":0.0024,"etc":0.0314,"total":0.1483},{"new_index_weekDAY":23,"computer":0.0776,"light":0.034,"hvac":0.0024,"etc":0.0314,"total":0.1454},{"new_index_weekDAY":24,"computer":0.0801,"light":0.0335,"hvac":0.0023,"etc":0.0314,"total":0.1474},{"new_index_weekDAY":25,"computer":0.0807,"light":0.0325,"hvac":0.0024,"etc":0.0314,"total":0.1471},{"new_index_weekDAY":26,"computer":0.0792,"light":0.032,"hvac":0.0024,"etc":0.0316,"total":0.1452},{"new_index_weekDAY":27,"computer":0.0812,"light":0.0317,"hvac":0.0026,"etc":0.0317,"total":0.1472},{"new_index_weekDAY":28,"computer":0.0814,"light":0.031,"hvac":0.0025,"etc":0.0311,"total":0.146},{"new_index_weekDAY":29,"computer":0.0802,"light":0.0316,"hvac":0.0025,"etc":0.0314,"total":0.1457},{"new_index_weekDAY":30,"computer":0.0806,"light":0.0314,"hvac":0.0025,"etc":0.0313,"total":0.1458},{"new_index_weekDAY":31,"computer":0.0815,"light":0.0314,"hvac":0.0025,"etc":0.0314,"total":0.1468},{"new_index_weekDAY":32,"computer":0.0833,"light":0.035,"hvac":0.0024,"etc":0.0334,"total":0.1541},{"new_index_weekDAY":33,"computer":0.0798,"light":0.0347,"hvac":0.0024,"etc":0.0428,"total":0.1596},{"new_index_weekDAY":34,"computer":0.0807,"light":0.0439,"hvac":0.0022,"etc":0.0507,"total":0.1775},{"new_index_weekDAY":35,"computer":0.0813,"light":0.0556,"hvac":0.0025,"etc":0.0434,"total":0.1827},{"new_index_weekDAY":36,"computer":0.0825,"light":0.0601,"hvac":0.0022,"etc":0.0429,"total":0.1878},{"new_index_weekDAY":37,"computer":0.0818,"light":0.0646,"hvac":0.0016,"etc":0.039,"total":0.187},{"new_index_weekDAY":38,"computer":0.0846,"light":0.0703,"hvac":0.0015,"etc":0.0345,"total":0.1909},{"new_index_weekDAY":39,"computer":0.0904,"light":0.0878,"hvac":0.0015,"etc":0.035,"total":0.2148},{"new_index_weekDAY":40,"computer":0.0992,"light":0.1142,"hvac":0.0015,"etc":0.0358,"total":0.2507},{"new_index_weekDAY":41,"computer":0.1177,"light":0.148,"hvac":0.0015,"etc":0.0356,"total":0.3028},{"new_index_weekDAY":42,"computer":0.1225,"light":0.1638,"hvac":0.0015,"etc":0.037,"total":0.3248},{"new_index_weekDAY":43,"computer":0.126,"light":0.1728,"hvac":0.0015,"etc":0.0362,"total":0.3365},{"new_index_weekDAY":44,"computer":0.1292,"light":0.177,"hvac":0.0015,"etc":0.0379,"total":0.3457},{"new_index_weekDAY":45,"computer":0.1283,"light":0.1858,"hvac":0.0015,"etc":0.0372,"total":0.3528},{"new_index_weekDAY":46,"computer":0.1302,"light":0.1943,"hvac":0.0015,"etc":0.0339,"total":0.3599},{"new_index_weekDAY":47,"computer":0.1259,"light":0.1985,"hvac":0.0015,"etc":0.0339,"total":0.3599},{"new_index_weekDAY":48,"computer":0.1282,"light":0.1992,"hvac":0.0015,"etc":0.0316,"total":0.3605},{"new_index_weekDAY":49,"computer":0.1245,"light":0.2017,"hvac":0.0015,"etc":0.0301,"total":0.3578},{"new_index_weekDAY":50,"computer":0.1267,"light":0.2091,"hvac":0.0015,"etc":0.0296,"total":0.3669},{"new_index_weekDAY":51,"computer":0.1176,"light":0.2048,"hvac":0.0015,"etc":0.0302,"total":0.3541},{"new_index_weekDAY":52,"computer":0.1163,"light":0.2108,"hvac":0.0015,"etc":0.0316,"total":0.3601},{"new_index_weekDAY":53,"computer":0.1196,"light":0.2202,"hvac":0.0015,"etc":0.0331,"total":0.3744},{"new_index_weekDAY":54,"computer":0.1214,"light":0.2279,"hvac":0.0015,"etc":0.0331,"total":0.3839},{"new_index_weekDAY":55,"computer":0.1257,"light":0.2313,"hvac":0.0015,"etc":0.0341,"total":0.3926},{"new_index_weekDAY":56,"computer":0.1359,"light":0.2437,"hvac":0.0017,"etc":0.0349,"total":0.4163},{"new_index_weekDAY":57,"computer":0.1434,"light":0.2537,"hvac":0.0017,"etc":0.0369,"total":0.4358},{"new_index_weekDAY":58,"computer":0.1485,"light":0.2516,"hvac":0.0018,"etc":0.0386,"total":0.4404},{"new_index_weekDAY":59,"computer":0.1463,"light":0.2545,"hvac":0.0017,"etc":0.0403,"total":0.4428},{"new_index_weekDAY":60,"computer":0.1407,"light":0.2513,"hvac":0.0017,"etc":0.0388,"total":0.4325},{"new_index_weekDAY":61,"computer":0.1469,"light":0.2517,"hvac":0.0017,"etc":0.0368,"total":0.4371},{"new_index_weekDAY":62,"computer":0.1478,"light":0.2556,"hvac":0.0018,"etc":0.0368,"total":0.442},{"new_index_weekDAY":63,"computer":0.1456,"light":0.255,"hvac":0.0017,"etc":0.0354,"total":0.4378},{"new_index_weekDAY":64,"computer":0.1429,"light":0.2529,"hvac":0.0017,"etc":0.0352,"total":0.4327},{"new_index_weekDAY":65,"computer":0.1441,"light":0.258,"hvac":0.0017,"etc":0.0369,"total":0.4407},{"new_index_weekDAY":66,"computer":0.147,"light":0.2611,"hvac":0.0017,"etc":0.0406,"total":0.4504},{"new_index_weekDAY":67,"computer":0.1411,"light":0.2611,"hvac":0.0017,"etc":0.0379,"total":0.4418},{"new_index_weekDAY":68,"computer":0.1368,"light":0.268,"hvac":0.0017,"etc":0.0354,"total":0.4419},{"new_index_weekDAY":69,"computer":0.1283,"light":0.2755,"hvac":0.0017,"etc":0.0346,"total":0.4401},{"new_index_weekDAY":70,"computer":0.1312,"light":0.2847,"hvac":0.0017,"etc":0.036,"total":0.4536},{"new_index_weekDAY":71,"computer":0.1258,"light":0.287,"hvac":0.0017,"etc":0.0371,"total":0.4516},{"new_index_weekDAY":72,"computer":0.1203,"light":0.2839,"hvac":0.0017,"etc":0.0347,"total":0.4407},{"new_index_weekDAY":73,"computer":0.111,"light":0.264,"hvac":0.0017,"etc":0.032,"total":0.4087},{"new_index_weekDAY":74,"computer":0.1046,"light":0.2543,"hvac":0.0021,"etc":0.0304,"total":0.3913},{"new_index_weekDAY":75,"computer":0.1026,"light":0.2444,"hvac":0.0026,"etc":0.0293,"total":0.3789},{"new_index_weekDAY":76,"computer":0.0978,"light":0.2279,"hvac":0.0031,"etc":0.0283,"total":0.3571},{"new_index_weekDAY":77,"computer":0.1019,"light":0.2256,"hvac":0.0032,"etc":0.0276,"total":0.3583},{"new_index_weekDAY":78,"computer":0.1004,"light":0.2287,"hvac":0.0032,"etc":0.0274,"total":0.3597},{"new_index_weekDAY":79,"computer":0.1031,"light":0.2307,"hvac":0.0041,"etc":0.0322,"total":0.3701},{"new_index_weekDAY":80,"computer":0.1008,"light":0.2301,"hvac":0.0047,"etc":0.0345,"total":0.3702},{"new_index_weekDAY":81,"computer":0.1038,"light":0.2288,"hvac":0.0047,"etc":0.0345,"total":0.3718},{"new_index_weekDAY":82,"computer":0.1116,"light":0.2241,"hvac":0.005,"etc":0.0372,"total":0.3779},{"new_index_weekDAY":83,"computer":0.1095,"light":0.2217,"hvac":0.0052,"etc":0.0396,"total":0.3761},{"new_index_weekDAY":84,"computer":0.1127,"light":0.2261,"hvac":0.0055,"etc":0.033,"total":0.3773},{"new_index_weekDAY":85,"computer":0.106,"light":0.2289,"hvac":0.006,"etc":0.0285,"total":0.3694},{"new_index_weekDAY":86,"computer":0.1059,"light":0.2275,"hvac":0.0061,"etc":0.0281,"total":0.3676},{"new_index_weekDAY":87,"computer":0.1044,"light":0.2116,"hvac":0.0065,"etc":0.0272,"total":0.3497},{"new_index_weekDAY":88,"computer":0.0966,"light":0.2034,"hvac":0.0072,"etc":0.0312,"total":0.3383},{"new_index_weekDAY":89,"computer":0.0971,"light":0.1935,"hvac":0.0072,"etc":0.0367,"total":0.3345},{"new_index_weekDAY":90,"computer":0.0969,"light":0.1921,"hvac":0.007,"etc":0.0393,"total":0.3353},{"new_index_weekDAY":91,"computer":0.0995,"light":0.1894,"hvac":0.0067,"etc":0.0397,"total":0.3352},{"new_index_weekDAY":92,"computer":0.099,"light":0.1817,"hvac":0.0054,"etc":0.04,"total":0.326},{"new_index_weekDAY":93,"computer":0.099,"light":0.179,"hvac":0.002,"etc":0.0386,"total":0.3186},{"new_index_weekDAY":94,"computer":0.1006,"light":0.171,"hvac":0.0022,"etc":0.0395,"total":0.3133},{"new_index_weekDAY":95,"computer":0.0995,"light":0.1547,"hvac":0.0024,"etc":0.0394,"total":0.2961},{"new_index_weekDAY":96,"computer":0.0947,"light":0.1546,"hvac":0.0031,"etc":0.0334,"total":0.2858}]
  var LAST_WINTER_WEEKEND = [{"new_index_weekEND":1,"computer":0.1001,"light":0.1194,"hvac":0.0032,"etc":0.0253,"total":0.248},{"new_index_weekEND":2,"computer":0.0995,"light":0.1098,"hvac":0.0033,"etc":0.0256,"total":0.2383},{"new_index_weekEND":3,"computer":0.0986,"light":0.101,"hvac":0.0031,"etc":0.0252,"total":0.2279},{"new_index_weekEND":4,"computer":0.0959,"light":0.0944,"hvac":0.003,"etc":0.0251,"total":0.2185},{"new_index_weekEND":5,"computer":0.0906,"light":0.0822,"hvac":0.0016,"etc":0.0252,"total":0.1995},{"new_index_weekEND":6,"computer":0.0873,"light":0.0739,"hvac":0.0017,"etc":0.0252,"total":0.1881},{"new_index_weekEND":7,"computer":0.0826,"light":0.0742,"hvac":0.002,"etc":0.0253,"total":0.1841},{"new_index_weekEND":8,"computer":0.0903,"light":0.0739,"hvac":0.0027,"etc":0.0252,"total":0.1921},{"new_index_weekEND":9,"computer":0.0863,"light":0.074,"hvac":0.0028,"etc":0.0255,"total":0.1886},{"new_index_weekEND":10,"computer":0.0901,"light":0.0739,"hvac":0.0033,"etc":0.0272,"total":0.1944},{"new_index_weekEND":11,"computer":0.0903,"light":0.0741,"hvac":0.0041,"etc":0.0253,"total":0.1938},{"new_index_weekEND":12,"computer":0.0867,"light":0.0739,"hvac":0.004,"etc":0.0256,"total":0.1902},{"new_index_weekEND":13,"computer":0.0926,"light":0.0775,"hvac":0.0015,"etc":0.0276,"total":0.1992},{"new_index_weekEND":14,"computer":0.0898,"light":0.0632,"hvac":0.0024,"etc":0.0285,"total":0.184},{"new_index_weekEND":15,"computer":0.0875,"light":0.0481,"hvac":0.0028,"etc":0.0274,"total":0.1659},{"new_index_weekEND":16,"computer":0.081,"light":0.0476,"hvac":0.0025,"etc":0.0268,"total":0.1578},{"new_index_weekEND":17,"computer":0.0811,"light":0.0434,"hvac":0.0025,"etc":0.0262,"total":0.1531},{"new_index_weekEND":18,"computer":0.0846,"light":0.0425,"hvac":0.0025,"etc":0.026,"total":0.1557},{"new_index_weekEND":19,"computer":0.0856,"light":0.043,"hvac":0.0025,"etc":0.026,"total":0.157},{"new_index_weekEND":20,"computer":0.0793,"light":0.0428,"hvac":0.0025,"etc":0.026,"total":0.1505},{"new_index_weekEND":21,"computer":0.0764,"light":0.0427,"hvac":0.0025,"etc":0.026,"total":0.1476},{"new_index_weekEND":22,"computer":0.0832,"light":0.0287,"hvac":0.0025,"etc":0.0261,"total":0.1404},{"new_index_weekEND":23,"computer":0.0858,"light":0.0272,"hvac":0.0025,"etc":0.026,"total":0.1415},{"new_index_weekEND":24,"computer":0.0777,"light":0.0273,"hvac":0.0025,"etc":0.026,"total":0.1335},{"new_index_weekEND":25,"computer":0.0768,"light":0.0283,"hvac":0.0025,"etc":0.0261,"total":0.1338},{"new_index_weekEND":26,"computer":0.0807,"light":0.0273,"hvac":0.0025,"etc":0.026,"total":0.1366},{"new_index_weekEND":27,"computer":0.084,"light":0.0273,"hvac":0.0025,"etc":0.0261,"total":0.1399},{"new_index_weekEND":28,"computer":0.0808,"light":0.0274,"hvac":0.0025,"etc":0.0261,"total":0.1368},{"new_index_weekEND":29,"computer":0.0789,"light":0.0273,"hvac":0.0027,"etc":0.0261,"total":0.135},{"new_index_weekEND":30,"computer":0.0776,"light":0.0273,"hvac":0.0031,"etc":0.0261,"total":0.1341},{"new_index_weekEND":31,"computer":0.0798,"light":0.0272,"hvac":0.0031,"etc":0.026,"total":0.1362},{"new_index_weekEND":32,"computer":0.0835,"light":0.0272,"hvac":0.0031,"etc":0.0306,"total":0.1445},{"new_index_weekEND":33,"computer":0.0788,"light":0.0266,"hvac":0.0031,"etc":0.0429,"total":0.1514},{"new_index_weekEND":34,"computer":0.0819,"light":0.024,"hvac":0.0031,"etc":0.0425,"total":0.1515},{"new_index_weekEND":35,"computer":0.0792,"light":0.0186,"hvac":0.0031,"etc":0.0419,"total":0.1428},{"new_index_weekEND":36,"computer":0.0802,"light":0.01,"hvac":0.0028,"etc":0.042,"total":0.135},{"new_index_weekEND":37,"computer":0.0852,"light":0.0064,"hvac":0.0025,"etc":0.0422,"total":0.1363},{"new_index_weekEND":38,"computer":0.0828,"light":0.005,"hvac":0.0025,"etc":0.043,"total":0.1333},{"new_index_weekEND":39,"computer":0.0835,"light":0.0076,"hvac":0.0028,"etc":0.0569,"total":0.1508},{"new_index_weekEND":40,"computer":0.084,"light":0.0035,"hvac":0.0029,"etc":0.042,"total":0.1324},{"new_index_weekEND":41,"computer":0.0801,"light":0.004,"hvac":0.0029,"etc":0.0419,"total":0.1288},{"new_index_weekEND":42,"computer":0.0889,"light":0.0068,"hvac":0.0036,"etc":0.0419,"total":0.1412},{"new_index_weekEND":43,"computer":0.0828,"light":0.0094,"hvac":0.0038,"etc":0.0417,"total":0.1378},{"new_index_weekEND":44,"computer":0.0907,"light":0.0133,"hvac":0.0038,"etc":0.0417,"total":0.1496},{"new_index_weekEND":45,"computer":0.0807,"light":0.0133,"hvac":0.0038,"etc":0.0411,"total":0.1389},{"new_index_weekEND":46,"computer":0.091,"light":0.0211,"hvac":0.0038,"etc":0.0419,"total":0.1578},{"new_index_weekEND":47,"computer":0.0935,"light":0.028,"hvac":0.0038,"etc":0.0419,"total":0.1672},{"new_index_weekEND":48,"computer":0.091,"light":0.0327,"hvac":0.0038,"etc":0.0414,"total":0.169},{"new_index_weekEND":49,"computer":0.0936,"light":0.0361,"hvac":0.0039,"etc":0.0252,"total":0.1588},{"new_index_weekEND":50,"computer":0.089,"light":0.0419,"hvac":0.0045,"etc":0.0266,"total":0.1621},{"new_index_weekEND":51,"computer":0.0944,"light":0.0293,"hvac":0.005,"etc":0.0258,"total":0.1544},{"new_index_weekEND":52,"computer":0.0925,"light":0.0292,"hvac":0.0052,"etc":0.0277,"total":0.1546},{"new_index_weekEND":53,"computer":0.0939,"light":0.0292,"hvac":0.0052,"etc":0.0271,"total":0.1553},{"new_index_weekEND":54,"computer":0.0901,"light":0.0292,"hvac":0.005,"etc":0.0255,"total":0.1498},{"new_index_weekEND":55,"computer":0.0946,"light":0.0292,"hvac":0.0043,"etc":0.0254,"total":0.1534},{"new_index_weekEND":56,"computer":0.0904,"light":0.0335,"hvac":0.0045,"etc":0.0253,"total":0.1537},{"new_index_weekEND":57,"computer":0.0901,"light":0.0396,"hvac":0.0046,"etc":0.0254,"total":0.1598},{"new_index_weekEND":58,"computer":0.0932,"light":0.0505,"hvac":0.0047,"etc":0.0253,"total":0.1738},{"new_index_weekEND":59,"computer":0.094,"light":0.0621,"hvac":0.0044,"etc":0.0259,"total":0.1863},{"new_index_weekEND":60,"computer":0.0916,"light":0.0736,"hvac":0.0044,"etc":0.033,"total":0.2025},{"new_index_weekEND":61,"computer":0.0975,"light":0.0831,"hvac":0.0047,"etc":0.0462,"total":0.2315},{"new_index_weekEND":62,"computer":0.1016,"light":0.0889,"hvac":0.0052,"etc":0.0609,"total":0.2567},{"new_index_weekEND":63,"computer":0.1021,"light":0.0916,"hvac":0.0061,"etc":0.0633,"total":0.2631},{"new_index_weekEND":64,"computer":0.0993,"light":0.0914,"hvac":0.0058,"etc":0.0638,"total":0.2604},{"new_index_weekEND":65,"computer":0.102,"light":0.0963,"hvac":0.0062,"etc":0.0639,"total":0.2684},{"new_index_weekEND":66,"computer":0.1029,"light":0.099,"hvac":0.0066,"etc":0.0636,"total":0.2721},{"new_index_weekEND":67,"computer":0.1024,"light":0.1005,"hvac":0.0064,"etc":0.0635,"total":0.2728},{"new_index_weekEND":68,"computer":0.0987,"light":0.104,"hvac":0.0064,"etc":0.0632,"total":0.2723},{"new_index_weekEND":69,"computer":0.105,"light":0.1106,"hvac":0.0061,"etc":0.063,"total":0.2847},{"new_index_weekEND":70,"computer":0.1021,"light":0.1167,"hvac":0.0055,"etc":0.063,"total":0.2873},{"new_index_weekEND":71,"computer":0.1049,"light":0.109,"hvac":0.0058,"etc":0.0625,"total":0.2822},{"new_index_weekEND":72,"computer":0.1046,"light":0.1025,"hvac":0.0059,"etc":0.0616,"total":0.2746},{"new_index_weekEND":73,"computer":0.0934,"light":0.1159,"hvac":0.0057,"etc":0.0521,"total":0.2672},{"new_index_weekEND":74,"computer":0.0979,"light":0.1161,"hvac":0.0053,"etc":0.0433,"total":0.2626},{"new_index_weekEND":75,"computer":0.0984,"light":0.1202,"hvac":0.0053,"etc":0.0435,"total":0.2674},{"new_index_weekEND":76,"computer":0.1002,"light":0.1214,"hvac":0.0058,"etc":0.0437,"total":0.2711},{"new_index_weekEND":77,"computer":0.1035,"light":0.1225,"hvac":0.0059,"etc":0.0437,"total":0.2756},{"new_index_weekEND":78,"computer":0.0945,"light":0.1175,"hvac":0.0058,"etc":0.0446,"total":0.2623},{"new_index_weekEND":79,"computer":0.0965,"light":0.1169,"hvac":0.0059,"etc":0.0445,"total":0.2639},{"new_index_weekEND":80,"computer":0.0937,"light":0.12,"hvac":0.0058,"etc":0.044,"total":0.2635},{"new_index_weekEND":81,"computer":0.0944,"light":0.1248,"hvac":0.0064,"etc":0.0443,"total":0.2698},{"new_index_weekEND":82,"computer":0.1051,"light":0.138,"hvac":0.0069,"etc":0.0369,"total":0.287},{"new_index_weekEND":83,"computer":0.1005,"light":0.1295,"hvac":0.0068,"etc":0.0254,"total":0.2623},{"new_index_weekEND":84,"computer":0.1113,"light":0.1255,"hvac":0.0071,"etc":0.0253,"total":0.2691},{"new_index_weekEND":85,"computer":0.1189,"light":0.1217,"hvac":0.0073,"etc":0.0254,"total":0.2732},{"new_index_weekEND":86,"computer":0.1191,"light":0.1252,"hvac":0.0067,"etc":0.0255,"total":0.2765},{"new_index_weekEND":87,"computer":0.1206,"light":0.1307,"hvac":0.0067,"etc":0.0253,"total":0.2833},{"new_index_weekEND":88,"computer":0.1117,"light":0.1326,"hvac":0.0069,"etc":0.0254,"total":0.2766},{"new_index_weekEND":89,"computer":0.1036,"light":0.1341,"hvac":0.0069,"etc":0.0254,"total":0.27},{"new_index_weekEND":90,"computer":0.106,"light":0.1341,"hvac":0.0069,"etc":0.0255,"total":0.2724},{"new_index_weekEND":91,"computer":0.1091,"light":0.1339,"hvac":0.0065,"etc":0.0263,"total":0.2757},{"new_index_weekEND":92,"computer":0.1163,"light":0.1379,"hvac":0.0058,"etc":0.0411,"total":0.3011},{"new_index_weekEND":93,"computer":0.1133,"light":0.1316,"hvac":0.0023,"etc":0.0425,"total":0.2896},{"new_index_weekEND":94,"computer":0.1104,"light":0.1311,"hvac":0.0022,"etc":0.0424,"total":0.2861},{"new_index_weekEND":95,"computer":0.1097,"light":0.1184,"hvac":0.0028,"etc":0.0409,"total":0.2717},{"new_index_weekEND":96,"computer":0.0972,"light":0.1166,"hvac":0.0029,"etc":0.0273,"total":0.244}]

    // var lastWinter_total = [];
    var lastWinter_hvac  = [];
    var lastWinter_com   = [];
    var lastWinter_light = [];
    // var lastWinter_etc   = [];
    //
    // var today_total = [];
    var today_hvac  = [];
    var today_com   = [];
    var today_light = [];
    // var today_etc   = [];
    //
    // var savingRateComparison;

    var comparing_breakdownColors = ['#C4D5ED', '#F5C493', '#F4B8B8', '#d3bdd1']; //com, light, hvac, etc
    var today_breakdownColors = ['#497ecb', '#e3801c', '#dc5b5b', '#a889a5'];

    var fontSize_mainTitle = '25px';
    var fontSize_bar       = '15px';
    var fontSize_xAxis     = '15px';
    var fontSize_xSubTitle = '18px';

    // 1. Last Winter
    if(weekDay_Indicator == 1){
      TARGET = LAST_WINTER_WEEKDAY;
      xAxis_categories = ["평소", "오늘"]
    } else {
      TARGET = LAST_WINTER_WEEKEND;
      xAxis_categories = ["평소", "오늘"]
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

      // lastWinter_total.push(Number(total.toFixed(2)));
      lastWinter_hvac.push(Number(hvac.toFixed(2)));
      lastWinter_com.push(Number(com.toFixed(2)));
      lastWinter_light.push(Number(light.toFixed(2)));
      // lastWinter_etc.push(Number(etc.toFixed(2)));
    }

    // var lastWinter_totalSum = limitedArraySum(lastWinter_total, 96)

    // console.log("lastWinter_total",lastWinter_total);

    // 2. Today
    invokeOpenAPI('api/labs/ux/energy/quarters.json', todayCB);

    function todayCB(today_) {
      today = today_;

      // console.log("**today::", today);

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
      drawChart();
    }

    // 3. draw chart
    function drawChart(){
      todayLength = today_com.length;
      // todayLength = 40;
      // savingRateComparison = ((limitedArraySum(today_total,todayLength) / limitedArraySum(lastWinter_total,todayLength)));

      var lastWinter_maxFeederValue = Math.max(limitedArraySum(lastWinter_com, todayLength), limitedArraySum(lastWinter_light, todayLength), limitedArraySum(lastWinter_hvac, todayLength));
      var      today_maxFeederValue = Math.max(limitedArraySum(today_com, todayLength), limitedArraySum(today_light, todayLength), limitedArraySum(today_hvac, todayLength));
      var yMax = Math.max(lastWinter_maxFeederValue, today_maxFeederValue);

      // console.log("**Last Winter Max:", lastWinter_maxFeederValue);
      // console.log("**Today Max:", today_maxFeederValue);
      // console.log("**Y Max:", yMax);

      var savingPoints = limitedArraySum(lastWinter_com, todayLength) - limitedArraySum(today_com, todayLength);
      var signColorCode;

      var sign="";
      if (savingPoints > 0) {
        sign="+";
        signColorCode = "#3e721f"
      }else {
        sign="";
        signColorCode = "#c41111"
      }

      // console.log(lastWinter_totalSum);
      // console.log(limitedArraySum(lastWinter_total, todayLength));

      $('#ux_comparison_winter_com').highcharts({
        chart: {
            type: 'column',
            uxinTop: 43,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        title: {
           useHTML: true,
           text: sign+ savingPoints.toFixed(0) + '점',
           style: {
             color: signColorCode,
             fontWeight: 'bold',
             fontSize : fontSize_mainTitle,
            //  'background-color': 'rgba(0, 0, 0, 0)',
             'border-radius': '6px',
            //  border: '4px solid #8E8989'
           }
       },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
          title: {
              enabled: true,
              text: '',
              style: {
                fontSize: fontSize_xSubTitle
              }
          },
          categories: xAxis_categories,
          labels: {
            style: {
              fontSize: fontSize_xAxis
            }
          },
          // lineColor: 'rgba(0, 0, 0, 0)',
          tickColor: 'rgba(0, 0, 0, 0)'
        },
        yAxis: {
            min: 0,
            max: yMax,
            labels: {
              enabled: false
            },
            gridLineColor: 'rgba(0, 0, 0, 0)',
            title: {
                enabled: false,
                text: '하루 평균 사용량 (kW/h)'
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black', fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: fontSize_bar
                    }
                }
            }
        },
        series: [
          // {
          //     name: null, // 작년 겨울 하루 전체 평균 사용량 - 작년 겨울 현 시간 기준 평균 사용량
          //     data: [{y: null}, {y: Number((lastWinter_totalSum - limitedArraySum(lastWinter_com, todayLength) - limitedArraySum(lastWinter_light, todayLength)
          //                                                                 - limitedArraySum(lastWinter_hvac, todayLength) - limitedArraySum(lastWinter_etc, todayLength)).toFixed(2))}],
          //     linkedTo: ':previous'
          // },
          {
              name: '컴퓨터',
              data: [{y: limitedArraySum(lastWinter_com, todayLength), color: comparing_breakdownColors[0]}, {y: limitedArraySum(today_com, todayLength), color: today_breakdownColors[0]}]
          }
          // , {
          //     name: '전등',
          //     data: [{y: limitedArraySum(lastWinter_light, todayLength), color: comparing_breakdownColors[1]}, {y: limitedArraySum(today_light, todayLength), color: today_breakdownColors[1]}]
          // }, {
          //     name: '난방',
          //     data: [{y: limitedArraySum(lastWinter_hvac, todayLength), color: comparing_breakdownColors[2]}, {y: limitedArraySum(today_hvac, todayLength), color: today_breakdownColors[2]}]
          // }, {
          //     name: '기타',
          //     data: [{y: limitedArraySum(lastWinter_etc, todayLength), color: comparing_breakdownColors[3]}, {y: limitedArraySum(today_etc, todayLength), color: today_breakdownColors[3]}]
          // }
        ],
          // colors: ['lightgray', today_breakdownColors[0], today_breakdownColors[1],today_breakdownColors[2], today_breakdownColors[3]]
          // colors: [today_breakdownColors[0], today_breakdownColors[1],today_breakdownColors[2], today_breakdownColors[3]]
          // colors: [today_breakdownColors[0]]
    });
  }

  $('#icon_com').append('<img src="./images/computer2.png" width="60%"/>');
});
