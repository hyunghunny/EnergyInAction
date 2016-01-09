// import data file
document.writeln("<script type='text/javascript' src='/javascripts/lib/environ.js'></script>");

$(function () {

    // var HCC_LAST_SEASON_WEEKDAY = [{"new_index_weekDAY":1,"computer":0.1664,"light":0.2256,"hvac":0.0024,"etc":0.1926,"total":0.587},{"new_index_weekDAY":2,"computer":0.1647,"light":0.2192,"hvac":0.0024,"etc":0.1728,"total":0.5591},{"new_index_weekDAY":3,"computer":0.163,"light":0.2154,"hvac":0.0024,"etc":0.1793,"total":0.5602},{"new_index_weekDAY":4,"computer":0.1608,"light":0.2079,"hvac":0.0023,"etc":0.166,"total":0.537},{"new_index_weekDAY":5,"computer":0.1613,"light":0.2046,"hvac":0.0016,"etc":0.1629,"total":0.5304},{"new_index_weekDAY":6,"computer":0.158,"light":0.1864,"hvac":0.0016,"etc":0.1655,"total":0.5115},{"new_index_weekDAY":7,"computer":0.1553,"light":0.1718,"hvac":0.0016,"etc":0.164,"total":0.4927},{"new_index_weekDAY":8,"computer":0.1535,"light":0.1625,"hvac":0.002,"etc":0.1734,"total":0.4914},{"new_index_weekDAY":9,"computer":0.1509,"light":0.1474,"hvac":0.0024,"etc":0.1815,"total":0.4822},{"new_index_weekDAY":10,"computer":0.1505,"light":0.1407,"hvac":0.0028,"etc":0.178,"total":0.4721},{"new_index_weekDAY":11,"computer":0.1507,"light":0.1342,"hvac":0.0028,"etc":0.1829,"total":0.4707},{"new_index_weekDAY":12,"computer":0.15,"light":0.1262,"hvac":0.0023,"etc":0.1827,"total":0.4613},{"new_index_weekDAY":13,"computer":0.1536,"light":0.1191,"hvac":0.0018,"etc":0.1777,"total":0.4521},{"new_index_weekDAY":14,"computer":0.1454,"light":0.1132,"hvac":0.0019,"etc":0.1794,"total":0.4399},{"new_index_weekDAY":15,"computer":0.1392,"light":0.1083,"hvac":0.0019,"etc":0.1718,"total":0.4212},{"new_index_weekDAY":16,"computer":0.1366,"light":0.1026,"hvac":0.0019,"etc":0.1691,"total":0.4102},{"new_index_weekDAY":17,"computer":0.1348,"light":0.0943,"hvac":0.0019,"etc":0.1716,"total":0.4026},{"new_index_weekDAY":18,"computer":0.133,"light":0.0924,"hvac":0.0019,"etc":0.1659,"total":0.3931},{"new_index_weekDAY":19,"computer":0.1329,"light":0.0892,"hvac":0.0019,"etc":0.1575,"total":0.3815},{"new_index_weekDAY":20,"computer":0.132,"light":0.0867,"hvac":0.0018,"etc":0.1617,"total":0.3823},{"new_index_weekDAY":21,"computer":0.13,"light":0.0792,"hvac":0.0018,"etc":0.1571,"total":0.3681},{"new_index_weekDAY":22,"computer":0.1298,"light":0.0779,"hvac":0.0018,"etc":0.157,"total":0.3666},{"new_index_weekDAY":23,"computer":0.1297,"light":0.0765,"hvac":0.0018,"etc":0.1601,"total":0.3682},{"new_index_weekDAY":24,"computer":0.1304,"light":0.0737,"hvac":0.0018,"etc":0.1583,"total":0.3642},{"new_index_weekDAY":25,"computer":0.1299,"light":0.0716,"hvac":0.0018,"etc":0.1596,"total":0.363},{"new_index_weekDAY":26,"computer":0.1292,"light":0.0636,"hvac":0.0018,"etc":0.1576,"total":0.3522},{"new_index_weekDAY":27,"computer":0.1285,"light":0.0592,"hvac":0.0018,"etc":0.1632,"total":0.3527},{"new_index_weekDAY":28,"computer":0.1279,"light":0.0538,"hvac":0.0018,"etc":0.1646,"total":0.3482},{"new_index_weekDAY":29,"computer":0.1276,"light":0.054,"hvac":0.0019,"etc":0.165,"total":0.3485},{"new_index_weekDAY":30,"computer":0.1271,"light":0.0547,"hvac":0.0019,"etc":0.1727,"total":0.3564},{"new_index_weekDAY":31,"computer":0.1269,"light":0.0564,"hvac":0.0018,"etc":0.1503,"total":0.3354},{"new_index_weekDAY":32,"computer":0.1306,"light":0.0579,"hvac":0.0018,"etc":0.1612,"total":0.3516},{"new_index_weekDAY":33,"computer":0.1379,"light":0.0602,"hvac":0.0018,"etc":0.1684,"total":0.3683},{"new_index_weekDAY":34,"computer":0.138,"light":0.0676,"hvac":0.0019,"etc":0.1645,"total":0.3719},{"new_index_weekDAY":35,"computer":0.1395,"light":0.0778,"hvac":0.0018,"etc":0.1598,"total":0.3788},{"new_index_weekDAY":36,"computer":0.141,"light":0.0895,"hvac":0.0017,"etc":0.1573,"total":0.3896},{"new_index_weekDAY":37,"computer":0.1448,"light":0.1143,"hvac":0.0015,"etc":0.1724,"total":0.4331},{"new_index_weekDAY":38,"computer":0.149,"light":0.1262,"hvac":0.0015,"etc":0.1591,"total":0.4358},{"new_index_weekDAY":39,"computer":0.1481,"light":0.1469,"hvac":0.0015,"etc":0.1765,"total":0.473},{"new_index_weekDAY":40,"computer":0.1504,"light":0.1645,"hvac":0.0015,"etc":0.1832,"total":0.4997},{"new_index_weekDAY":41,"computer":0.1667,"light":0.1951,"hvac":0.0015,"etc":0.1862,"total":0.5495},{"new_index_weekDAY":42,"computer":0.1882,"light":0.2117,"hvac":0.0015,"etc":0.1976,"total":0.599},{"new_index_weekDAY":43,"computer":0.2118,"light":0.2244,"hvac":0.0015,"etc":0.1866,"total":0.6243},{"new_index_weekDAY":44,"computer":0.2262,"light":0.2379,"hvac":0.0015,"etc":0.2122,"total":0.6779},{"new_index_weekDAY":45,"computer":0.2371,"light":0.2472,"hvac":0.0015,"etc":0.236,"total":0.7218},{"new_index_weekDAY":46,"computer":0.2408,"light":0.253,"hvac":0.0015,"etc":0.2369,"total":0.7322},{"new_index_weekDAY":47,"computer":0.2407,"light":0.2578,"hvac":0.0015,"etc":0.2444,"total":0.7444},{"new_index_weekDAY":48,"computer":0.2132,"light":0.2629,"hvac":0.0015,"etc":0.2574,"total":0.735},{"new_index_weekDAY":49,"computer":0.2019,"light":0.2681,"hvac":0.0015,"etc":0.2505,"total":0.722},{"new_index_weekDAY":50,"computer":0.2196,"light":0.2779,"hvac":0.0015,"etc":0.2643,"total":0.7633},{"new_index_weekDAY":51,"computer":0.2395,"light":0.2829,"hvac":0.0015,"etc":0.2539,"total":0.7778},{"new_index_weekDAY":52,"computer":0.2546,"light":0.2838,"hvac":0.0015,"etc":0.2541,"total":0.7941},{"new_index_weekDAY":53,"computer":0.2604,"light":0.2784,"hvac":0.0015,"etc":0.2524,"total":0.7927},{"new_index_weekDAY":54,"computer":0.2694,"light":0.2804,"hvac":0.0015,"etc":0.257,"total":0.8083},{"new_index_weekDAY":55,"computer":0.2749,"light":0.2792,"hvac":0.0015,"etc":0.2506,"total":0.8064},{"new_index_weekDAY":56,"computer":0.2751,"light":0.2838,"hvac":0.0015,"etc":0.2718,"total":0.8322},{"new_index_weekDAY":57,"computer":0.2824,"light":0.2899,"hvac":0.0016,"etc":0.275,"total":0.8489},{"new_index_weekDAY":58,"computer":0.2823,"light":0.2971,"hvac":0.0017,"etc":0.2656,"total":0.8467},{"new_index_weekDAY":59,"computer":0.2863,"light":0.3049,"hvac":0.0018,"etc":0.2635,"total":0.8566},{"new_index_weekDAY":60,"computer":0.2786,"light":0.3013,"hvac":0.0018,"etc":0.2549,"total":0.8367},{"new_index_weekDAY":61,"computer":0.278,"light":0.3087,"hvac":0.0018,"etc":0.2535,"total":0.8419},{"new_index_weekDAY":62,"computer":0.2751,"light":0.3095,"hvac":0.0018,"etc":0.2584,"total":0.8447},{"new_index_weekDAY":63,"computer":0.2763,"light":0.3101,"hvac":0.0018,"etc":0.2661,"total":0.8544},{"new_index_weekDAY":64,"computer":0.2743,"light":0.31,"hvac":0.0018,"etc":0.2682,"total":0.8543},{"new_index_weekDAY":65,"computer":0.2742,"light":0.3107,"hvac":0.0018,"etc":0.2554,"total":0.8421},{"new_index_weekDAY":66,"computer":0.2701,"light":0.3109,"hvac":0.0018,"etc":0.2414,"total":0.8243},{"new_index_weekDAY":67,"computer":0.2668,"light":0.3135,"hvac":0.0021,"etc":0.2469,"total":0.8293},{"new_index_weekDAY":68,"computer":0.2616,"light":0.3172,"hvac":0.0023,"etc":0.262,"total":0.8431},{"new_index_weekDAY":69,"computer":0.2601,"light":0.3187,"hvac":0.0023,"etc":0.2639,"total":0.8449},{"new_index_weekDAY":70,"computer":0.2652,"light":0.321,"hvac":0.0023,"etc":0.2614,"total":0.8499},{"new_index_weekDAY":71,"computer":0.259,"light":0.32,"hvac":0.0022,"etc":0.2584,"total":0.8396},{"new_index_weekDAY":72,"computer":0.2485,"light":0.3167,"hvac":0.002,"etc":0.2455,"total":0.8128},{"new_index_weekDAY":73,"computer":0.2275,"light":0.3161,"hvac":0.0016,"etc":0.2541,"total":0.7992},{"new_index_weekDAY":74,"computer":0.2109,"light":0.3145,"hvac":0.0015,"etc":0.2617,"total":0.7887},{"new_index_weekDAY":75,"computer":0.2084,"light":0.3116,"hvac":0.0018,"etc":0.2551,"total":0.7769},{"new_index_weekDAY":76,"computer":0.201,"light":0.3044,"hvac":0.002,"etc":0.2749,"total":0.7824},{"new_index_weekDAY":77,"computer":0.2067,"light":0.3055,"hvac":0.0021,"etc":0.2977,"total":0.8119},{"new_index_weekDAY":78,"computer":0.2065,"light":0.3028,"hvac":0.0022,"etc":0.3063,"total":0.8178},{"new_index_weekDAY":79,"computer":0.2058,"light":0.3035,"hvac":0.0026,"etc":0.3109,"total":0.8228},{"new_index_weekDAY":80,"computer":0.2083,"light":0.2995,"hvac":0.0027,"etc":0.3335,"total":0.844},{"new_index_weekDAY":81,"computer":0.2091,"light":0.3044,"hvac":0.0025,"etc":0.3473,"total":0.8633},{"new_index_weekDAY":82,"computer":0.2101,"light":0.3025,"hvac":0.0027,"etc":0.3609,"total":0.8761},{"new_index_weekDAY":83,"computer":0.2098,"light":0.2996,"hvac":0.0031,"etc":0.3515,"total":0.864},{"new_index_weekDAY":84,"computer":0.2089,"light":0.2933,"hvac":0.0032,"etc":0.3403,"total":0.8457},{"new_index_weekDAY":85,"computer":0.2094,"light":0.2863,"hvac":0.0036,"etc":0.3246,"total":0.8239},{"new_index_weekDAY":86,"computer":0.2069,"light":0.2808,"hvac":0.0038,"etc":0.3054,"total":0.7969},{"new_index_weekDAY":87,"computer":0.2001,"light":0.2822,"hvac":0.0037,"etc":0.3104,"total":0.7964},{"new_index_weekDAY":88,"computer":0.1886,"light":0.2791,"hvac":0.0038,"etc":0.3085,"total":0.78},{"new_index_weekDAY":89,"computer":0.183,"light":0.276,"hvac":0.0042,"etc":0.2976,"total":0.7608},{"new_index_weekDAY":90,"computer":0.1842,"light":0.27,"hvac":0.0039,"etc":0.2937,"total":0.7519},{"new_index_weekDAY":91,"computer":0.1817,"light":0.2604,"hvac":0.0035,"etc":0.2453,"total":0.6909},{"new_index_weekDAY":92,"computer":0.1759,"light":0.2554,"hvac":0.003,"etc":0.2369,"total":0.6712},{"new_index_weekDAY":93,"computer":0.174,"light":0.2519,"hvac":0.0019,"etc":0.229,"total":0.6568},{"new_index_weekDAY":94,"computer":0.1699,"light":0.2406,"hvac":0.002,"etc":0.2135,"total":0.6259},{"new_index_weekDAY":95,"computer":0.1691,"light":0.2298,"hvac":0.0023,"etc":0.2021,"total":0.6034},{"new_index_weekDAY":96,"computer":0.1677,"light":0.2317,"hvac":0.0023,"etc":0.2047,"total":0.6065}]
    // var HCC_LAST_SEASON_WEEKEND = [{"new_index_weekEND":1,"computer":0.172,"light":0.2085,"hvac":0.0026,"etc":0.1914,"total":0.5745},{"new_index_weekEND":2,"computer":0.1728,"light":0.1922,"hvac":0.004,"etc":0.1913,"total":0.5602},{"new_index_weekEND":3,"computer":0.1684,"light":0.1918,"hvac":0.0046,"etc":0.1917,"total":0.5565},{"new_index_weekEND":4,"computer":0.1683,"light":0.1813,"hvac":0.0035,"etc":0.19,"total":0.5431},{"new_index_weekEND":5,"computer":0.166,"light":0.1649,"hvac":0.0021,"etc":0.179,"total":0.512},{"new_index_weekEND":6,"computer":0.1689,"light":0.1592,"hvac":0.0021,"etc":0.1633,"total":0.4936},{"new_index_weekEND":7,"computer":0.1647,"light":0.1542,"hvac":0.0021,"etc":0.1614,"total":0.4824},{"new_index_weekEND":8,"computer":0.1632,"light":0.1466,"hvac":0.0025,"etc":0.1644,"total":0.4766},{"new_index_weekEND":9,"computer":0.1652,"light":0.1418,"hvac":0.0028,"etc":0.1642,"total":0.474},{"new_index_weekEND":10,"computer":0.1642,"light":0.1417,"hvac":0.0028,"etc":0.1623,"total":0.471},{"new_index_weekEND":11,"computer":0.1633,"light":0.1131,"hvac":0.0023,"etc":0.1607,"total":0.4393},{"new_index_weekEND":12,"computer":0.1615,"light":0.101,"hvac":0.0019,"etc":0.1631,"total":0.4275},{"new_index_weekEND":13,"computer":0.1633,"light":0.0996,"hvac":0.0015,"etc":0.1585,"total":0.4229},{"new_index_weekEND":14,"computer":0.1636,"light":0.0999,"hvac":0.0015,"etc":0.1447,"total":0.4098},{"new_index_weekEND":15,"computer":0.1346,"light":0.0804,"hvac":0.0015,"etc":0.1615,"total":0.378},{"new_index_weekEND":16,"computer":0.1316,"light":0.0738,"hvac":0.0015,"etc":0.1613,"total":0.3683},{"new_index_weekEND":17,"computer":0.1308,"light":0.0738,"hvac":0.0015,"etc":0.1614,"total":0.3675},{"new_index_weekEND":18,"computer":0.1307,"light":0.0669,"hvac":0.0015,"etc":0.1618,"total":0.3608},{"new_index_weekEND":19,"computer":0.1306,"light":0.0625,"hvac":0.0015,"etc":0.1615,"total":0.3562},{"new_index_weekEND":20,"computer":0.1303,"light":0.0625,"hvac":0.0015,"etc":0.1601,"total":0.3544},{"new_index_weekEND":21,"computer":0.1293,"light":0.0518,"hvac":0.0015,"etc":0.1603,"total":0.3429},{"new_index_weekEND":22,"computer":0.1277,"light":0.0483,"hvac":0.0015,"etc":0.1619,"total":0.3394},{"new_index_weekEND":23,"computer":0.1271,"light":0.0483,"hvac":0.0015,"etc":0.1622,"total":0.3392},{"new_index_weekEND":24,"computer":0.1277,"light":0.0483,"hvac":0.0015,"etc":0.1678,"total":0.3453},{"new_index_weekEND":25,"computer":0.1267,"light":0.0483,"hvac":0.0015,"etc":0.1642,"total":0.3407},{"new_index_weekEND":26,"computer":0.1266,"light":0.0483,"hvac":0.0015,"etc":0.1601,"total":0.3365},{"new_index_weekEND":27,"computer":0.1265,"light":0.0431,"hvac":0.0015,"etc":0.1599,"total":0.331},{"new_index_weekEND":28,"computer":0.1258,"light":0.0363,"hvac":0.0015,"etc":0.1611,"total":0.3247},{"new_index_weekEND":29,"computer":0.1256,"light":0.0363,"hvac":0.0015,"etc":0.1619,"total":0.3253},{"new_index_weekEND":30,"computer":0.126,"light":0.0363,"hvac":0.0016,"etc":0.1607,"total":0.3244},{"new_index_weekEND":31,"computer":0.1258,"light":0.0234,"hvac":0.0018,"etc":0.1564,"total":0.3075},{"new_index_weekEND":32,"computer":0.1262,"light":0.0261,"hvac":0.0017,"etc":0.1588,"total":0.3127},{"new_index_weekEND":33,"computer":0.1258,"light":0.0291,"hvac":0.0015,"etc":0.1711,"total":0.3275},{"new_index_weekEND":34,"computer":0.1251,"light":0.0257,"hvac":0.0015,"etc":0.1663,"total":0.3185},{"new_index_weekEND":35,"computer":0.1247,"light":0.0229,"hvac":0.0015,"etc":0.1643,"total":0.3135},{"new_index_weekEND":36,"computer":0.1247,"light":0.0229,"hvac":0.0016,"etc":0.1633,"total":0.3125},{"new_index_weekEND":37,"computer":0.1257,"light":0.0229,"hvac":0.0017,"etc":0.1645,"total":0.3147},{"new_index_weekEND":38,"computer":0.1418,"light":0.0229,"hvac":0.0018,"etc":0.1643,"total":0.3309},{"new_index_weekEND":39,"computer":0.1489,"light":0.0229,"hvac":0.0018,"etc":0.1622,"total":0.3359},{"new_index_weekEND":40,"computer":0.1491,"light":0.0228,"hvac":0.0018,"etc":0.1635,"total":0.3372},{"new_index_weekEND":41,"computer":0.1459,"light":0.0296,"hvac":0.0018,"etc":0.1615,"total":0.3388},{"new_index_weekEND":42,"computer":0.1507,"light":0.0311,"hvac":0.0018,"etc":0.161,"total":0.3446},{"new_index_weekEND":43,"computer":0.15,"light":0.0317,"hvac":0.0018,"etc":0.1614,"total":0.345},{"new_index_weekEND":44,"computer":0.1517,"light":0.0378,"hvac":0.0018,"etc":0.1654,"total":0.3567},{"new_index_weekEND":45,"computer":0.148,"light":0.0447,"hvac":0.002,"etc":0.1264,"total":0.321},{"new_index_weekEND":46,"computer":0.1573,"light":0.0636,"hvac":0.0024,"etc":0.1184,"total":0.3417},{"new_index_weekEND":47,"computer":0.1606,"light":0.0713,"hvac":0.0024,"etc":0.119,"total":0.3534},{"new_index_weekEND":48,"computer":0.1614,"light":0.0722,"hvac":0.0024,"etc":0.1181,"total":0.3541},{"new_index_weekEND":49,"computer":0.1629,"light":0.0733,"hvac":0.0026,"etc":0.1196,"total":0.3584},{"new_index_weekEND":50,"computer":0.1633,"light":0.0733,"hvac":0.0028,"etc":0.1207,"total":0.3601},{"new_index_weekEND":51,"computer":0.1765,"light":0.0737,"hvac":0.0028,"etc":0.1221,"total":0.3752},{"new_index_weekEND":52,"computer":0.1897,"light":0.0867,"hvac":0.0032,"etc":0.1201,"total":0.3998},{"new_index_weekEND":53,"computer":0.1946,"light":0.1003,"hvac":0.004,"etc":0.1199,"total":0.4188},{"new_index_weekEND":54,"computer":0.1909,"light":0.1037,"hvac":0.0041,"etc":0.1181,"total":0.4167},{"new_index_weekEND":55,"computer":0.1926,"light":0.1035,"hvac":0.004,"etc":0.1176,"total":0.4178},{"new_index_weekEND":56,"computer":0.1918,"light":0.1145,"hvac":0.0043,"etc":0.1186,"total":0.4293},{"new_index_weekEND":57,"computer":0.1964,"light":0.1301,"hvac":0.005,"etc":0.1194,"total":0.4508},{"new_index_weekEND":58,"computer":0.198,"light":0.1383,"hvac":0.0058,"etc":0.1189,"total":0.461},{"new_index_weekEND":59,"computer":0.1942,"light":0.1441,"hvac":0.0067,"etc":0.1388,"total":0.4837},{"new_index_weekEND":60,"computer":0.198,"light":0.1694,"hvac":0.007,"etc":0.1491,"total":0.5235},{"new_index_weekEND":61,"computer":0.2031,"light":0.1702,"hvac":0.0078,"etc":0.1701,"total":0.5512},{"new_index_weekEND":62,"computer":0.2034,"light":0.1879,"hvac":0.0083,"etc":0.1751,"total":0.5747},{"new_index_weekEND":63,"computer":0.203,"light":0.1921,"hvac":0.0086,"etc":0.21,"total":0.6137},{"new_index_weekEND":64,"computer":0.2004,"light":0.2062,"hvac":0.0083,"etc":0.2359,"total":0.6508},{"new_index_weekEND":65,"computer":0.2288,"light":0.2122,"hvac":0.0083,"etc":0.2705,"total":0.7198},{"new_index_weekEND":66,"computer":0.2307,"light":0.2126,"hvac":0.0084,"etc":0.2939,"total":0.7456},{"new_index_weekEND":67,"computer":0.2323,"light":0.2169,"hvac":0.0081,"etc":0.3061,"total":0.7635},{"new_index_weekEND":68,"computer":0.231,"light":0.2174,"hvac":0.007,"etc":0.2738,"total":0.7292},{"new_index_weekEND":69,"computer":0.2324,"light":0.2218,"hvac":0.007,"etc":0.2769,"total":0.7379},{"new_index_weekEND":70,"computer":0.2035,"light":0.2137,"hvac":0.0061,"etc":0.2781,"total":0.7014},{"new_index_weekEND":71,"computer":0.2053,"light":0.2128,"hvac":0.0062,"etc":0.3078,"total":0.7321},{"new_index_weekEND":72,"computer":0.2065,"light":0.2127,"hvac":0.0081,"etc":0.3259,"total":0.7532},{"new_index_weekEND":73,"computer":0.1878,"light":0.21,"hvac":0.0088,"etc":0.3144,"total":0.7209},{"new_index_weekEND":74,"computer":0.1768,"light":0.2078,"hvac":0.0079,"etc":0.3047,"total":0.6974},{"new_index_weekEND":75,"computer":0.1678,"light":0.2056,"hvac":0.0079,"etc":0.2991,"total":0.6804},{"new_index_weekEND":76,"computer":0.1686,"light":0.1957,"hvac":0.0075,"etc":0.2777,"total":0.6495},{"new_index_weekEND":77,"computer":0.1748,"light":0.1861,"hvac":0.0069,"etc":0.2607,"total":0.6285},{"new_index_weekEND":78,"computer":0.2009,"light":0.1978,"hvac":0.0082,"etc":0.2841,"total":0.691},{"new_index_weekEND":79,"computer":0.1991,"light":0.2008,"hvac":0.0082,"etc":0.315,"total":0.7231},{"new_index_weekEND":80,"computer":0.2029,"light":0.202,"hvac":0.0079,"etc":0.3491,"total":0.762},{"new_index_weekEND":81,"computer":0.2039,"light":0.2079,"hvac":0.0075,"etc":0.3352,"total":0.7544},{"new_index_weekEND":82,"computer":0.2083,"light":0.2164,"hvac":0.0072,"etc":0.3155,"total":0.7474},{"new_index_weekEND":83,"computer":0.2127,"light":0.2211,"hvac":0.0083,"etc":0.2986,"total":0.7407},{"new_index_weekEND":84,"computer":0.2202,"light":0.2241,"hvac":0.0096,"etc":0.2887,"total":0.7426},{"new_index_weekEND":85,"computer":0.2147,"light":0.2279,"hvac":0.0103,"etc":0.2899,"total":0.7428},{"new_index_weekEND":86,"computer":0.2132,"light":0.2247,"hvac":0.0105,"etc":0.2689,"total":0.7173},{"new_index_weekEND":87,"computer":0.2119,"light":0.2214,"hvac":0.0117,"etc":0.2668,"total":0.7118},{"new_index_weekEND":88,"computer":0.2131,"light":0.2258,"hvac":0.0124,"etc":0.3017,"total":0.753},{"new_index_weekEND":89,"computer":0.2073,"light":0.229,"hvac":0.0124,"etc":0.2784,"total":0.7272},{"new_index_weekEND":90,"computer":0.1832,"light":0.2218,"hvac":0.0123,"etc":0.2943,"total":0.7116},{"new_index_weekEND":91,"computer":0.1789,"light":0.2128,"hvac":0.0109,"etc":0.2862,"total":0.6888},{"new_index_weekEND":92,"computer":0.16,"light":0.2137,"hvac":0.0079,"etc":0.28,"total":0.6616},{"new_index_weekEND":93,"computer":0.1532,"light":0.2153,"hvac":0.0021,"etc":0.2717,"total":0.6423},{"new_index_weekEND":94,"computer":0.1545,"light":0.2073,"hvac":0.0021,"etc":0.2335,"total":0.5974},{"new_index_weekEND":95,"computer":0.1489,"light":0.1989,"hvac":0.0021,"etc":0.218,"total":0.5679},{"new_index_weekEND":96,"computer":0.1471,"light":0.1944,"hvac":0.0021,"etc":0.2176,"total":0.5611}]

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
      TARGET = HCC_LAST_SEASON_WEEKDAY;
      xAxis_categories = ["평소", "오늘"]
    } else {
      TARGET = HCC_LAST_SEASON_WEEKEND;
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
    invokeOpenAPI('api/labs/hcc/energy/quarters.json', todayCB);

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
      drawChart();
    }

    // 3. draw chart
    function drawChart(){
      todayLength = today_light.length;
      // todayLength = 40;
      // savingRateComparison = ((limitedArraySum(today_total,todayLength) / limitedArraySum(lastWinter_total,todayLength)));

      var lastWinter_maxFeederValue = Math.max(limitedArraySum(lastWinter_com, todayLength), limitedArraySum(lastWinter_light, todayLength), limitedArraySum(lastWinter_hvac, todayLength));
      var      today_maxFeederValue = Math.max(limitedArraySum(today_com, todayLength), limitedArraySum(today_light, todayLength), limitedArraySum(today_hvac, todayLength));
      var yMax = Math.max(lastWinter_maxFeederValue, today_maxFeederValue);

      var savingPoints = limitedArraySum(lastWinter_light, todayLength) - limitedArraySum(today_light, todayLength);
      var signColorCode;

      // savingPoints sign & color
      var sign="";
      if (savingPoints.toFixed(0) == 0) {
        savingPoints = 0
        sign="";
        signColorCode = "gray";
      } else if(savingPoints > 0) {
        sign="+";
        signColorCode = "#3e721f";
      } else {
        sign="";
        signColorCode = "#a50a0a";
      }

      // console.log(lastWinter_totalSum);
      // console.log(limitedArraySum(lastWinter_total, todayLength));

      $('#hcc_comparison_winter_light').highcharts({
        chart: {
            type: 'column',
            hccinTop: 43,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        title: {
           useHTML: true,
           text: sign + savingPoints.toFixed(0) + '점',
           style: {
             color: signColorCode,
             fontWeight: 'bold',
             fontSize : fontSize_mainTitle,
            //  'background-color': '#F5F5F4',
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
              // text: '누적 사용량',
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
          // {
          //     name: '컴퓨터',
          //     data: [{y: limitedArraySum(lastWinter_com, todayLength), color: comparing_breakdownColors[0]}, {y: limitedArraySum(today_com, todayLength), color: today_breakdownColors[0]}]
          // },
          {
              name: '전등',
              data: [{y: limitedArraySum(lastWinter_light, todayLength), color: comparing_breakdownColors[1]}, {y: limitedArraySum(today_light, todayLength), color: today_breakdownColors[1]}]
          }
          // {
          //     name: '난방',
          //     data: [{y: limitedArraySum(lastWinter_hvac, todayLength), color: comparing_breakdownColors[2]}, {y: limitedArraySum(today_hvac, todayLength), color: today_breakdownColors[2]}]
          // },
          // {
          //     name: '기타',
          //     data: [{y: limitedArraySum(lastWinter_etc, todayLength), color: comparing_breakdownColors[3]}, {y: limitedArraySum(today_etc, todayLength), color: today_breakdownColors[3]}]
          // }
        ],
          // colors: ['lightgray', today_breakdownColors[0], today_breakdownColors[1],today_breakdownColors[2], today_breakdownColors[3]]
          // colors: [today_breakdownColors[0], today_breakdownColors[1],today_breakdownColors[2], today_breakdownColors[3]]
          // colors: [today_breakdownColors[1]]
    });
  }
  $('#icon_light').append('<img src="./images/light2.png" width="60%"/>');
});
