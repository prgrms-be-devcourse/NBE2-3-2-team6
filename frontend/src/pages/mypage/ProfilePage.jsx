import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, User, MapPin, Lock } from "lucide-react";
import api from "../../lib/axios";
import MyPageSideBar from "../../components/wrapper/MyPageSideBar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "loading@example.com",
    name: "로딩 중...",
    phoneNumber: "010-0000-0000",
    roadAddress: "로딩 중...",
    extraAddress: "",
    detailAddress: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // 헬퍼 함수: 사용자 정보 업데이트
  const updateUserInfoState = (data) => {
    setUserInfo((prev) => ({
      ...prev,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      roadAddress: data.roadAddress,
      extraAddress: data.extraAddress || "",
      detailAddress: data.detailAddress || "",
    }));
  };

  // 회원 정보 조회
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await api.get("/users/my-info");
      updateUserInfoState(response.data);
    } catch (error) {
      console.error("회원 정보 조회 중 오류 발생:", error);
      alert("회원 정보를 불러오는 데 실패했습니다.");
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setUserInfo((prev) => ({
          ...prev,
          roadAddress: data.address,
          extraAddress: data.buildingName ? `(${data.buildingName})` : "",
        }));
      },
    }).open();
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(userInfo.phoneNumber.replace(/-/g, ""))) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return false;
    }

    if (!userInfo.name || !userInfo.phoneNumber || !userInfo.roadAddress) {
      alert("필수 항목을 모두 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleEditComplete = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.put("/users/my-info", {
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        roadAddress: userInfo.roadAddress,
        extraAddress: userInfo.extraAddress,
        detailAddress: userInfo.detailAddress,
      });
      alert("회원 정보가 성공적으로 수정되었습니다.");
      updateUserInfoState(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("회원 정보 수정 중 오류 발생:", error);
      if (error.response?.status === 400) {
        alert("입력한 정보가 잘못되었습니다. 다시 확인해주세요.");
      } else {
        alert("회원 정보를 수정하는 데 실패했습니다.");
      }
    }
  };

  const handlePasswordChange = async () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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
      await api.put("/users/my-info/password", {
        password: userInfo.newPassword,
        passwordConfirm: userInfo.newPasswordConfirm,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setShowPasswordChange(false);
      setUserInfo((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      }));
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("비밀번호를 변경하는 데 실패했습니다.");
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
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  isEditing
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isEditing ? "수정 완료" : "정보 수정"}
              </button>
            </div>

            <div className="space-y-6">
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
                        value={userInfo.phoneNumber}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, phoneNumber: e.target.value })
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
                          value={userInfo.roadAddress}
                          readOnly
                          className={`flex-1 rounded-md border border-gray-300 px-3 py-2 ${
                            !isEditing ? "bg-gray-50" : ""
                          }`}
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
                        value={userInfo.extraAddress}
                        readOnly
                        className={`mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                          !isEditing ? "bg-gray-50" : ""
                        }`}
                      />
                      <input
                        type="text"
                        value={userInfo.detailAddress}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, detailAddress: e.target.value })
                        }
                        disabled={!isEditing}
                        className={`mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                          !isEditing ? "bg-gray-50" : ""
                        }`}
                        placeholder="상세주소를 입력해주세요"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 비밀번호 변경 */}
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
