import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
const branchStore = useBranchStore();
const { selectedSlots } = storeToRefs(branchStore);

export const useSlots = () => {
  // Apply Saturday slots to all days
  const apply = async (weekDays) => {
    // Get Saturday's slots
    const saturdaySlots = selectedSlots.value.filter(
      (slot) => slot.day === 'saturday'
    );

    if (saturdaySlots.length === 0) {
      throw new Error('No Saturday slots to copy');
    }

    // Create new slots for each day based on Saturday's slots
    const allDaysSlots = [];
    weekDays.forEach((day) => {
      saturdaySlots.forEach((saturdaySlot) => {
        // Generate unique ID for each new slot
        const newSlot = {
          ...saturdaySlot,
          day: day.name,
          id:
            day.name === 'saturday'
              ? saturdaySlot.id
              : Date.now() + Math.random(), // Keep original ID for Saturday, generate new for others
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

  // Convert time string to minutes for comparison
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Validate all selected slots
  const validateSlots = (
    dayName,
    minTime,
    maxTime,
    reservationDuration = 0
  ) => {
    if (!minTime || !maxTime) {
      return [];
    }
    const errors = [];
    const minMinutes = timeToMinutes(minTime);
    const maxMinutes = timeToMinutes(maxTime);

    // Filter slots for the specific day
    const daySlots = selectedSlots.value.filter((slot) => slot.day === dayName);

    daySlots.forEach((slot, index) => {
      const fromMinutes = timeToMinutes(slot.from);
      const toMinutes = timeToMinutes(slot.to);

      // Validate from time is not bigger than to time
      if (fromMinutes >= toMinutes) {
        errors.push(
          `${dayName} slot ${index + 1}: Start time (${
            slot.from
          }) must be before end time (${slot.to})`
        );
      }

      // Validate slot is within allowed time range
      if (fromMinutes < minMinutes || toMinutes > maxMinutes) {
        errors.push(
          `${dayName} slot ${
            index + 1
          }: Time must be between ${minTime} and ${maxTime}`
        );
      }

      // Validate slot duration is not less than reservation duration
      const slotDuration = toMinutes - fromMinutes;
      if (slotDuration < reservationDuration) {
        errors.push(
          `${dayName} slot ${
            index + 1
          }: Slot duration (${slotDuration} minutes) cannot be less than reservation duration (${reservationDuration} minutes)`
        );
      }

      // Check for conflicts with other slots on the same day
      daySlots.forEach((otherSlot, otherIndex) => {
        if (index !== otherIndex) {
          const otherFromMinutes = timeToMinutes(otherSlot.from);
          const otherToMinutes = timeToMinutes(otherSlot.to);

          // Check if slots overlap
          if (fromMinutes < otherToMinutes && toMinutes > otherFromMinutes) {
            errors.push(
              `${dayName} slot ${index + 1}: Conflicts with ${dayName} slot ${
                otherIndex + 1
              } (${otherSlot.from}-${otherSlot.to})`
            );
          }
        }
      });
    });

    return errors;
  };

  return {
    apply,
    formatHour,
    formatMinute,
    validateSlots,
  };
};
