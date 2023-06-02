import { defineComponent, h, PropType } from "vue";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => { },
    },
    plugins: {
      type: Array as PropType<Plugin<"line">[]>,
      default: () => [],
    },
    dataList: {
      type: Object,
      default: () => [],
    },
    title: {
      default: "",
      type: String,
    },
  },
  setup(props) {
    let list = props.dataList;
    let arrLabel = [];
    let arrData = [];
    if (list.length > 0) {
      const check = list[0].day != undefined ? true : false;
      arrLabel = list.map((item) => {
        if (check) {
          return item.month + "/" + item.day;
        } else {
          return item.year + "/" + item.month;
        }
      });

      arrData = list.map((item) => {
        return item.value
      });
    }

    let max_val = 0
    const arrFilter = arrData.filter((item) => item > 0);
    if(arrFilter.length > 0) {
      max_val = arrFilter.reduce(function(accumulator, element){
        return (Number(accumulator) > Number(element)) ? accumulator : element
      });
    }

    const chartData = {
      labels: arrLabel,
      datasets: [
        {
          label: props.title,
          backgroundColor: "#f87979",
          data: arrFilter.length > 0 ? arrData : [],
        },
      ],
    };


    const chartOptions1 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          scaleLabel: {
            display: true
          },
          suggestedMin: 0,
          ticks: {
            precision: 0,
            beginAtZero:true,
          },
        },
      }
    };
    const chartOptions2 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          scaleLabel: {
            display: true
          },
          suggestedMin: 0,
          ticks: {
            precision: 0,
            beginAtZero:true,
          },
          max: 10
        },
      }
    };
    const chartOptions = max_val > 10 ? chartOptions1 : chartOptions2 
    return () =>
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
        dataList: props.dataList,
        title: props.title,
      });
  },
});
