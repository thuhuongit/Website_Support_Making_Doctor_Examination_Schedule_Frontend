import "./Dashboard.css";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const dataDoctors = [
    { name: 'Feb 24', CaoKienNguyen: 50, HuynhQuocCuong: 30, TrinTuan: 20 },
    { name: 'Mar 24', CaoKienNguyen: 200, HuynhQuocCuong: 50, TrinTuan: 40 },
    { name: 'Apr 24', CaoKienNguyen: 100, HuynhQuocCuong: 80, TrinTuan: 30 },
    { name: 'Jul 24', CaoKienNguyen: 400, HuynhQuocCuong: 70, TrinTuan: 100 },
    { name: 'Sep 24', CaoKienNguyen: 50, HuynhQuocCuong: 90, TrinTuan: 60 },
    { name: 'Nov 24', CaoKienNguyen: 100, HuynhQuocCuong: 40, TrinTuan: 20 },
  ];

  const dataPatients = [
    { name: 'Huỳnh Đức', value: 400 },
    { name: 'Trần Sơn', value: 280 },
    { name: 'Nguyễn Hằng', value: 150 },
    { name: 'Huỳnh Đeo', value: 70 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Đây là custom Legend nè
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
            <div style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              borderRadius: '50%',
              marginRight: 5,
            }} />
            <span style={{ fontSize: 14 }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h2>Hi, Welcome back</h2>

      <div className="cards">
        <div className="card green">
          <p>Weekly Revenue</p>
          <h3>$0</h3>
        </div>
        <div className="card blue">
          <p>New Users</p>
          <h3>0</h3>
        </div>
        <div className="card yellow">
          <p>Total Health Appointment Done</p>
          <h3>18</h3>
        </div>
        <div className="card red">
          <p>Total Doctors</p>
          <h3>7</h3>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>Top 3 doctors with the highest revenue of the year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataDoctors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="CaoKienNguyen" fill="#00C49F" />
              <Bar dataKey="HuynhQuocCuong" fill="#FFBB28" />
              <Line type="monotone" dataKey="TrinTuan" stroke="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Top 4 vip patients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPatients}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dataPatients.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend content={renderCustomLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
