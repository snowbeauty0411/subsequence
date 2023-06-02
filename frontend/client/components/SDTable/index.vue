<template>
  <div class="overflow-x-auto">
    <table
      class="w-full text-left text-gray-500 dark:text-gray-400 text-center"
      :class="border == false ? '' : 'border border-slate-400'"
    >
      <thead
        class="
          text-gray-100
          uppercase
          bg-gray-700
          dark:bg-gray-700 dark:text-gray-400
        "
      >
        <slot name="thead-top" />
        <tr>
          <template v-for="itemTh in fields" :key="itemTh.key">
            <th
              class="text-nowrap px-3 py-3"
              :class="border == false ? '' : 'border border-slate-300'"
              :style="itemTh._style"
            >
              <slot
                :name="`header(${itemTh.key})`"
                :item="itemTh"
                v-if="$slots[`header(${itemTh.key})`]"
              ></slot>
              <div v-else class="flex justify-center items-center">
                <span>
                  {{ itemTh.label }}
                </span>
                <span
                  v-if="itemTh.sortable"
                  @click="sortTable(itemTh)"
                  class="ml-2 cursor-pointer"
                >
                  <BootstrapIcon
                    :icon="itemTh._sortOrder == true ? 'sort-down' : 'sort-up'"
                  />
                </span>
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody v-if="dataTable.length">
        <tr
          v-for="item in dataTable"
          :key="item.id"
          class="border-b dark:border-gray-700 hover:bg-gray-50"
          :class="
            bgCell == false
              ? ''
              : 'dark:bg-gray-800 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
          "
        >
          <template v-for="(column, indexColumn) in fields" :key="indexColumn">
            <td
              class="px-3 py-3 text-center"
              :class="border == false ? '' : 'border border-slate-300'"
            >
              <slot
                :name="`cell(${column.key})`"
                :item="item"
                v-if="$slots[`cell(${column.key})`]"
              ></slot>
              <span v-else>{{
                item[column.key] || item[column.key] === 0
                  ? item[column.key]
                  : ""
              }}</span>
            </td>
          </template>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          class="
            border-b
            dark:bg-gray-800 dark:border-gray-700
            odd:bg-white
            even:bg-gray-50
            odd:dark:bg-gray-800
            even:dark:bg-gray-700
            hover:bg-gray-50
          "
        >
          <td
            :colspan="colspanTd"
            class="px-3 py-3 text-center"
            :class="border == false ? '' : 'border border-slate-300'"
          >
            該当データはありません
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <SDPagination
    v-if="totalPage > 1"
    :totalpage="totalPage"
    :currentPage="currentPage"
    v-on:update-page="updatePage"
  />
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import _ from "lodash";
import SDPagination from "@/components/SDPagination";
export default {
  components: {
    BootstrapIcon,
    SDPagination,
  },
  emits: ["update_page"],
  props: {
    items: {
      default() {
        return [];
      },
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    border: {
      type: Boolean,
      default() {
        return true;
      },
    },
    bgCell: {
      type: Boolean,
      default() {
        return true;
      },
    },
    currentPage: {
      type: Number,
      default() {
        return 1;
      },
    },
    totalPage: {
      type: Number,
      default() {
        return 1;
      },
    },
  },
  data() {
    return {
      sortOrder: "asc",
      dataTable: [],
      colspanTd: 0,
    };
  },
  watch: {
    items() {
      this.dataTable = this.items;
    },
  },
  mounted() {
    this.dataTable = this.items;
    this.colspanTd = this.fields.length;
  },
  created() {
    this.colspanTd = this.fields.length;
  },
  methods: {
    sortTable(item) {
      const dataOb = this.dataTable;
      this.sortOrder = this.sortOrder !== "asc" ? "asc" : "desc";
      const valueSortOrder = this.sortOrder !== "asc" ? true : false;
      if (item._sortOrder) {
        item._sortOrder = valueSortOrder;
      } else {
        item["_sortOrder"] = true;
      }
      // Use of _.sortBy() method
      this.dataTable = _.orderBy(dataOb, item.key.toString(), this.sortOrder);
    },

    updatePage(page) {
      this.$emit("update_page", page);
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
  height: 9px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

</style>
