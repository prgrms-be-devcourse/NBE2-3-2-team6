import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StepOne from "../features/signup/StepOne";
import StepTwo from "../features/signup/StepTwo";
import StepThree from "../features/signup/StepThree";
import Stepper from "../features/signup/Stepper";
import logo from "../assets/image.png";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  // 약관 동의 상태
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    email: "",
    verificationCode: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    address: "",
    addressDetail1: "",
    addressDetail2: "",
  });

  // 타이머 관리
  useEffect(() => {
    let interval;
    if (timer > 0 && isVerificationSent) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVerificationSent(false);
    }
    return () => clearInterval(interval);
  }, [timer, isVerificationSent]);

  // 이메일 인증 요청
  const handleVerificationRequest = () => {
    setIsVerificationSent(true);
    setTimer(180); // 3분 = 180초
  };

  // 약관 전체 동의 처리
  const handleAllAgreements = (checked) => {
    setAgreements({
      termsOfService: checked,
      privacyPolicy: checked,
      marketing: checked,
    });
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            agreements={agreements}
            setAgreements={setAgreements}
            handleNext={handleNext}
            handleAllAgreements={handleAllAgreements}
          />
        );
      case 2:
        return (
          <StepTwo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleVerificationRequest={handleVerificationRequest}
            isVerificationSent={isVerificationSent}
            timer={timer}
            formatTime={formatTime}
            handleNext={handleNext}
          />
        );
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <img src={logo} alt="로고" className="h-8 w-8" />
            <h2 className="text-2xl font-bold text-gray-900">
              현혈증 기부 시스템
            </h2>
          </Link>
        </div>

        <Stepper currentStep={currentStep} />
        {renderStepContent()}
      </div>
    </div>
  );
};

export default SignupPage;
