const Footer = () => {
  return (
    <footer className="border-t border-t-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <p>이메일: contact@blooddonation.kr</p>
            <p>전화: 02-1234-5678</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-red-400">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">소셜미디어</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400">
                Instagram
              </a>
              <a href="#" className="hover:text-red-400">
                Facebook
              </a>
              <a href="#" className="hover:text-red-400">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
