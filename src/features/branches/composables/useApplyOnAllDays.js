import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
const branchStore = useBranchStore();
const { selectedSlots } = storeToRefs(branchStore);

export const useApplyOnAllDays = () => {
  const apply = async (weekDays) => {
    // Get Saturday's slots
    const saturdaySlots = selectedSlots.value.filter(
      (slot) => slot.day === 'Saturday'
    );

    if (saturdaySlots.length === 0) {
      console.log('No Saturday slots to copy');
      return;
    }

    // Create new slots for each day based on Saturday's slots
    const allDaysSlots = [];

    weekDays.forEach((day) => {
      saturdaySlots.forEach((saturdaySlot) => {
        // Generate unique ID for each new slot
        const newSlot = {
          ...saturdaySlot,
          day: day,
          id: day === 'Saturday' ? saturdaySlot.id : Date.now() + Math.random(), // Keep original ID for Saturday, generate new for others
        };
        allDaysSlots.push(newSlot);
      });
    });

    selectedSlots.value = allDaysSlots;
  };
  return {
    apply,
  };
};
