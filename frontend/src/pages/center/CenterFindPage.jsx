import { useEffect, useRef, useState } from "react";
import CenterSideBar from "../../components/wrapper/CenterSideBar";

const CenterFindPage = () => {
  const mapRef = useRef(null); // 지도 DOM 참조
  const mapInstance = useRef(null); // 지도 객체 참조
  const markersRef = useRef([]); // 마커 참조 저장용
  const openInfowindowRef = useRef(null); // 열린 인포윈도우 참조

  const [selectedCity, setSelectedCity] = useState(""); // 시도 선택
  const [selectedDistrict, setSelectedDistrict] = useState(""); // 시군구 선택
  const [bloodCenters, setBloodCenters] = useState([]); // 전체 헌혈의 집 데이터 저장
  const [filteredCenters, setFilteredCenters] = useState([]); // 선택된 시군구의 헌혈의 집

  // 시도와 시군구 데이터
  const cityData = {
    서울특별시: [
      "종로구",
      "중구",
      "용산구",
      "성동구",
      "광진구",
      "동대문구",
      "중랑구",
      "성북구",
      "강북구",
      "도봉구",
      "노원구",
      "은평구",
      "서대문구",
      "마포구",
      "양천구",
      "강서구",
      "구로구",
      "금천구",
      "영등포구",
      "동작구",
      "관악구",
      "서초구",
      "강남구",
      "송파구",
      "강동구",
    ],
    부산광역시: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "기장구",
    ],
    대구광역시: [
      "중구",
      "동구",
      "서구",
      "남구",
      "북구",
      "수성구",
      "달서구",
      "달성군",
      "군위군",
    ],
    인천광역시: [
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
      "강화군",
      "옹진군",
    ],
    광주광역시: ["동구", "서구", "남구", "북구", "광산구"],
    대전광역시: ["동구", "중구", "서구", "유성구", "대덕구"],
    울산광역시: ["중구", "남구", "동구", "북구", "울주군"],
    세종특별자치시: ["세종특별자치시"],
    경기도: [
      "수원시",
      "용인시",
      "고양시",
      "화성시",
      "성남시",
      "부천시",
      "남양주시",
      "안산시",
      "평택시",
      "안양시",
      "시흥시",
      "파주시",
      "김포시",
      "의정부시",
      "광주시",
      "하남시",
      "광명시",
      "군포시",
      "양주시",
      "오산시",
      "이천시",
      "안성시",
      "구리시",
      "의왕시",
      "포천시",
      "양평군",
      "여주시",
      "동구천시",
      "과천시",
      "가평군",
      "연천군",
    ],
    강원특별자치도: [
      "춘천시",
      "원주시",
      "강릉시",
      "동해시",
      "태백시",
      "속초시",
      "삼척시",
      "홍천군",
      "횡성군",
      "영월군",
      "평창군",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "인제군",
      "고성군",
      "양양군",
    ],
    충청북도: [
      "청주시",
      "충주시",
      "제천시",
      "보은군",
      "옥천군",
      "영동군",
      "증평군",
      "진천군",
      "괴산군",
      "음성군",
      "단양군",
    ],
    충청남도: [
      "천안시",
      "공주시",
      "보령시",
      "아산시",
      "서산시",
      "논산시",
      "계룡시",
      "당진시",
      "금산군",
      "부여군",
      "서천군",
      "청양군",
      "홍성군",
      "예산군",
      "태안군",
    ],
    전북특별자치도: [
      "전주시",
      "군산시",
      "익산시",
      "정읍시",
      "남원시",
      "김제시",
      "완주군",
      "진안군",
      "무주군",
      "장수군",
      "임실군",
      "순창군",
      "고창군",
      "부안군",
    ],
    전라남도: [
      "목포시",
      "여수시",
      "순천시",
      "나주시",
      "광양시",
      "담양군",
      "곡성군",
      "구례군",
      "고흥군",
      "보성군",
      "화순군",
      "장흥군",
      "강진군",
      "해남군",
      "영암군",
      "무안군",
      "함평군",
      "영광군",
      "장성군",
      "완도군",
      "진도군",
      "신안군",
    ],
    경상북도: [
      "포항시",
      "경주시",
      "김천시",
      "안동시",
      "구미시",
      "영주시",
      "영천시",
      "상주시",
      "문경시",
      "경산시",
      "의성군",
      "청송군",
      "영양군",
      "영덕군",
      "청도군",
      "고령군",
      "성주군",
      "칠곡군",
      "예천군",
      "봉화군",
      "울진군",
      "울릉군",
    ],
    경상남도: [
      "창원시",
      "진주시",
      "통영시",
      "사천시",
      "김해시",
      "밀양시",
      "거제시",
      "양산시",
      "의령군",
      "함안군",
      "창녕군",
      "고성군",
      "남해군",
      "하동군",
      "산청군",
      "함양군",
      "거창군",
      "합천군군",
    ],
    제주특별자치도: ["제주시", "서귀포시"],
  };

  useEffect(() => {
    const { kakao } = window;

    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 4,
    };

    mapInstance.current = new kakao.maps.Map(container, options);

    fetchBloodCenters(); // API 데이터 가져오기
  }, []);

  const fetchBloodCenters = async () => {
    try {
      const response = await fetch(
        "https://api.odcloud.kr/api/15050729/v1/uddi:4879af1f-c19f-40ee-b8b8-cfb415a04645?page=1&perPage=154&serviceKey=xiJCLnB%2B0K1RUtz9uKdnjOKr4mHNL4PGte%2BELVTWO%2Fi1oU9z1KWuwpgIcKO3bwgJbbEHTKzWxbRoewnJjRXfow%3D%3D"
      );
      const result = await response.json();
      setBloodCenters(result.data); // 전체 데이터 저장
      displayMarkers(result.data); // 마커 표시
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  const displayMarkers = (data) => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();

    data.forEach((item) => {
      geocoder.addressSearch(item.주소지, (geoResult, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(geoResult[0].y, geoResult[0].x);
          const marker = new kakao.maps.Marker({
            position: coords,
            map: mapInstance.current,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `
              <div style="padding:5px; font-size:12px;">
                <strong>${item["헌혈의 집"]}</strong><br/>
                ${item.주소지}<br/>
                ${item.전화번호}
              </div>
            `,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            if (openInfowindowRef.current) openInfowindowRef.current.close();
            infowindow.open(mapInstance.current, marker);
            openInfowindowRef.current = infowindow;
          });

          markersRef.current.push(marker);
        }
      });
    });
  };

  const handleSearch = () => {
    if (selectedCity && selectedDistrict) {
      const address = `${selectedCity} ${selectedDistrict}`;
      moveMapPoint(address);

      // 시군구에 맞는 데이터 필터링
      const filtered = bloodCenters.filter((center) =>
        center.주소지.includes(selectedDistrict)
      );
      setFilteredCenters(filtered);
    }
  };

  const moveMapPoint = (address) => {
    const { kakao } = window;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstance.current.panTo(coords);
      }
    });
  };

  return (
    <div className="flex bg-gray-50">
      <CenterSideBar />
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-screen flex flex-col">
          {/* 지도 섹션 */}
          <div className="flex flex-col w-full flex-1">
            <h1 className="text-[1.2rem] font-bold mb-6">
              <span className="text-red-500">✔</span> 헌혈의 집 조회
            </h1>
            <div className="flex space-x-4 mb-4">
              <select
                className="border rounded p-2"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">시도 선택</option>
                {Object.keys(cityData).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                className="border rounded p-2"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedCity}
              >
                <option value="">시군구 선택</option>
                {selectedCity &&
                  cityData[selectedCity].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
              <button
                className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                onClick={handleSearch}
                disabled={!selectedDistrict}
              >
                검색
              </button>
              {/* 헌혈의 집 지도 표시 */}
            </div>
            <div
              ref={mapRef}
              className="w-full h-[500px] border border-solid border-[#ddd] rounded-lg"
            ></div>

            {/* 헌혈의 집 정보 표시 테이블 */}
            <div className="w-full flex-1 mt-2 p-4 flex items-center justify-center">
              {filteredCenters.length > 0 ? (
                <div className="w-full p-2 rounded-lg shadow">
                  {/* 헤더 섹션 */}
                  <section className="bg-gray-100 text-gray-900 font-bold text-center grid grid-cols-[1fr,1fr,3fr,1fr,1fr] gap-4 p-3">
                    <div>지역</div>
                    <div>헌혈의 집</div>
                    <div>주소</div>
                    <div>혈액원</div>
                    <div>전화번호</div>
                  </section>

                  {/* 내용 섹션 */}
                  <section className="max-h-[150px] overflow-y-auto divide-y divide-gray-200">
                    {filteredCenters.map((center, index) => (
                      <div
                        key={index}
                        className="hover:bg-gray-50 grid grid-cols-[1fr,1fr,3fr,1fr,1fr] gap-4 items-center text-center p-3"
                      >
                        <div>
                          {selectedCity} {selectedDistrict}
                        </div>
                        <div>{center["헌혈의 집"]}</div>
                        <div className="text-left">{center.주소지}</div>
                        <div>{center.혈액원}</div>
                        <div>{center.전화번호}</div>
                      </div>
                    ))}
                  </section>
                </div>
              ) : (
                <p className="text-center text-gray-500 text-lg">
                  선택된 지역에 대한 헌혈의 집 정보가 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterFindPage;
