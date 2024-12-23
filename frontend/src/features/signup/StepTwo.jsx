import axios from "axios";

const StepTwo = ({
  userInfo,
  setUserInfo,
  handleVerificationRequest,
  handleVerifyCode,
  isVerificationSent,
  timer,
  formatTime,
  handleNext,
}) => {
  // 유효성 검사 함수 추가
  const validateForm = () => {
    // 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    // 비밀번호 일치 여부 체크
    if (userInfo.password !== userInfo.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    // 비밀번호 복잡도 체크 (최소 8자, 영문+숫자+특수문자)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(userInfo.password)) {
      alert("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
      return false;
    }

    if (!userInfo.gender) {
      alert("성별을 선택해주세요.");
      return false;
    }

    if (!userInfo.name) {
      alert("이름을 입력해주세요.");
      return false;
    }

    // 전화번호 형식 체크
    const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(userInfo.phone)) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return false;
    }

    if (!userInfo.isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return false;
    }

    return true;
  };

  // 다음 버튼 클릭 핸들러 수정
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const signupData = {
        email: userInfo.email,
        password: userInfo.password,
        userName: userInfo.name,
        gender: userInfo.gender,
        birth: userInfo.birth || null, // birth가 선택값이므로 없을 수 있음
        phoneNumber: userInfo.phone,
        roadAddress: userInfo.address,
        extraAddress: userInfo.addressDetail1,
        detailAddress: userInfo.addressDetail2,
        verified: userInfo.isEmailVerified,
      };

      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        signupData
      );

      if (response.status === 200) {
        handleNext(); // 성공 시 다음 단계로
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400: // BAD_REQUEST - 이메일 미인증
            alert("이메일 인증이 완료되지 않았습니다.");
            break;
          case 409: // CONFLICT - 중복 이메일
            alert("이미 가입된 이메일입니다.");
            break;
          case 422: // UNPROCESSABLE_ENTITY - 유효성 검증 실패
            alert(
              error.response.data.message ||
                "입력하신 정보를 다시 확인해주세요."
            );
            break;
          default:
            alert("회원가입 처리 중 오류가 발생했습니다.");
        }
      } else {
        alert("서버와의 통신 중 오류가 발생했습니다.");
      }
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setUserInfo((prev) => ({
          ...prev,
          address: data.address,
          addressDetail1: data.buildingName ? `(${data.buildingName})` : "",
        }));
      },
    }).open();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            이메일 <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex space-x-2">
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              placeholder="이메일 주소를 입력하세요"
            />
            <button
              onClick={handleVerificationRequest}
              disabled={isVerificationSent || userInfo.isEmailVerified}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300"
            >
              인증하기
            </button>
          </div>
        </div>

        {(isVerificationSent || userInfo.isEmailVerified) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              인증번호
            </label>
            <div className="mt-1 flex space-x-2">
              <input
                type="text"
                value={userInfo.verificationCode}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, verificationCode: e.target.value })
                }
                disabled={userInfo.isEmailVerified}
                className={`flex-1 rounded-md border px-3 py-2 ${
                  userInfo.isEmailVerified
                    ? "bg-gray-100 border-gray-300 text-gray-500"
                    : "border-gray-300"
                }`}
                placeholder="인증번호를 입력하세요"
              />
              {!userInfo.isEmailVerified && (
                <>
                  <span className="flex items-center text-red-600">
                    {formatTime(timer)}
                  </span>
                  <button
                    onClick={handleVerifyCode}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    인증하기
                  </button>
                </>
              )}
              {userInfo.isEmailVerified && (
                <span className="flex items-center text-green-500 font-medium">
                  인증 완료
                </span>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            비밀번호 확인 <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={userInfo.passwordConfirm}
            onChange={(e) =>
              setUserInfo({ ...userInfo, passwordConfirm: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            성별 <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="MALE"
                checked={userInfo.gender === "MALE"}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, gender: e.target.value })
                }
                className="form-radio text-red-600"
              />
              <span className="ml-2">남성</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="FEMALE"
                checked={userInfo.gender === "FEMALE"}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, gender: e.target.value })
                }
                className="form-radio text-red-600"
              />
              <span className="ml-2">여성</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            생년월일
          </label>
          <input
            type="date"
            value={userInfo.birth || ""}
            onChange={(e) =>
              setUserInfo({ ...userInfo, birth: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="연락처를 입력하세요 ex) 010-0000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            주소
          </label>
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
            onChange={(e) =>
              setUserInfo({ ...userInfo, addressDetail1: e.target.value })
            }
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
            readOnly
            placeholder="상세주소를 검색하세요"
          />
          <input
            type="text"
            value={userInfo.addressDetail2}
            onChange={(e) =>
              setUserInfo({ ...userInfo, addressDetail2: e.target.value })
            }
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
