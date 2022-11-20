import React, { useState, useEffect } from "react";

import Datatable from "./datatable";
import "./style.css";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,

  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { sum } from "@syncfusion/ej2-react-charts";
ChartJS.register(

  LinearScale,
  PointElement,
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);


require('es6-promise').polyfill();
require("isomorphic-fetch");



export default function App() {
  const [data, setData] = useState([]);

  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["country", "continent"])
  useEffect(() => {

    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: 'get',
      headers: { "X-RapidAPI-Key": "531d3171fbmshe8f9d63f7a6716cp1f2a61jsn1aeb83d0c6e7" }
    })
      .then((response) => response.json())
      .then((json) => setData(json.response));


  }, []);

  function search(rows) {
    // const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter(

      (row) =>
        searchColumns.some((column) => row[column]?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1)

    );
  }
  const columns = data[0] && Object.keys(data[0]);
  const label = data.map((row) => (row.time));
  const cases = data.map((row) => (row.cases.new));
  const deaths = data.map((row) => (row.deaths.new));
  const tests = data.map((row) => (row.tests.new));


  const data1 = {
    labels: label,
    datasets: [{
      label: 'Cases',
      data: cases,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.5
    },
    {
      label: 'Deaths',
      data: deaths,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.5




    },
    {
      label: 'Tests',
      data: tests,
      backgroundColor: 'green',
      borderColor: 'green',
      tension: 0.5

    }
    ]

  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Hourly New Cases Of Corona Virus',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div class="card card2" >

      <div className="App">
        <div> <h3 className="text">Reported Cases and Deaths by Country or Territory
        </h3></div>
        <div><p className="par">The coronavirus COVID-19 is affecting 228 countries and territories.The list of countries and their regional classification is based on the RapidApi COVID19. Sources are provided under "Latest News." Learn more about Worldometer's COVID-19 data</p></div>

        <div className="chart" >
          <Line data={data1} options={options}></Line>
        </div>
        <div className="inputs">
         
          search: <input className="form-control curve" type="text" value={q} onChange={(e) => setQ(e.target.value)} />
          Filter by:
          {
            columns && columns.map((column) => <label>
              <input className="form-check-input checked" type="checkbox" checked={
                searchColumns.includes(column)
              }
                onChange={(e) => {
                  const checked = searchColumns.includes(column)
                  setSearchColumns((prev) => checked
                    ? prev.filter((sc) => sc !== column) : [...prev, column])
                }}
              />
              {column}
            </label>)
          }
        </div>
        <div className="table">
          <Datatable data={search(data)} />
          {/* <Line options={options} data={data} />; */}
        </div>
      </div></div>
  );
}


