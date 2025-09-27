<template>
  <!-- Mobile Card View (visible on small screens) -->
  <div class="block md:hidden space-y-4">
    <div
      v-for="(row, index) in data"
      :key="index"
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div
        v-for="header in headers"
        :key="header.key"
        class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
        :class="header.cellClass"
      >
        <span class="font-medium text-gray-700 text-sm"
          >{{ header.label }}:</span
        >
        <span class="text-gray-900 text-sm text-right">
          <slot
            :name="`cell-${header.key}`"
            :row="row"
            :value="row[header.key]"
            :index="index"
          >
            {{ row[header.key] }}
          </slot>
        </span>
      </div>
    </div>

    <!-- Mobile Empty state -->
    <div v-if="!data || data.length === 0" class="text-center py-12">
      <slot name="empty">
        <p class="text-gray-500">No data available</p>
      </slot>
    </div>
  </div>

  <!-- Desktop Table View (hidden on small screens) -->
  <div class="hidden md:block w-full overflow-x-auto">
    <table
      class="min-w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            :class="[
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              header.class,
            ]"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-gray-50 transition-colors"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            :class="[
              'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
              header.cellClass,
            ]"
          >
            <slot
              :name="`cell-${header.key}`"
              :row="row"
              :value="row[header.key]"
              :index="index"
            >
              {{ row[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Desktop Empty state -->
    <div v-if="!data || data.length === 0" class="text-center py-12">
      <slot name="empty">
        <p class="text-gray-500">No data available</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  props: {
    headers: {
      type: Array,
      required: true,
      validator: (headers) => {
        return headers.every(
          (header) => typeof header === 'object' && header.key && header.label
        );
      },
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
