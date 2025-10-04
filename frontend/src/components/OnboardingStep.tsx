import { useState } from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface OnboardingStepProps {
  question: string;
  options: string[];
  multiSelect?: boolean;
  onSelect: (selected: string | string[]) => void;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
}

const OnboardingStep = ({
  question,
  options,
  multiSelect = false,
  onSelect,
  currentStep,
  totalSteps,
  onNext,
  onBack,
}: OnboardingStepProps) => {
  const [selectedSingle, setSelectedSingle] = useState<string>('');
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  const handleSingleSelect = (option: string) => {
    setSelectedSingle(option);
    onSelect(option);
  };

  const handleMultipleSelect = (option: string) => {
    const newSelection = selectedMultiple.includes(option)
      ? selectedMultiple.filter((item) => item !== option)
      : [...selectedMultiple, option];
    setSelectedMultiple(newSelection);
    onSelect(newSelection);
  };

  const canProceed = multiSelect ? selectedMultiple.length > 0 : selectedSingle !== '';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-8">{question}</h2>

      <div className="grid gap-3 mb-8">
        {options.map((option) => {
          const isSelected = multiSelect
            ? selectedMultiple.includes(option)
            : selectedSingle === option;

          return (
            <button
              key={option}
              onClick={() => (multiSelect ? handleMultipleSelect(option) : handleSingleSelect(option))}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {option}
                </span>
                {isSelected && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        {onBack && (
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
        )}
        <Button
          variant="hero"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1"
        >
          {currentStep === totalSteps ? 'Finish & Discover' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep;
