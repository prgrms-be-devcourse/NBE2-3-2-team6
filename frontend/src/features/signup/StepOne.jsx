const StepOne = ({ agreements, setAgreements, handleNext, handleAllAgreements }) => {
  return (
    <div className="space-y-4">
      {/* 서비스 이용약관 */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">[필수] 서비스 이용약관</h3>
        <textarea
          readOnly
          className="w-full h-32 p-2 mb-2 border rounded-md bg-gray-50 text-sm resize-none"
          value={`제1조 (목적)
이 약관은 현혈증 기부 시스템이 제공하는 서비스의 이용조건 및 절차, 이용자와 당사의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. "서비스"라 함은 현혈증 기부 시스템이 제공하는 모든 서비스를 의미합니다.
2. "이용자"라 함은 이 약관에 따라 서비스를 이용하는 회원을 말합니다.`}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreements.termsOfService}
            onChange={(e) => setAgreements({...agreements, termsOfService: e.target.checked})}
            className="h-4 w-4 text-red-600 rounded"
          />
          <span className="text-sm">서비스 이용약관에 동의합니다.</span>
        </label>
      </div>

      {/* 개인정보 처리방침 */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">[필수] 개인정보 처리방침</h3>
        <textarea
          readOnly
          className="w-full h-32 p-2 mb-2 border rounded-md bg-gray-50 text-sm resize-none"
          value={`1. 개인정보의 수집 및 이용 목적
회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
- 회원 가입 및 관리
- 서비스 제공 및 운영
- 고충처리 및 분쟁 해결

2. 개인정보의 보유 및 이용기간
회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.`}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreements.privacyPolicy}
            onChange={(e) => setAgreements({...agreements, privacyPolicy: e.target.checked})}
            className="h-4 w-4 text-red-600 rounded"
          />
          <span className="text-sm">개인정보 처리방침에 동의합니다.</span>
        </label>
      </div>

      {/* 마케팅 정보 수신 */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">[선택] 마케팅 정보 수신 동의</h3>
        <textarea
          readOnly
          className="w-full h-24 p-2 mb-2 border rounded-md bg-gray-50 text-sm resize-none"
          value={`현혈증 기부 시스템의 새로운 소식과 다양한 헌혈 관련 정보를 받아보실 수 있습니다.
- 이벤트 및 프로모션 정보 제공
- 헌혈 관련 새로운 소식 및 정보 제공
- 서비스 업데이트 및 변경사항 안내`}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreements.marketing}
            onChange={(e) => setAgreements({...agreements, marketing: e.target.checked})}
            className="h-4 w-4 text-red-600 rounded"
          />
          <span className="text-sm">마케팅 정보 수신에 동의합니다.</span>
        </label>
      </div>

      {/* 전체 동의 */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={Object.values(agreements).every(v => v)}
            onChange={(e) => handleAllAgreements(e.target.checked)}
            className="h-4 w-4 text-red-600 rounded"
          />
          <span className="font-medium">모든 약관에 동의합니다</span>
        </label>
      </div>

      <button
        onClick={handleNext}
        disabled={!agreements.termsOfService || !agreements.privacyPolicy}
        className="w-full py-2 px-4 bg-red-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        다음 단계
      </button>
    </div>
  );
};

export default StepOne;