const StepTwo = ({ 
  userInfo, 
  setUserInfo, 
  handleVerificationRequest, 
  isVerificationSent, 
  timer, 
  formatTime,
  handleNext 
}) => {
  // 유효성 검사 함수 추가
  const validateForm = () => {
    // 필수 필드 체크
    if (!userInfo.email || !userInfo.password || !userInfo.name || !userInfo.phone || !userInfo.address) {
      alert('필수 항목을 모두 입력해주세요.');
      return false;
    }

    // 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return false;
    }

    // 비밀번호 일치 여부 체크
    if (userInfo.password !== userInfo.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    // 비밀번호 복잡도 체크 (최소 8자, 영문+숫자+특수문자)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(userInfo.password)) {
      alert('비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.');
      return false;
    }

    // 전화번호 형식 체크
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(userInfo.phone.replace(/-/g, ''))) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return false;
    }

    return true;
  };

  // 다음 버튼 클릭 핸들러 수정
  const handleSubmit = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setUserInfo(prev => ({
          ...prev,
          address: data.address,
          addressDetail1: data.buildingName ? `(${data.buildingName})` : ''
        }));
      }
    }).open();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              placeholder="이메일 주소를 입력하세요"
            />
            <button
              onClick={handleVerificationRequest}
              disabled={isVerificationSent}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300"
            >
              인증하기
            </button>
          </div>
        </div>

        {isVerificationSent && (
          <div>
            <label className="block text-sm font-medium text-gray-700">인증번호</label>
            <div className="mt-1 flex space-x-2">
              <input
                type="text"
                value={userInfo.verificationCode}
                onChange={(e) => setUserInfo({...userInfo, verificationCode: e.target.value})}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                placeholder="인증번호 6자리를 입력하세요"
              />
              <span className="flex items-center text-red-600">
                {formatTime(timer)}
              </span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            value={userInfo.passwordConfirm}
            onChange={(e) => setUserInfo({...userInfo, passwordConfirm: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">연락처</label>
          <input
            type="tel"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="연락처를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">주소</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              value={userInfo.address}
              readOnly
              className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              placeholder="주소를 검색하세요"
            />
            <button
              onClick={handleAddressSearch}
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              주소 검색
            </button>
          </div>
          <input
            type="text"
            value={userInfo.addressDetail1}
            onChange={(e) => setUserInfo({...userInfo, addressDetail1: e.target.value})}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
            readOnly
            placeholder="상세주소를 검색하세요"
          />
          <input
            type="text"
            value={userInfo.addressDetail2}
            onChange={(e) => setUserInfo({...userInfo, addressDetail2: e.target.value})}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="상세주소를 입력해주세요"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-red-600 text-white rounded-md"
      >
        가입하기
      </button>
    </div>
  );
};

export default StepTwo;