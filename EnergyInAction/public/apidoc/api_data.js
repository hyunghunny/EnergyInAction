define({ "api": [
  {
    "type": "get",
    "url": "api",
    "title": "Listing API",
    "name": "Listing_API",
    "group": "Billboard",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json or text/html</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"api\":[{\n    \"href\":\"/api/labs\",\n    \"type\":\"ItemList\"\n}]}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API lists the top level APIs. You can navigate the other APIs by starting with this API.</p> <p>If you doesn&#39;t set Content-Type as JSON, human readable help document will be shown.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Billboard"
  },
  {
    "type": "get",
    "url": "api/labs/:labId/energy/quarters.json",
    "title": "Retrieve the energy usage information which measured per 15 mins",
    "name": "Retrieve_the_energy_usage_information_which_measured_per_15_mins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "labId",
            "description": "<p>Lab&#39;s unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "base_time",
            "defaultValue": "timestamp_of_today's_midnight",
            "description": "<p>Query parameter to set the base time.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as today&#39;s midnight</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "to_time",
            "defaultValue": "1_day_more_from_base_time",
            "description": "<p>Query parameter to set the time to be collected.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as 1 day more from the base time</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "100",
            "description": "<p>Query parameter to set the number of items which will be retrieved.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Query parameter to set the skipped numbers of items.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "api/labs/:labId/energy/quarters.json?base_time=1430477977029&skip=100",
        "type": "js"
      }
    ],
    "group": "Lab_Energy_Usage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[  \n {  \n   \"dateFrom\":\"2015-04-01T00:00:00.000Z\",\n   \"dateTo\":\"2015-04-01T00:15:00.000Z\",\n   \"deviceID\":1168,\n   \"location\":\"D410\",\n   \"feeders\":[  \n     {  \n       \"feederID\":3,\n       \"value\":7.555555555555555\n     },\n     {  \n       \"feederID\":4,\n       \"value\":39.05555555555556\n     },\n     {  \n       \"feederID\":5,\n       \"value\":138323.75\n     },\n     {  \n       \"feederID\":6,\n       \"value\":33499.88888888889\n     },\n     {  \n       \"feederID\":7,\n       \"value\":4.277777777777778\n     },\n     {  \n       \"feederID\":8,\n       \"value\":84.38888888888889\n     },\n     {  \n       \"feederID\":9,\n       \"value\":63.166666666666664\n     },\n     {  \n       \"feederID\":10,\n       \"value\":28591.472222222223\n     },\n     {  \n       \"feederID\":11,\n       \"value\":45400.666666666664\n     },\n     {  \n       \"feederID\":12,\n       \"value\":45606.166666666664\n     },\n     {  \n       \"feederID\":13,\n       \"value\":160957.05555555556\n     },\n     {  \n       \"feederID\":14,\n       \"value\":2153.472222222222\n     },\n     {  \n       \"feederID\":15,\n       \"value\":12.333333333333334\n     },\n     {  \n       \"feederID\":16,\n       \"value\":0\n     },\n     {  \n       \"feederID\":17,\n       \"value\":0\n     },\n     {  \n       \"feederID\":18,\n       \"value\":0\n     },\n     {  \n       \"feederID\":19,\n       \"value\":0\n     },\n     {  \n       \"feederID\":20,\n       \"value\":0\n     },\n     {  \n       \"feederID\":21,\n       \"value\":0\n     },\n     {  \n       \"feederID\":22,\n       \"value\":0\n     },\n     {  \n       \"feederID\":23,\n       \"value\":0\n     }\n   ],\n   \"sum\":454743.25,\n   \"unit\":\"mW/h\"\n },]",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API retrieves the energy usage information of a specific Lab  which are being monitored for energy usage behavior research.  </p> <p>It is referred into milliwatt per hr (mWh).</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Energy_Usage"
  },
  {
    "type": "get",
    "url": "api/labs/:labId/energy/hours.json",
    "title": "Retrieve the energy usage information which measured per hours",
    "name": "Retrieve_the_energy_usage_information_which_measured_per_hours",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "labId",
            "description": "<p>Lab&#39;s unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "base_time",
            "defaultValue": "timestamp_of_today's_midnight",
            "description": "<p>Query parameter to set the base time.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as today&#39;s midnight</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "to_time",
            "defaultValue": "1_day_more_from_base_time",
            "description": "<p>Query parameter to set the time to be collected.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as 1 day more from the base time</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "100",
            "description": "<p>Query parameter to set the number of items which will be retrieved.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Query parameter to set the skipped numbers of items.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "api/labs/marg/energy/hours.json?base_time=1430477977029&skip=100",
        "type": "js"
      }
    ],
    "group": "Lab_Energy_Usage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[  \n {  \n   \"dateFrom\":\"2015-04-01T00:00:00.000Z\",\n   \"dateTo\":\"2015-04-01T01:00:00.000Z\",\n   \"deviceID\":1168,\n   \"location\":\"D410\",\n   \"feeders\":[  \n     {  \n       \"feederID\":3,\n       \"value\":0.00005997222222222222\n     },\n     {  \n       \"feederID\":4,\n       \"value\":0.0000695\n     },\n     {  \n       \"feederID\":5,\n       \"value\":0.6066586944444444\n     },\n     {  \n       \"feederID\":6,\n       \"value\":0.1342481388888889\n     },\n     {  \n       \"feederID\":7,\n       \"value\":0.000011361111111111111\n     },\n     {  \n       \"feederID\":8,\n       \"value\":0.0001768888888888889\n     },\n     {  \n       \"feederID\":9,\n       \"value\":0.00012825\n     },\n     {  \n       \"feederID\":10,\n       \"value\":0.143789\n     },\n     {  \n       \"feederID\":11,\n       \"value\":0.18312230555555556\n     },\n     {  \n       \"feederID\":12,\n       \"value\":0.1638166388888889\n     },\n     {  \n       \"feederID\":13,\n       \"value\":0.6445815555555555\n     },\n     {  \n       \"feederID\":14,\n       \"value\":0.008646055555555556\n     },\n     {  \n       \"feederID\":15,\n       \"value\":0.00016791666666666666\n     },\n     {  \n       \"feederID\":16,\n       \"value\":0\n     },\n     {  \n       \"feederID\":17,\n       \"value\":0\n     },\n     {  \n       \"feederID\":18,\n       \"value\":0\n     },\n     {  \n       \"feederID\":19,\n       \"value\":0\n     },\n     {  \n       \"feederID\":20,\n       \"value\":0\n     },\n     {  \n       \"feederID\":21,\n       \"value\":0\n     },\n     {  \n       \"feederID\":22,\n       \"value\":0\n     },\n     {  \n       \"feederID\":23,\n       \"value\":0\n     }\n   ],\n   \"sum\":1.8854762777777778,\n   \"unit\":\"kW/h\"\n }]",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API retrieves the energy usage information of a specific Lab  which are being monitored for energy usage behavior research.  </p> <p>It is referred into kilowatt per hr. (kWh)</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Energy_Usage"
  },
  {
    "type": "get",
    "url": "api/labs/:labId/energy/secs.json",
    "title": "Retrieve the_energy usage information which measured per one second",
    "name": "Retrieve_the_energy_usage_information_which_measured_per_one_second",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "labId",
            "description": "<p>Lab&#39;s unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "base_time",
            "defaultValue": "timestamp_of_today's_midnight",
            "description": "<p>Query parameter to set the base time.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as today&#39;s midnight</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "100",
            "description": "<p>Query parameter to set the number of items which will be retrieved.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Query parameter to set the skipped numbers of items.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "api/labs/marg/energy/secs.json?base_time=1430477977029&skip=100",
        "type": "js"
      }
    ],
    "group": "Lab_Energy_Usage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[  \n {  \n   \"dateFrom\":\"2015-04-01T00:00:00.000Z\",\n   \"dateTo\":\"2015-04-01T00:00:01.000Z\",\n   \"deviceID\":1168,\n   \"location\":\"D410\",\n   \"feeders\":[  \n     {  \n       \"feederID\":3,\n       \"value\":0\n     },\n     {  \n       \"feederID\":4,\n       \"value\":0\n     },\n     {  \n       \"feederID\":5,\n       \"value\":0\n     },\n     {  \n       \"feederID\":6,\n       \"value\":0\n     },\n     {  \n       \"feederID\":7,\n       \"value\":0\n     },\n     {  \n       \"feederID\":8,\n       \"value\":0\n     },\n     {  \n       \"feederID\":9,\n       \"value\":0\n     },\n     {  \n       \"feederID\":10,\n       \"value\":0\n     },\n     {  \n       \"feederID\":11,\n       \"value\":0\n     },\n     {  \n       \"feederID\":12,\n       \"value\":0\n     },\n     {  \n       \"feederID\":13,\n       \"value\":0\n     },\n     {  \n       \"feederID\":14,\n       \"value\":0\n     },\n     {  \n       \"feederID\":15,\n       \"value\":0\n     },\n     {  \n       \"feederID\":16,\n       \"value\":0\n     },\n     {  \n       \"feederID\":17,\n       \"value\":0\n     },\n     {  \n       \"feederID\":18,\n       \"value\":0\n     },\n     {  \n       \"feederID\":19,\n       \"value\":0\n     },\n     {  \n       \"feederID\":20,\n       \"value\":0\n     },\n     {  \n       \"feederID\":21,\n       \"value\":0\n     },\n     {  \n       \"feederID\":22,\n       \"value\":0\n     },\n     {  \n       \"feederID\":23,\n       \"value\":0\n     }\n   ],\n   \"sum\":0,\n   \"unit\":\"mW/s\"\n }]",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API retrieves the energy usage information of a specific Lab  which are being monitored for energy usage behavior research.  It is referred into milliwatt per sec</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Energy_Usage"
  },
  {
    "type": "get",
    "url": "api/labs/:labId/energy/total.json",
    "title": "Retrieve the total energy usage information which measured from base_time to to_time.",
    "name": "Retrieve_the_total_energy_usage_information_which_measured_from_base_time_to_to_time_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "labId",
            "description": "<p>Lab&#39;s unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "base_time",
            "defaultValue": "timestamp_of_today's_midnight",
            "description": "<p>Query parameter to set the base time.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as today&#39;s midnight</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "to_time",
            "defaultValue": "1_day_more_from_base_time",
            "description": "<p>Query parameter to set the time to be collected.   It can be returned by invoking Date().getTime() in JavaScript.    If skipped it will be set as 1 day more from the base time</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Query parameter to set the skipped numbers of items.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "api/labs/marg/energy/total.json?base_time=1430477977029&to_time=1430479977000",
        "type": "js"
      }
    ],
    "group": "Lab_Energy_Usage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [  \n  {  \n    \"dateFrom\":\"2015-04-02T07:00:00.000Z\",\n    \"dateTo\":\"2015-04-02T07:33:20.000Z\",\n    \"deviceID\":1168,\n    \"location\":\"D410\",\n    \"feeders\":[  \n      {  \n        \"value\":0.0005318055555555555,\n        \"feederID\":3\n      },\n      {  \n        \"value\":0.0005967777777777778,\n        \"feederID\":4\n      },\n      {  \n        \"value\":5.167977,\n        \"feederID\":5\n      },\n      {  \n        \"value\":1.6122869722222222,\n        \"feederID\":6\n      },\n      {  \n        \"value\":0.00017716666666666667,\n        \"feederID\":7\n      },\n      {  \n        \"value\":0.0006883611111111112,\n        \"feederID\":8\n      },\n      {  \n        \"value\":0.0007983888888888888,\n        \"feederID\":9\n      },\n      {  \n        \"value\":1.07408875,\n        \"feederID\":10\n      },\n      {  \n        \"value\":1.3434753888888888,\n        \"feederID\":11\n      },\n      {  \n        \"value\":2.584917,\n        \"feederID\":12\n      },\n      {  \n        \"value\":9.474049138888889,\n        \"feederID\":13\n      },\n      {  \n        \"value\":0.057007555555555554,\n        \"feederID\":14\n      },\n      {  \n        \"value\":0.0007699166666666667,\n        \"feederID\":15\n      },\n      {  \n        \"value\":0,\n        \"feederID\":16\n      },\n      {  \n        \"value\":0,\n        \"feederID\":17\n      },\n      {  \n        \"value\":0,\n        \"feederID\":18\n      },\n      {  \n        \"value\":0,\n        \"feederID\":19\n      },\n      {  \n        \"value\":0,\n        \"feederID\":20\n      },\n      {  \n        \"value\":0,\n        \"feederID\":21\n      },\n      {  \n        \"value\":0,\n        \"feederID\":22\n      },\n      {  \n        \"value\":0,\n        \"feederID\":23\n      }\n    ],\n    \"sum\":21.31736422222222,\n    \"unit\":\"kW/h\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API retrieves the energy usage information of a specific Lab  which are being monitored for energy usage behavior research.  </p> <p>It is referred into kilowatt per hr. (kWh)</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Energy_Usage"
  },
  {
    "type": "get",
    "url": "api/labs",
    "title": "Listing Lab Information",
    "name": "Listing_Lab_Information",
    "group": "Lab_Information",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {  \n\"labs\":[  \n  {  \n    \"id\":\"ux\",\n   \"name\":\"UX Lab.\",\n    \"description\":\"User Experience Lab.\",\n    \"api\":[  \n      {  \n        \"href\":\"/api/labs/ux/energy/secs.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/ux/energy/quarters.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/ux/energy/hours.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/ux/energy/total.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/ux/energy/feeders\",\n        \"type\":\"ItemList\"\n      }\n    ]\n  },\n  {  \n    \"id\":\"marg\",\n    \"name\":\"MARG Lab.\",\n    \"description\":\"Music and Audio Research Group\",\n    \"api\":[  \n      {  \n        \"href\":\"/api/labs/marg/energy/secs.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/marg/energy/quarters.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/marg/energy/hours.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/marg/energy/total.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/marg/energy/feeders\",\n        \"type\":\"ItemList\"\n      }\n    ]\n  },\n  {  \n    \"id\":\"hcc\",\n    \"name\":\"HCC Lab.\",\n    \"description\":\"Human Centered Computing Laboratory\",\n    \"api\":[  \n      {  \n        \"href\":\"/api/labs/hcc/energy/secs.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/hcc/energy/quarters.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/hcc/energy/hours.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/hcc/energy/total.json\",\n        \"type\":\"ItemList\"\n      },\n      {  \n        \"href\":\"/api/labs/hcc/energy/feeders\",\n        \"type\":\"ItemList\"\n      }\n    ]\n  }\n],\n\"api\":[  \n  {  \n    \"href\":\"/api/labs/ux\",\n    \"type\":\"ItemList\"\n  },\n  {  \n    \"href\":\"/api/labs/marg\",\n    \"type\":\"ItemList\"\n  },\n  {  \n    \"href\":\"/api/labs/hcc\",\n    \"type\":\"ItemList\"\n  }\n]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API lists the available Labs which are being monitored for energy usage behavior research.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Information"
  },
  {
    "type": "get",
    "url": "api/labs:labId",
    "title": "Show the Lab Information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "labId",
            "description": "<p>Lab&#39;s unique ID.</p> "
          }
        ]
      }
    },
    "name": "Show_the_Lab_Information",
    "group": "Lab_Information",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"id\":\"ux\",\n\"name\":\"UX Lab.\",\n\"description\":\"User Experience Lab.\",\n\"api\":[{\"href\":\"/api/labs/ux/secs.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/quarters.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/hours.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/total.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/feeders\",\"type\":\"ItemList\"}]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API show the information of a specific Lab which are being monitored for energy usage behavior research.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Information"
  },
  {
    "type": "get",
    "url": "api/labs:labId",
    "title": "Show the Lab Energy Information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "labId",
            "description": "<p>Lab&#39;s unique ID.</p> "
          }
        ]
      }
    },
    "name": "Show_the_Lab_Information",
    "group": "Lab_Information",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"id\":\"ux\",\n\"name\":\"UX Lab.\",\n\"description\":\"User Experience Lab.\",\n\"api\":[{\"href\":\"/api/labs/ux/secs.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/quarters.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/hours.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/total.json\",\"type\":\"ItemList\"},\n    {\"href\":\"/api/labs/ux/feeders\",\"type\":\"ItemList\"}]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API show the information of a specific Lab which are being monitored for energy usage behavior research.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Lab_Information"
  }
] });