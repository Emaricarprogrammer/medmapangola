import { useState } from 'react';

type StepFormState = 'finished' | 'notFinished';

export function useMultStepForm() {
  const [stepForm, setStepForm] = useState(1);

  function handleNext() {
    setStepForm(stepForm + 1);
  }

  function handlePrevious() {
    setStepForm(stepForm - 1);
  }

  const stepState: StepFormState = stepForm === 3 ? 'finished' : 'notFinished';

  return { stepForm, handleNext, handlePrevious, stepState };
}
