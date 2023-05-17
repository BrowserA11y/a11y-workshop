var xValues = ["Mon", "Tue", "Wed", "Whu", "Fri", "Sat"];
var yValues = [55, 49, 44, 24, 15, 77];
var barColors = [
  "#488e91",
  "#488e91",
  "#488e91",
  "#488e91",
  "#488e91",
  "#488e91",
];

new Chart("dailyVisitors", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Number of visitors per day",
    },
  },
});
