import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import "/home/eric/cyhealth/src/style.css";


// import paginationFactory from "react-bootstrap-table2-paginator";


export default function Datatable({ data }) {

    const columns = data[0] && Object.keys(data[0])

    return (

        <div class="car">
            <div className="table-responsive p-0 pb-2"></div>
            <table className="table table-bordered table-white" cellPadding={0} cellSpacing={0}>
                <thead>

                    <tr><th >Continent</th>
                        <th>Country</th>
                        <th>Population</th>
                        <th>Total Cases</th>
                        <th>New Cases</th>
                        <th>New Deaths</th>
                        <th>Total Deaths</th>
                        <th>Total Tests</th>
                        <th>Last Updated</th>
                    </tr>








                    {/* <tr>{data[0] && columns.map((heading) => <th>{heading.toUpperCase()}</th>)}</tr> */}
                </thead>
                <tbody className="tbody">
                    {data.map((row) => (<tr>

                        <td >{row.continent}</td>
                        <td>{row.country}</td>
                        <td>{row.population}</td>
                        <td>{row.cases.total}</td>
                        <td className="case">{row.cases.new}</td>
                        <td className="death">{row.deaths.new}</td>
                        <td>{row.deaths.total}</td>
                        <td>{row.tests.total}</td>
                        <td>{row.time}</td>







                    </tr>))}
                </tbody>
            </table>


        </div>


    )

}