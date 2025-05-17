import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../components/common/PageMeta";

export default function LineChart() {
  return (
    <>
      <PageMeta
              title="Briselle Line Chart | AI-Driven EdTech Platform | Briselle - Smart Education Ecosystem"
              description="This is Briselle Line Chart | Briselle is an AI-powered EdTech platform designed for universities, schools, and institutes, enhancing learning, management, and collaboration with smart automation."
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
