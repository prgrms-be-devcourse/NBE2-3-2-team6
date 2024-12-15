const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between relative">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`flex-1 h-1 mx-4 ${
              currentStep > step ? 'bg-red-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;