import { useEffect, useState, Suspense, lazy } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ApexChart = lazy(() => import("react-apexcharts"));

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartOptions = {
    chart: {
      type: "line" as const,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" as const, width: 2 },
    grid: {
      borderColor: "#e0e0e0",
      row: { colors: ["transparent"], opacity: 0.5 },
    },
    markers: { size: 4 },
    xaxis: {
      categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      labels: { style: { colors: "#64748b" } },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => value + "%",
        style: { colors: "#64748b" },
      },
      min: 0,
      max: 100,
    },
    legend: {
      position: "top" as const,
      horizontalAlign: "center" as const,
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number, { seriesIndex }: { seriesIndex: number }) => {
          if (seriesIndex === 2) return "Rp " + value.toLocaleString("id-ID");
          return value.toString();
        },
      },
    },
  };

  const chartSeries = [
    { name: "4", data: [10, 25, 30, 35, 40, 55, 70] },
    { name: "3", data: [15, 20, 25, 40, 45, 50, 65] },
    { name: "Rp 1.000.000", data: [35, 40, 45, 55, 55, 70, 80] },
  ];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Hello, Animakid</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue Today", value: "Rp 2.000.000" },
          { label: "Orders Today", value: "18" },
          { label: "Total Revenue", value: "Rp 5.000.000" },
          { label: "Total Orders", value: "131" },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <h2 className="text-3xl font-bold text-center">{item.value}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">7 Days</Button>
              <Button variant="outline">30 Days</Button>
              <Button variant="outline">12 Months</Button>

              <div className="flex items-center gap-2 ml-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal w-[180px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "dd MMM yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                  </PopoverContent>
                </Popover>

                <span>-</span>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal w-[180px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "dd MMM yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {mounted && (
              <Suspense fallback={<div>Loading chart...</div>}>
                <ApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
              </Suspense>
            )}
          </CardContent>
        </Card>

        {/* Side Stats */}
        <div className="space-y-4">
          {[
            { color: "blue", label: "New Customers", value: "24", trend: "-10%", iconDown: true },
            { color: "green", label: "Orders", value: "30", trend: "+30%", iconDown: false },
            { color: "amber", label: "Revenue", value: "Rp 3.000.000", trend: "+40%", iconDown: false },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <h2 className="text-3xl font-bold">{item.value}</h2>
                  <div className={`flex items-center text-${item.iconDown ? "red" : "green"}-500 text-sm`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d={item.iconDown ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
                    </svg>
                    <span>{item.trend} Last 7 Days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
