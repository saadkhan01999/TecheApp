import React, { useState } from 'react';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setCourseCreationField,
  setVerificationCode,
  setVerificationErrors,
  startVerification,
  verificationSuccess,
  verificationFailure,
  resetVerificationCode,
} from '../store/slices/coursesSlice';

const CourseCreation = () => {
  const dispatch = useAppDispatch();
  const { courseCreation } = useAppSelector(state => state.courses);
  const { courseName, password, verificationCode, isVerifying, verificationStatus, errors } = courseCreation;

  const [showPassword, setShowPassword] = useState(false);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      dispatch(setVerificationCode({ index, value }));
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    const codeString = verificationCode.join('');
    if (codeString.length !== 6) {
      newErrors.code = 'Please enter the complete 6-digit code';
    }
    
    dispatch(setVerificationErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleVerify = async () => {
    if (!validateForm()) return;
    
    dispatch(startVerification());
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure
      const isSuccess = Math.random() > 0.3; // 70% success rate
      
      if (isSuccess) {
        dispatch(verificationSuccess());
        console.log('Course created successfully:', {
          courseName,
          password,
          code: verificationCode.join('')
        });
      } else {
        dispatch(verificationFailure({ code: 'Invalid verification code. Please try again.' }));
      }
    } catch (error) {
      dispatch(verificationFailure({ general: 'Something went wrong. Please try again.' }));
    }
  };

  const resendCode = () => {
    console.log('Resending verification code...');
    dispatch(resetVerificationCode());
  };

  const handleFieldChange = (field, value) => {
    dispatch(setCourseCreationField({ field, value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      dispatch(setVerificationErrors(newErrors));
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl sm:p-6">
      <div className="mb-4 sm:mb-6">
        <img
          src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
          alt="Course materials"
          className="object-cover w-full h-32 mb-4 sm:h-48 rounded-xl"
        />
      </div>
      
      <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl sm:mb-4">My Courses</h2>
      <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base">
        Write your course name and confirm your password
      </p>
      
      {errors.general && (
        <div className="flex items-center p-3 mb-4 space-x-2 border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-700">{errors.general}</span>
        </div>
      )}

      {verificationStatus === 'success' && (
        <div className="flex items-center p-3 mb-4 space-x-2 border border-green-200 rounded-lg bg-green-50">
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-700">Course created successfully!</span>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => handleFieldChange('courseName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
              errors.courseName 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-red-300 focus:ring-red-500'
            }`}
            placeholder="Filmmaker"
          />
          {errors.courseName && (
            <p className="mt-1 text-sm text-red-600">{errors.courseName}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors pr-12 ${
                errors.password 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-red-500'
              }`}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter the code
          </label>
          <p className="mb-3 text-xs text-gray-500">
            Enter the code we sent to your phone to confirm your number
          </p>
          <div className="flex justify-center mb-3 space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 sm:w-10 sm:h-10 text-center border rounded-xl focus:outline-none focus:ring-2 text-lg sm:text-xl font-semibold transition-colors ${
                  errors.code 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-red-500'
                }`}
                maxLength={1}
              />
            ))}
          </div>
          {errors.code && (
            <p className="mb-2 text-sm text-red-600">{errors.code}</p>
          )}
          <button
            onClick={resendCode}
            className="text-sm text-red-500 transition-colors hover:text-red-600"
          >
            Resend code
          </button>
        </div>
        
        <button 
          onClick={handleVerify}
          disabled={isVerifying}
          className="flex items-center justify-center w-full py-3 space-x-2 font-semibold text-white transition-colors bg-red-500 rounded-xl hover:bg-red-600 disabled:bg-red-300"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCreation;