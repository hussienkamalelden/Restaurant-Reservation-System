<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-full bg-white shadow-sm border border-gray-200">
      <thead class="bg-primary">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="px-6 py-3 text-left text-sm font-medium text-white uppercase"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-gray-50 transition-colors even:bg-gray-50 cursor-pointer"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="px-6 py-4 whitespace-nowrap text-sm"
          >
            <slot
              :name="`cell-${header.key}`"
              :row="row"
              :value="row[header.key]"
              :index="index"
            >
              <span
                class="font-semibold"
                :class="
                  row[header.key] === 'Yes'
                    ? 'text-green-600 '
                    : row[header.key] === 'No'
                    ? 'text-red-600 '
                    : 'text-text '
                "
              >
                {{ row[header.key] }}
              </span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty data -->
    <div v-if="!data || data.length === 0" class="text-center py-12">
      <slot name="empty">
        <p class="text-text text-lg">No data available</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
