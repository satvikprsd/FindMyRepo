import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingStep from '@/components/OnboardingStep';
import { usePreferences, UserPreferences } from '@/contexts/PreferencesContext';

const onboardingSteps = [
  {
    question: 'What is your current skill level?',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    key: 'skillLevel',
    multiSelect: false,
  },
  {
    question: 'Which programming languages interest you?',
    options: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'Rust', 'C++', 'Ruby'],
    key: 'languages',
    multiSelect: true,
  },
  {
    question: 'What areas are you interested in?',
    options: ['Web Development', 'Mobile Apps', 'Data Science', 'DevOps', 'Security', 'Documentation'],
    key: 'interestAreas',
    multiSelect: true,
  },
  {
    question: 'What type of contributions are you looking for?',
    options: ['Good First Issues', 'Bug Fixes', 'Feature Development', 'Documentation', 'Code Review'],
    key: 'contributionIntent',
    multiSelect: false,
  },
  {
    question: 'How much time can you dedicate?',
    options: ['Quick Contributions (< 2 hours)', 'Regular Commits (2-5 hours/week)', 'Major Features (5+ hours/week)'],
    key: 'timeAvailability',
    multiSelect: false,
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setPreferences } = usePreferences();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserPreferences>>({});

  const handleSelect = (selected: string | string[]) => {
    const currentKey = onboardingSteps[currentStep].key as keyof UserPreferences;
    setAnswers((prev) => ({
      ...prev,
      [currentKey]: selected,
    }));
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setPreferences(answers as UserPreferences);
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary flex items-center justify-center p-4">
      <OnboardingStep
        question={step.question}
        options={step.options}
        multiSelect={step.multiSelect}
        onSelect={handleSelect}
        currentStep={currentStep + 1}
        totalSteps={onboardingSteps.length}
        onNext={handleNext}
        onBack={currentStep > 0 ? handleBack : undefined}
      />
    </div>
  );
};

export default Onboarding;
