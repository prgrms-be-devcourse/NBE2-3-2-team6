import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const StepThree = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-red-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold">회원가입을 축하합니다!</h2>
      <p className="text-gray-600">
        현혈증 기부 시스템의 회원이 되신 것을 환영합니다.
      </p>
      <Link
        to="/login"
        className="block w-full py-2 px-4 bg-red-600 text-white rounded-md"
      >
        로그인하러 가기
      </Link>
    </div>
  );
};

export default StepThree;