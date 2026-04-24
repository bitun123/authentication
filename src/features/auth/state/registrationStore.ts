import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RegisterInput } from "@/types/auth";

interface RegistrationState {
  formData: RegisterInput;
  currentStep: number;
  updateFormData: (data: Partial<RegisterInput>) => void;
  setStep: (step: number) => void;
  clearFormData: () => void;
}

const initialFormData: RegisterInput = {
  orgDetails: {
    name: "",
    legalName: "",
    contactInfo: {
      email: "",
      phone: "",
    },
  },
  name: "",
  email: "",
  password: "",
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 1,
      updateFormData: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
            orgDetails: {
              ...state.formData.orgDetails,
              ...(data.orgDetails || {}),
              contactInfo: {
                ...state.formData.orgDetails.contactInfo,
                ...(data.orgDetails?.contactInfo || {}),
              },
            },
          },
        })),
      setStep: (step) => set({ currentStep: step }),
      clearFormData: () => set({ formData: initialFormData, currentStep: 1 }),
    }),
    {
      name: "registration-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
