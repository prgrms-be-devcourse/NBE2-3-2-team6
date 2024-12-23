import { useState } from "react";
import { Mail, Phone, User, MapPin, Lock } from "lucide-react";
import MyPageSideBar from "../../components/wrapper/MyPageSideBar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    name: "홍길동",
    phone: "010-1234-5678",
    address: "서울특별시 강남구",
    addressDetail1: "(테헤란로)",
    addressDetail2: "123-45",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

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

  // 유효성 검사 함수
  const validateForm = () => {
    // 전화번호 형식 체크
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(userInfo.phone.replace(/-/g, ""))) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return false;
    }

    // 필수 필드 체크
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      alert("필수 항목을 모두 입력해주세요.");
      return false;
    }

    return true;
  };

  // 수정 완료 처리 함수
  const handleEditComplete = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      // API 호출
      // const response = await axios.put("", {
      //   name: userInfo.name,
      //   phone: userInfo.phone,
      //   address: userInfo.address,
      //   addressDetail1: userInfo.addressDetail1,
      //   addressDetail2: userInfo.addressDetail2,
      // });
      // if (response.status === 200) {
      //   alert("회원정보가 성공적으로 수정되었습니다.");
      //   setIsEditing(false);
      // }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 변경 처리 함수
  const handlePasswordChange = async () => {
    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!userInfo.currentPassword) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    if (!passwordRegex.test(userInfo.newPassword)) {
      alert("새 비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    if (userInfo.newPassword !== userInfo.newPasswordConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // API 요청
      // const response = await axios.put("", {
      //   currentPassword: userInfo.currentPassword,
      //   newPassword: userInfo.newPassword,
      // });
      // if (response.status === 200) {
      //   alert("비밀번호가 성공적으로 변경되었습니다.");
      //   setShowPasswordChange(false);
      //   setUserInfo((prev) => ({
      //     ...prev,
      //     currentPassword: "",
      //     newPassword: "",
      //     newPasswordConfirm: "",
      //   }));
      // }
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response?.status === 401) {
        alert("현재 비밀번호가 일치하지 않습니다.");
      } else {
        alert("비밀번호 변경 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full">
        <MyPageSideBar />
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">회원 정보 수정</h1>
              <button
                onClick={handleEditComplete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                {isEditing ? "수정 완료" : "정보 수정"}
              </button>
            </div>

            <div className="space-y-6">
              {/* 기본 정보 섹션 */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">
                  기본 정보
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  {/* 이메일 */}
                  <div className="flex items-start space-x-3">
                    <div className="pt-2">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={userInfo.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        이메일은 변경이 불가능합니다.
                      </p>
                    </div>
                  </div>

                  {/* 이름 */}
                  <div className="flex items-start space-x-3">
                    <div className="pt-2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        이름
                      </label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* 연락처 */}
                  <div className="flex items-start space-x-3">
                    <div className="pt-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        연락처
                      </label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* 주소 */}
                  <div className="flex items-start space-x-3">
                    <div className="pt-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        주소
                      </label>
                      <div className="mt-1 flex space-x-2">
                        <input
                          type="text"
                          value={userInfo.address}
                          readOnly
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-50"
                        />
                        {isEditing && (
                          <button
                            onClick={handleAddressSearch}
                            type="button"
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            주소 검색
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={userInfo.addressDetail1}
                        readOnly
                        className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-50"
                      />
                      <input
                        type="text"
                        value={userInfo.addressDetail2}
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            addressDetail2: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-50"
                        placeholder="상세주소를 입력해주세요"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 비밀번호 변경 섹션 */}
              <section className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    비밀번호 변경
                  </h2>
                  <button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    {showPasswordChange ? "취소" : "비밀번호 변경"}
                  </button>
                </div>

                {showPasswordChange && (
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="pt-2">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            현재 비밀번호
                          </label>
                          <input
                            type="password"
                            value={userInfo.currentPassword}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                currentPassword: e.target.value,
                              })
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            새 비밀번호
                          </label>
                          <input
                            type="password"
                            value={userInfo.newPassword}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                newPassword: e.target.value,
                              })
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            8자 이상, 영문, 숫자, 특수문자를 포함해주세요.
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            새 비밀번호 확인
                          </label>
                          <input
                            type="password"
                            value={userInfo.newPasswordConfirm}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                newPasswordConfirm: e.target.value,
                              })
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          />
                        </div>
                        <button
                          onClick={handlePasswordChange}
                          className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          비밀번호 변경하기
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
