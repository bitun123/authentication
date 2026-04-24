import { useRegistrationStore } from "../state/registrationStore";
import { useAuthHooks } from "./useHooks";
import { RegisterInput } from "@/types/auth";
import { toast } from "sonner";

export const useRegister = () => {
  const { formData, currentStep, updateFormData, setStep, clearFormData } =
    useRegistrationStore();
  const { handleRegister, loading } = useAuthHooks();

  const nextStep = (data: Partial<RegisterInput>) => {
    updateFormData(data);
    setStep(currentStep + 1);
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  const submitRegistration = async (finalData: Partial<RegisterInput>) => {
    const completeData = {
      ...formData,
      ...finalData,
      orgDetails: {
        ...formData.orgDetails,
        ...(finalData.orgDetails || {}),
        contactInfo: {
          ...formData.orgDetails.contactInfo,
          ...(finalData.orgDetails?.contactInfo || {}),
        },
      },
    } as RegisterInput;

    if (
      !completeData.name ||
      !completeData.email ||
      !completeData.password ||
      !completeData.orgDetails.name ||
      !completeData.orgDetails.legalName ||
      !completeData.orgDetails.contactInfo.email ||
      !completeData.orgDetails.contactInfo.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const success = await handleRegister(completeData);
      if (success) {
        clearFormData();
      }
    } catch (error) {
    }
  };

  return {
    formData,
    currentStep,
    nextStep,
    prevStep,
    submitRegistration,
    loading,
    updateFormData,
  };
};
