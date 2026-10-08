
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppointmentStore = create(
  persist(
    (set) => ({
      appointments: [],

      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),

      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter(
            (appointment) => appointment.id !== id
          ),
        })),

      clearAppointments: () =>
        set({
          appointments: [],
        }),
    }),
    {
      name: "campuscare-appointments",
    }
  )
);
