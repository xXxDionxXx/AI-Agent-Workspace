/**
 * AIA Standalone Premium Calculator - JS Calculation & Syncing Engine
 * Core Logic, Database Rates, and Tab Controllers
 */

// ==========================================
// 1. DATABASE RATE TABLES - LIFE & HEALTH BUNDLE
// ==========================================
const LIFE_RATE_20PAY = {
  11:{ m:14.96, f:12.87 }, 12:{ m:15.23, f:13.09 }, 13:{ m:15.52, f:13.32 }, 14:{ m:15.80, f:13.56 },
  15:{ m:16.09, f:13.76 }, 16:{ m:16.38, f:13.97 }, 17:{ m:16.67, f:14.19 }, 18:{ m:16.97, f:14.41 },
  19:{ m:17.27, f:14.65 }, 20:{ m:17.58, f:14.90 }, 21:{ m:17.90, f:15.15 }, 22:{ m:18.23, f:15.43 },
  23:{ m:18.57, f:15.71 }, 24:{ m:18.93, f:16.00 }, 25:{ m:19.31, f:16.31 }, 26:{ m:19.70, f:16.64 },
  27:{ m:20.12, f:16.98 }, 28:{ m:20.56, f:17.34 }, 29:{ m:21.02, f:17.72 }, 30:{ m:21.50, f:18.11 },
  31:{ m:22.01, f:18.53 }, 32:{ m:22.55, f:18.96 }, 33:{ m:23.11, f:19.42 }, 34:{ m:23.69, f:19.90 },
  35:{ m:24.30, f:20.40 }, 36:{ m:24.94, f:20.93 }, 37:{ m:25.61, f:21.48 }, 38:{ m:26.31, f:22.06 },
  39:{ m:27.04, f:22.67 }, 40:{ m:27.80, f:23.30 }, 41:{ m:28.60, f:23.96 }, 42:{ m:29.44, f:24.66 },
  43:{ m:30.32, f:25.39 }, 44:{ m:31.24, f:26.15 }, 45:{ m:32.20, f:26.95 }, 46:{ m:33.22, f:27.79 },
  47:{ m:34.28, f:28.68 }, 48:{ m:35.40, f:29.61 }, 49:{ m:36.57, f:30.59 }, 50:{ m:37.81, f:31.62 },
  51:{ m:39.13, f:32.72 }, 52:{ m:40.51, f:33.88 }, 53:{ m:41.99, f:35.11 }, 54:{ m:43.56, f:36.41 },
  55:{ m:45.25, f:37.81 }, 56:{ m:47.05, f:39.29 }, 57:{ m:48.99, f:40.89 }, 58:{ m:51.08, f:42.60 },
  59:{ m:53.33, f:44.44 }, 60:{ m:55.77, f:46.43 }, 61:{ m:58.42, f:48.59 }, 62:{ m:61.29, f:50.93 },
  63:{ m:64.19, f:53.49 }, 64:{ m:66.96, f:56.27 }, 65:{ m:69.89, f:59.32 }, 66:{ m:71.99, f:61.90 },
  67:{ m:73.80, f:63.61 }, 68:{ m:75.13, f:64.71 }, 69:{ m:76.40, f:66.13 }, 70:{ m:78.11, f:67.07 }
};

const HEALTH_SAVER = {
  "11_15": { label: "11 – 15 ปี", male:{200000:10100,300000:12300,400000:16400,500000:20200}, female:{200000:8500,300000:10500,400000:14400,500000:18200} },
  "16_20": { label: "16 – 20 ปี", male:{200000:7300,300000:8700,400000:10600,500000:13700}, female:{200000:7400,300000:9700,400000:12000,500000:15000} },
  "21_25": { label: "21 – 25 ปี", male:{200000:6900,300000:8400,400000:10400,500000:13400}, female:{200000:8600,300000:10600,400000:14400,500000:18100} },
  "26_30": { label: "26 – 30 ปี", male:{200000:7400,300000:8900,400000:13500,500000:16600}, female:{200000:9100,300000:11300,400000:17100,500000:21000} },
  "31_35": { label: "31 – 35 ปี", male:{200000:7500,300000:9300,400000:14700,500000:18900}, female:{200000:9200,300000:11700,400000:18000,500000:22700} },
  "36_40": { label: "36 – 40 ปี", male:{200000:8500,300000:10200,400000:15200,500000:20100}, female:{200000:10400,300000:11900,400000:18500,500000:25100} },
  "41_45": { label: "41 – 45 ปี", male:{200000:10000,300000:11400,400000:17100,500000:21600}, female:{200000:12100,300000:13800,400000:21700,500000:26500} },
  "46_50": { label: "46 – 50 ปี", male:{200000:11800,300000:13000,400000:18000,500000:24700}, female:{200000:14300,300000:16000,400000:23200,500000:29200} },
  "51_55": { label: "51 – 55 ปี", male:{200000:15400,300000:17200,400000:24300,500000:30900}, female:{200000:15500,300000:17200,400000:25600,500000:34100} },
  "56_60": { label: "56 – 60 ปี", male:{200000:20600,300000:24200,400000:30700,500000:40500}, female:{200000:20800,300000:24400,400000:31000,500000:40900} },
  "61_65": { label: "61 – 65 ปี", male:{200000:27300,300000:31000,400000:47000,500000:56600}, female:{200000:27600,300000:31300,400000:47500,500000:57200} },
  "66_70": { label: "66 – 70 ปี", male:{200000:37500,300000:47100,400000:65900,500000:81000}, female:{200000:37900,300000:47600,400000:66600,500000:81800} },
  "71_75": { label: "71 – 75 ปี", male:{200000:53700,300000:67400,400000:94400,500000:115800}, female:{200000:54200,300000:68100,400000:95300,500000:117000} },
  "76_80": { label: "76 – 80 ปี*", male:{200000:76900,300000:96600,400000:135200,500000:165600}, female:{200000:77700,300000:97600,400000:136600,500000:167300} },
  "81_85": { label: "81 – 85 ปี*", male:{200000:110200,300000:138500,400000:193800,500000:236800}, female:{200000:111300,300000:139900,400000:195700,500000:239200} },
  "86_90": { label: "86 – 90 ปี*", male:{200000:121200,300000:152400,400000:222900,500000:272300}, female:{200000:122400,300000:153900,400000:225100,500000:275100} },
  "91_95": { label: "91 – 95 ปี*", male:{200000:133300,300000:167600,400000:256300,500000:313100}, female:{200000:134600,300000:169300,400000:258900,500000:316400} },
  "96_98": { label: "96 – 98 ปี*", male:{200000:146600,300000:184400,400000:294700,500000:360100}, female:{200000:148100,300000:186200,400000:297700,500000:363900} }
};

const HEALTH_HAPPY = {
  "11_15": { label:"11 – 15 ปี", male:{1000000:16400,5000000:20200,15000000:25500,25000000:33400}, female:{1000000:14400,5000000:18200,15000000:21600,25000000:27900} },
  "16_20": { label:"16 – 20 ปี", male:{1000000:13500,5000000:16500,15000000:20100,25000000:26200}, female:{1000000:15200,5000000:19100,15000000:23100,25000000:30300} },
  "21_25": { label:"21 – 25 ปี", male:{1000000:13700,5000000:16900,15000000:21600,25000000:28000}, female:{1000000:17200,5000000:21500,15000000:27000,25000000:35300} },
  "26_30": { label:"26 – 30 ปี", male:{1000000:14700,5000000:18300,15000000:26100,25000000:33800}, female:{1000000:17500,5000000:21800,15000000:30600,25000000:38000} },
  "31_35": { label:"31 – 35 ปี", male:{1000000:15100,5000000:18900,15000000:29400,25000000:37800}, female:{1000000:18400,5000000:22700,15000000:34200,25000000:42300} },
  "36_40": { label:"36 – 40 ปี", male:{1000000:17000,5000000:20800,15000000:31800,25000000:40900}, female:{1000000:20400,5000000:25100,15000000:37200,25000000:46000} },
  "41_45": { label:"41 – 45 ปี", male:{1000000:19200,5000000:23800,15000000:36000,25000000:47300}, female:{1000000:22300,5000000:27800,15000000:42900,25000000:53600} },
  "46_50": { label:"46 – 50 ปี", male:{1000000:21600,5000000:26700,15000000:40200,25000000:52400}, female:{1000000:24500,5000000:30400,15000000:46500,25000000:60700} },
  "51_55": { label:"51 – 55 ปี", male:{1000000:28300,5000000:35000,15000000:50100,25000000:65300}, female:{1000000:28500,5000000:35200,15000000:50700,25000000:65500} },
  "56_59": { label:"56 – 59 ปี", male:{1000000:34100,5000000:42300,15000000:63900,25000000:83000}, female:{1000000:34400,5000000:42500,15000000:65100,25000000:84600} },
  "60_65": { label:"60 – 65 ปี", male:{1000000:40900,5000000:50600,15000000:72300,25000000:94100}, female:{1000000:41500,5000000:50800,15000000:73500,25000000:95700} },
  "66_70": { label:"66 – 70 ปี", male:{1000000:59400,5000000:72100,15000000:105000,25000000:136700}, female:{1000000:60800,5000000:74100,15000000:107100,25000000:139300} },
  "71_75": { label:"71 – 75 ปี", male:{1000000:85400,5000000:104000,15000000:152100,25000000:197800}, female:{1000000:88200,5000000:107500,15000000:155700,25000000:202000} },
  "76_80": { label:"76 – 80 ปี*", male:{1000000:122900,5000000:150000,15000000:219900,25000000:286300}, female:{1000000:126300,5000000:154400,15000000:224700,25000000:291800} },
  "81_85": { label:"81 – 85 ปี*", male:{1000000:177800,5000000:217100,15000000:318300,25000000:414700}, female:{1000000:182700,5000000:223400,15000000:325500,25000000:422700} },
  "86_90": { label:"86 – 90 ปี*", male:{1000000:204500,5000000:249700,15000000:366000,25000000:476900}, female:{1000000:210100,5000000:256900,15000000:374400,25000000:486100} },
  "91_95": { label:"91 – 95 ปี*", male:{1000000:235200,5000000:287200,15000000:420900,25000000:548400}, female:{1000000:241600,5000000:295400,15000000:430500,25000000:559000} },
  "96_98": { label:"96 – 98 ปี*", male:{1000000:270500,5000000:330300,15000000:484200,25000000:630700}, female:{1000000:277800,5000000:339700,15000000:495000,25000000:642900} }
};

const HS_NEW_STANDARD = {
  plans:[1000,1600,2200,2800,3400,4000,5000],
  male:{
    "11_20":[4030,5400,6160,6790,8160,9520,11960],
    "21_35":[3560,4760,5390,6020,7310,8500,10590],
    "36_40":[4200,5640,6270,7000,8330,9940,12370],
    "41_45":[4550,6120,6820,7630,9180,10760,13400],
    "46_50":[4900,6600,7370,8190,9860,11500,14170],
    "51_55":[6240,8400,9460,10360,12410,14780,17710],
    "56_60":[8110,10960,12320,13510,16490,19400,23220],
    "61_65":[10710,14240,16170,17850,21590,25160,30980],
    "66_70":[15930,21200,24090,27090,32640,37760,45620],
    "71_75":[24870,33200,37730,42280,50830,59140,72330],
    "76_80":[39230,52440,59510,66710,80240,93480,115200],
    "81_85":[54920,73400,83270,93380,112370,130880,161280],
    "86_90":[60410,80740,91610,102750,123670,143970,177410],
    "91_95":[66450,88810,100760,112990,135990,158370,195150],
    "96_98":[73100,97690,110840,124310,149590,174210,214670]
  },
  female:{
    "11_20":[4030,5400,6160,6790,8160,9520,11960],
    "21_35":[4600,6200,7040,7700,9350,10960,13630],
    "36_40":[5460,7200,8140,9030,10880,12700,15650],
    "41_45":[5920,7800,8800,9800,11730,13740,16980],
    "46_50":[6420,8520,9570,10500,12750,14820,18420],
    "51_55":[8120,10800,12210,13580,16320,18860,23690],
    "56_60":[10540,14120,15730,17570,21250,25000,30740],
    "61_65":[13810,18520,20900,23240,27710,32700,40290],
    "66_70":[20330,27560,31020,34860,41990,48200,60460],
    "71_75":[31930,43160,48730,54670,65790,75940,95250],
    "76_80":[50560,68200,77110,86310,103870,120480,151110],
    "81_85":[70780,95480,107910,120820,145350,168680,211550],
    "86_90":[77860,105030,118710,132920,159890,185550,232710],
    "91_95":[85650,115530,130570,146220,175940,204110,255980],
    "96_98":[94220,127080,143640,160850,193470,224520,281580]
  }
};

const HS_EXTRA_NEW_STANDARD = {
  plans:[1500,2000,2500,3500,4500,5500,6500],
  male:{
    "11_15":[7370,9380,10600,13280,15900,17420,18730],
    "16_20":[7280,8630,9880,12150,14750,16500,17930],
    "21_25":[6820,8320,9770,12050,14680,16460,17910],
    "26_30":[6920,8520,9850,12920,15630,17700,19210],
    "31_35":[7060,8900,10270,13040,15680,17690,19280],
    "36_40":[7330,9200,10780,13070,15720,17850,19270],
    "41_45":[7780,9710,11550,13800,16550,18290,19860],
    "46_50":[8540,10530,12470,15620,18860,21060,22660],
    "51_55":[10890,13680,16800,21580,26530,29750,32010],
    "56_60":[15270,18830,21820,31900,38650,44240,48190],
    "61_65":[22410,26510,29820,44080,54090,61730,67360],
    "66_70":[31530,37460,42550,62140,77250,88020,96040],
    "71_75":[47040,55280,62490,85460,106810,121700,132630],
    "76_80":[67730,79600,89980,123060,153800,175250,190980],
    "81_85":[94820,111430,125970,172280,215320,245340,267370],
    "86_90":[104300,122570,138570,189510,236850,269870,294110],
    "91_95":[114730,134830,152430,208460,260540,296860,323520],
    "96_98":[126200,148310,167670,229310,286590,326550,355870]
  },
  female:{
    "11_15":[7690,9810,11620,15410,18380,20120,21600],
    "16_20":[7370,9690,11170,15190,18380,19950,21550],
    "21_25":[8510,10550,12420,16390,20120,22260,24050],
    "26_30":[9050,11300,12890,17030,20740,23250,24760],
    "31_35":[9170,11330,13030,17330,21030,23550,25080],
    "36_40":[9420,11800,14070,17970,21500,23820,25510],
    "41_45":[10050,12610,15070,19310,23190,25720,27580],
    "46_50":[11080,13760,16880,22380,27160,30190,32400],
    "51_55":[13790,16730,20160,26830,32920,36760,39370],
    "56_60":[17970,21880,25290,34000,42170,48060,51340],
    "61_65":[23990,28910,34030,46090,57150,65060,71040],
    "66_70":[33060,39360,45860,62780,77480,88060,96180],
    "71_75":[47540,56580,64620,86810,108830,123660,134860],
    "76_80":[68460,81480,93050,125010,156720,178070,194200],
    "81_85":[95840,114060,130270,175010,219400,249300,271880],
    "86_90":[105420,125470,143300,192510,241340,274230,299070],
    "91_95":[115960,138020,157630,211760,265470,301650,328980],
    "96_98":[127560,151820,173390,232940,292020,331820,361880]
  }
};

// ==========================================
// 2. DATABASE RATE TABLES - SAVINGS PLANS
// ==========================================
const RATE_5P10 = {
  r16_40: { label:"16 – 40 ปี", rate:870 },
  r41_55: { label:"41 – 55 ปี", rate:880 },
  r56_60: { label:"56 – 60 ปี", rate:900 }
};

const RATE_SAVING_SURE = {
  d15: 96.53,
  1: 99.24,  2: 102.02, 3: 104.87, 4: 107.81, 5: 110.83,
  6: 113.93, 7: 117.12, 8: 120.40, 9: 123.77, 10: 127.24,
  11:130.80, 12:134.46, 13:138.23, 14:142.10, 15:146.07,
  16:150.17, 17:154.37, 18:158.69, 19:163.14, 20:167.70,
  21:172.40, 22:177.23, 23:182.19, 24:187.29, 25:192.53,
  26:197.92, 27:203.47, 28:209.16, 29:215.02, 30:221.04,
  31:227.23, 32:233.59, 33:240.13, 34:246.86, 35:253.77,
  36:260.87, 37:268.18, 38:275.69, 39:283.41, 40:291.34,
  41:299.50, 42:307.89, 43:316.51, 44:325.37, 45:334.48,
  46:343.84, 47:353.47, 48:363.37, 49:373.54, 50:384.00
};

const RATE_ENDOWMENT = {
  r15d_35: { label:"15 วัน – 35 ปี", rate:82 },
  r36_40:  { label:"36 – 40 ปี", rate:83 },
  r41_45:  { label:"41 – 45 ปี", rate:84 },
  r46_50:  { label:"46 – 50 ปี", rate:86 },
  r51_55:  { label:"51 – 55 ปี", rate:88 },
  r56_65:  { label:"56 – 65 ปี", rate:90 },
  r66:     { label:"66 ปี", rate:91 },
  r67:     { label:"67 ปี", rate:93 },
  r68:     { label:"68 ปี", rate:94 },
  r69:     { label:"69 ปี", rate:95 },
  r70:     { label:"70 ปี", rate:96 }
};

const RATE_EXCELLENT = {
  d15:152.90,
  1:152.90, 2:152.90, 3:152.90, 4:152.90, 5:152.90,
  6:152.90, 7:152.90, 8:152.90, 9:152.90, 10:152.90,
  11:152.90, 12:152.90, 13:152.90, 14:152.90, 15:152.90,
  16:152.90, 17:152.90, 18:152.90, 19:152.90, 20:152.90,
  21:152.90, 22:152.90, 23:152.90, 24:152.90, 25:152.90,
  26:152.90, 27:152.90, 28:152.90, 29:152.90, 30:152.90,
  31:152.90, 32:152.90, 33:152.90, 34:152.90, 35:152.90,
  36:153.60, 37:153.60, 38:153.60, 39:153.60, 40:153.60,
  41:154.90, 42:154.90, 43:154.90, 44:154.90,
  45:155.90, 46:155.90,
  47:156.50, 48:156.50, 49:156.50, 50:156.50, 51:156.50,
  52:158.20, 53:158.20, 54:158.20, 55:158.20,
  56:158.80, 57:159.40, 58:160.00, 59:160.60, 60:161.20,
  61:161.70, 62:162.30, 63:162.90, 64:163.50, 65:164.10,
  66:164.70, 67:165.30, 68:165.90, 69:166.50, 70:167.10,
  71:167.60, 72:168.20, 73:168.80, 74:169.40, 75:170.00
};

// ==========================================
// 3. DATABASE RATE TABLES - RETIREMENT PLANS
// ==========================================
const RATE_FIX = {
  20:{ m:16.20, f:16.50 }, 21:{ m:16.80, f:17.10 }, 22:{ m:17.40, f:17.70 }, 23:{ m:18.10, f:18.30 },
  24:{ m:18.80, f:19.00 }, 25:{ m:19.50, f:19.70 }, 26:{ m:20.30, f:20.50 }, 27:{ m:21.20, f:21.40 },
  28:{ m:22.20, f:22.40 }, 29:{ m:23.30, f:23.50 }, 30:{ m:25.70, f:25.80 }, 31:{ m:27.00, f:27.10 },
  32:{ m:28.40, f:28.50 }, 33:{ m:29.90, f:30.00 }, 34:{ m:31.60, f:31.70 }, 35:{ m:33.40, f:33.40 },
  36:{ m:35.40, f:35.40 }, 37:{ m:37.50, f:37.50 }, 38:{ m:39.90, f:39.80 }, 39:{ m:42.40, f:42.40 },
  40:{ m:45.30, f:45.20 }, 41:{ m:48.50, f:48.30 }, 42:{ m:52.00, f:51.70 }, 43:{ m:56.00, f:55.60 },
  44:{ m:60.40, f:60.10 }, 45:{ m:65.60, f:65.20 }, 46:{ m:71.50, f:70.90 }, 47:{ m:78.30, f:77.60 },
  48:{ m:86.30, f:85.60 }, 49:{ m:95.83, f:95.07 }, 50:{ m:107.20, f:106.33 }, 51:{ m:121.10, f:120.10 },
  52:{ m:138.60, f:137.60 }, 53:{ m:161.50, f:160.30 }, 54:{ m:192.40, f:191.00 }, 55:{ m:236.50, f:234.80 }
};

const RATE_SURE = {
  20:{ p9:{m:154.00,f:168.00}, to60:{m:44.00,f:47.00} },
  21:{ p9:{m:157.00,f:172.00}, to60:{m:46.00,f:50.00} },
  22:{ p9:{m:161.00,f:176.00}, to60:{m:48.00,f:51.00} },
  23:{ p9:{m:164.00,f:179.00}, to60:{m:50.00,f:54.00} },
  24:{ p9:{m:167.00,f:183.00}, to60:{m:51.00,f:56.00} },
  25:{ p9:{m:171.00,f:187.00}, to60:{m:55.00,f:58.00} },
  26:{ p9:{m:175.00,f:190.00}, to60:{m:56.00,f:61.00} },
  27:{ p9:{m:179.00,f:194.00}, to60:{m:59.00,f:64.00} },
  28:{ p9:{m:183.00,f:199.00}, to60:{m:61.00,f:67.00} },
  29:{ p9:{m:187.00,f:202.00}, to60:{m:64.00,f:70.00} },
  30:{ p9:{m:191.00,f:207.00}, to60:{m:70.00,f:73.00} },
  31:{ p9:{m:195.00,f:212.00}, to60:{m:70.00,f:77.00} },
  32:{ p9:{m:200.00,f:216.00}, to60:{m:74.00,f:80.00} },
  33:{ p9:{m:204.00,f:221.00}, to60:{m:79.00,f:85.00} },
  34:{ p9:{m:209.00,f:225.00}, to60:{m:82.00,f:89.00} },
  35:{ p9:{m:213.00,f:230.00}, to60:{m:90.00,f:95.00} },
  36:{ p9:{m:218.00,f:236.00}, to60:{m:92.00,f:99.00} },
  37:{ p9:{m:223.00,f:242.00}, to60:{m:98.00,f:106.00} },
  38:{ p9:{m:228.00,f:247.00}, to60:{m:105.00,f:112.00} },
  39:{ p9:{m:235.00,f:254.00}, to60:{m:111.00,f:119.00} },
  40:{ p9:{m:241.00,f:260.00}, to60:{m:123.00,f:129.00} },
  41:{ p9:{m:247.00,f:267.00}, to60:{m:127.00,f:136.00} },
  42:{ p9:{m:255.00,f:273.00}, to60:{m:137.00,f:146.00} },
  43:{ p9:{m:262.00,f:281.00}, to60:{m:148.00,f:157.00} },
  44:{ p9:{m:270.00,f:288.00}, to60:{m:160.00,f:170.00} },
  45:{ p9:{m:279.00,f:296.00}, to60:{m:178.00,f:186.00} },
  46:{ p9:{m:287.00,f:304.00}, to60:{m:191.00,f:201.00} },
  47:{ p9:{m:296.00,f:313.00}, to60:{m:210.00,f:220.00} },
  48:{ p9:{m:306.00,f:321.00}, to60:{m:232.00,f:243.00} },
  49:{ p9:{m:316.00,f:331.00}, to60:{m:259.00,f:270.00} },
  50:{ p9:{m:328.00,f:340.00}, to60:{m:292.00,f:304.00} },
  51:{ to60:{m:333.00,f:345.00} },
  52:{ to60:{m:387.00,f:398.00} },
  53:{ to60:{m:458.00,f:467.00} },
  54:{ to60:{m:557.00,f:564.00} },
  55:{ to60:{m:649.00,f:676.00} }
};

// ==========================================
// 4. CORE MATH FUNCTIONS
// ==========================================
function moneyFormat(n) {
  if (!isFinite(n)) return "-";
  return Math.round(n).toLocaleString("th-TH") + " บาท";
}

function safeNum(n) {
  const parsed = Number(n);
  return isFinite(parsed) ? parsed : 0;
}

function lifeDiscountPer1000(sumAssured) {
  const sum = safeNum(sumAssured);
  if (sum >= 600000) return 2;
  if (sum >= 250000) return 1;
  return 0;
}

function getSaverHappyAgeRange(age) {
  const a = safeNum(age);
  if (a >= 11 && a <= 15) return "11_15";
  if (a >= 16 && a <= 20) return "16_20";
  if (a >= 21 && a <= 25) return "21_25";
  if (a >= 26 && a <= 30) return "26_30";
  if (a >= 31 && a <= 35) return "31_35";
  if (a >= 36 && a <= 40) return "36_40";
  if (a >= 41 && a <= 45) return "41_45";
  if (a >= 46 && a <= 50) return "46_50";
  if (a >= 51 && a <= 55) return "51_55";
  if (a >= 56 && a <= 59) return "56_59";
  if (a >= 60 && a <= 65) return "60_65";
  if (a >= 66 && a <= 70) return "66_70";
  if (a >= 71 && a <= 75) return "71_75";
  if (a >= 76 && a <= 80) return "76_80";
  if (a >= 81 && a <= 85) return "81_85";
  if (a >= 86 && a <= 90) return "86_90";
  if (a >= 91 && a <= 95) return "91_95";
  if (a >= 96 && a <= 98) return "96_98";
  return "31_35";
}

function getHSAgeRange(age) {
  const a = safeNum(age);
  if (a >= 11 && a <= 20) return "11_20";
  if (a >= 21 && a <= 35) return "21_35";
  if (a >= 36 && a <= 40) return "36_40";
  if (a >= 41 && a <= 45) return "41_45";
  if (a >= 46 && a <= 50) return "46_50";
  if (a >= 51 && a <= 55) return "51_55";
  if (a >= 56 && a <= 60) return "56_60";
  if (a >= 61 && a <= 65) return "61_65";
  if (a >= 66 && a <= 70) return "66_70";
  if (a >= 71 && a <= 75) return "71_75";
  if (a >= 76 && a <= 80) return "76_80";
  if (a >= 81 && a <= 85) return "81_85";
  if (a >= 86 && a <= 90) return "86_90";
  if (a >= 91 && a <= 95) return "91_95";
  if (a >= 96 && a <= 98) return "96_98";
  return "21_35";
}

function getHSRangeLabel(key) {
  const map = {
    "11_20": "11 – 20 ปี", "21_35": "21 – 35 ปี", "36_40": "36 – 40 ปี", "41_45": "41 – 45 ปี",
    "46_50": "46 – 50 ปี", "51_55": "51 – 55 ปี", "56_60": "56 – 60 ปี", "61_65": "61 – 65 ปี",
    "66_70": "66 – 70 ปี", "71_75": "71 – 75 ปี", "76_80": "76 – 80 ปี*", "81_85": "81 – 85 ปี*",
    "86_90": "86 – 90 ปี*", "91_95": "91 – 95 ปี*", "96_98": "96 – 98 ปี*"
  };
  return map[key] || key;
}

// Discount calculator helpers for Savings
function discountEndowmentPer1000(sum) {
  const s = safeNum(sum);
  if (s >= 600000) return 1.50;
  if (s >= 300000) return 1.00;
  return 0;
}

function discountExcellentPer1000(sum) {
  return safeNum(sum) >= 250000 ? 1.00 : 0;
}

// ==========================================
// 5. MAIN JS PAGE ROUTING CONTROLLER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-tab-btn");
  const sections = document.querySelectorAll(".calculator-view");
  const dashboard = document.getElementById("dashboard-view");
  const backToHubBtns = document.querySelectorAll(".back-to-hub-btn");
  const hubCards = document.querySelectorAll(".hub-card");

  function switchTab(targetTab) {
    dashboard.classList.add("hidden");
    sections.forEach(sec => sec.classList.add("hidden"));
    navItems.forEach(btn => btn.classList.remove("active"));

    if (targetTab === "dashboard") {
      dashboard.classList.remove("hidden");
    } else {
      const activeSec = document.getElementById(`${targetTab}-view`);
      if (activeSec) activeSec.classList.remove("hidden");
      const activeBtn = document.querySelector(`[data-tab="${targetTab}"]`);
      if (activeBtn) activeBtn.classList.add("active");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navItems.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.getAttribute("data-tab")));
  });

  hubCards.forEach(card => {
    card.addEventListener("click", () => switchTab(card.getAttribute("data-target")));
  });

  backToHubBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab("dashboard");
    });
  });

  // ==========================================
  // 6. CALCULATOR A: LIFE & HEALTH BUNDLE
  // ==========================================
  const bundleRoot = document.querySelector('[data-role="aia-bundle-calculator"]');
  if (bundleRoot) {
    const elLifeEnable = bundleRoot.querySelector('[data-role="life-enable"]');
    const elLifeAge    = bundleRoot.querySelector('[data-role="life-age"]');
    const elLifeSexes  = bundleRoot.querySelectorAll('[data-role="life-sex"]');
    const elLifeSum    = bundleRoot.querySelector('[data-role="life-sum"]');

    function getLifeSexValue() {
      const checked = bundleRoot.querySelector('[data-role="life-sex"]:checked');
      return checked ? checked.value : "male";
    }

    const elHealthSection = bundleRoot.querySelector('[data-role="health-section"]');
    const elHealthGroup   = bundleRoot.querySelector('[data-role="health-group"]');

    const elLumpWrap     = bundleRoot.querySelector('[data-role="health-lump-wrap"]');
    const elLumpProduct  = bundleRoot.querySelector('[data-role="health-lump-product"]');

    const elSaverBlock   = bundleRoot.querySelector('[data-role="health-saver-block"]');
    const elSaverEnable  = bundleRoot.querySelector('[data-role="health-saver-enable"]');
    const elSaverAge     = bundleRoot.querySelector('[data-role="health-saver-age-range"]');
    const elSaverSex     = bundleRoot.querySelector('[data-role="health-saver-sex"]');
    const elSaverPlan    = bundleRoot.querySelector('[data-role="health-saver-plan"]');

    const elHappyBlock   = bundleRoot.querySelector('[data-role="health-happy-block"]');
    const elHappyEnable  = bundleRoot.querySelector('[data-role="health-happy-enable"]');
    const elHappyAge     = bundleRoot.querySelector('[data-role="health-happy-age-range"]');
    const elHappySex     = bundleRoot.querySelector('[data-role="health-happy-sex"]');
    const elHappyPlan    = bundleRoot.querySelector('[data-role="health-happy-plan"]');

    const elSepWrap      = bundleRoot.querySelector('[data-role="health-separate-wrap"]');
    const elSepProduct   = bundleRoot.querySelector('[data-role="health-separate-product"]');

    const elHSBlock      = bundleRoot.querySelector('[data-role="health-hs-block"]');
    const elHSEnable     = bundleRoot.querySelector('[data-role="health-hs-enable"]');
    const elHSAge        = bundleRoot.querySelector('[data-role="health-hs-age-range"]');
    const elHSSex        = bundleRoot.querySelector('[data-role="health-hs-sex"]');
    const elHSPlan       = bundleRoot.querySelector('[data-role="health-hs-plan"]');

    const elHSXBlock     = bundleRoot.querySelector('[data-role="health-hs-extra-block"]');
    const elHSXEnable    = bundleRoot.querySelector('[data-role="health-hs-extra-enable"]');
    const elHSXAge       = bundleRoot.querySelector('[data-role="health-hs-extra-age-range"]');
    const elHSXSex       = bundleRoot.querySelector('[data-role="health-hs-extra-sex"]');
    const elHSXPlan      = bundleRoot.querySelector('[data-role="health-hs-extra-plan"]');

    const elHBSection = bundleRoot.querySelector('[data-role="hb-section"]');
    const elHBEnable  = bundleRoot.querySelector('[data-role="hb-enable"]');
    const elHBPlan    = bundleRoot.querySelector('[data-role="hb-plan"]');

    const elTotal = bundleRoot.querySelector('[data-role="total-premium"]');
    const elBreak = bundleRoot.querySelector('[data-role="breakdown"]');
    const copyBtn = document.querySelector(".btn-copy-proposal");

    function addOpt(selectEl, value, text) {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = text;
      selectEl.appendChild(opt);
    }

    // Populate dynamic drop inputs
    elLifeAge.innerHTML = "";
    for (let i = 11; i <= 70; i++) addOpt(elLifeAge, String(i), `${i} ปี`);

    elLifeSum.innerHTML = "";
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 45, 60, 90].forEach(m => {
      const sum = m * 100000;
      addOpt(elLifeSum, String(sum), sum.toLocaleString("th-TH") + " บาท");
    });

    elSaverAge.innerHTML = "";
    Object.keys(HEALTH_SAVER).forEach(k => addOpt(elSaverAge, k, HEALTH_SAVER[k].label));
    elSaverPlan.innerHTML = "";
    [200000, 300000, 400000, 500000].forEach(s => addOpt(elSaverPlan, String(s), `${s.toLocaleString("th-TH")} บาท`));

    elHappyAge.innerHTML = "";
    Object.keys(HEALTH_HAPPY).forEach(k => addOpt(elHappyAge, k, HEALTH_HAPPY[k].label));
    elHappyPlan.innerHTML = "";
    [
      { val: 1000000, text: "แผน 1 ล้านบาท" },
      { val: 5000000, text: "แผน 5 ล้านบาท" },
      { val: 15000000, text: "แผน 15 ล้านบาท" },
      { val: 25000000, text: "แผน 25 ล้านบาท" }
    ].forEach(p => addOpt(elHappyPlan, String(p.val), p.text));

    elHSAge.innerHTML = "";
    Object.keys(HS_NEW_STANDARD.male).forEach(k => addOpt(elHSAge, k, getHSRangeLabel(k)));
    elHSPlan.innerHTML = "";
    HS_NEW_STANDARD.plans.forEach(p => addOpt(elHSPlan, String(p), `แผน ${p.toLocaleString("th-TH")} (ค่าห้อง ${p} บ./วัน)`));

    elHSXAge.innerHTML = "";
    Object.keys(HS_EXTRA_NEW_STANDARD.male).forEach(k => addOpt(elHSXAge, k, getHSRangeLabel(k)));
    elHSXPlan.innerHTML = "";
    HS_EXTRA_NEW_STANDARD.plans.forEach(p => addOpt(elHSXPlan, String(p), `แผน ${p.toLocaleString("th-TH")} (ค่าห้อง ${p} บ./วัน)`));

    elHBPlan.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
      const daily = i * 1000;
      const premium = i * 1500;
      addOpt(elHBPlan, String(daily), `${daily.toLocaleString("th-TH")} บาท/วัน (เบี้ย ${premium.toLocaleString("th-TH")} บาท/ปี)`);
    }

    function syncCoreInputs() {
      const sex = getLifeSexValue();
      const age = safeNum(elLifeAge.value);

      [elSaverSex, elHappySex, elHSSex, elHSXSex].forEach(el => {
        el.value = sex;
        el.disabled = true;
      });

      const key = getSaverHappyAgeRange(age);
      let saverKey = key;
      if (saverKey === "56_59") saverKey = "56_60";
      if (saverKey === "60_65") saverKey = "61_65";
      if (HEALTH_SAVER[saverKey]) elSaverAge.value = saverKey;

      let happyKey = key;
      if (happyKey === "56_60") happyKey = "56_59";
      if (happyKey === "61_65") happyKey = "60_65";
      if (HEALTH_HAPPY[happyKey]) elHappyAge.value = happyKey;

      const hsKey = getHSAgeRange(age);
      elHSAge.value = hsKey;
      elHSXAge.value = hsKey;

      [elSaverAge, elHappyAge, elHSAge, elHSXAge].forEach(el => el.disabled = true);
    }

    function toggleSubSections() {
      const group = elHealthGroup.value;
      if (group === "lump") {
        elLumpWrap.classList.remove("hidden");
        elSepWrap.classList.add("hidden");
        elHSEnable.checked = false;
        elHSXEnable.checked = false;

        if (elLumpProduct.value === "saver") {
          elSaverBlock.classList.remove("hidden");
          elHappyBlock.classList.add("hidden");
          elSaverEnable.checked = true;
          elHappyEnable.checked = false;
        } else {
          elSaverBlock.classList.add("hidden");
          elHappyBlock.classList.remove("hidden");
          elSaverEnable.checked = false;
          elHappyEnable.checked = true;
        }
      } else {
        elLumpWrap.classList.add("hidden");
        elSepWrap.classList.remove("hidden");
        elSaverEnable.checked = false;
        elHappyEnable.checked = false;

        if (elSepProduct.value === "hs") {
          elHSBlock.classList.remove("hidden");
          elHSXBlock.classList.add("hidden");
          elHSEnable.checked = true;
          elHSXEnable.checked = false;
        } else {
          elHSBlock.classList.add("hidden");
          elHSXBlock.classList.remove("hidden");
          elHSEnable.checked = false;
          elHSXEnable.checked = true;
        }
      }
    }

    function lockRiders(elSection, isLocked) {
      if (!elSection) return;
      elSection.classList.toggle("disabled-section", isLocked);
      elSection.querySelectorAll("input, select").forEach(el => {
        if (!el.getAttribute("data-role").endsWith("-sex") && !el.getAttribute("data-role").endsWith("-age-range")) {
          el.disabled = isLocked;
        }
      });
    }

    function updateCalculations() {
      syncCoreInputs();
      toggleSubSections();

      const lifeActive = elLifeEnable.checked;
      lockRiders(elHealthSection, !lifeActive);

      const age = safeNum(elLifeAge.value);
      const hbLocked = !lifeActive || age > 55;
      lockRiders(elHBSection, hbLocked);
      if (hbLocked) elHBEnable.checked = false;

      // MATH
      const lifePrem = calculateLifePremium();
      const healthPrem = calculateHealthPremium();
      const hbPrem = calculateHBPremium();
      const grandTotal = lifePrem + healthPrem + hbPrem;

      elTotal.textContent = moneyFormat(grandTotal);

      elBreak.innerHTML = `
        <div class="breakdown-row"><span>ประกันชีวิตหลัก (20 PAY LIFE)</span><strong>${lifeActive ? moneyFormat(lifePrem) : "0 บาท"}</strong></div>
        <div class="breakdown-row border-t border-dashed border-gray-200 mt-2 pt-2"><span>${getHealthBreakdownLabel()}</span><strong>${lifeActive ? moneyFormat(healthPrem) : "0 บาท"}</strong></div>
        <div class="breakdown-row border-t border-dashed border-gray-200 mt-2 pt-2"><span>ชดเชยรายได้รายวัน (HB)</span><strong>${(!hbLocked && elHBEnable.checked) ? moneyFormat(hbPrem) : "0 บาท"}</strong></div>
        ${!lifeActive ? `<div class="breakdown-warning-text mt-2">* กรุณาเปิด "20 PAY LIFE" ก่อนซื้อสัญญาเพิ่มเติม</div>` : ""}
        ${(lifeActive && age > 55) ? `<div class="breakdown-warning-text mt-2">* สัญญาเพิ่มเติม HB ซื้อได้ถึงอายุ 55 ปีเท่านั้น</div>` : ""}
      `;
    }

    function calculateLifePremium() {
      if (!elLifeEnable.checked) return 0;
      const sexKey = getLifeSexValue() === "female" ? "f" : "m";
      const rate = LIFE_RATE_20PAY[elLifeAge.value][sexKey];
      const discount = lifeDiscountPer1000(elLifeSum.value);
      return Math.max(0, rate - discount) * (safeNum(elLifeSum.value) / 1000);
    }

    function calculateHealthPremium() {
      if (!elLifeEnable.checked) return 0;
      if (elHealthGroup.value === "lump") {
        if (elLumpProduct.value === "saver") {
          return !elSaverEnable.checked ? 0 : safeNum(HEALTH_SAVER[elSaverAge.value][elSaverSex.value][elSaverPlan.value]);
        } else {
          return !elHappyEnable.checked ? 0 : safeNum(HEALTH_HAPPY[elHappyAge.value][elHappySex.value][elHappyPlan.value]);
        }
      } else {
        const sex = getLifeSexValue();
        const key = elHSAge.value;
        if (elSepProduct.value === "hs") {
          const idx = HS_NEW_STANDARD.plans.indexOf(safeNum(elHSPlan.value));
          return idx < 0 ? 0 : safeNum(HS_NEW_STANDARD[sex][key][idx]);
        } else {
          const idx = HS_EXTRA_NEW_STANDARD.plans.indexOf(safeNum(elHSXPlan.value));
          return idx < 0 ? 0 : safeNum(HS_EXTRA_NEW_STANDARD[sex][key][idx]);
        }
      }
    }

    function calculateHBPremium() {
      if (!elLifeEnable.checked || safeNum(elLifeAge.value) > 55 || !elHBEnable.checked) return 0;
      return safeNum(elHBPlan.value) * 1.5;
    }

    function getHealthBreakdownLabel() {
      if (elHealthGroup.value === "lump") {
        return elLumpProduct.value === "saver" ? "AIA Health Saver (เหมาจ่าย)" : "AIA Health Happy (เหมาจ่าย)";
      }
      return elSepProduct.value === "hs" ? "AIA H&S (แยกค่าใช้จ่าย)" : "AIA H&S Extra (แยกค่าใช้จ่าย)";
    }

    // Connect Bundle events
    [
      elLifeEnable, elLifeAge, elLifeSum, elHealthGroup, elLumpProduct,
      elSaverEnable, elSaverPlan, elHappyEnable, elHappyPlan, elSepProduct,
      elHSEnable, elHSPlan, elHSXEnable, elHSXPlan, elHBEnable, elHBPlan
    ].forEach(el => el.addEventListener("change", updateCalculations));

    elLifeSexes.forEach(el => el.addEventListener("change", updateCalculations));

    // Proposal Sharer
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const text = `📋 ข้อเสนอเบี้ยประกันภัยเอไอเอ (AIA Proposal Summary)
----------------------------------------
ผู้เอาประกันภัย: เพศ${getLifeSexValue() === "male" ? "ชาย" : "หญิง"} อายุ ${elLifeAge.value} ปี
1. ประกันชีวิตหลัก (20 PAY LIFE): ${moneyFormat(calculateLifePremium())} (ทุน ${Number(elLifeSum.value).toLocaleString()} บาท)
2. ประกันสุขภาพ (${getHealthBreakdownLabel()}): ${moneyFormat(calculateHealthPremium())}
3. ชดเชยรายได้รายวัน (HB): ${elHBEnable.checked ? moneyFormat(calculateHBPremium()) + " (ชดเชย " + Number(elHBPlan.value).toLocaleString() + " บาท/วัน)" : "ไม่ได้เลือก"}
----------------------------------------
💰 เบี้ยประกันภัยรวมรายปีทั้งสิ้น: ${moneyFormat(calculateLifePremium() + calculateHealthPremium() + calculateHBPremium())}`;

        navigator.clipboard.writeText(text).then(() => {
          const old = copyBtn.textContent;
          copyBtn.textContent = "✓ คัดลอกสำเร็จ!";
          copyBtn.style.background = "#22c55e";
          setTimeout(() => {
            copyBtn.textContent = old;
            copyBtn.style.background = "";
          }, 2000);
        });
      });
    }

    updateCalculations();
  }

  // ==========================================
  // 7. CALCULATOR B: SAVINGS PLANS (สะสมทรัพย์)
  // ==========================================
  const savingsRoot = document.querySelector('[data-role="aia-savings-calculator"]');
  if (savingsRoot) {
    const sPlanSelect = savingsRoot.querySelector('[data-role="planSelect"]');
    const sPanel5p10 = savingsRoot.querySelector('[data-role="panel5p10"]');
    const sPanelSure = savingsRoot.querySelector('[data-role="panelSavingSure"]');
    const sPanelEndow = savingsRoot.querySelector('[data-role="panelEndowment"]');
    const sPanelEx = savingsRoot.querySelector('[data-role="panelExcellent"]');

    // 5 Pay 10 elements
    const age5p10 = savingsRoot.querySelector('[data-role="ageRange5p10"]');
    const sex5p10 = savingsRoot.querySelector('[data-role="sex5p10"]');
    const sum5p10 = savingsRoot.querySelector('[data-role="sum5p10"]');
    const premium5p10 = savingsRoot.querySelector('[data-role="premium5p10"]');

    // Saving Sure elements
    const ageSure = savingsRoot.querySelector('[data-role="ageSavingSure"]');
    const sumSure = savingsRoot.querySelector('[data-role="sumSavingSure"]');
    const premiumSure = savingsRoot.querySelector('[data-role="premiumSavingSure"]');

    // Endowment elements
    const ageEndow = savingsRoot.querySelector('[data-role="ageRangeEndowment"]');
    const sexEndow = savingsRoot.querySelector('[data-role="sexEndowment"]');
    const sumEndow = savingsRoot.querySelector('[data-role="sumEndowment"]');
    const premiumEndow = savingsRoot.querySelector('[data-role="premiumEndowment"]');
    const pillEndow = savingsRoot.querySelector('[data-role="pillEndowment"]');

    // Excellent elements
    const ageEx = savingsRoot.querySelector('[data-role="ageExcellent"]');
    const sexEx = savingsRoot.querySelector('[data-role="sexExcellent"]');
    const sumEx = savingsRoot.querySelector('[data-role="sumExcellent"]');
    const premiumEx = savingsRoot.querySelector('[data-role="premiumExcellent"]');
    const pillEx = savingsRoot.querySelector('[data-role="pillExcellent"]');

    function populateSelectOptions(selectEl, value, text) {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = text;
      selectEl.appendChild(opt);
    }

    // Populate options
    age5p10.innerHTML = "";
    Object.keys(RATE_5P10).forEach(k => populateSelectOptions(age5p10, k, RATE_5P10[k].label));
    sum5p10.innerHTML = "";
    [20000, 30000, 40000, 50000, 100000, 200000, 500000, 1000000].forEach(s => populateSelectOptions(sum5p10, String(s), s.toLocaleString() + " บาท"));

    ageSure.innerHTML = "";
    populateSelectOptions(ageSure, "d15", "15 วัน");
    for (let i = 1; i <= 50; i++) populateSelectOptions(ageSure, String(i), `${i} ปี`);
    sumSure.innerHTML = "";
    [100000, 200000, 300000, 500000, 1000000, 3000000, 5000000].forEach(s => populateSelectOptions(sumSure, String(s), s.toLocaleString() + " บาท"));

    ageEndow.innerHTML = "";
    Object.keys(RATE_ENDOWMENT).forEach(k => populateSelectOptions(ageEndow, k, RATE_ENDOWMENT[k].label));
    sumEndow.innerHTML = "";
    [100000, 200000, 300000, 500000, 1000000, 5000000].forEach(s => populateSelectOptions(sumEndow, String(s), s.toLocaleString() + " บาท"));

    ageEx.innerHTML = "";
    populateSelectOptions(ageEx, "d15", "15 วัน");
    for (let i = 1; i <= 75; i++) populateSelectOptions(ageEx, String(i), `${i} ปี`);
    sumEx.innerHTML = "";
    [100000, 200000, 300000, 500000, 1000000, 5000000].forEach(s => populateSelectOptions(sumEx, String(s), s.toLocaleString() + " บาท"));

    function switchSavingsPanel() {
      const activePlan = sPlanSelect.value;
      [sPanel5p10, sPanelSure, sPanelEndow, sPanelEx].forEach(p => p.classList.add("hidden"));
      [premium5p10, premiumSure, premiumEndow, premiumEx].forEach(p => p.classList.add("hidden"));

      if (activePlan === "aia_5pay10") {
        sPanel5p10.classList.remove("hidden");
        premium5p10.classList.remove("hidden");
      } else if (activePlan === "aia_savingsure") {
        sPanelSure.classList.remove("hidden");
        premiumSure.classList.remove("hidden");
      } else if (activePlan === "aia_endowment1525") {
        sPanelEndow.classList.remove("hidden");
        premiumEndow.classList.remove("hidden");
      } else if (activePlan === "aia_excellent") {
        sPanelEx.classList.remove("hidden");
        premiumEx.classList.remove("hidden");
      }

      runSavingsCalculations();
    }

    function runSavingsCalculations() {
      const activePlan = sPlanSelect.value;

      if (activePlan === "aia_5pay10") {
        const rate = RATE_5P10[age5p10.value].rate;
        premium5p10.textContent = moneyFormat(rate * (safeNum(sum5p10.value) / 1000));
      } 
      else if (activePlan === "aia_savingsure") {
        const rate = RATE_SAVING_SURE[ageSure.value];
        premiumSure.textContent = moneyFormat(rate * (safeNum(sumSure.value) / 1000));
      } 
      else if (activePlan === "aia_endowment1525") {
        const baseRate = RATE_ENDOWMENT[ageEndow.value].rate;
        const discount = discountEndowmentPer1000(sumEndow.value);
        const finalRate = Math.max(0, baseRate - discount);
        premiumEndow.textContent = moneyFormat(finalRate * (safeNum(sumEndow.value) / 1000));
        pillEndow.style.display = discount > 0 ? "inline-flex" : "none";
      } 
      else if (activePlan === "aia_excellent") {
        const baseRate = RATE_EXCELLENT[ageEx.value];
        const discount = discountExcellentPer1000(sumEx.value);
        const finalRate = Math.max(0, baseRate - discount);
        premiumEx.textContent = moneyFormat(finalRate * (safeNum(sumEx.value) / 1000));
        pillEx.style.display = discount > 0 ? "inline-flex" : "none";
      }
    }

    sPlanSelect.addEventListener("change", switchSavingsPanel);
    [
      age5p10, sex5p10, sum5p10, ageSure, sumSure,
      ageEndow, sexEndow, sumEndow, ageEx, sexEx, sumEx
    ].forEach(el => {
      el.addEventListener("change", runSavingsCalculations);
      el.addEventListener("input", runSavingsCalculations);
    });

    switchSavingsPanel();
  }

  // ==========================================
  // 8. CALCULATOR C: RETIREMENT PLANS (บำนาญ)
  // ==========================================
  const retirementRoot = document.querySelector('[data-role="aia-retirement-calculator"]');
  if (retirementRoot) {
    const rPlanSelect = retirementRoot.querySelector('[data-role="planSelect"]');
    const rPanelFix = retirementRoot.querySelector('[data-role="panelAnnuityFix"]');
    const rPanelSure = retirementRoot.querySelector('[data-role="panelAnnuitySure"]');

    // Annuity Fix elements
    const ageFix = retirementRoot.querySelector('[data-role="ageFix"]');
    const sexFix = retirementRoot.querySelector('[data-role="sexFix"]');
    const sumFix = retirementRoot.querySelector('[data-role="sumFix"]');
    const premiumFix = retirementRoot.querySelector('[data-role="premiumAnnuityFix"]');

    // Annuity Sure elements
    const paySure = retirementRoot.querySelector('[data-role="paySure"]');
    const ageSure = retirementRoot.querySelector('[data-role="ageSure"]');
    const sexSure = retirementRoot.querySelector('[data-role="sexSure"]');
    const sumSure = retirementRoot.querySelector('[data-role="sumSure"]');
    const premiumSure = retirementRoot.querySelector('[data-role="premiumAnnuitySure"]');

    function populateSelectOptions(selectEl, value, text) {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = text;
      selectEl.appendChild(opt);
    }

    // Populate Fix Age & Sum
    ageFix.innerHTML = "";
    for (let i = 20; i <= 55; i++) populateSelectOptions(ageFix, String(i), `${i} ปี`);
    sumFix.innerHTML = "";
    [200000, 300000, 500000, 1000000, 3000000, 5000000].forEach(s => populateSelectOptions(sumFix, String(s), s.toLocaleString() + " บาท"));

    // Populate Sure Sums
    sumSure.innerHTML = "";
    [100000, 200000, 300000, 500000, 1000000, 5000000].forEach(s => populateSelectOptions(sumSure, String(s), s.toLocaleString() + " บาท"));

    function rebuildSureAges() {
      const plan = paySure.value;
      ageSure.innerHTML = "";
      const maxAge = plan === "p9" ? 50 : 55;
      for (let a = 20; a <= maxAge; a++) {
        populateSelectOptions(ageSure, String(a), `${a} ปี`);
      }
      ageSure.value = plan === "p9" ? "30" : "35";
    }

    function switchRetirementPanel() {
      const activePlan = rPlanSelect.value;
      [rPanelFix, rPanelSure].forEach(p => p.classList.add("hidden"));
      [premiumFix, premiumSure].forEach(p => p.classList.add("hidden"));

      if (activePlan === "annuity_fix") {
        rPanelFix.classList.remove("hidden");
        premiumFix.classList.remove("hidden");
      } else if (activePlan === "annuity_sure") {
        rPanelSure.classList.remove("hidden");
        premiumSure.classList.remove("hidden");
      }

      runRetirementCalculations();
    }

    function runRetirementCalculations() {
      const activePlan = rPlanSelect.value;

      if (activePlan === "annuity_fix") {
        const rateRow = RATE_FIX[ageFix.value];
        const sex = sexFix.value;
        const rate = sex === "male" ? rateRow.m : rateRow.f;
        premiumFix.textContent = moneyFormat(rate * (safeNum(sumFix.value) / 1000));
      } 
      else if (activePlan === "annuity_sure") {
        const plan = paySure.value;
        const sex = sexSure.value;
        const rateRow = RATE_SURE[ageSure.value] || {};
        const planRow = rateRow[plan] || {};
        const rate = sex === "male" ? planRow.m : planRow.f;

        if (rate === undefined) {
          premiumSure.textContent = "ไม่มีอัตราเบี้ยของอายุนี้ในแบบชำระเงินที่เลือก";
        } else {
          premiumSure.textContent = moneyFormat(rate * (safeNum(sumSure.value) / 1000));
        }
      }
    }

    paySure.addEventListener("change", () => {
      rebuildSureAges();
      runRetirementCalculations();
    });

    rPlanSelect.addEventListener("change", switchRetirementPanel);
    [
      ageFix, sexFix, sumFix, ageSure, sexSure, sumSure
    ].forEach(el => {
      el.addEventListener("change", runRetirementCalculations);
      el.addEventListener("input", runRetirementCalculations);
    });

    rebuildSureAges();
    switchRetirementPanel();
  }
});
