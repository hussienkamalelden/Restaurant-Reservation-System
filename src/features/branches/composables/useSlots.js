import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
const branchStore = useBranchStore();
const { selectedSlots } = storeToRefs(branchStore);

export const useSlots = () => {
  // Apply Saturday slots to all days
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

  // Format hour input to ensure 2-digit format
  const formatHour = (slot, field) => {
    let value = parseInt(slot[field]) || 0;
    if (value > 23) value = 23;
    if (value < 0) value = 0;
    slot[field] = String(value).padStart(2, '0');
  };

  // Format minute input to ensure 2-digit format
  const formatMinute = (slot, field) => {
    let value = parseInt(slot[field]) || 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    slot[field] = String(value).padStart(2, '0');
  };

  return {
    apply,
    formatHour,
    formatMinute,
  };
};
