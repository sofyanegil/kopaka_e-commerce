import React from "react";
import { Head, usePage } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import hasAnyPermission from "../../../Utils/Permissions";
import {
    FaChartArea,
    FaChartLine,
    FaClock,
    FaRegCircleCheck,
    FaRegCircleXmark,
    FaTruck,
} from "react-icons/fa6";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
export default function Index() {
    const { count, chart } = usePage().props;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `STATISTIC REVENUE : ${new Date().getFullYear()}`,
            },
        },
    };

    const data = {
        labels: chart.month_name,
        datasets: [
            {
                fill: true,
                label: "REVENUE",
                backgroundColor: "rgba(75,192,192,0.2)",
                data: chart.grand_total,
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Dashboard | Kopaka</title>
            </Head>
            <LayoutAccount>
                {hasAnyPermission(["dashboard.statistics"]) && (
                    <Card
                        title={
                            <>
                                <FaChartArea />
                                Statistics
                            </>
                        }
                    >
                        <div className="flex flex-wrap gap-2 text-white">
                            <div className="w-full sm:w-1/2 md:w-1/5">
                                <div className="flex flex-col bg-yellow-400 p-5 border rounded-lg">
                                    <div className="mb-2 text-3xl font-extrabold">
                                        {count.pending}
                                    </div>
                                    <div className=" flex items-center gap-1 font-semibold">
                                        <FaClock />
                                        PENDING
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/4">
                                <div className="flex flex-col bg-green-400 p-5 border rounded-lg">
                                    <div className="mb-2 text-3xl font-extrabold">
                                        {count.process}
                                    </div>
                                    <div className=" flex items-center gap-1 font-semibold">
                                        <FaRegCircleCheck />
                                        PROCESS
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/4">
                                <div className="flex flex-col bg-blue-400 p-5 border rounded-lg">
                                    <div className="mb-2 text-3xl font-extrabold">
                                        {count.delivered}
                                    </div>
                                    <div className="flex items-center gap-1 font-semibold">
                                        <FaTruck /> DELIVERED
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/4">
                                <div className="flex flex-col bg-gray-400 p-5 border rounded-lg">
                                    <div className="mb-2 text-3xl font-extrabold">
                                        {count.cancelled}
                                    </div>
                                    <div className=" flex items-center gap-1 font-semibold">
                                        <FaRegCircleXmark /> CANCELED
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
                {hasAnyPermission(["dashboard.chart"]) && (
                    <Card
                        title={
                            <>
                                <FaChartLine />
                                Charts
                            </>
                        }
                    >
                        <div className="row mt-2">
                            <div className="col-12 col-md-12 col-lg-12 mb-4">
                                <div className="card border-0 border-top-success shadow-sm">
                                    <div className="card-header fw-bold">
                                        <i className="fa fa-chart-bar"></i>{" "}
                                        CHART REVENUE {new Date().getFullYear()}
                                    </div>
                                    <div className="card-body">
                                        <Line options={options} data={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </LayoutAccount>
        </>
    );
}
