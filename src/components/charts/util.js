import { wordColor } from '@/services/color'

const COLORS = ['#11A3E7', '#E28195', '#73C195', '#FFBD44', '#A686DC']

export function genLineOptions (datalen) {
  const div = Math.max(Math.round(datalen / 8), 1)
  return {
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: {
      mode: 'x-axis',
    },
    scales: {
      xAxes: [
        {
          display: true,
          ticks: {
            callback: function (dataLabel, index) {
              return index % div === 0 ? dataLabel : ''
            },
          },
        },
      ],
    },
    layout: {
      padding: {
        right: 20,
        left: 10,
      },
    },
  }
}

export function formatArrayData (report) {
  const legends = report[0]
  const labels = []
  const datasets = []

  report.slice(1).forEach(row => {
    labels.push(formatLabel(row[0]))
    row.slice(1).forEach((n, i) => {
      if (!datasets[i]) {
        const label = legends[i + 1]
        let color = COLORS[i]
        if (!color) {
          color = wordColor(label)
        }
        datasets.push({
          label: label,
          fill: false,
          borderColor: color,
          backgroundColor: color,
          borderWidth: 1,
          lineTension: 0,
          data: [n],
        })
      } else {
        datasets[i].data.push(n)
      }
    })
  })

  return { labels, datasets }
}

function formatLabel (label) {
  if (/^\d{8}$/.test(label)) {
    return label.slice(4, 6) + '/' + label.slice(6)
  }
  if (/^\d{6}$/.test(label)) {
    return label.slice(0, 4) + '/' + label.slice(4)
  }
  return label
}
