    import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import { API_DUMMY } from '../../utils/baseURL';
    import {
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
    } from '@coreui/react'
    import { getStyle } from '@coreui/utils'
    import { CChartBar, CChartLine } from '@coreui/react-chartjs'
    import CIcon from '@coreui/icons-react'
    import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { Date } from 'core-js';

    function DashboardCoba2() {
        const [member, setMember] = useState([]);
        const [monthlyData, setMonthlyData] = useState([]);

        const getAll = async () => {
            await axios
            .get(`${API_DUMMY}/customer/member`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                setMember(res.data.data);
                // Memperoleh data bulanan dari respon dan menyimpannya ke state monthlyData
                const monthlyData = res.data.data.map((item) => item.id);
                setMonthlyData(monthlyData);          
            })
            .catch((error) => {git 
                alert("Terjadi Kesalahan" + error);
            });
        };
        
        useEffect(() => {
            getAll(0);
        }, []);

        useEffect(() => {
            const interval = setInterval(() => {
            getAll();
            }, 30 * 24 * 60 * 60 * 1000); // Fetch data every 30 days
        
            return () => {
            clearInterval(interval);
            };
        }, []);
        
    return (
        <CRow>
        <CCol sm={6} lg={3}>
            <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
                <>
                {member.length}{' '}
                <span className="fs-6 fw-normal">
                    (-12.4% <CIcon icon={cilArrowBottom} />)
                </span>
                </>
            }
            title="Members"
            action={
                <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
            }
            chart={
                <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: monthlyData.map((_, index) => {
                    const monthIndex = new Date().getMonth() - index;
                    const month = monthIndex >= 0 ? monthIndex : monthIndex + 12;
                    return month.toString();
                  }),
                  datasets: [
                    {
                      label: 'Member',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-primary'),
                      data: monthlyData,
                    },
                  ],
                }}
                options={{
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    maintainAspectRatio: false,
                    scales: {
                    x: {
                        grid: {
                        display: false,
                        drawBorder: false,
                        },
                        ticks: {
                        display: false,
                        },
                    },
                    y: {
                        min: -9,
                        max: 39,
                        display: false,
                        grid: {
                        display: false,
                        },
                        ticks: {
                        display: false,
                        },
                    },
                    },
                    elements: {
                    line: {
                        borderWidth: 1,
                    },
                    point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                    },
                    },
                }}
                />
            }
            />
        </CCol>
        <CCol sm={6} lg={3}>
            <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
                <>
                $6.200{' '}
                <span className="fs-6 fw-normal">
                    (40.9% <CIcon icon={cilArrowTop} />)
                </span>
                </>
            }
            title="Income"
            action={
                <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
            }
            chart={
                <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-info'),
                        data: [1, 18, 9, 17, 34, 22, 11],
                    },
                    ],
                }}
                options={{
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    maintainAspectRatio: false,
                    scales: {
                    x: {
                        grid: {
                        display: false,
                        drawBorder: false,
                        },
                        ticks: {
                        display: false,
                        },
                    },
                    y: {
                        min: -9,
                        max: 39,
                        display: false,
                        grid: {
                        display: false,
                        },
                        ticks: {
                        display: false,
                        },
                    },
                    },
                    elements: {
                    line: {
                        borderWidth: 1,
                    },
                    point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                    },
                    },
                }}
                />
            }
            />
        </CCol>
        <CCol sm={6} lg={3}>
            <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={
                <>
                2.49{' '}
                <span className="fs-6 fw-normal">
                    (84.7% <CIcon icon={cilArrowTop} />)
                </span>
                </>
            }
            title="Conversion Rate"
            action={
                <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
            }
            chart={
                <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: [78, 81, 80, 45, 34, 12, 40],
                        fill: true,
                    },
                    ],
                }}
                options={{
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    maintainAspectRatio: false,
                    scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        display: false,
                    },
                    },
                    elements: {
                    line: {
                        borderWidth: 2,
                        tension: 0.4,
                    },
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                    },
                    },
                }}
                />
            }
            />
        </CCol>
        <CCol sm={6} lg={3}>
            <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={
                <>
                44K{' '}
                <span className="fs-6 fw-normal">
                    (-23.6% <CIcon icon={cilArrowBottom} />)
                </span>
                </>
            }
            title="Sessions"
            action={
                <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
            }
            chart={
                <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                    labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                    'January',
                    'February',
                    'March',
                    'April',
                    ],
                    datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                        barPercentage: 0.6,
                    },
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    scales: {
                    x: {
                        grid: {
                        display: false,
                        drawTicks: false,
                        },
                        ticks: {
                        display: false,
                        },
                    },
                    y: {
                        grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                        },
                        ticks: {
                        display: false,
                        },
                    },
                    },
                }}
                />
            }
            />
        </CCol>
        </CRow>
    )
    }

    export default DashboardCoba2