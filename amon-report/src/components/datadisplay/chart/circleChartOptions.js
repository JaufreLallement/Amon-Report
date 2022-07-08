// Scripts import
import { Maths } from '../../../scripts';

export const circleChartOptions = (type, thick = 50) => {
  let props;
  const strokeWidth = Maths.limit(thick, [5, 20]);
  switch (type) {
    case "pie":
      props = {
        typeName: "PieChart",
        r: 25,
        baseR: 50,
        perimeter: Maths.circumference(25),
        strokeWidth: 50,
        labelRadius: (25 + strokeWidth) * .9,
        cx: 50,
        cy: 50,
        maxRotation: 360,
        startAngle: -90,
      }
      break;
    case "donut":
        props = {
          typeName: "DonutChart",
          r: 35,
          baseR: 35,
          perimeter: Maths.circumference(35),
          strokeWidth,
          labelRadius: (35 + strokeWidth) * 1.1,
          cx: 50,
          cy: 50,
          maxRotation: 360,
          startAngle: -90,
        }
        break;
    case "gauge":
      props = {
        typeName: "GaugeChart",
        r: 75,
        baseR: 75,
        perimeter: Maths.circumference(75),
        strokeWidth,
        labelRadius: (75 + strokeWidth) * 1.1,
        cx: 50,
        cy: 100,
        maxRotation: 180,
        startAngle: -180,
      }
      break;
    default:
      props = {
        typeName: "CircleChart",
        r: 35,
        baseR: 35,
        perimeter: Maths.circumference(35),
        strokeWidth,
        labelRadius: (35 + strokeWidth) * 1.1,
        cx: 50,
        cy: 50,
        maxRotation: 360,
        startAngle: -90,
      }
      break;
  }
  return props;
}