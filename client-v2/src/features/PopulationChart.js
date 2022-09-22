import React, { useEffect, useRef, useMemo } from 'react';
import bb, { spline } from 'billboard.js';
import "billboard.js/dist/billboard.css";

const calculateChange = (original, next) => {
  const percentage = (((original - next) / original) * 100).toFixed();

  return `(${percentage}%)`;
};

function PopulationChart({ dataArg }) {
  const categories = useMemo(() => dataArg.filter((d) => d.value).map((d) => d.year), [dataArg]);
  const data = useMemo(() => ['Population', ...dataArg.map((d) => d.value).filter(Boolean)], [dataArg]);

  const refContainer = useRef(null);

  useEffect(() => {
    refContainer.current = bb.generate({
      tooltip: { show: false },
      data: {
        columns: [data],
        type: spline(),
        labels: {
          format: {
            Population: (x, id, i) => {
              const [, ...all] = data;
              let change = all[i - 1]
                ? calculateChange(all[i], all[i - 1])
                : '';
  
              return `${categories[i]}: ${x.toLocaleString()} ${change}`;
            },
          },
          colors: {
            Population: 'black',
          },
        },
      },
      axis: {
        x: {
          show: false,
          padding: 0.3,
        },
        y: {
          show: false,
          padding: 35,
        },
      },
      legend: {
        show: false,
      },
      bindto: '#line',
    })
  }, [])
  
  useEffect(() => {
    try {
      refContainer.current.load({
        columns: [data],
      });
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  return <div className="p-0 h-20 w-full" id="line"></div>;
}

export default PopulationChart;