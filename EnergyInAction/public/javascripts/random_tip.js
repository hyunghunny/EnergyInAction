var tips = [
  "컴퓨터, 프린터등 사무기기를 장시간 미사용 하는 경우 전원을 차단합니다",
"중식 시간 및 퇴실 1시간 전에는 난방기 가동을 중지합니다",
"점심시간과 야간시간에는 조명을 일괄 소등하되, 필요한 부분만 점등합니다",
"주간에는 창 측 조명을 소등하고 채광을 이용합시다",
"커튼이나 블라인드로 열을 막으면 에너지 절감이 됩니다",
"컴퓨터는 절전모드를 설정합시다(권장: 10분)",
"에어컨 필터에 먼지가 쌓이면 전력 소모량이 늘어납니다",
"절전형 멀티탭을 사용하여 불필요한 전력 사용을 줄여주세요",
"청소기를 사용할 때에는 필터와 먼지통을 먼저 청소하면 낮은 강도로 청소할 수 있기 때문에 전력 소비를 절감할 수 있습니다",
"사람이 없을 때 전원공급이 필요 없는 전기 기기는 타이머콘센트 사용으로 전력소모를 줄일 수 있습니다(정수기, 프린터 등)",
"천정형 냉난방기의 난방시 소비전력은 2.1~5.3kW입니다",
"냉장고 설정을 강->중으로 변경하고 개폐횟수와 시간 단축, 냉장고 내부 여유공간을 유지해주는게 좋습니다",
"컴퓨터, 프린터 등 사무기구를 장시간 사용하지 않을 때 잠시 전원을 꺼두셔도 좋습니다",
"보이는 곳, 손에 닿기 쉬운 곳에 멀티탭 두기",
"퇴근 전, 외출 전에 멀티탭 끄는 습관 갖기",
"냉장고는 60%정도만 채워서 사용하는 것이 냉기 순환에 좋습니다!",
"냉장고를 벽과 10cm정도 떨어트려 사용하면 과열로 인한 전기 낭비를 줄일 수 있습니다",
"PC/모니터 사용시 소비전력은 160W, 절전모드 사용시 4W",
"하루 중 4시간만 PC/모니터 절전모드를 사용해도 624Wh(에어콘 64분 가동 가능, 600W 기준)",
"PC/모니터 1시간 대기전력량은 4Wh !",
"주기적으로 불필요한 프로그램 및 데이터를 삭제하여 부팅 및 검색시간이 1일 10분 단축될 경우 PC/모니터 1세트당 연간 6.7kWh 절감 :)",
"모니터 전력소비의 대부분은 백라이트. 모니터 밝기를 낮춰 눈의 피로도 줄이고! 전력소비도 줄이고!",
"모니터는 컴퓨터 부팅이 끝난 후 켜주세요:D",
"프린터/복합기 절전모드를 설정하면 1대당 연간 50kWh 절감 효과가 있습니다",
"레이저 프린터의 대기전력은 20W, 절전모드시 5W 입니다",
"퇴근시 프린터,복합기의 전원차단으로 연간 135kWh, 541kWh의 소비전력을 아낄 수 있어요",
"점심시간에는 일괄 소등, 저녁시간에는 필요한 부분만 점등!",
"PC 종료 후 주변기기인 스피커, 프린터의 전원도 확인해주세요",
"모니터 밝기 50% 감소로 소비전력 30% 감소! 모니터 수명 연장은 덤!",
"4개짜리 형광등의 소비전력은 20W입니다",
"모니터의 소비전력은 40W입니다",
"휴대폰 충전기의 소비전력은 6W입니다",
"데스크탑의 소비전력은 보통 100~200W, 노트북의 소비전력은 보통 10~90W입니다",
"대기전력 top 5 : 셋탑박스, 인터넷모뎀, 에어컨(스탠드), 보일러, 오디오스피커",
"마지막으로 퇴근하는 사람이 정수기 콘센트를 뽑고 가면 밤새 불필요한 전기사용을 막을 수 있습니다",
"청소기 먼지필터를 청소해주면 흡입력이 좋아져 청소시간이 줄고 전기절약이 가능해집니다",
"청소기 강도를 낮추어 사용하는 것도 전기절약에 도움이 됩니다",
"열에너지는 유리면으로 가장 많이 빠져나갑니다. 에어캡이나 커튼 설치는 어떠신가요?"

// tips for winter
// "내복 착용시 체감온도를 평균 3~5도 높일 수 있습니다",
// "전열기 온도를 한단계 낮게 조절하여 사용해보시는건 어떠신가요?",
// "난방 온도 1℃ 조절시 7%의 에너지를 절약할 수 있습니다",
// "난방 온도를 3℃ 낮추면 난방 에너지의 20%를 절감할 수 있습니다",
// "겨울철 실내외 온도차가 크면 감기 등 질병에 걸리기도 쉬우니 18~20℃ 정도로 유지하는 것이 좋습니다",
// "가디건을 입으면 체감온도가 2.2도 올라갑니다",
// "무릎담요를 덮으면 체감온도가 2.5도 올라갑니다",
// "덧신을 신으면 체감온도가 0.6도 올라갑니다",
// "겨울철 실내 난방 적정온도(18~20도)와 실내 습도를 40~60% 함께 유지시켜 주면 난방비를 절감 할 수 있습니다",
// "난방을 가동시키면서 가습기를 함께 틀어주면 온도가 더 빨리 상승합니다",
// "실내온도가 너무 올라가면 건조해져서 감기를 비롯한 호흡기 질환에 걸리기 쉽고 겨울철에는 면역력이 떨어지기 때문에 독감 예방을 위해선 약간 서늘한 공기가 더 좋습니다",
// "가습기와 난방을 동시에 틀어놓으면 따뜻함을 유지해주는 효과가 두배입니다"
// "적정 실내 온도(난방기 : 20℃이하)를 준수합시다",
// "겨울철 실내적정온도는 18∼20℃입니다",
// "개인 전열기의 사용을 자제하면 절전효과가 높습니다",
// "난방온도를 1℃ 낮추면 4~6% 절약효과가 있고, 2℃ 낮추면 10%의 에너지를 절감할 수 있습니다",
// "전기난방기는 전등(10W)을 100개 켤 수 있는 전력(1kW)를 소비하는 에너지 다소비기기입니다",
// "스탠드형 전기히터의 소비전력은 800~3000W 입니다",
// "전기온풍기, 전기히터의 소비전력은 3000W 입니다",
// "내의 또는 무릎담요를 사용으로 전열기구 사용을 줄여주세요",
// "전기 라지에이터의 소비전력은 2.5kW입니다"
];

var randomtip = tips[Math.floor(Math.random() * 38)];

document.getElementById("tip_msg").innerHTML = randomtip;
